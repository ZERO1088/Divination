// ============================================================
// API 工具模块 —— 防御性网络请求封装
// AbortController 超时管理 + Prompt 组装 + 错误兜底
// ============================================================

/** 默认请求超时（毫秒） */
export const DEFAULT_TIMEOUT_MS = 30_000;

/** 通用兜底文案 */
export const FALLBACK_MESSAGE = '玄机未显，请稍后再试';

// ---- 网络层 ----

/** fetchWithTimeout：带超时的 fetch 封装，内部创建 AbortController */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ---- Prompt 组装 ----

/** 六爻解卦 Prompt（v2：含通俗版和专业版上下文） */
export function buildIChingPrompt(params: {
  originalName: string;
  originalDesc: string;
  originalJudgment: string;
  originalImage: string;
  originalLines: string;
  popularDesc: string;
  popularJudgment: string;
  professionalInterpretation: string;
  changedName?: string;
  changedDesc?: string;
  changedJudgment?: string;
  changingLines: string;
  question: string;
}): string {
  const {
    originalName, originalDesc, originalJudgment, originalImage, originalLines,
    popularDesc, popularJudgment, professionalInterpretation,
    changedName, changedDesc, changedJudgment, changingLines, question,
  } = params;

  let prompt = `你是一位精通《周易》的解卦大师。请根据以下卦象为用户提供通俗和专业双版本解读。\n\n`;
  prompt += `【用户问题】${question || '未说明'}\n\n`;

  prompt += `【本卦】${originalName}\n`;
  prompt += `卦辞：${originalDesc}\n`;
  prompt += `彖辞：${originalJudgment}\n`;
  prompt += `象辞：${originalImage}\n`;
  prompt += `爻辞：\n${originalLines}\n\n`;

  prompt += `【内置通俗解读】${popularDesc}\n${popularJudgment}\n\n`;
  prompt += `【内置专业解读】${professionalInterpretation}\n\n`;

  if (changedName) {
    prompt += `【之卦】${changedName}\n`;
    prompt += `卦辞：${changedDesc ?? '无'}\n`;
    prompt += `彖辞：${changedJudgment ?? '无'}\n\n`;
    prompt += `【动爻】${changingLines || '无'}\n`;
    prompt += `（动爻之处，以变卦爻辞参看）\n\n`;
  }

  prompt += `请按以下格式输出，不加任何 Markdown 标记（不要用 ##、**、- 等符号）：\n`;
  prompt += `通俗解读：[用通俗易懂的中文，结合用户问题，给出生活化的建议，150字左右]\n\n`;
  prompt += `专业解读：[从卦象结构、体用生克、爻位关系等角度，给出专业的易学分析，200字左右]\n`;

  return prompt;
}

/** 塔罗解牌 Prompt */
export function buildTarotPrompt(params: {
  cardName: string;
  cardNameEn: string;
  isReversed: boolean;
  meaning: string;
  question: string;
}): string {
  const { cardName, cardNameEn, isReversed, meaning, question } = params;
  const position = isReversed ? '逆位' : '正位';

  // 检测场景类型，用于强化 AI 匹配
  const scene = detectScene(question);

  let prompt = `你是一位资深的西方塔罗牌解读师，精通韦特塔罗体系。\n\n`;
  prompt += `用户提问：${question || '未说明'}\n`;
  prompt += `问题场景：${scene}\n`;
  prompt += `抽牌结果：${cardName}（${cardNameEn}）${position}\n`;
  prompt += `牌义参考：${meaning}\n\n`;
  prompt += `要求：\n`;
  prompt += `1. 解读必须完全贴合用户的具体问题，针对「${scene}」场景给出定制化分析，禁止通用套话\n`;
  prompt += `2. 输出格式固定为两段，不加任何 Markdown 标记（不要用 ##、**、- 等符号）：\n`;
  prompt += `   通俗解读：[用大白话、像朋友聊天一样，结合用户问题给出生活化的启示，100-150字]\n`;
  prompt += `   专业解读：[精简版塔罗分析，提牌义和元素即可，不堆砌术语，100-130字]\n`;
  prompt += `3. 严格禁止提及周易、卦象、变爻、五行等中式占卜内容\n`;
  prompt += `4. 逆位牌需明确指出正位能量受阻或内化的具体表现`;

  return prompt;
}

/** 简易场景检测：根据问题关键词判断用户所属场景 */
function detectScene(question: string): string {
  const q = question.toLowerCase();
  if (/求职|工作|面试|跳槽|offer|职业|事业|岗位|入职|简历|薪资/.test(q)) return '职业求职';
  if (/感情|恋爱|爱情|分手|复合|暗恋|表白|对象|脱单|相亲|婚姻|前任/.test(q)) return '感情关系';
  if (/考试|学习|学业|考研|高考|成绩|复习|论文|毕业|留学|雅思|托福/.test(q)) return '学业考试';
  return '生活抉择';
}

// ---- Markdown 清理 ----

/** 清理 AI 返回内容中的 Markdown 标记，适配纯文本网页展示 */
export function stripMarkdown(text: string): string {
  return text
    // 标题标记：## → 空（保留内容），匹配行首或段落开头的 #
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\n#{1,6}\s+/g, '\n')
    // 粗体/斜体：**text** → text，*text* → text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    // 行内代码：`text` → text
    .replace(/`(.+?)`/g, '$1')
    // 无序列表：- item → · item（保留结构，去掉 Markdown 味）
    .replace(/^- /gm, '· ')
    // 连续空行压缩为单个空行
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---- 演示模式文案 ----

/** 塔罗 Demo 模式下的牌面专属解读模板（通用版，覆盖多场景） */
const TAROT_DEMO_TEMPLATES: Record<string, { upright: { popular: string; professional: string }; reversed: { popular: string; professional: string } }> = {
  '愚者': {
    upright: {
      popular: '愚者正位是一张"从零开始"的牌。它鼓励你放下包袱，带着好奇心踏上新旅程。无论你面对的是什么——新的机会、新的阶段、新的尝试——这张牌都在说：别想太多，先跨出去。乐观和勇气是你现在最好的装备。即使前方未知，相信自己的直觉。',
      professional: '愚者（The Fool）对应风元素，数字0象征无限潜能。伟特牌面中人物昂首望天、脚边小狗作伴、手中白玫瑰代表纯真——正位强调"信心的跳跃"。风元素带来轻盈与自由，数字0不受任何约束，暗示你正处于可以重新定义方向的起点。',
    },
    reversed: {
      popular: '愚者逆位在提醒你：是不是太冲动了，或者刚好相反——是不是因为害怕而迟迟不敢行动？无论哪种，都是在偏离"当下的路"。停下来重新看看脚下的方向，不要因为急躁而踩空，也别让恐惧把你困在原地。',
      professional: '愚者逆位时风元素飘忽不定，数字0的潜能被压抑。牌面人物仿佛即将踏空——警示盲目乐观或逃避现实的风险。逆位常指向鲁莽决定或犹豫不决两个极端，需找到冒险与审慎之间的平衡。',
    },
  },
  '魔术师': {
    upright: {
      popular: '魔术师正位告诉你：你拥有把想法变成现实的一切条件。现在不是等待的时候，而是行动的时候。主动去表达、去争取、去创造——你的能力、资源和机会已经齐备，只差你迈出第一步。自信一点，你比你以为的更强大。',
      professional: '魔术师（The Magician）对应水星，数字1代表开创与显化。牌面人物一手指天一手指地，象征意念到现实的转化。桌上的圣杯、宝剑、星币、权杖四元素齐全，表明所需资源已到位，只需清晰的意图和坚定的行动力。',
    },
    reversed: {
      popular: '魔术师逆位提示：你可能低估了自己的能力，或者信息掌握不全就急于出手。也许有人在误导你，也许是你自己信心不足。暂停一下，把情况看清楚再行动。你的工具都在，只是需要重新校准。',
      professional: '逆位魔术师中水星沟通能量被扭曲，四元素散落暗示资源未被善用。可能表现为欺骗、自我怀疑或才华被埋没。需要重新审视动机是否纯粹、信息是否对称，再整合手中的资源。',
    },
  },
  '女祭司': {
    upright: {
      popular: '女祭司正位劝你不要急着向外找答案。很多事的内在真相，你的直觉其实已经知道。现在更适合静静观察、沉淀思绪，而不是急着做决定或到处问人。给自己一段安静的时间，答案会在你的内心浮现。',
      professional: '女祭司（The High Priestess）对应月亮，数字2象征二元与平衡。她端坐于黑白双柱间，手持卷轴——正位强调内省和直觉。月亮能量提醒你：不是所有问题都靠逻辑解决，潜意识中的智慧同样重要。帷幕后的水面暗示深层变化正在酝酿。',
    },
    reversed: {
      popular: '女祭司逆位表示你的内心声音被杂音盖住了。也许太听别人的意见，也许太久没静下来和自己对话。也可能是有些事你潜意识里知道但不想面对。现在需要关闭外界的噪音，重新连接自己的直觉频道。',
      professional: '逆位女祭司中月亮之光被遮蔽，帷幕后的秘密有泄露风险。数字2的平衡被打破——可能表现为情绪失控或过度压抑。潜意识中的不安正在影响判断，建议通过独处或冥想重建内在秩序。',
    },
  },
  '女皇': {
    upright: {
      popular: '女皇正位是一张丰盛的牌。它提醒你：你已经很好了，你值得被好好对待。现在适合享受成果、滋养自己、让自己舒服一点。不管是工作成果、人际关系还是自我成长，都到了可以"收获"的阶段。对自己好一点，也对你身边的人好一点。',
      professional: '女皇（The Empress）对应金星，数字3代表创造与繁育。她坐于丰收麦田前，头戴十二星冠——正位时金星能量饱满，象征物质与情感的双重丰饶。数字3的创造力在流动，适合推进需要耐心培育的事务。',
    },
    reversed: {
      popular: '女皇逆位提醒你检查一下：是不是付出太多而收获太少？或者你一直在照顾别人，忘了照顾自己？这张牌在说，失衡了。先把自己滋养好，你才有余力去应对其他。学会说"不"，也是一种对自己的爱。',
      professional: '逆位女皇中金星滋养能量转为消耗，数字3的创造停滞。丰收景象暗示情感或物质上的匮乏感——可能在过度付出中透支自己，或因安全感不足而过度依赖外界认可。需从内在重建价值感。',
    },
  },
  '皇帝': {
    upright: {
      popular: '皇帝正位带来秩序与稳定。如果你正在面对混乱的局面，这张牌告诉你：用规则和耐心去梳理，事情会走上正轨。它也暗示你需要扛起责任、展现领导力。不要逃避该做的决定——成熟和可靠是你现在的名片。',
      professional: '皇帝（The Emperor）对应白羊座，数字4象征秩序与结构。他端坐王座，手持权杖——正位强调纪律和边界。白羊座的行动力结合数字4的稳定性，提示你该建立规则、做出决断，用理性构筑长期可靠的框架。',
    },
    reversed: {
      popular: '皇帝逆位暗示权力失衡。要么有人对你管得太死让你喘不过气，要么你自己在逃避该承担的责任。也可能是你对"控制"这件事本身有恐惧。重新想想：哪些规则是保护你的，哪些是束缚你的。',
      professional: '逆位皇帝中白羊座领导力沦为专横，数字4结构僵化。王座动摇——可能表现为控制欲过强、优柔寡断或逃避责任。需要审视权力边界：是过度控制还是完全失控？在秩序与弹性之间找平衡。',
    },
  },
  '教皇': {
    upright: {
      popular: '教皇正位建议你寻求可靠的指导——一位导师、一个成熟的建议、或一份被验证过的方法。你不需要独自摸索。这张牌也暗示，按常规出牌、尊重规则和传统，反而会带来好的结果。别怕向有经验的人请教。',
      professional: '教皇（The Hierophant）对应金牛座，数字5象征中介与传承。牌面人物在传授智慧——正位强调通过传统途径获取知识。金牛座的务实与数字5的桥梁作用结合，提示通过正式渠道、制度或前辈指导寻求突破。',
    },
    reversed: {
      popular: '教皇逆位在说：别盲从。也许身边的人或"过来人"的建议并不适合你。你需要用自己的方式去探索，哪怕看起来不合常规。规则是人定的，你有权利质疑和打破，走自己的路。',
      professional: '逆位教皇中金牛座固执转为教条，数字5桥梁失效。可能对传统权威的叛逆，或盲从导致的迷失。提示需要区分：哪些规则值得遵守，哪些束缚需要挣脱。真正的智慧不在书本里，在你自己的实践中。',
    },
  },
  '恋人': {
    upright: {
      popular: '恋人正位代表一次重要的选择，而且这个选择需要你跟随内心而非头脑。它可能不只是一段关系——任何需要你"做出选择的时刻"，这张牌都在鼓励你选那个让你心跳加速的选项。真诚面对自己，答案其实已经很清楚了。',
      professional: '恋人（The Lovers）对应双子座，数字6代表和谐与抉择。牌面亚当夏娃在天使祝福下结合——正位强调价值共鸣和真诚的选择。双子座的双重性提醒你，任何重大决定都涉及取舍，关键是与自己的核心价值观对齐。',
    },
    reversed: {
      popular: '恋人逆位提醒你：是不是在做选择时犹豫太久了？或者你已经做了选择，但心里还在纠结。这张牌也警示可能存在价值观冲突——你和对方（或你和这个选择）在根本层面不一致。诚实地对话、面对分歧，不要假装没事。',
      professional: '逆位恋人中双子座沟通断裂，数字6和谐被打破。天使消失——暗示信任崩塌或根本性分歧。可能指向两难抉择的困境、价值观冲突或选择后的后悔。逆位不一定是坏事，有时恰恰帮你排除错误选项。',
    },
  },
  '战车': {
    upright: {
      popular: '战车正位是一张"驾驭"的牌。你面前可能有各种拉扯的力量——不同的意见、矛盾的欲望、外部的阻力——但你有能力把它们整合起来，朝着一个方向前进。关键是：握紧缰绳，专注目标，别被两边的噪音带偏。',
      professional: '战车（The Chariot）对应巨蟹座，数字7代表突破与胜利。黑白双狮并行——正位时对立力量被统一驾驭。巨蟹座的情感深度加上数字7的突破性，提示通过意志力整合内外冲突，驱动事物向前推进。',
    },
    reversed: {
      popular: '战车逆位是一个警告：你用力过猛了。可能太想控制一切导致精疲力竭，或者方向跑偏了还不自知。有时候放手不是放弃，是给事情自然发展的空间。检查一下：你是在"驾驭"生活，还是在被焦虑"驾驭"？',
      professional: '逆位战车中巨蟹座情绪力量失控，数字7突破受阻。双狮背道而驰——内在分裂导致外显冲突。可能表现为暴躁、失控或彻底放弃。提示先整顿内心秩序，再处理外部问题，否则容易两败俱伤。',
    },
  },
};

/** 塔罗 Demo 模式下的默认解读（未收录牌面时使用，通用版） */
function getDefaultTarotDemo(isReversed: boolean, scene: string) {
  if (isReversed) {
    return {
      popular: `这张牌以逆位出现，提示你在「${scene}」这件事上可能遇到了一些阻力或需要内省的地方。逆位不代表完全负面——更像是宇宙给你的暂停信号，让你重新审视那些被忽略的细节。`,
      professional: '逆位在塔罗中通常意味着正位能量的受阻、过度或内化。需要结合具体牌面符号分析其阴影面——是力量未发挥，还是力量被滥用。逆位牌往往比正位更需要向内探索。',
    };
  }
  return {
    popular: `这张牌以正位出现在你关于「${scene}」的问题中，是一份来自潜意识的礼物。它邀请你用新的视角理解当前的处境——有些答案不在外面，而在你看问题的角度转变中。`,
    professional: '正位牌在塔罗解读中代表该牌原型的能量在顺畅流动。这张牌的核心象征正在你的处境中展现正面特质，建议关注牌面元素之间的互动关系，它们暗含着事态发展的潜在轨迹。',
  };
}

/** 塔罗 Demo 模式下的专属解读 */
export function generateTarotDemoReply(params: {
  cardName: string;
  isReversed: boolean;
  question: string;
}): string {
  const { cardName, isReversed, question } = params;
  const scene = detectScene(question);
  const template = TAROT_DEMO_TEMPLATES[cardName];
  const content = template
    ? (isReversed ? template.reversed : template.upright)
    : getDefaultTarotDemo(isReversed, scene);

  return (
    `${content.popular}\n\n` +
    `${content.professional}\n\n` +
    `💡 Demo 模式 · ${scene}场景通用解读。` +
    `配置 DeepSeek API Key 后可获得针对"${question}"的专属 AI 解牌。`
  );
}

// ---- 错误分类 ----

/** 根据异常类型分类 API 错误 */
export function classifyError(err: unknown): {
  message: string;
  type: 'timeout' | 'network' | 'server' | 'unknown';
} {
  if (err instanceof DOMException && err.name === 'AbortError') {
    return { message: '请求超时，请稍后重试', type: 'timeout' };
  }
  if (err instanceof TypeError && err.message.includes('fetch')) {
    return { message: '网络连接失败，请检查网络', type: 'network' };
  }
  if (err instanceof Error) {
    // HTTP 错误（status code 不为 2xx）归类为 server 错误
    const isServerError =
      err.message.includes('服务器返回错误') ||
      /\b[45]\d{2}\b/.test(err.message);
    return { message: err.message, type: isServerError ? 'server' : 'unknown' };
  }
  return { message: String(err), type: 'unknown' };
}
