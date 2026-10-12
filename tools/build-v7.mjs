import fs from "fs";
import { esc, bi, src } from "./dd-lib.mjs";
import { buildNodes } from "./dd-nodes.mjs";
import { sourceItemsHtml, glossaryExtraHtml, scoreDims, redFlags } from "./dd-catalog.mjs";

const root = "/workspace";
const basePath = "/tmp/invivo-v64.html";
if (!fs.existsSync(basePath)) fs.copyFileSync(`${root}/index.html`, basePath);
const html = fs.readFileSync(basePath, "utf8");
const match = html.match(/<script id="reader-package" type="application\/json">([\s\S]*?)<\/script>/);
if (!match) throw new Error("reader-package missing");
const pack = JSON.parse(match[1]);
if (pack.version !== "6.4") throw new Error("base package is not v6.4");

const CSS = `
.decision-jumps { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 0; }
.decision-jumps a { background: var(--surface); border: 1px solid var(--line-strong); padding: 2px 8px; text-decoration: none; }
.dd-note { background: var(--surface-green); border: 1px solid var(--line); padding: 8px 10px; margin: 0 0 12px; }
.flag-list { list-style: none; padding-left: 0; }
.flag-stop, .flag-watch { padding: 8px 10px; margin: 0 0 8px; }
.flag-stop { background: var(--surface-purple); border-left: 3px solid var(--text-accent); }
.flag-watch { background: var(--surface-green); border-left: 3px solid var(--line-strong); }
.flag-list label { display: block; }
.score-summary, .flag-summary { background: var(--surface-purple); padding: 8px 10px; }
.scorecard select, [data-scorecard] select { max-width: 11em; background: var(--surface); border: 1px solid var(--line-strong); }
tr.is-proven { background: var(--surface-selected); }
tr.is-against, tr.is-open { background: var(--surface-purple); }
`;

const JS = `
  function initDecisionTools(){
    const route=metadata.route||'LNP';
    const key='invivo-dd-tools-v7-'+route;
    let state={};
    try{state=JSON.parse(localStorage.getItem(key)||'{}');}catch(_){}
    if(!state.ratings)state.ratings={};
    if(!state.flags)state.flags={};
    const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch(_){}};
    const scoreRoot=document.querySelector('[data-scorecard]');
    const flagRoot=document.querySelector('[data-flag-summary]');
    function paint(){
      if(scoreRoot){
        const counts={proven:0,support:0,open:0,against:0,na:0,blank:0};
        scoreRoot.querySelectorAll('select[data-dim]').forEach(sel=>{
          const v=state.ratings[sel.dataset.dim]||'';
          sel.value=v;
          const tr=sel.closest('tr');
          if(tr){tr.classList.toggle('is-proven',v==='proven');tr.classList.toggle('is-against',v==='against');tr.classList.toggle('is-open',v==='open'||v==='na');}
          counts[v||'blank']++;
        });
        const summary=scoreRoot.querySelector('[data-score-summary]');
        if(summary){
          const high=[];
          scoreRoot.querySelectorAll('tbody tr').forEach(tr=>{
            const weight=tr.children[1]?.textContent?.trim();
            const sel=tr.querySelector('select[data-dim]');
            const v=sel?state.ratings[sel.dataset.dim]:'';
            if(weight==='高'&&(v===''||v==='open'||v==='na'||v==='against')) high.push(tr.children[0]?.textContent?.trim());
          });
          summary.textContent='已证实 '+counts.proven+' · 有支持 '+counts.support+' · 未支持 '+counts.open+' · 存在反证 '+counts.against+' · 无法评估 '+counts.na+' · 未评级 '+counts.blank+'。不换算总分。'+(high.length?(' 高权重仍需处理：'+high.join('、')+'。'):' 高权重维度均已有支持或已证实。');
        }
      }
      if(flagRoot){
        const boxes=[...document.querySelectorAll('input[data-flag]')];
        let stop=0,watch=0;
        boxes.forEach(box=>{
          box.checked=!!state.flags[box.dataset.flag];
          if(!box.checked)return;
          if(box.closest('.flag-stop'))stop++; else watch++;
        });
        flagRoot.textContent=stop?('已触发 '+stop+' 条否决项'+(watch?('，另有 '+watch+' 条观察项'):'')+'。建议停止推进，并在备忘录中引用对应文件。'):(watch?('未触发否决项。观察项 '+watch+' 条，需列入下一次补件。'):'尚未勾选。勾选只保存在本机浏览器。');
      }
    }
    document.querySelectorAll('select[data-dim]').forEach(sel=>{
      sel.addEventListener('change',()=>{state.ratings[sel.dataset.dim]=sel.value;save();paint();});
    });
    document.querySelectorAll('input[data-flag]').forEach(box=>{
      box.addEventListener('change',()=>{state.flags[box.dataset.flag]=box.checked;save();paint();});
    });
    paint();
  }
  initDecisionTools();
`;

function sliceBody(body) {
  const outlineIdx = body.indexOf('id="reader-outline"');
  const detailsStart = body.lastIndexOf("<details", outlineIdx);
  const outlineEnd = body.indexOf("</details>", outlineIdx) + "</details>".length;
  const nodeIdx = body.indexOf('<div id="node-library">');
  const glossIdx = body.indexOf("glossary-entry");
  const glossDetails = body.lastIndexOf("<details", glossIdx);
  return {
    prefix: body.slice(0, detailsStart),
    mid: body.slice(outlineEnd, nodeIdx),
    between: body.slice(body.lastIndexOf("</article>") + "</article>".length, glossDetails),
    suffix: body.slice(glossDetails),
  };
}

function existingSourceIds(suffix) {
  return new Set([...suffix.matchAll(/id="source-([^"]+)"/g)].map((m) => m[1]));
}

function outlineHtml(nodes, labelZh, labelEn) {
  const children = (id) => nodes.filter((n) => n.parentId === id);
  const item = (n) => {
    const kids = children(n.id);
    const toggle = kids.length
      ? `<button class="outline-toggle" type="button" data-toggle-branch="${n.id}" aria-expanded="false" aria-controls="outline-children-${n.id}" aria-label="展开 ${esc(n.number)} ${esc(n.title)}"><span aria-hidden="true">›</span></button>`
      : `<span class="outline-leaf" aria-hidden="true">·</span>`;
    const sub = kids.length ? `<ul class="outline-list" id="outline-children-${n.id}" hidden>${kids.map(item).join("")}</ul>` : "";
    return `<li class="outline-item" data-level="${n.depth}" data-outline-id="${n.id}"><div class="outline-row">${toggle}<a class="outline-link" href="#${n.id}" data-node-link="${n.id}"><span class="outline-number">${esc(n.number)}</span>${bi(n.title, n.title_en)}</a></div>${sub}</li>`;
  };
  const roots = children("");
  return `<details id="reader-outline" open><summary><span class="summary-copy">${bi(labelZh, labelEn)}<small id="outline-current-label">当前位置：0 执行摘要与评估纪律</small></span><span class="fold-icon" aria-hidden="true"><svg viewBox="0 0 20 20" focusable="false"><path d="M4 10h12"/><path class="fold-vertical" d="M10 4v12"/></svg></span></summary><div class="outline-heading">${bi(labelZh, labelEn)}<button class="button quiet" id="outline-reset" type="button">仅当前路径</button></div><nav class="outline-nav" aria-label="编号目录"><ul class="outline-list outline-root">${roots.map(item).join("")}</ul></nav></details>`;
}

function articleHtml(node) {
  const hidden = node.id === "Z" ? "" : " hidden";
  const planLinks = node.sections.map((s) => `<a href="#section-${node.id}-${s.key}">${esc(s.title)}</a>`).join("");
  const extraPlan = [
    node.sources?.length ? `<a href="#section-${node.id}-references">本节信息来源</a>` : "",
    node.related?.length ? `<a href="#section-${node.id}-related">关联核验</a>` : "",
  ].join("");
  const sections = node.sections.map((s) => `<section class="knowledge-section" id="section-${node.id}-${s.key}"><h3>${bi(s.title, s.title_en)}</h3>${s.html}</section>`).join("");
  const references = node.sources?.length
    ? `<section class="chapter-references" id="section-${node.id}-references"><h3>${bi("本节信息来源", "Section Sources")}</h3>${src(node.sources)}</section>`
    : "";
  const related = node.related?.length
    ? `<nav class="related-topics" id="section-${node.id}-related"><h3>${bi("关联核验", "Related Reviews")}</h3>${node.related.map((r) => `<a class="related-link" href="#${r.id}" data-node-link="${r.id}">${bi(r.zh, r.en)}</a>`).join("")}</nav>`
    : "";
  return `<article class="reader-node" id="${node.id}" data-parent="${node.parentId}" data-number="${node.number}"${hidden} aria-labelledby="title-${node.id}"><header class="node-header"><div class="node-kicker"><span class="node-level">第 ${node.depth} 级目录</span></div><h2 id="title-${node.id}" tabindex="-1"><span class="heading-number">${esc(node.number)}</span>${bi(node.title, node.title_en)}</h2><p>${esc(node.question)}</p><p class="chapter-focus"><strong>本节审阅重点 <span lang="en">Review Focus</span></strong>${esc(node.focus)}</p></header><nav class="section-nav reading-plan" aria-label="本节内容"><span class="reading-plan-label">本节内容 <span lang="en">Section Guide</span></span><div class="reading-plan-links">${planLinks}${extraPlan}</div></nav><div class="node-body">${sections}${references}${related}<a class="return-to-section" href="#${node.id}">↑ 返回本节开头</a></div></article>`;
}

function textOf(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const LEGACY = {
  LNP: {
    M01: "B02", "M01.1": "B02", "M01.2": "B02", "M01.3": "B01",
    M10: "B03", "M02.B.1": "B03", "M02.B.2": "B03", "M02.B.3": "B04", "M02.B.4": "B03",
    M03: "B04", "M03.1": "B04", "M03.2": "B04", "M03.3": "B04",
    M04: "B05", "M04.1": "B05", "M04.2": "B05", "M04.3": "B01",
    M06: "B06", "M06.1": "B06", "M06.2": "B06", "M06.3": "B06",
    M08: "B08", "M08.1": "B08", "M08.2": "B08", "M08.3": "B08",
    M02: "C01", "M02.A": "C01", "M02.C": "C02", "M02.D": "C01",
    C02a: "C03", C02b: "B07", C02c: "C03",
    M09: "C04", "M09.1": "C04", "M09.2": "B07", "M09.3": "H01",
  },
  LV: {
    M01: "L02", "M01.1": "L02", "M01.2": "L02", "M01.3": "L01",
    LV: "L03", LV01: "L03", LV02: "L03", LV03: "L03",
    M03: "L04", "M03.1": "L04", "M03.2": "L04", "M03.3": "L04",
    M04: "L05", "M04.1": "L05", "M04.2": "L05", "M04.3": "L01",
    M06: "L06", "M06.1": "L06", "M06.2": "L06", "M06.3": "L06",
    M08: "L08", "M08.1": "L08", "M08.2": "L08", "M08.3": "L08",
    M02: "C01", "M02.A": "C01", "M02.C": "C02", "M02.D": "C01",
    C02a: "C03", C02b: "L01", C02c: "C03",
    M09: "C04", "M09.1": "C04", "M09.2": "L01", "M09.3": "L07",
  },
};

function routeTargets(nodes) {
  const map = {};
  for (const n of nodes) {
    if (/^B0\d$/.test(n.id)) map[n.id] = `L${n.id.slice(1)}`;
    else if (/^L0\d$/.test(n.id)) map[n.id] = `B${n.id.slice(1)}`;
    else map[n.id] = n.id;
  }
  return map;
}

function buildPage(route) {
  const old = pack.pages[route];
  const parts = sliceBody(old.body);
  const nodes = buildNodes(route);
  const ids = new Set(nodes.map((n) => n.id));
  if (ids.size !== nodes.length) throw new Error(route + " duplicate node id");
  for (const n of nodes) {
    if (n.parentId && !ids.has(n.parentId)) throw new Error(route + " missing parent " + n.parentId + " for " + n.id);
  }
  for (const [from, to] of Object.entries(LEGACY[route])) {
    if (ids.has(from)) throw new Error(route + " legacy collides " + from);
    if (!ids.has(to)) throw new Error(route + " legacy target missing " + to);
  }
  const labelZh = route === "LNP" ? "RNA-LNP 路线技术目录" : "Lentiviral 路线技术目录";
  const labelEn = route === "LNP" ? "RNA-LNP Technical Contents" : "Lentiviral Technical Contents";
  let prefix = parts.prefix
    .replace("更新日期 2026-10-10", "更新日期 2026-10-12")
    .replace("<span>v6.4</span>", "<span>v7.0</span>");
  const jumps = `<nav class="decision-jumps print-hide" aria-label="决策工具"><a href="#E01">红旗与否决项</a><a href="#E04">Scorecard</a><a href="#E03">Go / No-Go</a><a href="#X01">数据室清单</a><a href="#P01">竞争格局</a></nav>`;
  if (!prefix.includes("header-utility-row")) throw new Error("utility row missing");
  prefix = prefix.replace("</div><div class=\"header-utility-row print-hide\">", `</div>${jumps}<div class="header-utility-row print-hide">`);
  const articles = nodes.map(articleHtml).join("");
  let suffix = parts.suffix;
  if (!suffix.includes("</dl>") || !suffix.includes("</ol>")) throw new Error("glossary or sources missing");
  suffix = suffix.replace("</dl>", glossaryExtraHtml() + "</dl>").replace("</ol>", sourceItemsHtml() + "</ol>");
  const body = prefix + outlineHtml(nodes, labelZh, labelEn) + parts.mid + `<div id="node-library">${articles}` + parts.between + suffix;
  const known = existingSourceIds(suffix);
  const cited = [...body.matchAll(/href="#source-([^"]+)"/g)].map((m) => m[1]);
  const missing = [...new Set(cited.filter((id) => !known.has(id)))];
  if (missing.length) throw new Error(route + " missing sources " + missing.join(","));
  for (const n of nodes) for (const r of n.related || []) if (!ids.has(r.id)) throw new Error(route + " related missing " + r.id + " from " + n.id);
  const contentOwner = {};
  const searchItems = nodes.map((n) => {
    const htmlNode = articleHtml(n);
    for (const m of htmlNode.matchAll(/id="([^"]+)"/g)) {
      if (m[1] !== n.id) contentOwner[m[1]] = n.id;
    }
    return {
      id: n.id,
      ownerId: n.id,
      number: n.number,
      title: n.title,
      title_en: n.title_en,
      searchText: textOf(htmlNode),
    };
  });
  const metaNodes = nodes.map((n) => ({
    id: n.id,
    parentId: n.parentId,
    number: n.number,
    depth: n.depth,
    title: n.title,
    title_en: n.title_en,
    shared: false,
  }));
  return {
    title: "体内 CAR-T 技术尽调框架 · v7.0",
    body,
    metadata: {
      version: "7.0",
      route,
      route_name: old.metadata.route_name,
      route_files: old.metadata.route_files,
      route_targets: routeTargets(nodes),
      shared_ids: [],
      nodes: metaNodes,
      search_items: searchItems,
      content_owner: contentOwner,
      legacy_anchor_map: LEGACY[route],
      source_aliases: old.metadata.source_aliases,
      default_node: "Z",
    },
    activeData: {
      metadata: {
        version: "7.0",
        route,
        reader_updated_on: "2026-10-12",
        facts_verified_on: "2026-10-12",
        author: "Curious_RZ",
        previous_version: "6.4",
      },
      scorecard: scoreDims(route).map(([id, weight, name, bar, red]) => ({ id, weight, name, proven_bar: bar, typical_disproof: red })),
      red_flags: redFlags(route).map(([id, level, text]) => ({ id, level, text })),
    },
  };
}

const lnp = buildPage("LNP");
const lv = buildPage("LV");
const next = {
  version: "7.0",
  default_route: "LNP",
  pages: { LNP: lnp, LV: lv },
};
let out = html.replace(match[0], `<script id="reader-package" type="application/json">${JSON.stringify(next).replace(/</g, "\\u003c")}</script>`);
if (!out.includes("</style>")) throw new Error("style missing");
if (out.includes("/* v7 decision tools */")) throw new Error("css already inserted");
out = out.replace("</style>", `/* v7 decision tools */${CSS}</style>`);
out = out.replace("<title>体内 CAR-T 技术尽调框架 · v6.4</title>", "<title>体内 CAR-T 技术尽调框架 · v7.0</title>");
const marker = "document.body.dataset.enhanced='true';";
if (!out.includes(marker)) throw new Error("runtime marker missing");
out = out.replace(marker, JS + marker);
fs.writeFileSync(`${root}/index.html`, out);
const lnpSources = (lnp.body.match(/id="source-/g) || []).length;
const lvSources = (lv.body.match(/id="source-/g) || []).length;
console.log(JSON.stringify({
  bytes: out.length,
  lnpNodes: lnp.metadata.nodes.length,
  lvNodes: lv.metadata.nodes.length,
  lnpSources,
  lvSources,
  lnpScore: lnp.activeData.scorecard.length,
  lvFlags: lv.activeData.red_flags.length,
}, null, 2));
