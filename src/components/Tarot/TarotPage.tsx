// ============================================================
// TarotPage —— 塔罗占卜页面（用户自选牌模式）
// 展示 22 张大阿卡纳牌阵 → 点击选牌 → 翻牌 → 详情 + 解读
// ============================================================

import { type ReactNode, useCallback, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTarot } from '../../hooks/useTarot';
import { useDeepSeek } from '../../hooks/useDeepSeek';
import { useAppContext } from '../../context/AppContext';
import { buildTarotPrompt } from '../../utils/api';
import { deepseekConfig } from '../../config/api';
import { MAJOR_ARCANA } from '../../constants/tarotData';
import { TarotCard } from './TarotCard';
import { QuestionInput } from '../common/QuestionInput';
import { ResultCard } from '../common/ResultCard';

/** 每行牌数 */
const CARDS_PER_ROW = 11;
/** 扇形最大旋转角度（度） */
const MAX_FAN_ANGLE = 6;

/** 计算一张牌在行内的扇形旋转角度 */
function fanAngle(colIndex: number, totalInRow: number): number {
  const center = (totalInRow - 1) / 2;
  return (colIndex - center) * (MAX_FAN_ANGLE / center);
}

/** 牌阵入场动画 */
const spreadVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4, ease: 'easeOut' },
  }),
};

/** 详情面板动画 */
const detailVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function TarotPage(): ReactNode {
  const { phase, selectedCard, selectedIndex, selectCard, reset: resetTarot } = useTarot();
  const { question } = useAppContext();
  const {
    state: aiState,
    result: aiResult,
    error: aiError,
    analyze,
    reset: resetAI,
  } = useDeepSeek(
    deepseekConfig.isConfigured
      ? {
          endpoint: deepseekConfig.endpoint,
          apiKey: deepseekConfig.apiKey,
          model: deepseekConfig.model,
          timeoutMs: deepseekConfig.timeoutMs,
        }
      : {},
  );

  /** 将 22 张牌分成两行 */
  const rows = useMemo(() => {
    const row0 = MAJOR_ARCANA.slice(0, CARDS_PER_ROW);
    const row1 = MAJOR_ARCANA.slice(CARDS_PER_ROW);
    return [row0, row1];
  }, []);

  /** 组装 Prompt 并请求 AI 解牌 */
  const handleAnalyze = useCallback(() => {
    if (!selectedCard) return;
    const prompt = buildTarotPrompt({
      cardName: selectedCard.name,
      cardNameEn: selectedCard.nameEn,
      isReversed: selectedCard.isReversed,
      meaning: selectedCard.isReversed
        ? selectedCard.reversedMeaning
        : selectedCard.meaning,
      question,
    });
    analyze(prompt, 'tarot', {
      cardName: selectedCard.name,
      isReversed: selectedCard.isReversed,
      question,
    });
  }, [selectedCard, question, analyze]);

  /** 重置 */
  const handleReset = useCallback(() => {
    resetTarot();
    resetAI();
  }, [resetTarot, resetAI]);

  const isDisabled = phase === 'drawn';

  return (
    <div className="flex flex-col items-center gap-4 pt-12 pb-8 w-full max-w-5xl mx-auto px-2">
      <h1 className="text-3xl text-amber-200 font-serif">塔罗抽牌</h1>

      {/* 问题输入 */}
      <QuestionInput disabled={isDisabled} />

      {/* ---- 牌阵 ---- */}
      <div className="w-full flex flex-col items-center gap-3 mt-2">
        {rows.map((rowCards, rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-wrap justify-center gap-1.5"
          >
            {rowCards.map((cardData, colIdx) => {
              const globalIdx = rowIdx * CARDS_PER_ROW + colIdx;
              const rotation = fanAngle(colIdx, rowCards.length);
              const isSelected = selectedIndex === cardData.id;

              return (
                <motion.div
                  key={cardData.id}
                  custom={globalIdx}
                  variants={spreadVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TarotCard
                    data={cardData}
                    isSelected={isSelected}
                    selectedCard={isSelected ? selectedCard ?? undefined : undefined}
                    fanRotation={rotation}
                    onClick={() => selectCard(cardData)}
                    disabled={isDisabled}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ---- 选中牌详情面板 ---- */}
      {phase === 'drawn' && selectedCard && (
        <motion.div
          variants={detailVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 max-w-sm w-full mt-2"
        >
          {/* 牌名 & 正逆位 */}
          <div className="text-center mb-4">
            <p className="text-2xl text-amber-200 font-serif">
              {selectedCard.name}
              {selectedCard.isReversed && (
                <span className="text-red-300/90 text-base ml-2 font-normal">
                  逆位
                </span>
              )}
              {!selectedCard.isReversed && (
                <span className="text-amber-400/70 text-base ml-2 font-normal">
                  正位
                </span>
              )}
            </p>
            <p className="text-stone-500 text-xs mt-1">{selectedCard.nameEn}</p>
          </div>

          {/* 逆位警示条 */}
          {selectedCard.isReversed && (
            <div className="w-full h-0.5 bg-red-400/30 mb-3 rounded-full" />
          )}

          {/* 关键词 */}
          <div className="mb-4">
            <p className="text-stone-500 text-xs mb-2">关键词</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedCard.keywords.split('、').map((kw) => (
                <span
                  key={kw}
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCard.isReversed
                      ? 'bg-red-400/10 text-red-300/80 border border-red-400/20'
                      : 'bg-amber-200/10 text-amber-200/80 border border-amber-200/20'
                  }`}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* 请求解读按钮 */}
          {aiState === 'idle' && (
            <button
              type="button"
              onClick={handleAnalyze}
              className="btn-primary w-full"
            >
              请求解读
            </button>
          )}
        </motion.div>
      )}

      {/* AI 解读结果 */}
      <ResultCard state={aiState} result={aiResult} error={aiError} />

      {/* 重新选牌 */}
      {phase === 'drawn' && (
        <button
          type="button"
          onClick={handleReset}
          className="text-stone-400 text-sm hover:text-stone-200 transition-colors"
        >
          重新选牌
        </button>
      )}
    </div>
  );
}
