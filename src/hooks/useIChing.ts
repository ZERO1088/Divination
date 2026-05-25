// ============================================================
// useIChing —— 六爻状态机 Hook (仪式增强版)
// 流程：idle → throwing（铜钱逐枚揭示 + 音效）→ 计算爻线 → idle/completed
// ============================================================

import { useState, useCallback, useMemo } from 'react';
import type { Line, IChingPhase } from '../types';
import {
  throwThreeCoinsIndividual,
  determineLine,
  buildHexagram,
} from '../utils/ichingLogic';
import { coinToss, coinLand } from '../utils/sound';

/** 铜钱值 2=反面, 3=正面 */
export type CoinValue = 2 | 3;

/** 单枚 coin 2, 预留位用 0 表示 */
type CoinSlot = CoinValue | 0;

const delay = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

export function useIChing() {
  const [phase, setPhase] = useState<IChingPhase>('idle');
  const [lines, setLines] = useState<Line[]>([]);
  const [currentThrow, setCurrentThrow] = useState(0);
  // 当前抛掷的三枚铜钱值（0 表示尚未揭示）
  const [coinValues, setCoinValues] = useState<[CoinSlot, CoinSlot, CoinSlot] | null>(null);

  /** 摇一次卦：铜钱逐枚揭示 → 音效 → 计算 */
  const throwCoins = useCallback(async (): Promise<void> => {
    if (phase !== 'idle' || currentThrow >= 6) return;

    setPhase('throwing');
    setCoinValues(null);

    // 预计算结果（不展示），保证随机性
    const coins = throwThreeCoinsIndividual();

    // ---- 铜钱 1: 抛 + 落 ----
    await delay(180);
    setCoinValues([coins[0], 0, 0]);
    coinToss();
    await delay(400);
    coinLand();

    // ---- 铜钱 2: 抛 + 落 ----
    await delay(120);
    setCoinValues([coins[0], coins[1], 0]);
    coinToss();
    await delay(400);
    coinLand();

    // ---- 铜钱 3: 抛 + 落 ----
    await delay(120);
    setCoinValues([coins[0], coins[1], coins[2]]);
    coinToss();
    await delay(400);
    coinLand();

    // ---- 命运凝定 ----
    await delay(260);
    const coinSum = coins[0] + coins[1] + coins[2];
    const newLine = determineLine(currentThrow, coinSum);
    const nextThrow = currentThrow + 1;

    setLines((prev) => [...prev, newLine]);
    setCurrentThrow(nextThrow);
    setCoinValues(null);

    if (nextThrow >= 6) {
      setPhase('completed');
    } else {
      setPhase('idle');
    }
  }, [phase, currentThrow]);

  const reset = useCallback((): void => {
    setPhase('idle');
    setLines([]);
    setCurrentThrow(0);
    setCoinValues(null);
  }, []);

  const hexagram = useMemo(() => {
    if (phase === 'completed' && lines.length === 6) {
      return buildHexagram(lines);
    }
    return null;
  }, [phase, lines]);

  return {
    phase,
    lines,
    currentThrow,
    coinValues,
    throwCoins,
    reset,
    hexagram,
  };
}
