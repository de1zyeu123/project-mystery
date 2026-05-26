# v1 Mapbox 替代框架选型

日期：2026-05-25

目标：获得接近 Mapbox 的地图实现风格，但尽量使用免费/开源框架，降低 token、计费和服务条款依赖。

## 1. 结论

推荐方案：

```text
MapLibre GL JS
+ @vis.gl/react-maplibre
+ OpenFreeMap / Protomaps / OpenMapTiles
+ Route JSON -> GeoJSON
```

分阶段：

| 阶段 | 推荐方案 | 原因 |
|---|---|---|
| 当前 preview | 自研 SVG 语义地图 | 最快、最可控、不依赖真实地图 |
| v1 Web App 真实地图风格 | MapLibre GL JS + OpenFreeMap | 最像 Mapbox，免费、无 key、上手快 |
| v1.5 可控成本 | MapLibre GL JS + Protomaps PMTiles | 可自托管，适合规模化 |
| v2 大规模生产 | MapLibre GL JS + 自托管 OpenMapTiles/PMTiles | 成本和可控性最好 |
| 商业快速上线 | Mapbox GL JS | 体验强，但要 token、计费、条款评估 |

## 2. 核心区别

### 2.1 框架和底图要分开看

地图系统有两层：

1. 渲染框架：负责在浏览器画地图、图层、线、点、交互。
2. 底图/瓦片服务：提供道路、水系、建筑、地名等地图数据。

Mapbox 同时提供两者：
- Mapbox GL JS。
- Mapbox tiles / styles / APIs。

免费替代要拆开：
- 渲染框架：MapLibre GL JS。
- 底图数据：OpenFreeMap / Protomaps / OpenMapTiles。

## 3. 推荐框架

### 3.1 MapLibre GL JS

定位：
- Mapbox GL JS 的开源替代。
- 使用 WebGL。
- 支持 vector tiles。
- 支持 source/layer/style。
- 支持 GeoJSON 叠加。
- 支持交互事件。

适合我们：
- 路线 A/B/C 可以作为 GeoJSON line layer。
- 红色拥堵段可以作为单独 line layer。
- 隧道可以用 casing + dark overlay。
- 节点标注可以用 symbol layer 或 HTML marker。
- 用户点击路线时可以切换 selected route。

推荐度：最高。

### 3.2 @vis.gl/react-maplibre

定位：
- React wrapper。
- 让 MapLibre 变成 React 组件。
- 更适合我们后续组件化。

适合我们：
- `RouteJson` 进入 React state。
- `Source` / `Layer` 组件化。
- 选中路线 A/B/C 后更新图层样式。
- 与现有 Web App 前端一致。

推荐度：高。

### 3.3 deck.gl

定位：
- 高级 WebGL 可视化层。
- 可叠加在 MapLibre 上。

适合后续：
- 路线流动动效。
- 粒子/光轨。
- 大量用户位置或城市热区。

v1 不需要。

推荐度：中。

### 3.4 Leaflet

定位：
- 轻量开源地图框架。

问题：
- 更适合 raster tiles。
- Mapbox 风格的 vector style/layer 能力弱。
- 做高质量导航样式会费劲。

不推荐作为主方案。

### 3.5 OpenLayers

定位：
- 强 GIS 框架。

问题：
- 能力强，但开发心智偏 GIS。
- 产品团队想要 Mapbox 式视觉和交互时，MapLibre 更直接。

不推荐作为 v1 主方案。

## 4. 底图/瓦片选择

### 4.1 OpenFreeMap

定位：
- 免费公开矢量瓦片服务。
- 无 API key。
- 无注册。
- 可商用。
- 数据来自 OpenStreetMap。

优点：
- 上手最快。
- 适合 preview / beta。
- 与 MapLibre 搭配自然。

风险：
- 当前无 SLA。
- 长期大规模依赖要谨慎。

推荐：
- 用于 v1 prototype 和早期测试。

### 4.2 Protomaps PMTiles

定位：
- 单文件地图瓦片归档。
- 可通过 HTTP Range Requests 访问。
- 可自托管。
- 基于 OpenStreetMap。

优点：
- 成本可控。
- 不需要传统 tile server。
- 适合 Cloudflare R2 / S3 / CDN。
- 适合大规模稳定部署。

风险：
- 需要处理 PMTiles 和样式配置。
- 初期集成比 OpenFreeMap 多一步。

推荐：
- v1.5 / production 候选。

### 4.3 OpenMapTiles

定位：
- 开源矢量瓦片 schema 和工具链。
- 可自托管世界地图。

优点：
- 可控性强。
- 可完全私有化。
- 成熟生态。

风险：
- 运维复杂。
- 对 v1 偏重。

推荐：
- v2 或规模化后考虑。

## 5. 我们的推荐技术栈

### 5.1 快速版本

```text
React
+ @vis.gl/react-maplibre
+ maplibre-gl
+ OpenFreeMap public style
+ Route JSON -> GeoJSON
```

用途：
- 快速实现接近 Mapbox 的真实地图风格。
- 验证用户是否喜欢真实地图 UI。

### 5.2 生产版本

```text
React
+ @vis.gl/react-maplibre
+ maplibre-gl
+ Protomaps PMTiles
+ self-hosted style.json
+ Route JSON -> GeoJSON
```

用途：
- 控制成本。
- 控制地图样式。
- 降低外部服务依赖。

### 5.3 高级动效版本

```text
React
+ MapLibre GL JS
+ deck.gl PathLayer
+ Route JSON -> GeoJSON / deck.gl data
```

用途：
- 路线流动。
- 动态风险段。
- 城市信号热区。

## 6. Route JSON 如何接入 MapLibre

### 6.1 转换成 GeoJSON

Route JSON：

```json
{
  "selectedRoute": "A",
  "routes": [
    {
      "id": "A",
      "name": "稳妥路",
      "segments": [
        {
          "type": "slow",
          "points": [[121.47, 31.23], [121.48, 31.24]]
        }
      ]
    }
  ]
}
```

转换为 GeoJSON：

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "routeId": "A",
        "segmentType": "slow",
        "colorToken": "traffic_amber",
        "label": "当前：缓行爬坡"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [[121.47, 31.23], [121.48, 31.24]]
      }
    }
  ]
}
```

### 6.2 MapLibre 图层设计

| Layer | 类型 | 用途 |
|---|---|---|
| `life-route-shadow` | line | 路线外阴影 |
| `life-route-base` | line | 推荐路线主线 |
| `life-route-risk` | line | 红色风险段 |
| `life-route-tunnel` | line | 隧道段 |
| `life-route-alt` | line | B/C 备选路线 |
| `life-node-symbol` | symbol | 出口、当前位置、目标 |
| `life-label` | symbol | 标注文字 |
| `life-hit-area` | line | 点击热区 |

### 6.3 交互

支持：
- 点击路线 A/B/C。
- 点击风险段展示说明。
- 点击出口展示行动建议。
- 切换关注点后重新生成 route source。
- 生成分享卡时隐藏真实底图，只导出语义路线图。

## 7. 选型建议

当前不要立刻替换 preview。

建议做一个并行 POC：

```text
preview/life-roadmap-maplibre/
```

目标：
- 用 MapLibre 真实渲染一版。
- 使用 OpenFreeMap 作为底图。
- 把 Route JSON 转成 GeoJSON。
- 验证手机端性能、视觉、点击交互。

通过标准：
- 加载时间可接受。
- 不需要 Mapbox token。
- 路线 A/B/C 可点击。
- 地图风格能接近 Mapbox。
- 用户不会误解为真实导航。

如果 POC 体验明显更好，再把 v1 渲染器从 SVG 切到 MapLibre。

否则保留 SVG 语义地图。

## 8. 当前决策

推荐做两条线：

1. `SvgSemanticMapRenderer`：当前主线，保证产品逻辑和视觉可控。
2. `MapLibreRenderer`：并行 POC，验证 Mapbox-like 真实地图体验。

不要让产品逻辑绑定任何地图框架。

统一数据层仍然是：

```text
Route JSON
```

## 9. 参考来源

- MapLibre GL JS：https://maplibre.org/projects/gl-js/
- MapLibre Docs：https://maplibre.org/maplibre-gl-js/docs/
- @vis.gl/react-maplibre：https://visgl.github.io/react-maplibre/docs/get-started
- react-map-gl：https://visgl.github.io/react-map-gl/docs
- OpenFreeMap：https://openfreemap.org/
- Protomaps：https://docs.protomaps.com/
- OpenMapTiles：https://openmaptiles.org/

