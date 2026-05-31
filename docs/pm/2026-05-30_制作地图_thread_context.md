# 制作地图 thread context

日期：2026-05-30

来源：Codex thread `制作地图及图标` (`019e719c-b7e9-7412-a08e-593273d7e2bc`)。

用途：把地图、icon、拓扑、前端和上线相关上下文拉回当前 `Project Mystery` 工作区。

注意：源 thread 里出现过部署密钥。本文不复制任何密钥。代码和文档只应使用环境变量。

## 1. 当前产品方向

- 产品是中文优先的 `人生路况` 地图交互。
- 第一屏不是解释页，是可操作地图。
- 输出不是一次性展示完整路线，而是渐进式披露。
- 每一步只展示 `1-2` 个下一步选择。
- 用户看到直接的路线名，例如 `走捷径`、`走平原`、`继续推进`、`补足条件`。
- 内部节点编号只服务校对和算法映射，不直接给用户展示。

## 2. 固定边界

- 地图拓扑是固定展示骨架。
- 生成逻辑负责节点内容、icon、解读、最终结果。
- LLM 只能改写中文表达，不能改节点编号、点击拓扑、地图坐标或终局数量。
- icon 代表信号类型，不代表固定命运结论。
- 五行、节气类信息放详情层，不作为主地图节点。

## 3. 地图和资产

当前 atlas 根目录：

```text
assets/generated/life-road-atlas-v2/
```

关键文件：

```text
assets/generated/life-road-atlas-v2/00_life_story_base_map_v4.png
assets/generated/life-road-atlas-v2/00_life_story_base_map_v4_ai_raw.png
assets/generated/life-road-atlas-v2/00_life_story_topology_debug_v4.png
assets/generated/life-road-atlas-v2/topology_node_mapping.json
assets/generated/life-road-atlas-v2/route_story_config_v4.json
assets/generated/life-road-atlas-v2/asset_manifest.json
assets/generated/life-road-atlas-v2/map_node_icons_v3/icons/
```

视觉原则：

- 2.5D 等距桌游地图风格。
- 糖果色、深棕描边、圆润黏土/塑料玩具质感。
- 无文字、无人物、无品牌。
- 桥、梯子、台阶是地形语义，不是装饰。
- 节点必须落在陆地、平台、山坡或码头边，不落水。

## 4. 当前 v4 故事拓扑

当前语义文档：

```text
docs/logic/v4_story_route_semantics.md
```

主线：

```text
0 -> 1 / 2
1 -> 3 / 4
3 -> 6 / 7
6 -> 10A
7 -> 11
4 -> 7 / 8
8 -> 11
2 -> 4 / 5
5 -> 8 / 9
9 -> 10B
```

终点：

- `10A`：山地挑战终点。
- `11`：灯塔平稳终点。
- `10B`：崖边捷径终点。

草图里有两个 `10`，系统内部拆成 `10A` 和 `10B`。用户侧不显示这个编号。

## 5. 地形语义

| 路段 | 地形 | 含义 |
|---|---|---|
| `0 -> 1` | 桥 | 走捷径，跨出常规路，进入森林 |
| `0 -> 2` | 平原路 | 走普通道路，先稳住基本盘 |
| `1 -> 4` | 桥 | 把非常规机会接回现实主线 |
| `3 -> 7` | 小桥 | 从森林冒险回到可执行平原 |
| `3 -> 6` | 台阶/山坡 | 持续挑战，练硬本事 |
| `8 -> 11` | 梯子 | 补门槛后上高地 |
| `5 -> 8` | 回头路/平路 | 条件不够时回到坦途 |
| `5 -> 9` | 梯子 | 崖边险路，需要工具和保护 |

## 6. 当前前端入口

主要前端目录：

```text
preview/life-roadmap-mvp/
```

关键文件：

```text
preview/life-roadmap-mvp/app.js
preview/life-roadmap-mvp/styles.css
preview/life-roadmap-mvp/index.html
```

当前 app 使用：

```text
LIFE_BASE_MAP_SRC = ../../assets/generated/life-road-atlas-v2/00_life_story_base_map_v4.png
```

本地子路径预览曾验证为：

```text
http://127.0.0.1:4174/projectmystery/
```

线上目标路径：

```text
https://de1zyeu.tech/projectmystery
```

服务端 API 子路径：

```text
/projectmystery/api/*
```

模型环境变量：

```text
DASHSCOPE_API_KEY
BAILIAN_API_KEY
DASHSCOPE_BASE_URL
```

## 7. 文案标准

主文案标准：

```text
docs/logic/v2_llm_wording_standard.md
```

规则：

- 直接、清晰、短句。
- 讲趋势，不讲绝对命运。
- 命理术语必须落到现实动作。
- 禁止暴露内部词：`MVP`、`本地测试`、`生成逻辑`、`技术 Trace`。
- 禁止承诺式表达：`必然发财`、`一定失败`、`注定`。

## 8. 已知冲突

已处理：

```text
docs/logic/v4_story_route_semantics.md        定义 5 -> 8 / 9
assets/generated/life-road-atlas-v2/route_story_config_v4.json 定义 5 -> 8 / 9
assets/generated/life-road-atlas-v2/topology_node_mapping.json  已补回 5 -> 8 / 9
```

处理结果：

1. 以 `docs/logic/v4_story_route_semantics.md` 和 `route_story_config_v4.json` 为产品语义源。
2. `topology_node_mapping.json` 已补回 `5 -> 8`。
3. 新底图保存为 `assets/generated/life-road-atlas-v2/00_life_story_base_map_v11.svg`。
4. 前端底图入口已切到 `00_life_story_base_map_v11.svg`。

## 9. 下一步建议

1. 把前端点击状态从旧 `L1-*` 结构对齐到 `0-11 / 10A / 10B`。
2. 保持 `12 状态节点 + 1 我在这儿`。
3. 用地图内节点渐进展开替代一次性全量展示。
4. 做手机端截图验证：初始只显示 `1 / 2`，选择后只展开下一层。
