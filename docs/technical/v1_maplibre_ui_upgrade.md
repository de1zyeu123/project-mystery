# v1 MapLibre UI 升级记录

日期：2026-05-25

## 判断

采用 `MapLibre GL JS` 作为 v1 地图渲染底座。

不采用 Mapbox GL JS 作为免费开源底座。

## 依据

- MapLibre GL JS 是开源、社区治理、GPU/WebGL 地图渲染库。
- MapLibre GL JS 支持 GeoJSON source、layer、marker、camera、controls。
- `maplibre-gl-directions` 是 MapLibre 官方生态中的方向插件，支持 OSRM 或 Mapbox Directions API 兼容 routing provider。
- 当前 MVP 不接真实 routing provider；人生路线由内部规则生成 GeoJSON。

## 本次实现

- 新增本地 vendor：
  - `preview/life-roadmap-mvp/vendor/maplibre-gl.js`
  - `preview/life-roadmap-mvp/vendor/maplibre-gl.css`
  - `preview/life-roadmap-mvp/vendor/maplibre-gl-LICENSE.txt`
- 地图由 MapLibre WebGL canvas 渲染。
- 底图使用 `OpenFreeMap Positron` 公开矢量瓦片样式。
- 路线由规则引擎输出的 Route JSON 转成 GeoJSON line features。
- A/B/C 路线可点击。
- 地图 marker 使用 HTML marker，保持中文可读和样式可控。
- 当前使用 OpenFreeMap 公共实例，无 API key；生产版需评估自托管或服务稳定性。

## UI 改动

- 压缩主结论：从“今日路况：缓行上坡”改为“缓行上坡”。
- 压缩解释：从长句改为“小步推进，别猛冲。”
- 地图标注减少，只保留：
  - 当前
  - 目标
  - 关键风险点
  - 下一步
  - B/C 替代路线标记
- 保留底部路线卡，但减少文案。

## 后续可升级

v2 如果要接真实地图：
1. MapLibre GL JS
2. OpenFreeMap / Protomaps PMTiles / 自托管 OSM tiles
3. OSRM / Valhalla / GraphHopper 作为 routing provider
4. `maplibre-gl-directions` 作为真实路线交互参考

当前 v1 的核心仍是：

用户输入 -> 命理特征 -> 规则引擎 -> Route JSON -> MapLibre 渲染
