// ============================================================
// useTarot —— 塔罗选牌状态机 Hook
// 用户手动点击选牌，随机正逆位
// 阶段：idle →（点击选牌）→ drawn
// 每次 reset 重新洗牌，保证牌阵顺序真正随机
// ============================================================

import { useState, useCallback } from 'react';
import type { TarotCard, TarotPhase } from '../types';
import {
  type TarotCardData,
  createTarotCard,
  MAJOR_ARCANA,
} from '../constants/tarotData';

/** Fisher-Yates 原地洗牌，返回新数组 */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useTarot() {
  const [phase, setPhase] = useState<TarotPhase>('idle');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // shuffled 牌阵 — 初始洗牌 + reset 时重新洗牌
  const [shuffledCards, setShuffledCards] = useState<TarotCardData[]>(() =>
    shuffle(MAJOR_ARCANA),
  );

  const selectCard = useCallback(
    (cardData: TarotCardData): void => {
      if (phase !== 'idle') return;
      const isReversed = Math.random() < 0.5;
      const card = createTarotCard(cardData, isReversed);
      setSelectedCard(card);
      setSelectedIndex(cardData.id);
      setPhase('drawn');
    },
    [phase],
  );

  /** 重置：清空选牌、重新洗牌 */
  const reset = useCallback((): void => {
    setPhase('idle');
    setSelectedCard(null);
    setSelectedIndex(null);
    setShuffledCards(shuffle(MAJOR_ARCANA));
  }, []);

  return {
    phase,
    selectedCard,
    selectedIndex,
    shuffledCards,
    selectCard,
    reset,
  };
}
