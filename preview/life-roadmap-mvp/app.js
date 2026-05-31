const GAN_ELEMENT = {
  甲: "wood",
  乙: "wood",
  丙: "fire",
  丁: "fire",
  戊: "earth",
  己: "earth",
  庚: "metal",
  辛: "metal",
  壬: "water",
  癸: "water"
};

const ZHI_ELEMENT = {
  子: "water",
  丑: "earth",
  寅: "wood",
  卯: "wood",
  辰: "earth",
  巳: "fire",
  午: "fire",
  未: "earth",
  申: "metal",
  酉: "metal",
  戌: "earth",
  亥: "water"
};

const ELEMENT_LABEL = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水"
};

const GENERATES = {
  wood: "fire",
  fire: "earth",
  earth: "metal",
  metal: "water",
  water: "wood"
};

const CONTROLS = {
  wood: "earth",
  earth: "water",
  water: "fire",
  fire: "metal",
  metal: "wood"
};

const ATLAS_BASE_PATH = "../../assets/generated/life-road-atlas-v2";
const LIFE_BASE_MAP_SRC = `${ATLAS_BASE_PATH}/style_candidates/base_map_style_candidate_01_microfix_v3.png`;
const LEGACY_ICON_BASE_PATH = `${ATLAS_BASE_PATH}/icons`;
const MAP_NODE_ICON_BASE_PATH = `${ATLAS_BASE_PATH}/map_node_icons_v3/icons`;
const AVATAR_BASE_PATH = `${ATLAS_BASE_PATH}/avatars`;
const MAX_MAP_ICONS = 12;
const DEFAULT_ROADMAP_QUESTION = "分析我未来的路";
const API_BASE_PATH = window.location.pathname.startsWith("/projectmystery") ? "/projectmystery/api" : "/api";
const MAP_NODE_ICON_IDS = new Set([
  "direction_choice",
  "today_general",
  "keep_lane",
  "stability_anchor",
  "opportunity_window",
  "wait_signal",
  "momentum_boost",
  "career_path",
  "safe_zone",
  "support_lighthouse",
  "relationship_contact",
  "detour_route",
  "risk_barrier",
  "slow_down",
  "wealth_safe_chest",
  "money_commitment",
  "near_exit",
  "lane_change",
  "accelerate_now",
  "mood_rest",
  "good_timing",
  "accelerate_later"
]);

function getIconAsset(iconId) {
  return MAP_NODE_ICON_IDS.has(iconId)
    ? `${MAP_NODE_ICON_BASE_PATH}/${iconId}.png`
    : `${LEGACY_ICON_BASE_PATH}/${iconId}.png`;
}

const MYSTIC_LANGUAGE_SYSTEM = {
  role: "年轻一点的算命大师",
  tone: "明快、克制、像懂命理的人在指路",
  allowedWords: ["气", "局", "火候", "顺势", "暗流", "开门", "入谷", "过桥", "转坡"],
  rules: [
    "只讲趋势，不讲绝对命运。",
    "用模糊但有方向的判断，不给保证。",
    "可以神秘，但不要恐吓。",
    "短句优先，像路况提示。",
    "命理术语必须落到现实动作。",
    "不用过度口语和黄历原词直接解释用户行动。"
  ]
};

const ROUTE_VISIBLE_LABEL = {
  A: "走捷径",
  B: "过桥走大路",
  C: "慢一点走",
  ROOT: "先补基础"
};

const ROUTE_STATUS_LABEL = {
  recommended: "可能性",
  viewing: "正在看",
  option: "可能性"
};

function scoreTone(score, high = "偏亮", mid = "可用", low = "偏弱") {
  if (score >= 68) return high;
  if (score >= 54) return mid;
  return low;
}

const ICON_BY_INTENT = {
  career_push: "career_path",
  career_change: "direction_choice",
  relationship_contact: "relationship_contact",
  money_commitment: "money_commitment",
  mood_support: "mood_rest",
  general_action: "today_general",
  general_today: "today_general"
};

const ICON_BY_ELEMENT = {
  wood: "wood_growth",
  fire: "fire_energy",
  earth: "earth_base",
  metal: "metal_order",
  water: "water_flow"
};

const LIFE_STAGE_POSITION = {
  探索期: { x: 18, y: 72 },
  建立期: { x: 39, y: 58 },
  承压期: { x: 54, y: 47 },
  整合期: { x: 70, y: 32 },
  守成期: { x: 82, y: 18 }
};

const STAGE_GEO = {
  探索期: {
    name: "溪谷入口",
    description: "刚入图，路牌多，适合试探，不急定终局。",
    forward: "草坡、浅桥和第一处岔路"
  },
  建立期: {
    name: "桥前上坡",
    description: "主路已成形，正从低谷往坡面走，先稳住节奏。",
    forward: "石桥、湖湾和一段上坡路"
  },
  承压期: {
    name: "山腰施工段",
    description: "路窄但不是死路，暗流在旁，适合降速过关。",
    forward: "施工红段、山口和窄桥"
  },
  整合期: {
    name: "灯塔岔口",
    description: "视野开始开阔，几条路会合，适合选主脉。",
    forward: "灯塔、弯路和高地出口"
  },
  守成期: {
    name: "高地出口",
    description: "已到高处，重点不是冲，而是守住好局。",
    forward: "终点门、平缓路和回望台"
  }
};

const ROUTE_MYSTIC = {
  A: {
    title: ROUTE_VISIBLE_LABEL.A,
    direction: "过桥入林",
    icon: "opportunity_window",
    body: "可以快一步，但要先跨出去。适合试新机会，不适合一次押满。"
  },
  B: {
    title: ROUTE_VISIBLE_LABEL.B,
    direction: "过桥走大路",
    icon: "keep_lane",
    body: "慢一点，但更稳。适合先把确定的事做扎实。"
  },
  C: {
    title: ROUTE_VISIBLE_LABEL.C,
    direction: "绕开消耗",
    icon: "detour_route",
    body: "前面有暗流，绕一下不算退。先保气，再等下一盏灯。"
  },
  ROOT: {
    title: ROUTE_VISIBLE_LABEL.ROOT,
    direction: "先补条件",
    icon: "stability_anchor",
    body: "基础没有补齐时，先把资源、证据和关键人稳住，再回到主路。"
  }
};

const AVATAR_OPTIONS = [
  { id: "male_young", gender: "male", ageBand: "young", label: "青年男", image: `${AVATAR_BASE_PATH}/male_young.png` },
  { id: "male_middle", gender: "male", ageBand: "middle", label: "中年男", image: `${AVATAR_BASE_PATH}/male_middle.png` },
  { id: "male_elder", gender: "male", ageBand: "elder", label: "老年男", image: `${AVATAR_BASE_PATH}/male_elder.png` },
  { id: "female_young", gender: "female", ageBand: "young", label: "青年女", image: `${AVATAR_BASE_PATH}/female_young.png` },
  { id: "female_middle", gender: "female", ageBand: "middle", label: "中年女", image: `${AVATAR_BASE_PATH}/female_middle.png` },
  { id: "female_elder", gender: "female", ageBand: "elder", label: "老年女", image: `${AVATAR_BASE_PATH}/female_elder.png` }
];

const VISUAL_NODE_POSITIONS = {
  current: { x: 18, y: 76 },
  routeA: { x: 43, y: 54 },
  routeB: { x: 60, y: 23 },
  routeC: { x: 70, y: 67 },
  risk: { x: 48, y: 37 },
  support: { x: 78, y: 21 },
  opportunity: { x: 84, y: 13 },
  stability: { x: 35, y: 43 },
  relationship: { x: 58, y: 35 },
  wealth: { x: 37, y: 72 },
  speed: { x: 63, y: 52 },
  lane: { x: 76, y: 53 },
  wait: { x: 55, y: 61 },
  exit: { x: 82, y: 15 },
  safe: { x: 54, y: 69 },
  element: { x: 27, y: 32 },
  season: { x: 30, y: 20 },
  conflict: { x: 45, y: 28 },
  timing: { x: 72, y: 20 }
};

const ROAD_ANCHORS = {
  START: { x: 12.2, y: 83.41 },
  "0": { x: 12.2, y: 83.41 },
  "1": { x: 20.97, y: 59.17 },
  "2": { x: 45.85, y: 71.77 },
  "3": { x: 16.59, y: 46.89 },
  "4": { x: 49.2, y: 46.57 },
  "5": { x: 57.1, y: 85.96 },
  "6": { x: 20.81, y: 31.42 },
  "7": { x: 51.67, y: 25.12 },
  "8": { x: 80.06, y: 36.2 },
  "9": { x: 79.11, y: 76.32 },
  "10": { x: 26.24, y: 16.83 },
  "11": { x: 84.05, y: 15.87 },
  "12": { x: 95.45, y: 85.96 },

  FIRST_FORK: { x: 12.2, y: 83.41 },
  STABLE_GATE: { x: 20.97, y: 59.17 },
  TRY_GATE: { x: 45.85, y: 71.77 },
  STABLE_PUSH: { x: 16.59, y: 46.89 },
  CENTER_GATE: { x: 49.2, y: 46.57 },
  TRY_LOW: { x: 57.1, y: 85.96 },
  STABLE_TOP: { x: 20.81, y: 31.42 },
  UPPER_MERGE: { x: 51.67, y: 25.12 },
  RIGHT_LOW: { x: 80.06, y: 36.2 },
  TOP_EXIT: { x: 26.24, y: 16.83 },
  RIGHT_UPPER_EXIT: { x: 84.05, y: 15.87 },
  RIGHT_MID_EXIT: { x: 95.45, y: 85.96 },
  RIGHT_LOW_EXIT: { x: 79.11, y: 76.32 }
};

const ROAD_ANCHOR_LABELS = [];

const LIFE_START_POINT = ROAD_ANCHORS.START;
const LIFE_END_POINT = ROAD_ANCHORS["11"];

const ROAD_MAPPING_PATHS = [];

const LIFE_BRANCH_PATHS = [];

const FOCUSABLE_BRANCH_IDS = ["A", "B"];
const ROUTE_CHOICE_ORDER = ["A", "B"];
const MAP_ROUTE_CHOICE_POSITIONS = {
  A: { x: 40.2, y: 36.4 },
  B: { x: 41.0, y: 62.8 }
};

function nodeAt(anchorId) {
  const point = ROAD_ANCHORS[anchorId];
  return {
    anchorId,
    x: point.x,
    y: point.y
  };
}

const LIFE_JOURNEY_NODES = [
  {
    id: "START",
    index: 1,
    ...nodeAt("START"),
    icon: "direction_choice",
    topic: "当前位置",
    branchId: "all",
    branchRole: "起点",
    title: "当前起点",
    choice: "先看捷径和过桥大路",
    axis: "起局"
  },
  {
    id: "L1-A",
    index: 2,
    ...nodeAt("STABLE_GATE"),
    icon: "opportunity_window",
    topic: "起步路线",
    branchId: "A",
    branchRole: "起步路线",
    title: "走捷径",
    choice: "过桥入林",
    axis: "机会"
  },
  {
    id: "L1-B",
    index: 3,
    ...nodeAt("TRY_GATE"),
    icon: "keep_lane",
    topic: "起步路线",
    branchId: "B",
    branchRole: "起步路线",
    title: "过桥走大路",
    choice: "过桥走大路",
    axis: "基础"
  },
  {
    id: "L2-A1",
    index: 4,
    ...nodeAt("STABLE_PUSH"),
    icon: "momentum_boost",
    topic: "第二节点",
    branchId: "A",
    branchRole: "选择点",
    title: "深入森林",
    choice: "继续探索新机会",
    axis: "冒险"
  },
  {
    id: "L2-A2",
    index: 5,
    ...nodeAt("CENTER_GATE"),
    icon: "stability_anchor",
    topic: "第二节点",
    branchId: "A",
    branchRole: "选择点",
    title: "过桥回主路",
    choice: "接回现实主线",
    axis: "承接"
  },
  {
    id: "L2-B1",
    index: 6,
    ...nodeAt("CENTER_GATE"),
    icon: "support_lighthouse",
    topic: "第二节点",
    branchId: "B",
    branchRole: "选择点",
    title: "走向主路",
    choice: "先把确定的事走顺",
    axis: "主线"
  },
  {
    id: "L2-B2",
    index: 7,
    ...nodeAt("TRY_LOW"),
    icon: "detour_route",
    topic: "第二节点",
    branchId: "B",
    branchRole: "选择点",
    title: "贴崖试路",
    choice: "小步试，不重押",
    axis: "风险"
  },
  {
    id: "L3-A1a",
    index: 8,
    ...nodeAt("STABLE_TOP"),
    icon: "career_path",
    topic: "第三节点",
    branchId: "A",
    branchRole: "分支点",
    title: "爬小山",
    choice: "练硬本事",
    axis: "挑战"
  },
  {
    id: "L3-A1b",
    index: 9,
    ...nodeAt("UPPER_MERGE"),
    icon: "slow_down",
    topic: "第三节点",
    branchId: "A",
    branchRole: "分支点",
    title: "过桥入平原",
    choice: "把灵感变成计划",
    axis: "转稳"
  },
  {
    id: "L3-A2a",
    index: 10,
    ...nodeAt("UPPER_MERGE"),
    icon: "wealth_safe_chest",
    topic: "第三节点",
    branchId: "A",
    branchRole: "分支点",
    title: "沿主路慢走",
    choice: "逐步放大基本盘",
    axis: "主线"
  },
  {
    id: "L3-A2b",
    index: 11,
    ...nodeAt("RIGHT_LOW"),
    icon: "wait_signal",
    topic: "第三节点",
    branchId: "A",
    branchRole: "分支点",
    title: "抄近路上高台",
    choice: "先过门槛，不放梯子",
    axis: "门槛"
  },
  {
    id: "L3-B1a",
    index: 12,
    ...nodeAt("UPPER_MERGE"),
    icon: "support_lighthouse",
    topic: "第三节点",
    branchId: "B",
    branchRole: "分支点",
    title: "沿主路慢走",
    choice: "逐步放大基本盘",
    axis: "主线"
  },
  {
    id: "L3-B1b",
    index: 13,
    ...nodeAt("RIGHT_LOW"),
    icon: "lane_change",
    topic: "第三节点",
    branchId: "B",
    branchRole: "分支点",
    title: "抄近路上高台",
    choice: "先过门槛，不放梯子",
    axis: "门槛"
  },
  {
    id: "L3-B2a",
    index: 14,
    ...nodeAt("RIGHT_LOW"),
    icon: "risk_barrier",
    topic: "第三节点",
    branchId: "B",
    branchRole: "分支点",
    title: "回到坦途",
    choice: "从崖边回到稳定路径",
    axis: "转稳"
  },
  {
    id: "L3-B2b",
    index: 15,
    ...nodeAt("RIGHT_LOW_EXIT"),
    icon: "mood_rest",
    topic: "第三节点",
    branchId: "B",
    branchRole: "分支点",
    title: "爬梯过坎",
    choice: "靠工具过风险坎",
    axis: "风险"
  },
  {
    id: "O1",
    index: 16,
    ...nodeAt("TOP_EXIT"),
    icon: "good_timing",
    topic: "终局",
    branchId: "all",
    branchRole: "结果出口",
    title: "山地挑战结果",
    choice: "挑战到顶",
    axis: "终局"
  },
  {
    id: "O2",
    index: 17,
    ...nodeAt("RIGHT_UPPER_EXIT"),
    icon: "opportunity_window",
    topic: "终局",
    branchId: "all",
    branchRole: "结果出口",
    title: "灯塔稳定结果",
    choice: "稳定成局",
    axis: "终局"
  },
  {
    id: "O3",
    index: 18,
    ...nodeAt("RIGHT_MID_EXIT"),
    icon: "direction_choice",
    topic: "终局",
    branchId: "all",
    branchRole: "结果出口",
    title: "崖边捷径结果",
    choice: "过坎后收束",
    axis: "终局"
  }
];

const DEFAULT_VISIBLE_NODE_IDS = [
  "START",
  "L1-A",
  "L1-B",
  "L2-A1",
  "L2-A2",
  "L2-B1",
  "L2-B2",
  "L3-A1a",
  "L3-A1b",
  "L3-A2a",
  "L3-A2b",
  "L3-B1a",
  "L3-B1b",
  "L3-B2a",
  "L3-B2b",
  "O1",
  "O2",
  "O3"
];

const TOPOLOGY_CHILDREN = {
  START: ["L1-A", "L1-B"],
  "L1-A": ["L2-A1", "L2-A2"],
  "L1-B": ["L2-B1", "L2-B2"],
  "L2-A1": ["L3-A1a", "L3-A1b"],
  "L2-A2": ["L3-A2a", "L3-A2b"],
  "L2-B1": ["L3-B1a", "L3-B1b"],
  "L2-B2": ["L3-B2a", "L3-B2b"],
  "L3-A1a": ["O1"],
  "L3-A1b": ["O2"],
  "L3-A2a": ["O2"],
  "L3-A2b": ["O2"],
  "L3-B1a": ["O2"],
  "L3-B1b": ["O2"],
  "L3-B2a": ["O2"],
  "L3-B2b": ["O3"]
};

const TOPOLOGY_PARENT_BY_ID = Object.fromEntries(
  Object.entries(TOPOLOGY_CHILDREN).flatMap(([parentId, childIds]) => childIds.map((childId) => [childId, parentId]))
);

const NODE_STAGE_CONFIG = {
  START: { name: "当下定位", startOffset: 0, endOffset: 0, detail: "先确认你现在站在哪，不急着把后面的路一次走完。" },
  "L1-A": { name: "眼前试路期", startOffset: 1, endOffset: 5, detail: "未来五年看非常规机会是否值得小步试，重点是验证，不是一次押满。" },
  "L1-B": { name: "眼前打底期", startOffset: 1, endOffset: 5, detail: "未来五年先把确定的事走顺，降低后面分岔的成本。" },
  "L2-A1": { name: "十年探索期", startOffset: 6, endOffset: 10, detail: "进入新路后，重点是把机会做成可复用经验。" },
  "L2-A2": { name: "十年承接期", startOffset: 6, endOffset: 10, detail: "把机会接回现实规则，找平台、合作和执行条件。" },
  "L2-B1": { name: "十年主路期", startOffset: 6, endOffset: 10, detail: "继续走稳定路线，先让手里的事形成闭环。" },
  "L2-B2": { name: "十年试探期", startOffset: 6, endOffset: 10, detail: "从稳路转向窄路，只适合低成本试探。" },
  "L3-A1a": { name: "十五年挑战期", startOffset: 11, endOffset: 15, detail: "这段路靠硬本事和抗压能力，不靠短期运气。" },
  "L3-A1b": { name: "十五年转稳期", startOffset: 11, endOffset: 15, detail: "把冒险中的灵感收成计划，重新变成可执行路径。" },
  "L3-A2a": { name: "十五年放大期", startOffset: 11, endOffset: 15, detail: "稳定主线已经能承重，可以慢慢放大基本盘。" },
  "L3-A2b": { name: "十五年门槛期", startOffset: 11, endOffset: 15, detail: "看似能提速，但要先确认资质、证据和背书。" },
  "L3-B1a": { name: "十五年积累期", startOffset: 11, endOffset: 15, detail: "常规路线进入积累段，结果来自持续推进。" },
  "L3-B1b": { name: "十五年提速期", startOffset: 11, endOffset: 15, detail: "可以尝试提速，但不能跳过必要门槛。" },
  "L3-B2a": { name: "十五年止损期", startOffset: 11, endOffset: 15, detail: "发现风险偏高时，回到坦途不是失败，是把选择权拿回来。" },
  "L3-B2b": { name: "十五年过坎期", startOffset: 11, endOffset: 15, detail: "继续走窄路时，必须靠工具、资源和保护过坎。" },
  O1: { name: "二十年挑战总结", startOffset: 16, endOffset: 20, detail: "未来二十年的挑战路线收束，二十年后会进入新的阶段，不能把更远的路一次说死。" },
  O2: { name: "二十年稳定总结", startOffset: 16, endOffset: 20, detail: "未来二十年的稳定路线成局，二十年后会进入新的你，届时需要重新判断。" },
  O3: { name: "二十年风险总结", startOffset: 16, endOffset: 20, detail: "未来二十年的风险路线收束，二十年后会进入新的分岔，关键是有没有守住边界。" }
};

const LIFE_CHOICE_COPY = {
  "L1-A": {
    title: "抄小路走捷径",
    summary: "未来五年先试一条非常规机会。关键不是赌大，而是小步验证。",
    why: "这个年龄段容易想换一种走法。命盘里行动火候亮时，捷径会出现，但它只适合先试，不适合一次押满。",
    judge: "你真正要判断的是：这条机会能不能用低成本拿到反馈。",
    possible: "走顺了会打开新入口；走不顺也要保留退路。"
  },
  "L1-B": {
    title: "过桥走大路",
    summary: "未来五年先把确定的事走稳。慢一点，但后面的代价更可控。",
    why: "当前阶段最怕把基础问题带到后面。大路代表先稳资源、节奏和承诺。",
    judge: "你真正要判断的是：现在是否更需要稳定主线，而不是马上换方向。",
    possible: "走顺了会形成基本盘；代价是速度没有捷径快。"
  },
  "L2-A1": {
    title: "继续冒险",
    summary: "你已经选了捷径。下一步可以继续往新机会里走，但每一步都要能回收。",
    why: "未来第 6-10 年会开始验证早期选择。继续冒险不是冲动，而是把新入口做成经验。",
    judge: "你要判断的是：这件事是否值得继续投入时间、关系和资源。",
    possible: "走顺了会更早见到机会；走偏了会消耗精力。"
  },
  "L2-A2": {
    title: "回到稳定主线",
    summary: "把捷径里的机会接回现实规则。先找平台、合作和执行条件。",
    why: "当机会已经出现，下一步不是继续漂，而是让它落地。",
    judge: "你要判断的是：这个机会能不能接回长期主线。",
    possible: "走顺了会降低风险；代价是速度会放慢。"
  },
  "L2-B1": {
    title: "继续稳定路线",
    summary: "你选择了大路。下一步可以继续把主线走顺，让确定性变成积累。",
    why: "未来第 6-10 年开始看耐心和闭环能力。稳定路线不是保守，而是先形成可复用成果。",
    judge: "你要判断的是：主线是否还能承重，是否值得继续投入。",
    possible: "走顺了会变成稳定基本盘；代价是新鲜机会会少一点。"
  },
  "L2-B2": {
    title: "低成本试窄路",
    summary: "在稳定路上试一个小变化。可以试，但不能重押。",
    why: "大路走久了也会出现窄口。窄路代表提速欲望，但风险也更集中。",
    judge: "你要判断的是：这次试探有没有边界、退出口和保护。",
    possible: "走顺了会更快打开局面；走偏了要及时撤回。"
  },
  "L3-A1a": {
    title: "挑战更高目标",
    summary: "这一步会累，但能练硬本事。适合补技能、拿资格、扛责任。",
    why: "未来第 11-15 年会考验承压能力。高目标不是为了好看，而是为了确认你能不能长期承重。",
    judge: "你要判断的是：自己是否准备好承担更高标准。",
    possible: "扛住了会进入高位收获；扛不住会变成消耗。"
  },
  "L3-A1b": {
    title: "把冒险变成计划",
    summary: "从冒险回到可执行。适合把灵感、项目和关系整理成计划。",
    why: "走过新路后，真正的分水岭是能不能把灵感收成结构。",
    judge: "你要判断的是：哪些想法值得留下，哪些只是情绪带来的冲动。",
    possible: "走顺了会转稳；代价是需要放弃一部分刺激感。"
  },
  "L3-A2a": {
    title: "慢慢积累",
    summary: "稳住主线，逐步放大基本盘。它不刺激，但更能承重。",
    why: "未来第 11-15 年适合看长期复利。慢慢积累不是拖延，是把可持续性放在前面。",
    judge: "你要判断的是：主线是否已经值得持续加码。",
    possible: "走顺了会稳定成局；代价是短期爆发感不强。"
  },
  "L3-A2b": {
    title: "抄近路提速",
    summary: "可以快一点，但要先过门槛。条件不清楚时不要硬上。",
    why: "当主线已经成形，人会想提速。提速可以，但必须先看资质、背书和退出口。",
    judge: "你要判断的是：这次提速是机会，还是只是焦虑。",
    possible: "走顺了会进入高台；走偏了会把稳定盘打乱。"
  },
  "L3-B1a": {
    title: "慢慢积累",
    summary: "继续把确定的事做深。适合长期积累，不急着换赛道。",
    why: "稳定路线走到中段，考验的是持续推进，而不是频繁改变。",
    judge: "你要判断的是：现在是不是该把已有资源做厚。",
    possible: "走顺了会稳定成局；代价是要忍住短期诱惑。"
  },
  "L3-B1b": {
    title: "抄近路提速",
    summary: "在主线上试一次提速。可以试，但不能跳过必要门槛。",
    why: "长期稳定后会出现提速窗口，但窗口和冲动很像。",
    judge: "你要判断的是：这次提速有没有真实条件支撑。",
    possible: "走顺了会放大基本盘；走偏了会增加风险。"
  },
  "L3-B2a": {
    title: "及时回到稳路",
    summary: "发现窄路风险偏高时，先回到坦途。回头不是失败，是保住选择权。",
    why: "未来第 11-15 年最重要的是止损能力。不是每条窄路都值得硬走。",
    judge: "你要判断的是：继续走是否已经超过可承受边界。",
    possible: "回稳后还能继续积累；代价是放弃一部分速度。"
  },
  "L3-B2b": {
    title: "借工具过风险",
    summary: "继续走窄路时，要靠工具、资源和保护过坎。",
    why: "窄路不是不能走，但不能只靠意志。它需要方法、外援和清晰边界。",
    judge: "你要判断的是：你有没有足够工具过这个坎。",
    possible: "过了会收束成局；过不去就会变成长期消耗。"
  },
  O1: {
    title: "挑战型结果",
    summary: "未来二十年会收束到高挑战路径。结果明确，但压力也大。",
    why: "前面连续选择了更有冲击的路径，最后会看承压能力。",
    judge: "这里不是新选择，而是回看你是否扛住了压力。",
    possible: "扛住是高位收获，扛不住就是消耗。"
  },
  O2: {
    title: "稳定型结果",
    summary: "未来二十年更可能形成稳定基本盘。它不刺激，但结果清楚。",
    why: "前面多次把机会接回主线，最后会看积累质量。",
    judge: "这里不是新选择，而是回看你是否把选择变成结构。",
    possible: "结构成了就是稳定成局，没成就是慢慢消耗。"
  },
  O3: {
    title: "风险收束结果",
    summary: "未来二十年会经过一段窄路。能不能变平，取决于边界守得住不住。",
    why: "前面选择了更窄的路，最后会看保护、资源和止损。",
    judge: "这里不是新选择，而是回看你有没有把风险收住。",
    possible: "守住边界会转平，守不住会继续消耗。"
  }
};

const HEADLINE_COPY = {
  smooth: ["顺势开门", "火候初成", "气势可用", "前路见光", "宜小步进"],
  slow_climb: ["火候未满", "先稳主脉", "蓄势待发", "路在成形", "先养后进"],
  slow_climb_with_risk: ["暗流未散", "宜先避锋", "先稳后行", "路有阻力", "慢行过关"]
};

const MIN_VISIBLE_RESULT_VARIANTS = 125;

const CITY_COORDINATES = {
  上海: [121.4737, 31.2304],
  北京: [116.4074, 39.9042],
  杭州: [120.1551, 30.2741],
  深圳: [114.0579, 22.5431],
  广州: [113.2644, 23.1291],
  成都: [104.0665, 30.5728],
  重庆: [106.5516, 29.563],
  武汉: [114.3055, 30.5928],
  西安: [108.9398, 34.3416],
  南京: [118.7969, 32.0603],
  苏州: [120.5853, 31.2989],
  天津: [117.2009, 39.0842],
  郑州: [113.6254, 34.7466],
  长沙: [112.9388, 28.2282],
  厦门: [118.0894, 24.4798],
  青岛: [120.3826, 36.0671],
  沈阳: [123.4315, 41.8057],
  哈尔滨: [126.6425, 45.756],
  昆明: [102.8329, 24.8801],
  拉萨: [91.1175, 29.6475]
};

const DEMO_CITY_POOL = Object.keys(CITY_COORDINATES);

const QUESTION_ROUTE_COPY = {
  general: {
    A: { summary: "稳住今天", cardLine: "整理、收尾、复盘", action: "先做确定性高的事项，把手上事收清楚" },
    B: { summary: "试一个窗口", cardLine: "只推一个重点", action: "只推一个最有把握的机会，不铺太多线" },
    C: { summary: "先留余地", cardLine: "补能、观察、少承诺", action: "把消耗降下来，给自己留一点空档" }
  },
  career: {
    A: { summary: "先交成果", cardLine: "先交付可控部分", action: "先推进确定性最高的一小步" },
    B: { summary: "试新入口", cardLine: "主动争取一次机会", action: "趁窗口还亮，主动递出一次明确请求" },
    C: { summary: "先铺条件", cardLine: "补材料、等反馈", action: "先补关键条件，再决定是否加速" }
  },
  relationship: {
    A: { summary: "轻声靠近", cardLine: "先释放善意", action: "用轻一点的方式联系，不逼对方表态" },
    B: { summary: "说清重点", cardLine: "短句、明确、留余地", action: "只说一个重点，避免连续追问" },
    C: { summary: "先留空间", cardLine: "不催、不试探", action: "先把情绪放稳，稍后再沟通" }
  },
  wealth: {
    A: { summary: "守住边界", cardLine: "小额、可撤、先验证", action: "只做小额可逆动作，先验证信息" },
    B: { summary: "小额试水", cardLine: "有证据再加速", action: "机会明确才加速，不用情绪做决定" },
    C: { summary: "先看清楚", cardLine: "先避风险、少承诺", action: "今天先看风险，不急着做不可逆承诺" }
  },
  mood: {
    A: { summary: "回到节奏", cardLine: "做一件能完成的小事", action: "先完成一个很小的任务，让状态回稳" },
    B: { summary: "轻推一格", cardLine: "只做一段短任务", action: "只做短程推进，不把今天排满" },
    C: { summary: "先回安全区", cardLine: "休整、断联、少输入", action: "先减少刺激，把能量留给自己" }
  },
  decision: {
    A: { summary: "留在主线", cardLine: "保留现路线", action: "先保留主路线，只做小幅调整" },
    B: { summary: "小步转向", cardLine: "试一个短窗口", action: "只试一个低成本窗口，不一次性转向" },
    C: { summary: "延后定局", cardLine: "等信号更清楚", action: "先绕开不确定区，等信息更完整" }
  }
};

const ROUTE_COPY_VARIANTS = {
  general: {
    A: [
      { summary: "稳住今天", cardLine: "先收手边事", action: "先收一件手边事，再看新方向" },
      { summary: "先易后难", cardLine: "从确定处开始", action: "从最容易完成的事开始" },
      { summary: "少开新线", cardLine: "先做可交付", action: "今天少开新承诺，多做可交付" }
    ],
    B: [
      { summary: "试一个窗口", cardLine: "只推一个重点", action: "抓最亮的窗口，做一个轻动作" },
      { summary: "单点推进", cardLine: "做完就收", action: "只推一个重点，完成后先收住" },
      { summary: "机会初亮", cardLine: "动作要轻", action: "机会出现就动，但保持可回收" }
    ],
    C: [
      { summary: "先降消耗", cardLine: "避开噪音", action: "绕开消耗点，把状态留住" },
      { summary: "等信号明", cardLine: "少输入", action: "先降噪，再决定下一步" },
      { summary: "留一点空", cardLine: "留点余地", action: "今天给自己留一个缓冲位" }
    ]
  },
  career: {
    A: [
      { summary: "先交小段", cardLine: "交一段成果", action: "先交可控部分，让事情有回音" },
      { summary: "补齐闭环", cardLine: "先补闭环", action: "把已有任务闭环，再谈加速" },
      { summary: "资料补齐", cardLine: "减少卡点", action: "先补材料，减少后面被卡住" }
    ],
    B: [
      { summary: "主动开口", cardLine: "只争一次", action: "只争取一个明确机会" },
      { summary: "短线试路", cardLine: "短动作推进", action: "用短会、短稿、短动作推进" },
      { summary: "表达诉求", cardLine: "点到为止", action: "表达诉求，但给局面留余地" }
    ],
    C: [
      { summary: "补路牌", cardLine: "等反馈", action: "先补关键条件，等对方回信号" },
      { summary: "绕开卡点", cardLine: "避开硬碰", action: "绕开最卡的人和流程" },
      { summary: "先铺路", cardLine: "打底关系", action: "先铺沟通条件，再谈推进" },
      { summary: "先看局势", cardLine: "观察组织", action: "先看局势，不急着表态" },
      { summary: "减少战线", cardLine: "保住主线", action: "今天减少战线，保住主线" }
    ]
  },
  relationship: {
    A: [
      { summary: "递台阶", cardLine: "先给善意", action: "先递台阶，不逼答案" },
      { summary: "轻联系", cardLine: "短句就好", action: "发一句轻松的话，不追问" },
      { summary: "缓沟通", cardLine: "先顺情绪", action: "先让气氛松一点，再说正事" },
      { summary: "温和表达", cardLine: "少下结论", action: "多描述感受，少做判断" },
      { summary: "开小窗", cardLine: "看看温度", action: "轻轻开个话口，看回应再走" }
    ],
    B: [
      { summary: "说重点", cardLine: "三句讲完", action: "只讲一个重点，不翻旧账" },
      { summary: "直球路", cardLine: "清楚但软", action: "说清需求，语气放软" },
      { summary: "破僵局", cardLine: "不绕太久", action: "如果要说，就直接说重点" },
      { summary: "明牌路", cardLine: "不给压力", action: "表达立场，但不给对方压迫感" },
      { summary: "短句沟通", cardLine: "不连续追问", action: "短句沟通，避免连续施压" }
    ],
    C: [
      { summary: "留白路", cardLine: "不催不试", action: "先留空间，别用试探换答案" },
      { summary: "降温路", cardLine: "稍后再说", action: "先把情绪放稳，稍后再沟通" },
      { summary: "退半步", cardLine: "少解读", action: "少脑补，先看真实回应" },
      { summary: "护边界", cardLine: "不追太紧", action: "把注意力收回来，不追太紧" },
      { summary: "不翻旧账", cardLine: "先保气氛", action: "今天不翻旧账，先保气氛" }
    ]
  },
  wealth: {
    A: [
      { summary: "稳投路", cardLine: "小额可撤", action: "只做小额可逆动作" },
      { summary: "守仓路", cardLine: "先看风险", action: "先查风险项，不急着下重注" },
      { summary: "试水路", cardLine: "先验信息", action: "先验证信息，再决定投入" },
      { summary: "保本金", cardLine: "不赌情绪", action: "今天只做有退出口的动作" },
      { summary: "慢下注", cardLine: "少承诺", action: "少做不可逆承诺" }
    ],
    B: [
      { summary: "证据再动", cardLine: "证据再追", action: "证据明确再加速，不靠感觉" },
      { summary: "小窗试水", cardLine: "不一次押满", action: "只抓小窗口，不一次打满" },
      { summary: "快进路", cardLine: "设好刹车", action: "若要推进，先设退出条件" },
      { summary: "机会线", cardLine: "有把握再动", action: "只动自己看得懂的部分" },
      { summary: "短打路", cardLine: "见好就收", action: "短线动作要有止损和收口" }
    ],
    C: [
      { summary: "先观望", cardLine: "先避风险", action: "今天先避风险，不急着证明自己" },
      { summary: "绕风险", cardLine: "少冲动", action: "绕开高噪音选择" },
      { summary: "等明灯", cardLine: "信息未齐", action: "等信息更齐，再做判断" },
      { summary: "低仓路", cardLine: "留现金感", action: "给自己留回旋空间" },
      { summary: "停一停", cardLine: "不追涨跌", action: "今天不被涨跌牵着走" }
    ]
  },
  mood: {
    A: [
      { summary: "慢节奏", cardLine: "做一小事", action: "先完成一件很小的事" },
      { summary: "回稳路", cardLine: "先收心", action: "先把节奏放慢一点" },
      { summary: "轻任务", cardLine: "少排一点", action: "只安排能完成的任务" },
      { summary: "稳情绪", cardLine: "少做判断", action: "状态没稳前，少做大决定" },
      { summary: "小火候", cardLine: "温着来", action: "用小火慢慢把状态热起来" }
    ],
    B: [
      { summary: "短程推进", cardLine: "一小段就好", action: "只做一小段，不拉长战线" },
      { summary: "点火路", cardLine: "先动一下", action: "先动五分钟，看看状态" },
      { summary: "轻加速", cardLine: "不满格", action: "小幅加速，给自己留余力" },
      { summary: "开一格", cardLine: "只做重点", action: "只做一个重点任务" },
      { summary: "起步路", cardLine: "不催自己", action: "先起步，不要求满分" }
    ],
    C: [
      { summary: "降噪路", cardLine: "少输入", action: "减少刺激，把能量留给自己" },
      { summary: "绕开累", cardLine: "先补能", action: "避开消耗型场景" },
      { summary: "安静线", cardLine: "断开噪音", action: "先断开噪音源" },
      { summary: "保护路", cardLine: "先保护状态", action: "今天先保护状态" },
      { summary: "休整路", cardLine: "慢慢回电", action: "留一点空档，让状态回电" }
    ]
  },
  decision: {
    A: [
      { summary: "先不大改", cardLine: "保主路线", action: "保留主路线，只做小调整" },
      { summary: "稳车道", cardLine: "先看信号", action: "先看清信号，不急转向" },
      { summary: "守正路", cardLine: "先不急表态", action: "今天先守住基本盘" },
      { summary: "慢决策", cardLine: "多留证据", action: "先补证据，再做判断" },
      { summary: "小调整", cardLine: "低成本试", action: "只做低成本试探" }
    ],
    B: [
      { summary: "试变道", cardLine: "低成本试", action: "只试一个低成本窗口" },
      { summary: "追一段", cardLine: "试跑一小段", action: "先试跑，不直接换主路" },
      { summary: "试机会", cardLine: "先设退路", action: "若要推进，先把退路设好" },
      { summary: "短变线", cardLine: "不连换道", action: "只变一次线，观察反馈" },
      { summary: "开窗口", cardLine: "不押全局", action: "只开一个窗口，不押全局" }
    ],
    C: [
      { summary: "绕行观察", cardLine: "等信号清", action: "绕开不确定区，等信号更清楚" },
      { summary: "延迟判断", cardLine: "明天再定", action: "今天先不定死" },
      { summary: "避开雾区", cardLine: "先不硬选", action: "信息不够时，先不硬选" },
      { summary: "备用路", cardLine: "留回旋", action: "保留备选方案" },
      { summary: "慢看路", cardLine: "再问一句", action: "先多问一句，再决定方向" }
    ]
  }
};

const FAST_RISK_COPY_VARIANTS = [
  { summary: "欲速不达", fit: "看似直线，但阻力会放大。", cardLine: "直线阻力高", action: "先补关键条件，再提速", nowTitle: "先补条件", nowBody: "再看窗口", cost: "阻力", costBody: "容易反复" },
  { summary: "前方阻滞", fit: "快路不一定快，容错偏低。", cardLine: "快路阻力高", action: "先降速观察，再决定是否继续", nowTitle: "先降速", nowBody: "等信号清", cost: "阻滞", costBody: "容错低" },
  { summary: "信号未明", fit: "窗口未稳，提前推进会反复。", cardLine: "信号未明", action: "先把证据补齐，再往前压一格", nowTitle: "先等信号", nowBody: "等信号亮", cost: "反复", costBody: "容易反复" },
  { summary: "快线有雾", fit: "方向看着直，细节还不清。", cardLine: "雾里先慢", action: "先确认关键人和关键条件", nowTitle: "先看清", nowBody: "少转向", cost: "视野窄", costBody: "误判成本高" },
  { summary: "直线不稳", fit: "绕一点，反而更容易到。", cardLine: "绕点更稳", action: "先走可控路段，不强推直线", nowTitle: "先走稳路", nowBody: "走可控段", cost: "强推", costBody: "后续负担重" }
];

const RISK_LINE_VARIANTS = {
  high: ["不宜临时转向。", "等信号清。", "先降速。", "不宜强推。", "先看路面。"],
  medium: ["不宜太快。", "少转向。", "先看清。", "不额外加码。", "稳住节奏。"],
  low: ["按计划推进。", "小步加速。", "顺势而行。", "轻推一格。", "抓住顺势信号。"]
};

const OPPORTUNITY_LINE_VARIANTS = {
  high: ["可借外力", "有人帮路", "助力可用", "可顺势推进", "有支援"],
  low: ["先补信息", "先看路牌", "先补基础", "先问清楚", "先别满格推进"]
};

const ALMANAC_TERM_COPY = {
  嫁娶: "关系确认",
  冠笄: "整理形象",
  纳采: "确认合作",
  订盟: "约定承诺",
  会亲友: "沟通见面",
  祭祀: "整理心愿",
  祈福: "争取支持",
  求嗣: "启动计划",
  开光: "明确方向",
  出行: "外出沟通",
  移徙: "调整位置",
  入宅: "处理居住事务",
  安床: "调整作息",
  开市: "开启项目",
  交易: "确认交易",
  纳财: "整理账目",
  立券: "确认协议",
  动土: "大项改动",
  破土: "强行动作",
  修造: "结构调整",
  上梁: "关键承诺",
  盖屋: "大额修造",
  造桥: "复杂合作",
  安葬: "沉重事务",
  诉讼: "正面冲突",
  争执: "情绪冲突"
};

const UI_COPY_REPLACEMENTS = [
  [/只冲\s*25\s*分钟/g, "只做一段短任务"],
  [/只冲25分钟/g, "只做一段短任务"],
  [/二十五分/g, "短程推进"],
  [/一把梭/g, "一次押满"],
  [/一把押满/g, "一次押满"],
  [/梭哈/g, "一次押满"],
  [/先避坑/g, "先避开不确定项"],
  [/开新坑/g, "开新承诺"],
  [/新坑/g, "新承诺"],
  [/别硬冲/g, "不宜强推"],
  [/硬冲/g, "强推"],
  [/别硬闯/g, "不宜强闯"],
  [/硬闯/g, "强闯"],
  [/别抢灯/g, "不抢信号"],
  [/只抢一灯/g, "只抓一处窗口"],
  [/抢绿灯/g, "抓信号"],
  [/抢窗口/g, "抓窗口"],
  [/抢机会/g, "争取机会"],
  [/压车/g, "阻滞"],
  [/容易堵/g, "容易受阻"],
  [/会堵/g, "会受阻"],
  [/直线不香/g, "直线不稳"],
  [/别飘/g, "不失控"],
  [/别加戏/g, "不额外加码"],
  [/赌全局/g, "押全局"],
  [/不赌情绪/g, "不用情绪决策"],
  [/少内耗/g, "降消耗"],
  [/低压/g, "低耗"],
  [/晚一点/g, "稍后"],
  [/满速/g, "满格推进"],
  [/绿灯/g, "顺势信号"],
  [/轻踩油门/g, "小步推进"],
  [/回电/g, "回气"],
  [/连续轰炸/g, "连续施压"]
];

function polishCopy(value) {
  let text = String(value ?? "");
  UI_COPY_REPLACEMENTS.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return text.replace(/\s+/g, " ").trim();
}

function polishStoryCopy(value) {
  let text = String(value ?? "");
  UI_COPY_REPLACEMENTS.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeAlmanacItem(item) {
  return polishCopy(ALMANAC_TERM_COPY[item] || item);
}

function normalizeAlmanacList(items, fallback, limit = 2) {
  const normalized = (Array.isArray(items) ? items : [])
    .map(normalizeAlmanacItem)
    .filter(Boolean)
    .slice(0, limit);
  return normalized.join("、") || fallback;
}

function polishRouteOption(route) {
  return Object.fromEntries(Object.entries(route).map(([key, value]) => [
    key,
    typeof value === "string" ? polishCopy(value) : value
  ]));
}

const POSSIBILITY_INTENT_COUNT = 6;
const POSSIBILITY_ROUTE_STATE_COUNT = 3 * 3 * 3 * 4 * 2 * 2 * 5 * DEMO_CITY_POOL.length * POSSIBILITY_INTENT_COUNT;

const MAJOR_LIFE_EVENTS = [
  { id: "reform_opening", title: "改革开放", year: 1978, regions: ["全国"], minAge: 8, maxAge: 35, weight: 3, lens: "市场化和机会意识" },
  { id: "southern_tour", title: "南方谈话", year: 1992, regions: ["全国", "广东", "深圳", "上海"], minAge: 12, maxAge: 45, weight: 2, lens: "变化窗口和行动机会" },
  { id: "housing_reform", title: "住房制度改革", year: 1998, regions: ["全国", "上海", "北京", "广州", "深圳"], minAge: 18, maxAge: 50, weight: 2, lens: "安全感和资产观" },
  { id: "wto", title: "加入 WTO", year: 2001, regions: ["全国", "上海", "广东", "浙江", "江苏"], minAge: 12, maxAge: 45, weight: 2, lens: "外部机会和职业选择" },
  { id: "sars", title: "非典", year: 2003, regions: ["全国", "北京", "广东"], minAge: 8, maxAge: 45, weight: 2, lens: "公共风险和不确定性" },
  { id: "wenchuan", title: "汶川地震", year: 2008, regions: ["全国", "四川", "成都", "重庆"], minAge: 8, maxAge: 50, weight: 3, lens: "韧性和风险感知" },
  { id: "beijing_olympics", title: "北京奥运", year: 2008, regions: ["全国", "北京"], minAge: 6, maxAge: 35, weight: 1, lens: "集体记忆和目标感" },
  { id: "shanghai_expo", title: "上海世博", year: 2010, regions: ["上海", "江苏", "浙江"], minAge: 6, maxAge: 35, weight: 1, lens: "城市开放和流动性" },
  { id: "mobile_payment", title: "移动支付普及", year: 2015, regions: ["全国", "浙江", "杭州", "广东", "深圳"], minAge: 12, maxAge: 55, weight: 1, lens: "效率感和数字生活" },
  { id: "covid", title: "新冠疫情", year: 2020, regions: ["全国", "湖北", "武汉", "上海", "北京"], minAge: 6, maxAge: 70, weight: 3, lens: "边界感和风险控制" }
];

const form = document.getElementById("lifeForm");
const inputScreen = document.getElementById("inputScreen");
const resultScreen = document.getElementById("resultScreen");
const tracePanel = document.getElementById("tracePanel");
const traceOutput = document.getElementById("traceOutput");
const closeTrace = document.getElementById("closeTrace");
const traceButton = document.getElementById("traceButton");
const backButton = document.getElementById("backButton");
const avatarLabel = document.getElementById("avatarLabel");
const avatarPreview = document.getElementById("avatarPreview");
const birthDateInput = document.getElementById("birthDate");
const genderInput = document.getElementById("gender");
const mapContainer = document.getElementById("lifeMap");
const mapLoading = document.getElementById("mapLoading");
const routeCards = document.getElementById("routeCards");
const routeSheet = document.querySelector(".route-sheet");
const detailPeekButton = document.getElementById("detailPeekButton");
const mapDetail = document.getElementById("mapDetail");
const sheetLabel = document.getElementById("sheetLabel");
const choiceLockHint = document.getElementById("choiceLockHint");
const terminalReportCta = document.getElementById("terminalReportCta");
const openReportButton = document.getElementById("openReportButton");
const downloadReportButton = document.getElementById("downloadReportButton");
const futureReportPanel = document.getElementById("futureReportPanel");
const futureReportStatus = document.getElementById("futureReportStatus");
const futureReportTitle = document.getElementById("futureReportTitle");
const futureReportBody = document.getElementById("futureReportBody");
const closeReportButton = document.getElementById("closeReportButton");
const copyReportButton = document.getElementById("copyReportButton");
const previewReportButton = document.getElementById("previewReportButton");
const downloadReportModalButton = document.getElementById("downloadReportModalButton");
const selectedSummary = document.getElementById("selectedSummary");
const instructionTitle = document.getElementById("instructionTitle");
const instructionBody = document.getElementById("instructionBody");
const confidenceBadge = document.getElementById("confidenceBadge");
const scoreStrip = document.getElementById("scoreStrip");
const resultOverline = document.getElementById("resultOverline");
const resultHeadline = document.getElementById("resultHeadline");
const resultSubline = document.getElementById("resultSubline");
const verdictPill = document.getElementById("verdictPill");
const verdictAction = document.getElementById("verdictAction");
const verdictRisk = document.getElementById("verdictRisk");
const decisionBoard = document.getElementById("decisionBoard");
const shareToast = document.getElementById("shareToast");

let currentResult = null;
let routeData = null;
let selectedRoute = "A";
let activeDetail = null;
let activeVisualNodeId = null;
let activeBranchId = null;
let topologyDepth = 1;
let detailExpanded = false;
let expandedChoiceCardId = null;
let futureReport = null;
let futureReportNodeId = null;
let futureReportLoading = false;
let autoOpenedReportNodeId = null;
let runtimeContext = buildFallbackRuntimeContext();

birthDateInput.setAttribute("max", toYmd(new Date()));
const runtimeContextReady = bootstrapRuntimeContext();
applyUrlParams(runtimeContextReady);
updateAvatarHint();
birthDateInput.addEventListener("change", updateAvatarHint);
genderInput.addEventListener("change", updateAvatarHint);

function applyUrlParams(contextReady) {
  const params = new URLSearchParams(window.location.search);
  const bindings = {
    birthDate: "birthDate",
    birthTime: "birthTime",
    birthplace: "birthplace",
    gender: "gender"
  };
  Object.entries(bindings).forEach(([key, id]) => {
    if (!params.has(key)) return;
    const element = document.getElementById(id);
    if (element) element.value = params.get(key);
  });
  if (params.get("auto") === "1") {
    contextReady.finally(() => window.setTimeout(() => form.requestSubmit(), 0));
  }
}

function renderAvatarToken(avatar, extraClass = "") {
  return `
    <img class="avatar-image ${extraClass}" src="${avatar.image}" alt="" aria-hidden="true" />
  `;
}

function updateAvatarHint() {
  try {
    const [birthYear] = parseDateParts(birthDateInput.value);
    const age = new Date().getFullYear() - birthYear;
    const gender = genderInput.value === "male" ? "male" : "female";
    const avatar = getAvatarByGenderAge(gender, getAvatarAgeBand(age));
    avatarPreview.src = avatar.image;
    avatarLabel.textContent = "你在地图中的形象";
  } catch (error) {
    avatarPreview.src = `${AVATAR_BASE_PATH}/female_young.png`;
    avatarLabel.textContent = "你在地图中的形象";
  }
}

function matchAvatarFromFeatures(input, features) {
  const ageBand = getAvatarAgeBand(features.lifeContext.age);
  const gender = input.gender === "male" ? "male" : "female";
  const avatar = getAvatarByGenderAge(gender, ageBand);
  return {
    ...avatar,
    matchReason: `${getAvatarGenderLabel(gender)} · ${getAvatarAgeLabel(ageBand)}`
  };
}

function getAvatarByGenderAge(gender, ageBand) {
  return AVATAR_OPTIONS.find((avatar) => avatar.gender === gender && avatar.ageBand === ageBand) || AVATAR_OPTIONS[3];
}

function getAvatarAgeBand(age) {
  if (age < 36) return "young";
  if (age < 60) return "middle";
  return "elder";
}

function getAvatarAgeLabel(ageBand) {
  return {
    young: "青段",
    middle: "中段",
    elder: "长段"
  }[ageBand] || "青段";
}

function getAvatarGenderLabel(gender) {
  return gender === "male" ? "男" : "女";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const input = readInput();
    currentResult = generateLifeRoadmap(input);
    routeData = buildRouteData(currentResult);
    selectedRoute = routeData.selectedRoute;
    activeVisualNodeId = null;
    activeBranchId = selectedRoute;
    topologyDepth = 1;
    detailExpanded = false;
    expandedChoiceCardId = null;
    futureReport = null;
    futureReportNodeId = null;
    futureReportLoading = false;
    autoOpenedReportNodeId = null;
    futureReportPanel?.classList.add("hidden");
    activeDetail = buildMapSummaryDetail(currentResult);
    inputScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    render();
    await applyModelCopyIfAvailable();
  } catch (error) {
    console.error(error);
    showToast(error.message || "暂时无法生成，请检查输入");
  }
});

backButton.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  inputScreen.classList.remove("hidden");
  futureReportPanel?.classList.add("hidden");
});

traceButton.addEventListener("click", () => {
  traceOutput.innerHTML = renderReadableEvidence(currentResult);
  tracePanel.classList.remove("hidden");
});

closeTrace.addEventListener("click", () => {
  tracePanel.classList.add("hidden");
});

detailPeekButton?.addEventListener("click", () => {
  detailExpanded = !detailExpanded;
  renderDetail();
  renderInstruction();
});

openReportButton?.addEventListener("click", () => {
  openFutureReportPanel();
  requestFutureReport({ autoOpen: false });
});

downloadReportButton?.addEventListener("click", () => {
  requestFutureReport({ autoOpen: false }).then(downloadFutureReport);
});

closeReportButton?.addEventListener("click", () => {
  futureReportPanel?.classList.add("hidden");
});

copyReportButton?.addEventListener("click", async () => {
  const text = futureReport?.text || futureReportBody?.textContent || "";
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showToast("报告已复制");
  } catch {
    showToast("复制失败，请手动选择文本");
  }
});

previewReportButton?.addEventListener("click", () => {
  openFutureReportPanel();
});

downloadReportModalButton?.addEventListener("click", () => {
  downloadFutureReport();
});

function readInput() {
  const birthDate = birthDateInput.value;
  validateBirthDate(birthDate);
  const birthTime = document.getElementById("birthTime").value;
  const birthplace = document.getElementById("birthplace").value.trim() || "未知";
  const gender = genderInput.value === "male" ? "male" : "female";
  const contextCity = runtimeContext.city || inferDemoCity(runtimeContext.ipHash || runtimeContext.timezone);
  return {
    birthDate,
    birthTime,
    birthTimeKnown: Boolean(birthTime),
    birthplace,
    gender,
    contextCity,
    contextSource: runtimeContext.source,
    runtimeContext,
    question: DEFAULT_ROADMAP_QUESTION,
    autoQuestion: true
  };
}

function validateBirthDate(value) {
  const [year, month, day] = parseDateParts(value);
  const date = new Date(`${value}T00:00:00`);
  const today = new Date(`${toYmd(new Date())}T00:00:00`);
  if (year < 1900 || date > today || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new Error("请填写 1900 年后、今天以前的公历生日。");
  }
}

function parseDateParts(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
    throw new Error("请先填写出生日期。");
  }
  const parts = value.split("-").map(Number);
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) throw new Error("出生日期格式不正确。");
  return parts;
}

function buildFallbackRuntimeContext() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai";
  const language = navigator.language || "zh-CN";
  const ipHash = stableHash(`${timezone}|${language}|local`);
  return {
    source: "browser_fallback",
    city: inferDemoCity(ipHash),
    ipHash,
    timezone,
    country: "unknown"
  };
}

async function bootstrapRuntimeContext() {
  try {
    const response = await fetch(`${API_BASE_PATH}/context`, { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const context = await response.json();
    if (context?.city) runtimeContext = { ...runtimeContext, ...context };
  } catch (error) {
    runtimeContext = buildFallbackRuntimeContext();
  }
}

function generateLifeRoadmap(input) {
  const intent = classifyIntent(input.question);
  const features = computeFeatures(input);
  const avatar = matchAvatarFromFeatures(input, features);
  input.gender = avatar.gender;
  input.avatarId = avatar.id;
  input.avatar = avatar;
  if (avatarPreview) avatarPreview.src = avatar.image;
  if (avatarLabel) avatarLabel.textContent = "你在地图中的形象";
  const scores = computeScores(features, intent, input);
  const states = computeRouteStates(scores, intent);
  let routes = computeRouteOptions(scores, states, intent, input);
  states.selectedRoute = chooseRouteByFit(routes, scores, intent);
    states.templateId = states.selectedRoute === "A" ? "fast_risky" : "steady_climb";
  routes = computeRouteOptions(scores, states, intent, input);
  const readable = buildReadableResult(input, intent, features, scores, states, routes);
  const trace = buildTrace(input, intent, features, scores, states, routes);
  return {
    input,
    intent,
    features,
    scores,
    states,
    routes,
    readable,
    trace
  };
}

async function applyModelCopyIfAvailable() {
  if (!currentResult) return;
  try {
    const response = await fetch(`${API_BASE_PATH}/roadmap-copy`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildModelCopyPayload(currentResult))
    });
    if (!response.ok) {
      currentResult.copySource = "local_template";
      return;
    }
    const copy = await response.json();
    if (!copy?.routes) return;
    if (copy.source === "server_fallback_no_key") {
      currentResult.copySource = "local_variant_template";
      currentResult.trace.copyLayer = { source: currentResult.copySource, model: "none", modelEndpoint: `${API_BASE_PATH}/roadmap-copy`, languageSystem: MYSTIC_LANGUAGE_SYSTEM };
      return;
    }
    const hadSummaryDetail = activeDetail?.kind === "summary";
    const activeNodeBeforeCopy = activeVisualNodeId;
    mergeModelCopy(copy);
    const focusBranchBeforeCopy = getFocusedBranchId();
    const activeBranchBeforeCopy = activeBranchId;
    const detailExpandedBeforeCopy = detailExpanded;
    routeData = buildRouteData(currentResult);
    activeVisualNodeId = activeNodeBeforeCopy;
    activeBranchId = activeBranchBeforeCopy || focusBranchBeforeCopy;
    detailExpanded = detailExpandedBeforeCopy;
    activeDetail = activeNodeBeforeCopy
      ? buildDetailForJourneyNodeId(activeNodeBeforeCopy, focusBranchBeforeCopy) || activeDetail
      : hadSummaryDetail
        ? buildMapSummaryDetail(currentResult)
        : buildBranchDetail(currentResult, focusBranchBeforeCopy);
    render();
    maybeAutoOpenTerminalReport();
  } catch (error) {
    currentResult.copySource = "local_template";
  }
}

function buildModelCopyPayload(result) {
  return {
    question: result.input.question,
    intent: result.intent,
    scores: result.scores,
    states: result.states,
    selectedRoute: result.states.selectedRoute,
    routes: result.routes.map(({ id, name, tag, summary, cardLine, action, fit }) => ({ id, name, tag, summary, cardLine, action, fit })),
    constraints: {
      headlineMax: 8,
      sublineMax: 12,
      routeSummaryMax: 7,
      routeCardLineMax: 10,
      actionMax: 18,
      allowedRouteIds: ["A", "B"],
      contentStandard: ["处境", "宜", "忌", "前路判断", "详细分析"],
      noMedicalLegalInvestmentGuarantee: true,
      languageSystem: MYSTIC_LANGUAGE_SYSTEM
    }
  };
}

function maybeAutoOpenTerminalReport() {
  if (!isTerminalState() || !activeVisualNodeId || autoOpenedReportNodeId === activeVisualNodeId) return;
  autoOpenedReportNodeId = activeVisualNodeId;
  openFutureReportPanel();
  requestFutureReport({ autoOpen: true });
}

function openFutureReportPanel() {
  futureReportPanel?.classList.remove("hidden");
  renderFutureReportPanel();
}

async function requestFutureReport({ autoOpen = false } = {}) {
  if (!isTerminalState() || !currentResult || !activeVisualNodeId) return futureReport;
  if (futureReport && futureReportNodeId === activeVisualNodeId) {
    renderFutureReportPanel();
    return futureReport;
  }
  if (futureReportLoading) return futureReport;
  futureReportLoading = true;
  futureReportNodeId = activeVisualNodeId;
  renderFutureReportPanel();
  const payload = buildFutureReportPayload();
  try {
    const response = await fetch(`${API_BASE_PATH}/life-report`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`report request failed: ${response.status}`);
    const data = await response.json();
    futureReport = {
      source: data.source || "unknown",
      model: data.model || "unknown",
      title: data.title || "你的未来报告",
      text: data.report || buildLocalFutureReport(payload)
    };
  } catch {
    futureReport = {
      source: "browser_local_fallback",
      model: "none",
      title: "你的未来报告",
      text: buildLocalFutureReport(payload)
    };
  } finally {
    futureReportLoading = false;
    if (autoOpen) futureReportPanel?.classList.remove("hidden");
    renderFutureReportPanel();
  }
  return futureReport;
}

function buildFutureReportPayload() {
  const pathNodes = getSelectedJourneyPath(activeVisualNodeId);
  const currentAge = currentResult.features.lifeContext.age;
  const journey = pathNodes.map((node) => {
    const advice = buildJourneyNodeAdvice(node, currentResult, node.branchId === "all" ? getFocusedBranchId() : node.branchId);
    const lifeCopy = getLifeChoiceCopy(node.id);
    const stage = getJourneyStage(node, currentAge);
    return {
      id: node.id,
      title: lifeCopy?.title || advice.title || node.title,
      mapTitle: node.title,
      choice: advice.choice || node.choice,
      body: lifeCopy?.summary || advice.body,
      stageLabel: stage.label,
      stageDetail: stage.detail
    };
  });
  return {
    profile: {
      gender: currentResult.input.gender,
      birthDate: currentResult.input.birthDate,
      birthTimeKnown: currentResult.input.birthTimeKnown,
      birthplace: currentResult.input.birthplace,
      currentAge
    },
    intent: currentResult.intent,
    scores: currentResult.scores,
    birth: currentResult.features.birth,
    today: currentResult.features.today,
    lifeContext: currentResult.features.lifeContext,
    selectedRoute: currentResult.states.selectedRoute,
    terminal: activeDetail || buildDetailForJourneyNodeId(activeVisualNodeId, getFocusedBranchId()),
    journey,
    constraints: {
      horizonYears: 20,
      targetChars: "1000-2000 Chinese characters",
      noDeterministicFate: true,
      noMedicalLegalInvestmentGuarantee: true,
      reportUse: "shareable preview and downloadable text"
    }
  };
}

function buildLocalFutureReport(payload) {
  const journey = payload.journey || [];
  const terminal = payload.terminal || {};
  const firstChoice = journey[1] || {};
  const middleChoice = journey[2] || {};
  const turnChoice = journey[3] || {};
  const finalChoice = journey[journey.length - 1] || terminal;
  const scores = payload.scores || {};
  const birth = payload.birth || {};
  const today = payload.today || {};
  const context = payload.lifeContext || {};
  const routeLine = journey.slice(1).map((node) => node.title).join(" -> ");
  const stageLines = journey.slice(1).map((node) => `- ${node.stageLabel}：${node.title}。${node.stageDetail}`).join("\n");
  return polishStoryCopy(`你的未来 20 年报告

这份报告只看未来 20 年，不把更远的人生一次说死。原因很简单：20 年后，人的位置、关系、资源、身体节奏和外部环境都会换一轮，那时会出现新的你，也会出现新的分岔。所以这里给你的不是终身判词，而是一条基于当前八字信息、今日天时、人生阶段和你一路选择形成的路径回顾。

你的基础盘显示，日柱为 ${birth.pillars?.day || "未知"}，日主属${ELEMENT_LABEL[birth.dayMasterElement] || "未知"}。今天的天时是 ${today.pillars?.day || "未知"}日，宜忌会影响行动节奏，但不会单独决定人生结果。当前你处在${context.lifeStage || "当前阶段"}，系统用这张拓扑图呈现未来二十年的决策树，不是为了给一个固定答案，而是为了看每一步选择会把你带到什么可能性。

你这次走出的路径是：${routeLine || "当前路线已收束"}。第一段，${firstChoice.stageLabel || "未来第 1-5 年"}，你选择了「${firstChoice.title || "起步路线"}」。这代表你未来五年的主问题不是终局，而是先确认哪条路值得投入。这个阶段最重要的是可验证：少做口头上的大判断，多做能拿到回音的小动作。

第二段，${middleChoice.stageLabel || "未来第 6-10 年"}，路线进入「${middleChoice.title || "承接阶段"}」。这十年附近，你会开始看到早期选择的代价和回报。如果前面走得快，这里要把机会接回规则；如果前面走得稳，这里要防止稳定变成拖延。适合把资源、合作、能力和现金流重新排一遍。

第三段，${turnChoice.stageLabel || "未来第 11-15 年"}，你会遇到「${turnChoice.title || "中段节点"}」。这是路线的承压段，也是人生路径最容易分出质量的地方。行动火候${scoreTone(scores.momentum)}，基础稳度${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，外部助力${scoreTone(scores.support)}，阻力信号${scoreTone(scores.risk, "偏重", "可控", "不重")}。这说明你不能只问快不快，要问这条路能不能长期承重。

最后，${finalChoice.stageLabel || "未来第 16-20 年"}，路线收束到「${finalChoice.title || terminal.title || "未来总结"}」。它不是命运终点，而是未来二十年这条走法更可能形成的生活状态。${terminal.body || finalChoice.body || "结果取决于你是否守住边界，并把前面的选择变成可持续的结构。"} 二十年以后会进入新的阶段，那时你已经不是今天的你，新的判断要重新生成。

阶段回顾：
${stageLines}

给你的建议是：第一，五年内不要把试探当成定局，先让选择产生证据。第二，十年内要把机会和主线接起来，不让人生变成一堆散点。第三，十五年内要看承压能力，能不能长期走，比一时速度更重要。第四，二十年节点只做总结，不做永久结论。真正值得带走的是这条原则：选择不可回退，但每一步都可以走得更清楚。`);
}

function renderFutureReportPanel() {
  if (!futureReportPanel) return;
  const title = futureReport?.title || "你的未来报告";
  const status = futureReportLoading ? "生成中" : futureReport ? "可预览 / 可下载" : "等待终点";
  futureReportStatus.textContent = status;
  futureReportTitle.textContent = title;
  futureReportBody.textContent = futureReportLoading
    ? "正在生成未来 20 年报告。报告会结合当前八字信息、今日天时、你一路选择的节点和最终结果。"
    : futureReport?.text || "到达终点后会自动生成未来 20 年报告。";
  [copyReportButton, previewReportButton, downloadReportModalButton, downloadReportButton].forEach((button) => {
    if (button) button.disabled = futureReportLoading || !futureReport;
  });
}

function downloadFutureReport() {
  if (!futureReport?.text) return;
  const blob = new Blob([futureReport.text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `future-report-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function mergeModelCopy(copy) {
  currentResult.copySource = copy.source || "model";
  currentResult.copyModel = copy.model || "unknown";
  currentResult.trace.copyLayer = { source: currentResult.copySource, model: currentResult.copyModel, modelEndpoint: `${API_BASE_PATH}/roadmap-copy`, languageSystem: MYSTIC_LANGUAGE_SYSTEM };
  currentResult.readable.headline = clampText(polishCopy(copy.headline), 8) || currentResult.readable.headline;
  currentResult.readable.subhead = clampText(polishCopy(copy.subline), 12) || currentResult.readable.subhead;
  currentResult.routes = currentResult.routes.map((route) => {
    const next = copy.routes.find((item) => item.id === route.id);
    if (!next) return route;
    return {
      ...route,
      summary: clampText(polishCopy(next.summary), 7) || route.summary,
      cardLine: clampText(polishCopy(next.cardLine), 10) || route.cardLine,
      action: clampText(polishCopy(next.action), 18) || route.action
    };
  });
}

function chooseRouteByFit(routes, scores, intent) {
  const firstChoices = routes.filter((route) => FOCUSABLE_BRANCH_IDS.includes(route.id));
  const best = firstChoices.reduce((winner, route) => {
    if (!winner) return route;
    return route.recommendScore > winner.recommendScore ? route : winner;
  }, null);
  return best?.id || "B";
}

function getCopyKey(intent, question) {
  const text = String(question || "").toLowerCase();
  if (intent.id === "career_change" || /换|变道|选择|改变|离职|转向/.test(text)) return "decision";
  if (intent.domain === "career") return "career";
  if (intent.domain === "relationship") return "relationship";
  if (intent.domain === "wealth") return "wealth";
  if (intent.domain === "mood") return "mood";
  return "general";
}

function classifyIntent(question) {
  const text = question.toLowerCase();
  if (/ta|联系|感情|关系|对象|朋友|复合|沟通/.test(text)) {
    return { id: "relationship_contact", label: "关系沟通", domain: "relationship", riskSensitivity: "medium" };
  }
  if (/钱|财|投资|消费|谈钱|工资|交易|买|卖/.test(text)) {
    return { id: "money_commitment", label: "财富承诺", domain: "wealth", riskSensitivity: "high" };
  }
  if (/换|变道|离职|转向|改变|选择/.test(text)) {
    return { id: "career_change", label: "方向选择", domain: "career", riskSensitivity: "high" };
  }
  if (/焦虑|舒服|休息|情绪|状态|难受|内耗/.test(text)) {
    return { id: "mood_support", label: "情绪支持", domain: "mood", riskSensitivity: "low" };
  }
  if (/工作|推进|事业|项目|面试|汇报|合作/.test(text)) {
    return { id: "career_push", label: "事业推进", domain: "career", riskSensitivity: "medium" };
  }
  if (/干什么|做什么|安排|适合|行动|计划/.test(text)) {
    return { id: "general_action", label: "今日安排", domain: "general", riskSensitivity: "medium" };
  }
  return { id: "general_today", label: "今日综合", domain: "general", riskSensitivity: "medium" };
}

function computeFeatures(input) {
  const [birthYear, birthMonth, birthDay] = parseDateParts(input.birthDate);
  const [birthHour, birthMinute] = (input.birthTime || "12:00").split(":").map(Number);
  const now = new Date();
  let birthSolar;
  let birthLunar;
  let todaySolar;
  let todayLunar;
  try {
    birthSolar = Solar.fromYmdHms(birthYear, birthMonth, birthDay, birthHour, birthMinute, 0);
    birthLunar = birthSolar.getLunar();
    todaySolar = Solar.fromYmdHms(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), 0);
    todayLunar = todaySolar.getLunar();
  } catch (error) {
    throw new Error("当前历法引擎暂不支持这个生日，请使用 1900 年后的公历生日。");
  }

  const birthPillars = {
    year: birthLunar.getYearInGanZhiExact(),
    month: birthLunar.getMonthInGanZhiExact(),
    day: birthLunar.getDayInGanZhi(),
    hour: input.birthTimeKnown ? birthLunar.getTimeInGanZhi() : "未知"
  };
  const todayPillars = {
    year: todayLunar.getYearInGanZhiExact(),
    month: todayLunar.getMonthInGanZhiExact(),
    day: todayLunar.getDayInGanZhi(),
    hour: todayLunar.getTimeInGanZhi()
  };
  const wuxingVector = countWuxing(Object.values(birthPillars).filter((value) => value !== "未知").join(""));
  const dayMasterElement = GAN_ELEMENT[birthPillars.day[0]] || "earth";
  const todayElement = GAN_ELEMENT[todayPillars.day[0]] || "earth";
  const prevJieQi = todayLunar.getPrevJieQi(true);
  const nextJieQi = todayLunar.getNextJieQi(true);
  const yi = safeList(todayLunar.getDayYi());
  const ji = safeList(todayLunar.getDayJi());
  const lifeContext = buildLifeContext({
    birthYear,
    birthplace: input.birthplace,
    contextCity: input.contextCity,
    todayYear: now.getFullYear()
  });

  return {
    engine: "lunar-javascript@1.7.7",
    confidence: input.birthTimeKnown ? "standard" : "basic",
    birth: {
      pillars: birthPillars,
      dayMaster: birthPillars.day[0],
      dayMasterElement,
      zodiac: birthLunar.getYearShengXiao(),
      wuxingVector
    },
    today: {
      isoDate: toYmd(now),
      pillars: todayPillars,
      todayElement,
      solarTerm: todayLunar.getJieQi() || `${prevJieQi.getName()}后`,
      prevJieQi: `${prevJieQi.getName()} ${prevJieQi.getSolar().toYmdHms()}`,
      nextJieQi: `${nextJieQi.getName()} ${nextJieQi.getSolar().toYmdHms()}`,
      yi,
      ji,
      chong: todayLunar.getDayChong(),
      sha: todayLunar.getDaySha(),
      weekday: now.getDay()
    },
    relation: elementRelation(dayMasterElement, todayElement),
    lifeContext
  };
}

function computeScores(features, intent, input) {
  const balance = wuxingBalance(features.birth.wuxingVector);
  const relation = features.relation;
  const yiText = features.today.yi.join("");
  const jiText = features.today.ji.join("");
  const contextOffset = seededOffset(`${input.birthDate}|${input.birthTime}|${input.birthplace}|${input.contextCity}|${input.question}|${features.today.isoDate}`, 15);
  const personalityOffset = seededOffset(`${features.birth.pillars.day}|${features.birth.pillars.hour}|${features.birth.zodiac}`, 10);

  let momentum = 50 + contextOffset + Math.max(0, personalityOffset);
  let stability = 48 + balance - Math.min(0, personalityOffset);
  let support = 48 + Math.round(contextOffset * 0.5);
  let relationship = 50;
  let wealthSafety = 52;
  let risk = 40 - Math.min(balance, 10) + Math.max(0, -personalityOffset);
  const contextWeight = features.lifeContext.eventWeight;
  const dayMaster = features.birth.dayMasterElement;

  if (dayMaster === "wood") {
    momentum += 4;
    support += 2;
  }
  if (dayMaster === "fire") {
    momentum += 8;
    risk += 4;
  }
  if (dayMaster === "earth") {
    stability += 8;
    momentum -= 2;
  }
  if (dayMaster === "metal") {
    stability += 3;
    risk += 4;
  }
  if (dayMaster === "water") {
    support += 6;
    stability += 2;
  }

  if (relation === "today_generates_me") support += 12;
  if (relation === "i_generate_today") momentum += 10;
  if (relation === "same") {
    momentum += 5;
    stability += 5;
  }
  if (relation === "today_controls_me") {
    risk += 16;
    stability -= 8;
  }
  if (relation === "i_control_today") {
    momentum += 6;
    risk += 4;
  }

  if (/开市|交易|纳财|出行|会友|求财/.test(yiText)) momentum += 8;
  if (/整理|沟通|解除|祭祀|沐浴/.test(yiText)) stability += 5;
  if (/安葬|争执|破土|嫁娶|开光/.test(jiText)) risk += 8;
  if (features.today.chong) risk += 4;
  if (features.today.weekday === 0 || features.today.weekday === 6) {
    stability += 4;
    momentum -= 2;
  }

  if (contextWeight >= 5) {
    stability += 3;
    risk += 2;
  } else if (contextWeight >= 3) {
    stability += 2;
    support += 1;
  }

  if (features.lifeContext.hasMobilityEvent) support += 2;
  if (features.lifeContext.hasRiskEvent) risk += 2;

  if (intent.domain === "career") {
    momentum += 8;
    support += 5;
  }
  if (intent.domain === "relationship") {
    relationship += 10;
    risk += 6;
  }
  if (intent.domain === "wealth") {
    wealthSafety -= intent.riskSensitivity === "high" ? 8 : 3;
    risk += 8;
  }
  if (intent.domain === "mood") {
    stability += 8;
    momentum -= 8;
    risk -= 6;
  }

  if (features.confidence === "basic") {
    risk += 4;
    support -= 3;
  }

  return {
    momentum: clampScore(momentum),
    stability: clampScore(stability),
    support: clampScore(support),
    relationship: clampScore(relationship - Math.max(0, risk - 60) * 0.3),
    wealthSafety: clampScore(wealthSafety - Math.max(0, risk - 58) * 0.35),
    risk: clampScore(risk)
  };
}

function computeRouteStates(scores, intent) {
  let selectedRoute = "B";
  if (scores.momentum >= 68 && scores.support >= 52 && scores.risk < 62 && scores.stability >= 48) selectedRoute = "A";
  if (scores.risk >= 72 || scores.stability < 46) selectedRoute = "B";

  const laneChange =
    intent.id === "career_change" && scores.support >= 70 && scores.risk < 55
      ? "consider_later"
      : scores.risk >= 60 || scores.stability < 50
        ? "not_recommended"
        : "small_adjustment";

  const speedAdvice =
    scores.momentum >= 70 && scores.risk < 50
      ? "accelerate_now"
      : scores.momentum >= 60 && scores.risk < 70
        ? "accelerate_later"
        : scores.risk >= 70
          ? "slow_down"
          : "keep_speed";

  return {
    templateId: selectedRoute === "A" ? "fast_risky" : "steady_climb",
    selectedRoute,
    roadState: scores.momentum >= 70 && scores.risk < 55 ? "smooth" : scores.risk >= 65 ? "slow_climb_with_risk" : "slow_climb",
    riskState: scores.risk >= 60 ? "short_congestion" : "clear",
    tunnelState: scores.stability < 58 && scores.support >= 54 ? "near_exit" : "none",
    laneChange,
    speedAdvice
  };
}

function getLaneLabel(states) {
  return {
    not_recommended: "暂不变道",
    small_adjustment: "可小幅调整",
    consider_later: "观察后变道"
  }[states.laneChange];
}

function getSpeedLabel(states) {
  return {
    accelerate_now: "现在小步加速",
    accelerate_later: "稍后小步加速",
    slow_down: "低速通过",
    keep_speed: "保持节奏"
  }[states.speedAdvice];
}

function getQuestionRouteCopy(intent, input) {
  const key = getCopyKey(intent, input.question);
  const fallback = QUESTION_ROUTE_COPY[key] || QUESTION_ROUTE_COPY.general;
  const pool = ROUTE_COPY_VARIANTS[key] || ROUTE_COPY_VARIANTS.general;
  const seed = buildCopySeed(input, intent);
  return ["A", "B", "C"].reduce((copy, routeId) => {
    const variants = pool[routeId] || [fallback[routeId]];
    copy[routeId] = pickVariant(variants, `${seed}|route|${routeId}`);
    return copy;
  }, {});
}

function getFastRiskCopy(input, intent, scores) {
  return pickVariant(FAST_RISK_COPY_VARIANTS, `${buildCopySeed(input, intent)}|fast-risk|${scores.risk}`);
}

function buildCopySeed(input, intent) {
  return [
    input.birthDate,
    input.birthTime || "no-time",
    input.birthplace,
    input.contextCity,
    input.gender,
    input.question,
    intent.id
  ].join("|");
}

function computeRouteOptions(scores, states, intent, input) {
  const aTag = states.selectedRoute === "A" ? "较亮" : scores.risk > 62 ? "阻力高" : "机会";
  const bTag = states.selectedRoute === "B" ? "较亮" : "稳一点";
  const cTag = states.selectedRoute === "C" ? "较亮" : "低耗";
  const laneLabel = getLaneLabel(states);
  const speedLabel = getSpeedLabel(states);
  const routeCopy = getQuestionRouteCopy(intent, input);
  const fastRiskCopy = getFastRiskCopy(input, intent, scores);
  return [
    {
      id: "A",
      name: "机会捷径",
      tag: aTag,
      summary: scores.risk > 60 ? fastRiskCopy.summary : routeCopy.B.summary,
      fit: scores.risk > 60 ? fastRiskCopy.fit : "适合抓短窗口，不适合强推。",
      cardLine: scores.risk > 60 ? fastRiskCopy.cardLine : routeCopy.B.cardLine,
      gain: "快一步",
      cost: scores.risk > 60 ? fastRiskCopy.cost : "窄路",
      action: scores.risk > 60 ? fastRiskCopy.action : routeCopy.B.action,
      avoid: "不一次押满",
      nowTitle: scores.risk > 60 ? fastRiskCopy.nowTitle : "小步试",
      nowBody: scores.risk > 60 ? fastRiskCopy.nowBody : "先看回音",
      gainBody: "机会更近",
      costBody: scores.risk > 60 ? fastRiskCopy.costBody : "容错更低",
      recommendScore: clampScore(44 + scores.momentum * 0.32 - scores.risk * 0.24 + scores.support * 0.08)
    },
    {
      id: "B",
      name: "稳定主路",
      tag: bTag,
      summary: routeCopy.A.summary,
      fit: "先走可承重的路，把确定的事做扎实。",
      cardLine: routeCopy.A.cardLine,
      gain: "更稳",
      cost: "慢一点",
      action: routeCopy.A.action,
      avoid: "不急换方向",
      nowTitle: laneLabel,
      nowBody: speedLabel,
      gainBody: "路更稳",
      costBody: "速度慢一点",
      recommendScore: clampScore(68 + scores.stability * 0.18 - scores.risk * 0.08)
    },
    {
      id: "C",
      name: "缓冲路线",
      tag: cTag,
      summary: routeCopy.C.summary,
      fit: intent.domain === "mood" ? "先照顾状态，别把自己逼进窄路。" : "绕开消耗点，保留余力。",
      cardLine: routeCopy.C.cardLine,
      gain: "低耗",
      cost: "慢热",
      action: routeCopy.C.action,
      avoid: "不逃避",
      nowTitle: "先降消耗",
      nowBody: "等状态回升",
      gainBody: "降消耗",
      costBody: "稍后",
      recommendScore: clampScore(52 + Math.max(0, 62 - scores.momentum) * 0.28 + scores.risk * 0.12)
    }
  ].map(polishRouteOption);
}

function buildReadableResult(input, intent, features, scores, states, routes) {
  const selected = routes.find((route) => route.id === states.selectedRoute) || routes[0];
  const laneLabel = getLaneLabel(states);
  const speedLabel = getSpeedLabel(states);
  const seed = buildCopySeed(input, intent);
  const headline = polishCopy(pickVariant(HEADLINE_COPY[states.roadState] || HEADLINE_COPY.slow_climb, `${seed}|headline|${states.roadState}`));
  const grade = scores.risk >= 68 ? "避锋局" : scores.momentum >= 70 && scores.risk < 55 ? "开门局" : "稳行局";
  const subhead = polishCopy(selected.cardLine);
  const riskLine =
    scores.risk >= 65
      ? polishCopy(pickVariant(RISK_LINE_VARIANTS.high, `${seed}|risk-high|${scores.risk}`))
      : scores.risk >= 52
        ? polishCopy(pickVariant(RISK_LINE_VARIANTS.medium, `${seed}|risk-medium|${scores.risk}`))
        : polishCopy(pickVariant(RISK_LINE_VARIANTS.low, `${seed}|risk-low|${scores.risk}`));
  const opportunityLine =
    scores.support >= 58
      ? polishCopy(pickVariant(OPPORTUNITY_LINE_VARIANTS.high, `${seed}|support-high|${scores.support}`))
      : polishCopy(pickVariant(OPPORTUNITY_LINE_VARIANTS.low, `${seed}|support-low|${scores.support}`));
  const relationCopy = {
    today_generates_me: "今日五行对你有补益，适合借外部支持。",
    i_generate_today: "你的状态容易被事务消耗，适合控制投入强度。",
    same: "你和今日气场同频，适合按熟悉节奏推进。",
    today_controls_me: "今日对你形成压力，越急越容易卡。",
    i_control_today: "你能主动处理局面，但要控制动作幅度。",
    neutral: "今日与个人底色关系中性，关键看问题本身。"
  }[features.relation];
  const yi = normalizeAlmanacList(features.today.yi, "整理、沟通、收尾", 3);
  const ji = normalizeAlmanacList(features.today.ji, "急进、争执", 3);
  const eventCopy = features.lifeContext.matchedEvents.length
    ? features.lifeContext.matchedEvents.map((event) => `${event.title}(${event.ageAtEvent}岁)`).join("、")
    : "暂无强匹配事件";
  const questionEvidence = input.autoQuestion
    ? "本次先看全局路况，不需要你先提具体问题；结果会先给路线，再给解释。"
    : `你的问题被识别为「${intent.label}」，因此更重视${intent.riskSensitivity === "high" ? "风险控制和可逆性" : "行动节奏和情绪支撑"}。`;

  return {
    headline,
    grade,
    subhead,
    selectedRouteText: `${selected.id} ${selected.name} · ${selected.tag}`,
    actionNow: laneLabel,
    nextStep: speedLabel,
    riskLine,
    opportunityLine,
    decisionCards: [
      {
        tone: "blue",
        label: "现在",
        title: laneLabel,
        body: selected.action
      },
      {
        tone: "green",
        label: "下一步",
        title: speedLabel,
        body: opportunityLine
      },
      {
        tone: "red",
        label: "不要",
        title: selected.avoid,
        body: riskLine
      }
    ],
    evidence: [
      {
        title: "你的基础盘",
        body: `日柱 ${features.birth.pillars.day}，日主属${ELEMENT_LABEL[features.birth.dayMasterElement]}，当前按${features.confidence === "standard" ? "出生时辰" : "无时辰"}计算。`
      },
      {
        title: "今天的天时",
        body: `${features.today.isoDate} 为 ${features.today.pillars.day}日，节气状态：${features.today.solarTerm}。`
      },
      {
        title: "今日宜忌",
        body: `宜：${yi}。忌：${ji}。用于修正行动节奏，不直接当作唯一结论。`
      },
      {
        title: "你和今天的关系",
        body: relationCopy
      },
      {
        title: "起局方式",
        body: questionEvidence
      },
      {
        title: "人生上下文",
        body: `${features.lifeContext.lifeStage} · ${features.lifeContext.stageGeo.name}，匹配事件：${eventCopy}。地点层来自${getContextSourceLabel(input.contextSource)}，只做小幅权重。`
      },
      {
        title: "结果为什么会变",
        body: "同样的出生信息，遇到不同天时、人生阶段和当下状态，会落到不同路线；这里不做固定答案。"
      },
      {
        title: "如何得出",
        body: "综合出生信息、今日天时、人生阶段和路线规则；解释只负责讲清楚，不改路线判断。"
      }
    ]
  };
}

function buildRouteData(result) {
  const { scores, states, routes, intent } = result;
  const selected = states.selectedRoute;
  const laneLabel = getLaneLabel(states);
  const speedLabel = getSpeedLabel(states);

  const routeDetails = {
    A: { title: `${ROUTE_VISIBLE_LABEL.A} · ${routes[0].tag}`, body: `${routes[0].fit}。会帮你：${routes[0].gain}；要承受：${routes[0].cost}。` },
    B: { title: `${ROUTE_VISIBLE_LABEL.B} · ${routes[1].tag}`, body: `${routes[1].fit}。会帮你：${routes[1].gain}；要承受：${routes[1].cost}。` },
    C: { title: `${ROUTE_VISIBLE_LABEL.C} · ${routes[2].tag}`, body: `${routes[2].fit}。会帮你：${routes[2].gain}；要承受：${routes[2].cost}。` }
  };

  return {
    visualSchema: buildRouteVisualSchema(result),
    current: { x: 42, y: 494, label: "当下" },
    destination: { x: 326, y: 82, label: "未来" },
    selectedRoute: selected,
    routes: [
      {
        ...routes[0],
        color: "#4F9F69",
        instructionTitle: selected === "A" ? `较亮信号：${ROUTE_VISIBLE_LABEL.A}` : `可能信号：${ROUTE_VISIBLE_LABEL.A}`,
        instructionBody: routes[0].action,
        detail: routeDetails.A,
        points: [[42, 494], [86, 438], [134, 382], [168, 330], [206, 278], [238, 226], [278, 152], [326, 82]],
        segments: [
          { from: 0, to: 2, color: "#FBBF24", label: "当下：慢起步", labelAt: [104, 402], detail: { title: "当下：慢起步", body: `行动火候${scoreTone(scores.momentum)}，适合小步推进。` } },
          { from: 2, to: 4, color: scores.risk >= 60 ? "#D95F52" : "#4F9F69", label: scores.risk >= 60 ? "阻力段：先别强推" : "路况：基本顺行", labelAt: [160, 328], detail: { title: scores.risk >= 60 ? "阻力段：先别强推" : "路况：基本顺行", body: `这一段阻力偏高，由今日天时、冲煞和稳定性共同影响。` } },
          { from: 4, to: 5, color: states.tunnelState === "near_exit" ? "#977C52" : "#4F9F69", label: states.tunnelState === "near_exit" ? "隧道末段" : "视野转清", labelAt: [218, 252], detail: { title: states.tunnelState === "near_exit" ? "隧道末段" : "视野转清", body: `稳定信号${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，外部支持${scoreTone(scores.support)}。` } },
          { from: 5, to: 7, color: "#4F9F69", label: "未来出口", labelAt: [282, 170], detail: { title: "未来出口", body: `外部支持${scoreTone(scores.support)}，适合在条件更清楚时推进。` } }
        ],
        annotations: [
          { x: 96, y: 454, label: laneLabel, icon: "lane", detail: { title: laneLabel, body: routes[0].action } },
          { x: 170, y: 300, label: scores.risk >= 60 ? "降速通过" : "稳速通过", icon: "warning", detail: { title: scores.risk >= 60 ? "降速通过" : "稳速通过", body: scores.risk >= 60 ? "这一段阻力偏高，先拆小动作。" : "这一段可以走，但仍要留余地。" } },
          { x: 256, y: 206, label: speedLabel, icon: "exit", detail: { title: speedLabel, body: "这是由行动火候和阻力共同决定的节奏建议。" } }
        ]
      },
      {
        ...routes[1],
        color: "#D95F52",
        instructionTitle: selected === "B" ? `较亮信号：${ROUTE_VISIBLE_LABEL.B}` : `可能信号：${ROUTE_VISIBLE_LABEL.B}`,
        instructionBody: routes[1].action,
        detail: routeDetails.B,
        points: [[42, 494], [94, 416], [166, 326], [224, 212], [326, 82]],
        annotations: [
          { x: 144, y: 360, label: "不宜大改方向", icon: "warning", detail: { title: "不宜大改方向", body: `转向判断：${laneLabel}` } },
          { x: 230, y: 234, label: "速度快，容错低", icon: "speed", detail: { title: "速度快，容错低", body: `稳定性${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}。` } }
        ]
      },
      {
        ...routes[2],
        color: "#E8B236",
        instructionTitle: selected === "C" ? `较亮信号：${ROUTE_VISIBLE_LABEL.C}` : `可能信号：${ROUTE_VISIBLE_LABEL.C}`,
        instructionBody: routes[2].action,
        detail: routeDetails.C,
        points: [[42, 494], [76, 520], [158, 520], [238, 470], [314, 314], [326, 82]],
        annotations: [
          { x: 160, y: 540, label: "先降消耗", icon: "rest", detail: { title: "先降消耗", body: intent.domain === "mood" ? "本次更偏情绪支持，先回到稳定状态。" : "状态不足时，先降低误判成本。" } },
          { x: 300, y: 338, label: "慢一点更稳", icon: "lane", detail: { title: "慢一点更稳", body: "速度不是唯一目标，稳定性也是路线依据。" } }
        ]
      }
    ],
    sharedAnnotations: [
      { x: 134, y: 370, label: `转向：${laneLabel}`, detail: { title: `转向：${laneLabel}`, body: "由阻力、稳定性和当前问题共同决定。" } },
      { x: 92, y: 476, label: "当下", detail: { title: "当下", body: result.readable.subhead } },
      { x: 278, y: 132, label: `下一步：${speedLabel}`, detail: { title: `下一步：${speedLabel}`, body: result.readable.opportunityLine } }
    ]
  };
}

function buildRouteVisualSchema(result) {
  return {
    map: "life_topology_map",
    maxIcons: MAX_MAP_ICONS,
    placementRule: "拓扑是展示骨架，不是命理结论；默认显示起点和两条起步路，选中一条路后开放该路后续节点，其余节点置灰。",
    stage: result.features.lifeContext.lifeStage,
    stageGeo: result.features.lifeContext.stageGeo,
    selectedRoute: result.states.selectedRoute,
    startPoint: LIFE_START_POINT,
    endPoint: LIFE_END_POINT,
    paths: LIFE_BRANCH_PATHS,
    activeNodes: getVisualNodesForRoute(result, result.states.selectedRoute)
  };
}

function getVisualNodesForRoute(result, routeId = selectedRoute) {
  return buildJourneyNodes(result, routeId);
}

function getVisibleJourneyNodeDefs(routeId = selectedRoute) {
  const nodeById = new Map(LIFE_JOURNEY_NODES.map((node) => [node.id, node]));
  const currentNodeId = activeVisualNodeId || "START";
  const nextNodeIds = TOPOLOGY_CHILDREN[currentNodeId] || [];
  return nextNodeIds
    .map((id) => nodeById.get(id))
    .filter(Boolean)
    .filter((node) => node.branchId === "all" || node.branchId === routeId || node.branchRole === "起步路线")
    .slice(0, 2);
}

function getRoutePosition(routeId) {
  return routeId === "B" ? VISUAL_NODE_POSITIONS.routeB : routeId === "C" ? VISUAL_NODE_POSITIONS.routeC : VISUAL_NODE_POSITIONS.routeA;
}

function buildJourneyNodes(result, routeId = selectedRoute) {
  const currentAge = result.features.lifeContext.age;
  return getVisibleJourneyNodeDefs(routeId).map((node, displayIndex) => {
    const advice = buildJourneyNodeAdvice(node, result, routeId);
    const lifeCopy = getLifeChoiceCopy(node.id);
    const stage = getJourneyStage(node, currentAge);
    const selectable = isNodeAvailableForRoute(node, routeId);
    const recommended = node.branchId === "all" || node.branchId === routeId;
    const displayTitle = polishCopy(lifeCopy?.title || advice.title || node.title);
    const displayBody = polishCopy(lifeCopy?.summary || advice.body);
    return {
      id: node.id,
      routeId,
      branchId: node.branchId,
      branchRole: node.branchRole,
      recommended,
      selectable,
      icon: advice.icon || node.icon,
      title: displayTitle,
      mapTitle: polishCopy(node.title),
      body: displayBody,
      choiceCopy: lifeCopy,
      logicLayer: polishCopy(node.topic),
      x: node.x,
      y: node.y,
      order: displayIndex + 1,
      asset: getIconAsset(advice.icon || node.icon),
      detail: {
        branchId: node.branchId,
        icon: advice.icon || node.icon,
        title: displayTitle,
        mapTitle: polishCopy(node.title),
        body: displayBody,
        choice: polishCopy(advice.choice || node.choice),
        choiceCopy: lifeCopy,
        meta: polishCopy(`${stage.label} · ${node.branchRole}`),
        stageName: stage.name,
        stageLabel: stage.label,
        stageRange: stage.range,
        stageDescription: stage.detail,
        instructionTitle: polishCopy(advice.instructionTitle || "这一步的判断"),
        instructionBody: polishCopy(`${stage.label}，${advice.instructionBody || advice.choice}。`)
      }
    };
  });
}

function isNodeAvailableForRoute(node, routeId) {
  return node.branchId === "all" || node.branchId === routeId || node.branchRole === "起步路线";
}

function isNodeVisibleForRoute(node, routeId) {
  const level = getTopologyNodeLevel(node.id);
  if (level === 0) return true;
  if (level === 1) return node.branchRole === "起步路线";
  if (node.branchId !== "all" && node.branchId !== routeId) return false;
  if (level === 2) return true;
  if (level === 3) {
    const activeL2 = getActiveL2NodeId();
    return Boolean(activeL2 && (TOPOLOGY_CHILDREN[activeL2] || []).includes(node.id));
  }
  if (level === 4) {
    const activeL3 = getActiveL3NodeId();
    return Boolean(activeL3 && (TOPOLOGY_CHILDREN[activeL3] || []).includes(node.id));
  }
  return true;
}

function getTopologyNodeLevel(id) {
  if (id === "START") return 0;
  if (/^L1-/.test(id)) return 1;
  if (/^L2-/.test(id)) return 2;
  if (/^L3-/.test(id)) return 3;
  if (/^O\d/.test(id)) return 4;
  return 1;
}

function getActiveL2NodeId() {
  const id = activeVisualNodeId || "";
  if (/^L2-/.test(id)) return id;
  if (/^L3-/.test(id)) return TOPOLOGY_PARENT_BY_ID[id] || null;
  if (/^O\d/.test(id)) {
    const activeL3 = TOPOLOGY_PARENT_BY_ID[id];
    return activeL3 ? TOPOLOGY_PARENT_BY_ID[activeL3] || null : null;
  }
  return null;
}

function getActiveL3NodeId() {
  const id = activeVisualNodeId || "";
  if (/^L3-/.test(id)) return id;
  if (/^O\d/.test(id)) return TOPOLOGY_PARENT_BY_ID[id] || null;
  return null;
}

function buildTopologyNodeAdvice(node, result, routeId) {
  if (!/^(START|L1-|L2-|L3-|O\d)/.test(node.id)) return null;
  const { scores } = result;
  const routeSignal = ROUTE_MYSTIC[routeId] || ROUTE_MYSTIC.A;
  const highRisk = scores.risk >= 62;
  const weakBase = scores.stability < 56;
  const strongSupport = scores.support >= 58;
  const strongMomentum = scores.momentum >= 68;
  const moneyOpen = scores.wealthSafety >= 60 && !highRisk;
  const relationshipOpen = scores.relationship >= 58 && scores.risk < 65;
  const advice = {
    START: {
      icon: "direction_choice",
      title: "你在起点",
      body: "未来的人生路漫长。眼前不是二选一，而是几种可能会逐步亮出来。",
      choice: "先看亮起的路标",
      instructionBody: "先看地图上亮起的可能性。每个路标都代表一个信号，不代表最终命运。"
    },
    "L1-A": {
      icon: highRisk ? "wait_signal" : "opportunity_window",
      title: "走捷径",
      body: highRisk ? "捷径亮了，但桥面偏窄。可以看，不适合马上押满。" : "你可以快一步，但要先跨出去。适合试新机会，不适合一次押满。",
      choice: "过桥入林",
      instructionBody: "低成本试一条非常规路，先设退路"
    },
    "L1-B": {
      icon: weakBase ? "stability_anchor" : "keep_lane",
      title: "过桥走大路",
      body: weakBase ? "基础还没完全压稳。先把资源、作息和手边承诺排清楚。" : "这条路慢一点，但更稳。适合先把确定的事做扎实。",
      choice: "过桥走大路",
      instructionBody: "把确定的事做完，不急着换方向"
    },
    "L2-A1": {
      icon: strongMomentum ? "momentum_boost" : "career_path",
      title: "深入森林",
      body: "继续往新路里走，会更有发现，也会更不确定。",
      choice: "继续探索新机会",
      instructionBody: "继续看新机会，但每一步都要能回收"
    },
    "L2-A2": {
      icon: weakBase ? "stability_anchor" : "safe_zone",
      title: "过桥回主路",
      body: "把非常规机会接回现实。先找平台、合作方或明确规则。",
      choice: "接回现实主线",
      instructionBody: "先把机会接回规则和可执行计划"
    },
    "L2-B1": {
      icon: strongSupport ? "support_lighthouse" : "relationship_contact",
      title: "走向主路",
      body: "继续常规路线，先把眼前确定的事走顺。",
      choice: "先把确定的事走顺",
      instructionBody: "先回到主线，把确定的事做扎实"
    },
    "L2-B2": {
      icon: highRisk ? "risk_barrier" : "detour_route",
      title: "贴崖试路",
      body: "这条路更快，也更窄。适合小步试，不适合重押。",
      choice: "小步试，不重押",
      instructionBody: "只做小步验证，先设好边界"
    },
    "L3-A1a": {
      icon: strongMomentum ? "momentum_boost" : "career_path",
      title: "爬小山",
      body: "会累，但这是练硬本事的一段。",
      choice: "练硬本事",
      instructionBody: "补技能、拿资格、扛责任"
    },
    "L3-A1b": {
      icon: "slow_down",
      title: "过桥入平原",
      body: "从冒险回到可执行。适合把灵感变成计划。",
      choice: "把灵感变成计划",
      instructionBody: "把灵感收成计划，不急着换方向"
    },
    "L3-A2a": {
      icon: moneyOpen ? "money_commitment" : "wealth_safe_chest",
      title: "沿主路慢走",
      body: "路长一点，但阻力小。适合稳住主线，逐步放大。",
      choice: "逐步放大基本盘",
      instructionBody: "稳住主线，再逐步放大"
    },
    "L3-A2b": {
      icon: "wait_signal",
      title: "抄近路上高台",
      body: "可以快一点，但这里只是通向高台前的快路，不放梯子。",
      choice: "先过门槛，不放梯子",
      instructionBody: "先过门槛，等条件清楚再上高地"
    },
    "L3-B1a": {
      icon: strongSupport ? "support_lighthouse" : "opportunity_window",
      title: "沿主路慢走",
      body: "路长一点，但阻力小。适合稳住主线，逐步放大。",
      choice: "逐步放大基本盘",
      instructionBody: "稳住主线，再逐步放大"
    },
    "L3-B1b": {
      icon: "lane_change",
      title: "抄近路上高台",
      body: "可以快一点，但这里只是通向高台前的快路，不放梯子。",
      choice: "先过门槛，不放梯子",
      instructionBody: "先过门槛，等条件清楚再上高地"
    },
    "L3-B2a": {
      icon: highRisk ? "risk_barrier" : "detour_route",
      title: "回到坦途",
      body: "如果硬爬的条件不够，先退回平路。能回头，是为了保住后面的机会。",
      choice: "从崖边回到稳定路径",
      instructionBody: "先转回平路，保住后面的机会"
    },
    "L3-B2b": {
      icon: "mood_rest",
      title: "爬梯过坎",
      body: "前面不是平路，要靠工具上去。先补资源、方法和保护。",
      choice: "靠工具过风险坎",
      instructionBody: "先补资源、方法和保护，再继续"
    },
    O1: {
      icon: "good_timing",
      title: "山地挑战结果",
      body: "挑战到顶，结果会很明确。扛住了就是高位收获，扛不住就是消耗。",
      choice: "挑战到顶",
      instructionBody: "结果取决于是否扛得住压力"
    },
    O2: {
      icon: "opportunity_window",
      title: "灯塔稳定结果",
      body: "这条路不刺激，但结果清楚。适合长期积累后稳定成局。",
      choice: "稳定成局",
      instructionBody: "补足条件后，继续走向稳定结果"
    },
    O3: {
      icon: "direction_choice",
      title: "崖边捷径结果",
      body: "过了最险的一段，后面会平一些。结果看你前面有没有守住边界。",
      choice: "过坎后收束",
      instructionBody: "继续守住边界，别把风险重新放大"
    },
  }[node.id];
  return advice || null;
}

function buildJourneyNodeAdvice(node, result, routeId) {
  const topologyAdvice = buildTopologyNodeAdvice(node, result, routeId);
  if (topologyAdvice) return topologyAdvice;
  const { scores, states, readable } = result;
  const routeSignal = ROUTE_MYSTIC[routeId] || ROUTE_MYSTIC.A;
  const highRisk = scores.risk >= 62;
  const weakBase = scores.stability < 56;
  const strongSupport = scores.support >= 58;
  const strongMomentum = scores.momentum >= 68;
  const moneyOpen = scores.wealthSafety >= 60 && !highRisk;
  const relationshipOpen = scores.relationship >= 58 && scores.risk < 65;
  const selectedBranchName = routeSignal.title;
  const isSelectedBranch = node.branchId === routeId || node.branchId === "all" || node.branchRole === "合流点";
  const advice = {
    "branch-start": {
      icon: routeSignal.icon,
      title: "未来的人生路漫长",
      body: `未来的人生路漫长，今天有几种可能会亮起。每条分路都能到出口，但火候不同。`,
      choice: `先看亮起的路标，再看旁枝要承受什么`,
      instructionBody: `第一步不是回头选，是看哪几个可能性正在变亮；当前较亮的是「${selectedBranchName}」`
    },
    "branch-root-foundation": {
      icon: weakBase ? "stability_anchor" : "earth_base",
      title: weakBase ? "基础先补" : "基础可承重",
      body: weakBase ? `基础条件偏弱，这一步先补资源和作息。基础稳了，后面的分枝才不散。` : `基础条件可承重，能承住一部分变化。此处适合把资源、现金流和日常节奏先排稳。`,
      choice: "条件选项：先稳资源、作息和现金流",
      instructionBody: routeId === "ROOT" ? "这是先补基础的第一枚选项，先把底盘稳住，再谈加速" : "左上支路提示：基础不稳时，先补条件再回主线"
    },
    "branch-root-evidence": {
      icon: "today_general",
      title: "证据先补齐",
      body: `这一步看事实和样板。不是先求结论，而是把能验证的凭据补齐，避免后面走到岔口时只凭感觉。`,
      choice: "证据选项：补事实、样板和凭据",
      instructionBody: routeId === "ROOT" ? "先补一个能验证的证据，再决定是否回到主路" : "遇到不确定项时，先补证据比立刻选择更稳"
    },
    "branch-root-keyperson": {
      icon: strongSupport ? "support_lighthouse" : "relationship_contact",
      title: strongSupport ? "关键人可借力" : "先确认关键人",
      body: strongSupport ? `外部助力偏亮，此处有人能帮路。先确认谁能支持、谁能拍板，别把话说散。` : `外部助力还没完全亮。先确认关键人和关键关系，不急着把承诺推出去。`,
      choice: "关系选项：确认谁支持、谁拍板",
      instructionBody: routeId === "ROOT" ? "先找关键人确认边界，再带着答案回主路" : "这处路标提醒你：有些选择先问人，再问路"
    },
    "branch-root-merge": {
      icon: "keep_lane",
      title: "带条件回主路",
      body: "左上路不是退回原点，而是补完条件后重新合流。走到这里，主线会更稳，只是速度慢一点。",
      choice: "合流选项：基础补稳后回主线",
      instructionBody: "基础补稳后再回到主路，不把基础问题带到下一段"
    },
    "branch-mainline": {
      icon: weakBase ? "stability_anchor" : "keep_lane",
      title: routeId === "B" ? "主线更亮" : "主线可走",
      body: weakBase ? `基础条件偏弱，这一枝先补气。稳住主线不慢，是先把局面压稳。` : `基础条件可承重，主路能承重。适合把精力放回熟路，少开无用支线。`,
      choice: "稳住主线：适合稳事业、稳节奏、稳现金流",
      instructionBody: isSelectedBranch ? "这条路适合先走，先把主线做实" : "这条路更稳，风险高时优先回到这里"
    },
    "branch-opportunity": {
      icon: routeId === "A" && !highRisk ? "opportunity_window" : "wait_signal",
      title: routeId === "A" && !highRisk ? "机会窗口打开" : "机会窗口半开",
      body: highRisk ? `阻力偏重，门虽开但风不稳。可以看，不宜立刻重押。` : `行动火候可用，门开一线。适合试新身份、新合作或新入口。`,
      choice: "机会支路：适合试新入口，但要小步验证",
      instructionBody: routeId === "A" && !highRisk ? "这条枝可走，小步试，不一次换盘" : "这条枝先观望，等信号更亮再进"
    },
    "branch-detour": {
      icon: highRisk || states.selectedRoute === "C" ? "detour_route" : "safe_zone",
      title: highRisk || states.selectedRoute === "C" ? "慢一点走" : "留一条缓冲路",
      body: highRisk ? `${readable.riskLine} 阻力偏重，绕行不是退，是保住后段选择。` : `阻力还没到封路。留一条缓冲枝，避免把局走死。`,
      choice: "绕行支路：适合避冲、降速、先回气",
      instructionBody: routeId === "C" ? "这条路适合先走，先避锋，再合流" : "这条路留作缓冲，遇到阻力再转入"
    },
    "branch-money": {
      icon: moneyOpen ? "money_commitment" : "wealth_safe_chest",
      title: moneyOpen ? "财门可试" : "财箱先扣住",
      body: moneyOpen ? `资源边界可用，可以开小窗口。先试承诺，不要先许大愿。` : `资源边界需要守住，先守现金流。钱的路不能靠情绪推进。`,
      choice: "资源支线：先守边界，再开窗口",
      instructionBody: moneyOpen ? "可小额试水，见回音再加" : "先守，不急做大承诺"
    },
    "branch-relationship": {
      icon: relationshipOpen ? "relationship_bridge" : "relationship_contact",
      title: relationshipOpen ? "关系桥可过" : "先把话收软",
      body: relationshipOpen ? `关系可通，桥还在。先递善意，说一件事，不翻旧账。` : `关系通道偏窄。先收语气，别用试探换答案。`,
      choice: "关系子枝：先通气，再求答案",
      instructionBody: relationshipOpen ? "可以先沟通，但一次只说一个点" : "先缓，不在情绪高处定关系"
    },
    "branch-risk": {
      icon: highRisk ? "risk_barrier" : "slow_down",
      title: highRisk ? "风险坡降速" : "风险坡慢过",
      body: highRisk ? `阻力偏重，坡口不适合急进。降速过，后面还有合流口。` : `阻力可控，可过但别连续转向。越急越容易错过路牌。`,
      choice: "风险子枝：宁可慢，不强闯",
      instructionBody: highRisk ? "先停一拍，避开冲煞点" : "慢行通过，保留下一次选择"
    },
    "branch-support": {
      icon: strongSupport ? "support_lighthouse" : "wait_signal",
      title: strongSupport ? "贵人灯亮" : "等灯再问",
      body: strongSupport ? `外部助力偏亮，此处适合借人借势。开口要短，目标要清。` : `外部助力还不够亮。先问路，不要把希望全押在人上。`,
      choice: "贵人合流：借势，但不失主心",
      instructionBody: strongSupport ? "可借外力推进一格" : "先等信号，别把方向交出去"
    },
    "branch-career": {
      icon: strongMomentum ? "momentum_boost" : "career_path",
      title: strongMomentum ? "事业坡可上" : "事业坡慢爬",
      body: strongMomentum ? `行动火候偏亮，事业坡有风。可以做样板，不急着换整盘。` : `行动火候还在蓄，坡还在。先做深一件事，让支线回到主业。`,
      choice: "事业合流：把支线收回可复用能力",
      instructionBody: strongMomentum ? "小步加速，先做可验证成果" : "稳住节奏，别为新鲜感离开主路"
    },
    "branch-exit": {
      icon: states.selectedRoute === "A" && !highRisk ? "opportunity_window" : "good_timing",
      title: states.selectedRoute === "A" && !highRisk ? "出口可换局" : "顺势收束",
      body: states.selectedRoute === "A" && !highRisk ? `${routeSignal.title}到后段仍亮。换局可以，但要留退路。` : "后段宜把前面的枝收成一局。不是求快，是让路走得成形。",
      choice: "出口：收成自己的局",
      instructionBody: "每条枝都能到这里，差别在速度、阻力和留给你的余地"
    }
  }[node.id];
  return advice || {
    choice: node.choice,
    title: node.title,
    body: "此处先看火候，顺势小走，不把路走死。"
  };
}

function getJourneyStage(node, currentAge) {
  const config = NODE_STAGE_CONFIG[node?.id] || { name: "阶段节点", startOffset: 1, endOffset: 3, detail: "这一段根据当前选择继续展开。" };
  const start = currentAge + config.startOffset;
  const end = config.endOffset === null ? null : currentAge + config.endOffset;
  const yearWindow = config.startOffset === 0 && config.endOffset === 0
    ? "当下"
    : config.endOffset === null
      ? `未来第 ${config.startOffset} 年以后`
      : `未来第 ${config.startOffset}-${config.endOffset} 年`;
  const range = config.startOffset === 0 && config.endOffset === 0
    ? `现在，约 ${currentAge} 岁`
    : end === null
      ? `约 ${start} 岁以后`
      : start === end
        ? `约 ${start} 岁`
        : `约 ${start}-${end} 岁`;
  return {
    name: config.name,
    yearWindow,
    range,
    label: `${config.name} · ${yearWindow} · ${range}`,
    detail: config.detail
  };
}

function selectVisualNodes(candidates) {
  const byIcon = new Map();
  candidates
    .sort((a, b) => b.priority - a.priority)
    .forEach((node) => {
      const existing = byIcon.get(node.icon);
      if (!existing || node.priority > existing.priority) byIcon.set(node.icon, node);
    });
  return Array.from(byIcon.values())
    .sort((a, b) => b.priority - a.priority)
    .slice(0, MAX_MAP_ICONS)
    .map((node, index) => ({
      ...node,
      order: index + 1,
      asset: getIconAsset(node.icon)
    }));
}

function buildTrace(input, intent, features, scores, states, routes) {
  return {
    note: "规则引擎已接入干支、节气和人生路况图集；当前结果只作趋势参考。",
    input,
    intent,
    calculation: {
      engine: features.engine,
      confidence: features.confidence,
      birthPillars: features.birth.pillars,
      todayPillars: features.today.pillars,
      solarTerm: features.today.solarTerm,
      prevJieQi: features.today.prevJieQi,
      nextJieQi: features.today.nextJieQi,
      zodiac: features.birth.zodiac,
      dayMasterElement: ELEMENT_LABEL[features.birth.dayMasterElement],
      todayElement: ELEMENT_LABEL[features.today.todayElement],
      yi: features.today.yi,
      ji: features.today.ji,
      chong: features.today.chong,
      sha: features.today.sha
    },
    lifeContext: features.lifeContext,
    possibility: {
      inputLowerBound: buildPossibilityCopy(features.today.isoDate, intent, input.question),
      routeStateCount: POSSIBILITY_ROUTE_STATE_COUNT,
      visibleCopyVariantLowerBound: estimateVisibleResultVariants(intent, input.question),
      minimumVisibleCopyTarget: MIN_VISIBLE_RESULT_VARIANTS
    },
    copyLayer: {
      source: "local_template",
      modelEndpoint: `${API_BASE_PATH}/roadmap-copy`,
      languageSystem: MYSTIC_LANGUAGE_SYSTEM
    },
    visualSchema: buildRouteVisualSchema({ input, intent, features, scores, states, routes, readable: buildReadableResult(input, intent, features, scores, states, routes) }),
    scores,
    states,
    routeOptions: routes,
    rules: [
      { ruleId: "intent_classification", output: intent.id },
      { ruleId: "element_relation", output: features.relation },
      { ruleId: "risk_state", input: `risk=${scores.risk}`, output: states.riskState },
      { ruleId: "lane_change", input: `risk=${scores.risk}, stability=${scores.stability}`, output: states.laneChange },
      { ruleId: "speed_advice", input: `momentum=${scores.momentum}, risk=${scores.risk}`, output: states.speedAdvice },
      { ruleId: "selected_route", input: `momentum=${scores.momentum}, stability=${scores.stability}, risk=${scores.risk}`, output: states.selectedRoute }
    ]
  };
}

function countWuxing(text) {
  const vector = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  Array.from(text).forEach((char) => {
    const element = GAN_ELEMENT[char] || ZHI_ELEMENT[char];
    if (element) vector[element] += 1;
  });
  return vector;
}

function wuxingBalance(vector) {
  const values = Object.values(vector);
  const max = Math.max(...values);
  const min = Math.min(...values);
  return Math.round(14 - (max - min) * 4);
}

function elementRelation(me, today) {
  if (me === today) return "same";
  if (GENERATES[today] === me) return "today_generates_me";
  if (GENERATES[me] === today) return "i_generate_today";
  if (CONTROLS[today] === me) return "today_controls_me";
  if (CONTROLS[me] === today) return "i_control_today";
  return "neutral";
}

function buildLifeContext({ birthYear, birthplace, contextCity, todayYear }) {
  const age = todayYear - birthYear;
  const locationText = `${birthplace || ""}${contextCity || ""}`;
  const matchedEvents = MAJOR_LIFE_EVENTS
    .map((event) => ({ ...event, ageAtEvent: event.year - birthYear }))
    .filter((event) => event.ageAtEvent >= event.minAge && event.ageAtEvent <= event.maxAge)
    .filter((event) => event.regions.includes("全国") || event.regions.some((region) => locationText.includes(region)))
    .slice(0, 4);
  const eventWeight = matchedEvents.reduce((sum, event) => sum + event.weight, 0);
  const hasMobilityEvent = matchedEvents.some((event) => /机会|开放|流动|职业/.test(event.lens));
  const hasRiskEvent = matchedEvents.some((event) => /风险|不确定|韧性|边界/.test(event.lens));
  const lifeStage = age < 24 ? "探索期" : age < 36 ? "建立期" : age < 50 ? "承压期" : age < 65 ? "整合期" : "守成期";
  return {
    age,
    lifeStage,
    stageGeo: getStageGeo(lifeStage),
    locationText,
    matchedEvents,
    eventWeight,
    hasMobilityEvent,
    hasRiskEvent
  };
}

function getStageGeo(stage) {
  return STAGE_GEO[stage] || STAGE_GEO["建立期"];
}

function safeList(value) {
  return Array.isArray(value) ? value : [];
}

function toYmd(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function stableHash(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickVariant(list, seed) {
  if (!Array.isArray(list) || !list.length) return {};
  return list[stableHash(String(seed)) % list.length];
}

function seededOffset(seed, range) {
  const hash = stableHash(seed);
  return (hash % (range * 2 + 1)) - range;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function clampText(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, "").trim();
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

function showToast(message) {
  shareToast.textContent = message;
  shareToast.classList.remove("hidden");
  window.setTimeout(() => shareToast.classList.add("hidden"), 2000);
}

function getContextSourceLabel(source) {
  return {
    server_ip: "IP 定位",
    loopback_ip: "当前位置参考",
    browser_fallback: "当前位置参考"
  }[source] || "当前位置参考";
}

function buildPossibilityCopy(todayIsoDate, intent = { domain: "general", id: "general_today" }, question = "") {
  const start = new Date("1900-01-01T00:00:00");
  const today = new Date(`${todayIsoDate}T00:00:00`);
  const birthDateDays = Math.max(1, Math.floor((today - start) / 86400000) + 1);
  const inputLowerBound = birthDateDays * 1441 * 4 * DEMO_CITY_POOL.length * POSSIBILITY_INTENT_COUNT;
  const visibleVariants = estimateVisibleResultVariants(intent, question);
  return `当前输入空间下限约 ${formatLargeNumber(inputLowerBound)} 种；路线状态约 ${formatLargeNumber(POSSIBILITY_ROUTE_STATE_COUNT)} 种；同一问题类型的可见短文案组合不少于 ${visibleVariants} 种。出生地自由文本和模型文案不计入。`;
}

function estimateVisibleResultVariants(intent, question) {
  const key = getCopyKey(intent, question);
  const pool = ROUTE_COPY_VARIANTS[key] || ROUTE_COPY_VARIANTS.general;
  const routeVariants = ["A", "B", "C"].reduce((total, routeId) => total * Math.max(1, pool[routeId]?.length || 1), 1);
  return Math.max(MIN_VISIBLE_RESULT_VARIANTS, routeVariants);
}

function formatLargeNumber(value) {
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}亿`;
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
  return String(value);
}

function setSelectedRoute(routeId, detail = null) {
  const previousRoute = selectedRoute;
  if (FOCUSABLE_BRANCH_IDS.includes(routeId)) {
    selectedRoute = routeId;
    topologyDepth = previousRoute === routeId ? Math.max(topologyDepth, 2) : 2;
  }
  activeVisualNodeId = null;
  activeBranchId = routeId;
  detailExpanded = false;
  expandedChoiceCardId = null;
  activeDetail = detail || buildBranchDetail(currentResult, routeId);
  render();
}

function setActiveDetail(detail) {
  activeDetail = detail;
  activeVisualNodeId = detail?.nodeId || activeVisualNodeId;
  activeBranchId = detail?.branchId || activeBranchId;
  detailExpanded = false;
  expandedChoiceCardId = null;
  renderDetail();
  renderInstruction();
}

function buildDetailForJourneyNodeId(nodeId, routeId = getFocusedBranchId()) {
  const node = LIFE_JOURNEY_NODES.find((item) => item.id === nodeId);
  if (!node) return null;
  const currentAge = currentResult.features.lifeContext.age;
  const advice = buildJourneyNodeAdvice(node, currentResult, routeId);
  const lifeCopy = getLifeChoiceCopy(node.id);
  const stage = getJourneyStage(node, currentAge);
  const displayTitle = polishCopy(lifeCopy?.title || advice.title || node.title);
  const displayBody = polishCopy(lifeCopy?.summary || advice.body);
  return {
    branchId: node.branchId,
    icon: advice.icon || node.icon,
    title: displayTitle,
    mapTitle: polishCopy(node.title),
    body: displayBody,
    choice: polishCopy(advice.choice || node.choice),
    choiceCopy: lifeCopy,
    meta: polishCopy(`${stage.label} · ${node.branchRole}`),
    stageName: stage.name,
    stageLabel: stage.label,
    stageRange: stage.range,
    stageDescription: stage.detail,
    instructionTitle: polishCopy(advice.instructionTitle || "这一步的判断"),
    instructionBody: polishCopy(`${stage.label}，${advice.instructionBody || advice.choice}。`),
    nodeId: node.id
  };
}

function getCurrentJourneyNode() {
  return LIFE_JOURNEY_NODES.find((node) => node.id === activeVisualNodeId)
    || LIFE_JOURNEY_NODES.find((node) => node.id === "START");
}

function getCurrentMapPoint() {
  const node = getCurrentJourneyNode();
  return node ? { x: node.x, y: node.y } : LIFE_START_POINT;
}

function inferDemoCity(seed) {
  return DEMO_CITY_POOL[stableHash(String(seed || "demo")) % DEMO_CITY_POOL.length];
}

function computeAvatarOffset(currentPoint, nextNodes) {
  const choices = nextNodes.filter((node) => node.id !== "START");
  if (!choices.length) return { dx: 0, dy: 0 };
  const nearest = choices.reduce((best, node) => {
    const distance = distanceBetweenPoints(currentPoint, node);
    return !best || distance < best.distance ? { node, distance } : best;
  }, null);
  const nearestNode = nearest?.node || choices[0];
  if (!nearest || nearest.distance > 15) return { dx: 0, dy: 0 };
  let dx = nearestNode.x <= currentPoint.x ? 8 : -8;
  let dy = nearestNode.y <= currentPoint.y ? 5 : -5;
  if (Math.abs(nearestNode.x - currentPoint.x) < 5) {
    dx = currentPoint.x < 50 ? 8 : -8;
  }
  return {
    dx: clampNumber(dx, -10, 10),
    dy: clampNumber(dy, -6, 6)
  };
}

function distanceBetweenPoints(a, b) {
  return Math.hypot((a.x || 0) - (b.x || 0), (a.y || 0) - (b.y || 0));
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function renderMap() {
  mapLoading.classList.add("hidden");
  const focusRoute = FOCUSABLE_BRANCH_IDS.includes(activeBranchId) ? activeBranchId : selectedRoute;
  const visualNodes = getVisualNodesForRoute(currentResult, focusRoute);
  const currentPoint = getCurrentMapPoint();
  const currentNode = getCurrentJourneyNode();
  const avatarOffset = computeAvatarOffset(currentPoint, visualNodes);
  const avatar = currentResult.input.avatar || AVATAR_OPTIONS[0];
  if (activeVisualNodeId) {
    const activeNode = visualNodes.find((node) => node.id === activeVisualNodeId);
    if (activeNode) {
      activeDetail = { ...activeNode.detail, nodeId: activeNode.id, branchId: activeNode.branchId };
    } else if (activeDetail?.nodeId !== activeVisualNodeId) {
      activeDetail = buildDetailForJourneyNodeId(activeVisualNodeId, focusRoute) || buildMapSummaryDetail(currentResult);
    }
  } else if (!activeDetail || !["summary", "branch"].includes(activeDetail.kind)) {
    activeDetail = buildMapSummaryDetail(currentResult);
  }

  mapContainer.innerHTML = `
    <div class="map-canvas route-${String(focusRoute).toLowerCase()}" style="--node-count:${visualNodes.length}">
      <img class="life-base-map" src="${LIFE_BASE_MAP_SRC}" alt="" />
      ${renderLifeRouteOverlay(focusRoute)}
      <div class="route-glow" aria-hidden="true"></div>
      <div class="route-ribbon" aria-hidden="true"></div>
      <div class="map-route-choices" aria-label="地图路线选择">
        ${renderMapRouteChoices(focusRoute)}
      </div>
      ${renderRoadAnchorLabels()}
      <div
        class="map-avatar-pin"
        style="--x:${currentPoint.x}; --y:${currentPoint.y}; --avatar-dx:${avatarOffset.dx}px; --avatar-dy:${avatarOffset.dy}px;"
        aria-label="我在这里：${escapeHtml(polishCopy(currentNode?.title || currentResult.features.lifeContext.lifeStage))}"
      >
        ${renderAvatarToken(avatar, "map-avatar-token")}
        <span>我在这</span>
      </div>
      <div class="map-nodes">
        ${visualNodes.filter((node) => node.id !== "START").map((node) => renderVisualNodeButton(node)).join("")}
      </div>
    </div>
  `;

  mapContainer.querySelectorAll(".visual-node").forEach((button) => {
    const node = visualNodes.find((item) => item.id === button.dataset.nodeId);
    button.addEventListener("click", () => {
      activateVisualNode(node, focusRoute);
    });
  });

  mapContainer.querySelectorAll(".map-route-choice").forEach((button) => {
    button.addEventListener("click", () => {
      const branchId = button.dataset.routeId || selectedRoute;
      setSelectedRoute(branchId, buildBranchDetail(currentResult, branchId));
    });
  });

  mapContainer.querySelectorAll(".branch-hit").forEach((path) => {
    path.addEventListener("click", () => {
      const branchId = path.dataset.branchId || selectedRoute;
      if (FOCUSABLE_BRANCH_IDS.includes(branchId)) {
        setSelectedRoute(branchId, buildBranchDetail(currentResult, branchId));
        return;
      }
      activeVisualNodeId = null;
      activeBranchId = branchId === "all" ? null : branchId;
      detailExpanded = false;
      expandedChoiceCardId = null;
      activeDetail = branchId === "all" ? buildMapSummaryDetail(currentResult) : buildBranchDetail(currentResult, branchId);
      renderMap();
      renderCards();
      renderDetail();
      renderInstruction();
    });
  });
}

function activateVisualNode(node, focusRoute = getFocusedBranchId()) {
  if (!node?.selectable) return;
  activeVisualNodeId = node.id;
  activeBranchId = node.branchId === "all" ? focusRoute : node.branchId;
  if (FOCUSABLE_BRANCH_IDS.includes(node.branchId)) {
    topologyDepth = Math.max(topologyDepth, getTopologyNodeLevel(node.id) + 1);
    selectedRoute = node.branchId;
  }
  detailExpanded = false;
  expandedChoiceCardId = null;
  activeDetail = { ...node.detail, nodeId: node.id };
  renderMap();
  renderCards();
  renderDetail();
  renderInstruction();
  maybeAutoOpenTerminalReport();
}

function renderLifeRouteOverlay(focusRoute = getFocusedBranchId()) {
  const visiblePaths = LIFE_BRANCH_PATHS.filter((path) => path.routeId === "all" || FOCUSABLE_BRANCH_IDS.includes(path.routeId));
  const mappingPaths = ROAD_MAPPING_PATHS.map((path) => `
    <path class="road-spine-shadow" d="${path.d}" />
    <path class="road-spine-main" d="${path.d}" />
  `).join("");
  const paths = visiblePaths.map((path) => {
    const routeClass = `branch-${String(path.routeId).toLowerCase()}`;
    const stateClass = path.routeId === "all" || path.routeId === focusRoute ? "selected" : "muted";
    const inspectedClass = activeBranchId === path.routeId ? "inspected" : "";
    const secondaryClass = path.secondary ? "secondary" : "primary";
    return `
      <g class="branch-path-group ${routeClass} ${stateClass} ${inspectedClass} ${secondaryClass}">
        <path class="branch-hit" d="${path.d}" data-branch-id="${path.routeId}" data-path-id="${path.id}" />
        <path class="branch-path-shadow" d="${path.d}" />
        <path class="branch-path-main" d="${path.d}" />
      </g>
    `;
  }).join("");
  return `
    <svg class="life-route-overlay" viewBox="0 0 100 100" aria-hidden="true">
      <g class="road-map-layer">
        ${mappingPaths}
      </g>
      ${paths}
    </svg>
  `;
}

function renderRoadAnchorLabels() {
  const markers = ROAD_ANCHOR_LABELS.map((marker) => {
    const point = ROAD_ANCHORS[marker.anchorId];
    if (!point) return "";
    return `
      <div
        class="road-anchor-marker"
        style="--x:${point.x}; --y:${point.y}; --dx:${marker.dx}px; --dy:${marker.dy}px;"
        aria-label="地图节点 ${marker.number}"
      >
        <span class="road-anchor-dot" aria-hidden="true"></span>
        <span class="road-anchor-badge">${marker.number}</span>
      </div>
    `;
  }).join("");
  return `<div class="map-anchor-labels" aria-label="地图节点编号">${markers}</div>`;
}

function renderMapRouteChoices(focusRoute) {
  return getRouteChoiceOptions(currentResult).map((choice) => {
    const position = MAP_ROUTE_CHOICE_POSITIONS[choice.id];
    if (!position) return "";
    const active = choice.id === focusRoute;
    const status = active ? ROUTE_STATUS_LABEL.viewing : ROUTE_STATUS_LABEL.option;
    return `
      <button
        class="map-route-choice branch-${String(choice.id).toLowerCase()} ${active ? "active" : ""}"
        type="button"
        data-route-id="${escapeHtml(choice.id)}"
        style="--x:${position.x}; --y:${position.y};"
        aria-label="${escapeHtml(`${status}${choice.title}`)}"
      >
        <span>${escapeHtml(status)}</span>
        <strong>${escapeHtml(choice.title)}</strong>
      </button>
    `;
  }).join("");
}

function renderVisualNodeButton(node) {
  const isActive = node.id === activeVisualNodeId;
  const branchClass = `branch-${String(node.branchId).toLowerCase()}`;
  const mutedClass = node.selectable ? "" : "muted";
  return `
    <button
      class="visual-node ${branchClass} ${node.recommended ? "recommended" : ""} ${mutedClass} ${isActive ? "active" : ""}"
      type="button"
      data-node-id="${escapeHtml(node.id)}"
      data-branch-id="${escapeHtml(node.branchId)}"
      style="--x:${node.x}; --y:${node.y};"
      aria-label="${escapeHtml(polishCopy(node.title))}"
      aria-disabled="${node.selectable ? "false" : "true"}"
      ${node.selectable ? "" : "disabled"}
    >
      <img src="${node.asset}" alt="" />
    </button>
  `;
}

function buildBranchDetail(result, branchId) {
  const { scores, features, states, readable } = result;
  const { yi, ji } = getYiJiText(result);
  if (branchId === "all") {
    return {
      kind: "branch",
      branchId,
      icon: "direction_choice",
      meta: "起点",
      title: "第一处岔口",
      body: "你当前在起点。未来的人生路漫长，可以先看每条路要承受什么。今天先看最亮的一枝，再保留一条备用路。",
      instructionTitle: "你现在面临的选择",
      instructionBody: "点路线或路标，看这条路适合什么、需要避开什么。"
    };
  }
  if (branchId === "YI") {
    return {
      kind: "branch",
      branchId,
      icon: "good_timing",
      meta: `上路 · 宜 · ${features.lifeContext.stageGeo.name}`,
      title: "宜走的上路",
      body: `宜：${yi}。这条路适合把局面往前推一格，但动作要轻。`,
      expandedBody: `上路代表顺势项。按今日天时，适合${yi}；先做能收口、能验证、能带来反馈的事，不急着开全局。`,
      instructionTitle: "宜走",
      instructionBody: `适合${yi}，先做一件能见回音的小事。`
    };
  }
  if (branchId === "ROOT") {
    return {
      kind: "branch",
      branchId,
      icon: "stability_anchor",
      meta: `左上路 · 补条件 · ${features.lifeContext.stageGeo.name}`,
      title: ROUTE_VISIBLE_LABEL.ROOT,
      body: "这条路偏向补基础。适合先补资源、补证据、补关系，再回主路。",
      expandedBody: "左上路代表回到基础。它不是最快的路，但能把后面的选择变稳；适合在火候未满时先补条件、打样、确认关键人。",
      instructionTitle: `当前信号：${ROUTE_VISIBLE_LABEL.ROOT}`,
      instructionBody: "先补基础，再向主路合流。"
    };
  }
  if (branchId === "JI") {
    return {
      kind: "branch",
      branchId,
      icon: "conflict_marker",
      meta: `下路 · 忌 · ${features.lifeContext.stageGeo.name}`,
      title: "忌走的下路",
      body: `忌：${ji}。这条路不是不能走，是今天阻力偏高。`,
      expandedBody: `下路代表消耗项。按今日天时，${ji}容易放大阻力；遇到催促、争执或高承诺，先降速，等信号清楚再动。`,
      instructionTitle: "忌走",
      instructionBody: `避开${ji}，不在气乱时做不可逆决定。`
    };
  }

  const routeSignal = ROUTE_MYSTIC[branchId] || ROUTE_MYSTIC[states.selectedRoute] || ROUTE_MYSTIC.A;
  const route = result.routes.find((item) => item.id === branchId);
  const isSelected = branchId === states.selectedRoute;
  const meta = `${isSelected ? "当前更适合先看" : "备选可能"} · ${routeSignal.title} · 当下这一段`;
  const branchBody = {
    A: `行动火候${scoreTone(scores.momentum)}，外部助力${scoreTone(scores.support)}。这条路重在开门，适合试合作、新身份或新入口，但不能一次押满。`,
    B: `基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，资源边界${scoreTone(scores.wealthSafety, "可用", "需守住", "偏紧")}。这条路重在稳住主线，把事业、钱和节奏先压稳。适合不急换局的人。`,
    C: `阻力${scoreTone(scores.risk, "偏重", "可控", "不重")}，基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}。这条路重在避冲，绕开不确定区，先保状态，再找合流口。`
  }[branchId] || readable.summary;

  return {
    kind: "branch",
    branchId,
    icon: routeSignal.icon,
    meta,
    title: routeSignal.title,
    body: branchBody,
    instructionTitle: `当前选择：${routeSignal.title}`,
    instructionBody: route?.action || routeSignal.body
  };
}

function buildMapSummaryDetail(result) {
  const selected = result.routes.find((route) => route.id === result.states.selectedRoute) || result.routes[0];
  const routeSignal = ROUTE_MYSTIC[result.states.selectedRoute] || ROUTE_MYSTIC.A;
  return {
    kind: "summary",
    avatarId: result.input.avatarId,
    meta: "当前状态",
    title: "你现在有两条路",
    body: `你现在面前有两种走法：抄小路走捷径，或者过桥走大路。命盘不是替你定线，而是把两种选择的机会、挑战和代价摊开。`,
    expandedBody: buildSummaryExpandedBody(result, selected, routeSignal),
    instructionTitle: "先选一条路",
    instructionBody: "先选眼前这一步，后面的节点会继续展开。"
  };
}

function getFocusedBranchId() {
  return FOCUSABLE_BRANCH_IDS.includes(activeBranchId) ? activeBranchId : selectedRoute;
}

function isInitialChoiceState() {
  return !activeVisualNodeId && topologyDepth <= 1;
}

function hasForwardChoiceState(routeId = getFocusedBranchId()) {
  return getVisibleJourneyNodeDefs(routeId).length > 0;
}

function isTerminalState() {
  return Boolean(activeVisualNodeId) && !hasForwardChoiceState(getFocusedBranchId());
}

function getSelectedJourneyPath(finalNodeId = activeVisualNodeId) {
  const path = [];
  let cursor = finalNodeId || "START";
  const seen = new Set();
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    const node = LIFE_JOURNEY_NODES.find((item) => item.id === cursor);
    if (node) path.unshift(node);
    cursor = TOPOLOGY_PARENT_BY_ID[cursor] || null;
  }
  const startNode = LIFE_JOURNEY_NODES.find((item) => item.id === "START");
  if (startNode && path[0]?.id !== "START") path.unshift(startNode);
  return path;
}

function buildInitialChoiceCopy(result, node) {
  const route = result.routes.find((item) => item.id === node.branchId);
  const routeSignal = ROUTE_MYSTIC[node.branchId] || ROUTE_MYSTIC.A;
  const isBright = node.branchId === result.states.selectedRoute;
  const signal = clampText(polishCopy(route?.cardLine || node.body || routeSignal.body), 16);
  const action = clampText(cleanAdviceText(route?.action || node.detail?.instructionBody || routeSignal.body), 18);
  const avoid = clampText(polishCopy(route?.avoid || (node.branchId === "A" ? "不一次押满" : "不急换方向")), 8);
  return {
    title: routeSignal.title,
    body: `${isBright ? "这一条更顺一点" : "这一条也能走"}：${signal}。适合：${action}；不宜：${avoid}。`
  };
}

function getRouteChoiceOptions(result) {
  const routeById = new Map(result.routes.map((route) => [route.id, route]));
  return ROUTE_CHOICE_ORDER.map((routeId) => {
    if (routeId === "ROOT") {
      return {
        id: "ROOT",
        title: ROUTE_VISIBLE_LABEL.ROOT,
        role: "条件支路",
        badge: "稳住基础",
        choice: "先补资源、证据和关键人",
        consequence: "后面更稳，但当下慢半拍",
        action: "先补基础，再向主路合流。",
        summary: "条件没齐时，先把基础补稳。",
        score: Math.round((result.scores.stability + result.scores.support) / 2)
      };
    }

    const route = routeById.get(routeId) || routeData?.routes?.find((item) => item.id === routeId);
    const signal = ROUTE_MYSTIC[routeId] || ROUTE_MYSTIC.A;
    const choice = {
      A: "小步试一个机会",
      B: "先把基础铺平",
      C: "绕开消耗，先保住状态"
    }[routeId];
    const consequence = {
      A: "机会更近，但容错更低",
      B: "节奏更稳，但会多绕一点",
      C: "消耗更低，但节奏更慢"
    }[routeId];

    return {
      id: routeId,
      title: signal.title,
      role: route?.name || signal.direction,
      badge: ROUTE_STATUS_LABEL.option,
      choice,
      consequence,
      action: route?.action || signal.body,
      summary: route?.cardLine || signal.body,
      score: route?.recommendScore || 0
    };
  });
}

function getRouteChoiceById(result, branchId = getFocusedBranchId()) {
  return getRouteChoiceOptions(result).find((choice) => choice.id === branchId) || getRouteChoiceOptions(result)[0];
}

function getLifeChoiceCopy(nodeId) {
  return LIFE_CHOICE_COPY[nodeId] || null;
}

function buildChoiceCardCopy(choice) {
  const copy = choice.choiceCopy || getLifeChoiceCopy(choice.id);
  const stageLabel = choice.detail?.stageLabel || "";
  const stageDetail = choice.detail?.stageDescription || "";
  const title = polishCopy(copy?.title || choice.detail?.choice || choice.title);
  const summary = polishCopy(copy?.summary || choice.body);
  const judge = polishCopy(copy?.judge || choice.detail?.choice || choice.body)
    .replace(/^你真正要判断的是[:：]?/, "")
    .replace(/^你要判断的是[:：]?/, "");
  const detail = polishStoryCopy([
    stageLabel,
    `为什么会有这个选择：${copy?.why || stageDetail || summary}`,
    `你要判断：${judge}`,
    `可能结果：${copy?.possible || "走顺了会打开下一段，走不顺也要保留选择权。"}`
  ].filter(Boolean).join("\n"));
  return { title, summary, detail };
}

function getVisibleChoiceCards(result, focusBranchId = getFocusedBranchId()) {
  return getVisualNodesForRoute(result, focusBranchId)
    .filter((node) => node.selectable)
    .slice(0, 2);
}

function buildChoiceContextSummary(result, detail, focusBranchId = getFocusedBranchId()) {
  const choices = getVisibleChoiceCards(result, focusBranchId);
  if (!activeVisualNodeId) {
    return "你现在面前有两种走法：抄小路走捷径，或过桥走大路。展开卡片，看机会、挑战和代价。";
  }
  if (!choices.length) {
    return `你已经走到「${detail.title || "终点"}」。这里不是新的选择，而是回看这条路径在未来 20 年更可能形成什么结果。`;
  }
  const titles = choices.map((choice) => buildChoiceCardCopy(choice).title);
  if (titles.length === 1) {
    return `你选了「${detail.title}」。下一步会进入「${titles[0]}」，这是这条路的阶段性结果。`;
  }
  return `你选了「${detail.title}」。接下来真正要判断的是：${titles[0]}，还是${titles[1]}。`;
}

function renderCards() {
  const focusBranchId = getFocusedBranchId();
  const initialChoiceState = isInitialChoiceState();
  const choices = getVisibleChoiceCards(currentResult, focusBranchId);
  const frontierChoiceState = choices.length > 0;
  routeSheet?.classList.toggle("choice-card-expanded", Boolean(expandedChoiceCardId));
  routeCards.setAttribute("aria-hidden", "false");
  routeCards.innerHTML = choices.map((choice) => {
    const active = choice.id === activeVisualNodeId;
    const expanded = expandedChoiceCardId === choice.id;
    const routeClass = `branch-${String(choice.branchId).toLowerCase()}`;
    const initialCopy = initialChoiceState ? buildInitialChoiceCopy(currentResult, choice) : null;
    const cardCopy = buildChoiceCardCopy(choice);
    const cardTitle = initialCopy?.title || cardCopy.title;
    const cardBody = initialCopy?.body || cardCopy.summary;
    return `
      <article class="route-choice ${routeClass} ${frontierChoiceState ? "frontier-choice-card" : ""} ${initialChoiceState ? "initial-choice-card" : ""} ${active ? "active" : ""} ${expanded ? "expanded" : ""}">
        <button
          class="route-choice-main"
          type="button"
          data-node-id="${escapeHtml(choice.id)}"
          aria-pressed="${active ? "true" : "false"}"
        >
          <strong>${escapeHtml(cardTitle)}</strong>
          <span class="choice-line">${escapeHtml(cardBody)}</span>
        </button>
        <button
          class="route-choice-more"
          type="button"
          data-detail-id="${escapeHtml(choice.id)}"
          aria-expanded="${expanded ? "true" : "false"}"
        >${expanded ? "收起" : "看原因"}</button>
        <p class="route-choice-detail">${escapeHtml(cardCopy.detail)}</p>
      </article>
    `;
  }).join("");

  routeCards.querySelectorAll(".route-choice-main").forEach((button) => {
    button.addEventListener("click", () => {
      const node = choices.find((item) => item.id === button.dataset.nodeId);
      activateVisualNode(node, focusBranchId);
    });
  });

  routeCards.querySelectorAll(".route-choice-more").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const detailId = button.dataset.detailId;
      expandedChoiceCardId = expandedChoiceCardId === detailId ? null : detailId;
      renderCards();
    });
  });
}

function getYiJiText(result) {
  const yi = normalizeAlmanacList(result.features.today.yi, "整理、沟通");
  const ji = normalizeAlmanacList(result.features.today.ji, "急进、争执");
  return { yi, ji };
}

function buildForwardJudgment(result, branchId = result.states.selectedRoute) {
  if (branchId === "ROOT") {
    return `${ROUTE_VISIBLE_LABEL.ROOT}：先补资源、证据和关键人，后面的分枝才稳。`;
  }
  if (!activeVisualNodeId) return "先看两种可能，再选眼前一步。";
  const detail = activeDetail || buildDetailForJourneyNodeId(activeVisualNodeId, branchId);
  return buildChoiceContextSummary(result, detail || {}, branchId);
}

function buildRoadConditionStandard(result, detail) {
  const { yi, ji } = getYiJiText(result);
  const selected = result.routes.find((route) => route.id === result.states.selectedRoute) || result.routes[0];
  const isNode = Boolean(detail.nodeId);
  const meta = detail.meta || (isNode ? "节点处境" : "当下处境");
  const summary = detail.body || selected.cardLine || result.readable.subhead;
  const detailText = buildNarrativeDetail(result, detail, selected);
  return {
    meta: polishCopy(meta),
    title: polishCopy(detail.title || result.readable.headline),
    situation: polishCopy(summary),
    yi: polishCopy(yi),
    ji: polishCopy(ji),
    detailText: polishStoryCopy(detailText)
  };
}

function buildSummaryExpandedBody(result, selected, routeSignal) {
  const reason = buildRouteReason(result);
  const next = cleanAdviceText(selected.action || routeSignal.body);
  return polishCopy(`为什么：${reason} 取舍：这不是让你不动，而是先保住主线，少做不可逆选择。 下一步：${next}`);
}

function buildExpandedAnalysis(result, detail, selected) {
  const reason = buildRouteReason(result, detail.branchId);
  const tradeoff = buildTradeoffText(result, detail);
  const next = cleanAdviceText(detail.instructionBody || selected.action || result.readable.subhead);
  return polishCopy(`为什么：${reason} 取舍：${tradeoff} 下一步：${next}`);
}

function buildNarrativeDetail(result, detail, selected) {
  const geo = result.features.lifeContext.stageGeo || getStageGeo(result.features.lifeContext.lifeStage);
  const routeSignal = ROUTE_MYSTIC[detail.branchId] || ROUTE_MYSTIC[result.states.selectedRoute] || ROUTE_MYSTIC.A;
  const title = polishCopy(detail.title || routeSignal.title || result.readable.headline);
  const encounter = getEncounterStory(result, detail);
  const method = getMethodStory(result, detail, selected);
  const reason = buildRouteReason(result, detail.branchId || result.states.selectedRoute);

  if (detail.kind === "summary") {
    return `你现在面前有两种走法：抄小路走捷径，或者过桥走大路。\n为什么会有这个选择：${reason}\n适合：${formatActionSentence(cleanAdviceText(selected.action || detail.instructionBody))}。\n不宜：把它当成固定命运，或一次把后面的分岔走完。\n这条路的意思：命盘给出的不是一条定线，而是当前阶段的决策树。`;
  }

  if (detail.nodeId) {
    const stageLine = detail.stageLabel ? `人生阶段：${detail.stageLabel}\n阶段含义：${detail.stageDescription || "这一段根据当前选择继续展开。"}\n` : "";
    const copy = detail.choiceCopy || getLifeChoiceCopy(detail.nodeId);
    return `${stageLine}你现在的选择：${copy?.title || title}。\n为什么会出现：${copy?.why || encounter}\n你要判断：${copy?.judge || "这一步是否值得继续投入时间、关系和资源。"}\n可能结果：${copy?.possible || "走顺了会打开下一段；走不顺也要保留选择权。"}\n适合：${formatActionSentence(method)}。\n不宜：急着定终局，或把还没确认的事说死。`;
  }

  return `你会遇到：${encounter}\n它提醒你：${buildTradeoffText(result, detail)}\n适合：${formatActionSentence(method)}。\n不宜：一次把话说死、钱压满或方向换尽。\n这条路的意思：先轻轻走一格，等信号更清楚，再决定是否合流、加速或绕开。`;
}

function formatActionSentence(value) {
  const text = polishCopy(value).replace(/[。.]$/, "");
  return /^(先|可|等|把|不|避开|绕开)/.test(text) ? text : `先${text}`;
}

function getEncounterStory(result, detail) {
  const { scores } = result;
  const id = detail.nodeId;
  const branchId = detail.branchId;
  const topologyNode = LIFE_JOURNEY_NODES.find((node) => node.id === id);
  if (topologyNode && /^(START|L1-|L2-|L3-|O\d)/.test(topologyNode.id)) {
    return `${topologyNode.title}这一格会把你带到「${topologyNode.choice}」。它不是固定命运，而是当前命盘信号落在这处路标上的解释。`;
  }
  if (id === "branch-root-foundation") return `资源、作息、现金流和日常节奏需要重新排稳。表面看只是小事，实际是在给后面的选择打地基。`;
  if (id === "branch-root-evidence") return `信息还不够完整，容易凭感觉做判断。你会想尽快得到结论，但真正缺的是事实、样板和可验证的凭据。`;
  if (id === "branch-root-keyperson") return `关键人的态度还没完全亮出来。谁能支持、谁能拍板、谁会拖慢进度，需要先看清。`;
  if (id === "branch-mainline") return `熟悉的主路仍然能承重，但也会有重复、琐碎和慢热。它考验的是耐心，不是爆发。`;
  if (id === "branch-opportunity") return `新的门会露出一点缝，可能是合作、身份、项目或关系上的入口。机会是真的，但窗口不一定很宽。`;
  if (id === "branch-detour") return `前面会有一点阻力，可能是情绪、流程或外部不确定。绕一下不是退，而是给自己保留余地。`;
  if (id === "branch-money") return `钱和承诺会变得敏感。资源边界${scoreTone(scores.wealthSafety, "可用", "需守住", "偏紧")}，越是想快点确认，越要看清退出口。`;
  if (id === "branch-relationship") return `关系桥面不算宽，话说重了容易变成误会，说轻了又可能没有回音。关键是先通气。`;
  if (id === "branch-risk") return `阻力${scoreTone(scores.risk, "偏重", "可控", "不重")}会让小事变重。催促、争执、高承诺，都可能把本来能过的坡变窄。`;
  if (id === "branch-support") return `外部助力${scoreTone(scores.support)}，支持有机会出现，但它更像一盏灯，不是替你走路的人。`;
  if (id === "branch-career") return `事业坡会要求你把支线收回主业。能不能走稳，取决于你是否做出可复用的成果。`;
  if (id === "branch-exit") return `前面的选择会逐渐合成一个出口。到这里，速度反而不是重点，重点是把走过的路收成自己的局。`;
  if (branchId === "ROOT") return `条件还没完全齐。资源、证据和关键关系都要补一补，否则后面每个岔口都会多一点摇晃。`;
  if (branchId === "A") return `行动火候${scoreTone(scores.momentum)}，外部助力${scoreTone(scores.support)}，会有门打开；但阻力仍在，不能把窗口当成定局。`;
  if (branchId === "B") return `基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，资源边界${scoreTone(scores.wealthSafety, "可用", "需守住", "偏紧")}，主路还能承重，但需要先稳节奏。`;
  if (branchId === "C") return `直线仍有不确定，绕行会慢，却能避开冲突和过度消耗。`;
  if (branchId === "YI") return `顺势项会比较亮，适合把局面往前推一小格，但不适合贪多。`;
  if (branchId === "JI") return `忌项会放大阻力。越是有人催你立刻决定，越要把速度降下来。`;
  return `基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，资源边界${scoreTone(scores.wealthSafety, "可用", "需守住", "偏紧")}，主路还能承重，但需要先稳节奏。`;
}

function getMethodStory(result, detail, selected) {
  const next = cleanAdviceText(detail.instructionBody || selected.action || result.readable.subhead);
  const id = detail.nodeId;
  const branchId = detail.branchId;
  const topologyNode = LIFE_JOURNEY_NODES.find((node) => node.id === id);
  if (topologyNode && /^(START|L1-|L2-|L3-|O\d)/.test(topologyNode.id)) {
    return topologyNode.choice;
  }
  if (id === "branch-root-foundation") return "先整理资源、作息和现金流，把今天能稳住的基础稳住";
  if (id === "branch-root-evidence") return "先补一条事实证据，做一个小样板，别急着靠直觉拍板";
  if (id === "branch-root-keyperson") return "先确认关键人的边界和态度，把话问清楚，再带着答案回主路";
  if (id === "branch-money") return "先做小额、可逆、能退出的动作，不把财务承诺一次放大";
  if (id === "branch-relationship") return "先递善意，只说一件事，不翻旧账，也不逼对方马上表态";
  if (id === "branch-risk") return "先停一拍，避开最容易起冲突的点，把不可逆决定往后放";
  if (id === "branch-support") return "先借一盏灯：问清目标、边界和对方能帮到哪里";
  if (id === "branch-career") return "先做出一个能交付的小成果，让支线回到可复用能力上";
  if (branchId === "ROOT") return "先补资源、补证据、确认关键人";
  if (branchId === "A") return "先低成本试一次窗口";
  if (branchId === "B") return "先把确定的事做完";
  if (branchId === "C") return "先绕开最耗力的一段，保住状态";
  if (branchId === "YI") return "做一件能收口、能验证、能带来反馈的小事";
  if (branchId === "JI") return "避开高承诺和正面冲突";
  return next;
}

function buildRouteReason(result, branchId = result.states.selectedRoute) {
  const { scores } = result;
  if (branchId === "A") return `行动火候${scoreTone(scores.momentum)}，外部助力${scoreTone(scores.support)}，有机会开门，但阻力仍要看。`;
  if (branchId === "B") return `基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，资源边界${scoreTone(scores.wealthSafety, "可用", "需守住", "偏紧")}，主路还能承重。`;
  if (branchId === "C") return `阻力${scoreTone(scores.risk, "偏重", "可控", "不重")}，基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，绕一下能保住后面的选择。`;
  if (branchId === "YI") return `今日宜项更利于轻推一格，适合做有反馈、能收口的事。`;
  if (branchId === "ROOT") return `基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}是当前承重点，先补基础能让后面的分枝更稳。`;
  if (branchId === "JI") return `今日忌项容易放大阻力，越急越容易把小事做重。`;
  return `基础条件${scoreTone(scores.stability, "偏稳", "可承重", "偏弱")}，资源边界${scoreTone(scores.wealthSafety, "可用", "需守住", "偏紧")}，先稳住主线更容易把局压稳。`;
}

function buildTradeoffText(result, detail) {
  if (detail.branchId === "A") return "试新机会可以走，但只适合低成本验证，不适合一次换盘。";
  if (detail.branchId === "B") return "走大路会慢一点，但更稳，适合把确定的事做扎实。";
  if (detail.branchId === "C") return "慢一点走会慢一点，但能避开冲突和过度消耗。";
  if (detail.branchId === "YI") return "宜路适合推进，不适合贪多；做一件能见回音的事就够。";
  if (detail.branchId === "ROOT") return "先补基础会慢，但能补底盘；适合火候未满时先加基础。";
  if (detail.branchId === "JI") return "忌路不是绝对不能走，而是今天阻力偏高，适合延后。";
  if (detail.nodeId) return "这个节点只代表一段路况，不是终局；先看要承受什么，再决定力度。";
  return "先选眼前这一步，再看后面的分岔。";
}

function cleanAdviceText(value) {
  const cleaned = String(value || "")
    .replace(/先点第\s*1\s*个节点[，,。]?/g, "")
    .replace(/再看三条主枝的代价和火候[，,。]?/g, "")
    .replace(/点主枝、机会枝或绕行枝，看.*?命理分析[，,。]?/g, "")
    .replace(/现在，约\s*\d+\s*岁[，,]?/g, "")
    .replace(/约\s*\d+\s*-\s*\d+\s*岁[，,]?/g, "")
    .replace(/约\s*\d+\s*岁以后[，,]?/g, "")
    .replace(/\s+/g, "")
    .replace(/。{2,}/g, "。")
    .replace(/^建议[:：]/, "");
  return polishCopy(cleaned)
    || "先做一件可控的小事，等反馈再加码。";
}

function renderDecisionBoard() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  const items = [
    { tone: "blue", label: "现在", title: selected.nowTitle, body: selected.nowBody },
    { tone: "green", label: "拿到", title: selected.gain, body: `${selected.gainBody} · ${scoreTone(selected.recommendScore, "很顺", "可走", "先观望")}` },
    { tone: "red", label: "消耗", title: selected.cost, body: selected.costBody }
  ];
  decisionBoard.innerHTML = items.map((item) => `
    <article class="decision-card ${item.tone}">
      <span>${escapeHtml(polishCopy(item.label))}</span>
      <strong>${escapeHtml(polishCopy(item.title))}</strong>
      <p>${escapeHtml(polishCopy(item.body))}</p>
    </article>
  `).join("");
}

function renderScores() {
  const items = [
    ["行动火候", currentResult.scores.momentum],
    ["基础稳度", currentResult.scores.stability],
    ["外部助力", currentResult.scores.support],
    ["阻力信号", currentResult.scores.risk]
  ];
  scoreStrip.innerHTML = items.map(([label, value]) => `<div class="score-pill"><span>${label}</span><strong>${scoreTone(value, "偏亮", "可用", "偏弱")}</strong></div>`).join("");
}

function renderDetail() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  const detail = activeDetail || buildMapSummaryDetail(currentResult) || selected.detail;
  const standard = buildRoadConditionStandard(currentResult, detail);
  const avatar = detail.avatarId ? AVATAR_OPTIONS.find((item) => item.id === detail.avatarId) : null;
  const icon = avatar
    ? renderAvatarToken(avatar, "detail-avatar")
    : detail.icon
      ? `<img src="${getIconAsset(detail.icon)}" alt="" />`
      : "";
  mapDetail.className = `map-detail ${detail.kind === "summary" ? "summary-detail" : "signal-detail"} ${detailExpanded ? "expanded" : ""}`;
  routeSheet?.classList.toggle("detail-expanded", detailExpanded);
  if (detailPeekButton) {
    detailPeekButton.textContent = detailExpanded ? "收起解读" : "详细解读";
    detailPeekButton.setAttribute("aria-expanded", String(detailExpanded));
  }
  mapDetail.innerHTML = `
    ${icon}
    <div class="detail-copy">
      <small>${escapeHtml(standard.meta)}</small>
      <strong>${escapeHtml(standard.title)}</strong>
      <span class="detail-body">${escapeHtml(standard.situation)}</span>
      <div class="detail-tags" aria-label="宜忌">
        <span><b>宜</b>${escapeHtml(standard.yi)}</span>
        <span><b>忌</b>${escapeHtml(standard.ji)}</span>
      </div>
      <p class="detail-expanded-body">${escapeHtml(standard.detailText)}</p>
    </div>
    <button class="detail-toggle" type="button" aria-expanded="${detailExpanded ? "true" : "false"}">${detailExpanded ? "收起" : "详解"}</button>
  `;
  mapDetail.querySelector(".detail-toggle")?.addEventListener("click", () => {
    detailExpanded = !detailExpanded;
    renderDetail();
  });
}

function renderInstruction() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  const detail = activeDetail || buildMapSummaryDetail(currentResult);
  const focusBranchId = getFocusedBranchId();
  const activeChoice = getRouteChoiceById(currentResult, focusBranchId);
  const recommendedChoice = getRouteChoiceById(currentResult, currentResult.states.selectedRoute);
  const isRecommendedFocus = focusBranchId === currentResult.states.selectedRoute;
  const initialChoiceState = isInitialChoiceState();
  const frontierChoiceState = hasForwardChoiceState(focusBranchId);
  const terminalState = isTerminalState();
  resultScreen?.classList.toggle("frontier-choice-result", frontierChoiceState);
  resultScreen?.classList.toggle("initial-choice-result", initialChoiceState);
  resultScreen?.classList.toggle("terminal-result", terminalState);
  routeSheet?.classList.toggle("frontier-choice", frontierChoiceState);
  routeSheet?.classList.toggle("initial-choice", initialChoiceState);
  routeSheet?.classList.toggle("terminal-result", terminalState);
  if (sheetLabel) sheetLabel.textContent = terminalState ? "未来总结" : "前路判断";
  if (choiceLockHint) {
    choiceLockHint.textContent = terminalState ? "这条路线已收束，可以预览完整未来报告。" : "选择不可回退，请按当下判断继续走。";
  }
  terminalReportCta?.classList.toggle("visible", terminalState);
  instructionTitle.textContent = polishCopy(detail.instructionTitle || (activeVisualNodeId ? "这处路标在说" : "路况提示"));
  instructionBody.textContent = polishCopy(detail.instructionBody || detail.body || selected.instructionBody);
  if (confidenceBadge) {
    confidenceBadge.textContent = "";
  }
  if (initialChoiceState) {
    resultOverline.textContent = "当下";
    resultHeadline.textContent = "你现在面临两个选择";
    resultSubline.textContent = "每张卡片都可以展开，看机会、挑战和代价。";
    selectedSummary.textContent = buildChoiceContextSummary(currentResult, detail, focusBranchId);
    verdictPill.textContent = "前路选择";
    verdictAction.textContent = "先看两种可能";
    verdictRisk.textContent = "选择不可回退";
    return;
  }
  if (terminalState) {
    resultOverline.textContent = "未来总结";
    resultHeadline.textContent = polishCopy(detail.title || currentResult.readable.headline);
    resultSubline.textContent = "这是一条未来 20 年的阶段回顾，20 年以后会进入新的分岔。";
    selectedSummary.textContent = polishCopy(`未来总结「${detail.title || activeChoice.title}」：${detail.stageLabel ? `${detail.stageLabel}。` : ""}${detail.body || "这条路已经收束，适合回看一路的选择和代价。"}`);
    verdictPill.textContent = "未来总结";
    verdictAction.textContent = polishCopy(detail.title || activeChoice.title);
    verdictRisk.textContent = "报告可预览";
    instructionTitle.textContent = "完整报告";
    instructionBody.textContent = "终点不是新选择，是对未来 20 年路径的总结。";
    window.setTimeout(maybeAutoOpenTerminalReport, 0);
    return;
  }
  resultOverline.textContent = "当下";
  resultHeadline.textContent = "下一步怎么选";
  resultSubline.textContent = polishCopy(buildForwardJudgment(currentResult, focusBranchId));
  selectedSummary.textContent = buildChoiceContextSummary(currentResult, detail, focusBranchId);
  verdictPill.textContent = "当前分岔";
  verdictAction.textContent = polishCopy(detail.title || activeChoice.title);
  verdictRisk.textContent = "选择不可回退";
}

function render() {
  renderMap();
  renderDecisionBoard();
  renderCards();
  renderScores();
  renderDetail();
  renderInstruction();
}

function renderReadableEvidence(result) {
  const evidenceCards = result.readable.evidence.map((item) => `
    <article class="evidence-card">
      <strong>${escapeHtml(polishCopy(item.title))}</strong>
      <p>${escapeHtml(polishCopy(item.body))}</p>
    </article>
  `).join("");
  return `
    <section class="evidence-summary">
      <strong>${escapeHtml(polishCopy(result.readable.headline))}</strong>
      <p>${escapeHtml(polishCopy(result.readable.subhead))}</p>
    </section>
    ${evidenceCards}
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
