# Project Mystery 最新状态

日期：2026-05-25

角色：Team Manager / PM

## 1. 当前结论

本地 MVP 已恢复。

当前版本仍是 `MVP Prototype`，不是可灰度产品。

已修正：
- 结果页改成导航式布局，地图占手机首屏约 75%。
- 地图节点统一为 `当下` 和 `未来`。
- 前端移除当前城市字段；后台用 `/api/context` 基于请求 IP 生成城市级上下文。
- 三条路线卡移除可见数字评分，只保留稳妥路、快速路、绕行路。
- 新增 `/api/roadmap-copy` 受控模型文案层；无 `OPENAI_API_KEY` 时自动回退本地模板。
- 输入到输出规则已同步到 `docs/logic/v1_mvp_input_to_output_rules.md`。

仍未完成：
- 线上真实 IP/定位服务未接入；本地 loopback IP 只能模拟。
- 多引擎 parity test 未跑通。
- Benchmark 评测未跑通。
- Peter 未完成规则权重审核。

## 2. 本地入口

`http://127.0.0.1:4173/preview/life-roadmap-mvp/`

如果打不开，先启动：

```bash
cd "/Users/zhen/Documents/Project Mystery"
npm run serve
```

## 3. 当前输入到输出链路

```text
用户输入
-> 出生日期/时间
-> 出生四柱、日主五行、五行分布
-> 当前日期
-> 今日干支、节气、宜忌、冲煞
-> 用户问题
-> 意图识别
-> 年龄/地点/重大事件上下文
-> 六个内部分数
-> 路况状态
-> A/B/C 路线适配度
-> /api/roadmap-copy 受控文案改写
-> MapLibre 地图展示
```

当前规则文档：

`docs/logic/v1_mvp_input_to_output_rules.md`

## 4. 地图状态

已接：
- `MapLibre GL JS`
- `OpenFreeMap Positron` 真实 OSM 矢量底图
- Route JSON -> GeoJSON -> MapLibre layer

未接：
- 真实 routing provider
- OSRM / Valhalla / GraphHopper
- maplibre-gl-directions 交互插件

说明：
当前地图只是把“人生路线”叠到真实地图底图上。它还不是完整 Mapbox Navigation 体验。

要接近 Mapbox 效果，需要：
1. 真实底图 style。
2. 路线层。
3. 路线替代方案。
4. 拥堵段/风险段。
5. 当前点/目标点。
6. 交互式路线选择。

## 5. 多源判断

当前已接入：
- 历法命理源：`lunar-javascript`
- 地图渲染源：`MapLibre GL JS`
- 地图底图源：`OpenFreeMap`
- 本地重大事件库：`data/context/china_major_life_events_v1.json`

计划接入：
- `lunar-python`
- `sxtwl`
- `cnlunar`
- BaziQA benchmark
- MingLi-Bench
- 内部 golden cases

原则：
- 多源用于交叉验证。
- Benchmark 用于评测。
- 用户结果只使用 Peter 审核后的规则。

## 6. 千人千面

可以做到。

当前差异来源：
- 出生日期。
- 出生时间。
- 当前日期。
- IP 上下文城市桶。
- 用户问题意图。
- 五行关系。
- 今日宜忌。
- 冲煞。
- 年龄阶段。
- 重大事件匹配。

当前输入空间下限约 `319.3 亿` 种；可解释路线状态约 `25.9 万` 种。

但生产版不能只靠组合数量。需要：
- 规则可解释。
- 文案模板可控。
- 每个结果可回溯。
- 高频用户不能每天看到重复句式。

## 7. 重大事件库

已新增：

`data/context/china_major_life_events_v1.json`

当前事件包括：
- 改革开放
- 南方谈话
- 住房制度改革
- 加入 WTO
- 非典
- 汶川地震
- 北京奥运
- 上海世博
- 移动支付普及
- 新冠疫情

规则：

```text
如果事件发生时用户年龄在 minAge/maxAge 内
且事件 region 匹配全国/出生地/IP 城市桶
则进入 lifeContext
```

影响：
- 小幅影响稳定性、风险、支持度。
- 进入“为什么是这个结果”依据。
- 不直接生成强判断。

## 8. 当前风险

- 性别暂未进入计算。
- 出生地未做真太阳时。
- 本地 loopback IP 只能模拟城市桶。
- 当前环境没有 `OPENAI_API_KEY`，模型接口只能走 fallback。
- Benchmark 未跑通。
- Peter 未完成规则卡审核。

## 9. 下一步

优先级：
1. 做规则调试面板。
2. 接入多引擎 parity test。
3. 建内部 golden cases。
4. 把地图改成全屏导航式布局。
5. 接入真实 IP/定位上下文，但必须用户授权。
