# Project Mystery

Project Mystery 是一个中文优先的「人生路况」MVP。产品目标是让用户输入少量出生信息和一个今日问题，系统用可审计的规则引擎生成一张地图式人生导航图。

当前版本重点不是传统聊天，也不是随机生成玄学文案，而是验证一套可控链路：

```text
用户输入 -> 命理/日历特征 -> 评分规则 -> 路线决策 -> Route Data -> MapLibre UI
```

## 当前 MVP

- 产品形态：超轻量 Web App / 小程序原型。
- 核心页面：`preview/life-roadmap-mvp/`。
- 核心体验：输入生日、时辰、出生地、性别、今日问题，生成「当下 -> 未来」的三路线导航图。
- 三条路线：稳妥路、快速路、绕行路。
- 地图渲染：MapLibre GL JS + 本地语义地图层。
- 生成原则：规则引擎决定结果，大模型最多只改短文案，不能改变路线、分数、地图和判断。

## 本地运行

```bash
npm install
npm run serve
```

打开：

```text
http://127.0.0.1:4173/preview/life-roadmap-mvp/
```

## 项目结构

```text
.
├── README.md
├── package.json
├── scripts/
│   ├── life-roadmap-server.mjs        # 本地服务、IP 上下文、受控文案接口
│   └── validate_phase2_engines.py     # 命理引擎验证脚本
├── preview/
│   ├── life-roadmap-mvp/              # 当前 MVP
│   │   ├── index.html                 # 页面结构
│   │   ├── styles.css                 # 深色地图 UI、路线卡、底部指令
│   │   ├── app.js                     # 生成逻辑、MapLibre 渲染、交互
│   │   └── vendor/                    # 本地 MapLibre / lunar 依赖
│   └── life-roadmap/                  # 早期语义地图 preview
├── docs/
│   ├── logic/                         # 规则、生成逻辑、团队验证
│   ├── market/                        # 市场洞察
│   ├── prd/                           # 产品需求文档
│   ├── research/                      # 数据源、基准、竞品、引擎研究
│   ├── review/                        # 审核记录
│   └── technical/                     # 地图渲染和技术方案
├── data/
│   ├── benchmark/                     # benchmark 来源配置
│   ├── context/                       # 中国重大事件库
│   └── validation/                    # 引擎验证结果
└── archive/                           # 旧版研究归档
```

## 规则系统

核心规则文件：

- [MVP 输入到输出规则](docs/logic/v1_mvp_input_to_output_rules.md)
- [命理知识接入与生成逻辑](docs/logic/v1_命理知识接入与生成逻辑说明.md)
- [用户信息到人生路况决策逻辑](docs/logic/v1_用户信息到人生路况决策逻辑.md)
- [MVP 团队验证](docs/logic/v1_mvp_team_validation.md)
- [输出质量交叉验收](docs/logic/v1_mvp_output_quality_crosscheck.md)

当前规则使用：

- `lunar-javascript`：干支、节气、宜忌、冲煞。
- 五行关系：日主和今日天干的生克关系。
- 用户问题分类：事业、财富、关系、情绪、方向选择、综合。
- 重大事件库：按出生年份、年龄阶段、地区上下文补充人生背景。
- IP 上下文：本地 MVP 用 hash 模拟城市，后续可替换为真实 IP 定位。

## UI 原则

当前 UI 需求收敛为：

- 地图优先，结果页主要面积留给地图。
- 起点固定为「当下」，终点固定为「未来」。
- 三路线同时可见，推荐路线高亮，其他路线弱化但可点击。
- 地图要表达：当前位置、下一步方向、是否变道、是否加速、堵点、绕行段。
- 不展示真实城市名。
- 不使用无意义的伪导航时间。
- 底部只保留路线卡和当前导航指令。
- 结果页保留「为什么是这个结果」入口，默认收起。

## 前端代码

当前前端在：

- [index.html](preview/life-roadmap-mvp/index.html)
- [styles.css](preview/life-roadmap-mvp/styles.css)
- [app.js](preview/life-roadmap-mvp/app.js)

关键职责：

- `index.html`：输入页、结果页、地图容器、路线卡、解释弹层。
- `styles.css`：深色 glass UI、Mapbox-like 地图视觉、移动端布局。
- `app.js`：输入读取、命理计算、路线决策、MapLibre GeoJSON 渲染、点击交互。

## 后端代码

当前后端在：

- [life-roadmap-server.mjs](scripts/life-roadmap-server.mjs)

职责：

- 静态文件服务。
- `/api/context`：根据请求 IP 生成上下文城市。
- `/api/roadmap-copy`：可选调用 OpenAI，只做受控短文案改写。

如果没有 `OPENAI_API_KEY`，系统会使用本地模板，不影响核心路线生成。

## 数据与评测

数据文件：

- [中国重大事件库](data/context/china_major_life_events_v1.json)
- [benchmark 来源](data/benchmark/benchmark_sources_v1.json)
- [阶段二引擎验证结果](data/validation/phase2_engine_validation.json)

研究文件：

- [在线数据需求与下载清单](docs/research/06_online_data_download_list.md)
- [来源可靠性与许可审核](docs/research/step1_phase2/01_source_reliability_license_review.md)
- [引擎验证报告](docs/research/step1_phase2/02_engine_validation_report.md)
- [市场洞察](docs/market/v1_市场洞察与展示形式调研.md)
- [PRD](docs/prd/v1_人生信号_webapp_prd.md)

## 当前限制

- 本地预览使用语义地图层，暂不依赖真实在线 tile，保证本地测试稳定。
- IP 定位仍是 hash 模拟，尚未接入真实定位服务。
- 性别目前主要用于输入完整性，尚未深度进入规则权重。
- 命理规则为 v1 产品验证版，还需要继续由 Peter 审核和扩展。
- benchmark 文件已整理，但尚未形成自动化评分流水线。
