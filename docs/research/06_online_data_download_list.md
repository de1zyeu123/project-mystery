# 在线数据需求与下载清单

日期：2026-05-24

状态：工作版，供用户审核。

## 使用原则

1. 先下载可合法使用的数据。
2. 授权不清楚的数据只做研究参考。
3. 用户问题语料和竞品流程不能随便抓取，必须确认平台条款。
4. 所有下载数据都要保留来源 URL、下载时间、license 和用途标签。

## P0：必须下载或接入的数据

### 1. 日历/八字计算引擎

| 数据/工具 | 下载地址 | 下载方式 | 用途 | 状态 |
|---|---|---|---|---|
| `lunar-python` | https://pypi.org/project/lunar-python/ | `pip install lunar_python` | MVP 后端日历、节气、干支、八字 baseline | 直接使用，仍需边界测试 |
| `lunar-python` source | https://github.com/6tail/lunar-python | `git clone https://github.com/6tail/lunar-python.git` | 查看实现、license、测试逻辑 | 可下载 |
| `lunar-javascript` | https://www.npmjs.com/package/lunar-javascript | `npm install lunar-javascript` | TypeScript 计算候选 | 需和 Python 版本做 parity test |
| `lunar-javascript` source | https://github.com/6tail/lunar-javascript | `git clone https://github.com/6tail/lunar-javascript.git` | 前端/Node 计算候选 | 可下载 |

使用人：
- Andrew。

用途：
- 构建基础计算层。
- 生成每日运势输入字段。
- 为 benchmark 提供计算 trace。

### 2. 节气边界校验

| 数据/工具 | 下载地址 | 下载方式 | 用途 | 状态 |
|---|---|---|---|---|
| `sxtwl` | https://pypi.org/project/sxtwl/ | `pip install sxtwl` | 精确节气时间、日历校验 | 直接使用作校验源 |
| `sxtwl` source | https://github.com/yuangu/sxtwl_cpp | `git clone https://github.com/yuangu/sxtwl_cpp.git` | 检查算法实现 | 可下载 |

使用人：
- Andrew。

用途：
- 24 节气边界测试。
- 立春精确时刻校验。
- 防止日期级八字错误。

### 3. 黄历/宜忌字段校验

| 数据/工具 | 下载地址 | 下载方式 | 用途 | 状态 |
|---|---|---|---|---|
| `cnlunar` | https://pypi.org/project/cnlunar/ | `pip install cnlunar` | 黄历、宜忌、彭祖百忌、神煞字段交叉校验 | 可使用，边界需谨慎 |
| `cnlunar` source | https://github.com/OPN48/cnLunar | `git clone https://github.com/OPN48/cnLunar.git` | 查看字段定义和 license | 可下载 |

使用人：
- Andrew + Peter。

用途：
- 建黄历字段解释表。
- 让 Peter 审每类字段能否进入每日运势。

### 4. 内部 Benchmark 题库

| 数据/工具 | 下载地址 | 下载方式 | 用途 | 状态 |
|---|---|---|---|---|
| `MingLi-Bench` repo | https://github.com/DestinyLinker/MingLi-Bench | `git clone https://github.com/DestinyLinker/MingLi-Bench.git` | 内部 benchmark 框架 | 可下载，限制使用 |
| 标准化题库 | https://raw.githubusercontent.com/DestinyLinker/MingLi-Bench/main/data/data.json | `curl -L -o data.json <url>` | 160 道选择题，32 个案例 | internal-only |
| 预计算命盘 | https://raw.githubusercontent.com/DestinyLinker/MingLi-Bench/main/data/fortune_api_results.json | `curl -L -o fortune_api_results.json <url>` | 八字/紫微命盘参考 | internal-only |
| License | https://raw.githubusercontent.com/DestinyLinker/MingLi-Bench/main/LICENSE | `curl -L -o LICENSE <url>` | 授权记录 | 需保留 |

使用人：
- Bill：跑 benchmark。
- Andrew：验证数据结构。
- Peter：看题型是否符合专业逻辑。

限制：
- 不用于营销。
- 不向用户展示原题。
- 授权复核前不用于训练。

### 5. 中国法定节假日/调休

每日运势不一定必须用法定节假日，但用户每天打开 App 时，节假日和调休会影响语气和行动建议。

| 数据/工具 | 下载地址 | 下载方式 | 用途 | 状态 |
|---|---|---|---|---|
| `holiday-calendar` CN 2026 JSON | https://unpkg.com/holiday-calendar/data/CN/2026.json | `curl -L -o CN_2026.json <url>` | 法定节假日、调休工作日 | 可下载，需核对官方公告 |
| `holiday-calendar` jsDelivr 备份 | https://gcore.jsdelivr.net/gh/cg-zhou/holiday-calendar@main/data/CN/2026.json | `curl -L -o CN_2026.json <url>` | CDN 备份 | 可下载 |
| `holiday-calendar` repo | https://github.com/cg-zhou/holiday-calendar | `git clone https://github.com/cg-zhou/holiday-calendar.git` | 下载全量 JSON | 可下载 |
| `chinese-holidays-data` | https://github.com/bastengao/chinese-holidays-data | `git clone https://github.com/bastengao/chinese-holidays-data.git` | 中国休假/工作日数据备选 | 可下载 |
| `chinese-holidays-data` 2026 JSON | http://chinese-holidays-data.basten.me/data/2026.json | `curl -L -o 2026.json <url>` | 2026 年休假数据 | 需核对可用性 |

使用人：
- Andrew。

用途：
- 区分工作日、节假日、调休。
- 优化每日建议语气。

限制：
- 节假日数据必须核对国务院公告。

## P0：必须收集，但不能简单下载的数据

### 6. 古籍/传统依据

| 数据 | 在线来源 | 获取方式 | 用途 | 状态 |
|---|---|---|---|---|
| 干支、五行、传统术语依据 | Chinese Text Project | https://ctext.org/ / API: https://ctext.org/tools/api | Peter 查证来源，Andrew 建来源卡 | 需授权/使用限制复核 |
| 周易文本 | Wikisource 周易 | https://zh.wikisource.org/wiki/%E5%91%A8%E6%98%93 | 后续周易模块参考 | 不进 MVP |
| Wikisource API | MediaWiki API | `https://zh.wikisource.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=周易` | 获取文本用于研究 | 需遵守 CC BY-SA 和引用要求 |

使用人：
- Peter + Andrew。

用途：
- 给规则卡补 `source_ids`。
- 补经典依据。
- 标记哪些是“古籍依据”、哪些是“现代整理”、哪些是“Peter 判断”。

限制：
- 不做大规模抓取。
- 不把未审核古籍全文放进产品。
- 不直接用古文生成用户回答。

### 7. 用户真实问题语料

| 数据 | 推荐来源 | 获取方式 | 用途 | 状态 |
|---|---|---|---|---|
| 每日运势问法 | 自建问卷/访谈 | Typeform、飞书表单、问卷星 | 建用户问题分类 | 需要自己采集 |
| 情绪类问法 | 自建问卷/访谈 | 同上 | 训练产品语气和安全边界 | 需要自己采集 |
| 感情/工作/财运问法 | 自建问卷/访谈 | 同上 | 扩展 style examples | 需要自己采集 |
| App 内 beta logs | 后续测试版 | 用户授权后记录 | 最有价值的真实语料 | MVP 后采集 |

使用人：
- Bill + Andrew。

不建议：
- 直接抓小红书、知乎、微博、贴吧等用户内容作为训练语料。

原因：
- 平台条款和隐私风险高。
- 用户内容不可直接商业使用。

### 8. 真实咨询案例

| 数据 | 推荐来源 | 获取方式 | 用途 | 状态 |
|---|---|---|---|---|
| 非选择题咨询案例 | Peter 自有案例脱敏版 | 人工整理 | 训练规则解释和好/坏答案 | 需 Peter 提供 |
| 高质量模拟案例 | Peter + Bill 共创 | 人工生成并审核 | 产品评测 | 可内部创建 |
| 高风险拒答案例 | Bill 创建，Peter 审 | 人工生成 | 安全测试集 | 可内部创建 |

使用人：
- Peter + Bill。

限制：
- 必须脱敏。
- 不能含真实姓名、联系方式、出生地精确到住址等敏感信息。

## P1：产品和竞品数据

### 9. 国内竞品

| 产品 | 在线地址 | 获取方式 | 用途 | 状态 |
|---|---|---|---|---|
| 准了 | https://apps.apple.com/cn/app/%E5%87%86%E4%BA%86-%E6%98%9F%E5%BA%A7%E5%A1%94%E7%BD%97%E7%B4%AB%E5%BE%AE%E6%83%85%E6%84%9F%E8%BF%90%E5%8A%BF%E8%A7%A3%E6%9E%90/id1356471277 | 手工截图/流程拆解 | 每日习惯、AI 问答入口、情绪表达 | 只做产品参考 |
| 测测 | https://play.google.com/store/apps/details?id=com.lingocc.cc5&hl=zh | 手工截图/流程拆解 | 社区、AI agents、专家信号 | 只做产品参考 |
| 问真八字 | https://apps.apple.com/cn/app/%E9%97%AE%E7%9C%9F%E5%85%AB%E5%AD%97%E6%8E%92%E7%9B%98%E5%AE%9D%E7%AE%97%E5%91%BD%E5%8D%A0%E5%8D%9C%E5%91%A8%E6%98%93%E5%B7%A5%E5%85%B7/id1665624645 | 手工截图/流程拆解 | 专业排盘、古籍链接、信任感 | 只做产品参考 |
| 文墨天机 | https://apps.apple.com/cn/app/%E6%96%87%E5%A2%A8%E5%A4%A9%E6%9C%BA-%E4%B8%93%E4%B8%9A%E7%89%88/id1193514811 | 手工截图/流程拆解 | 紫微专业盘面 | Phase 2 参考 |

使用人：
- Bill。

限制：
- 不复制 UI。
- 不抓用户评论作为训练数据。
- 只拆流程、功能、信息架构和信任表达。

### 10. 海外产品

| 产品 | 在线地址 | 获取方式 | 用途 | 状态 |
|---|---|---|---|---|
| CHANI | https://chani.com/ | 手工流程分析 | 每日仪式感、订阅边界 | 产品参考 |
| Co-Star | https://www.costarastrology.com/ | 手工流程分析 | 社交分享机制 | 产品参考 |
| The Pattern | https://www.thepattern.com/ | 手工流程分析 | 心理化表达 | 产品参考 |
| Sanctuary | https://www.sanctuaryworld.co/ | 手工流程分析 | 真人专家升级路径 | 产品参考 |

使用人：
- Bill。

限制：
- 西方 astrology 不进入玄学逻辑。
- 只参考产品体验。

## P1：评测方法参考

| 数据 | 下载/访问地址 | 获取方式 | 用途 | 状态 |
|---|---|---|---|---|
| BaziQA-Benchmark paper | https://arxiv.org/abs/2602.12889 | 下载 arXiv PDF | 命理 benchmark 方法参考 | 不作为产品数据 |
| Starnum benchmark | https://starnum.com.tw/benchmark/zh-TW/ | 手工查看页面 | golden test 和评分维度参考 | 不作为 MVP 数据 |

## 不使用或暂缓的数据

| 数据 | 决策 | 原因 |
|---|---|---|
| 大师排行榜 | 不使用 | 无可审计方法，偏 SEO/营销 |
| 官方比赛原题直接抓取 | 暂缓 | 复用权利不清楚 |
| 小红书/知乎/微博/贴吧用户内容 | 暂缓 | 平台条款、隐私、授权风险 |
| 未审核古籍全文 | 暂缓 | 容易误用，需 Peter 审核 |
| 西方 astrology 解释体系 | 不进入逻辑 | 产品参考可以，玄学逻辑不用 |

## 建议下载顺序

### 第一批：Andrew 立刻下载

1. `lunar-python`
2. `sxtwl`
3. `cnlunar`
4. `MingLi-Bench`
5. `holiday-calendar` CN JSON

目的：
- 完成计算层和评测层基础数据。
- 扩展节气边界测试。
- 补每日场景日期信息。

### 第二批：Peter/Andrew 共同整理

1. Chinese Text Project 相关文本。
2. Wikisource 周易。
3. 黄历字段传统来源。
4. 五行生克传统依据。

目的：
- 给规则卡补来源。
- 判断哪些规则可进 MVP。

### 第三批：Bill 收集

1. 用户问卷。
2. 访谈记录。
3. 竞品截图。
4. 高风险测试题。

目的：
- 让产品回答贴近用户习惯。
- 建 product benchmark。

## 当前结论

可以直接下载的数据主要是：
- 计算引擎。
- 校验引擎。
- `MingLi-Bench`。
- 节假日 JSON。

不能直接下载来用的数据主要是：
- 用户真实问题。
- 古籍规则解释。
- 竞品用户内容。
- 官方比赛原题材料。

这部分必须走人工审核、授权检查和脱敏处理。
