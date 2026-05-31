const personas = [
  {
    id: "rules",
    gender: {
      male: {
        name: "先立规矩",
        line: "看起来在敬酒，其实在审酒。",
        attitude: "礼数可以有，酒精要过审。",
        behavior: "他先把自己喝什么、喝多少、怎么敬讲清楚，再开始进入社交。",
        risk: "对方用身份压人，说这杯必须给面子。",
        detail: "你接受礼数，但不接受别人临时修改边界。你会先处理局面，再处理酒杯。",
        advice: "开局就声明边界，把酒换成茶或饮料，并给出一个正式祝词。",
        mingli: "日主偏强，表达星可用，有规则感，也能借桌面共识挡酒。",
        tags: ["先讲规则", "不喝但有礼", "桌面控场"]
      },
      female: {
        name: "冷脸盖章",
        line: "脸上没表情，桌上全是红章。",
        attitude: "她不吵，她直接判定不通过。",
        behavior: "她用冷静冻结局面。酒杯还没递到手里，边界已经盖章。",
        risk: "长辈或领导用玩笑包装命令。",
        detail: "这种人格靠稳定感赢。越冷静，对方越难继续装成玩笑。",
        advice: "先给一句礼貌祝福，再把边界说死。温度可以有，口子不能留。",
        mingli: "日主偏强，边界稳定，印星或比劫能帮她把个人边界变成桌面规则。",
        tags: ["冷脸拒收", "边界稳定", "不接情绪"]
      }
    }
  },
  {
    id: "seal",
    gender: {
      male: {
        name: "封杯保命",
        line: "人还在桌上，杯口已经封死。",
        attitude: "先堵入口，再谈感情。",
        behavior: "他不会等别人开始劝，才临时找理由。他会提前把杯子换掉。",
        risk: "第一轮集体举杯，所有人盯着杯口。",
        detail: "这种人格最强的是预判。他把可被劝酒的空间提前压到最小。",
        advice: "只给一个理由，比如开车、用药、早起或今天只喝茶。不要解释太多。",
        mingli: "日主有边界，预防意识强，印星能提供合理理由。",
        tags: ["提前封口", "茶杯上线", "拒绝入口"]
      },
      female: {
        name: "杯口结界",
        line: "看起来很软，杯子外面有空气墙。",
        attitude: "温柔也有边界。",
        behavior: "她不硬顶，但会让酒杯自然靠不过来。",
        risk: "对方反复说只抿一口。",
        detail: "这种人格的拒绝方式很密封。别人很难找到突破口。",
        advice: "固定一个理由，重复这个理由。不要给对方逐条反驳的空间。",
        mingli: "边界感强，印星可用，撤离倾向明显。",
        tags: ["温柔封杯", "空气墙", "只喝茶"]
      }
    }
  },
  {
    id: "smash",
    image: "../../assets/generated/bujingjiu-v2/persona_smash_cup_confrontation.png",
    gender: {
      male: {
        name: "摔杯刚正面",
        line: "平时不响，一响全桌静音。",
        attitude: "别劝第三次，第三次就是事故。",
        behavior: "他会圆场，但不想把时间浪费在反复解释上。一旦越线，他会用最短的话把这一轮停掉。",
        risk: "连续三次被点名起哄。",
        detail: "这种人格的边界很硬。前两次他可能还能客气，第三次开始，酒桌气氛会被他直接切断。",
        advice: "把硬话提前软化。先说清楚“我今天不喝”，再补一句祝词，不要等怒气满格才开口。",
        mingli: "日主偏强，表达星明显，边界感强，外部缓冲少。",
        tags: ["刚正面", "别劝第三次", "当场停机"]
      },
      female: {
        name: "红线反击",
        line: "笑可以，越线不行。",
        attitude: "她边界清楚，红线很近。",
        behavior: "前面可以客气，踩线后就只剩红线。她会直接让对方停下。",
        risk: "被人说不给面子、不合群。",
        detail: "这种人格能接受正常互动，但不能接受道德绑架。一旦对方用面子压她，她会立刻亮线。",
        advice: "先判断对方是无心还是强压。无心轻挡，强压再亮红线。",
        mingli: "日主强，金火信号明显，个人控场强，外部缓冲少。",
        tags: ["红线警告", "直接反击", "不吃绑架"]
      }
    }
  },
  {
    id: "exit",
    gender: {
      male: {
        name: "冷脸退场",
        line: "人还在座位，系统已经退出。",
        attitude: "不被尊重，就不参与。",
        behavior: "他不爱解释，也不想教育别人。局面不对，就把自己移出去。",
        risk: "对方开始逐个围攻。",
        detail: "你不追求赢，也不愿意留在不尊重边界的场合。",
        advice: "给一次明确解释，再给一次体面出口。第二次之后不要继续辩论。",
        mingli: "日主强，边界感强，外部支持弱，撤离信号强。",
        tags: ["冷脸", "不解释", "直接退场"]
      },
      female: {
        name: "静音退场",
        line: "没有吵架，只是突然不在局里。",
        attitude: "她不解释，她淡出。",
        behavior: "她不给冲突加戏，也不给劝酒机会。",
        risk: "对方把她推到桌面中心。",
        detail: "她的强硬体现在退出。能理解就继续，不能理解就离开。",
        advice: "离开前留一句体面话。祝福到了，酒不喝，大家继续开心。",
        mingli: "日主强，撤离信号明显，预防意识强。",
        tags: ["静音", "淡出", "不被围攻"]
      }
    }
  },
  {
    id: "allies",
    gender: {
      male: { name: "拉人挡酒", line: "一个人不喝，能变成一桌不劝。", attitude: "把个人边界变成桌面共识。", behavior: "他会找同盟、立桌规，让别人也开始反劝酒。", risk: "有人试图把他单独拎出来喝。", detail: "他不单打独斗。他知道酒桌压力来自群体，所以用群体反过来化解压力。", advice: "提前找一个同桌做支点，让“我不喝”变成“我们不劝酒”。", mingli: "日主不弱，比劫和印星可借，后段控场能力强。", tags: ["找同盟", "桌面共识", "反劝酒"] },
      female: { name: "组团反劝", line: "她不挡酒，她组织反劝酒。", attitude: "气氛不是拿来逼人的。", behavior: "她让身边人一起改变氛围，最后变成大家劝别人别劝。", risk: "同桌没人先开口帮忙。", detail: "她会把个人拒酒变成群体规则。别人劝她，最后压力回到劝酒的人身上。", advice: "提前找一个同桌说好帮忙挡，不要等压力围上来。", mingli: "印比能借，合多于冲，适合借外部资源挡酒。", tags: ["组队", "反向挡酒", "不单扛"] }
    }
  },
  {
    id: "flash",
    gender: {
      male: { name: "借口闪现", line: "电话一响，人设消失。", attitude: "能撤就撤，不正面耗。", behavior: "他先陪一轮，压力太重就借电话、工作或洗手间撤出。", risk: "被安排坐在主劝酒人旁边。", detail: "他会拒绝，但不想把边界摊开对抗。", advice: "准备一个真实、短、不可讨论的撤离理由。", mingli: "官杀压力较强，印星可用，撤离信号强。", tags: ["电话救命", "快速闪现", "不硬耗"] },
      female: { name: "洗手间遁走", line: "刚刚还在点头，下一秒只剩虚线。", attitude: "礼貌存在，迅速撤离。", behavior: "她先保住场面，再用外部理由离开压力中心。", risk: "被要求逐桌敬酒。", detail: "她少用对抗，更多靠脱身。", advice: "撤离理由要真实、简短、不可继续讨论。", mingli: "官杀压力强，印比可借，撤离倾向重。", tags: ["洗手间", "虚线消失", "保全面子"] }
    }
  },
  {
    id: "takeover",
    gender: {
      male: { name: "反客控桌", line: "被劝急了，直接接管节目单。", attitude: "酒局失控，就换节目。", behavior: "他把拼酒改成吃菜、聊天、敬茶或下一环节。", risk: "气氛开始只剩拼酒。", detail: "他的拒酒方式是重新编排桌面。", advice: "用提议代替命令，比如“这轮改成一起吃菜”。", mingli: "日主有根，食伤后劲强，个人控场能力强。", tags: ["控桌", "改流程", "茶壶接管"] },
      female: { name: "改局成茶", line: "看起来在配合，其实在改规则。", attitude: "这桌可以热闹，但不靠酒。", behavior: "她把酒桌从比酒量改成比体面。", risk: "有人用热闹绑架所有人。", detail: "她懂气氛，也知道气氛不必靠酒撑起来。", advice: "让对方觉得这是他的台阶，而不是被抢主导权。", mingli: "食伤后段发力，外部支持弱但控场强。", tags: ["改规则", "茶局", "不靠酒热闹"] }
    }
  },
  {
    id: "offline",
    gender: {
      male: { name: "当场断联", line: "劝到最后，只剩关机界面。", attitude: "不解释到你满意。", behavior: "他前面会忍，忍完就直接断联。", risk: "被反复追问为什么不喝。", detail: "他不愿意把拒绝解释成辩论题。问到最后，他会直接关机。", advice: "准备一句终止语：我已经说清楚了，这轮到这里。", mingli: "有边界，但官杀压力强，外部支持弱，撤离信号强。", tags: ["断联", "不解释", "关机"] },
      female: { name: "静音下线", line: "她把酒桌信号关了。", attitude: "越逼，越收回。", behavior: "她沉默、收回、停止回应，不再接收劝酒信息。", risk: "对方要求她解释到满意为止。", detail: "她有话说，但不想继续解释给不尊重边界的人听。", advice: "在沉默前先给终止句，不要让对方猜她的极限。", mingli: "边界存在，官杀压力强，撤离信号强。", tags: ["静音", "断网", "不再接收"] }
    }
  },
  {
    id: "redirect",
    gender: {
      male: { name: "笑着转移", line: "看起来在圆场，其实在删酒精剧情。", attitude: "气氛我来，酒不必来。", behavior: "他用拍照、点菜、讲段子把酒杯从主线里移走。", risk: "全桌等他带气氛。", detail: "他少用硬拒绝，直接让喝酒失去热闹证明的资格。", advice: "转场后补一句边界：我今天就喝茶，气氛我来补。", mingli: "日主不强，食伤可用，印比可借，木火带动场面。", tags: ["圆场", "转移", "删酒精剧情"] },
      female: { name: "圆场转移", line: "一边笑，一边把劝酒挪走。", attitude: "会换轨，不硬顶。", behavior: "她用拍照、点菜、聊天把酒杯转移。", risk: "对方把劝酒伪装成玩笑。", detail: "她顺着气氛，不等于默认喝酒。她在悄悄换轨道。", advice: "每次转场后补一句边界，不要只靠气氛解决问题。", mingli: "日主偏软，食伤可用，预防和控场信号都有。", tags: ["转场", "拍照", "不接玩笑"] }
    }
  },
  {
    id: "tea",
    gender: {
      male: { name: "以茶代酒", line: "礼数满格，酒精缺席。", attitude: "敬意留下，酒拿掉。", behavior: "他把敬意和喝酒拆开。茶端得很稳，边界也端得很稳。", risk: "对方强调不喝就是不尊重。", detail: "他不否定对方，也不牺牲自己。正式场合尤其适用。", advice: "把祝词说完整，让茶成为正式动作。", mingli: "日主偏软，印星可用，预防意识强。", tags: ["茶替酒", "礼数满格", "不伤面子"] },
      female: { name: "端茶不喝", line: "祝福很足，杯里没酒。", attitude: "她给面子，但不给酒精入口。", behavior: "她以茶代酒，完成礼数后撤出压力。", risk: "正式场合需要她回应祝酒。", detail: "她能让别人感觉被尊重，同时不把边界交出去。", advice: "祝词完整，动作正式，不要把茶说成凑合。", mingli: "印星可用，礼数感强，撤离倾向存在。", tags: ["端茶", "祝福不打折", "酒精缺席"] }
    }
  },
  {
    id: "return",
    gender: {
      male: { name: "礼貌退回", line: "人情签收，酒精退货。", attitude: "谢谢，但这杯我不收。", behavior: "他不攻击别人，也不解释太多，只是一次次把酒杯退回去。", risk: "对方把酒杯直接塞到手边。", detail: "他的拒绝不大声，但很稳定。每次都礼貌，每次都不接。", advice: "固定一句话，不展开辩论。", mingli: "日主偏软，食伤温和，个人节奏稳定。", tags: ["退货", "礼貌", "不签收"] },
      female: { name: "微笑拒收", line: "笑得很甜，杯子原路退回。", attitude: "温柔重复到你放弃。", behavior: "她的拒绝像客服退单，语气很好，结果不变。", risk: "对方用软磨硬泡消耗她。", detail: "温柔不代表松动，她只是拒绝得更体面。", advice: "温柔只保留一次，第二次开始缩短句子。", mingli: "日主偏软，但节奏稳定，食伤可用。", tags: ["微笑", "拒收", "退回原处"] }
    }
  },
  {
    id: "politeExit",
    gender: {
      male: { name: "体面撤退", line: "体面留下，人先撤退。", attitude: "不吵，不耗，先走。", behavior: "他给足台阶，然后离开压力中心。", risk: "酒局进入第二场、第三场。", detail: "他不喜欢硬碰硬。关系留住，酒不接住。", advice: "提前说明离开时间，不要等别人拉扯才说。", mingli: "日主偏软，单独处理倾向强，撤离信号强。", tags: ["体面", "撤退", "不续摊"] },
      female: { name: "淡出饭局", line: "她退出剧情。", attitude: "给台阶，也给自己出口。", behavior: "她完成礼数，然后自然离开。", risk: "所有人都开始拉她继续坐。", detail: "她会把自己移出剧情，避免拒绝变成对抗。", advice: "给明确时间点：我十点走。", mingli: "预防意识强，撤离信号强，个人处理倾向明显。", tags: ["淡出", "离席", "不加戏"] }
    }
  },
  {
    id: "smoke",
    gender: {
      male: { name: "话题烟雾弹", line: "表面在聊天，其实在放烟雾弹。", attitude: "话题够多，酒杯就没位置。", behavior: "他先顺着笑，再把桌面塞满新话题。", risk: "大家把注意力集中到他身上。", detail: "他适应性强，不破坏氛围，但会把酒杯带偏。", advice: "转移话题后立刻拉入第三方，别让压力回到自己身上。", mingli: "日主偏软，印比可借，后段食伤控场。", tags: ["烟雾弹", "转话题", "不让酒出场"] },
      female: { name: "拍照救场", line: "一句拍照，拯救一杯酒。", attitude: "趁围攻没成形，立刻转场。", behavior: "她把劝酒改成拍照、点菜、聊天。", risk: "劝酒刚起头，还没有形成围攻。", detail: "她很会抓时机。压力还没成形，就把注意力换掉。", advice: "一看到劝酒苗头就转，不要等全桌聚焦。", mingli: "前期熬住，印比可借，后段食伤控场。", tags: ["拍照", "救场", "转移注意"]
      }
    }
  },
  {
    id: "giveIn",
    gender: {
      male: { name: "委屈喝了", line: "嘴上不能喝，手上快举杯。", attitude: "他怕扫兴，容易被气氛推着走。", behavior: "他想照顾气氛，容易让别人失望这件事压过自己边界。", risk: "全桌起哄，说只喝一点。", detail: "这种人格最容易被气氛推动。真正能帮他的，是提前设外部约束。", advice: "开局设上限，并找一个人帮他守住。", mingli: "日主偏弱，官杀或财星压力强，印比可借但撤离信号更强。", tags: ["委屈", "怕扫兴", "需要监督"] },
      female: { name: "含泪给面", line: "看起来好说话，其实已经报警。", attitude: "给了面子，丢了边界。", behavior: "她先照顾气氛，再委屈自己。", risk: "对方夸她给面子、懂事。", detail: "她有想法，只是太在意场面。发现不舒服时往往已经太晚。", advice: "必须提前设上限，并找一个人帮她守住。", mingli: "日主偏弱，财官压力强，印比可借但撤离倾向更重。", tags: ["含泪", "给面", "边界报警"] }
    }
  },
  {
    id: "confuse",
    gender: {
      male: { name: "装傻反弹", line: "听懂了，但选择听不懂。", attitude: "把劝酒话术弹回去。", behavior: "他用装傻、反问、误解把压力卸掉。", risk: "对方用绕弯话术逼他接杯。", detail: "他先把对方的话翻译成无害版本，避开正面接招。", advice: "装傻只用一轮。第二轮要补明确边界。", mingli: "日主偏软，食伤可用，外部支持弱但个人控场仍在。", tags: ["装傻", "反弹", "不接招"] },
      female: { name: "假装听不懂", line: "眼神清澈到劝酒人怀疑自己。", attitude: "她把压力翻译成别的意思。", behavior: "对方说懂点事，她理解成懂得喝茶也算礼貌。", risk: "对方暗示她必须懂规矩。", detail: "她的反抗很轻，但很难攻破。每句话都被她翻译掉。", advice: "第一轮装傻，第二轮明确边界。", mingli: "日主偏软，食伤可用，个人控场仍在。", tags: ["清澈", "听不懂", "翻译压力"] }
    }
  },
  {
    id: "blackout",
    gender: {
      male: { name: "假装断片", line: "酒还没喝，人已经下线。", attitude: "提前低电量，降低可劝性。", behavior: "他安静、低电量、没攻击性，让自己变成不适合继续被劝的人。", risk: "酒局时间拖太久。", detail: "这种人格的拒酒方式是降低存在感。不抢话，不反击，直接低电量。", advice: "不要只说累，要给明确动作：我十分钟后走。", mingli: "日主偏弱，外部支持弱，压力重，撤离信号强。", tags: ["断片", "低电量", "提前下线"] },
      female: { name: "提前装醉", line: "杯子是空的，状态已经不在线。", attitude: "越早装不行，越安全。", behavior: "她用疲惫、困、状态不好提前退出。", risk: "对方说不喝也坐着陪大家。", detail: "她不争，也不抢，只让自己变成一个不适合被劝的人。", advice: "把状态不好变成明确行动，比如我十点走。", mingli: "日主偏弱，外部支持弱，财官压力重，撤离信号强。", tags: ["提前", "装醉", "空杯下线"] }
    }
  }
];

const form = document.querySelector("#personaForm");
const inputScreen = document.querySelector("#inputScreen");
const resultScreen = document.querySelector("#resultScreen");
const backButton = document.querySelector("#backButton");
const detailPanel = document.querySelector(".detail-panel");
const resultSheet = document.querySelector(".result-sheet");
const contactSheetSrc = "../../assets/generated/bujingjiu-v2/bujingjiu_extreme_32_contact_sheet.png";
const cellImageCache = new Map();
let contactSheetPromise;
let renderVersion = 0;

const fields = {
  gender: document.querySelector("#gender"),
  birthDate: document.querySelector("#birthDate"),
  birthTime: document.querySelector("#birthTime"),
  birthPlace: document.querySelector("#birthPlace"),
  personaType: document.querySelector("#personaType"),
  personaName: document.querySelector("#personaName"),
  oneLine: document.querySelector("#oneLine"),
  tagList: document.querySelector("#tagList"),
  attitudeText: document.querySelector("#attitudeText"),
  behaviorText: document.querySelector("#behaviorText"),
  detailText: document.querySelector("#detailText"),
  riskText: document.querySelector("#riskText"),
  adviceText: document.querySelector("#adviceText"),
  mingliText: document.querySelector("#mingliText"),
  personaArt: document.querySelector("#personaArt")
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await renderResult();
});

backButton.addEventListener("click", () => {
  detailPanel.open = false;
  resultScreen.classList.remove("detail-open");
  resultScreen.classList.add("hidden");
  inputScreen.classList.remove("hidden");
});

detailPanel.addEventListener("toggle", () => {
  resultScreen.classList.toggle("detail-open", detailPanel.open);
  requestAnimationFrame(() => {
    resultSheet.scrollTop = 0;
    const detailBody = detailPanel.querySelector(".detail-body");
    if (detailBody) detailBody.scrollTop = 0;
  });
});

async function renderResult(personaOverride, genderOverride) {
  const currentRender = ++renderVersion;
  const gender = fields.gender.value;
  const seed = [
    fields.birthDate.value,
    fields.birthTime.value || "unknown",
    fields.birthPlace.value.trim() || "unknown",
    gender
  ].join("|");
  const persona = personaOverride || choosePersona(seed);
  const activeGender = genderOverride || gender;
  const rawCopy = persona.gender[activeGender];
  const copy = buildAudienceCopy(rawCopy);

  fields.personaType.textContent = "你的不敬酒人格";
  fields.personaName.textContent = copy.name;
  fields.oneLine.textContent = copy.line;
  fields.attitudeText.textContent = copy.attitude;
  fields.behaviorText.textContent = copy.behavior;
  fields.detailText.textContent = copy.detail;
  fields.riskText.textContent = copy.risk;
  fields.adviceText.textContent = copy.advice;
  fields.mingliText.textContent = copy.mingli;
  fields.tagList.replaceChildren(...copy.tags.map((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    return item;
  }));

  const hasStandaloneImage = Boolean(persona.image && activeGender === "male");
  fields.personaArt.classList.toggle("single-art", hasStandaloneImage);
  fields.personaArt.alt = `${copy.name}不敬酒人格水母`;
  fields.personaArt.removeAttribute("src");
  fields.personaArt.hidden = true;
  detailPanel.open = false;
  resultScreen.classList.remove("detail-open");
  resultSheet.scrollTop = 0;

  inputScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const imageSrc = hasStandaloneImage
    ? persona.image
    : await getPersonaCellImage(personas.indexOf(persona), activeGender);
  if (currentRender === renderVersion) {
    fields.personaArt.src = imageSrc;
    fields.personaArt.hidden = false;
  }
}

function buildAudienceCopy(copy) {
  const direct = {};
  for (const key of ["name", "line", "attitude", "behavior", "risk", "detail", "advice", "mingli"]) {
    direct[key] = toSecondPerson(copy[key]);
  }
  direct.tags = copy.tags;
  const mingliBridge = buildMingliBridge(direct.mingli);
  direct.detail = [
    direct.detail,
    mingliBridge,
    "你的重点是让这轮劝酒失去继续推进的理由。有效拒酒的关键，是让边界被看见、被承认、被执行。"
  ].join(" ");
  direct.advice = [
    direct.advice,
    "如果现场压力变强，先给一句短祝福，再给一个不可讨论的边界。不要解释太多，解释越多，对方越容易把它当成谈判。"
  ].join(" ");
  direct.mingli = `命理底色：${trimPeriod(direct.mingli)}。这组气质决定你面对劝酒压力时的第一反应。`;
  return direct;
}

function buildMingliBridge(mingli) {
  return `从命理上看，${trimPeriod(mingli)}。日主强弱决定边界硬度，官杀压力决定饭局压迫感，印比支撑决定能不能借力，食伤表达决定你会控场、转移还是撤离。`;
}

function trimPeriod(value) {
  return String(value || "").replace(/[。.]$/, "");
}

function toSecondPerson(value) {
  return String(value || "")
    .replace(/他的/g, "你的")
    .replace(/她的/g, "你的")
    .replace(/他会/g, "你会")
    .replace(/她会/g, "你会")
    .replace(/他不是/g, "你不是")
    .replace(/她不是/g, "你不是")
    .replace(/他不/g, "你不")
    .replace(/她不/g, "你不")
    .replace(/他/g, "你")
    .replace(/她/g, "你")
    .replace(/你不是不会/g, "你会")
    .replace(/你不是没有/g, "你有");
}

function choosePersona(seed) {
  const index = stableHash(seed) % personas.length;
  return personas[index];
}

function stableHash(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

async function getPersonaCellImage(personaIndex, gender) {
  const cell = personaIndex * 2 + (gender === "female" ? 1 : 0);
  if (!cellImageCache.has(cell)) {
    cellImageCache.set(cell, cropContactSheetCell(cell));
  }
  return cellImageCache.get(cell);
}

async function cropContactSheetCell(cell) {
  const sheet = await loadContactSheet();
  const columns = 8;
  const rows = 4;
  const cellWidth = sheet.naturalWidth / columns;
  const cellHeight = sheet.naturalHeight / rows;
  const col = cell % columns;
  const row = Math.floor(cell / columns);
  const sourceX = col * cellWidth;
  const sourceY = row * cellHeight;
  const rightExtra = col < columns - 1 ? Math.round(cellWidth * 0.18) : 0;
  const sourceWidth = Math.round(cellWidth + rightExtra);
  const sourceHeight = Math.round(cellHeight);
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = sourceWidth;
  sourceCanvas.height = sourceHeight;
  const sourceContext = sourceCanvas.getContext("2d");
  sourceContext.fillStyle = "#fff";
  sourceContext.fillRect(0, 0, sourceWidth, sourceHeight);
  sourceContext.drawImage(sheet, sourceX, sourceY, sourceWidth, cellHeight, 0, 0, sourceWidth, sourceHeight);
  cleanEdgeArtifacts(sourceContext, sourceWidth, sourceHeight, { cleanBottom: row < rows - 1 });

  const stageWidth = 640;
  const stageHeight = 768;
  const safePadding = 14;
  const canvas = document.createElement("canvas");
  canvas.width = stageWidth;
  canvas.height = stageHeight;
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, stageWidth, stageHeight);

  const maxWidth = stageWidth - safePadding * 2;
  const maxHeight = stageHeight - safePadding * 2;
  const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const drawX = (stageWidth - drawWidth) / 2;
  const drawY = (stageHeight - drawHeight) / 2;

  context.drawImage(sourceCanvas, 0, 0, sourceWidth, sourceHeight, drawX, drawY, drawWidth, drawHeight);
  return canvas.toDataURL("image/png");
}

function cleanEdgeArtifacts(context, width, height, options = {}) {
  const image = context.getImageData(0, 0, width, height);
  const { data } = image;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  const removeLeftLimit = Math.round(width * 0.18);
  const removeRightLimit = Math.round(width * 0.76);
  const removeTopLimit = Math.round(height * 0.14);
  const removeBottomLimit = Math.round(height * 0.65);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const start = y * width + x;
      if (visited[start] || !isVisiblePixel(data, start)) continue;

      let head = 0;
      let tail = 0;
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      const pixels = [];

      visited[start] = 1;
      queue[tail] = start;
      tail += 1;

      while (head < tail) {
        const index = queue[head];
        head += 1;
        pixels.push(index);

        const px = index % width;
        const py = Math.floor(index / width);
        minX = Math.min(minX, px);
        maxX = Math.max(maxX, px);
        minY = Math.min(minY, py);
        maxY = Math.max(maxY, py);

        const neighbors = [
          px > 0 ? index - 1 : -1,
          px < width - 1 ? index + 1 : -1,
          py > 0 ? index - width : -1,
          py < height - 1 ? index + width : -1
        ];

        for (const next of neighbors) {
          if (next < 0 || visited[next] || !isVisiblePixel(data, next)) continue;
          visited[next] = 1;
          queue[tail] = next;
          tail += 1;
        }
      }

      const isLeftBleed = minX <= 1 && maxX < removeLeftLimit;
      const isRightBleed = maxX >= width - 2 && minX > removeRightLimit;
      const isTopBleed = minY <= 1 && maxY < removeTopLimit;
      const isBottomBleed = options.cleanBottom && maxY >= height - 2 && minY > removeBottomLimit;
      if (!isLeftBleed && !isRightBleed && !isTopBleed && !isBottomBleed) continue;

      for (const index of pixels) {
        const offset = index * 4;
        data[offset] = 255;
        data[offset + 1] = 255;
        data[offset + 2] = 255;
        data[offset + 3] = 255;
      }
    }
  }

  context.putImageData(image, 0, 0);
}

function isVisiblePixel(data, index) {
  const offset = index * 4;
  const alpha = data[offset + 3];
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  return alpha > 24 && (red < 246 || green < 246 || blue < 246);
}

function loadContactSheet() {
  if (!contactSheetPromise) {
    contactSheetPromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("contact_sheet_load_failed"));
      image.src = contactSheetSrc;
    });
  }
  return contactSheetPromise;
}
