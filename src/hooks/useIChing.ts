// ============================================================
// useIChing —— 六爻状态机 Hook
// 严格时序：throwing → 0.7s 动画 → 计算 → idle/completed
// ============================================================

import { useState, useCallback, useMemo } from 'react';
import type { Line, IChingPhase } from '../types';
import { throwThreeCoins, determineLine, buildHexagram } from '../utils/ichingLogic';

/** 摇卦动画时长（毫秒），必须等待动画结束后才计算 */
const ANIMATION_MS = 700;

export function useIChing() {
  const [phase, setPhase] = useState<IChingPhase>('idle');
  const [lines, setLines] = useState<Line[]>([]);
  const [currentThrow, setCurrentThrow] = useState(0);

  /** 摇一次卦：throwing → 动画等待 → 计算 → 状态转移 */
  const throwCoins = useCallback(async (): Promise<void> => {
    if (phase !== 'idle' || currentThrow >= 6) return;

    // --- 进入 throwing 阶段 ---
    setPhase('throwing');

    // --- 等待动画完成（模拟铜钱翻转）---
    await new Promise<void>((resolve) => setTimeout(resolve, ANIMATION_MS));

    // --- 动画结束，执行计算 ---
    const coinSum = throwThreeCoins();
    const newLine = determineLine(currentThrow, coinSum);
    const nextThrow = currentThrow + 1;

    setLines((prev) => [...prev, newLine]);
    setCurrentThrow(nextThrow);

    // --- 状态转移 ---
    if (nextThrow >= 6) {
      setPhase('completed');
    } else {
      setPhase('idle');
    }
  }, [phase, currentThrow]);

  /** 重置所有状态 */
  const reset = useCallback((): void => {
    setPhase('idle');
    setLines([]);
    setCurrentThrow(0);
  }, []);

  /** 仅在 completed 时计算卦象 */
  const hexagram = useMemo(() => {
    if (phase === 'completed' && lines.length === 6) {
      return buildHexagram(lines);
    }
    return null;
  }, [phase, lines]);

  return { phase, lines, currentThrow, throwCoins, reset, hexagram };
}
