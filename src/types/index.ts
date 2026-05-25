// ============================================================
// 全局类型定义 —— 「玄机」占卜项目
// 严格零 any，所有结构完整类型注解
// ============================================================

// ---- 占卜模式 ----
export type DivinationMode = 'iching' | 'tarot';

// ============================================================
// 六爻相关类型
// ============================================================

/** 六爻状态机阶段 */
export type IChingPhase = 'idle' | 'throwing' | 'completed';

/** 单爻结构 */
export interface Line {
  index: number; // 0-5，初爻→上爻
  coinSum: number; // 6 | 7 | 8 | 9
  type: '老阴' | '少阴' | '少阳' | '老阳';
  isChanging: boolean; // 6 或 9 时为变爻
}

/** 完整的六爻卦象 */
export interface Hexagram {
  id: number; // 1-64
  name: string; // 卦名
  upperTrigram: TrigramName;
  lowerTrigram: TrigramName;
  description: string; // 卦辞
  judgment: string; // 彖辞
  image: string; // 象辞
  lines: string[]; // 六条爻辞
  popularDescription: string; // 卦辞今译（通俗描述）
  popularJudgment: string; // 通俗解读
  professionalInterpretation: string; // 专业解读（彖辞分析）
}

// ============================================================
// 塔罗相关类型
// ============================================================

/** 塔罗状态机阶段 */
export type TarotPhase = 'idle' | 'drawing' | 'drawn';

/** 单张塔罗牌 */
export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  meaning: string; // 正位含义
  reversedMeaning: string; // 逆位含义
  keywords: string; // 关键词（根据正逆位动态选择）
  isReversed: boolean;
}

// ============================================================
// 通用类型
// ============================================================

/** 八卦名称 */
export type TrigramName = '乾' | '兑' | '离' | '震' | '巽' | '坎' | '艮' | '坤';

/** AI 响应结构 */
export interface AIResponse {
  content: string;
  model?: string;
}

/** API 请求状态 */
export type APIState = 'idle' | 'loading' | 'success' | 'error';

/** API 错误分类 */
export interface APIError {
  message: string;
  type: 'timeout' | 'network' | 'server' | 'unknown';
}
