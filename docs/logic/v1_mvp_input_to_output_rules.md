# v1 MVP 输入到输出规则

日期：2026-05-25

目的：说明用户输入如何映射到「人生路况」结果。

结论：当前 MVP 已接入确定性计算引擎和受控模型文案层。规则引擎决定路线，模型接口只改短文案。

## 1. 用户输入

| 输入 | 当前用途 | 是否进入计算 |
|---|---|---|
| 出生日期 | 计算出生年柱、月柱、日柱、生肖、日主五行、五行分布 | 是 |
| 出生时间 | 计算时柱；决定精度等级 | 是 |
| 出生地 | 进入重大事件匹配；进入 deterministic seed | 是 |
| IP 上下文 | server 通过请求 IP 生成城市级 `contextCity`，前端不展示 | 弱进入 |
| 性别 | 只采集，不影响当前结论 | 否 |
| 用户问题 | 识别意图类型；进入 deterministic seed | 是 |
| 当前日期时间 | 计算今日干支、节气、宜忌、冲煞、星期 | 是 |

前端不再要求用户填写当前城市。生产版使用 IP 粗定位或用户授权定位，只进入城市级上下文，不展示精确地址。

## 2. 问题到意图

| 意图 | 关键词 | 影响 |
|---|---|---|
| 关系沟通 | TA、联系、感情、关系、复合、沟通 | 提高关系权重和风险敏感度 |
| 财富承诺 | 钱、财、投资、消费、交易、买、卖 | 提高风险控制权重 |
| 方向选择 | 换、变道、离职、转向、改变、选择 | 提高变道判断权重 |
| 情绪支持 | 焦虑、休息、情绪、状态、内耗 | 降低推进权重，提高稳定权重 |
| 事业推进 | 工作、推进、事业、项目、面试、汇报、合作 | 提高推进和支持权重 |
| 今日安排 | 干什么、做什么、安排、适合、行动、计划 | 输出与问题相关的三路线行动 |
| 今日综合 | 无命中 | 默认中等风险 |

## 3. 命理特征

使用 `lunar-javascript@1.7.7`：

| 特征 | 来源 | 用途 |
|---|---|---|
| 出生四柱 | 出生日期/时间 | 取日主五行、五行分布 |
| 今日四柱 | 当前日期时间 | 取今日五行 |
| 节气 | 当前日期 | 判断天时状态 |
| 宜忌 | 黄历日宜/日忌 | 修正推进、稳定、风险 |
| 冲煞 | 今日冲煞 | 小幅增加风险 |
| 五行关系 | 日主五行 vs 今日五行 | 判断助力、消耗、压力 |

五行关系：

| 关系 | 含义 | 修正 |
|---|---|---|
| 今日五行生我 | 外部助力更强 | support +12 |
| 我生今日五行 | 容易被事务消耗 | momentum +10 |
| 今日五行同我 | 节奏同频 | momentum +5, stability +5 |
| 今日五行克我 | 压力更高 | risk +16, stability -8 |
| 我克今日五行 | 可主动处理，但要控幅度 | momentum +6, risk +4 |

## 4. 分数层

内部 6 个分数：

| 分数 | 含义 |
|---|---|
| momentum | 推进力 |
| stability | 稳定性 |
| support | 外部支持 |
| relationship | 关系顺滑度 |
| wealthSafety | 财富安全度 |
| risk | 阻力/风险 |

基础值：

```text
contextOffset = hash(出生日期 + 出生时间 + 出生地 + IP contextCity + 用户问题 + 今日日期) in [-15, 15]
personalityOffset = hash(日柱 + 时柱 + 生肖) in [-10, 10]
wuxingBalance = 14 - (五行最大数量 - 五行最小数量) * 4

momentum = 50 + contextOffset + max(0, personalityOffset)
stability = 48 + wuxingBalance - min(0, personalityOffset)
support = 48 + round(contextOffset * 0.5)
relationship = 50
wealthSafety = 52
risk = 40 - min(wuxingBalance, 10) + max(0, -personalityOffset)
```

日主修正：

| 日主五行 | 修正 |
|---|---|
| 木 | momentum +4, support +2 |
| 火 | momentum +8, risk +4 |
| 土 | stability +8, momentum -2 |
| 金 | stability +3, risk +4 |
| 水 | support +6, stability +2 |

其他修正：

| 条件 | 修正 |
|---|---|
| 今日宜包含交易、出行、会友、求财 | momentum +8 |
| 今日宜包含整理、沟通、解除、沐浴 | stability +5 |
| 今日忌包含安葬、争执、破土、嫁娶、开光 | risk +8 |
| 今日有冲煞 | risk +4 |
| 周末 | stability +4, momentum -2 |
| 事业问题 | momentum +8, support +5 |
| 关系问题 | relationship +10, risk +6 |
| 财富问题 | wealthSafety -8, risk +8 |
| 情绪问题 | stability +8, momentum -8, risk -6 |
| 没有出生时间 | risk +4, support -3 |

所有分数 clamp 到 `0-100`。

## 5. 重大事件上下文

事件库当前包括：改革开放、南方谈话、住房制度改革、加入 WTO、非典、汶川地震、北京奥运、上海世博、移动支付普及、新冠疫情。

匹配规则：

```text
ageAtEvent = event.year - birthYear

if ageAtEvent 在 event.minAge/event.maxAge 内
and event.region 命中 全国/出生地/IP contextCity
then 进入 lifeContext
```

影响方式：

| 条件 | 修正 |
|---|---|
| eventWeight >= 5 | stability +3, risk +2 |
| eventWeight >= 3 | stability +2, support +1 |
| 事件 lens 包含机会、开放、流动、职业 | support +2 |
| 事件 lens 包含风险、不确定、韧性、边界 | risk +2 |

该层只做小幅权重和解释，不直接输出强判断。

## 6. 路况状态

内部状态仍保留英文枚举，用户看到的是行动文案。

| 内部状态 | 规则 | 用户看到 |
|---|---|---|
| smooth | momentum >= 70 且 risk < 55 | 抓窗口，轻推进 |
| slow_climb_with_risk | risk >= 65 | 先稳住 |
| slow_climb | 其他情况 | 小步推进 |

不再展示“上海”“上坡”“缓行上坡”等地理或工程化描述。

## 7. 路线选择

先计算三条路线的内部适配度：

```text
A 稳妥路 = 68 + stability * 0.18 - risk * 0.08
B 快速路 = 44 + momentum * 0.32 - risk * 0.24 + support * 0.08
C 绕行路 = 52 + max(0, 62 - momentum) * 0.28 + risk * 0.12
```

再选择推荐路线：

```text
if intent == 情绪支持:
  selectedRoute = C 绕行路
else if risk >= 68 and momentum < 70:
  selectedRoute = C 绕行路
else if momentum >= 70 and risk <= 58 and support >= 52:
  selectedRoute = B 快速路
else:
  selectedRoute = 适配度最高的路线
```

路线含义：

| 路线 | 用户文案 | 产品含义 |
|---|---|---|
| A 稳妥路 | 绕一点反而快 | 不走最短线，先避开阻力 |
| B 快速路 | 欲速则不达 / 窗口短，动作轻 | 直线快，但风险高时容易堵 |
| C 绕行路 | 先避噪音 / 绕开拥堵 | 降低压力，保留余力 |

内部适配度只用于排序，不在结果页显示数字。

## 8. 问题相关文案层

路线规则先定，文案后改。

```text
规则引擎输出：intent + scores + selectedRoute + A/B/C route options
-> /api/roadmap-copy
-> 模型返回固定 JSON
-> 前端只接受 headline、subline、A/B/C 的 summary/cardLine/action
```

大模型不能改：
- 路线 ID。
- 推荐路线。
- 分数。
- 地图坐标。
- 安全边界。

如果没有 `OPENAI_API_KEY` 或接口失败，自动回退本地模板。

例：用户问“今天适合干什么？”

| 路线 | 输出方向 |
|---|---|
| A 稳妥路 | 慢节奏：整理、收尾、复盘 |
| B 快速路 | 追击窗口：只冲一个重点 |
| C 绕行路 | 低压安排：补能、观察、少承诺 |

## 9. 地图展示规则

| 元素 | 规则 |
|---|---|
| 当前点 | 固定展示为“当下” |
| 目标点 | 固定展示为“未来” |
| 背景地图 | 当前用 MapLibre + OpenFreeMap；根据 IP contextCity 切换底图中心；隐藏真实地名 |
| A 路线 | 蓝色主路线，可拆为慢起步、风险段、隧道/视野转清、未来出口 |
| B 路线 | 红色快速路线，表达“看似直线，但可能堵” |
| C 路线 | 绿色绕行路线，表达“先降压，再靠近目标” |
| 点击路线 | 切换当前路线并更新底部指令 |
| 点击节点 | 显示该节点的解释 |

结果页只展示三张路线卡：稳妥路、快速路、绕行路。

## 10. 生成空间

按 1900-01-01 到 2026-05-25 计算：

| 维度 | 数量 |
|---|---:|
| 出生日期 | 46,166 |
| 出生时间 | 1,441，含“不知道时辰” |
| 性别 | 4 |
| IP 城市桶 | 20 |
| 问题意图 | 6 |

当前输入空间下限：

```text
46,166 * 1,441 * 4 * 20 * 6 = 31,932,098,880
```

即约 `319.3 亿` 种输入组合。不计出生地自由文本和模型文案变化。

当前路线状态空间：

```text
roadState 3 * selectedRoute 3 * laneChange 3 * speedAdvice 4
* riskState 2 * tunnelState 2 * lifeStage 5 * IP城市桶 20 * 意图 6
= 259,200
```

这是不含模型文案的可解释状态空间。

## 11. 当前限制

- 出生地未做真太阳时校正。
- 性别暂不进入计算。
- 本地 loopback IP 只能模拟城市桶；线上需要真实请求 IP 或授权定位。
- 多引擎 parity test 未跑通。
- Benchmark 只用于评测，不直接生成用户结论。
- Peter 仍需审核权重和规则卡。
