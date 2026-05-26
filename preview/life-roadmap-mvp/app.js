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

const BASEMAP_STYLE_URL = "";
const USE_SYNTHETIC_BASE = true;

const HEADLINE_COPY = {
  smooth: ["窗口开，轻推进", "绿灯亮，别飘", "顺风段，小冲", "路开了，稳走", "借势，不贪快"],
  slow_climb: ["小步走，能到", "慢热，也有路", "稳住再进", "别急，路在", "先顺气，再动"],
  slow_climb_with_risk: ["先稳住，别抢", "前方有堵", "收一点更顺", "别硬闯", "慢行更稳"]
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
    A: { summary: "慢节奏", cardLine: "整理、收尾、复盘", action: "先做低风险事项，把手上事收清楚" },
    B: { summary: "追击窗口", cardLine: "只冲一个重点", action: "只追一个最有把握的机会，不要铺太多线" },
    C: { summary: "低压安排", cardLine: "补能、观察、少承诺", action: "把压力降下来，留一点空档给自己" }
  },
  career: {
    A: { summary: "小步推进", cardLine: "先交付可控部分", action: "先推进确定性最高的一小步" },
    B: { summary: "追击窗口", cardLine: "主动争取一次机会", action: "抓短窗口主动出手，但不要满速硬冲" },
    C: { summary: "先铺条件", cardLine: "补材料、等反馈", action: "先补关键条件，再决定是否加速" }
  },
  relationship: {
    A: { summary: "轻沟通", cardLine: "先释放善意", action: "用轻一点的方式联系，不逼对方表态" },
    B: { summary: "直接说重点", cardLine: "短句、明确、别拉扯", action: "只说一个重点，避免连续追问" },
    C: { summary: "先留空间", cardLine: "不催、不试探", action: "先把情绪放稳，晚一点再沟通" }
  },
  wealth: {
    A: { summary: "稳投路", cardLine: "小额、可撤、先验证", action: "只做小额可逆动作，先验证信息" },
    B: { summary: "追击路", cardLine: "有证据再加速", action: "机会明确才追击，不用情绪下单" },
    C: { summary: "观望路", cardLine: "先避坑、少承诺", action: "今天先看风险，不急着做不可逆承诺" }
  },
  mood: {
    A: { summary: "慢节奏", cardLine: "做一件能完成的小事", action: "先完成一个很小的任务，让状态回稳" },
    B: { summary: "短冲刺", cardLine: "只冲 25 分钟", action: "只做短冲刺，不把今天排满" },
    C: { summary: "绕开噪音", cardLine: "休整、断联、少输入", action: "先减少刺激，把能量留给自己" }
  },
  decision: {
    A: { summary: "先不大改", cardLine: "保留现路线", action: "先保留主路线，只做小幅调整" },
    B: { summary: "试探变道", cardLine: "追一个短窗口", action: "只试一个低成本窗口，不一次性转向" },
    C: { summary: "绕行观察", cardLine: "等信号更清楚", action: "先绕开不确定区，等信息更完整" }
  }
};

const ROUTE_COPY_VARIANTS = {
  general: {
    A: [
      { summary: "稳妥路", cardLine: "先清缓存", action: "先清一件小事，再开新局" },
      { summary: "慢起步", cardLine: "收尾优先", action: "先把手上事收住，别新开太多" },
      { summary: "稳住盘", cardLine: "先易后难", action: "从最容易完成的事开始" },
      { summary: "顺手路", cardLine: "做熟门事", action: "先做熟悉事项，把手感找回来" },
      { summary: "保底路", cardLine: "少承诺", action: "今天少开新坑，多做可交付" }
    ],
    B: [
      { summary: "追击路", cardLine: "只抢一灯", action: "抓最亮的窗口，别连闯三关" },
      { summary: "短冲刺", cardLine: "一口气做", action: "只冲一个重点，做完就收" },
      { summary: "抢窗口", cardLine: "快但别飘", action: "机会出现就动，动作要轻" },
      { summary: "直达线", cardLine: "别超速", action: "按最短路径推进，不额外加戏" },
      { summary: "快车道", cardLine: "单点突破", action: "只压一个关键动作，别分散" }
    ],
    C: [
      { summary: "绕行路", cardLine: "避开噪音", action: "绕开消耗点，把状态留住" },
      { summary: "低压路", cardLine: "少输入", action: "先降噪，再决定下一步" },
      { summary: "缓一缓", cardLine: "补能优先", action: "把能量补回来，别硬撑" },
      { summary: "观察路", cardLine: "等路况清", action: "等信号更明，再做选择" },
      { summary: "留白路", cardLine: "留点余地", action: "今天给自己留一个缓冲位" }
    ]
  },
  career: {
    A: [
      { summary: "先交付", cardLine: "交一小段", action: "先交可控部分，别憋大招" },
      { summary: "稳推进", cardLine: "先补闭环", action: "把已有任务闭环，再谈加速" },
      { summary: "打底路", cardLine: "资料补齐", action: "先补材料，减少被卡点" },
      { summary: "保节奏", cardLine: "小步过关", action: "今天按小里程碑推进" },
      { summary: "先落地", cardLine: "别空转", action: "把能落地的先落下去" }
    ],
    B: [
      { summary: "抢绿灯", cardLine: "主动开口", action: "窗口亮了就开口，但别超速" },
      { summary: "追机会", cardLine: "只追一个", action: "只争取一个明确机会" },
      { summary: "快推进", cardLine: "短线突破", action: "用短会、短稿、短动作推进" },
      { summary: "争一把", cardLine: "点到为止", action: "表达诉求，但别压迫局面" },
      { summary: "上坡冲", cardLine: "轻踩油门", action: "小幅加速，不要满速硬冲" }
    ],
    C: [
      { summary: "补路牌", cardLine: "等反馈", action: "先补关键条件，等对方回信号" },
      { summary: "绕卡点", cardLine: "避开硬碰", action: "绕开最卡的人和流程" },
      { summary: "先铺路", cardLine: "打底关系", action: "先铺沟通条件，再谈推进" },
      { summary: "慢变道", cardLine: "观察组织", action: "先看局势，不急着表态" },
      { summary: "低阻路", cardLine: "少开战线", action: "今天减少战线，保住主线" }
    ]
  },
  relationship: {
    A: [
      { summary: "递台阶", cardLine: "先给善意", action: "先递台阶，不逼答案" },
      { summary: "轻联系", cardLine: "短句就好", action: "发一句轻松的话，不追问" },
      { summary: "缓沟通", cardLine: "先顺情绪", action: "先让气氛松一点，再说正事" },
      { summary: "温和路", cardLine: "少下结论", action: "多描述感受，少做审判" },
      { summary: "开小窗", cardLine: "试探温度", action: "轻轻开个话口，看回应再走" }
    ],
    B: [
      { summary: "说重点", cardLine: "三句讲完", action: "只讲一个重点，不翻旧账" },
      { summary: "直球路", cardLine: "清楚但软", action: "说清需求，语气放软" },
      { summary: "破僵局", cardLine: "别绕太久", action: "如果要说，就直接说重点" },
      { summary: "明牌路", cardLine: "不给压力", action: "表达立场，但不给对方压迫感" },
      { summary: "快沟通", cardLine: "短平快", action: "短句沟通，别连续轰炸" }
    ],
    C: [
      { summary: "留白路", cardLine: "不催不试", action: "先留空间，别用试探换答案" },
      { summary: "降温路", cardLine: "晚点再说", action: "先把情绪放稳，晚点再沟通" },
      { summary: "退半步", cardLine: "少解读", action: "少脑补，先看真实回应" },
      { summary: "护边界", cardLine: "别追太紧", action: "把注意力收回来，别追太紧" },
      { summary: "避雷路", cardLine: "不翻旧账", action: "今天别翻旧账，先保气氛" }
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
      { summary: "追击路", cardLine: "证据再追", action: "证据明确再加速，不靠感觉" },
      { summary: "抢窗口", cardLine: "别梭哈", action: "只抓小窗口，别一次打满" },
      { summary: "快进路", cardLine: "设好刹车", action: "若要推进，先设退出条件" },
      { summary: "机会线", cardLine: "有把握再动", action: "只动自己看得懂的部分" },
      { summary: "短打路", cardLine: "见好就收", action: "短线动作要有止损和收口" }
    ],
    C: [
      { summary: "观望路", cardLine: "先避坑", action: "今天先避坑，不急着证明自己" },
      { summary: "绕风险", cardLine: "少冲动", action: "绕开高噪音选择" },
      { summary: "等明灯", cardLine: "信息未齐", action: "等信息更齐，再做判断" },
      { summary: "低仓路", cardLine: "留现金感", action: "给自己留回旋空间" },
      { summary: "停一停", cardLine: "不追涨跌", action: "今天别被涨跌牵着走" }
    ]
  },
  mood: {
    A: [
      { summary: "慢节奏", cardLine: "做一小事", action: "先完成一件很小的事" },
      { summary: "回稳路", cardLine: "先收心", action: "先把节奏放慢一点" },
      { summary: "轻任务", cardLine: "别排太满", action: "只安排能完成的任务" },
      { summary: "稳情绪", cardLine: "少做判断", action: "状态没稳前，少做大决定" },
      { summary: "小火候", cardLine: "温着来", action: "用小火慢慢把状态热起来" }
    ],
    B: [
      { summary: "短冲刺", cardLine: "二十五分", action: "只冲 25 分钟，别拉长战线" },
      { summary: "点火路", cardLine: "先动一下", action: "先动五分钟，看看状态" },
      { summary: "轻加速", cardLine: "不满格", action: "小幅加速，别把电耗光" },
      { summary: "开一格", cardLine: "只做重点", action: "只做一个重点任务" },
      { summary: "起步路", cardLine: "别催自己", action: "先起步，不要求满分" }
    ],
    C: [
      { summary: "降噪路", cardLine: "少输入", action: "减少刺激，把能量留给自己" },
      { summary: "绕开累", cardLine: "先补能", action: "避开消耗型场景" },
      { summary: "安静线", cardLine: "断开噪音", action: "先断开噪音源" },
      { summary: "保护路", cardLine: "别硬撑", action: "今天先保护状态" },
      { summary: "休整路", cardLine: "慢慢回电", action: "留一点空档，让状态回电" }
    ]
  },
  decision: {
    A: [
      { summary: "先不大改", cardLine: "保主路线", action: "保留主路线，只做小调整" },
      { summary: "稳车道", cardLine: "先看信号", action: "先看清信号，不急转向" },
      { summary: "守正路", cardLine: "别急表态", action: "今天先守住基本盘" },
      { summary: "慢决策", cardLine: "多留证据", action: "先补证据，再做判断" },
      { summary: "小调整", cardLine: "别一把梭", action: "只做低成本试探" }
    ],
    B: [
      { summary: "试变道", cardLine: "低成本试", action: "只试一个低成本窗口" },
      { summary: "追一段", cardLine: "试跑一小段", action: "先试跑，不直接换主路" },
      { summary: "抢机会", cardLine: "先设退路", action: "若要冲，先把退路设好" },
      { summary: "短变线", cardLine: "别连换道", action: "只变一次线，观察反馈" },
      { summary: "开窗口", cardLine: "不赌全局", action: "只开一个窗口，不赌全局" }
    ],
    C: [
      { summary: "绕行观察", cardLine: "等信号清", action: "绕开不确定区，等信号更清楚" },
      { summary: "延迟判断", cardLine: "明天再定", action: "今天先不定死" },
      { summary: "避开雾区", cardLine: "不硬选", action: "信息不够时，先别硬选" },
      { summary: "备用路", cardLine: "留回旋", action: "保留备选方案" },
      { summary: "慢看路", cardLine: "再问一句", action: "先多问一句，再决定方向" }
    ]
  }
};

const FAST_RISK_COPY_VARIANTS = [
  { summary: "欲速不达", fit: "看似直线，但容易堵。", cardLine: "直线可能堵", action: "先补关键条件，再提速", nowTitle: "先补条件", nowBody: "再看窗口", cost: "会堵", costBody: "容易堵" },
  { summary: "前方压车", fit: "快路不一定快，容错偏低。", cardLine: "快路有压车", action: "先降速观察，再决定是否追", nowTitle: "先降速", nowBody: "别抢灯", cost: "压车", costBody: "容错低" },
  { summary: "别抢红灯", fit: "窗口未稳，抢跑会卡。", cardLine: "抢跑易卡", action: "先把证据补齐，再向前压", nowTitle: "别抢灯", nowBody: "等信号亮", cost: "卡点", costBody: "容易反复" },
  { summary: "快线有雾", fit: "方向看着直，细节还不清。", cardLine: "雾里别冲", action: "先确认关键人和关键条件", nowTitle: "先看清", nowBody: "少变道", cost: "视野窄", costBody: "误判成本高" },
  { summary: "直线不香", fit: "绕一点，反而更快到。", cardLine: "绕点更稳", action: "先走可控路段，别硬抢直线", nowTitle: "别硬抢", nowBody: "走可控段", cost: "硬冲", costBody: "容易堵死" }
];

const RISK_LINE_VARIANTS = {
  high: ["别临时变道。", "别抢灯。", "先降速。", "别硬闯。", "等信号清。"],
  medium: ["别太快。", "少变道。", "先看清。", "别加戏。", "稳住手感。"],
  low: ["按计划推进。", "小步加速。", "顺着走。", "轻踩油门。", "抓住绿灯。"]
};

const OPPORTUNITY_LINE_VARIANTS = {
  high: ["可借外力", "有人帮路", "顺风可用", "可顺势推进", "有支援"],
  low: ["先补信息", "先看路牌", "先打底", "先问清楚", "先别满速"]
};

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
const shareButton = document.getElementById("shareButton");
const questionInput = document.getElementById("question");
const mapContainer = document.getElementById("lifeMap");
const mapLoading = document.getElementById("mapLoading");
const routeCards = document.getElementById("routeCards");
const mapDetail = document.getElementById("mapDetail");
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
let lifeMap = null;
let lifeMapLoaded = false;
let mapMarkers = [];
let mapHandlersBound = false;
let activeMapBase = [121.2, 31.56];
let runtimeContext = buildFallbackRuntimeContext();

document.getElementById("birthDate").setAttribute("max", toYmd(new Date()));
const runtimeContextReady = bootstrapRuntimeContext();
applyUrlParams(runtimeContextReady);

document.querySelectorAll(".quick-questions button").forEach((button) => {
  button.addEventListener("click", () => {
    questionInput.value = button.textContent.trim();
  });
});

function applyUrlParams(contextReady) {
  const params = new URLSearchParams(window.location.search);
  const bindings = {
    birthDate: "birthDate",
    birthTime: "birthTime",
    birthplace: "birthplace",
    gender: "gender",
    question: "question"
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const input = readInput();
    currentResult = generateLifeRoadmap(input);
    routeData = buildRouteData(currentResult);
    setMapBase(input.contextCity);
    selectedRoute = routeData.selectedRoute;
    activeDetail = routeData.routes.find((route) => route.id === selectedRoute).detail;
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
});

traceButton.addEventListener("click", () => {
  traceOutput.innerHTML = renderReadableEvidence(currentResult);
  tracePanel.classList.remove("hidden");
});

closeTrace.addEventListener("click", () => {
  tracePanel.classList.add("hidden");
});

shareButton.addEventListener("click", () => {
  shareToast.textContent = `${currentResult.readable.headline} · ${selectedSummary.textContent}`;
  shareToast.classList.remove("hidden");
  window.setTimeout(() => shareToast.classList.add("hidden"), 1800);
});

function readInput() {
  const birthDate = document.getElementById("birthDate").value;
  validateBirthDate(birthDate);
  const birthTime = document.getElementById("birthTime").value;
  const birthplace = document.getElementById("birthplace").value.trim() || "未知";
  const question = questionInput.value.trim() || "今天整体怎么样？";
  const contextCity = runtimeContext.city || inferDemoCity(runtimeContext.ipHash || runtimeContext.timezone);
  return {
    birthDate,
    birthTime,
    birthTimeKnown: Boolean(birthTime),
    birthplace,
    contextCity,
    contextSource: runtimeContext.source,
    runtimeContext,
    gender: document.getElementById("gender").value,
    question
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
    const response = await fetch("/api/context", { headers: { Accept: "application/json" } });
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
  const scores = computeScores(features, intent, input);
  const states = computeRouteStates(scores, intent);
  let routes = computeRouteOptions(scores, states, intent, input);
  states.selectedRoute = chooseRouteByFit(routes, scores, intent);
  states.templateId = states.selectedRoute === "C" ? "low_pressure_detour" : states.selectedRoute === "B" ? "fast_risky" : "steady_climb";
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
    const response = await fetch("/api/roadmap-copy", {
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
      currentResult.trace.copyLayer = { source: currentResult.copySource, model: "none", modelEndpoint: "/api/roadmap-copy" };
      return;
    }
    mergeModelCopy(copy);
    routeData = buildRouteData(currentResult);
    activeDetail = routeData.routes.find((route) => route.id === selectedRoute)?.detail || routeData.routes[0].detail;
    render();
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
      allowedRouteIds: ["A", "B", "C"],
      noMedicalLegalInvestmentGuarantee: true
    }
  };
}

function mergeModelCopy(copy) {
  currentResult.copySource = copy.source || "model";
  currentResult.copyModel = copy.model || "unknown";
  currentResult.trace.copyLayer = { source: currentResult.copySource, model: currentResult.copyModel, modelEndpoint: "/api/roadmap-copy" };
  currentResult.readable.headline = clampText(copy.headline, 8) || currentResult.readable.headline;
  currentResult.readable.subhead = clampText(copy.subline, 12) || currentResult.readable.subhead;
  currentResult.routes = currentResult.routes.map((route) => {
    const next = copy.routes.find((item) => item.id === route.id);
    if (!next) return route;
    return {
      ...route,
      summary: clampText(next.summary, 7) || route.summary,
      cardLine: clampText(next.cardLine, 10) || route.cardLine,
      action: clampText(next.action, 18) || route.action
    };
  });
}

function chooseRouteByFit(routes, scores, intent) {
  if (intent.domain === "mood") return "C";
  if (scores.risk >= 68 && scores.momentum < 70) return "C";
  if (scores.momentum >= 70 && scores.risk <= 58 && scores.support >= 52) return "B";
  return routes.reduce((best, route) => (route.recommendScore > best.recommendScore ? route : best), routes[0]).id;
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
  let selectedRoute = "A";
  if (scores.risk >= 72 || scores.stability < 46) selectedRoute = "A";
  else if (scores.momentum < 45 || intent.domain === "mood") selectedRoute = "C";
  else if (scores.momentum >= 76 && scores.stability >= 60 && scores.risk < 55) selectedRoute = "B";

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
    templateId: selectedRoute === "C" ? "low_pressure_detour" : selectedRoute === "B" ? "fast_risky" : "steady_climb",
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
  const aTag = states.selectedRoute === "A" ? "推荐" : "稳妥";
  const bTag = states.selectedRoute === "B" ? "推荐" : scores.risk > 62 ? "风险高" : "快速";
  const cTag = states.selectedRoute === "C" ? "推荐" : "低压";
  const laneLabel = getLaneLabel(states);
  const speedLabel = getSpeedLabel(states);
  const routeCopy = getQuestionRouteCopy(intent, input);
  const fastRiskCopy = getFastRiskCopy(input, intent, scores);
  return [
    {
      id: "A",
      name: "稳妥路",
      tag: aTag,
      summary: routeCopy.A.summary,
      fit: "不走最短线，先避开阻力。",
      cardLine: routeCopy.A.cardLine,
      gain: "稳达",
      cost: "多绕",
      action: routeCopy.A.action,
      avoid: "别全线开工",
      nowTitle: laneLabel,
      nowBody: speedLabel,
      gainBody: "最快到达",
      costBody: "少抢路",
      recommendScore: clampScore(68 + scores.stability * 0.18 - scores.risk * 0.08)
    },
    {
      id: "B",
      name: "快速路",
      tag: bTag,
      summary: scores.risk > 60 ? fastRiskCopy.summary : routeCopy.B.summary,
      fit: scores.risk > 60 ? fastRiskCopy.fit : "适合抓短窗口，不适合猛冲。",
      cardLine: scores.risk > 60 ? fastRiskCopy.cardLine : routeCopy.B.cardLine,
      gain: "直线",
      cost: scores.risk > 60 ? fastRiskCopy.cost : "窄路",
      action: scores.risk > 60 ? fastRiskCopy.action : routeCopy.B.action,
      avoid: "别硬冲",
      nowTitle: scores.risk > 60 ? fastRiskCopy.nowTitle : "小步加速",
      nowBody: scores.risk > 60 ? fastRiskCopy.nowBody : "不要满速",
      gainBody: "看似最快",
      costBody: scores.risk > 60 ? fastRiskCopy.costBody : "少变道",
      recommendScore: clampScore(44 + scores.momentum * 0.32 - scores.risk * 0.24 + scores.support * 0.08)
    },
    {
      id: "C",
      name: "绕行路",
      tag: cTag,
      summary: routeCopy.C.summary,
      fit: intent.domain === "mood" ? "先照顾状态，别把自己逼进窄路。" : "绕开消耗点，保留余力。",
      cardLine: routeCopy.C.cardLine,
      gain: "低压",
      cost: "慢热",
      action: routeCopy.C.action,
      avoid: "别逃避",
      nowTitle: "先降压",
      nowBody: "等状态回升",
      gainBody: "少内耗",
      costBody: "晚一点",
      recommendScore: clampScore(52 + Math.max(0, 62 - scores.momentum) * 0.28 + scores.risk * 0.12)
    }
  ];
}

function buildReadableResult(input, intent, features, scores, states, routes) {
  const selected = routes.find((route) => route.id === states.selectedRoute) || routes[0];
  const laneLabel = getLaneLabel(states);
  const speedLabel = getSpeedLabel(states);
  const seed = buildCopySeed(input, intent);
  const headline = pickVariant(HEADLINE_COPY[states.roadState] || HEADLINE_COPY.slow_climb, `${seed}|headline|${states.roadState}`);
  const grade = scores.risk >= 68 ? "慢行日" : scores.momentum >= 70 && scores.risk < 55 ? "开窗日" : "稳行日";
  const subhead = selected.cardLine;
  const riskLine =
    scores.risk >= 65
      ? pickVariant(RISK_LINE_VARIANTS.high, `${seed}|risk-high|${scores.risk}`)
      : scores.risk >= 52
        ? pickVariant(RISK_LINE_VARIANTS.medium, `${seed}|risk-medium|${scores.risk}`)
        : pickVariant(RISK_LINE_VARIANTS.low, `${seed}|risk-low|${scores.risk}`);
  const opportunityLine =
    scores.support >= 58
      ? pickVariant(OPPORTUNITY_LINE_VARIANTS.high, `${seed}|support-high|${scores.support}`)
      : pickVariant(OPPORTUNITY_LINE_VARIANTS.low, `${seed}|support-low|${scores.support}`);
  const relationCopy = {
    today_generates_me: "今日五行对你有补益，适合借外部支持。",
    i_generate_today: "你的状态容易被事务消耗，适合控制投入强度。",
    same: "你和今日气场同频，适合按熟悉节奏推进。",
    today_controls_me: "今日对你形成压力，越急越容易卡。",
    i_control_today: "你能主动处理局面，但要控制动作幅度。",
    neutral: "今日与个人底色关系中性，关键看问题本身。"
  }[features.relation];
  const yi = features.today.yi.slice(0, 3).join("、") || "整理、沟通、收尾";
  const ji = features.today.ji.slice(0, 3).join("、") || "急进、争执";
  const eventCopy = features.lifeContext.matchedEvents.length
    ? features.lifeContext.matchedEvents.map((event) => `${event.title}(${event.ageAtEvent}岁)`).join("、")
    : "暂无强匹配事件";

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
        title: "问题匹配",
        body: `你的问题被识别为「${intent.label}」，因此更重视${intent.riskSensitivity === "high" ? "风险控制和可逆性" : "行动节奏和情绪支撑"}。`
      },
      {
        title: "人生上下文",
        body: `${features.lifeContext.lifeStage}，匹配事件：${eventCopy}。地点层来自${getContextSourceLabel(input.contextSource)}，只做小幅权重。`
      },
      {
        title: "生成空间",
        body: buildPossibilityCopy(features.today.isoDate, intent, input.question)
      },
      {
        title: "多源状态",
        body: "已用 lunar-javascript、MapLibre、OpenFreeMap、重大事件库；BaziQA/MingLi-Bench 只用于评测，不直接生成用户结论。"
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
    A: { title: `A 稳妥路 · ${routes[0].tag}`, body: `${routes[0].fit}。收益：${routes[0].gain}；代价：${routes[0].cost}。` },
    B: { title: `B 快速路 · ${routes[1].tag}`, body: `${routes[1].fit}。收益：${routes[1].gain}；代价：${routes[1].cost}。` },
    C: { title: `C 绕行路 · ${routes[2].tag}`, body: `${routes[2].fit}。收益：${routes[2].gain}；代价：${routes[2].cost}。` }
  };

  return {
    current: { x: 42, y: 494, label: "当下" },
    destination: { x: 326, y: 82, label: "未来" },
    selectedRoute: selected,
    routes: [
      {
        ...routes[0],
        color: "#7DD3FC",
        instructionTitle: selected === "A" ? "现在就做：走 A 稳妥路" : "备选：A 稳妥路",
        instructionBody: routes[0].action,
        detail: routeDetails.A,
        points: [[42, 494], [86, 438], [134, 382], [168, 330], [206, 278], [238, 226], [278, 152], [326, 82]],
        segments: [
          { from: 0, to: 2, color: "#FBBF24", label: "当下：慢起步", labelAt: [104, 402], detail: { title: "当下：慢起步", body: `推进力 ${scores.momentum}，适合小步推进。` } },
          { from: 2, to: 4, color: scores.risk >= 60 ? "#FF6B6B" : "#7DD3FC", label: scores.risk >= 60 ? "风险段：别硬冲" : "路况：基本顺行", labelAt: [160, 328], detail: { title: scores.risk >= 60 ? "风险段：别硬冲" : "路况：基本顺行", body: `风险值 ${scores.risk}，由今日黄历、冲煞和稳定性共同影响。` } },
          { from: 4, to: 5, color: states.tunnelState === "near_exit" ? "#111827" : "#7DD3FC", label: states.tunnelState === "near_exit" ? "隧道末段" : "视野转清", labelAt: [218, 252], detail: { title: states.tunnelState === "near_exit" ? "隧道末段" : "视野转清", body: `稳定性 ${scores.stability}，支持度 ${scores.support}。` } },
          { from: 5, to: 7, color: "#34D399", label: "未来出口", labelAt: [282, 170], detail: { title: "未来出口", body: `支持度 ${scores.support}，适合在条件更清楚时推进。` } }
        ],
        annotations: [
          { x: 96, y: 454, label: laneLabel, icon: "lane", detail: { title: laneLabel, body: routes[0].action } },
          { x: 170, y: 300, label: scores.risk >= 60 ? "降速通过" : "稳速通过", icon: "warning", detail: { title: scores.risk >= 60 ? "降速通过" : "稳速通过", body: `风险值 ${scores.risk}。` } },
          { x: 256, y: 206, label: speedLabel, icon: "exit", detail: { title: speedLabel, body: "这是由推进力和风险共同决定的节奏建议。" } }
        ]
      },
      {
        ...routes[1],
        color: "#FF6B6B",
        instructionTitle: selected === "B" ? "现在就做：走 B 快速路" : "谨慎：B 快速路",
        instructionBody: routes[1].action,
        detail: routeDetails.B,
        points: [[42, 494], [94, 416], [166, 326], [224, 212], [326, 82]],
        annotations: [
          { x: 144, y: 360, label: "高风险变道", icon: "warning", detail: { title: "高风险变道", body: `变道判断：${laneLabel}` } },
          { x: 230, y: 234, label: "速度快，容错低", icon: "speed", detail: { title: "速度快，容错低", body: `稳定性 ${scores.stability}。` } }
        ]
      },
      {
        ...routes[2],
        color: "#C8A0F0",
        instructionTitle: selected === "C" ? "现在就做：走 C 绕行路" : "备选：C 绕行路",
        instructionBody: routes[2].action,
        detail: routeDetails.C,
        points: [[42, 494], [76, 520], [158, 520], [238, 470], [314, 314], [326, 82]],
        annotations: [
          { x: 160, y: 540, label: "低压休整", icon: "rest", detail: { title: "低压休整", body: intent.domain === "mood" ? "本次问题偏情绪支持，绕行路优先级提高。" : "用于状态不足时降低误判成本。" } },
          { x: 300, y: 338, label: "慢一点更稳", icon: "lane", detail: { title: "慢一点更稳", body: "速度不是唯一目标，稳定性也是路线依据。" } }
        ]
      }
    ],
    sharedAnnotations: [
      { x: 134, y: 370, label: `变道：${laneLabel}`, detail: { title: `变道：${laneLabel}`, body: "由风险值、稳定性和问题类型共同决定。" } },
      { x: 92, y: 476, label: "当下", detail: { title: "当下", body: result.readable.subhead } },
      { x: 278, y: 132, label: `下一步：${speedLabel}`, detail: { title: `下一步：${speedLabel}`, body: result.readable.opportunityLine } }
    ]
  };
}

function buildTrace(input, intent, features, scores, states, routes) {
  return {
    note: "本地 MVP 已接入 lunar-javascript。规则为 v1 产品验证版，需 Peter 审核后进入正式版本。",
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
      modelEndpoint: "/api/roadmap-copy"
    },
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
  return {
    age,
    lifeStage: age < 24 ? "探索期" : age < 36 ? "建立期" : age < 50 ? "承压期" : age < 65 ? "整合期" : "守成期",
    locationText,
    matchedEvents,
    eventWeight,
    hasMobilityEvent,
    hasRiskEvent
  };
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
    loopback_ip: "本地 IP 模拟",
    browser_fallback: "浏览器环境模拟"
  }[source] || "本地上下文";
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

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function pathFromPoints(points) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
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
  const width = Math.min(Math.max(text.length * 12 + 18, 76), 172);
  group.appendChild(createSvgElement("rect", {
    x: x - width / 2,
    y: y - 18,
    width,
    height: 28,
    rx: 7,
    fill: options.fill || "rgba(255,255,255,0.92)",
    stroke: options.stroke || "rgba(26,31,38,0.10)"
  }));
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
    if (routeId !== selectedRoute) setSelectedRoute(routeId, detail);
    else setActiveDetail(detail);
  });
}

function drawHitPath(points, routeId, detail, strokeWidth = 34) {
  const hit = createSvgElement("path", {
    d: pathFromPoints(points),
    fill: "none",
    stroke: "transparent",
    "stroke-width": strokeWidth,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "route-hit-area"
  });
  makeInteractive(hit, detail, routeId);
  svg.appendChild(hit);
}

function drawBaseMap() {
  svg.appendChild(createSvgElement("rect", { width: 390, height: 572, fill: "#F1F4EF" }));
  [[18, 28, 94, 94], [126, 30, 86, 82], [236, 30, 102, 96], [30, 154, 112, 82], [172, 142, 78, 108], [278, 162, 78, 78], [20, 282, 96, 92], [142, 278, 94, 84], [262, 292, 98, 108], [26, 412, 112, 94], [168, 404, 86, 96], [280, 442, 78, 74]].forEach(([x, y, width, height], index) => {
    svg.appendChild(createSvgElement("rect", { x, y, width, height, rx: 10, fill: index % 3 === 0 ? "#E8EEE8" : "#EDF1EA", opacity: 0.76 }));
  });
  ["M 12 132 L 370 132", "M 18 260 L 366 238", "M 18 398 L 372 380", "M 74 18 L 64 558", "M 148 18 L 136 558", "M 262 18 L 250 558", "M 338 18 L 328 558", "M 4 516 C 120 448 224 424 386 450", "M 6 74 C 102 168 210 164 382 116", "M 8 342 C 86 294 158 286 236 312 S 336 338 388 292"].forEach((d, index) => {
    svg.appendChild(createSvgElement("path", { d, fill: "none", stroke: index < 6 ? "#D9DED8" : "#C9D0C8", "stroke-width": index < 6 ? 3 : 5, "stroke-linecap": "round", opacity: index < 6 ? 0.8 : 0.56 }));
  });
}

function drawRoutes() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  routeData.routes.filter((route) => route.id !== selectedRoute).forEach((route) => {
    svg.appendChild(createSvgElement("path", { d: pathFromPoints(route.points), fill: "none", stroke: route.color, "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.34 }));
    const mid = route.points[Math.floor(route.points.length / 2)];
    drawPill(svg, `${route.id} ${route.name}`, mid[0], mid[1] - 16, { fill: "rgba(255,255,255,0.78)", textColor: route.color });
    drawHitPath(route.points, route.id, route.detail, 36);
  });

  svg.appendChild(createSvgElement("path", { d: pathFromPoints(selected.points), fill: "none", stroke: "rgba(10, 30, 58, 0.14)", "stroke-width": 21, "stroke-linecap": "round", "stroke-linejoin": "round" }));
  svg.appendChild(createSvgElement("path", { d: pathFromPoints(selected.points), fill: "none", stroke: "#fff", "stroke-width": 15, "stroke-linecap": "round", "stroke-linejoin": "round" }));

  if (selected.id === "A") {
    selected.segments.forEach((segment) => {
      const points = selected.points.slice(segment.from, segment.to + 1);
      svg.appendChild(createSvgElement("path", { d: pathFromPoints(points), fill: "none", stroke: segment.color, "stroke-width": 11, "stroke-linecap": "round", "stroke-linejoin": "round" }));
      if (segment.color === "#111827") svg.appendChild(createSvgElement("path", { d: pathFromPoints(points), fill: "none", stroke: "#020617", "stroke-width": 17, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.36 }));
      drawPill(svg, segment.label, segment.labelAt[0], segment.labelAt[1], { textColor: segment.color });
      drawHitPath(points, selected.id, segment.detail, 34);
    });
  } else {
    svg.appendChild(createSvgElement("path", { d: pathFromPoints(selected.points), fill: "none", stroke: selected.color, "stroke-width": 11, "stroke-linecap": "round", "stroke-linejoin": "round" }));
    drawHitPath(selected.points, selected.id, selected.detail, 36);
  }

  selected.annotations.forEach(drawAnnotation);
  if (selected.id === "A") {
    routeData.sharedAnnotations.forEach((annotation) => {
      const pill = drawPill(svg, annotation.label, annotation.x, annotation.y, { fill: "rgba(255,255,255,0.82)", textColor: "#333840", size: 11, weight: 720 });
      makeInteractive(pill, annotation.detail, selected.id);
    });
  }
}

function drawAnnotation(annotation) {
  const group = createSvgElement("g");
  group.appendChild(createSvgElement("circle", { cx: annotation.x, cy: annotation.y, r: 13, fill: "#15191F", opacity: 0.94 }));
  const icon = createSvgElement("text", { x: annotation.x, y: annotation.y + 5, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#fff" });
  icon.textContent = { lane: "↗", warning: "!", exit: "出", speed: "快", rest: "停" }[annotation.icon] || "•";
  group.appendChild(icon);
  svg.appendChild(group);
  makeInteractive(group, annotation.detail, selectedRoute);
  const pill = drawPill(svg, annotation.label, annotation.x + 52, annotation.y + 4, { size: 11, weight: 740 });
  makeInteractive(pill, annotation.detail, selectedRoute);
}

function drawMarkers() {
  const { current, destination } = routeData;
  const currentGroup = createSvgElement("g");
  currentGroup.appendChild(createSvgElement("circle", { cx: current.x, cy: current.y, r: 18, fill: "#fff", opacity: 0.96 }));
  currentGroup.appendChild(createSvgElement("circle", { cx: current.x, cy: current.y, r: 10, fill: "#7DD3FC" }));
  currentGroup.appendChild(createSvgElement("circle", { cx: current.x, cy: current.y, r: 4, fill: "#fff" }));
  svg.appendChild(currentGroup);
  makeInteractive(currentGroup, { title: "你在这里", body: "这里代表今日状态起点，不是地理位置。" }, selectedRoute);
  drawPill(svg, current.label, current.x + 62, current.y + 2, { fill: "rgba(125,211,252,0.14)", textColor: "#C8EAFF", stroke: "rgba(125,211,252,0.32)" });

  const flag = createSvgElement("g");
  flag.appendChild(createSvgElement("line", { x1: destination.x, y1: destination.y + 20, x2: destination.x, y2: destination.y - 18, stroke: "#34D399", "stroke-width": 4, "stroke-linecap": "round" }));
  flag.appendChild(createSvgElement("path", { d: `M ${destination.x} ${destination.y - 18} L ${destination.x + 28} ${destination.y - 8} L ${destination.x} ${destination.y + 2} Z`, fill: "#34D399" }));
  svg.appendChild(flag);
  makeInteractive(flag, { title: "今日目标：状态回升", body: "今天的目标是把状态推向更清楚、更稳定的位置。" }, selectedRoute);
  drawPill(svg, destination.label, destination.x - 64, destination.y - 18, { fill: "rgba(52,211,153,0.14)", textColor: "#BBF7D0", stroke: "rgba(52,211,153,0.32)" });
}

const BASE_BLOCKS = [[18, 28, 94, 94], [126, 30, 86, 82], [236, 30, 102, 96], [30, 154, 112, 82], [172, 142, 78, 108], [278, 162, 78, 78], [20, 282, 96, 92], [142, 278, 94, 84], [262, 292, 98, 108], [26, 412, 112, 94], [168, 404, 86, 96], [280, 442, 78, 74]];

const BASE_ROADS = [
  [[12, 132], [120, 132], [230, 132], [370, 132]],
  [[18, 260], [136, 252], [250, 246], [366, 238]],
  [[18, 398], [142, 390], [260, 386], [372, 380]],
  [[74, 18], [70, 188], [66, 372], [64, 558]],
  [[148, 18], [145, 190], [140, 380], [136, 558]],
  [[262, 18], [258, 186], [254, 374], [250, 558]],
  [[338, 18], [334, 190], [330, 378], [328, 558]],
  [[4, 516], [100, 470], [224, 424], [386, 450]],
  [[6, 74], [102, 168], [210, 164], [382, 116]],
  [[8, 342], [86, 294], [158, 286], [236, 312], [336, 338], [388, 292]]
];

const MAP_STYLE = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "life-background",
      type: "background",
      paint: { "background-color": "#0A0E1A" }
    }
  ]
};

function toLngLat(point) {
  return [activeMapBase[0] + point[0] * 0.0014, activeMapBase[1] - point[1] * 0.00115];
}

function routeBounds() {
  return [
    toLngLat([12, 552]),
    toLngLat([374, 26])
  ];
}

function setMapBase(city) {
  const cityText = String(city || "");
  const matched = Object.entries(CITY_COORDINATES).find(([name]) => cityText.includes(name));
  const center = matched ? matched[1] : CITY_COORDINATES[inferDemoCity(cityText)];
  activeMapBase = [center[0] - 0.27, center[1] + 0.33];
}

function inferDemoCity(seed) {
  return DEMO_CITY_POOL[stableHash(String(seed || "demo")) % DEMO_CITY_POOL.length];
}

function renderMap() {
  if (typeof maplibregl === "undefined") {
    mapContainer.innerHTML = '<div class="map-fallback">地图渲染器未加载</div>';
    return;
  }

  if (!lifeMap) {
    mapLoading.classList.remove("hidden");
    lifeMap = new maplibregl.Map({
      container: mapContainer,
      style: BASEMAP_STYLE_URL || MAP_STYLE,
      center: toLngLat([195, 286]),
      zoom: 11,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      dragRotate: false
    });
    lifeMap.touchZoomRotate.disableRotation();
    lifeMap.scrollZoom.disable();
    lifeMap.on("styleimagemissing", (event) => {
      if (lifeMap.hasImage(event.id)) return;
      lifeMap.addImage(event.id, { width: 1, height: 1, data: new Uint8Array([0, 0, 0, 0]) });
    });
    lifeMap.on("load", () => {
      lifeMapLoaded = true;
      hideBaseMapLabels();
      themeBaseMapLayers();
      ensureMapLayers();
      bindMapHandlers();
      updateMapData();
      lifeMap.fitBounds(routeBounds(), { padding: { top: 168, right: 38, bottom: 286, left: 38 }, duration: 0, maxZoom: 11.5 });
    });
    return;
  }

  lifeMap.resize();
  if (lifeMapLoaded) updateMapData();
}

function ensureSource(id, data) {
  const source = lifeMap.getSource(id);
  if (source) source.setData(data);
  else lifeMap.addSource(id, { type: "geojson", data });
}

function hideBaseMapLabels() {
  lifeMap.getStyle().layers
    .filter((layer) => layer.type === "symbol")
    .forEach((layer) => {
      lifeMap.setLayoutProperty(layer.id, "visibility", "none");
    });
}

function themeBaseMapLayers() {
  lifeMap.getStyle().layers.forEach((layer) => {
    if (layer.type === "background") {
      lifeMap.setPaintProperty(layer.id, "background-color", "#0A0E1A");
      return;
    }
    if (layer.type === "fill") {
      lifeMap.setPaintProperty(layer.id, "fill-color", "#111828");
      lifeMap.setPaintProperty(layer.id, "fill-opacity", 0.82);
      return;
    }
    if (layer.type === "line") {
      lifeMap.setPaintProperty(layer.id, "line-color", "#2A3A48");
      lifeMap.setPaintProperty(layer.id, "line-opacity", 0.72);
      return;
    }
    if (layer.type === "circle") {
      lifeMap.setPaintProperty(layer.id, "circle-color", "#202C42");
      lifeMap.setPaintProperty(layer.id, "circle-opacity", 0.78);
    }
  });
}

function ensureLayer(layer, beforeId) {
  if (!lifeMap.getLayer(layer.id)) lifeMap.addLayer(layer, beforeId);
}

function ensureMapLayers() {
  ensureSource("base-blocks", emptyFeatureCollection());
  ensureSource("base-roads", emptyFeatureCollection());
  ensureSource("routes-muted", emptyFeatureCollection());
  ensureSource("route-selected", emptyFeatureCollection());
  ensureSource("route-selected-hit", emptyFeatureCollection());

  if (USE_SYNTHETIC_BASE) {
    ensureLayer({
      id: "base-block-fill",
      type: "fill",
      source: "base-blocks",
      paint: { "fill-color": ["get", "color"], "fill-opacity": 0.72 }
    });
    ensureLayer({
      id: "base-block-line",
      type: "line",
      source: "base-blocks",
      paint: { "line-color": "#223047", "line-width": 1 }
    });
    ensureLayer({
      id: "base-road-line",
      type: "line",
      source: "base-roads",
      paint: {
        "line-color": "#2A3A48",
        "line-width": ["get", "width"],
        "line-opacity": 0.72,
        "line-blur": 0.2
      }
    });
  }
  ensureLayer({
    id: "routes-muted-line",
    type: "line",
    source: "routes-muted",
    paint: {
      "line-color": ["get", "color"],
      "line-width": 8,
      "line-opacity": 0.34
    },
    layout: { "line-cap": "round", "line-join": "round" }
  });
  ensureLayer({
    id: "routes-muted-hit",
    type: "line",
    source: "routes-muted",
    paint: {
      "line-color": "#000",
      "line-width": 34,
      "line-opacity": 0.01
    },
    layout: { "line-cap": "round", "line-join": "round" }
  });
  ensureLayer({
    id: "route-selected-shadow",
    type: "line",
    source: "route-selected",
    paint: {
      "line-color": "rgba(125, 211, 252, 0.26)",
      "line-width": 25,
      "line-blur": 3
    },
    layout: { "line-cap": "round", "line-join": "round" }
  });
  ensureLayer({
    id: "route-selected-white",
    type: "line",
    source: "route-selected",
    paint: { "line-color": "rgba(224, 232, 240, 0.84)", "line-width": 16 },
    layout: { "line-cap": "round", "line-join": "round" }
  });
  ensureLayer({
    id: "route-selected-line",
    type: "line",
    source: "route-selected",
    paint: {
      "line-color": ["get", "color"],
      "line-width": 11,
      "line-opacity": 0.98
    },
    layout: { "line-cap": "round", "line-join": "round" }
  });
  ensureLayer({
    id: "route-selected-hit-line",
    type: "line",
    source: "route-selected-hit",
    paint: {
      "line-color": "#000",
      "line-width": 36,
      "line-opacity": 0.01
    },
    layout: { "line-cap": "round", "line-join": "round" }
  });
}

function bindMapHandlers() {
  if (mapHandlersBound) return;
  mapHandlersBound = true;
  ["routes-muted-hit", "route-selected-hit-line"].forEach((layerId) => {
    lifeMap.on("mouseenter", layerId, () => {
      lifeMap.getCanvas().style.cursor = "pointer";
    });
    lifeMap.on("mouseleave", layerId, () => {
      lifeMap.getCanvas().style.cursor = "";
    });
  });
  lifeMap.on("click", "routes-muted-hit", (event) => {
    const routeId = event.features?.[0]?.properties?.routeId;
    const route = routeData.routes.find((item) => item.id === routeId);
    if (route) setSelectedRoute(route.id, route.detail);
  });
  lifeMap.on("click", "route-selected-hit-line", (event) => {
    const properties = event.features?.[0]?.properties || {};
    const route = routeData.routes.find((item) => item.id === properties.routeId);
    if (!route) return;
    const segmentIndex = Number(properties.segmentIndex);
    const detail = Number.isInteger(segmentIndex) && route.segments?.[segmentIndex]
      ? route.segments[segmentIndex].detail
      : route.detail;
    setActiveDetail(detail);
  });
}

function updateMapData() {
  if (USE_SYNTHETIC_BASE) {
    ensureSource("base-blocks", buildBlockFeatures());
    ensureSource("base-roads", buildBaseRoadFeatures());
  }
  ensureSource("routes-muted", buildMutedRouteFeatures());
  ensureSource("route-selected", buildSelectedRouteFeatures());
  ensureSource("route-selected-hit", buildSelectedHitFeatures());
  renderMapMarkers();
  mapLoading.classList.add("hidden");
}

function buildBlockFeatures() {
  return {
    type: "FeatureCollection",
    features: BASE_BLOCKS.map(([x, y, width, height], index) => ({
      type: "Feature",
      properties: { color: index % 3 === 0 ? "#111828" : "#141C2E" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          toLngLat([x, y]),
          toLngLat([x + width, y]),
          toLngLat([x + width, y + height]),
          toLngLat([x, y + height]),
          toLngLat([x, y])
        ]]
      }
    }))
  };
}

function buildBaseRoadFeatures() {
  return {
    type: "FeatureCollection",
    features: BASE_ROADS.map((points, index) => ({
      type: "Feature",
      properties: { width: index < 6 ? 2.5 : 4.5 },
      geometry: { type: "LineString", coordinates: points.map(toLngLat) }
    }))
  };
}

function buildMutedRouteFeatures() {
  return {
    type: "FeatureCollection",
    features: routeData.routes
      .filter((route) => route.id !== selectedRoute)
      .map((route) => routeFeature(route, { color: route.color }))
  };
}

function buildSelectedRouteFeatures() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  if (selected.id !== "A") {
    return { type: "FeatureCollection", features: [routeFeature(selected, { color: selected.color })] };
  }
  return {
    type: "FeatureCollection",
    features: selected.segments.map((segment, index) => ({
      type: "Feature",
      properties: { routeId: selected.id, segmentIndex: index, color: segment.color },
      geometry: {
        type: "LineString",
        coordinates: selected.points.slice(segment.from, segment.to + 1).map(toLngLat)
      }
    }))
  };
}

function buildSelectedHitFeatures() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  if (selected.id !== "A") {
    return { type: "FeatureCollection", features: [routeFeature(selected, { color: selected.color })] };
  }
  return {
    type: "FeatureCollection",
    features: selected.segments.map((segment, index) => ({
      type: "Feature",
      properties: { routeId: selected.id, segmentIndex: index },
      geometry: {
        type: "LineString",
        coordinates: selected.points.slice(segment.from, segment.to + 1).map(toLngLat)
      }
    }))
  };
}

function routeFeature(route, properties = {}) {
  return {
    type: "Feature",
    properties: { routeId: route.id, color: route.color, ...properties },
    geometry: { type: "LineString", coordinates: route.points.map(toLngLat) }
  };
}

function renderMapMarkers() {
  clearMapMarkers();
  const selected = routeData.routes.find((route) => route.id === selectedRoute);

  routeData.routes.filter((route) => route.id !== selectedRoute).forEach((route) => {
    const mid = route.points[Math.floor(route.points.length / 2)];
    addMapMarker(mid, markerElement(route.id, "route-chip"), route.detail, route.id);
  });

  selected.annotations.forEach((annotation) => {
    addMapMarker([annotation.x, annotation.y], annotationElement(annotation), annotation.detail, selected.id);
  });

  addMapMarker([routeData.current.x, routeData.current.y], currentMarkerElement(), { title: "你在这里", body: "这里代表今日状态起点，不是地理位置。" }, selected.id);
  addMapMarker([routeData.current.x + 54, routeData.current.y + 2], markerElement("当下", "current-label"), { title: "当下", body: "今日状态起点。" }, selected.id);
  addMapMarker([routeData.destination.x, routeData.destination.y], destinationMarkerElement(), { title: "未来", body: currentResult.readable.subhead }, selected.id);
  addMapMarker([routeData.destination.x - 48, routeData.destination.y - 20], markerElement("未来", "destination-label"), { title: "未来", body: currentResult.readable.subhead }, selected.id);
}

function addMapMarker(point, element, detail, routeId = selectedRoute) {
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    if (routeId !== selectedRoute) setSelectedRoute(routeId, detail);
    else setActiveDetail(detail);
  });
  const marker = new maplibregl.Marker({ element, anchor: "center" }).setLngLat(toLngLat(point)).addTo(lifeMap);
  mapMarkers.push(marker);
}

function clearMapMarkers() {
  mapMarkers.forEach((marker) => marker.remove());
  mapMarkers = [];
}

function markerElement(text, className) {
  const element = document.createElement("button");
  element.className = `map-marker ${className}`;
  element.type = "button";
  element.textContent = text;
  return element;
}

function annotationElement(annotation) {
  const element = document.createElement("button");
  element.className = "map-marker annotation-marker";
  element.type = "button";
  const icon = { lane: "↗", warning: "!", exit: "出", speed: "快", rest: "停" }[annotation.icon] || "•";
  element.innerHTML = `<span>${icon}</span><strong>${annotation.label}</strong>`;
  return element;
}

function currentMarkerElement() {
  const element = document.createElement("button");
  element.className = "map-marker current-dot";
  element.type = "button";
  element.setAttribute("aria-label", "你在这里");
  element.innerHTML = "<span></span>";
  return element;
}

function destinationMarkerElement() {
  const element = document.createElement("button");
  element.className = "map-marker destination-flag";
  element.type = "button";
  element.setAttribute("aria-label", "今日目标");
  element.innerHTML = "<span></span>";
  return element;
}

function emptyFeatureCollection() {
  return { type: "FeatureCollection", features: [] };
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
      <strong><span>${route.id} ${route.name}</span><em>${route.tag}</em></strong>
      <span class="route-fit">${route.summary}</span>
      <span class="route-tradeoff">${route.cardLine}</span>
    `;
    card.addEventListener("click", () => setSelectedRoute(route.id, route.detail));
    routeCards.appendChild(card);
  });
}

function renderDecisionBoard() {
  const selected = routeData.routes.find((route) => route.id === selectedRoute);
  const items = [
    { tone: "blue", label: "现在", title: selected.nowTitle, body: selected.nowBody },
    { tone: "green", label: "拿到", title: selected.gain, body: `${selected.gainBody} · 适配 ${selected.recommendScore}` },
    { tone: "red", label: "消耗", title: selected.cost, body: selected.costBody }
  ];
  decisionBoard.innerHTML = items.map((item) => `
    <article class="decision-card ${item.tone}">
      <span>${item.label}</span>
      <strong>${item.title}</strong>
      <p>${item.body}</p>
    </article>
  `).join("");
}

function renderScores() {
  const items = [
    ["行动火候", currentResult.scores.momentum],
    ["底盘稳度", currentResult.scores.stability],
    ["顺风助力", currentResult.scores.support],
    ["堵点指数", currentResult.scores.risk]
  ];
  scoreStrip.innerHTML = items.map(([label, value]) => `<div class="score-pill"><span>${label}</span><strong>${value}</strong></div>`).join("");
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
  confidenceBadge.textContent = currentResult.features.confidence === "standard" ? "已用时辰" : "基础判断";
  resultOverline.textContent = currentResult.intent.label;
  resultHeadline.textContent = currentResult.readable.headline;
  resultSubline.textContent = currentResult.readable.subhead;
  verdictPill.textContent = currentResult.readable.grade;
  verdictAction.textContent = currentResult.readable.actionNow;
  verdictRisk.textContent = currentResult.readable.riskLine;
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
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `).join("");
  return `
    <section class="evidence-summary">
      <strong>${escapeHtml(result.readable.headline)}</strong>
      <p>${escapeHtml(result.readable.subhead)}</p>
    </section>
    ${evidenceCards}
    <details class="technical-trace">
      <summary>技术 Trace</summary>
      <pre>${escapeHtml(JSON.stringify(result.trace, null, 2))}</pre>
    </details>
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
