import { src, table, note, bullets, flagList, room } from "./dd-lib.mjs";
import {
  scorecardTable, flagChecklist, landscapeTable, dealTable, esoRecon,
  regMatrix, disciplineTable, routeDiffTable, scoreDims, redFlags,
} from "./dd-catalog.mjs";

function sec(key, zh, en, html) {
  return { key, title: zh, title_en: en, html };
}

function leaf(spec) {
  return spec;
}

export function buildNodes(route) {
  const L = route === "LNP";
  const nodes = [];
  const add = (n) => nodes.push(n);

  add(leaf({
    id: "Z", parentId: "", number: "0", depth: 1,
    title: "执行摘要与评估纪律", title_en: "Executive Summary & Assessment Discipline",
    question: "这次尽调要先回答哪三个问题？",
    focus: "先定位决策工具，再进入技术节点。本页不给项目通过标签。",
    sections: [
      sec("map", "三分钟入口", "Three-minute Entry", `
        ${note("阅读顺序：红旗清单 → 本阶段必答问题 → Scorecard。技术节点用来填写这些工具，而不是反过来。")}
        ${table("决策工具位置", ["工具", "位置", "产出"], [
          ["红旗与否决项", "7.1", "勾选后本机显示是否已触发否决"],
          ["分阶段必答问题", "7.2", "临床前 / IND-enabling / I 期 / II 期及以后"],
          ["Go / No-Go 决策门", "7.3", "每一门的通过条件与停下来的条件"],
          ["一页纸 Scorecard", "7.4", "维度、审阅权重、五档评级；不换算总分"],
          ["数据室索取清单", "8.1", "可直接发给公司的文件夹、形式和验收门槛"],
          ["竞争对标与 ESO-T01 对账", "5.1", "事实、来源、证据等级；冲突数据并列"],
        ])}
        ${bullets([
          "给药制剂和体内形成的 CAR-T 是两个评价对象。制剂走药学质量控制（CMC）；细胞生成、功能和疾病作用是药理结果。",
          "递送靶向回答“谁拿到载荷”。嵌合抗原受体（Chimeric Antigen Receptor, CAR）的抗原靶向回答“谁被清除”。",
          "药效学标志、客观缓解率（Overall Response Rate, ORR）和持久临床获益分开记录。外周血 B 细胞下降只证明药效学作用。",
        ])}
      `),
    ],
    sources: ["R04", "V5C04"],
    related: [{ id: "E01", zh: "红旗与否决项", en: "Red Flags" }, { id: "E04", zh: "Scorecard", en: "Scorecard" }, { id: "X01", zh: "数据室清单", en: "Data Room" }],
  }));

  add(leaf({
    id: "Z01", parentId: "Z", number: "0.1", depth: 2,
    title: "使用说明与证据口径", title_en: "How to Use This Framework",
    question: "评级和交易数字怎么写才不算编造？",
    focus: "五档评级用于分配阅读，不产生伪精确总分。未打开的原始文献不补数字。",
    sections: [
      sec("scale", "五档评级", "Five-level Rating", table("评级标准", ["档", "含义", "可以写下的句子"], [
        ["已证实", "同一产品版本、同一患者人群、预先规定的终点", "“在 n=… 的……中，按……标准”"],
        ["有支持", "相关模型、相邻版本或方向一致的替代终点", "“支持假设，尚不是临床证实”"],
        ["未支持", "数据室没有能回答该问题的实验", "“未见数据”"],
        ["存在反证", "现有结果与主张方向相反", "写明人群、时点和读数"],
        ["无法评估", "文件缺失或方法不能解释", "列出缺的文件夹"],
      ])),
      sec("facts", "事实口径", "Fact Rules", bullets([
        "交易对价只记录公开文本中的结构：最高金额、首付、里程碑、是否已宣布交割。未披露的首付款留空。",
        "会议摘要、公司新闻稿和期刊全文分列。摘要与后续媒体冲突时，保留摘要，并把媒体记为冲突来源。",
        "估算入组、计划剂量和临床前动物数据不写入“人体疗效”列。",
        "专利到期日需要专利期调整和专利期延长。本框架列出公开专利号和权利人，不推算到期年。",
        `核验日 2026-10-12。此后的交割、摘要更新和监管文本以当时的原始文件为准。`,
      ])),
    ],
    sources: ["V5E01"],
    related: [{ id: "E04", zh: "Scorecard", en: "Scorecard" }, { id: "P01", zh: "对标矩阵", en: "Landscape" }],
  }));

  add(leaf({
    id: "Z02", parentId: "Z", number: "0.2", depth: 2,
    title: "评估纪律", title_en: "Assessment Discipline",
    question: "哪些读数绝对不能互相替代？",
    focus: "把反复出现的边界收成一张表。后文只引用编号。",
    sections: [
      sec("matrix", "不可混同", "Do Not Conflate", disciplineTable() + src(["R04", "V5C02", "S01", "V5L36"].filter((id) => L || !["S01", "V5L36"].includes(id)).concat(L ? [] : ["N33"]))),
      sec("use", "怎么用这张表", "How to Apply", bullets([
        "幻灯片若把 D-4 写成免疫重置，Scorecard“临床获益–风险”记为存在反证或未支持，而不是在正文里再解释一遍。",
        "平台数据若属于 D-8，对应维度最高只能记“有支持”。",
        "新闻稿缓解率属于 D-9，对标表的证据等级列必须标明。",
      ])),
    ],
    sources: L ? ["S01", "V5C02", "V5L36", "V5L37"] : ["N33", "V5C02", "R05"],
    related: [{ id: L ? "B08" : "L08", zh: "药效学与临床获益", en: "PD versus Benefit" }, { id: L ? "B04" : "L04", zh: "分布与脱靶", en: "Distribution" }],
  }));

  add(leaf({
    id: "Z03", parentId: "Z", number: "0.3", depth: 2,
    title: "两条路线为何不能共用节点", title_en: "Why the Routes Do Not Share a Node Tree",
    question: "商业故事相似时，技术问题哪里分叉？",
    focus: "免单采、免清淋、现货给药是共同价值主张。表达时程、失败模式和监管默认项不同，所以第 2–4 章的节点按路线重写。",
    sections: [
      sec("diff", "差异矩阵", "Route Split", routeDiffTable()),
      sec("where", "本路线第 2 章看什么", "What Chapter 2 Asks", L
        ? bullets([
          "瞬时表达是否覆盖疾病任务，以及第二次给药是否还成立。",
          "配体把 mRNA 送进哪一群 T 细胞，肝和脾拿走了多少。",
          "剂量、暴露、CAR 表达和药效学是否连得起来。",
          "抗聚乙二醇（PEG）抗体和抗药抗体（Anti-drug Antibody, ADA）对重复给药的影响。",
          "mRNA 与制剂的冷链是否支持拟定场景。",
        ])
        : bullets([
          "整合之后不能停药：插入突变和克隆显性如何被发现、如何被行动。",
          "包膜与 fusogen 是否只在目标 T 细胞发生功能转导。",
          "复制型慢病毒（Replication-competent Lentivirus, RCL）和载体拷贝数（Vector Copy Number, VCN）。",
          "功能滴度与产能是否支撑单次给药的成本故事。",
          "长期随访是否按整合载体来设计和预算。",
        ])),
    ],
    sources: ["R05", "N23"],
    related: [{ id: "B", zh: "作用机制链", en: "Mechanism Chain" }, { id: "C05", zh: "分区域监管", en: "Regional Regulation" }],
  }));

  add(leaf({
    id: "A", parentId: "", number: "1", depth: 1,
    title: "产品与临床定位", title_en: "Product and Clinical Position",
    question: "这个版本的产品，要在哪个人群完成哪件具体的事？",
    focus: "适应症、线次和版本先冻结，再讨论平台。",
    sections: [sec("kids", "本章要冻结的三件事", "Three Locks", table("定位锁定", ["节点", "冻结对象", "未冻结时的后果"], [
      ["1.1", "疾病任务与表达时程是否匹配", "后面的剂量和随访没有终点"],
      ["1.2", "目标产品特征（Target Product Profile, TPP）和质量目标产品概况（QTPP）", "CMC 规格与临床主张脱节"],
      ["1.3", "被尽调的制剂版本", "最好看的图来自不同处方"],
    ]))],
    sources: ["R04"],
    related: [{ id: "A03", zh: "版本冻结", en: "Version Lock" }],
  }));

  add(leaf({
    id: "A01", parentId: "A", number: "1.1", depth: 2,
    title: "疾病生物学与治疗假设", title_en: "Disease Biology and Therapeutic Hypothesis",
    question: L ? "有限的 CAR 表达窗口要完成哪项疾病任务？" : "一次整合给药要维持多久的疾病控制，失败时用什么救援？",
    focus: "按疾病写任务，不按平台写效率。",
    sections: [
      sec("task", "疾病任务", "Disease Task", table("不同疾病要证明的事", ["场景", "必须连接的证据", "只证明药效学的读数", "来源"], [
        ["自身免疫", "致病 B 细胞或浆细胞清除、组织免疫改变、疾病活动、停药后的过程", "外周血 B 细胞下降", "V5C02"],
        ["血液肿瘤", "骨髓、淋巴结和髓外病灶的覆盖；抗原丢失；按 IMWG 或相应标准的 ORR/CR/无进展生存期（Progression-free Survival, PFS）", "循环 CAR 阳性细胞峰值", "R04 N10"],
        ["实体瘤", "细胞进入病灶、识别局部抗原、在抑制性微环境中仍有功能", "外周转染率", "V5C09"],
      ])),
      sec("fit", L ? "瞬时窗口" : "整合后的时间尺度", L ? "Transient Window" : "Integrated Timescale", L
        ? table("LNP 治疗假设", ["主张", "需要的纵向观测", "否决性缺口"], [
          ["一次给药足以重置自身免疫", "CAR 消退、B 细胞重建、自身抗体、疾病活动和停药，分开画在同一时间轴", "只有给药后数天的 B 细胞下降"],
          ["肿瘤需要再给药来维持", "每次给药的表达、抗 PEG/ADA 和疾病评估", "健康动物的一次清除被写成患者可重复"],
          ["实体瘤可及", "病灶内 CAR-T 和抗原阴性残留", "用血中转染率代替浸润"],
        ])
        : table("慢病毒治疗假设", ["主张", "需要的纵向观测", "否决性缺口"], [
          ["单次给药带来持久控制", "整合细胞的表型、克隆构成和疾病终点至少到方案规定的关键时点", "把第 2–4 周的扩增峰值写成 PFS"],
          ["复发可救援", "预先规定的桥接或体外 CAR-T，及其对 PFS 删失的影响", "复发后的死亡全部归因于研究药物或全部排除"],
          ["可接受不可逆修饰", "插入位点监测和恶性风险的知情同意文本", "同意书仍按可逆小分子来写"],
        ])),
      sec("flags", "本节点红旗", "Node Flags", flagList(L ? [
        { level: "stop", text: "TPP 中的适应症任务长于已观察到的功能性 CAR 表达，且没有再给药计划。" },
        { level: "watch", text: "引用体外 CAR-T 或单抗的组织清除，未在本品测量。" },
      ] : [
        { level: "stop", text: "疾病假设依赖随时停药，但产品是整合型单次给药。" },
        { level: "watch", text: "用短期 ORR 定义治愈，随访短于方案里的 PFS 观察窗。" },
      ])),
      sec("room", "数据室", "Data Room", room([
        ["治疗假设备忘录", "5 页以内，含时间轴", "写明支持主张的终点和会否定主张的结果", "1.1 记为未支持，不进入剂量讨论"],
        ["抗原表达包", "目标组织与正常组织的蛋白水平、患者间分布", "方法、阈值和例数可核对", "靶点选择性最高记为有支持"],
      ])),
    ],
    sources: L ? ["V5C02", "V5C09", "S01", "N19"] : ["V5C02", "V5C09", "N10", "R04"],
    related: [{ id: L ? "B01" : "L01", zh: "时程与风险", en: "Time and Risk" }, { id: "A02", zh: "TPP", en: "TPP" }],
  }));

  add(leaf({
    id: "A02", parentId: "A", number: "1.2", depth: 2,
    title: "目标产品特征与质量目标产品概况", title_en: "TPP and QTPP",
    question: "临床主张怎样落到可检验的规格？",
    focus: "TPP 的每一句必须能指回一个终点或一项关键质量属性（Critical Quality Attribute, CQA）。",
    sections: [
      sec("tpp", "TPP 行", "TPP Rows", table("最低行项目", ["TPP 条目", "可接受的写法", "不合格的写法"], [
        ["人群与线次", "诊断标准、既往线数、器官功能", "“自免”或“血液瘤”"],
        ["给药", L ? "剂量、间隔、计划次数、预用药" : "单次静脉剂量单位（转导单位）、预用药、禁止的清淋", "“一针就好”"],
        ["对照终点", "ORR、完全缓解（Complete Response, CR）、严格完全缓解（sCR）、PFS，或自身免疫的验证终点", "“深度缓解”“重置免疫”"],
        ["安全", "剂量限制性毒性（Dose-limiting Toxicity, DLT）窗口；CRS/ICANS 按美国移植与细胞治疗学会（ASTCT）分级；其他按 CTCAE", "“安全性良好”"],
        ["可及性", "从决策到输液的天数；是否免单采；是否免淋巴细胞清除化疗", "“门诊、便宜、可及”且无测量"],
        ["质量", "与上述主张对应的 CQA", "只列粒径和滴度"],
      ])),
      sec("room", "数据室", "Data Room", room([
        ["TPP / QTPP 对照表", "每行一个主张、一个终点、一个 CQA", "没有空行口号", "缺行的主张不进入 Scorecard 的已证实"],
      ])),
    ],
    sources: ["V32A02", "R01", "V5C04"],
    related: [{ id: "C01", zh: "CMC", en: "CMC" }, { id: "H01", zh: "可及性量化", en: "Access" }],
  }));

  add(leaf({
    id: "A03", parentId: "A", number: "1.3", depth: 2,
    title: "产品构型与版本冻结", title_en: "Configuration and Version Lock",
    question: "哪一个批号是本次尽调对象？",
    focus: "版本冻结包括核酸或转移基因组、递送组分、工艺和给药方案。体内细胞不是放行批。",
    sections: [
      sec("lock", "版本要素", "Version Elements", table(L ? "LNP 版本要锁定的要素" : "慢病毒版本要锁定的要素", ["要素", "锁定内容", "更换后必须重做的桥接"], L ? [
        ["RNA", "CAR 序列、非翻译区、帽、poly(A)、修饰核苷", "表达时程和免疫刺激"],
        ["脂质", "可离子化脂质、辅助脂质、胆固醇、PEG 脂质及摩尔比", "分布、ADA、冷链"],
        ["配体", "分子、密度、偶联化学、在颗粒上的取向", "细胞选择性与脱靶"],
        ["工艺", "混合、下游、过滤、冻融", "粒径分布与包封"],
      ] : [
        ["转移基因组", "启动子、CAR、调控元件、自灭活构型", "表达水平和完整性"],
        ["包膜", "糖蛋白或 fusogen、靶向结合臂、去靶向突变", "细胞选择性与血清稳定性"],
        ["生产系统", "包装细胞、质粒比例、收获标准", "功能滴度与 RCL 风险"],
        ["剂量单位", "功能滴度定义和感染复数的临床含义", "动物到人的桥接"],
      ])),
      sec("flags", "本节点红旗", "Node Flags", flagList([
        { level: "stop", text: "毒理、临床和拟商业处方不是同一版本，且没有可比性研究。" },
        { level: "watch", text: "把不同实验里最好的分布、杀伤和安全图拼成一张平台图。" },
      ])),
      sec("room", "数据室", "Data Room", room([
        ["版本台账", "批次、规格、供应商、研究编号", "每项关键实验能指回批号", "证据链记为无法评估"],
        ["变更表", "风险评估和桥接实验", "变更对分布或整合的影响有数据", "变更后的主张降为有支持"],
      ])),
    ],
    sources: ["R01", "V3L12", "V5C10"],
    related: [{ id: "D02", zh: "证据衔接", en: "Bridging" }, { id: "C01", zh: "CMC", en: "CMC" }],
  }));

  add(leaf({
    id: "B", parentId: "", number: "2", depth: 1,
    title: L ? "作用机制链：瞬时 RNA-LNP" : "作用机制链：整合型靶向慢病毒",
    title_en: L ? "Mechanism Chain: Transient RNA-LNP" : "Mechanism Chain: Integrating Targeted Lentivirus",
    question: "从瓶子到疾病终点，限制步骤在哪一环？",
    focus: "限制步骤用读数定位，不合并成一个递送效率。",
    sections: [sec("chain", "链条", "Chain", L
      ? table("LNP 链条", ["环", "节点", "要分开的读数"], [
        ["窗口与剂量", "2.1", "暴露、表达时长、药效学、再给药"],
        ["CAR 分子", "2.2", "抗原密度阈值、正常组织"],
        ["颗粒", "2.3", "组成、选择性器官靶向（SORT）、异质性"],
        ["谁拿到 RNA", "2.4", "配体靶向 vs 肝/脾"],
        ["胞内", "2.5", "释放与功能蛋白"],
        ["细胞", "2.6", "数量、功能、消退"],
        ["再给药", "2.7", "抗 PEG、ADA"],
        ["疾病", "2.8", "药效学 vs 临床终点"],
      ])
      : table("慢病毒链条", ["环", "节点", "要分开的读数"], [
        ["不可逆性", "2.1", "整合、插入突变、不能停药"],
        ["基因组与 CAR", "2.2", "构型完整性、抗原"],
        ["颗粒靶向", "2.3", "假型、fusogen、结合臂"],
        ["谁被整合", "2.4", "组织与非靶细胞"],
        ["负荷", "2.5", "转导、VCN、克隆"],
        ["细胞功能", "2.6", "数量与效应"],
        ["单次给药", "2.7", "持久性与迟发风险"],
        ["疾病", "2.8", "缓解、复发、救援"],
      ]))],
    sources: L ? ["S01", "R02"] : ["R02", "R05"],
    related: [{ id: L ? "B01" : "L01", zh: "第一环", en: "First Link" }],
  }));

  if (L) {
    add(lnpMechanism());
  } else {
    add(lvMechanism());
  }

  add(devNodes(L));
  add(ipNodes(L));
  add(marketNodes());
  add(decisionNodes(route));
  return nodes.flat();
}

function lnpMechanism() {
  return [
    leaf({
      id: "B01", parentId: "B", number: "2.1", depth: 2,
      title: "瞬时表达、给药周期与剂量–暴露–药效", title_en: "Transient Expression, Schedule, and Dose–Exposure–Response",
      question: "一次暴露的功能窗口有多长，计划中的下一次给药是否还做得到？",
      focus: "药代动力学/药效学（Pharmacokinetics/Pharmacodynamics, PK/PD）按同一版本产品连成链。",
      sections: [
        sec("chain", "要连起来的四个量", "Four Linked Quantities", table("剂量–暴露–药效", ["量", "最低测量", "验收", "不能代替它的读数"], [
          ["暴露", "血浆或全血 mRNA，以及靶组织中的剂量", "有时间点和定量下限", "粒径或包封率"],
          ["表达", "目标 T 细胞上的 CAR 蛋白，含达峰和消退", "与 mRNA 时程一致，而不是遗传标记", "Cre 或报告蛋白的永久信号"],
          ["细胞数量", "CAR 阳性细胞的绝对计数，不只是百分比", "能对应疾病所需的效应细胞量级", "D-5"],
          ["药效学", "目标细胞清除的深度、组织和恢复", "与表达窗口重叠", "D-4 单独使用"],
        ]) + src(["S01", "V3C01", "V3C02"])),
        sec("sched", "给药周期", "Schedule", bullets([
          "单次、两次和维持给药是不同的 TPP。方案要写间隔、允许的延迟和停药规则。",
          "推荐的 II 期剂量（Recommended Phase 2 Dose, RP2D）来自 DLT、暴露和药效学，不是来自动物最大耐受量的直接换算。",
          "HN2301 的公司新闻稿描述了 2 mg 与 4 mg 以及数天的 B 细胞清除；NEJM 摘要没有这些数字。引用时保持这个界限（N18、N19）。",
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "stop", text: "计划剂量范围内，暴露、表达和药效学之间没有可解释关系。" },
          { level: "watch", text: "只报告给药后 6 小时的阳性率，没有消退曲线。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["PK/PD 数据包", "个体曲线，不是均值幻灯片", "四个量能在同一受试者上对齐", "2.1 记为未支持"],
          ["给药方案依据", "方案摘要和模拟", "写明 RP2D 候选和会被否定的观测", "不讨论注册剂量"],
        ])),
      ],
      sources: ["S01", "V3C01", "V3C02", "N18", "N19", "N27"],
      related: [{ id: "B07", zh: "重复给药免疫原性", en: "Redosing Immunogenicity" }, { id: "C04", zh: "临床剂量", en: "Clinical Dose" }],
    }),
    leaf({
      id: "B02", parentId: "B", number: "2.2", depth: 2,
      title: "核酸载荷与 CAR 抗原靶向", title_en: "RNA Payload and CAR Antigen Targeting",
      question: "CAR 在抗原密度和正常组织条件下是否按设计工作？",
      focus: "这是 D-3。配体问题在 2.4。",
      sections: [
        sec("car", "CAR 判据", "CAR Criteria", table("分子设计", ["对象", "要测", "门槛", "来源"], [
          ["识别", "目标抗原密度下的激活和杀伤；正常组织抗原", "有患者材料或等同密度，而不是只有高表达细胞系", "V5C12 V3D16"],
          ["结构", "铰链、跨膜、共刺激（如 4-1BB）、CD3ζ；强直信号", "强直信号和耗竭标志被测量", "V5C08 V3D15"],
          ["RNA", "帽、UTR、poly(A)、修饰核苷、双链 RNA（dsRNA）", "dsRNA 有放行限度并与细胞因子释放相关联", "V3D14 V5C11 V3L17"],
          ["逻辑门", "若使用双抗原或抑制受体，写明失效时的默认状态", "失效偏向已在材料中测试", "V5C13"],
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "stop", text: "已知正常组织高表达该抗原，且没有密度阈值或逻辑门数据。" },
          { level: "watch", text: "只优化了体外杀伤百分比，没有抗原密度曲线。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["CAR 构建包", "序列、结构和强直信号实验", "与临床序列一致", "序列不一致则整包降级"],
          ["dsRNA 与细胞因子", "检测方法验证和批次数据", "能解释早期输液反应", "安全性数据包不完整"],
        ])),
      ],
      sources: ["V5C12", "V3D16", "V5C08", "V3D14", "V5C13", "V5C09"],
      related: [{ id: "B04", zh: "配体与脱靶转染", en: "Ligand and Off-target" }, { id: "C01", zh: "mRNA 放行", en: "mRNA Release" }],
    }),
    leaf({
      id: "B03", parentId: "B", number: "2.3", depth: 2,
      title: "LNP 组成、SORT 与颗粒异质性", title_en: "LNP Composition, SORT, and Particle Heterogeneity",
      question: "颗粒里实际有什么，批次之间是否是同一种药？",
      focus: "组成决定分布和免疫原性。SORT 不是配体靶向。",
      sections: [
        sec("comp", "组分", "Composition", table("制剂要素", ["组分", "尽调要看", "常见误用", "来源"], [
          ["可离子化脂质", "结构、表观 pKa、摩尔比、降解性", "用 Onpattro 或疫苗脂质的标签证明 T 细胞递送", "V5L01 V5L02 V5L03"],
          ["PEG 脂质", "链长、摩尔比、脱落速率", "忽略重复给药时的抗 PEG 抗体", "V5L38 V3L04"],
          ["SORT 脂质", "是否为第五组分、百分比、器官转移的物种", "把小鼠肝-脾-肺转移直接写成人体 T 细胞选择性", "S03 S02 N25"],
          ["异质性", "空颗粒、RNA 装载分布、多分散性", "只报告平均粒径和平均包封率", "V3L06 V3L08"],
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "watch", text: "SORT 论文或第五组分被描述成抗体配体靶向。" },
          { level: "watch", text: "没有空颗粒或装载分布数据，却声称剂量线性。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["处方与脂质分析", "摩尔比、杂质、供应商", "临床批次有实测而不是理论投料", "CMC 记为无法评估"],
          ["颗粒分布", "单颗粒或等效正交方法", "能说明装载不是只有平均值", "异质性风险保持打开"],
        ])),
      ],
      sources: ["S02", "S03", "V5L01", "V3L04", "V3L06", "N25", "N35"],
      related: [{ id: "D03", zh: "LNP 专利地雷图", en: "LNP FTO" }, { id: "B07", zh: "抗 PEG", en: "Anti-PEG" }],
    }),
    leaf({
      id: "B04", parentId: "B", number: "2.4", depth: 2,
      title: "靶向配体与脱靶转染分布", title_en: "Targeting Ligand and Off-target Transfection",
      question: "功能 mRNA 进了哪一群细胞，肝和脾各占多少？",
      focus: "这是 D-2。蛋白冠、内化和脱靶表达都要量化。",
      sections: [
        sec("dist", "分布判据", "Distribution Criteria", table("谁拿到载荷", ["问题", "最低证据", "红旗", "来源"], [
          ["目标亚群", "CD8、CD4 或其他预设亚群的功能表达，含绝对数", "只有总 T 细胞百分比", "S01 V3L05"],
          ["肝", "肝细胞与非实质细胞的表达", "肝脏信号被解释成成功的脾/免疫递送", "R02 S02"],
          ["脾与骨髓", "解剖部位和细胞类型", "把器官发光当成 T 细胞", "S03"],
          ["蛋白冠与 PEG 脱落", "血清孵育后的配体保留和摄取变化", "只做缓冲液中的结合", "V3D05 V5L31"],
          ["配体化学", "偶联位点、密度、对毒性的影响", "密度越高越好且无脱靶曲线", "V5L27"],
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "stop", text: "在相关物种中，功能性表达以肝细胞为主，目标 T 细胞没有足够绝对数。" },
          { level: "watch", text: "配体只在体外细胞系证明结合。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["生物分布包", "ICH S12 要素：物种、时间点、方法灵敏度", "细胞类型而不只是器官匀浆", "2.4 最高为有支持"],
          ["配体表征", "密度与批次", "临床批次在规格内", "靶向主张与批次脱钩"],
        ])),
      ],
      sources: ["S01", "R02", "V3L05", "V3D05", "V5L27", "V3D02"],
      related: [{ id: "B02", zh: "CAR 抗原靶向", en: "CAR Targeting" }, { id: "C03", zh: "非临床分布", en: "Nonclinical BD" }],
    }),
    leaf({
      id: "B05", parentId: "B", number: "2.5", depth: 2,
      title: "胞内释放与表达动力学", title_en: "Cytosolic Release and Expression Kinetics",
      question: "颗粒进细胞之后，有多少成为功能 CAR？",
      focus: "内体逃逸的文献数值只属于被引用的那个体系。",
      sections: [
        sec("endo", "胞内步骤", "Intracellular Steps", table("从内吞到蛋白", ["步骤", "可接受的证据", "边界", "来源"], [
          ["摄取与内体", "目标原代 T 细胞，而不是只有报告细胞系", "摄取不等于表达", "V3D07"],
          ["释放", "功能蛋白或治疗性 CAR，正交方法", "siRNA 影像研究中的释放比例不能外推", "V5L36 V5L37 V3D10"],
          ["天然免疫", "dsRNA、TLR 和补体与处方的关系", "疫苗反应原性不等于 CAR 表达窗口", "V3L03 V3D08"],
          ["时长", "CAR 蛋白的小时到天曲线", "mRNA 稳定化元件要在本品上验证", "V3P02"],
        ])),
        sec("room", "数据室", "Data Room", room([
          ["表达动力学", "个体或动物的时间序列", "覆盖达峰和低于检测限", "窗口长度记为未支持"],
        ])),
      ],
      sources: ["V5L36", "V5L37", "V3D10", "V3D07", "V3P02", "V3L03"],
      related: [{ id: "B01", zh: "剂量–暴露–药效", en: "PK/PD" }],
    }),
    leaf({
      id: "B06", parentId: "B", number: "2.6", depth: 2,
      title: "体内 CAR-T 的形成、功能与消退", title_en: "In Vivo CAR-T Formation, Function, and Decay",
      question: "形成的细胞是不是预期的效应细胞，消退后还剩下什么？",
      focus: "细胞是药理结果，不是 CMC 放行对象。",
      sections: [
        sec("cell", "细胞读数", "Cell Readouts", table("形成与功能", ["读数", "回答", "还要同时有", "来源"], [
          ["表型", "初始、记忆、耗竭", "绝对计数", "V3D19 V3P01"],
          ["功能", "杀伤、细胞因子、体内目标细胞清除", "抗原密度", "V5C12"],
          ["组织", "淋巴结、骨髓、病灶", "血中动力学", "S01"],
          ["消退", "CAR 蛋白和功能何时低于检测", "ADA 采样", "V3C01"],
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "watch", text: "只给百分比曲线，没有绝对数和表型。" },
          { level: "stop", text: "功能实验用的是另一种 CAR 或另一种脂质。" },
        ])),
      ],
      sources: ["S01", "V3C01", "V3D19", "V5C12"],
      related: [{ id: "B08", zh: "疾病终点", en: "Disease Endpoints" }],
    }),
    leaf({
      id: "B07", parentId: "B", number: "2.7", depth: 2,
      title: "重复给药免疫原性与抗 PEG 抗体", title_en: "Repeat-dose Immunogenicity and Anti-PEG Antibodies",
      question: "第二次给药时，表达和药效还在吗？",
      focus: "LNP 路线若依赖再给药，这一节是一级风险，不是附录。",
      sections: [
        sec("ada", "免疫原性面板", "Immunogenicity Panel", table("每次给药都要测", ["分析物", "采样", "与药效的关系", "来源"], [
          ["抗 PEG", "给药前基线、每次给药后", "与表达下降或加速清除的关系", "V3L04 V5L18"],
          ["抗脂质 / 抗配体", "同上", "是否改变分布", "V3L03"],
          ["抗 CAR", "表达窗口内和之后", "是否清除 CAR 阳性细胞", "N26"],
          ["补体与输液反应", "给药当日", "与预用药的关系", "V5C04"],
        ])),
        sec("design", "设计含义", "Design Implications", bullets([
          "降低 PEG 暴露的化学（刷状聚合物脂质、聚肌氨酸等）必须在本品重复给药实验里证明，文献阳性不够（V3L04、V5L18、V5L19）。",
          "CPTX2309 的登记终点包含 ADA（N26）。这是同类 I 期已经在测的项目，不是额外科学兴趣。",
          "若 TPP 是单次给药，写明疾病任务为何不需要第二次，并仍测量基线抗 PEG，因为预存抗体可以影响第一次。",
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "stop", text: "第二次暴露后功能性表达或药效学消失，且没有非 PEG 处方的桥接。" },
          { level: "watch", text: "只有第一次给药的免疫原性，方案却是多次给药。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["重复给药包", "每次的 PK、CAR、药效学、ADA", "至少覆盖计划中的给药次数", "再给药主张记为存在反证或未支持"],
        ])),
      ],
      sources: ["V3L04", "V5L18", "V5L19", "V3L03", "N26", "N27"],
      related: [{ id: "B01", zh: "给药周期", en: "Schedule" }, { id: "E01", zh: "否决项", en: "Red Flags" }],
    }),
    leaf({
      id: "B08", parentId: "B", number: "2.8", depth: 2,
      title: "药效学标志与持久临床获益", title_en: "Pharmacodynamic Signals and Durable Clinical Benefit",
      question: "哪一个终点可以写进适应症句子？",
      focus: "D-4 与 D-6 在这里落地。",
      sections: [
        sec("end", "终点层级", "Endpoint Hierarchy", table("从标志到获益", ["层级", "例子", "能支持的句子"], [
          ["药效学", "循环或组织 B 细胞、骨髓瘤血清标志的短期变化", "药物有生物学活性"],
          ["临床缓解", "按预定义标准的 ORR、CR、sCR、自身免疫活动指数", "在该时点、该人群观察到缓解"],
          ["持久获益", "停药后的维持、PFS、器官功能、感染与免疫球蛋白", "需要与随访成熟度一起报告"],
        ]) + src(["V5C02", "N10", "N19"])),
        sec("room", "数据室", "Data Room", room([
          ["终点定义", "方案统计章节", "与 TPP 用词一致", "用词不一致则临床维度降级"],
        ])),
      ],
      sources: ["V5C02", "N10", "N19", "V32C02"],
      related: [{ id: "C04", zh: "临床开发", en: "Clinical Development" }, { id: "Z02", zh: "评估纪律", en: "Discipline" }],
    }),
  ];
}

function lvMechanism() {
  return [
    leaf({
      id: "L01", parentId: "B", number: "2.1", depth: 2,
      title: "整合、插入突变与无法停药", title_en: "Integration, Insertional Mutagenesis, and Inability to Withdraw",
      question: "如果出现克隆风险，临床团队用什么行动，而不是用停药？",
      focus: "单次整合给药的安全含义是不可逆。",
      sections: [
        sec("risk", "风险链", "Risk Chain", table("整合风险", ["问题", "证据", "行动阈值应写在哪", "来源"], [
          ["整合位点偏好", "非临床插入位点，含与原癌基因的距离", "研究者手册和方案", "R03 R05"],
          ["克隆动力学", "纵向唯一整合位点或等效方法", "方案的监测计划和数据安全监查", "N23"],
          ["恶性信号", "与已上市自体 CAR-T 黑框警告的相关性论证", "风险管理计划", "V5C07"],
          ["不可逆", "没有药物撤退路径时的知情同意", "同意书原文", "R05"],
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "stop", text: "已观察到克隆显性或非预期造血干细胞整合，且方案没有预先规定的临床行动。" },
          { level: "watch", text: "只引用第三代自灭活骨架的一般安全性。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["整合与克隆包", "位点、纵向克隆、统计计划", "能回答“何时升级检查”", "2.1 记为未支持"],
        ])),
      ],
      sources: ["R03", "R05", "N23", "V5C07"],
      related: [{ id: "L05", zh: "VCN 与克隆", en: "VCN and Clonality" }, { id: "C04", zh: "临床随访", en: "Follow-up" }],
    }),
    leaf({
      id: "L02", parentId: "B", number: "2.2", depth: 2,
      title: "转移基因组与 CAR 设计", title_en: "Transfer Genome and CAR Design",
      question: "进入细胞的基因组是否完整，CAR 是否在抗原密度上按设计工作？",
      focus: "载体构型完整性与抗原识别分开。",
      sections: [
        sec("genome", "基因组与 CAR", "Genome and CAR", table("设计要素", ["要素", "要测", "门槛", "来源"], [
          ["构型", "自灭活、启动子、完整转移、重排", "临床批次有完整性规格", "R01"],
          ["CAR", "抗原密度曲线、正常组织、强直信号", "与临床序列一致", "V5C12 V5C08 V3D16"],
          ["调控", "是否存在组成型高表达导致的耗竭", "有表型数据", "V3D19"],
          ["逻辑门", "失效默认状态", "已测试", "V5C13"],
        ])),
        sec("room", "数据室", "Data Room", room([
          ["载体图谱与序列", "与主文件一致的图谱", "批次测序或等效", "版本不能冻结"],
        ])),
      ],
      sources: ["R01", "V5C12", "V5C08", "V3D16", "V5C13"],
      related: [{ id: "L03", zh: "假型化", en: "Pseudotyping" }],
    }),
    leaf({
      id: "L03", parentId: "B", number: "2.3", depth: 2,
      title: "载体构型、假型化与靶向", title_en: "Vector Architecture, Pseudotyping, and Targeting",
      question: "融合和结合是否被设计成只在目标细胞发生？",
      focus: "包膜决定 D-2。文献中的 fusogen 平台不是临床疗效。",
      sections: [
        sec("env", "包膜判据", "Envelope Criteria", table("靶向设计", ["设计", "要证明", "不够的证据", "来源"], [
          ["去靶向 fusogen", "失去天然受体结合后的残余转导", "只展示示意图", "N30"],
          ["结合臂", "目标受体密度下的功能转导，而不是只做结合", "体外高表达细胞的一次实验", "N30 V3R01"],
          ["血清稳定性", "人血清中的感染性和补体", "缓冲液滴度", "N30"],
          ["纳米抗体或配体展示", "在颗粒上的拷贝数和脱落", "血浆发光", "N08"],
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "stop", text: "功能转导在非靶长寿命细胞成立，且没有工程化改造将其降到方案可接受范围。" },
          { level: "watch", text: "用 VSV-G 广谱假型的历史数据证明当前靶向包膜。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["包膜表征", "身份、含量、功能滴度", "与靶向实验是同一批次", "靶向主张降级"],
        ])),
      ],
      sources: ["N30", "V3R01", "N08", "N04"],
      related: [{ id: "L04", zh: "非靶整合", en: "Off-target Integration" }, { id: "D03", zh: "FTO", en: "FTO" }],
    }),
    leaf({
      id: "L04", parentId: "B", number: "2.4", depth: 2,
      title: "生物分布与非靶整合", title_en: "Biodistribution and Off-target Integration",
      question: "载体到了哪些组织，哪些组织发生了整合而不是一过性核酸？",
      focus: "ICH S12 的组织列表要加上整合这一终点。",
      sections: [
        sec("bd", "分布", "Biodistribution", table("终点", ["样本", "回答", "不回答", "来源"], [
          ["载体核酸", "组织时间曲线", "暴露", "是否已整合", "R02"],
          ["整合", "目标与非靶细胞的整合检测", "遗传物质留下了", "克隆是否危险", "R05"],
          ["表达", "CAR 蛋白的细胞类型", "谁在表达", "疾病是否好转", "V3R01"],
          ["脱落", "血液、尿、唾液等", "环境与密切接触者风险", "疗效", "V3R03"],
        ])),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "stop", text: "生殖系或造血干细胞的整合信号没有被排除，也没有监测计划。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["分布与整合报告", "GLP 或等同质量体系", "细胞类型分辨率达到方案承诺", "非临床门不通过"],
        ])),
      ],
      sources: ["R02", "R05", "V3R03", "V3R01"],
      related: [{ id: "C03", zh: "非临床", en: "Nonclinical" }],
    }),
    leaf({
      id: "L05", parentId: "B", number: "2.5", depth: 2,
      title: "转导、VCN 与克隆动力学", title_en: "Transduction, VCN, and Clonal Dynamics",
      question: "每个细胞里有多少拷贝，优势克隆是否在扩大？",
      focus: "VCN 是负荷，不是获益。",
      sections: [
        sec("vcn", "负荷", "Burden", table("读数", ["定义", "方法学要求", "临床用法", "来源"], [
          ["功能滴度", "能转导目标细胞的颗粒", "对照细胞和读出要与效力相关", "剂量单位", "R01 V32A01"],
          ["VCN", "每细胞或每基因组拷贝", "验证过的定量方法", "描述负荷和工艺", "N37"],
          ["克隆", "独特整合位点的丰度随时间", "灵敏度足以看到扩张", "触发加做检查", "N23"],
          ["RCL", "复制能力", "生产与患者随访分开", "阳性质控批次的处置", "N37 V3R02"],
        ])),
        sec("room", "数据室", "Data Room", room([
          ["VCN/RCL 验证报告", "专属性、定量限、稳定性", "覆盖临床检测实验室", "安全性门不通过"],
        ])),
      ],
      sources: ["R01", "V32A01", "N37", "V3R02", "N23"],
      related: [{ id: "C01", zh: "放行", en: "Release" }, { id: "L01", zh: "插入突变", en: "Insertional Risk" }],
    }),
    leaf({
      id: "L06", parentId: "B", number: "2.6", depth: 2,
      title: "体内 CAR-T 的形成、持久性与功能", title_en: "Formation, Persistence, and Function",
      question: "持续存在的细胞是否仍有功能，表型是否在耗竭？",
      focus: "持久性分成分子持续、细胞持续和功能持续。",
      sections: [
        sec("pers", "三层持久性", "Three Layers", table("层级", ["测量", "可写的句子"], [
          ["分子", "载体序列仍可检出", "遗传物质还在"],
          ["细胞", "CAR 阳性细胞绝对数和表型", "这一群细胞还在，表型是……"],
          ["功能", "目标细胞控制或体外再刺激", "这一时点仍有功能"],
        ]) + src(["V3D19", "V3P01", "N10"])),
      ],
      sources: ["V3D19", "V3P01", "N10", "V5V09"],
      related: [{ id: "L07", zh: "单次给药含义", en: "Single Dose" }],
    }),
    leaf({
      id: "L07", parentId: "B", number: "2.7", depth: 2,
      title: "单次给药的持久性与安全含义", title_en: "Persistence and the Safety Meaning of a Single Dose",
      question: "持久是疗效来源，也是不能撤回的原因。方案如何同时写这两面？",
      focus: "不要只写现货优势。",
      sections: [
        sec("both", "同一事实的两面", "Both Sides", table("观察", ["疗效解释", "安全解释", "方案应有的句子"], [
          ["CAR 阳性细胞在数月后仍可检出", "可能支持监视", "也可能支持迟发毒性", "监测频率和升级检查"],
          ["无需第二次给药", "供应简单", "没有剂量下调", "首次剂量的爬坡规则更保守"],
          ["复发时疾病回来、细胞还在", "抗原丢失或耗竭", "继续存在的细胞仍可能造成毒性", "救援治疗与长期随访的接口"],
        ]) + note("ESO-T01 的 4 例延长随访里，1 例 sCR 维持到 15 个月，3 例在 3–5 个月进展。持久的分子存在并没有在该队列变成普遍的持久缓解（N10）。")),
        sec("flags", "本节点红旗", "Node Flags", flagList([
          { level: "watch", text: "幻灯片只使用“单次、现货、持久”，没有克隆监测。" },
        ])),
      ],
      sources: ["N10", "N09", "R05", "V5C07"],
      related: [{ id: "L08", zh: "疾病终点", en: "Disease" }, { id: "C05", zh: "随访监管", en: "LTFU Regulation" }],
    }),
    leaf({
      id: "L08", parentId: "B", number: "2.8", depth: 2,
      title: "药效、复发与治疗窗", title_en: "Activity, Relapse, and Therapeutic Window",
      question: "缓解按哪一套标准，复发后的数据如何进入 PFS？",
      focus: "小样本队列把个体过程写清楚，比再算一个百分比重要。",
      sections: [
        sec("end", "终点", "Endpoints", table("要预定义", ["终点", "骨髓瘤例子", "分析时的坑"], [
          ["ORR / CR / sCR", "IMWG", "与 MRD 灵敏度分开报告"],
          ["MRD", "部位、灵敏度、时点", "阴性不等于生存获益"],
          ["PFS", "进展或死亡", "挽救治疗是删失还是事件，必须预先写"],
          ["CRS / ICANS", "ASTCT", "不与 CTCAE 高级别血液学毒性混成一个“严重”"],
        ]) + src(["N10", "N12", "V5C04"])),
        sec("room", "数据室", "Data Room", room([
          ["个体游泳图", "缓解、进展、挽救、死亡", "能复算公开的中位 PFS", "对账完成前不引用该公司的汇总率"],
        ])),
      ],
      sources: ["N10", "N09", "N12", "V5C04", "V32C02"],
      related: [{ id: "P01", zh: "对标", en: "Landscape" }],
    }),
  ];
}

function devNodes(L) {
  return [
    leaf({
      id: "C", parentId: "", number: "3", depth: 1,
      title: "药品开发、CMC 与注册", title_en: "Development, CMC, and Registration",
      question: "哪一份资料能支持下一次监管沟通？",
      focus: "CMC、非临床、临床和地区路径分成四门，加上成本。",
      sections: [sec("map", "本章", "Map", table("开发节点", ["节点", "问题"], [
        ["3.1", L ? "mRNA 与 LNP 的 CQA、关键工艺参数（Critical Process Parameter, CPP）和放行" : "功能滴度、RCL 和放行"],
        ["3.2", L ? "冷链、放大和 COGS" : "产能、失败率和 COGS"],
        ["3.3", "非临床是否代表临床批次"],
        ["3.4", "DLT、RP2D、ASTCT 和终点"],
        ["3.5", "NMPA、FDA、EMA 与中国 IIT"],
      ]))],
      sources: ["R01"],
      related: [{ id: "C01", zh: "CMC", en: "CMC" }],
    }),
    leaf({
      id: "C01", parentId: "C", number: "3.1", depth: 2,
      title: L ? "mRNA 与 LNP 的 CMC" : "慢病毒 CMC、功能滴度与 RCL",
      title_en: L ? "mRNA and LNP CMC" : "Lentiviral CMC, Functional Titer, and RCL",
      question: "放行检验是否在控制体内会发生变化的那个质量属性？",
      focus: "药品生产质量管理规范（Good Manufacturing Practice, GMP）的深度随阶段增加，但身份和安全性检验从第一批临床药就要存在。",
      sections: [
        sec("cqa", "CQA", "CQAs", L
          ? table("LNP / mRNA", ["CQA", "为何与临床有关", "阶段门槛", "来源"], [
            ["身份与序列", "错误 CAR 不会被粒径发现", "临床批次确认", "R01"],
            ["完整性与 dsRNA", "翻译和先天免疫", "有限度的验证方法", "V3L17 V3L23"],
            ["包封与游离 RNA", "暴露和输液反应", "放行", "R01"],
            ["粒径与分布", "分布和稳定性", "不只是 Z-average", "V3L06"],
            ["配体含量", "细胞选择性", "临床批次", "V3L05"],
            ["效力", "功能蛋白或细胞反应，而不是只有效率", "与临床作用相关；效力保证草案不是法律", "V32A01 V3L11"],
            ["无菌与内毒素", "急性反应", "药典方法", "R01"],
          ])
          : table("慢病毒", ["CQA", "为何与临床有关", "阶段门槛", "来源"], [
            ["功能滴度", "剂量单位", "目标细胞读出", "R01 V32A01"],
            ["颗粒 / 感染比或空颗粒相关指标", "暴露但无功能", "有趋势和调查限度", "R01"],
            ["RCL", "可复制污染物", "生产和放行阴性", "N37 V3R02"],
            ["转移完整性", "重排和缺失", "放行", "R01"],
            ["工艺相关杂质", "宿主 DNA 和蛋白", "限度", "R01"],
            ["效力", "转导后的 CAR 功能", "不单独用基因组滴度", "V32A01 V3L11"],
          ])),
        sec("flags", "本节点红旗", "Node Flags", flagList(L ? [
          { level: "stop", text: "稳定性数据不覆盖拟定的运输和临床中心储存。" },
          { level: "watch", text: "效力是荧光报告基因，临床是 CAR。" },
        ] : [
          { level: "stop", text: "放行没有 RCL，或方法未验证。" },
          { level: "watch", text: "用物理颗粒数作为临床剂量。" },
        ])),
        sec("room", "数据室", "Data Room", room([
          ["质量规格和最近三批放行", "检验记录", "不合格调查可追溯", "CMC 门不通过"],
          ["稳定性方案", L ? "温度、冻融、配体保留" : "感染性和 RCL 相关稳定性", "覆盖临床使用", "储存条件不能写入 TPP"],
        ])),
      ],
      sources: L ? ["R01", "V32A01", "V3L11", "V3L17", "V3L06", "V5C05", "V5C06"] : ["R01", "V32A01", "V3L11", "N37", "V3R02", "V5C05"],
      related: [{ id: "C02", zh: "成本与放大", en: "COGS and Scale" }, { id: "A03", zh: "版本", en: "Version" }],
    }),
    leaf({
      id: "C02", parentId: "C", number: "3.2", depth: 2,
      title: L ? "冷链、工艺放大与 COGS" : "载体产能、失败率与 COGS",
      title_en: L ? "Cold Chain, Scale-up, and COGS" : "Vector Capacity, Failure Rate, and COGS",
      question: "放大之后还是同一种药，单次给药的完全成本由什么构成？",
      focus: "销售成本（Cost of Goods Sold, COGS）是模型，不是形容词。本框架不预填价格。",
      sections: [
        sec("model", "成本模型要拆开的项", "Cost Build-up", table("项", ["LNP 路线", "慢病毒路线", "缺失时"], [
          ["产量", "每批可灌装剂量；混合与切向流的收率", "每批功能滴度；生产体积", "无法谈供应"],
          ["失败", "外观、无菌、配体不合格率", "RCL、滴度不达标、污染", "成本被低估"],
          ["物流", "温度、有效期、报废", "同上，外加生物安全运输", "可及医院数是假的"],
          ["检测", "放行周期", "RCL 放行周期往往决定供货", "临床时间表不成立"],
          ["比较对象", "相对体外 CAR-T 的单采、制备失败和住院", "同上", "不要和自己的科研成本比"],
        ])),
        sec("scale", "放大", "Scale-up", bullets([
          "工艺变更按细胞和基因治疗的可比性思路评估（V3L12、V5C10）。分布或整合发生变化就不是小变更。",
          L ? "公开的 LNP 放大讨论（V3L15、V3L16）只作工程背景，不能代替本品的工程批次。" : "载体放大以功能滴度、RCL 和杂质的可比性为准，不以科研收获体积为准。",
        ])),
        sec("room", "数据室", "Data Room", room([
          ["COGS 模型", "电子表格，含假设", "每一项有批次数据或标明为假设", "商业化章节记为无法评估"],
          ["放大可比性", "变更清单", "CQA 对比", "商业批次主张无效"],
        ])),
      ],
      sources: L ? ["V3L12", "V5C10", "V3L15", "V3L16", "R01"] : ["V3L12", "V5C10", "R01"],
      related: [{ id: "H02", zh: "卫生经济", en: "Health Economics" }],
    }),
    leaf({
      id: "C03", parentId: "C", number: "3.3", depth: 2,
      title: "非临床与转化", title_en: "Nonclinical and Translation",
      question: "动物里阳性的那个批次，是不是要进人体的批次？",
      focus: "物种选择由生物学决定：受体、蛋白冠、免疫原性和疾病。",
      sections: [
        sec("nc", "非临床包", "Package", table("模块", ["LNP 重点", "慢病毒重点", "共同门槛", "来源"], [
          ["分布", "细胞类型级别的转染，含肝", "组织暴露加上整合", "ICH S12", "R02"],
          ["药效", "窗口是否够疾病任务", "单次后的持久控制", "与临床终点相关", "R03"],
          ["安全", "补体、细胞因子、肝酶、ADA", "RCL、插入位点、脱落", "GLP 毒理用临床代表批次", "R03 N37"],
          ["转化", "人源 T 细胞和 NHP 的差异写明", "受体分布的种属差异写明", "不把最敏感物种藏起来", "S01 N33"],
        ])),
        sec("room", "数据室", "Data Room", room([
          ["非临床综合摘要", "研究列表含批号", "每项主张能指到报告", "转化门不通过"],
        ])),
      ],
      sources: L ? ["R02", "R03", "S01", "V3C02"] : ["R02", "R03", "N33", "N37", "V3R03"],
      related: [{ id: L ? "B04" : "L04", zh: "分布", en: "Distribution" }],
    }),
    leaf({
      id: "C04", parentId: "C", number: "3.4", depth: 2,
      title: "临床开发与获益–风险", title_en: "Clinical Development and Benefit–Risk",
      question: "I 期要决定什么，而不是要证明什么？",
      focus: "I 期的主句是安全、耐受、PK/PD 和 RP2D。疗效是次要或探索。",
      sections: [
        sec("p1", "方案要素", "Protocol Elements", table("要素", ["写法", "来源"], [
          ["DLT", "观察窗、定义、扩大队列规则", "N28"],
          ["CRS / ICANS", "ASTCT 分级、托珠单抗和皮质类固醇规则", "V5C04 N28"],
          ["其他 AE", "治疗中出现的不良事件（Treatment-emergent Adverse Event, TEAE）与严重不良事件（Serious Adverse Event, SAE）分开；CTCAE 版本写明", "N28"],
          ["免疫原性", L ? "每次给药的 ADA 面板" : "抗载体与抗 CAR", L ? "N26" : "N09"],
          ["疗效", "预定义的 ORR/CR/PFS 或自身免疫终点；估计目标（estimand）写明挽救治疗", "V32C02"],
          ["停试", "触发条件，包括克隆或不可接受的免疫原性", L ? "B07" : "R05"],
        ])),
        sec("read", "早期读数怎么用", "How to Read Early Data", bullets([
          "ESO-T01 的期刊数字只按 5.1 的对账表引用。",
          "KLN-1010 的人体活性只引用 6 例摘要，直到更新摘要或全文替换 N12。",
          "HN2301 的 NEJM 摘要与公司新闻稿分开。",
          "没有公开疗效帖的资产（CPTX2309、INT2104、UB-VV111）在临床维度保持未支持，不用临床前填空。",
        ])),
        sec("room", "数据室", "Data Room", room([
          ["方案和 SAP", "含 estimand", "终点与 TPP 一致", "临床门不通过"],
          ["安全列表", "个体 AE、分级标准", "能核对新闻稿中的“无 ICANS”", "新闻稿句子不能使用"],
        ])),
      ],
      sources: ["V5C04", "V32C02", "N28", "N12", "N19", "N26"],
      related: [{ id: "P01", zh: "对标", en: "Landscape" }, { id: "E02", zh: "分阶段问题", en: "Stage Gates" }],
    }),
    leaf({
      id: "C05", parentId: "C", number: "3.5", depth: 2,
      title: "分区域监管：NMPA、FDA 与 EMA", title_en: "NMPA, FDA, and EMA",
      question: "这份中国早期数据准备用来回答哪个地区的哪个问题？",
      focus: "国家药品监督管理局（NMPA）路径和研究者发起的临床试验（Investigator-initiated Trial, IIT）是独立维度。多数已发表的早期体内 CAR-T 读数来自中国场景。",
      sections: [
        sec("reg", "地区差异", "Regional Differences", regMatrix()),
        sec("iit", "IIT 检查单", "IIT Checklist", bullets([
          "伦理批件、知情同意、方案版本和数据锁定日期。",
          "源数据是否按药物临床试验质量管理规范可追溯。",
          "与注册试验在人群、剂量和合并用药上的差异。",
          "是否已经或准备转化为研究性新药申请（Investigational New Drug, IND）、临床试验申请或后续的生物制品许可申请（Biologics License Application, BLA）/药品注册。新药申请（New Drug Application, NDA）这一用语只在适用的药品类型下使用。",
          "跨境使用时的人种、医疗实践和 CMC 场地桥接。IASO208 的 FDA IND 是公司公告中的个案（N22），不是通用通道。",
        ])),
        sec("ltfu", "随访年限", "Follow-up Duration", note("慢病毒：FDA 2020 年最终指导对整合载体的一般建议是 15 年（N23，并与既有条目 R05 一致）。中国征求意见稿报道中有相同量级的建议（N29、N34），生效状态要核对中文原文。RNA-LNP 不自动套用 15 年；若有整合风险以外的迟发问题，用产品风险评估说明随访长度。")),
        sec("room", "数据室", "Data Room", room([
          ["监管路径备忘录", "按地区各一页", "写明当前沟通和未回答问题", "注册维度记为无法评估"],
          ["IIT 资料包", "伦理、锁定、偏离", "能说明能否进入注册对话", "不把 IIT 缓解率写入注册价值"],
        ])),
      ],
      sources: ["R05", "N23", "N29", "N34", "N37", "N28", "N22", "V3L11", "V5C07", "V5C04"],
      related: [{ id: "P01", zh: "哪些读数来自中国", en: "China-origin Readouts" }, { id: "E03", zh: "决策门", en: "Gates" }],
    }),
  ];
}

function ipNodes(L) {
  return [
    leaf({
      id: "D", parentId: "", number: "4", depth: 1,
      title: "数据、知识产权与团队", title_en: "Data, Intellectual Property, and Team",
      question: "证据、权利和执行者是否指向同一个版本？",
      focus: "自由实施（Freedom to Operate, FTO）用地雷图，不用原则段落。",
      sections: [sec("map", "本章", "Map", bullets([
        "4.1 原始记录能否复原结论。",
        "4.2 版本变更有没有桥。",
        "4.3 组件级专利问题。",
        "4.4 谁能在十二个月内把缺口补上。",
      ]))],
      sources: ["V5E01", "V5E02"],
      related: [{ id: "D03", zh: "地雷图", en: "Minefield" }],
    }),
    leaf({
      id: "D01", parentId: "D", number: "4.1", depth: 2,
      title: "数据可靠性与可追溯性", title_en: "Data Reliability and Traceability",
      question: "关键数字能否从图表回到原始记录和批号？",
      focus: "汇总幻灯片不是数据。",
      sections: [
        sec("trace", "追溯", "Trace", table("对象", ["最低要求", "失败处置"], [
          ["临床终点", "数据库冻结说明和程序", "不能引用缓解率"],
          ["CMC", "检验记录和调查", "规格不可信"],
          ["非临床", "方案、偏离、GLP 状态", "转化降级"],
          ["公开论文与内部数据", "患者级对照表", "例数冲突保持打开"],
        ])),
        sec("room", "数据室", "Data Room", room([
          ["追溯样本", "抽 3 个关键数字做回溯", "能在访谈中走通", "团队维度降级"],
        ])),
      ],
      sources: ["V5E01", "V5C05"],
      related: [{ id: "A03", zh: "版本", en: "Version" }],
    }),
    leaf({
      id: "D02", parentId: "D", number: "4.2", depth: 2,
      title: "产品版本与证据衔接", title_en: "Version Control and Evidence Bridging",
      question: "变更之后，旧数据还代表新药吗？",
      focus: "可比性是实验问题。",
      sections: [
        sec("br", "桥接", "Bridging", table("变更", ["LNP 通常要重测", "慢病毒通常要重测", "来源"], [
          ["脂质或包膜", "分布、ADA、表达", "选择性、滴度、整合谱", "V3L12"],
          ["CAR 序列", "杀伤和安全", "同上，加完整性", "V5C10"],
          ["工艺场地", "CQA 全表", "功能滴度与杂质", "R01"],
        ])),
      ],
      sources: ["V3L12", "V5C10", "R01"],
      related: [{ id: "C01", zh: "CMC", en: "CMC" }],
    }),
    leaf({
      id: "D03", parentId: "D", number: "4.3", depth: 2,
      title: L ? "LNP 专利地雷图" : "慢病毒专利地雷图",
      title_en: L ? "LNP Patent Minefield" : "Lentiviral Patent Minefield",
      question: "哪一个组件可能需要许可，权利人是谁？",
      focus: "下表是问题清单，不是侵权意见，也不是到期日计算。",
      sections: [
        sec("map", "地雷图", "Minefield", L ? table("LNP 组件", ["组件", "公开锚点", "要问的 FTO 问题", "到期", "来源"], [
          ["四组分核酸 LNP", "诉状中的 US 8,058,069（陈述授权日 2011-11-15）、US 11,141,378（陈述授权日 2021-10-12）等；权利人侧为 Arbutus / Genevant", "临床摩尔比和脂质是否落入有效权利要求；许可是否覆盖治疗性 mRNA", "不计算", "N35 N24"],
          ["MC3 / Onpattro 体系", "标签中的 DLin-MC3-DMA；诉状称 Alnylam 在 Arbutus 许可下开发 Onpattro", "若使用 MC3 或近缘脂质，许可领域是否包含 T 细胞 CAR", "不计算", "V5L01 N35"],
          ["疫苗用可离子化脂质", "SM-102、ALC-0315 的标签与审评", "化学近缘是否另有权利要求；监管外推与专利分开", "不计算", "V5L02 V5L03"],
          ["SORT", "US 11,304,911，UT System；发明人 Cheng, Wei, Siegwart。论文披露 ReCode 获得相关许可", "第五组分是否实施该方法权利要求", "不计算", "N25 S03"],
          ["抗体或配体靶向", "Capstan tLNP 已由 AbbVie 持有；抗体捕获系统见研究文献。专利号未逐件打开", "CD3/CD5/CD8 结合臂和偶联化学的权利要求对照", "专利号未核实则不写到期", "N01 V3L05"],
          ["Acuitas 许可链", "诉状陈述 2018 年和解限制了 Acuitas 再使用 Arbutus 技术的范围", "本公司的脂质是否来自该链条，以及领域限制", "以合同为准", "N35"],
        ]) : table("慢病毒组件", ["组件", "公开锚点", "要问的 FTO 问题", "到期", "来源"], [
          ["去靶向 fusogen + 结合臂", "平台论文描述 Gen 2.1 fusogen 与 CD7 scFv。专利号本次未逐件核实", "融合蛋白和结合臂的权利要求；是否只覆盖某家公司的实施例", "未核实专利号，不写到期", "N30"],
          ["纳米抗体展示慢病毒", "AZ 对 EsoBiotec ENaBL 的收购公告", "颗粒表面结合分子的专利族", "不计算", "N08"],
          ["第三代自灭活骨架", "行业常用构型。哪些基础专利已到期必须由律师用法律状态证明", "口头“已过期”不接受", "不计算", "V5E02"],
          ["CAR 序列与 4-1BB", "学术和产品专利并存", "序列 FTO 与递送 FTO 分成两份意见", "不计算", "N11"],
          ["生产系统", "包装细胞和质粒", "生产专利是否限制 GMP 场地", "以合同为准", "R01"],
        ])),
        sec("ask", "意见书最低内容", "Opinion Minimum", bullets([
          "国家或地区、权利要求、产品特征对照、许可链、未决诉讼。",
          "意见书的日期和产品版本。版本变更后意见失效。",
          "WIPO 的 FTO 说明是方法学背景（V5E02），不是法律结论。",
        ])),
        sec("room", "数据室", "Data Room", room([
          ["FTO 意见", "外部律师，含权利要求对照表", "覆盖上表每一行", "知识产权维度记为无法评估，若核心行空白则可构成否决"],
          ["许可合同摘要", "领域、地域、里程碑、可转让性", "与收购后的权利人一致", "交易结构里的 IP 陈述不可信"],
        ])),
      ],
      sources: L ? ["N35", "N24", "N25", "V5L01", "V5L02", "V5E02", "S03", "N01"] : ["N30", "N08", "V5E02", "N11", "R01"],
      related: [{ id: "P02", zh: "交易可比", en: "Deal Comps" }],
    }),
    leaf({
      id: "D04", parentId: "D", number: "4.4", depth: 2,
      title: "团队与执行能力", title_en: "Team and Execution",
      question: "谁对失败实验负责，下一门的实验是否已排期？",
      focus: "头衔列表不回答执行。",
      sections: [
        sec("team", "访谈要听到的事", "What Interviews Must Produce", table("角色", ["必须能当场说明"], [
          ["CMC 负责人", "最近一次不合格和 CAPA"],
          ["药理", "限制步骤在链条的哪一环，证据编号"],
          ["临床", "DLT 定义和 ASTCT 表"],
          ["监管", "目标地区的未回答问题"],
          ["专利律师或外部顾问", "地雷图里最接近的权利要求"],
        ])),
      ],
      sources: ["V5E01"],
      related: [{ id: "E03", zh: "决策门", en: "Gates" }],
    }),
  ];
}

function marketNodes() {
  return [
    leaf({
      id: "P", parentId: "", number: "5", depth: 1,
      title: "竞争格局与差异化", title_en: "Competitive Landscape",
      question: "在同一证据等级上，本品和谁比？",
      focus: "对标表是活页。核验日之后的更新要改来源，不改表的结构。",
      sections: [sec("use", "用法", "Use", bullets([
        "先看证据等级，再看数字。新闻稿不与期刊全文比百分比。",
        "没有公开疗效的资产保留在表内，疗效格写“未见公开帖”。",
        "传奇生物与驯鹿生物有公开的体内项目，纳入表内，并标明披露级别。",
      ]))],
      sources: ["N01", "N03", "N12"],
      related: [{ id: "P01", zh: "对标矩阵", en: "Matrix" }],
    }),
    leaf({
      id: "P01", parentId: "P", number: "5.1", depth: 2,
      title: "对标矩阵与 ESO-T01 对账", title_en: "Benchmark Matrix and ESO-T01 Reconciliation",
      question: "每个被点名的项目，模态、读数和交易各有哪一级证据？",
      focus: "ESO-T01 的 4 例与 5 例不是加法题。",
      sections: [
        sec("land", "对标", "Benchmarks", landscapeTable() + src(["N01", "N03", "N06", "N08", "N12", "N15", "N19", "N20", "N21"])),
        sec("eso", "ESO-T01 口径", "ESO-T01 Reconciliation", esoRecon() + note("v6.4 将 Lancet 与 Nature Medicine 延长随访作为同一 4 例，并记载 1 例持续 sCR、3 例复发、中位 PFS 4.0 个月。延长随访原文支持这一描述（N10），且明确不得与初报相加成 8 例。v7.0 补上另一篇 Nature Medicine I 期报告的 5 例男性队列（N09）。两篇摘要的性别构成使 4 例队列不可能是 5 例队列的子集。重叠未知，患者级清单是数据室必选项。")),
        sec("kln", "KLN-1010 口径", "KLN-1010 Reconciliation", note("本框架只采用 ASCO 2026 摘要 7509 的 6 例：第 1 个月均 MRD 阴性，未见 ICANS（N12）。CRBC 的 18 例叙述含 ICANS，与摘要冲突，不采用（N31）。公司稿用于 Fast Track，不用于例数（N13）。")),
      ],
      sources: ["N09", "N10", "N11", "N12", "N28", "N31", "N18", "N19"],
      related: [{ id: "P02", zh: "交易可比", en: "Deals" }, { id: "X01", zh: "向公司要患者清单", en: "Data Room" }],
    }),
    leaf({
      id: "P02", parentId: "P", number: "5.2", depth: 2,
      title: "交易可比", title_en: "Transaction Comparables",
      question: "这些对价在调整阶段和信息差之后还说明什么？",
      focus: "锚用于提问，不用于把最高金额写成本品估值。",
      sections: [
        sec("deals", "公开对价", "Disclosed Consideration", dealTable()),
        sec("use", "调整项", "Adjustments", bullets([
          "阶段：临床前平台、无疗效的 I 期、摘要级 I 期、期刊小样本，不能共用一个倍数。",
          "结构：最高金额里的里程碑不是已经支付的对价。未披露的首付保持空白。",
          "交割：未见到完成公告的交易，状态写未核实。",
          "信息差：买方看到的数据室可能多于公开摘要。用公开锚解释价格时要承认这一点。",
        ])),
      ],
      sources: ["N01", "N02", "N03", "N08", "N14", "N15", "N06"],
      related: [{ id: "H03", zh: "定价与患者", en: "Pricing" }],
    }),
    leaf({
      id: "P03", parentId: "P", number: "5.3", depth: 2,
      title: "差异化判据", title_en: "Differentiation Tests",
      question: "差异是否落在可测量的终点上？",
      focus: "口号对照表。",
      sections: [
        sec("diff", "可接受的差异", "Acceptable Differences", table("主张", ["要看到的差异", "不够"], [
          ["更选择性", "同一物种、细胞类型分辨率的分布对比", "配体名字不同"],
          ["可重复给药", "第二次的表达和 ADA", "mRNA 理论上可重复"],
          ["更持久", "预定义时点的疾病终点，不只是 VCN", "整合等于持久缓解"],
          ["更安全", "同一分级标准下的 CRS/ICANS 和迟发事件", "摘要写无 ICANS，而更新稿相反且未被对账"],
          ["更可及", "天数、中心类型、失败率", "免单采这三个字"],
        ])),
      ],
      sources: ["N12", "N10", "N26"],
      related: [{ id: "E04", zh: "Scorecard", en: "Scorecard" }],
    }),
    leaf({
      id: "H", parentId: "", number: "6", depth: 1,
      title: "商业化与卫生经济", title_en: "Commercialization and Health Economics",
      question: "可及性是否能被算出来？",
      focus: "免清淋、免单采和门诊是假设，要用方案和成本模型检验。",
      sections: [sec("map", "三张表", "Three Tables", bullets(["6.1 时间与医疗资源。", "6.2 相对体外 CAR-T 的成本结构。", "6.3 患者与支付，不预填价格。"]))],
      sources: ["N10"],
      related: [{ id: "H01", zh: "可及性", en: "Access" }],
    }),
    leaf({
      id: "H01", parentId: "H", number: "6.1", depth: 2,
      title: "免清淋、免单采与可及性量化", title_en: "Quantifying No Lymphodepletion, No Apheresis, and Access",
      question: "和体外 CAR-T 比，决策到治疗的天数和医疗接触少了多少？",
      focus: "量化变量，不量化未提供的价格。",
      sections: [
        sec("q", "变量", "Variables", table("主张", ["测量", "反证", "公开线索"], [
          ["免单采", "方案是否有白细胞单采；决策到输液的日历天数", "仍需细胞处理中心", "KLN 摘要：同意到输液中位 13.5 天，n=6（N12）。只作为量级线索"],
          ["免清淋", "方案排除的淋巴细胞清除化疗清单", "实际使用了等效的淋巴细胞毒性方案", "ESO-T01：无清淋，但部分患者有地塞米松预用药（N11）"],
          ["门诊", "输液场所、留观时间、CRS 导致的住院和 ICU", "全部受试者住院处理 CRS", "摘要中的“有望门诊”不是已经门诊"],
          ["等待期风险", "对照体外 CAR-T 的等待死亡或进展", "本品自身的筛选失败和暂停供药", "延长随访转引美国真实世界：12 个月累计接受治疗不足 40%，等待期死亡 26%（N10 的转述）。尽调核对原文后再使用"],
        ])),
        sec("formula", "比较式", "Comparison", note("可及性差值用天数和事件表示：体外路径的（单采到回输天数，以及等待期进展或死亡）减去体内路径的（决策到输液天数，以及输液后因毒性住院的天数）。在数据室提供中心清单之前，不估计可治疗的医院数量。")),
      ],
      sources: ["N12", "N11", "N10", "N28"],
      related: [{ id: "H02", zh: "COGS", en: "COGS" }, { id: "A02", zh: "TPP", en: "TPP" }],
    }),
    leaf({
      id: "H02", parentId: "H", number: "6.2", depth: 2,
      title: "相对体外 CAR-T 的成本结构", title_en: "Cost Structure versus Ex Vivo CAR-T",
      question: "节省的是患者路径成本，还是只是把成本搬进了载体或 LNP？",
      focus: "两边都用完全成本。",
      sections: [
        sec("cmp", "成本对照", "Cost Comparison", table("成本块", ["体外自体 CAR-T", "体内 RNA-LNP", "体内慢病毒"], [
          ["起始物料", "患者单采和制备失败", "核苷、酶、脂质、配体", "质粒、包装细胞、血清"],
          ["放行周期", "每名患者", "批次，可多患者", "批次；RCL 可能主导周期"],
          ["失败的经济含义", "患者错过窗口", "批次报废", "批次报废且供应中断"],
          ["给药现场", "清淋、住院、托珠单抗", "预用药、观察、可能的再给药", "单次，但长期随访有年度成本"],
          ["不可逆性的成本", "细胞会持久，但是患者来源", "表达消退，再给药另计", "随访和克隆监测计入卫生经济"],
        ])),
        sec("room", "数据室", "Data Room", room([
          ["对照成本模型", "同一适应症的体外和体内", "假设逐项可开关", "没有模型则本章记为无法评估"],
        ])),
      ],
      sources: ["N10", "R01", "N23"],
      related: [{ id: "C02", zh: "工艺成本", en: "Process Cost" }],
    }),
    leaf({
      id: "H03", parentId: "H", number: "6.3", depth: 2,
      title: "定价、报销与患者规模", title_en: "Price, Reimbursement, and Patient Numbers",
      question: "支付方买的是一次输液，还是一个持久结果？",
      focus: "不预填标价和流行病学数字。",
      sections: [
        sec("ask", "要公司提供的测算", "Required Estimates", table("项", ["必须标明的限定", "不接受"], [
          ["目标患者", "地区、线次、诊断标准、年份", "全球所有 B 细胞疾病"],
          ["可及份额", "中心能力、冷链、筛选失败", "发病数乘渗透率"],
          ["价格锚", "国家、年份、渠道（标价或收购成本）、来源文件", "记忆中的体外 CAR-T 价格"],
          ["支付逻辑", "一次付费、按疗效或再给药", "没有结局数据时的疗效协议"],
          ["随访成本", "慢病毒路径的年度监测", "假设随访免费"],
        ])),
      ],
      sources: ["N14", "N02"],
      related: [{ id: "P02", zh: "交易锚", en: "Deal Anchors" }],
    }),
  ];
}

function decisionNodes(route) {
  const L = route === "LNP";
  const stageRows = L ? [
    ["临床前", "疾病任务与窗口的对应；细胞类型分布；重复给药的非临床 ADA；版本冻结", "只有器官发光"],
    ["IND-enabling", "GLP 毒理用代表批次；CQA 与稳定性覆盖临床；FTO 意见覆盖脂质和配体", "效力仍是报告基因"],
    ["I 期", "DLT 窗口、ASTCT、PK/PD 链、第一次与计划中的第二次给药", "用 B 细胞下降宣布免疫重置"],
    ["II 期及以后", "预定义终点、estimand、CMC 可比性、COGS 模型", "用 I 期新闻稿设计关键试验"],
  ] : [
    ["临床前", "功能转导的脱靶谱；整合位点；RCL 方法；单次给药的不可逆性已写入假设", "只有体外杀伤"],
    ["IND-enabling", "GLP、脱落、RCL 放行、随访方案预算到与风险相称的年限", "科研滴度作为临床剂量"],
    ["I 期", "DLT、ASTCT、克隆监测触发、个体缓解过程", "用 VCN 代替 ORR"],
    ["II 期及以后", "持久终点、长期随访的运营、产能与失败率", "把 15 年随访留到上市后再设计"],
  ];
  return [
    leaf({
      id: "E", parentId: "", number: "7", depth: 1,
      title: "综合决策", title_en: "Decision Tools",
      question: "做到哪一步就停，哪一步可以进入下一门？",
      focus: "工具给出材料。通过与否由尽调小组写下，本页不自动盖章。",
      sections: [sec("map", "四个工具", "Four Tools", bullets(["7.1 否决与观察。", "7.2 分阶段必答。", "7.3 决策门。", "7.4 Scorecard。"]))],
      sources: ["V5E01"],
      related: [{ id: "E01", zh: "红旗", en: "Red Flags" }, { id: "E04", zh: "Scorecard", en: "Scorecard" }],
    }),
    leaf({
      id: "E01", parentId: "E", number: "7.1", depth: 2,
      title: "红旗与否决项", title_en: "Red Flags and Deal-breakers",
      question: "哪一条已经足够停止推进？",
      focus: "否决项触发后，其余维度的“有支持”不能把项目说成可通过。观察项要求书面跟踪，不单独否决。",
      sections: [
        sec("list", "清单", "Checklist", flagChecklist(route) + note("勾选保存在本机，键名与路线相关，不会上传。否决项对应投资委员会材料里的停止建议；观察项对应下一次数据室补件。")),
        sec("rule", "使用规则", "Rules", bullets([
          "任一否决项有肯定证据：建议 No-Go，并写明哪一份文件构成证据。",
          "否决项因文件缺失而无法排除：不计为已触发，但 Scorecard 对应维度记为无法评估，决策门停在当前阶段。",
          "公司解释与原始表格冲突时，以表格为准，并把冲突写进 4.1。",
        ])),
      ],
      sources: ["V5E01", "N23", "N37"],
      related: [{ id: "E03", zh: "决策门", en: "Gates" }, { id: "E04", zh: "Scorecard", en: "Scorecard" }],
    }),
    leaf({
      id: "E02", parentId: "E", number: "7.2", depth: 2,
      title: "分阶段必答问题", title_en: "Stage-specific Questions",
      question: "这个阶段没有回答的问题，是否允许带着进入下一阶段？",
      focus: "必答不是资料堆叠。每一阶段只有少数问题能卡住大门。",
      sections: [
        sec("st", "阶段", "Stages", table("阶段", ["必须能回答", "不能带着走的缺口"], stageRows)),
        sec("q", "问题正文", "Questions", L ? bullets([
          "临床前：目标 T 细胞的功能性绝对数是否高于肝细胞表达所暗示的脱靶？抗 PEG 是否在第二次给药前已上升？",
          "IND-enabling：毒理批次和临床批次的脂质、配体和 dsRNA 是否在可比范围内？冷链是否覆盖首个临床中心？",
          "I 期：DLT 定义是否包含输液反应和 ASTCT 分级的 CRS/ICANS？PK/PD 四个量是否在同一受试者对齐？",
          "II 期及以后：终点和 estimand 是否与 TPP 一致？再给药方案是否仍被 ADA 数据支持？",
        ]) : bullets([
          "临床前：非靶组织的整合是否被细胞类型分辨？RCL 方法是否已定？",
          "IND-enabling：临床方案是否包含与整合风险相称的长期随访和预算？功能滴度是否能供应 I 期？",
          "I 期：克隆监测的触发规则是否可执行？个体游泳图是否在第一次中期分析前锁定定义？",
          "II 期及以后：产能、失败率和随访成本是否写进了同一份卫生经济草稿？",
        ])),
      ],
      sources: ["R01", "R03", "R05", "V32C02"],
      related: [{ id: "E03", zh: "决策门", en: "Gates" }],
    }),
    leaf({
      id: "E03", parentId: "E", number: "7.3", depth: 2,
      title: "Go / No-Go 决策门", title_en: "Go / No-Go Gates",
      question: "通过这一门的书面条件是什么？",
      focus: "每门同时写出 Go 和 No-Go。没有中间地带的形容词。",
      sections: [
        sec("gates", "门", "Gates", table("门", ["Go", "No-Go"], [
          ["进入 IND-enabling", "版本已冻结；分布或整合的限制步骤已定位；没有已触发的否决项", "关键实验来自另一版本，或否决项已有肯定证据"],
          ["进入人体", "代表批次的毒理和 CMC 放行完成；方案含 DLT 与 ASTCT；数据室 8.1 的安全文件夹齐全", "效力与临床作用无关，或随访/免疫原性计划空白"],
          ["进入剂量扩展或 II 期", "RP2D 有 PK/PD 理由；早期活性用的是预定义终点；竞品对账已更新", "活性来自新闻稿与摘要冲突的那一版，或 ADA/克隆信号被忽略"],
          ["进入关键试验或交易交割", "估计目标、CMC 场地和 COGS 假设可被复核；FTO 意见覆盖地雷图", "估值依赖未披露的疗效或未核实的交割状态"],
        ])),
        sec("out", "输出", "Output", note("建议在备忘录首页用四行：当前所在的门、已触发的否决项编号、无法评估的维度、下一次补件日期。不写综合分数。")),
      ],
      sources: ["V5E01", "R04"],
      related: [{ id: "E01", zh: "否决项", en: "Deal-breakers" }, { id: "X01", zh: "数据室", en: "Data Room" }],
    }),
    leaf({
      id: "E04", parentId: "E", number: "7.4", depth: 2,
      title: "一页纸 Scorecard", title_en: "One-page Scorecard",
      question: "十一个维度里，哪些已证实，哪些是反证？",
      focus: "审阅权重只表示阅读顺序。高权重未评估时，不进入下一门。",
      sections: [
        sec("card", "评级", "Ratings", note("已证实：同一版本、同一人群、预先规定终点。有支持：相邻证据。未支持：没有能回答的实验。存在反证：方向相反。无法评估：文件或方法不够。五档不换算成总分。") + `<div data-scorecard="${route}">${scorecardTable(route)}<p class="score-summary" data-score-summary>尚未评级。</p></div>`),
        sec("w", "权重的用法", "How Weights Work", bullets([
          "高：该维度未评估或存在反证时，决策门停止。",
          "中：可与高权重并行阅读；只有在红旗清单另有规定时才单独否决。",
          `本路线高权重维度：${scoreDims(route).filter((d) => d[1] === "高").map((d) => d[2]).join("、")}。`,
        ])),
      ],
      sources: ["V5E01"],
      related: [{ id: "E01", zh: "红旗", en: "Red Flags" }, { id: "Z01", zh: "评级口径", en: "Rating Rules" }],
    }),
    leaf({
      id: "X", parentId: "", number: "8", depth: 1,
      title: "数据室与修订记录", title_en: "Data Room and Revision Record",
      question: "清单能否直接发给公司？",
      focus: "8.1 是总表。各节点里的门槛是验收标准。",
      sections: [sec("how", "文件夹", "Folders", bullets([
        "01 公司与知识产权。02 产品与 TPP。03 CMC。04 非临床。05 临床。06 监管。07 商业化。08 竞争对账。",
        "每一行都有形式和“达不到时”的处置，避免只写“请提供相关数据”。",
      ]))],
      sources: [],
      related: [{ id: "X01", zh: "索取清单", en: "Request List" }],
    }),
    leaf({
      id: "X01", parentId: "X", number: "8.1", depth: 2,
      title: "数据室索取清单", title_en: "Data Room Request List",
      question: "第一封补件信要列哪些文件？",
      focus: "按文件夹发送。验收不通过则按处置列降级，不在邮件里重新谈判标准。",
      sections: [
        sec("list", "总表", "Master List", dataRoom(L)),
        sec("first", "第一批必索", "First Tranche", bullets(L ? [
          "版本台账和临床批次处方。",
          "细胞类型级别的分布。",
          "重复给药的 ADA 与表达。",
          "稳定性与冷链。",
          "方案中的 DLT 和 ASTCT。",
          "脂质与配体的 FTO 对照表。",
        ] : [
          "载体图谱、功能滴度和 RCL 验证。",
          "非靶整合与克隆监测计划。",
          "长期随访方案和预算。",
          "个体游泳图，以及与公开论文的患者对照。",
          "包膜/fusogen 的权利要求对照。",
          "产能与失败率。",
        ])),
      ],
      sources: ["R01", "V5E02", "N23"],
      related: [{ id: "E03", zh: "决策门", en: "Gates" }],
    }),
    leaf({
      id: "X02", parentId: "X", number: "8.2", depth: 2,
      title: "修订说明", title_en: "Revision Record",
      question: "v7.0 相对 v6.4 改了什么？",
      focus: "引用库保留。新增来源以 N 编号附在原列表之后。",
      sections: [
        sec("log", "v7.0（2026-10-12）", "v7.0", bullets([
          "由同一套 51/52 节点模板，改为按路线分开的机制、CMC 和安全节点。LNP 以瞬时窗口、肝/脾分布、重复给药免疫原性和冷链为主。慢病毒以整合、假型化、RCL、VCN、产能和不可停药为主。",
          "增加红旗清单、分阶段必答、Go/No-Go 和 Scorecard。评级不换算总分。",
          "原“尽调所需证据”改为数据室文件夹、证据形式和验收门槛。",
          "增加竞争对标、交易可比、卫生经济和 NMPA/FDA/EMA。",
          "FTO 改为组件级地雷图。到期日未计算的，表中写明不计算。",
          "ESO-T01：保留 4 例队列的中位 PFS 4.0 个月（N10），并列入 5 例男性的 Nature Medicine I 期报告（N09）。二者不相加。",
          "KLN-1010 继续只采用 6 例摘要；18 例媒体叙述标为冲突来源。",
          "v6.4 的原有参考文献整表保留，并保留证据范围与限制。术语表保留并补充监管和终点缩写。",
          "评估纪律收成一张表，减少各节重复的否定句。",
        ])),
        sec("keep", "仍保留的判断", "What Stayed", bullets([
          "制剂与体内细胞分开。递送靶向与 CAR 抗原靶向分开。药效学与持久获益分开。",
          "草案不写成生效指导。替代载荷不外推成本品时程。",
          "本文件给出尽调结构，不给任何公司自动通过的结论。",
        ])),
      ],
      sources: ["N09", "N10", "N12", "N31"],
      related: [{ id: "Z", zh: "回到摘要", en: "Summary" }],
    }),
  ];
}

function dataRoom(L) {
  const rows = [
    ["01 知识产权", "FTO 意见与许可摘要", "律师函、权利要求对照", "覆盖该路线地雷图的每一行", "知识产权维度无法评估"],
    ["02 产品", "TPP/QTPP 与版本台账", "表格", "每句主张对应终点和 CQA；实验能指回批号", "不进入下一门"],
    ["03 CMC", L ? "mRNA/LNP 规格、稳定性、三批放行" : "功能滴度、RCL、完整性、三批放行", "检验记录", "方法适用，稳定性能覆盖临床", "CMC 门 No-Go"],
    ["03 CMC", "COGS 与失败率", "电子表格", "假设和批次数据分开标色", "商业化记为无法评估"],
    ["04 非临床", "分布或整合、毒理、批号", "报告", "代表临床处方", "转化最高为有支持"],
    ["05 临床", "方案、SAP、个体安全与疗效", "PDF 与列表", "DLT、ASTCT、estimand 齐全", "新闻稿数字停用"],
    ["05 临床", "ESO-T01 或本品若涉及多篇论文", "患者级对照", "说明 4 例与 5 例是否重叠", "例数保持并列"],
    ["06 监管", "地区路径和 IIT 包", "备忘录、伦理批件", "写明用途和未回答问题", "不把 IIT 写入注册价值"],
    ["06 监管", L ? "免疫原性计划" : "长期随访方案与预算", "方案", L ? "覆盖计划中的每次给药" : "与整合风险相称，并对照 FDA 2020 年指导", "对应否决项视为未排除"],
    ["07 商业化", "天数、住院、中心、价格锚来源", "模型", "没有无来源的标价", "卫生经济无法评估"],
    ["08 竞争", "申办方对公开冲突的说明", "备忘录", "例如摘要与后续媒体的 ICANS 差异", "采用更保守的那一版"],
  ];
  return table("数据室总表", ["文件夹", "文件", "形式", "验收门槛", "达不到时"], rows);
}
