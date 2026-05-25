// ============================================================
// useTarot —— 塔罗选牌状态机 Hook
// 用户手动点击选牌，随机正逆位
// 阶段：idle →（点击选牌）→ drawn
// ============================================================

import { useState, useCallback } from 'react';
import type { TarotCard, TarotPhase } from '../types';
import { type TarotCardData, createTarotCard } from '../constants/tarotData';

export function useTarot() {
  const [phase, setPhase] = useState<TarotPhase>('idle');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  /** 用户点击选择一张牌：随机决定正逆位，立即进入 drawn 阶段 */
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

  /** 重置，回到选牌阶段 */
  const reset = useCallback((): void => {
    setPhase('idle');
    setSelectedCard(null);
    setSelectedIndex(null);
  }, []);

  return { phase, selectedCard, selectedIndex, selectCard, reset };
}
