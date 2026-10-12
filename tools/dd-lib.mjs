/** HTML helpers for the v7 due-diligence reader. Cells are trusted HTML. */

export function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function bi(zh, en) {
  return `<span class="bilingual-title"><span class="title-zh">${esc(zh)}</span><span class="title-en" lang="en">${esc(en)}</span></span>`;
}

export function src(ids) {
  if (!ids?.length) return "";
  const links = ids.map((id) => `<a class="source-ref" href="#source-${id}" aria-label="参考资料 ${id}">${id}</a>`).join(" ");
  return `<p class="reference-row"><span class="reference-label">信息来源 <span lang="en">Sources</span></span><span class="reference-links">${links}</span></p>`;
}

export function table(caption, headers, rows) {
  const th = headers.map((h) => `<th>${h}</th>`).join("");
  const body = rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
  return `<div class="table-scroll"><table class="route-table"><caption>${esc(caption)}</caption><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>`;
}

export function note(html) {
  return `<p class="dd-note">${html}</p>`;
}

export function bullets(items) {
  return `<ul class="evidence-bullets">${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;
}

/** @param {{level:'stop'|'watch', text:string}[]} items */
export function flagList(items) {
  return `<ul class="flag-list">${items.map((f) => `<li class="${f.level === "stop" ? "flag-stop" : "flag-watch"}"><strong>${f.level === "stop" ? "否决" : "观察"}</strong> ${f.text}</li>`).join("")}</ul>`;
}

export function room(rows) {
  return table("本节点数据室最低门槛", ["索取文件", "形式", "验收门槛", "达不到时"], rows);
}

export function h3(zh, en) {
  return `<h3>${bi(zh, en)}</h3>`;
}

export function h4(zh, en) {
  return `<h4>${bi(zh, en)}</h4>`;
}
