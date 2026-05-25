// ============================================================
// 塔罗牌静态数据 —— 大阿卡纳 22 张完整数据
// 含正逆位关键词，与 UI / AI 逻辑完全解耦
// ============================================================

import type { TarotCard } from '../types';

/** 大阿卡纳原始数据（不含 isReversed，运行时随机决定） */
export interface TarotCardData {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major';
  /** 正位关键词（顿号分隔，用于 UI 展示） */
  keywords: string;
  /** 逆位关键词 */
  reversedKeywords: string;
  meaning: string;
  reversedMeaning: string;
}

/** 大阿卡纳 22 张完整数据 */
export const MAJOR_ARCANA: TarotCardData[] = [
  {
    id: 0,
    name: '愚者',
    nameEn: 'The Fool',
    arcana: 'major',
    keywords: '开始、冒险、自由、天真',
    reversedKeywords: '鲁莽、犹豫、逃避',
    meaning: '新的开始、冒险精神、无限可能、天真自由',
    reversedMeaning: '鲁莽冲动、犹豫不决、逃避现实',
  },
  {
    id: 1,
    name: '魔术师',
    nameEn: 'The Magician',
    arcana: 'major',
    keywords: '创造、显化、技巧、自信',
    reversedKeywords: '欺骗、失能、错失',
    meaning: '创造力、技能纯熟、意志力集中、资源齐备',
    reversedMeaning: '能力不足、欺骗诡计、机会错失',
  },
  {
    id: 2,
    name: '女祭司',
    nameEn: 'The High Priestess',
    arcana: 'major',
    keywords: '直觉、智慧、神秘、内省',
    reversedKeywords: '忽视、暴露、失控',
    meaning: '直觉智慧、内在觉醒、神秘知识、潜意识',
    reversedMeaning: '忽视直觉、秘密暴露、情绪失控',
  },
  {
    id: 3,
    name: '女皇',
    nameEn: 'The Empress',
    arcana: 'major',
    keywords: '丰饶、滋养、和谐、享受',
    reversedKeywords: '依赖、枯竭、窒息',
    meaning: '丰饶繁荣、母性滋养、自然和谐、感官享受',
    reversedMeaning: '依赖过度、创造力枯竭、情感窒息',
  },
  {
    id: 4,
    name: '皇帝',
    nameEn: 'The Emperor',
    arcana: 'major',
    keywords: '权威、秩序、掌控、决断',
    reversedKeywords: '专制、混乱、软弱',
    meaning: '权威领导、秩序稳定、结构掌控、理性决断',
    reversedMeaning: '专制暴政、失控混乱、优柔寡断',
  },
  {
    id: 5,
    name: '教皇',
    nameEn: 'The Hierophant',
    arcana: 'major',
    keywords: '指引、传统、教育、信仰',
    reversedKeywords: '盲从、教条、叛逆',
    meaning: '精神指引、传统智慧、教育传承、信仰体系',
    reversedMeaning: '盲目服从、教条束缚、叛逆挑战',
  },
  {
    id: 6,
    name: '恋人',
    nameEn: 'The Lovers',
    arcana: 'major',
    keywords: '真爱、选择、和谐、契合',
    reversedKeywords: '分离、错误、冲突',
    meaning: '真爱结合、和谐关系、价值抉择、心灵契合',
    reversedMeaning: '分离决裂、错误选择、价值观冲突',
  },
  {
    id: 7,
    name: '战车',
    nameEn: 'The Chariot',
    arcana: 'major',
    keywords: '胜利、克服、决心、掌控',
    reversedKeywords: '失控、迷失、挫败',
    meaning: '意志胜利、克服障碍、决心驱动、掌控方向',
    reversedMeaning: '失控暴走、方向迷失、被击败退',
  },
  {
    id: 8,
    name: '力量',
    nameEn: 'Strength',
    arcana: 'major',
    keywords: '勇气、耐心、内在力、驯服',
    reversedKeywords: '软弱、失控、恐惧',
    meaning: '内在力量、以柔克刚、勇气耐心、驯服本能',
    reversedMeaning: '力量不足、失控冲动、恐惧退缩',
  },
  {
    id: 9,
    name: '隐者',
    nameEn: 'The Hermit',
    arcana: 'major',
    keywords: '内省、智慧、孤独、指引',
    reversedKeywords: '孤立、逃避、迷失',
    meaning: '内省反思、智慧沉淀、孤独探索、精神指引',
    reversedMeaning: '过度孤立、逃避现实、方向迷失',
  },
  {
    id: 10,
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    arcana: 'major',
    keywords: '转机、命运、循环、机遇',
    reversedKeywords: '厄运、停滞、抗拒',
    meaning: '命运转机、时来运转、因果循环、抓住机遇',
    reversedMeaning: '运势低迷、停滞不前、抗拒改变',
  },
  {
    id: 11,
    name: '正义',
    nameEn: 'Justice',
    arcana: 'major',
    keywords: '公平、真相、因果、裁决',
    reversedKeywords: '不公、逃避、偏颇',
    meaning: '公正裁决、真相浮现、因果报应、理性判断',
    reversedMeaning: '不公对待、逃避责任、偏见误判',
  },
  {
    id: 12,
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    arcana: 'major',
    keywords: '牺牲、放手、新视角、等待',
    reversedKeywords: '抗拒、停滞、自私',
    meaning: '自愿牺牲、换位思考、耐心等待、灵性觉醒',
    reversedMeaning: '抗拒牺牲、停滞不前、自我中心',
  },
  {
    id: 13,
    name: '死神',
    nameEn: 'Death',
    arcana: 'major',
    keywords: '终结、转变、重生、放下',
    reversedKeywords: '抗拒改变、停滞、腐朽',
    meaning: '旧有终结、彻底转变、破茧重生、放下过去',
    reversedMeaning: '抗拒改变、停滞腐朽、恐惧新生',
  },
  {
    id: 14,
    name: '节制',
    nameEn: 'Temperance',
    arcana: 'major',
    keywords: '平衡、调和、耐心、中庸',
    reversedKeywords: '失衡、过度、冲突',
    meaning: '平衡调和、中庸之道、耐心等待、内在和谐',
    reversedMeaning: '失去平衡、过度极端、内在冲突',
  },
  {
    id: 15,
    name: '恶魔',
    nameEn: 'The Devil',
    arcana: 'major',
    keywords: '束缚、欲望、物质、阴影',
    reversedKeywords: '挣脱、觉醒、解脱',
    meaning: '物质束缚、欲望沉溺、阴影操控、执念枷锁',
    reversedMeaning: '挣脱束缚、觉醒解脱、直面阴影',
  },
  {
    id: 16,
    name: '高塔',
    nameEn: 'The Tower',
    arcana: 'major',
    keywords: '崩塌、突变、启示、解放',
    reversedKeywords: '避免、延缓、压抑',
    meaning: '突然崩塌、剧烈变革、真相揭露、彻底解放',
    reversedMeaning: '勉强避免、延缓危机、压抑改变',
  },
  {
    id: 17,
    name: '星星',
    nameEn: 'The Star',
    arcana: 'major',
    keywords: '希望、疗愈、灵感、宁静',
    reversedKeywords: '绝望、怀疑、迷失',
    meaning: '希望之光、心灵疗愈、灵感涌现、宁静祥和',
    reversedMeaning: '希望破灭、自我怀疑、迷失方向',
  },
  {
    id: 18,
    name: '月亮',
    nameEn: 'The Moon',
    arcana: 'major',
    keywords: '幻象、恐惧、潜意识、迷惑',
    reversedKeywords: '澄清、克服、真相',
    meaning: '幻象迷雾、潜意识恐惧、直觉迷惑、隐藏危机',
    reversedMeaning: '迷雾渐散、克服恐惧、真相浮现',
  },
  {
    id: 19,
    name: '太阳',
    nameEn: 'The Sun',
    arcana: 'major',
    keywords: '成功、喜悦、活力、光明',
    reversedKeywords: '阴霾、低落、受阻',
    meaning: '阳光灿烂、成功喜悦、活力充沛、光明前景',
    reversedMeaning: '暂时阴霾、情绪低落、成功受阻',
  },
  {
    id: 20,
    name: '审判',
    nameEn: 'Judgement',
    arcana: 'major',
    keywords: '觉醒、召唤、清算、重生',
    reversedKeywords: '逃避、抗拒、遗憾',
    meaning: '内心觉醒、使命召唤、因果清算、灵魂重生',
    reversedMeaning: '逃避审判、抗拒觉醒、遗憾追悔',
  },
  {
    id: 21,
    name: '世界',
    nameEn: 'The World',
    arcana: 'major',
    keywords: '完成、圆满、成就、旅程',
    reversedKeywords: '未完成、停滞、缺憾',
    meaning: '圆满成就、旅程终点、完整合一、大功告成',
    reversedMeaning: '未竟之事、停滞不前、功亏一篑',
  },
];

/** 从原始数据创建含正逆位标记的 TarotCard */
export function createTarotCard(data: TarotCardData, isReversed: boolean): TarotCard {
  return {
    id: data.id,
    name: data.name,
    nameEn: data.nameEn,
    arcana: data.arcana,
    meaning: data.meaning,
    reversedMeaning: data.reversedMeaning,
    keywords: isReversed ? data.reversedKeywords : data.keywords,
    isReversed,
  };
}
