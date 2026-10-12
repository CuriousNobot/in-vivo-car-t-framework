import { table, cite, note, esc } from "./dd-lib.mjs";

/**
 * Sources added in v7.0. `routes` keeps a document out of a route that already
 * carries the same document under its v6.4 identifier.
 */
export const NEW_SOURCES = [
  ["N01", ["LNP", "LV"], "工业公开披露", "2025-08-19", "https://news.abbvie.com/2025-08-19-AbbVie-Completes-Acquisition-of-Capstan-Therapeutics", "AbbVie Completes Acquisition of Capstan Therapeutics", "AbbVie 宣布于 2025-08-19 完成对 Capstan 的收购。CPTX2309 被描述为处于 I 期、用于 B 细胞介导自身免疫病的靶向脂质纳米颗粒，在体内生成 CD19 特异性 CD8 阳性 CAR-T，设计上不使用清淋化疗。", "交割完成公告。不含疗效数字；平台描述不能外推为已证实的临床缓解。"],
  ["N02", ["LNP", "LV"], "工业公开披露", "2025-06-30", "https://news.abbvie.com/2025-06-30-AbbVie-to-Acquire-Capstan-Therapeutics,-Further-Strengthening-Commitment-to-Transforming-Patient-Care-in-Immunology", "AbbVie to Acquire Capstan Therapeutics", "最终协议：AbbVie 在交割时以现金收购 Capstan，对价最高 21 亿美元，受常规调整约束。CPTX2309 为向 CD8 阳性细胞毒 T 细胞递送 anti-CD19 CAR mRNA 的靶向脂质纳米颗粒。", "公告日对价。本公告口径为交割时支付的最高现金对价，不拆分未披露的首付款。"],
  ["N03", ["LNP", "LV"], "工业公开披露", "2025-08-21", "https://www.gilead.com/news/news-details/2025/kite-to-acquire-interius-biotherapeutics-to-advance-in-vivo-platform", "Kite to Acquire Interius BioTherapeutics", "Kite（Gilead）于 2025-08-21 宣布签署最终协议，以 3.5 亿美元现金收购 Interius 全部股权，交割时支付，受 HSR 等常规交割条件约束。", "签约公告，不是交割完成公告。本次检索未见单独的交割新闻稿，不得写成已交割对价。"],
  ["N04", ["LNP", "LV"], "工业公开披露", "2024-10-23", "https://www.globenewswire.com/de/news-release/2024/10/23/2967445/0/en/Interius-BioTherapeutics-Doses-First-Patient-with-in-vivo-Chimeric-Antigen-Receptor-CAR-Gene-Therapy-for-B-cell-Malignancies.html", "Interius doses first patient with INT2104", "2024-10-23 宣布 INVISE（NCT06539338）首例受试者接受 INT2104。公司描述为靶向 CD7 阳性 T/NK 细胞、递送 CD20 导向 CAR 的基因治疗，静脉单次给药，无需清淋或单采，在澳大利亚启动。", "首例给药新闻，无疗效读数。公司的 first-in-class 用语不是监管机构确认的全球第一。"],
  ["N05", ["LNP", "LV"], "临床试验登记", "2026-10-12 查阅", "https://clinicaltrials.gov/study/NCT06539338", "NCT06539338 INVISE / INT2104", "状态 ACTIVE_NOT_RECRUITING。申办方现列为 Kite, A Gilead Company。I 期、单次给药、复发/难治 B 细胞恶性肿瘤，研究开始日 2024-09-20。", "申办方变更与收购推进一致，但不替代交割公告。登记库无疗效结果。"],
  ["N06", ["LNP", "LV"], "工业公开披露", "2025-09-30", "https://www.umoja-biopharma.com/news/umoja-biopharma-announces-that-ub-vv111-receives-fda-fast-track-designation-for-relapsed-refractory-b-cell-malignancies/", "Umoja: UB-VV111 receives FDA Fast Track", "2025-09-30：FDA 授予 UB-VV111 Fast Track，适应症为既往至少二线后的复发/难治大 B 细胞淋巴瘤与慢性淋巴细胞白血病。产品为现货型、体内生成 CD19 CAR-T。公司称 2024 年其 IND 获 FDA 许可，并为首个获 FDA 许可 IND 的体内 CAR-T；AbbVie 对包括 UB-VV111 在内的 CD19 体内 CAR-T 持有独家选择权。", "Fast Track 不是批准，也不是疗效证据。IND“第一”为公司陈述。选择权的行权状态与经济条款未披露，不记金额。"],
  ["N07", ["LNP", "LV"], "临床试验登记", "2026-10-12 查阅", "https://clinicaltrials.gov/study/NCT06528301", "NCT06528301 UB-VV111", "I 期剂量递增与确证，复发/难治 LBCL 与 CLL，评估 UB-VV111 联合或不联合 rapamycin。状态 RECRUITING。登记估算入组 106 例。", "无公开疗效数字。估算入组不是已入组数。"],
  ["N08", ["LNP", "LV"], "工业公开披露", "2025-05-20", "https://www.astrazeneca.com/media-centre/press-releases/2025/acquisition-of-esobiotec-completed.html", "AstraZeneca: Acquisition of EsoBiotec completed", "AstraZeneca 宣布完成收购 EsoBiotec。对价最高 10 亿美元（现金且无债），含首付 4.25 亿美元与最高 5.75 亿美元开发/注册里程碑。平台为 Engineered NanoBody Lentiviral（ENaBL）。同日 SEC 6-K 口径一致：https://www.sec.gov/Archives/edgar/data/901832/000165495425005901/a3029j.htm", "公司公告，不提供 ESO-T01 的病例数或终点。"],
  ["N09", ["LNP", "LV"], "临床原始报告", "2026-03-25", "https://www.nature.com/articles/s41591-026-04244-6", "Nature Medicine phase 1: ESO-T01, five patients", "DOI 10.1038/s41591-026-04244-6。单臂 I 期。ESO-T01 为纳米抗体导向、免疫屏蔽的慢病毒载体，编码人源化 anti-BCMA CAR；单次静脉 0.2×10⁹ 转导单位，无单采、无体外制备、无清淋。连续入组 5 名经多线治疗的男性，中位随访 6.0 个月，试验于 2025 年提前停止。无剂量限制性毒性。4 例发生细胞因子释放综合征（3 级 3 例、2 级 1 例）。1 例 1 级 ICANS，并死于髓外病灶相关脊髓压迫。客观缓解 4/5，含 3 例严格完全缓解；可评估缓解者 4/4 在第 60 天 MRD 阴性（10⁻⁵）。", "与 4 例队列的性别构成不一致（本报告 5 名均为男性）。患者级对账完成前，不得与 4 例报告相加或互相替代。"],
  ["N10", ["LNP"], "临床原始随访报告", "2026-10-12 查阅", "https://www.nature.com/articles/s41591-026-04704-z", "Nature Medicine extended follow-up: ESO-T01, four patients", "同一 4 例队列的延长随访：2024-11-19 至 2025-01-17 入组，半数男性，中位既往 4 线，均有髓外病变。单次 0.2×10⁹ 转导单位，无单采、无清淋。客观缓解率 100%（2 例严格完全缓解、2 例部分缓解）。1 例严格完全缓解维持至 15 个月；其余 3 例分别在第 5、3、3 个月复发或进展，其后死亡（感染、疾病进展、颅内出血）。中位无进展生存期 4.0 个月（范围 3.0–15.0）。文中写明 EsoBiotec 被 AstraZeneca 收购后试验中止。", "明确是此前 4 例的随访，不是新队列。中位无进展生存期不代表可注册的持久获益。死亡发生在后线挽救之后，归因须读全文。慢病毒路线的同一文献为 V5V09。"],
  ["N11", ["LNP"], "临床原始报告", "2025", "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)01030-X/fulltext", "Lancet: in vivo BCMA CAR-T, four patients", "Xu 等，Lancet 病例系列：正在进行的 I 期最低剂量 4 例，剂量 2.0×10⁸ 转导单位（与 0.2×10⁹ 为同一数量级的不同写法），无预先单采和清淋，注册号 NCT06691685。CAR 含 anti-BCMA 重链可变域、CD8 铰链与跨膜区、4-1BB 与 CD3ζ。患者 2–4 在患者 1 的输液反应后额外接受 20 mg 地塞米松预用药。", "最低剂量、短随访的病例系列。地塞米松预用药说明“无清淋”不等于方案中没有皮质类固醇。慢病毒路线的同一文献为 V5V01。"],
  ["N12", ["LNP"], "临床会议摘要", "2026-05-27", "https://ascopubs.org/doi/10.1200/JCO.2026.44.16_suppl.7509", "ASCO 2026 abstract 7509: KLN-1010 inMMyCAR", "JCO 2026;44(16_suppl):7509。KLN-1010 为静脉给药、无需预处理化疗的改造慢病毒，在体内生成全人源 anti-BCMA CAR-T。截至摘要：6 例，两个剂量水平（6×10⁶ 与 2×10⁷ IU/kg）。6 例均在第 1 个月骨髓 MRD 阴性（5 例灵敏度 10⁻⁶，1 例 10⁻⁵）。细胞因子释放综合征 4 例，均为 2 级，中位起始第 11 天。未见 ICANS 或迟发神经毒性。同意到输注中位 13.5 天。NCT07075185。", "会议摘要，n=6。摘要与后续媒体口径冲突时以摘要为准。慢病毒路线的同一摘要为 V5V03。"],
  ["N13", ["LNP", "LV"], "工业公开披露", "2026", "https://www.biospace.com/press-releases/kelonia-therapeutics-presents-updated-first-in-human-data-from-phase-1-inmmycar-study-of-kln-1010-in-vivo-bcma-car-t-therapy-at-the-2026-american-society-of-clinical-oncology-asco-annual-meeting", "Kelonia ASCO 2026 company release", "公司称 KLN-1010 已获 FDA Fast Track，为直接输注、在体内生成 anti-BCMA CAR-T 的在研基因治疗，旨在避免体外 CAR-T 的等待和预处理化疗。", "本条只用于 Fast Track 与模态描述。疗效数字以会议摘要为准，不从本新闻稿补例数。"],
  ["N14", ["LNP", "LV"], "工业公开披露", "2026-04-20", "https://lilly.gcs-web.com/news-releases/news-release-details/lilly-acquire-kelonia-therapeutics-advance-vivo-car-t-cell", "Lilly to acquire Kelonia", "2026-04-20 最终协议：股东现金对价最高 70 亿美元，含首付 32.5 亿美元，其余为临床、注册和商业里程碑。预计 2026 年下半年交割，尚待常规交割条件。", "签约口径。2026-05-31 的行业报道仍称交易未交割；截至 2026-10-12 未检索到交割完成公告，交割状态记为未核实。"],
  ["N15", ["LNP", "LV"], "工业公开披露", "2026-02-09", "https://investor.lilly.com/news-releases/news-release-details/lilly-acquire-orna-therapeutics-advance-cell-therapies", "Lilly to acquire Orna", "2026-02-09 最终协议：现金对价最高 24 亿美元，含首付款及临床开发里程碑，公告未拆分首付款。ORN-252 为环状 RNA 与脂质纳米颗粒的 CD19 体内 CAR-T，面向 B 细胞驱动的自身免疫病，公告时称 clinical trial-ready。", "不记载未披露的首付款。交割完成本次未单独核实。环状 RNA 的“更持久表达”是公司主张，不是临床终点。"],
  ["N16", ["LNP", "LV"], "工业公开披露", "2025-12-07", "https://www.prnewswire.com/news-releases/orna-therapeutics-presents-new-data-supporting-its-in-vivo-car-programs-for-autoimmune-diseases-and-oncology-at-the-67th-american-society-of-hematology-annual-meeting-302634634.html", "Orna ASH 2025 preclinical update", "环状 RNA 与免疫趋向性脂质纳米颗粒的临床前数据。公司预计 2025 年底前提交 ORN-252 的临床试验申请，2026 年初进入人体，并称临床前方案不依赖清淋。", "临床前，不外推为人体 B 细胞清除或疾病缓解。"],
  ["N17", ["LNP", "LV"], "临床试验登记", "2026-10-12 查阅", "https://clinicaltrials.gov/study/NCT07439796", "NCT07439796 ORN-252", "登记号对应 ORN-252 的健康受试者 I 期；第三方镜像记载研究开始日 2026-03-16、澳大利亚中心，干预为包裹 anti-CD19 CAR 环状 RNA 的脂质纳米颗粒。", "以登记号定位。日期与中心以 ClinicalTrials.gov 当前页为准；健康受试者研究不应有疗效主张。"],
  ["N18", ["LNP", "LV"], "工业公开披露", "2025-09-17", "https://www.prnewswire.com/news-releases/magicrnas-first-in-human-clinical-data-demonstrating-feasibility-of-in-vivo-car-t-therapy-in-systemic-lupus-erythematosus-published-in-the-new-england-journal-of-medicine-302559730.html", "MagicRNA press release on the NEJM correspondence", "公司称 HN2301 为靶向 T 细胞的 mRNA-脂质纳米颗粒（EnC-LNP），编码 CD19 CAR。新闻稿给出 5 例、2 mg 与 4 mg 剂量、4 mg 时 6 小时内 CD8 阳性 CAR 阳性 T 细胞最高约 60%、循环 B 细胞清除持续 7–10 天、3 个月时 SLEDAI-2000 下降最多 20 分、未见 ≥3 级细胞因子释放综合征与神经毒性。", "公司新闻稿，不是期刊摘要。数字只作线索，尽调以通讯全文和个体数据为准。"],
  ["N19", ["LV"], "临床研究通信", "2025-09-17", "https://pubmed.ncbi.nlm.nih.gov/40961420/", "NEJM correspondence: in vivo CD19 CAR-T in refractory SLE", "Wang 等，NEJM，2025-09-17，DOI 10.1056/NEJMc2509522，PMID 40961420。摘要结论：难治性系统性红斑狼疮中，脂质纳米颗粒在体内生成 CD19 CAR-T，带来 B 细胞清除、疾病活动下降，且无重大毒性。", "通讯，不是确证性试验。摘要未给出可独立引用的例数与缓解比例。RNA-LNP 路线的同一文献为 V3C01。"],
  ["N20", ["LNP", "LV"], "工业公开披露", "2026-06-14", "https://bydrug.pharmcube.com/news/detail/47727f22456fd6c593ef7f28cefd36ce", "传奇生物关于 LB2501 的新闻转载", "转载称 LB2501 为 CD19/CD20 双靶点体内 CAR-T，2026-06-14 在 EHA 最新突破专场（摘要 LB5006）公布 I 期数据。较高剂量 DL2：客观缓解 6/6，完全缓解 5/6；未见剂量限制性毒性、严重不良事件、ICANS 或死亡；无需淋巴细胞清除。登记号 NCT07002112。", "二次转载的公司口径，不是会议摘要原文或期刊全文。总入组例数与随访成熟度须以摘要原文核对。"],
  ["N21", ["LNP", "LV"], "工业公开披露", "2026-09-26", "https://www.prnasia.com/story/549646-1.shtml", "驯鹿生物 IASO206 IMS 2026 新闻稿", "公司发布：IASO206 为 BCMA 体内 CAR-T，IMS 2026 口头报告 LBA-11。研究者发起试验，截至 2026-09-26 共 10 例，中位既往 3 线（2–8），剂量 1×10⁸、3×10⁸、9×10⁸ 转导单位。客观缓解 9/10，MRD 阴性率 90%，高剂量组两者均为 100%，3 例严格完全缓解。未见剂量限制性毒性、ICANS 或死亡；细胞因子释放综合征均为 ≤2 级。无需单采和清淋。CAR 阳性细胞在 6 个月内仍可测到。", "公司新闻稿与会议口头报告，不是期刊全文。MRD 灵敏度、高剂量组例数与随访时间未全部给出，不补写。"],
  ["N22", ["LNP", "LV"], "工业公开披露", "2026-09-16", "https://cn.iasobio.com/info.php?id=382", "驯鹿生物：IASO208 获 FDA IND 默示许可", "公司称 IASO208（CD20，第三代自灭活慢病毒，COCV-G 工程化包膜）的新药临床试验申请于 2026-09-16 获 FDA 默示许可，拟基于中国研究者发起试验数据直接开展 Ib 期，用于成人复发/难治 B 细胞非霍奇金淋巴瘤，患者无需单采和清淋。", "公司公告。研究者发起试验的例数与疗效在本次抓取正文中不完整，不引用。个案受理不等于中国研究者发起试验可普遍直接用于注册。"],
  ["N24", ["LNP"], "工业公开披露", "2025-03-03", "https://www.genevant.com/genevant-sciences-and-arbutus-biopharma-initiate-international-patent-infringement-enforcement-actions-against-moderna/", "Genevant and Arbutus enforcement actions against Moderna", "2025-03-03：Genevant 与 Arbutus 在多国对 Moderna 提起脂质纳米颗粒专利执法，对象包括其陈述为使用同一技术的产品。", "疫苗诉讼锚点。不能据此得出某一体内 CAR-T 处方侵权或自由实施的结论。"],
  ["N25", ["LNP"], "专利公开文本", "授权文本", "https://thepatentplace.com/iplibrary/patent-grant/11304911/", "US 11,304,911 选择性器官靶向", "发明人 Qiang Cheng、Tuo Wei、Daniel J. Siegwart，受让人 The Board of Regents of The University of Texas System。权利要求涉及含可离子化阳离子脂质与独立 SORT 脂质的非肝靶向递送方法。", "只确认发明人、受让人与主题。到期日须用专利族法律状态、专利期调整和延长逐项计算，本框架不记载到期年。"],
  ["N26", ["LNP", "LV"], "临床试验登记", "2026-10-12 查阅", "https://clinicaltrials.gov/study/NCT06917742", "NCT06917742 CPTX2309", "I 期单次与多次递增剂量，静脉给药，健康受试者及中重度类风湿关节炎或系统性红斑狼疮。状态 RECRUITING，开始日 2025-04-09。主要终点包括安全、生命体征，以及抗药抗体与循环免疫复合物的发生。登记页未见结果帖。", "无公开疗效或 B 细胞清除数据。预计入组为估算值。"],
  ["N27", ["LNP", "LV"], "工业公开披露", "2025-06", "https://www.businesswire.com/news/home/20250611668181/en/Capstan-Therapeutics-Announces-Initiation-of-Phase-1-Trial-of-Lead-In-Vivo-CAR-T-Therapy-CPTX2309-for-Treating-Autoimmune-Disease", "Capstan: first participants dosed with CPTX2309", "公司宣布 I 期已给首批受试者给药。CPTX2309 为优先递送至 CD8 阳性细胞毒 T 细胞的 anti-CD19 CAR mRNA 靶向脂质纳米颗粒，设计上不依赖化疗、体外操作、病毒载体与 DNA 整合。临床前非人灵长类显示血液和组织 B 细胞清除，并以初始 B 细胞为主重建。", "给药启动新闻。非人灵长类药效学不代替人体读数。"],
  ["N28", ["LNP", "LV"], "临床试验登记", "2026-10-12 查阅", "https://clinicaltrials.gov/study/NCT06691685", "NCT06691685 ESO-T01", "申办方为华中科技大学同济医学院附属协和医院，合作方包括深圳普瑞金。状态 SUSPENDED，停止原因为合作方 EsoBiotec 被 AstraZeneca 收购。早期 I 期，估算入组 24 例。方案将 CRS 与 ICANS 按 ASTCT 分级，其他不良事件按 CTCAE v5.0；次要终点含客观缓解率、缓解持续时间、无进展生存期、总生存期与 CAR-T 动力学。", "登记状态解释了试验暂停，不提供疗效表。估算入组不是分析集，也不得与已发表例数相加。"],
  ["N29", ["LNP", "LV"], "监管文本的媒体报道", "2021-06", "https://www.cn-healthcare.com/article/20210604/content-555663.html", "关于 CDE《基因治疗产品长期随访临床研究技术指导原则（征求意见稿）》的报道", "报道称征求意见稿建议：具有基因组整合活性的载体（γ-逆转录病毒和慢病毒）及转座子元件观察期不短于 15 年。", "对征求意见稿的二次报道。草案不是生效要求，尽调时核对药品审评中心现行中文版本。"],
  ["N30", ["LNP", "LV"], "原始研究", "2025", "https://pmc.ncbi.nlm.nih.gov/articles/PMC12848171/", "Engineered lentiviral platform generating CAR T and NK cells", "描述去靶向的 VSV-G 来源 fusogen（文中称 Gen 2.1）与 CD7 scFv 结合臂组合的慢病毒平台，用于体内生成 CAR-T 与 CAR-NK。结合与融合功能被生物学解耦；去靶向后不再结合天然受体 LDL-R，以降低非预期转导；额外氨基酸替换用于改善血清稳定性与抗补体，从而支持静脉给药。", "平台论文，不是 INT2104 的临床疗效报告。相关专利号未在本条核实。"],
  ["N31", ["LNP", "LV"], "媒体报道", "2026", "https://www.crbcnews.com/articles/6a1f1d6ac355eb075459c16a", "CRBC: Kelonia 18-patient media account", "媒体称 inMMyCAR 已治疗 18 例，全部有反应，并描述了 ICANS（含 1 例 3 级）。", "与 ASCO 摘要 7509 的 6 例及“未见 ICANS”不一致。本框架不采用该例数与 ICANS 分布，只记为须对账的冲突来源。"],
  ["N32", ["LNP", "LV"], "媒体报道", "2026-05-31", "https://www.fiercebiotech.com/biotech/asco-kelonia-keeps-vivo-car-t-momentum-rolling-nutty-100-response-rate", "Fierce Biotech on Kelonia at ASCO 2026", "报道称 Lilly 高管讨论 III 期路径，并写明截至采访时收购尚未交割；同时转述了大于摘要样本量的 MRD 叙述。", "交易状态只采用“截至 2026-05-31 报道称未交割”。疗效叙述不替代会议摘要。"],
  ["N35", ["LNP"], "诉讼文书", "2022", "https://storage.courtlistener.com/recap/gov.uscourts.ded.78146/gov.uscourts.ded.78146.1.0_1.pdf", "Arbutus and Genevant complaint, D. Del.", "起诉书主张的美国专利包括 US 8,058,069、8,492,359、8,822,668、9,364,435、9,504,651、11,141,378，主题为核酸–脂质颗粒及其组合物与用途。诉状称 Onpattro 由 Alnylam 在 Arbutus 的脂质纳米颗粒许可下开发，并陈述 Acuitas 的再许可范围争议及 2018 年和解限制了 Acuitas 继续使用该技术的范围。", "诉状是一方陈述，不是侵权判决，也不是自由实施意见。专利到期日未计算。"],
  ["N40", ["LV"], "临床会议摘要", "2026-05-28", "https://ascopubs.org/doi/10.1200/JCO.2026.44.16_suppl.7014", "ASCO 2026 abstract 7014: CD8-targeted LNP in B-cell lymphoma", "首次人体研究：以抗 CD8 单域抗体偶联于包载 CD19 CAR mRNA 的脂质纳米颗粒表面。摘要 Methods 写 4 例接受四次静脉给药，Results 写迄今 7 例接受治疗：可评估者中 2 例部分缓解、1 例第 28 天疾病稳定、4 例疗效待评估。外周血 CD8 阳性 T 细胞的 CAR 基因与表面表达在 4–6 小时达峰后下降；外周 B 细胞在 12 小时至第 3 天之间降至每微升小于 1 个；三次加强给药间隔 3 天，维持 B 细胞清除与 CAR-T 活性；未观察到 ≥2 级细胞因子释放综合征，C 反应蛋白与铁蛋白一过性升高。", "会议摘要。Methods 与 Results 的例数不一致，本框架不计算缓解比例，只采用机制与时程描述。RNA-LNP 路线的同一摘要为 V3C02。"],
  ["N41", ["LNP"], "临床研究通信", "2026-09-02", "https://www.nejm.org/doi/10.1056/NEJMc2603114", "NEJM: Lentiviral in vivo CD19 CAR T-cell therapy in neurologic autoimmune disorders", "Cheng 等，NEJM，DOI 10.1056/NEJMc2603114，PMID 42685326。摘要：16 例难治性神经系统自身免疫病患者接受体内慢病毒 CD19 CAR-T，副作用可管理，B 细胞完全清除，各疾病组有初步临床改善。", "研究通信，样本小、无对照。摘要之外的分组与不良事件比例见媒体报道，须分开标注。慢病毒路线的同一文献为 V5C03。"],
  ["N42", ["LNP", "LV"], "媒体报道", "2026-09", "https://www.medscape.com/viewarticle/good-first-try-vivo-car-t-neurologic-autoimmune-disease-2026a1000yc3", "Medscape on the JY231 phase 1", "报道称该产品名为 JY231，为现货型慢病毒载体，单次静脉给药在体内生成 CD19 CAR-T。16 例中 7 例进展型多发性硬化、3 例 MOG 抗体相关疾病、3 例全身型重症肌无力、3 例特发性炎性肌病。6 个月时 1 级细胞因子释放综合征 11/16，两周内缓解；进展型多发性硬化组扩展残疾状态量表评分下降，脑脊液神经丝轻链下降，MRI 无新病灶。", "媒体转述的会议/论文细节。分组与比例未从期刊全文核对，不与期刊摘要混写为同一级证据。"],
  ["N43", ["LNP", "LV"], "媒体报道", "2026", "https://www.vcbeathealth.com/article/33088", "行业媒体关于 GT801 的 ASCO 2026 报道", "报道称 IVACTA（源自北京砾石生物）在 ASCO 2026 以壁报公布 GT801 首次人体数据：T 细胞靶向脂质纳米颗粒递送 CD19 CAR mRNA，无需体外制备与清淋；4 例客观缓解率 100%，3 例达完全缓解。", "行业媒体，未取得会议摘要原文。例数与缓解率在核对摘要前不进入对标表的疗效列。"],
];

const REF_MAP = {
  eso_lancet: { LNP: "N11", LV: "V5V01" },
  eso_followup: { LNP: "N10", LV: "V5V09" },
  eso_phase1: { LNP: "N09", LV: "N09" },
  kln: { LNP: "N12", LV: "V5V03" },
  hn2301: { LNP: "V3C01", LV: "N19" },
  cd8tlnp: { LNP: "V3C02", LV: "N40" },
  jy231: { LNP: "N41", LV: "V5C03" },
  ltfu: { LNP: "R05", LV: "R05" },
  rcl: { LNP: "V3R02", LV: "V3R02" },
};

/** Resolve a logical reference key for one route; plain IDs pass through. */
export function refFor(route) {
  return (key) => REF_MAP[key]?.[route] || key;
}

/** Rewrite citation links that still carry a logical key into route-specific ids. */
export function resolveCitations(route, html) {
  return Object.keys(REF_MAP).reduce((acc, key) => {
    const id = REF_MAP[key][route];
    const anchor = new RegExp(`#source-${key}" aria-label="参考资料 ${key}">${key}<`, "g");
    return acc.replace(anchor, `#source-${id}" aria-label="参考资料 ${id}">${id}<`);
  }, html);
}

export function sourceItemsHtml(route) {
  return NEW_SOURCES.filter(([, routes]) => routes.includes(route))
    .map(([id, , type, date, url, title, text, boundary]) =>
      `<li id="source-${id}"><div class="source-meta"><span class="topic-id">${id}</span><span class="source-type"><span class="bilingual-title"><span class="title-zh">${esc(type)}</span><span class="title-en" lang="en">Added in v7.0</span></span></span><span>${esc(date)}</span></div><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a><p>${text}</p><p class="source-boundary"><strong>证据范围与限制</strong> ${boundary}</p></li>`)
    .join("");
}

export const GLOSSARY_EXTRA = [
  ["客观缓解率", "Overall Response Rate", "ORR", "按预设标准（如 IMWG 或 Lugano）达到部分缓解及以上的患者比例。分母、评估时点和是否独立评审必须同时报告。"],
  ["完全缓解", "Complete Response", "CR", "疾病按预设标准达到完全缓解。骨髓瘤中的严格完全缓解（stringent CR, sCR）是更严格的 IMWG 类别，不与 CR 混写。"],
  ["无进展生存期", "Progression-free Survival", "PFS", "从规定起点到疾病进展或死亡的时间。中位值必须带随访成熟度和删失规则。"],
  ["剂量限制性毒性", "Dose-limiting Toxicity", "DLT", "方案预先定义、在观察窗内出现并限制继续加量的毒性。窗口外事件可以是重要安全信号，但不自动等于 DLT。"],
  ["推荐的 II 期剂量", "Recommended Phase 2 Dose", "RP2D", "综合安全、PK/PD 与初步活性后建议用于后续试验的剂量与给药方案，不是监管批准剂量。"],
  ["复制型慢病毒", "Replication-competent Lentivirus", "RCL", "能够复制的慢病毒污染物。生产物料、终产品与患者随访的检测策略分开设计；相关指导中 RCR 与 RCL 按同一风险类别处理。"],
  ["载体拷贝数", "Vector Copy Number", "VCN", "每细胞或每微克基因组 DNA 的载体序列拷贝，描述整合负荷，不描述临床获益。"],
  ["治疗中出现的不良事件", "Treatment-emergent Adverse Event", "TEAE", "治疗开始后新出现或恶化的不良事件。分级标准须在方案中预先规定。"],
  ["严重不良事件", "Serious Adverse Event", "SAE", "符合严重标准的不良事件，与 CTCAE 高级别不是同一概念。"],
  ["销售成本", "Cost of Goods Sold", "COGS", "可归属到已给药产品的制造与放行成本。平台“成本低”不是 COGS。"],
  ["国家药品监督管理局", "National Medical Products Administration", "NMPA", "中国药品监管机构。其药品审评中心（Center for Drug Evaluation, CDE）发布技术指导。研究者发起的临床试验不等于注册性临床试验。"],
  ["美国移植与细胞治疗学会分级", "ASTCT Consensus Grading", "ASTCT", "细胞因子释放综合征与 ICANS 的共识分级。与 CTCAE 的器官毒性分级并存时，方案须写明各自适用范围。"],
  ["流速比与总流速", "Flow Rate Ratio / Total Flow Rate", "FRR / TFR", "微流控或冲击射流混合中的两个关键工艺参数，决定颗粒形成时的局部溶剂环境与停留时间。放大时两者同时变化。"],
  ["单域抗体", "Single-domain Antibody", "VHH", "仅含重链可变域的结合分子，常用于颗粒表面定向偶联。体积小不等于低免疫原性。"],
  ["张力促进叠氮–炔环加成", "Strain-promoted Azide–Alkyne Cycloaddition", "SPAAC", "一类无铜点击偶联化学。反应的生物正交性不代表最终颗粒在体内没有免疫或安全风险。"],
];

export function glossaryExtraHtml() {
  return GLOSSARY_EXTRA.map(([zh, en, abbr, dd]) =>
    `<div class="glossary-entry"><dt><span class="bilingual-title"><span class="title-zh">${esc(zh)}</span><span class="title-en" lang="en">${esc(en)}</span></span><span class="term-abbr" lang="en">${esc(abbr)}</span></dt><dd>${dd}</dd></div>`).join("");
}

export function scoreDims(route) {
  if (route === "LNP") {
    return [
      ["window", "高", "瞬时表达与给药周期", "同一版本产品的人体 PK/PD 覆盖疾病所需作用时程；再给药规则预先写明", "表达窗口短于疾病任务，且抗 PEG 抗体或抗药抗体关闭了再给药"],
      ["ligand", "高", "配体靶向与肝/脾脱靶", "目标 T 细胞亚群的功能性摄取高于肝细胞和主要脱靶细胞，并有定量分布", "信号主要在肝或脾，目标 T 细胞的 CAR 阳性绝对数不能完成适应症任务"],
      ["pkpd", "高", "剂量–暴露–药效", "在计划剂量范围内，暴露、CAR 表达与疾病相关药效学呈可解释关系，足以讨论 RP2D", "无单调关系，或人体药效学只来自另一种脂质、另一种配体"],
      ["ada", "高", "重复给药免疫原性", "至少覆盖计划中的第二次给药：抗 PEG、抗脂质、抗配体与抗 CAR 抗体，以及对表达和药效的影响", "第二次暴露后表达或 B 细胞清除消失，且无化学替代路径"],
      ["cmc", "高", "mRNA 与制剂 CMC、冷链", "关键质量属性与临床批次挂钩；稳定性覆盖拟定流通条件；双链 RNA、包封率、粒径与配体密度有放行方法", "临床批次与毒理批次无可比性，或冷链超出目标给药场景"],
      ["clin", "高", "临床获益–风险", "DLT 窗口、按 ASTCT 分级的 CRS/ICANS、TEAE 与 SAE 与疾病终点分开列表；药效学不代替缓解", "用 B 细胞下降或 CAR 阳性率代替临床终点"],
      ["ip", "高", "知识产权与自由实施", "脂质、PEG、SORT 组分与配体均有权利要求对照表及许可链", "核心脂质或靶向模块无许可路径，且与已诉讼组合物重叠"],
      ["comp", "中", "竞争差异化", "相对 CPTX2309、CD8-tLNP 摘要、ORN-252、HN2301 的模态、给药次数与数据成熟度有可核对差异", "差异仅为宣称，没有同一终点下的比较"],
      ["cogs", "中", "COGS 与可及性", "有批次成本模型，以及免单采、免清淋的方案级证据", "成本模型缺失，或方案实际上仍依赖细胞处理中心与清淋"],
      ["reg", "中", "区域监管路径", "目标地区（NMPA、FDA、EMA）的路径、研究者发起试验定位与数据互认假设已写明", "把中国研究者发起试验直接当成注册数据集"],
      ["team", "中", "数据可靠性与团队", "原始数据可追溯到批次；统计与 CMC 负责人能指出关键失败实验", "只有汇总材料，没有批次与分析程序的可追溯性"],
    ];
  }
  return [
    ["ins", "高", "整合与插入突变", "非临床整合位点、克隆动态与成瘤性评估与拟用载体一致；临床有克隆监测触发规则", "造血干细胞或非靶长寿命细胞可检出整合，且无监测与处置（载体本身无法停药）"],
    ["pseudo", "高", "假型化靶向与非靶转导", "包膜或 fusogen 的靶细胞与脱靶细胞均有功能转导数据，而不只有结合数据", "肝或其他长寿命非靶细胞被稳定转导"],
    ["once", "高", "单次给药的持久性与不可逆性", "持久性有细胞表型与疾病终点的纵向数据；放大或克隆显性有预先规定的行动", "把早期扩增峰值写成长期疾病控制，或出现不受控克隆扩增"],
    ["rcl", "高", "RCL、VCN 与克隆监测", "生产、放行与患者随访的 RCL 策略分开；VCN 有验证过的方法", "任一放行批次 RCL 阳性，或患者随访没有 RCL 与克隆计划"],
    ["yield", "高", "载体产能、功能滴度与成本", "功能滴度、颗粒与感染性比值、生产失败率能支持拟定供应，并有放大后的可比性", "只有科研滴度，没有 GMP 批次与成本模型"],
    ["ltfu", "高", "长期随访可执行性", "整合载体按 FDA 2020 年指导准备最长 15 年的随访设计与预算；中国路径核对现行 CDE 文本", "随访短于产品风险所要求的期限，且无书面风险论证"],
    ["clin", "高", "临床获益–风险", "ORR、CR、PFS 或自身免疫终点按预先定义；CRS/ICANS 用 ASTCT；迟发毒性单独列表", "用 VCN 或 CAR 持续阳性代替临床终点"],
    ["ip", "高", "包膜、fusogen 与 CAR 序列的自由实施", "权利要求对照表覆盖包膜、靶向结合臂、转移基因组与 CAR 序列", "只有“基础慢病毒专利已过期”的口头意见"],
    ["comp", "中", "竞争差异化", "相对 INT2104、UB-VV111、ESO-T01、KLN-1010、JY231、LB2501、IASO206 的靶点、包膜与证据等级已对账", "用会议新闻稿的缓解率直接对比期刊病例系列"],
    ["cogs", "中", "可及性与卫生经济", "单次给药的完全成本、门诊可行性与相对体外 CAR-T 的时间差有测算", "可及性主张与实际冷链、住院和专科中心要求矛盾"],
    ["reg", "中", "区域监管与研究者发起试验转化", "中国研究者发起试验的伦理、数据锁定与对 NMPA/FDA 的用途已分开说明", "把暂停或早期研究者发起试验写成注册性证据"],
    ["team", "中", "数据可靠性与团队", "载体批次、整合位点与临床数据库可追溯", "关键实验无法对应到载体版本"],
  ];
}

export function scorecardTable(route) {
  const rows = scoreDims(route).map(([id, w, name, bar, red]) => [
    esc(name), esc(w), esc(bar), esc(red),
    `<select data-dim="${id}" aria-label="${esc(name)}评级"><option value="">—</option><option value="proven">已证实</option><option value="support">有支持</option><option value="open">未支持</option><option value="against">存在反证</option><option value="na">无法评估</option></select>`,
  ]);
  return table("Scorecard：评级记在浏览器本地，不换算总分", ["维度", "审阅权重", "“已证实”的最低门槛", "触发否决的典型反证", "本次评级"], rows);
}

export function redFlags(route) {
  if (route === "LNP") {
    return [
      ["lnp-1", "stop", "计划依赖重复给药，但第二次及以后暴露后 CAR 表达或疾病相关药效学消失，且没有更换 PEG 脂质或其他化学路径的可比数据。"],
      ["lnp-2", "stop", "定量分布显示肝摄取或脾摄取主导，目标 T 细胞亚群的功能性转染不足以覆盖适应症所需细胞数量，且配体迭代没有改变这一分布。"],
      ["lnp-3", "stop", "在拟定剂量范围内不存在可解释的剂量–暴露–药效关系，无法形成 RP2D 的书面理由。"],
      ["lnp-4", "stop", "临床或拟商业批次的稳定性达不到目标场景的冷链，且没有冻干或其他处方的可比性桥接。"],
      ["lnp-5", "stop", "核心可离子化脂质、PEG 脂质、SORT 组分或靶向配体没有许可链，且权利要求对照显示与已进入诉讼的组合物重叠。"],
      ["lnp-6", "stop", "恶性 B 细胞或其他疾病细胞被证实发生功能性 CAR 转染，产生抗原遮蔽或治疗逃逸，且处方没有排除该细胞群的设计。"],
      ["lnp-7", "watch", "用外周血 B 细胞下降、CAR 阳性率，或 siRNA 与疫苗 LNP 的文献代替疾病终点。"],
      ["lnp-8", "watch", "Cre 等永久标记、报告蛋白或另一种可离子化脂质的数据被用来证明治疗性 mRNA 的时程。"],
      ["lnp-9", "watch", "方案写“无清淋”，但预用药或合并用药包含足以改变免疫学解释的淋巴细胞毒性药物，且方案未单列。"],
    ];
  }
  return [
    ["lv-1", "stop", "放行检测发现复制型慢病毒，或患者随访方案没有 RCL 检测。"],
    ["lv-2", "stop", "造血干细胞或其他非预期长寿命细胞被整合，且没有克隆监测触发规则与临床行动。"],
    ["lv-3", "stop", "早期人体或相关非临床模型出现克隆显性或不受控扩增。单次整合给药之后不能用停药逆转。"],
    ["lv-4", "stop", "功能滴度与 GMP 产能不能支持拟定的临床供应，且没有技术转移后的可比批次。"],
    ["lv-5", "stop", "整合载体的临床方案没有与产品风险相称的长期随访；在没有书面风险论证时，短于 FDA 2020 年指导对慢病毒载体所列的 15 年观察框架。"],
    ["lv-6", "stop", "疾病细胞被功能性转导并出现抗原遮蔽，或载体在非靶组织形成稳定表达，且载体设计未作改动。"],
    ["lv-7", "watch", "用 VCN、载体持续存在或 CAR 阳性持续时间代替 ORR、CR、PFS 或自身免疫临床终点。"],
    ["lv-8", "watch", "假型化只证明了结合，没有证明脱靶组织没有功能转导与整合。"],
    ["lv-9", "watch", "中国研究者发起试验的初步缓解率被直接用于跨境注册或估值，而数据锁定、方案偏离与患者重叠没有对账。"],
  ];
}

export function flagChecklist(route) {
  const items = redFlags(route).map(([id, level, text]) =>
    `<li class="${level === "stop" ? "flag-stop" : "flag-watch"}"><label><input type="checkbox" data-flag="${id}"> <strong>${level === "stop" ? "否决项" : "观察项"}</strong> ${text}</label></li>`);
  return `<ul class="flag-list">${items.join("")}</ul><p class="flag-summary" data-flag-summary>尚未勾选。勾选结果只保存在本机浏览器。</p>`;
}

export function landscapeTable(route) {
  const K = refFor(route);
  const c = (...keys) => cite(keys.map(K));
  const rows = [
    ["CPTX2309<br>Capstan / AbbVie", "靶向 LNP，mRNA", "递送 CD8；CAR 靶点 CD19", "B 细胞介导自身免疫；I 期含健康受试者、类风湿关节炎、系统性红斑狼疮", "NCT06917742 招募中，登记页未见结果帖。2025-06 公司宣布首批给药。非人灵长类有 B 细胞清除与初始 B 细胞为主的重建", "2025-06-30 协议，最高 21 亿美元现金、交割时支付；2025-08-19 宣布完成收购", "公告与登记库，无人体疗效", c("N01", "N02", "N26", "N27")],
    ["CD8-tLNP<br>ASCO 2026 摘要 7014", "靶向 LNP，mRNA，抗 CD8 单域抗体偶联", "递送 CD8；CAR 靶点 CD19", "复发/难治 CD19 阳性 B 细胞淋巴瘤", "摘要 Methods 写 4 例四次给药，Results 写迄今 7 例：2 例部分缓解、1 例第 28 天疾病稳定、4 例待评估。CAR 表达 4–6 小时达峰后下降；B 细胞在 12 小时至第 3 天降至每微升小于 1；三次加强给药间隔 3 天维持清除；未见 ≥2 级 CRS", "未检索到相关控股权交易", "会议摘要；分母自相矛盾，不计算缓解比例", c("cd8tlnp")],
    ["ORN-252<br>Orna / Lilly 协议", "环状 RNA-LNP", "免疫趋向性 LNP；CAR 靶点 CD19", "B 细胞自身免疫；当前公开人体研究为健康受试者", "NCT07439796。临床前有 B 细胞清除数据，无疾病人群疗效", "2026-02-09 协议，最高 24 亿美元，含首付与临床里程碑；首付未披露。交割未单独核实", "公告与临床前", c("N15", "N16", "N17")],
    ["HN2301<br>MagicRNA", "mRNA-LNP，公司称靶向 T 细胞", "CAR 靶点 CD19", "难治性系统性红斑狼疮；另有自身免疫 I 期 NCT06801119", "期刊通讯摘要：B 细胞清除、疾病活动下降、无重大毒性。5 例、剂量与 SLEDAI 变化仅见于公司新闻稿", "未检索到控股权交易", "通讯摘要与公司新闻稿必须分开引用", c("hn2301", "N18")],
    ["GT801<br>IVACTA", "T 细胞靶向 LNP，mRNA", "CAR 靶点 CD19", "复发/难治 B 细胞血液肿瘤", "行业媒体称 ASCO 2026 壁报 4 例全部缓解、3 例完全缓解。未取得摘要原文，疗效不进入本表比较", "未检索到交易", "行业媒体，证据等级最低", c("N43")],
    ["INT2104<br>Interius / Kite 协议", "靶向慢病毒，去靶向 fusogen 加 CD7 结合臂", "递送 CD7 阳性 T/NK；CAR 靶点 CD20", "复发/难治 B 细胞恶性肿瘤", "2024-10-23 首例给药。NCT06539338 为 ACTIVE_NOT_RECRUITING，无公开疗效表", "2025-08-21 协议，3.5 亿美元现金；交割完成公告未检索到，登记申办方现为 Kite", "给药新闻与登记库，非疗效证据", c("N03", "N04", "N05", "N30")],
    ["UB-VV111<br>Umoja", "慢病毒，公司称现货型", "体内生成 CD19 CAR-T；方案含单用或联合 rapamycin", "既往≥2 线的复发/难治 LBCL 与 CLL", "I 期 NCT06528301 招募中。2025-09-30 获 FDA Fast Track。无公开疗效数字", "AbbVie 持有独家选择权，经济条款未披露", "资格认定与登记库", c("N06", "N07")],
    ["ESO-T01<br>EsoBiotec（AZ 已收购）/ 协和医院研究者发起试验", "纳米抗体慢病毒，ENaBL", "CAR 靶点 BCMA", "复发/难治多发性骨髓瘤", "三份公开文本须对账，见本节第二张表。NCT06691685 状态 SUSPENDED，原因为合作方被收购", "最高 10 亿美元：首付 4.25 亿、里程碑最高 5.75 亿；2025-05-20 宣布完成", "同行评议与登记库；队列不得相加", c("eso_lancet", "eso_followup", "eso_phase1", "N08")],
    ["KLN-1010<br>Kelonia / Lilly 协议", "改造慢病毒，iGPS", "体内生成全人源 anti-BCMA CAR-T", "复发/难治多发性骨髓瘤，inMMyCAR", "只采用 ASCO 2026 摘要 7509：6 例，第 1 个月均 MRD 阴性，CRS 4 例均 2 级，未见 ICANS，同意到输注中位 13.5 天。媒体 18 例版本不采用", "2026-04-20 协议：最高 70 亿美元，首付 32.5 亿，预计 2026 下半年交割；截至核验日未核实交割", "会议摘要为主；新闻稿只支持 Fast Track", c("kln", "N13", "N14", "N31", "N32")],
    ["JY231<br>神经自身免疫", "慢病毒，报道称现货型", "体内生成 CD19 CAR-T", "难治性神经系统自身免疫病", "期刊通讯摘要：16 例，单次静脉给药，B 细胞完全清除，副作用可管理，各疾病组初步改善。分组（7 例进展型多发性硬化等）与 1 级 CRS 11/16 来自媒体报道", "未检索到交易", "期刊通讯 + 媒体；两级证据分开标注", c("jy231", "N42")],
    ["LB2501<br>传奇生物", "慢病毒，公司材料描述含 CD3 结合臂与 T 细胞靶向", "CAR 靶点 CD19/CD20 双靶", "复发/难治 B 细胞非霍奇金淋巴瘤，NCT07002112", "公司新闻转载：EHA 2026 LB5006，较高剂量组客观缓解 6/6、完全缓解 5/6；未见剂量限制性毒性、严重不良事件、ICANS 或死亡；无需清淋", "未检索到针对该资产的单独对价", "公司与会议披露，非期刊全文", c("N20")],
    ["IASO206<br>驯鹿生物", "体内 CAR-T，平台 InTelliCAR", "CAR 靶点 BCMA", "复发/难治多发性骨髓瘤，研究者发起试验", "公司新闻稿：10 例，客观缓解 9/10，MRD 阴性 90%，高剂量组均 100%，3 例严格完全缓解；CRS 均 ≤2 级；未见剂量限制性毒性、ICANS 或死亡", "未检索到对价", "公司新闻稿，非期刊全文", c("N21")],
    ["IASO208<br>驯鹿生物", "第三代自灭活慢病毒，COCV-G 包膜", "CAR 靶点 CD20", "复发/难治 B 细胞非霍奇金淋巴瘤", "公司称 2026-09-16 获 FDA IND 默示许可，拟基于中国研究者发起试验进入 Ib 期。例数与疗效本次不引用", "未检索到对价", "监管路径信号，不是疗效证据", c("N22")],
  ];
  return table("竞争对标（核验日 2026-10-12）。空格不是零，未核实的数字不填写", ["资产", "模态", "双重靶向", "适应症与阶段", "最新可读数", "交易口径", "证据等级", "来源"], rows);
}

export function dealTable(route) {
  const K = refFor(route);
  const c = (...keys) => cite(keys.map(K));
  return table("交易可比：只作锚，不是估值", ["买方", "标的", "公告", "公开对价", "交割", "使用时的调整", "来源"], [
    ["AbbVie", "Capstan / CPTX2309", "2025-06-30 协议；2025-08-19 完成", "最高 21 亿美元现金，交割时支付，含常规调整", "公司宣布已完成", "I 期靶向 LNP、自身免疫、无公开人体疗效。不宜直接套到已有期刊数据的肿瘤资产", c("N01", "N02")],
    ["AstraZeneca", "EsoBiotec / ENaBL", "完成公告，6-K 日期 2025-05-20", "最高 10 亿美元：首付 4.25 亿加里程碑最高 5.75 亿", "公司宣布已完成", "平台交易。ESO-T01 是小样本研究者发起试验，且试验已暂停", c("N08")],
    ["Kite / Gilead", "Interius / INT2104", "2025-08-21 协议", "3.5 亿美元现金，交割时支付，含常规调整", "完成公告未检索到", "全球最早一批入人体的慢病毒体内 CAR 之一，但无公开疗效表。锚的是平台入口，不是临床去风险", c("N03", "N04")],
    ["Lilly", "Orna", "2026-02-09 协议", "最高 24 亿美元，含未拆分的首付与临床里程碑", "未单独核实", "环状 RNA-LNP，公告时尚无疾病人群数据", c("N15")],
    ["Lilly", "Kelonia / KLN-1010", "2026-04-20 协议", "最高 70 亿美元，首付 32.5 亿，其余为临床、注册、商业里程碑", "预计 2026 下半年；2026-05-31 报道未交割；本次未核实完成", "用此锚时必须同时披露买方相对公开摘要的信息差，以及媒体更新与摘要的冲突", c("N14", "N32")],
    ["AbbVie 选择权", "Umoja CD19 体内 CAR-T，含 UB-VV111", "公司 Fast Track 公告中提及", "金额未披露", "行权未知", "没有金额就不要写估值区间", c("N06")],
  ]);
}

export function esoRecon(route) {
  const K = refFor(route);
  const c = (...keys) => cite(keys.map(K));
  return table("ESO-T01 公开文本对账。禁止把例数相加", ["文本", "例数与人群", "剂量与设计", "可引用的结果", "与其他文本的关系", "来源"], [
    ["Lancet 病例系列", "4 例，最低剂量队列，注册号 NCT06691685", "2.0×10⁸ 转导单位，无单采、无清淋；患者 2–4 有地塞米松预用药", "短随访的初步安全与活性。本表不复述未逐句核对的缓解分类", "延长随访论文写明这是同一研究、此前最多 3 个月随访", c("eso_lancet")],
    ["Nature Medicine 延长随访", "4 例，2024-11-19 至 2025-01-17 入组，半数男性，中位 4 线，均有髓外病灶", "0.2×10⁹ 转导单位，与 Lancet 为同一剂量的不同写法", "客观缓解率 100%（2 例严格完全缓解、2 例部分缓解）。1 例严格完全缓解至 15 个月。3 例于第 5、3、3 个月复发或进展，其后死亡。中位无进展生存期 4.0 个月（3.0–15.0）", "作者明确为同一 4 例，不得与初报相加为 8 例", c("eso_followup")],
    ["Nature Medicine I 期", "5 名男性，中位随访 6.0 个月", "0.2×10⁹ 转导单位，无单采、无体外制备、无清淋；2025 年提前停止", "无剂量限制性毒性。CRS 4/5（3 级 3 例、2 级 1 例）。1 例 1 级 ICANS，死于髓外病灶脊髓压迫。客观缓解 4/5，含 3 例严格完全缓解；可评估缓解者 4/4 第 60 天 MRD 阴性（10⁻⁵）", "5 名均为男性，因此“半数为男性”的 4 例队列不可能是其子集。重叠关系摘要未说明，患者级清单是数据室必选项", c("eso_phase1")],
    ["ClinicalTrials.gov", "估算入组 24，不是分析集", "协和医院研究者发起试验，合作方含深圳普瑞金；状态 SUSPENDED", "停止原因为合作方 EsoBiotec 被 AstraZeneca 收购。方案规定 CRS 与 ICANS 按 ASTCT、其他不良事件按 CTCAE v5.0", "解释试验为何没有继续入组，不提供疗效表", c("N28")],
  ]);
}

export function regMatrix(route) {
  const L = route === "LNP";
  const K = refFor(route);
  const c = (...keys) => cite(keys.map(K));
  const rows = [
    ["长期随访", L
      ? "2020-01 最终指导按产品持续性、整合与编辑风险分层。RNA 不自动适用整合载体的 15 年框架，但要写明为何更短"
      : "2020-01 最终指导：慢病毒等整合载体一般 15 年，并讨论整合位点与克隆性监测",
      "有基因治疗患者随访指导。具体年限以现行文本为准，本框架不转写未逐页核对的条款",
      "2021 年征求意见稿的报道出现“整合型载体不少于 15 年”。须核对是否已有生效中文指导",
      L ? "索取随访年限的风险论证，而不是直接套用 15 年" : "索取方案中的随访年限、预算与失访后的联系方式",
      c("ltfu", "N29")],
    ["生物分布", "ICH S12：受试品代表性、相关物种、给药途径、取样与检测", "ICH S12", "同样引用 ICH 时，写明中国申报是否被要求补充组织列表", "分布研究的物种、时间点与方法灵敏度单独成表", c("R02")],
    ["效力", "效力保证为 2023-12 草案，不是生效要求；已生效的效力测试指导仍适用。2026-05 的 CMC 灵活性指导允许在有依据时使用平台分析方法", L ? "mRNA 疫苗质量指导为草案，范围是感染病疫苗，不能直接套到 T 细胞 CAR" : "按生物制品可比性与效力原则对照，不套用疫苗质量指导", "效力应与体内形成功能 CAR-T 相关，而不是只测粒径或基因组滴度", "要求关键质量属性与临床作用的对应表", L ? c("V3L11", "V32A01", "V3L14", "V5V11") : c("V3L11", "V32A01", "V5V11")],
    ["研究者发起试验的注册用途", "境外研究者研究不自动替代 IND 下的试验", "同左", "ESO-T01、HN2301、IASO206 的早期读数来自中国场景；IASO208 公司称以研究者发起试验支持 FDA IND，属个案", "索取伦理批件、数据锁定、方案偏离、源数据保存方式，以及与注册试验的差异", c("N28", "N22", "V5C01")],
    ["CRS 与 ICANS", "方案按 ASTCT 共识分级，并与 CTCAE 的适用范围分开", "同左", "NCT06691685 已写明 ASTCT 与 CTCAE v5.0 的分工，可作方案模板对照，而不是疗效基准", "索取分级表、托珠单抗使用规则与评审委员会章程", c("V5C04", "N28")],
    ["延迟恶性风险", "BCMA 与 CD19 导向的自体 CAR-T 已有 T 细胞恶性肿瘤的黑框警告信息", "关注同一安全信号", "中国标签与说明书更新路径单独确认", L ? "瞬时 RNA 要论证为何不适用整合相关机制，而不是只说没有整合" : "整合路线把插入突变监测写进风险管理计划", c("V5C07")],
  ];
  if (!L) {
    rows.splice(1, 0, ["RCL", "逆转录病毒载体在生产与患者随访中检测复制型病毒；该指导中 RCR 与 RCL 按同一风险类别", "按科学建议书对照，不假设自动等同", "注册资料中单列方法学验证，不依赖研究者发起试验实验室的科研 PCR", "索取方法学验证、批次放行与患者采样计划", c("rcl")]);
  }
  return table(`分区域监管：${L ? "RNA-LNP" : "整合型慢病毒"}路线。差异用问题清单，不把草案写成生效要求`, ["议题", "FDA", "EMA", "NMPA 与中国研究者发起试验", "尽调动作", "来源"], rows);
}

export function disciplineTable() {
  return table("不可混同：全篇只在这里定义一次，后文用编号引用", ["编号", "这个读数", "它回答", "它不回答"], [
    ["D-1", "给药制剂的放行检验", "这一瓶药的身份、纯度与效力是否符合规格", "患者体内是否形成了有功能的 CAR-T"],
    ["D-2", "配体、包膜或 fusogen 的靶向", "哪些细胞有机会拿到载荷", "哪些细胞会被 CAR 清除"],
    ["D-3", "CAR 的抗原特异性", "工程化后的细胞杀伤谁", "载荷最初进入了谁"],
    ["D-4", "外周血 B 细胞下降", "发生了相应靶点的药效学作用", "免疫重置、停药缓解或器官功能恢复"],
    ["D-5", "CAR 阳性百分比", "被检测样本里有表达", "绝对数量、组织覆盖、持久临床获益"],
    ["D-6", "LNP 表达消退", "这一次 RNA 暴露的窗口在结束", "风险已经消失，或疗效已经足够"],
    ["D-7", "慢病毒整合或 VCN 持续存在", "遗传物质仍在细胞里", "疾病仍被控制，或克隆是安全的"],
    ["D-8", "siRNA、疫苗 LNP 或 Cre 报告系统", "在那个实验体系里递送发生过", "治疗性 CAR mRNA 的人体时程、肝外选择性与重复给药耐受性"],
    ["D-9", "会议新闻稿中的缓解率", "申办方选择公布的时点", "可与另一份不同成熟度、不同标准的数据集直接对比"],
    ["D-10", "“无需清淋、无需单采”", "方案若写明，则没有淋巴细胞清除化疗与白细胞单采", "没有皮质类固醇或其他预用药，也没有住院、冷链与专科中心"],
    ["D-11", "器官水平的发光或匀浆信号", "载荷到了这个器官", "哪一类细胞发生了功能表达"],
    ["D-12", "体外结合或高表达细胞系转染", "分子能结合、体系能转染", "原代或患者 T 细胞在血浆环境中的功能递送"],
  ]);
}

export function routeDiffTable() {
  return table("同一套商业句子，两条路线的技术含义不同", ["议题", "RNA-LNP", "靶向慢病毒", "因此尽调问题不同"], [
    ["表达", "瞬时。窗口由 mRNA 稳定性与细胞分裂稀释决定，人体摘要显示小时级达峰", "整合后随细胞持续。单次给药是设计特征", "LNP 问再给药；慢病毒问无法停药之后的克隆风险"],
    ["主要失败模式", "肝与脾摄取、内体逃逸不足、表达窗口过短、抗 PEG 抗体", "脱靶整合、插入突变、复制型病毒、滴度与空颗粒", "节点不共用"],
    ["CMC 放行核心", "mRNA 完整性、双链 RNA、包封、粒径、配体密度、冷链", "功能滴度、复制型病毒、工艺相关杂质、与 VCN 相关的效力", "数据室文件夹不同"],
    ["临床安全语法", "输液反应、补体、抗药抗体、重复给药后的药效衰减；CRS 与 ICANS 仍按 ASTCT 记录", "急性 CRS 与 ICANS，加上迟发克隆事件；随访以年计", "停止规则不同"],
    ["可及性主张", "若重复给药成立，更接近药品供应；冷链与免疫原性是代价", "现货供应、单次输注；代价是不可逆与长期随访成本", "COGS 模型不能共用一张表"],
    ["监管默认项", "RNA 不自动适用整合载体的 15 年随访，但要写出理由", "整合载体一般按 15 年设计随访", "把随访预算写进估值"],
  ]);
}
