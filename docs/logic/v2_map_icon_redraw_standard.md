# 人生路况底图与 Icon 重绘标准 v2

日期：2026-05-30

## 1. 结论

需要调整 icon 标准。

现有 v2 icon 风格统一，但更像“图标素材包”。下一版要服务渐进式人生路线，因此标准要从“语义丰富”改为“移动端小尺寸一眼可识别 + 可挂到路线节点 + 意义由规则层计算”。

## 2. 底图标准

### 2.1 地图角色

底图不是装饰图。底图是拓扑坐标系统。

它负责：

- 承载起点、分叉、合流、终局。
- 表达人生只往前走。
- 给每个节点留出 icon 放置空间。
- 支持未选路线置灰、已选路线高亮。
- 支持后续用规则层把 icon 精准映射到节点。

它不负责：

- 固定每个节点的命理意义。
- 替用户做最终判断。
- 承载过多装饰元素。

### 2.2 视觉方向

- 等距 2.5D。
- 手机竖屏优先。
- 起点在左下，终局在右上。
- 路线像一棵向右上生长的树。
- 两条起步主路，后续分叉、合流。
- 主路清晰，地形弱化。
- 保留大富翁 / 飞行棋棋盘感，但减少封闭棋盘绕圈感。
- 参考 Mario 3D 的清晰地块、圆润坡面、桥、隧道、台地。

### 2.3 地图结构

第一版底图固定 4 层：

| 层级 | 视觉位置 | 作用 |
|---|---|---|
| L0 | 左下起点 | 用户当前所在位置 |
| L1 | 左下到中左 | 两条起步路线 |
| L2 | 中部 | 第二次选择 |
| L3 | 中上到右上 | 第三次选择与合流 |
| O | 右上 | 4 个结果出口 |

### 2.4 节点坐标建议

坐标使用归一化 `x/y`，便于前端映射：

| 节点 | x | y | 说明 |
|---|---:|---:|---|
| START | 0.14 | 0.82 | 起点 |
| L1-A | 0.28 | 0.66 | 先稳住 |
| L1-B | 0.30 | 0.84 | 试机会 |
| L2-A1 | 0.45 | 0.52 | 继续推进 |
| L2-A2 | 0.47 | 0.70 | 补足条件 |
| L2-B1 | 0.50 | 0.84 | 小步外探 |
| L2-B2 | 0.58 | 0.64 | 避开消耗 |
| L3-A1a | 0.66 | 0.36 | 扩大责任 |
| L3-A1b | 0.68 | 0.50 | 保持节奏 |
| L3-A2a | 0.70 | 0.66 | 先补资源 |
| L3-A2b | 0.74 | 0.78 | 先等信号 |
| L3-B1a | 0.78 | 0.58 | 借力打开 |
| L3-B1b | 0.77 | 0.86 | 轻量试错 |
| L3-B2a | 0.82 | 0.70 | 绕开冲突 |
| L3-B2b | 0.86 | 0.48 | 放慢观察 |
| O1 | 0.90 | 0.28 | 稳步成局 |
| O2 | 0.92 | 0.42 | 窗口打开 |
| O3 | 0.92 | 0.58 | 平衡转向 |
| O4 | 0.90 | 0.74 | 延后发力 |

## 3. Icon 标准

### 3.1 原则

每个 icon 必须满足三条：

1. 44-56px 手机尺寸可识别。
2. 单一主体，不做复杂小场景。
3. 表达“当前节点信号”，不表达固定命运结论。

### 3.2 形态标准

- 1 个主物体 + 最多 1 个辅助符号。
- 不放文字、数字、品牌、人脸。
- 不做多物体叙事。
- 轮廓必须厚，剪影必须清楚。
- 颜色对比要足够，避免小尺寸混成一团。
- 透明底。
- 不烘焙阴影。
- 深棕描边统一。
- 斜 45 度等距视角统一。

### 3.3 小尺寸测试

每个 icon 交付前必须通过：

- 64px 可识别主体。
- 48px 可识别类别。
- 32px 至少能看出情绪：机会、风险、稳、慢、等、冲突。

不通过则重画。

## 4. Icon 分层

下一版 icon 不再只按 32 个平铺，而按用途分层。

### 4.1 地图节点 icon

用于路线上的可点击节点。数量控制在 16 个左右。

优先保留：

- `momentum_boost`：推进
- `stability_anchor`：稳定
- `support_lighthouse`：支持
- `risk_barrier`：风险
- `opportunity_window`：机会
- `slow_down`：放慢
- `wait_signal`：等待
- `detour_route`：绕行
- `keep_lane`：沿主路
- `lane_change`：转向
- `blocked_path`：暂不推进
- `safe_zone`：安全区
- `relationship_contact`：沟通
- `wealth_safe_chest`：资源边界
- `career_path`：事业坡
- `mood_rest`：回到状态

### 4.2 详情解释 icon

用于详情卡，不一定上地图。

- 五行：`wood_growth` / `fire_energy` / `earth_base` / `metal_order` / `water_flow`
- 节气：`season_node`
- 关系：`relationship_bridge`
- 财富：`money_commitment`
- 宜忌：`good_timing` / `conflict_marker`

### 4.3 终局 icon

用于 4 个结果出口，需要新画或强化。

| 终局 | 建议形象 |
|---|---|
| O1 稳步成局 | 稳固台地 + 小旗 |
| O2 窗口打开 | 发光门 + 小路 |
| O3 平衡转向 | 双路合流 + 罗盘 |
| O4 延后发力 | 沙漏 + 蓄光坡道 |

## 5. 当前 icon 复核

从现有 64px 预览看，下一版需要调整：

| 类型 | 现状 | 处理 |
|---|---|---|
| 清晰可保留 | `risk_barrier`、`support_lighthouse`、`wealth_safe_chest`、`fire_energy`、`wood_growth` | 保留方向，微调统一 |
| 语义相近 | `keep_lane`、`lane_change`、`red_risk_segment` | 重画成更不同的剪影 |
| 小尺寸不够直观 | `earth_base`、`metal_order`、`season_node`、`money_commitment` | 重画，减少抽象感 |
| 过于场景化 | `relationship_bridge`、`blocked_path`、`detour_route` | 简化主体 |
| 可作为详情，不适合地图主节点 | 五行类、节气类 | 从地图节点降级到详情卡 |

## 6. Manifest 字段调整

下一版 manifest 除原字段外，增加：

```json
{
  "id": "momentum_boost",
  "filename": "icons/momentum_boost.png",
  "logic_layer": "node_signal",
  "node_role": ["choice", "action"],
  "topology_slots": ["L2-A1", "L3-B1b"],
  "meaning": "推进机会",
  "meaning_source": "computed",
  "selection_rule": "momentum high and risk controlled",
  "visual_priority": "map_node",
  "small_size_readability": "pass_48px",
  "ui_usage": "地图节点；点击后展示具体命理解释",
  "prompt_fragment": "single chunky rocket arrow, large silhouette, no tiny details"
}
```

关键变化：

- `meaning_source` 必须标记为 `computed`。
- `topology_slots` 只是可用槽位，不是固定位置。
- `selection_rule` 写规则层触发条件。
- `visual_priority` 区分地图节点、详情解释、终局出口。
- `small_size_readability` 记录小尺寸验收。

## 7. 生成提示词调整

Icon prompt 要减少装饰，强化剪影：

```text
Isometric 2.5D miniature board-game UI icon, single large readable symbol, transparent background after chroma key, one dominant object only, thick dark-brown outline, rounded clay/plastic toy material, soft candy colors, no text, no people, no logo. Designed to remain recognizable at 48px on a mobile map node.
```

每个 icon 的差异化片段必须遵守：

- 不超过 1 个主体。
- 不超过 1 个辅助符号。
- 禁止复杂场景。
- 禁止多个同等大小物体。
- 强调剪影。

## 8. 下一步执行顺序

### Step 1：先画底图

目标：

- 生成一张新的 `00_life_topology_map.png`。
- 地图上预留 START、L1、L2、L3、O1-O4 节点空间。
- 不把具体 icon 烘焙进底图。
- 只画路线、地形、桥、坡、隧道、出口。

验收：

- 一眼能看出人生从左下走向右上。
- 一眼能看出两条起步路线。
- 一眼能看出分叉和合流。
- 节点位置足够放 44-56px icon。
- 地图不像封闭大富翁棋盘绕圈。

### Step 2：建立前端节点坐标

目标：

- 把 `v2_progressive_route_topology.md` 的节点坐标写入前端数据层。
- 让节点、路线、置灰、高亮都按坐标渲染。
- icon 先用现有资产占位。

验收：

- START 在左下。
- 当前可选节点高亮。
- 未选路线置灰。
- 点击后只展开下一层 1 到 2 个选择。

### Step 3：重绘地图节点 icon

目标：

- 先重画 16 个地图节点 icon。
- 五行、节气、详情解释 icon 第二批再画。
- 终局 icon 单独画 4 个。

验收：

- 48px 可识别。
- 透明底。
- 无文字、无人物、无品牌。
- 每个 icon 只表达一个信号。

### Step 4：更新 manifest

目标：

- 增加 `node_role`、`topology_slots`、`meaning_source`、`selection_rule`、`visual_priority`、`small_size_readability`。
- 保持旧字段兼容。

验收：

- 前端可以按规则层输出选择 icon。
- LLM 可以按标准输出文案。
- 地图不会把 icon 固定死在某个命运解释上。

## 9. v3 执行状态

日期：2026-05-30

已完成：

- 新底图：`assets/generated/life-road-atlas-v2/00_life_topology_map.png`
- 拓扑映射：`assets/generated/life-road-atlas-v2/topology_node_mapping.json`
- 地图节点 icon v3：`assets/generated/life-road-atlas-v2/map_node_icons_v3/`
- 小尺寸预览：`assets/generated/life-road-atlas-v2/map_node_icons_v3/preview_64px.png`
- 前端优先使用 `map_node_icons_v3/icons/`，缺失时回退旧 `icons/`。

v3 已重绘 22 个地图节点 icon：

```text
direction_choice
today_general
keep_lane
stability_anchor
opportunity_window
wait_signal
momentum_boost
career_path
safe_zone
support_lighthouse
relationship_contact
detour_route
risk_barrier
slow_down
wealth_safe_chest
money_commitment
near_exit
lane_change
accelerate_now
mood_rest
good_timing
accelerate_later
```

暂未重绘：

- 五行、节气类：先留在详情解释层，不上主地图。

当前判断：

- v3 icon 比旧版更适合 44-56px 地图节点。
- `relationship_contact` 仍偏场景化，后续可单独再简化成“信封 + 红线”。
- `good_timing` 和 `opportunity_window` 形象接近，后续终局 icon 可再拆开。
