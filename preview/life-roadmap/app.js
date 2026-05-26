const routeData = {
  current: { x: 42, y: 494, label: "你在这里" },
  destination: { x: 326, y: 82, label: "今日目标：状态回升" },
  selectedRoute: "A",
  routes: [
    {
      id: "A",
      name: "稳妥路",
      durationLabel: "23 min",
      tag: "推荐",
      summary: "小步推进",
      color: "#2F7DF6",
      instructionTitle: "导航指令：走 A 稳妥路",
      instructionBody: "保持车道，低速通过风险段，20:00 后小步加速",
      detail: {
        title: "A 稳妥路 · 推荐",
        body: "当前规则选择的主路线：慢一点，但容错更高，适合今天的状态。"
      },
      points: [
        [42, 494],
        [86, 438],
        [134, 382],
        [168, 330],
        [206, 278],
        [238, 226],
        [278, 152],
        [326, 82]
      ],
      segments: [
        {
          from: 0,
          to: 2,
          color: "#F2A93B",
          label: "当前：缓行爬坡",
          labelAt: [104, 402],
          type: "slow",
          detail: { title: "当前：缓行爬坡", body: "推进力还在，但路面不平，适合先把旧任务往前推一点。" }
        },
        {
          from: 2,
          to: 4,
          color: "#E5484D",
          label: "风险段：别硬冲",
          labelAt: [160, 328],
          type: "risk",
          detail: { title: "风险段：别硬冲", body: "稳定性偏低，今天不适合硬开新局或正面冲突。" }
        },
        {
          from: 4,
          to: 5,
          color: "#31343B",
          label: "隧道末段",
          labelAt: [218, 252],
          type: "tunnel",
          detail: { title: "隧道末段", body: "短期信息不够亮，但出口已经接近，先保持节奏。" }
        },
        {
          from: 5,
          to: 7,
          color: "#1FA779",
          label: "机会出口",
          labelAt: [282, 170],
          type: "opportunity",
          detail: { title: "机会出口", body: "支持度回升，适合在晚些时候小步推进旧项目。" }
        }
      ],
      annotations: [
        { x: 96, y: 454, label: "保持车道", icon: "lane", detail: { title: "保持车道", body: "今天先沿着既有路线推进，不急着换方向。" } },
        { x: 170, y: 300, label: "降速通过", icon: "warning", detail: { title: "降速通过", body: "遇到冲突信号时先降速，不做情绪化判断。" } },
        { x: 256, y: 206, label: "20:00 后小步加速", icon: "exit", detail: { title: "20:00 后小步加速", body: "晚些时候适合整理、确认、轻推进。" } }
      ]
    },
    {
      id: "B",
      name: "快速路",
      durationLabel: "18 min",
      tag: "风险高",
      summary: "别硬冲",
      color: "#E5484D",
      instructionTitle: "导航指令：不建议走 B 快速路",
      instructionBody: "这条路耗时更短，但高风险变道多，今天不适合硬冲",
      detail: {
        title: "B 快速路 · 风险高",
        body: "更快，但容错率低。今天如果要冲，需要额外确认信息。"
      },
      points: [
        [42, 494],
        [94, 416],
        [166, 326],
        [224, 212],
        [326, 82]
      ],
      annotations: [
        { x: 144, y: 360, label: "高风险变道", icon: "warning", detail: { title: "高风险变道", body: "变动会带来速度，但今天容易付出额外成本。" } },
        { x: 230, y: 234, label: "速度快，容错低", icon: "speed", detail: { title: "速度快，容错低", body: "适合信息充分的人，不适合临时起意。" } }
      ]
    },
    {
      id: "C",
      name: "绕行路",
      durationLabel: "31 min",
      tag: "低压",
      summary: "适合休整",
      color: "#7EAA91",
      instructionTitle: "导航指令：C 绕行路可作为备选",
      instructionBody: "压力更低，但推进较慢，适合需要恢复状态时选择",
      detail: {
        title: "C 绕行路 · 低压",
        body: "节奏慢一点，但压力更低，适合情绪或体力不足时选择。"
      },
      points: [
        [42, 494],
        [76, 520],
        [158, 520],
        [238, 470],
        [314, 314],
        [326, 82]
      ],
      annotations: [
        { x: 160, y: 540, label: "低压休整", icon: "rest", detail: { title: "低压休整", body: "今天可以把恢复状态本身当成任务。" } },
        { x: 300, y: 338, label: "慢一点更稳", icon: "lane", detail: { title: "慢一点更稳", body: "绕路不是退后，是降低误判成本。" } }
      ]
    }
  ],
  sharedAnnotations: [
    { x: 134, y: 370, label: "是否变道：暂不建议", detail: { title: "是否变道：暂不建议", body: "风险和稳定性不匹配，先不做大方向调整。" } },
    { x: 92, y: 476, label: "现在：缓行爬坡", detail: { title: "现在：缓行爬坡", body: "你还在往上走，只是速度不适合拉满。" } },
    { x: 278, y: 132, label: "下一步：出口后加速", detail: { title: "下一步：出口后加速", body: "通过风险段后，适合把已有计划推进一小步。" } }
  ]
};

const svg = document.getElementById("lifeMap");
const routeCards = document.getElementById("routeCards");
const mapDetail = document.getElementById("mapDetail");
const selectedSummary = document.getElementById("selectedSummary");
const instructionTitle = document.getElementById("instructionTitle");
const instructionBody = document.getElementById("instructionBody");

let selectedRoute = routeData.selectedRoute;
let activeDetail = null;

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function pathFromPoints(points) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

function segmentPath(points, from, to) {
  return pathFromPoints(points.slice(from, to + 1));
}

function drawText(parent, text, x, y, options = {}) {
  const label = createSvgElement("text", {
    x,
    y,
    "text-anchor": options.anchor || "middle",
    "font-size": options.size || 12,
    "font-weight": options.weight || 760,
    fill: options.fill || "#20252B",
    class: "map-label"
  });
  label.textContent = text;
  parent.appendChild(label);
}

function drawPill(parent, text, x, y, options = {}) {
  const group = createSvgElement("g");
  const approxWidth = Math.min(Math.max(text.length * 12 + 18, 76), 164);
  const rect = createSvgElement("rect", {
    x: x - approxWidth / 2,
    y: y - 18,
    width: approxWidth,
    height: 28,
    rx: 7,
    fill: options.fill || "rgba(255,255,255,0.92)",
    stroke: options.stroke || "rgba(26,31,38,0.10)"
  });
  group.appendChild(rect);
  drawText(group, text, x, y, {
    size: options.size || 12,
    fill: options.textColor || "#20252B",
    weight: options.weight || 760
  });
  parent.appendChild(group);
  return group;
}

function setSelectedRoute(routeId, detail = null) {
  selectedRoute = routeId;
  activeDetail = detail || routeData.routes.find((route) => route.id === routeId).detail;
  render();
}

function setActiveDetail(detail) {
  activeDetail = detail;
  renderDetail();
}

function makeInteractive(element, detail, routeId = selectedRoute) {
  element.classList.add("clickable-map-node");
  element.setAttribute("tabindex", "0");
  element.setAttribute("role", "button");
  element.setAttribute("aria-label", detail.title);
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    if (routeId !== selectedRoute) {
      setSelectedRoute(routeId, detail);
    } else {
      setActiveDetail(detail);
    }
  });
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (routeId !== selectedRoute) {
        setSelectedRoute(routeId, detail);
      } else {
        setActiveDetail(detail);
      }
    }
  });
}

function drawHitPath(points, routeId, detail, strokeWidth = 34) {
  const hitPath = createSvgElement("path", {
    d: pathFromPoints(points),
    fill: "none",
    stroke: "transparent",
    "stroke-width": strokeWidth,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "route-hit-area"
  });
  makeInteractive(hitPath, detail, routeId);
  svg.appendChild(hitPath);
}

function drawBaseMap() {
  const background = createSvgElement("rect", { width: 390, height: 572, fill: "#F1F4EF" });
  svg.appendChild(background);

  const blocks = [
    [18, 28, 94, 94],
    [126, 30, 86, 82],
    [236, 30, 102, 96],
    [30, 154, 112, 82],
    [172, 142, 78, 108],
    [278, 162, 78, 78],
    [20, 282, 96, 92],
    [142, 278, 94, 84],
    [262, 292, 98, 108],
    [26, 412, 112, 94],
    [168, 404, 86, 96],
    [280, 442, 78, 74]
  ];

  blocks.forEach(([x, y, width, height], index) => {
    svg.appendChild(
      createSvgElement("rect", {
        x,
        y,
        width,
        height,
        rx: 10,
        fill: index % 3 === 0 ? "#E8EEE8" : "#EDF1EA",
        opacity: 0.76
      })
    );
  });

  const minorRoads = [
    "M 12 132 L 370 132",
    "M 18 260 L 366 238",
    "M 18 398 L 372 380",
    "M 74 18 L 64 558",
    "M 148 18 L 136 558",
    "M 262 18 L 250 558",
    "M 338 18 L 328 558",
    "M 4 516 C 120 448 224 424 386 450",
    "M 6 74 C 102 168 210 164 382 116",
    "M 8 342 C 86 294 158 286 236 312 S 336 338 388 292"
  ];

  minorRoads.forEach((d, index) => {
    svg.appendChild(
      createSvgElement("path", {
        d,
        fill: "none",
        stroke: index < 6 ? "#D9DED8" : "#C9D0C8",
        "stroke-width": index < 6 ? 3 : 5,
        "stroke-linecap": "round",
        opacity: index < 6 ? 0.8 : 0.56
      })
    );
  });
}

function drawRoutes() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);

  routeData.routes
    .filter((route) => route.id !== selectedRoute)
    .forEach((route) => {
      svg.appendChild(
        createSvgElement("path", {
          d: pathFromPoints(route.points),
          fill: "none",
          stroke: route.color,
          "stroke-width": 8,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          opacity: 0.34
        })
      );
      const mid = route.points[Math.floor(route.points.length / 2)];
      drawPill(svg, `${route.id} ${route.name}`, mid[0], mid[1] - 16, {
        fill: "rgba(255,255,255,0.78)",
        textColor: route.color,
        stroke: "rgba(26,31,38,0.08)"
      });
      drawHitPath(route.points, route.id, route.detail, 36);
    });

  svg.appendChild(
    createSvgElement("path", {
      d: pathFromPoints(selected.points),
      fill: "none",
      stroke: "rgba(10, 30, 58, 0.14)",
      "stroke-width": 21,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  );

  svg.appendChild(
    createSvgElement("path", {
      d: pathFromPoints(selected.points),
      fill: "none",
      stroke: "#ffffff",
      "stroke-width": 15,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  );

  if (selected.id === "A") {
    selected.segments.forEach((segment) => {
      svg.appendChild(
        createSvgElement("path", {
          d: segmentPath(selected.points, segment.from, segment.to),
          fill: "none",
          stroke: segment.color,
          "stroke-width": 11,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
      );

      if (segment.type === "tunnel") {
        const tunnel = createSvgElement("path", {
          d: segmentPath(selected.points, segment.from, segment.to),
          fill: "none",
          stroke: "#111418",
          "stroke-width": 17,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          opacity: 0.24
        });
        svg.appendChild(tunnel);
      }

      drawPill(svg, segment.label, segment.labelAt[0], segment.labelAt[1], {
        fill: "rgba(255,255,255,0.90)",
        textColor: segment.color,
        stroke: "rgba(26,31,38,0.10)"
      });
      drawHitPath(selected.points.slice(segment.from, segment.to + 1), selected.id, segment.detail, 34);
    });
  } else {
    svg.appendChild(
      createSvgElement("path", {
        d: pathFromPoints(selected.points),
        fill: "none",
        stroke: selected.color,
        "stroke-width": 11,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      })
    );
    drawHitPath(selected.points, selected.id, selected.detail, 36);
  }

  selected.annotations.forEach((annotation) => {
    drawAnnotation(annotation);
  });

  if (selected.id === "A") {
    routeData.sharedAnnotations.forEach((annotation) => {
      const sharedPill = drawPill(svg, annotation.label, annotation.x, annotation.y, {
        fill: "rgba(255,255,255,0.82)",
        textColor: "#333840",
        size: 11,
        weight: 720
      });
      makeInteractive(sharedPill, annotation.detail, selected.id);
    });
  }
}

function drawAnnotation(annotation) {
  const group = createSvgElement("g");
  const iconBg = createSvgElement("circle", {
    cx: annotation.x,
    cy: annotation.y,
    r: 13,
    fill: "#15191F",
    opacity: 0.94
  });
  group.appendChild(iconBg);

  const iconText = {
    lane: "↗",
    warning: "!",
    exit: "出",
    speed: "快",
    rest: "停"
  }[annotation.icon] || "•";

  const icon = createSvgElement("text", {
    x: annotation.x,
    y: annotation.y + 5,
    "text-anchor": "middle",
    "font-size": 13,
    "font-weight": 800,
    fill: "#ffffff"
  });
  icon.textContent = iconText;
  group.appendChild(icon);
  svg.appendChild(group);
  makeInteractive(group, annotation.detail, selectedRoute);

  const pill = drawPill(svg, annotation.label, annotation.x + 52, annotation.y + 4, {
    fill: "rgba(255,255,255,0.92)",
    textColor: "#20252B",
    size: 11,
    weight: 740
  });
  makeInteractive(pill, annotation.detail, selectedRoute);
}

function drawMarkers() {
  const { current, destination } = routeData;

  const currentGroup = createSvgElement("g");
  currentGroup.appendChild(createSvgElement("circle", { cx: current.x, cy: current.y, r: 22, fill: "#2F7DF6", opacity: 0.14, class: "active-node-ring" }));
  currentGroup.appendChild(createSvgElement("circle", { cx: current.x, cy: current.y, r: 18, fill: "#FFFFFF", opacity: 0.96 }));
  currentGroup.appendChild(createSvgElement("circle", { cx: current.x, cy: current.y, r: 10, fill: "#2F7DF6" }));
  currentGroup.appendChild(createSvgElement("circle", { cx: current.x, cy: current.y, r: 4, fill: "#FFFFFF" }));
  svg.appendChild(currentGroup);
  makeInteractive(currentGroup, { title: "你在这里", body: "当前位置不是地理位置，而是今日状态的起点。" }, selectedRoute);
  const currentPill = drawPill(svg, current.label, current.x + 62, current.y + 2, {
    fill: "rgba(47,125,246,0.11)",
    textColor: "#1664DC",
    stroke: "rgba(47,125,246,0.22)"
  });
  makeInteractive(currentPill, { title: "你在这里", body: "当前位置不是地理位置，而是今日状态的起点。" }, selectedRoute);

  const flag = createSvgElement("g");
  flag.appendChild(createSvgElement("line", { x1: destination.x, y1: destination.y + 20, x2: destination.x, y2: destination.y - 18, stroke: "#1FA779", "stroke-width": 4, "stroke-linecap": "round" }));
  flag.appendChild(createSvgElement("path", { d: `M ${destination.x} ${destination.y - 18} L ${destination.x + 28} ${destination.y - 8} L ${destination.x} ${destination.y + 2} Z`, fill: "#1FA779" }));
  svg.appendChild(flag);
  makeInteractive(flag, { title: "今日目标：状态回升", body: "今天的目标不是大幅改变，而是让状态进入回升段。" }, selectedRoute);
  const destinationPill = drawPill(svg, destination.label, destination.x - 64, destination.y - 18, {
    fill: "rgba(31,167,121,0.11)",
    textColor: "#12775A",
    stroke: "rgba(31,167,121,0.22)"
  });
  makeInteractive(destinationPill, { title: "今日目标：状态回升", body: "今天的目标不是大幅改变，而是让状态进入回升段。" }, selectedRoute);
}

function renderCards() {
  routeCards.innerHTML = "";
  routeData.routes.forEach((route) => {
    const card = document.createElement("button");
    card.className = "route-card";
    card.type = "button";
    card.role = "tab";
    card.setAttribute("aria-selected", String(route.id === selectedRoute));
    card.innerHTML = `
      <strong>${route.id} ${route.name}</strong>
      <time>${route.durationLabel}</time>
      <span>${route.tag} · ${route.summary}</span>
    `;
    card.addEventListener("click", () => {
      setSelectedRoute(route.id, route.detail);
    });
    routeCards.appendChild(card);
  });
}

function renderDetail() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  const detail = activeDetail || selected.detail;
  mapDetail.innerHTML = `<strong>${detail.title}</strong><span>${detail.body}</span>`;
}

function renderInstruction() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  selectedSummary.textContent = `${selected.id} ${selected.name} · ${selected.tag}`;
  instructionTitle.textContent = selected.instructionTitle;
  instructionBody.textContent = selected.instructionBody;
}

function render() {
  svg.innerHTML = "";
  drawBaseMap();
  drawRoutes();
  drawMarkers();
  renderCards();
  renderDetail();
  renderInstruction();
}

render();
