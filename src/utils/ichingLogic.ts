// ============================================================
// 六爻核心算法 —— 纯函数模块
// 与 UI / API / 状态管理完全解耦，可独立单元测试
//
// 【爻序约定（重要！）】
// lines 数组：索引 0 = 初爻（最下），索引 5 = 上爻（最上）
// 即 lines[0..2] = 下卦（初、二、三），lines[3..5] = 上卦（四、五、上）
// IChingBoard 组件负责将数组反转展示（上爻在顶部，初爻在底部）
// 此处 buildHexagram 始终按 lines[0]=初爻 计算，不受展示顺序影响
// ============================================================

import type { Line, Hexagram } from '../types';
import { getHexagramData, TRIGRAM_MAP } from '../constants/ichingData';
import type { TrigramName } from '../types';

// ---- 随机数工具 ----

/** 模拟三枚铜钱，返回总和 6|7|8|9 */
export function throwThreeCoins(): number {
  // 每枚：正面=3，反面=2；三枚之和 ∈ {6,7,8,9}
  const roll = (): number => (Math.random() < 0.5 ? 3 : 2);
  return roll() + roll() + roll();
}

// ---- 爻分析 ----

/** 根据铜钱和确定爻的阴阳（阴=0，阳=1） */
export function yinYang(coinSum: number): 0 | 1 {
  return (coinSum % 2) as 0 | 1;
}

/** 变卦中的阴阳（老阴→阳，老阳→阴，其余不变） */
export function changedYinYang(coinSum: number): 0 | 1 {
  if (coinSum === 6) return 1;
  if (coinSum === 9) return 0;
  return (coinSum % 2) as 0 | 1;
}

/** 判断是否为变爻 */
function isChanging(coinSum: number): boolean {
  return coinSum === 6 || coinSum === 9;
}

/** 获取爻的类型名称 */
function lineType(coinSum: number): Line['type'] {
  switch (coinSum) {
    case 6: return '老阴';
    case 7: return '少阳';
    case 8: return '少阴';
    case 9: return '老阳';
    default: throw new Error(`无效的铜钱和: ${coinSum}`);
  }
}

/** 根据铜钱和创建单爻 */
export function determineLine(index: number, coinSum: number): Line {
  return {
    index,
    coinSum,
    type: lineType(coinSum),
    isChanging: isChanging(coinSum),
  };
}

// ---- 卦象组装 ----

/**
 * 三爻阴阳值 → 八卦二进制键
 * l0 = 初爻（下），l1 = 二爻（中），l2 = 三爻（上）
 * 生成格式："${l0}${l1}${l2}"，与 TRIGRAM_MAP 键匹配
 */
function trigramKey(l0: number, l1: number, l2: number): string {
  return `${l0}${l1}${l2}`;
}

/**
 * 六条爻 → 本卦和变卦
 * lines[0]=初爻（下）, ..., lines[5]=上爻（上）
 */
export function buildHexagram(lines: Line[]): {
  original: Hexagram | undefined;
  changed: Hexagram | undefined;
} {
  if (lines.length !== 6) {
    throw new Error(`buildHexagram 需要恰好6条爻，当前为 ${lines.length}`);
  }

  // ---- 本卦 ----
  // 下卦：初爻(lines[0])、二爻(lines[1])、三爻(lines[2])
  const lowerOriginalKey = trigramKey(
    yinYang(lines[0].coinSum),
    yinYang(lines[1].coinSum),
    yinYang(lines[2].coinSum),
  );
  // 上卦：四爻(lines[3])、五爻(lines[4])、上爻(lines[5])
  const upperOriginalKey = trigramKey(
    yinYang(lines[3].coinSum),
    yinYang(lines[4].coinSum),
    yinYang(lines[5].coinSum),
  );

  const lowerTrigram = TRIGRAM_MAP[lowerOriginalKey] as TrigramName;
  const upperTrigram = TRIGRAM_MAP[upperOriginalKey] as TrigramName;

  const original = getHexagramData(upperTrigram, lowerTrigram);

  // ---- 变卦：仅当存在变爻时才计算 ----
  const hasChangingLine = lines.some((l) => l.isChanging);
  let changed: Hexagram | undefined;

  if (hasChangingLine) {
    const lowerChangedKey = trigramKey(
      changedYinYang(lines[0].coinSum),
      changedYinYang(lines[1].coinSum),
      changedYinYang(lines[2].coinSum),
    );
    const upperChangedKey = trigramKey(
      changedYinYang(lines[3].coinSum),
      changedYinYang(lines[4].coinSum),
      changedYinYang(lines[5].coinSum),
    );

    const lowerChangedTrigram = TRIGRAM_MAP[lowerChangedKey] as TrigramName;
    const upperChangedTrigram = TRIGRAM_MAP[upperChangedKey] as TrigramName;

    changed = getHexagramData(upperChangedTrigram, lowerChangedTrigram);
  }

  return { original, changed };
}
