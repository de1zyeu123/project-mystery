# Review Log

## 2026-05-20

Created initial research workflow.

Added popularity benchmark standard.

Added end-to-end product plan:
- data collection
- internal knowledge base
- benchmark evaluation
- conversation style
- UI/UE
- development and deployment

Started Step 1 data collection:
- added local `MingLi-Bench` data copy
- added benchmark dataset review
- added competitor and user-question inventory
- added Step 1 review packet

Completed Step 1 Phase 2:
- verified official HKJFMA 2025 competition page exists
- kept `MingLi-Bench` internal-only due to reuse-rights uncertainty
- installed and tested `lunar-python`, `sxtwl`, and `cnlunar`
- found solar-term boundary issue at 2024-02-04 15:00
- selected `lunar-python` as current BaZi baseline
- assigned `sxtwl` to solar-term validation
- assigned `cnlunar` to Huangli/almanac validation

Pending user decisions:
- Approve team workflow.
- Approve MVP starting scope.
- Approve source research direction.
- Approve popularity benchmark standard.
- Approve end-to-end product plan.
- Approve Step 1 source and benchmark direction.
- Approve Step 1 Phase 2 source and engine decisions.

Recommended decision:
- Start MVP with daily 运势 based on calendar, 干支, 五行, 黄历, and basic 八字.
- Keep 紫微斗数 and 周易 as later modules.
- Use `lunar` family as calculation baseline.
- Use `sxtwl` and `cnlunar` as validation sources.
- Use app benchmarks for UX only, not truth.
- Treat 世界算命大赛题库 as a benchmark candidate, not an approved source, until Andrew verifies source and usage rights.

## 2026-05-24

新增在线数据需求与下载清单：
- 路径：`docs/research/06_online_data_download_list.md`
- 覆盖：计算引擎、节气校验、黄历字段、MingLi-Bench、节假日、古籍、用户语料、真实案例、竞品、评测方法。
- 标记：可直接下载、需授权复核、只能手工收集、暂缓使用。

## 2026-05-25

根据附件 `人生k线产品分析_0525.pdf` 调整策略：
- 从「每日运势对话 App」转为「人生信号」超轻量 Web App / 小程序。
- v1 主形态：人生路况 + 人生天气 + 三角形/六边形状态图。
- 暂不做 technical design。

新增文件：
- `archive/v0_每日运势对话app研究基础/00_旧版研究归档摘要.md`
- `docs/market/v1_市场洞察与展示形式调研.md`
- `docs/prd/v1_人生信号_webapp_prd.md`

待用户审核：
- 是否接受 v1 主形态。
- 是否接受最小输入方案。
- 是否接受底层逻辑范围。
- 是否进入前端原型。

补充技术方向：
- 新增 `docs/technical/v1_人生路况地图渲染技术方案.md`
- 推荐采用自研 SVG 语义地图。
- 核心链路：用户输入 -> 推理引擎 -> Route JSON -> 地图渲染器。
- 大模型不直接生成 UI，只能在受控模板内辅助改写文案。

新增 preview：
- 路径：`preview/life-roadmap/index.html`
- 形式：静态 HTML + CSS + JS。
- 内容：移动端人生路况结果页，内置 Route JSON、SVG 语义地图、路线 A/B/C 切换和底部导航指令。

新增决策逻辑：
- 路径：`docs/logic/v1_用户信息到人生路况决策逻辑.md`
- 核心：用户信息 -> 特征层 -> 规则层 -> 评分层 -> 路线决策树 -> Route JSON -> SVG 地图渲染。
- 明确：确定性计算、可控随机、IP/当前位置使用边界、LLM 使用边界、Mapbox/OpenAI 定位。

修正 Mapbox 判断：
- `MyBox` 为误写，已改为 `Mapbox`。
- v1 不默认接 Mapbox。
- v2 如果需要真实地图，可新增 `MapboxGeoRenderer`，但产品逻辑仍以 Route JSON 为中心。

新增 Mapbox 替代框架选型：
- 路径：`docs/technical/v1_mapbox替代框架选型.md`
- 推荐：`MapLibre GL JS + @vis.gl/react-maplibre + OpenFreeMap` 作为快速 POC。
- 生产候选：`MapLibre GL JS + Protomaps PMTiles`。
- 原则：渲染器可替换，产品逻辑仍以 `Route JSON` 为中心。

修正交互与稳定性问题：
- 路径：`docs/technical/v1_交互与稳定性修正方案.md`
- preview 已增加地图路线、风险段、隧道、机会出口、当前位置、终点点击。
- 稳定性方案调整为：规则引擎输出状态枚举，渲染器从固定路线模板生成图，不允许规则自由生成坐标。

澄清命理生成逻辑：
- 路径：`docs/logic/v1_命理知识接入与生成逻辑说明.md`
- 当前 preview 是手写样例 Route JSON，不是命理计算结果。
- 正式 v1 会使用历法、节气、干支、五行、黄历、冲煞等作为结构化特征。
- 命理知识只进入特征和规则层，不让大模型自由解释成结果。

启动本地 MVP：
- 路径：`preview/life-roadmap-mvp/index.html`
- 接入：`lunar-javascript@1.7.7`
- 功能：用户输入 -> 干支/节气/黄历特征 -> 六维评分 -> 路况状态 -> 可交互地图。
- 说明：当前规则是 v1 产品验证版，命理映射仍需 Peter 审核。

输出质量改版：
- 路径：`preview/life-roadmap-mvp/index.html`
- 新增：今日主结论、行动卡、路线收益/代价、用户版依据面板。
- 修正：普通用户不再直接看到 JSON Trace；技术 Trace 收进依据面板。
- 交叉验收：`docs/logic/v1_mvp_output_quality_crosscheck.md`
- 说明：当前可进入本地试玩，仍不能进入正式灰度。

MapLibre UI 升级：
- 路径：`preview/life-roadmap-mvp/index.html`
- 新增：`maplibre-gl@5.24.0` 本地 vendor。
- 地图从手写 SVG 切换为 MapLibre WebGL canvas。
- 路线数据仍由内部 Route JSON 生成，再转为 GeoJSON source/layer。
- 文案压缩：主结论、解释、地图标注、路线卡均缩短。
- 记录：`docs/technical/v1_maplibre_ui_upgrade.md`

规则透明化修正：
- 移除路线卡 `min` 展示。
- 路线卡改为 `适配度`，来自路线推荐公式。
- 移除无依据的 `20:00` 固定时间表达，改为 `稍后小步加速`。
- 新增规则说明：`docs/logic/v1_mvp_input_to_output_rules.md`

项目状态与上下文层修正：
- 恢复本地 `4173` 服务。
- MapLibre 改为接入 OpenFreeMap 真实矢量底图。
- 新增重大事件库：`data/context/china_major_life_events_v1.json`
- 新增 benchmark 候选清单：`data/benchmark/benchmark_sources_v1.json`
- 新增 PM 状态说明：`docs/pm/latest_project_status_2026-05-25.md`
- MVP 已把年龄/地点/重大事件匹配接入 `lifeContext`。

导航式结果页修正：
- 结果页地图占比调整为手机首屏约 75%。
- 地图节点统一为 `当下` 和 `未来`，不在结果页展示实际城市。
- 隐藏底图地名，仅保留人生路线标注，避免用户误解为真实导航。
- 早期当前城市字段已废弃；后续改为后台 IP 上下文生成 `contextCity`。
- 三条路线卡只保留 `稳妥路`、`快速路`、`绕行路`，移除可见适配分和机械评分。
- 文案改为行动句：`抓窗口，轻推进`、`小步推进`、`先稳住`、`欲速则不达`、`绕一点反而快`。
- 修正路线推荐顺序：先算内部适配度，再确定最终路线，再重新生成路线标签。
- 更新规则文档：`docs/logic/v1_mvp_input_to_output_rules.md`

输入、IP 和模型文案层修正：
- 前端移除 `当前城市` 字段；出生地右侧显示性别。
- 新增 Node 本地 server：`scripts/life-roadmap-server.mjs`。
- 新增 `/api/context`：基于请求 IP 生成城市级 `contextCity`，本地 loopback IP 走模拟。
- 新增 `/api/roadmap-copy`：支持 OpenAI Responses API 结构化 JSON 文案层；无 `OPENAI_API_KEY` 时走同 schema fallback。
- 问题相关文案改造：例如“今天适合干什么？”会映射到慢节奏、追击窗口、低压安排三类路线建议。
- 新增生成空间口径：输入空间下限约 `319.3 亿` 种，可解释路线状态约 `25.9 万` 种。
