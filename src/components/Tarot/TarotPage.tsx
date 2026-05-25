// ============================================================
// TarotPage —— 塔罗占卜页面 (VISUAL_REFACTOR: 聚光灯舞台)
// 阶段驱动：idle → drawn（选中牌脱离网格 + 侧翼揭示）
//           → AI 命中句 → 渐进展开
// ============================================================

import { type ReactNode, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTarot } from '../../hooks/useTarot';
import { useDeepSeek } from '../../hooks/useDeepSeek';
import { useAppContext } from '../../context/AppContext';
import { buildTarotPrompt, stripMarkdown } from '../../utils/api';
import { deepseekConfig } from '../../config/api';
import { type TarotCardData } from '../../constants/tarotData';
import { TarotCard } from './TarotCard';
import { CardReveal } from './CardReveal';
import { QuestionInput } from '../common/QuestionInput';
import { BreathingDots } from '../common/BreathingDots';
import type { APIError } from '../../types';

// ---- 牌阵参数 ----
const CARDS_PER_ROW = 11;
const MAX_FAN_ANGLE = 7;

function fanAngle(colIndex: number, totalInRow: number): number {
  const center = (totalInRow - 1) / 2;
  return (colIndex - center) * (MAX_FAN_ANGLE / center);
}

// ============================================================
// TarotPage
// ============================================================
export default function TarotPage(): ReactNode {
  const {
    phase,
    selectedCard,
    selectedIndex,
    shuffledCards,
    selectCard,
    reset: resetTarot,
  } = useTarot();
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

  const rows = useMemo(() => {
    const row0 = shuffledCards.slice(0, CARDS_PER_ROW);
    const row1 = shuffledCards.slice(CARDS_PER_ROW);
    return [row0, row1];
  }, [shuffledCards]);

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

  const handleReset = useCallback(() => {
    resetTarot();
    resetAI();
  }, [resetTarot, resetAI]);

  const showSpotlight = phase === 'drawn';

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* ---- 牌阵层（始终渲染，drawn 时弱化） ---- */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center pb-32">
        <div className="w-full max-w-lg px-4 mb-8">
          <QuestionInput disabled={phase === 'drawn'} />
        </div>

        <div className="relative w-full px-4">
          {rows.map((rowCards, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-wrap justify-center gap-2 mb-3"
            >
              {rowCards.map((cardData, colIdx) => {
                const globalIdx = rowIdx * CARDS_PER_ROW + colIdx;
                const rotation = fanAngle(colIdx, rowCards.length);
                const isSelected = selectedIndex === cardData.id;
                const isDimmed = phase === 'drawn' && !isSelected;

                return (
                  <motion.div
                    key={cardData.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: globalIdx * 0.025,
                      duration: 0.35,
                      ease: 'easeOut',
                    }}
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <TarotCard
                      data={cardData}
                      isSelected={isSelected}
                      selectedCard={
                        isSelected ? selectedCard ?? undefined : undefined
                      }
                      onClick={() => selectCard(cardData)}
                      disabled={phase === 'drawn'}
                      dimmed={isDimmed}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ---- 舞台：聚光灯牌 + 侧翼面板 ---- */}
      <AnimatePresence>
        {showSpotlight && selectedCard && aiState === 'idle' && (
          <motion.div
            key="spotlight-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-20 flex items-center justify-center"
          >
            <div className="absolute inset-0 stage-mask" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
              {/* 左侧：聚光灯牌 */}
              <div className="flex-shrink-0 relative flex justify-center lg:w-[40%]">
                <div className="absolute inset-0 spotlight-bg" />
                <motion.div
                  initial={{ scale: 0.55, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="relative z-10"
                >
                  <TarotCard
                    data={
                      shuffledCards.find((c) => c.id === selectedCard.id) ??
                      shuffledCards[0]
                    }
                    isSelected={true}
                    selectedCard={selectedCard}
                    onClick={() => {}}
                    disabled={true}
                    spotlight
                  />
                </motion.div>
              </div>

              {/* 右侧：CardReveal */}
              <div className="lg:w-[55%] flex items-start pt-4">
                <CardReveal
                  name={selectedCard.name}
                  nameEn={selectedCard.nameEn}
                  isReversed={selectedCard.isReversed}
                  keywords={selectedCard.keywords}
                  meaning={
                    selectedCard.isReversed
                      ? selectedCard.reversedMeaning
                      : selectedCard.meaning
                  }
                  onAnalyze={handleAnalyze}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- AI Loading ---- */}
      <AnimatePresence>
        {phase === 'drawn' && aiState === 'loading' && (
          <motion.div
            key="ai-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-center justify-center stage-mask"
          >
            <BreathingDots text="正在感应你的问题……" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- AI 成功：命中句 + 渐进展开 ---- */}
      <AnimatePresence>
        {phase === 'drawn' && aiState === 'success' && aiResult && (
          <motion.div
            key="ai-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-30"
          >
            <DestinyProgressiveReveal
              content={stripMarkdown(aiResult.content)}
              model={aiResult.model}
              cardName={selectedCard?.name}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- AI 错误 ---- */}
      <AnimatePresence>
        {phase === 'drawn' && aiState === 'error' && (
          <motion.div
            key="ai-error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-30 flex items-center justify-center stage-mask"
          >
            <div className="max-w-md text-center px-6">
              <p className="text-amber-200/70 font-serif text-sm mb-3">
                请求异常
              </p>
              {aiError && (
                <span className="inline-block px-2 py-0.5 rounded text-xs bg-red-400/10 text-red-300/80 mb-3">
                  {aiError.type === 'timeout'
                    ? '超时'
                    : aiError.type === 'network'
                      ? '网络错误'
                      : aiError.type === 'server'
                        ? '服务器错误'
                        : '未知错误'}
                </span>
              )}
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                {aiResult?.content ?? '玄机未显，请稍后再试'}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="text-stone-500 text-sm hover:text-amber-200/70 transition-colors"
              >
                重新抽牌
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// 命中句 + 渐进展开 内联组件
// ============================================================

function DestinyProgressiveReveal({
  content,
  model,
  cardName,
  onReset,
}: {
  content: string;
  model?: string;
  cardName?: string;
  onReset: () => void;
}): ReactNode {
  const [viewPhase, setViewPhase] = useState<'destiny' | 'reading'>('destiny');

  const { destinyLine, sections } = useMemo(() => {
    const match = content.match(/^(.+?[。！？…])/);
    const line = match ? match[1] : content.slice(0, 30);
    const rest = match
      ? content.slice(match[0].length).trim()
      : content.slice(30).trim();

    const raw = rest
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    let secs: string[];
    if (raw.length === 0) {
      secs = [];
    } else if (raw.length === 1) {
      const sentences = raw[0].split(/(?<=[。！？…])/);
      const chunks: string[] = [];
      let buf = '';
      for (const s of sentences) {
        buf += s;
        if (buf.length > 80) {
          chunks.push(buf.trim());
          buf = '';
        }
      }
      if (buf.trim()) chunks.push(buf.trim());
      secs = chunks.length <= 1 ? raw : chunks;
    } else {
      secs = raw;
    }
    return { destinyLine: line, sections: secs };
  }, [content]);

  return (
    <div className="relative w-full min-h-screen">
      {/* 弱化牌名背景锚点 */}
      {cardName && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none">
          <p className="text-amber-200/[0.06] font-serif text-6xl tracking-widest blur-sm">
            {cardName}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {viewPhase === 'destiny' && (
          <motion.div
            key="destiny"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', y: -20 }}
            transition={{ duration: 0.6 }}
            className="destiny-sentence flex flex-col items-center cursor-pointer"
            onClick={() => setViewPhase('reading')}
          >
            <DestinyTypewriter text={destinyLine} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-stone-500 text-sm mt-10 hover:text-amber-200/60 transition-colors"
            >
              ↓ 轻触展开全文
            </motion.p>
          </motion.div>
        )}

        {viewPhase === 'reading' && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="w-full max-w-[620px] mx-auto px-6 pt-32 pb-24"
          >
            <p className="text-amber-200/80 font-serif text-lg text-center mb-6">
              {destinyLine}
            </p>

            {sections.map((section, i) => (
              <ProgressiveSection
                key={i}
                text={section}
                index={i}
              />
            ))}

            {model && (
              <p className="text-stone-600 text-xs text-center mt-16">
                {model === 'demo' ? 'Demo 模式' : `模型：${model}`}
              </p>
            )}

            <div className="text-center mt-20">
              <button
                type="button"
                onClick={onReset}
                className="text-stone-600 text-sm hover:text-amber-200/50 transition-colors"
              >
                重新抽牌
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// 命中句逐字浮现
// ============================================================

function DestinyTypewriter({ text }: { text: string }): ReactNode {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let idx = 0;
    const advance = () => {
      if (idx >= text.length) {
        setDone(true);
        return;
      }
      const char = text[idx];
      idx += 1;
      setDisplayed(text.slice(0, idx));
      let delay = 120;
      if (char === '，') delay = 200;
      if (char === '。') delay = 350;
      if (char === '！' || char === '？') delay = 380;
      if (char === '…') delay = 400;
      timerRef.current = setTimeout(advance, delay);
    };
    timerRef.current = setTimeout(advance, 80);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text]);

  return (
    <p className="text-2xl sm:text-3xl text-amber-200 font-serif tracking-wider leading-relaxed text-center max-w-lg">
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-block w-[2px] h-6 bg-amber-200/50 ml-1 align-middle"
        />
      )}
    </p>
  );
}

// ============================================================
// 渐进展开章节
// ============================================================

function ProgressiveSection({
  text,
  index,
}: {
  text: string;
  index: number;
}): ReactNode {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300 + index * 400);
    return () => clearTimeout(timer);
  }, [index]);

  const { label, body } = useMemo(() => {
    const m = text.match(/^(.{2,6}[：:])\s*/);
    if (m) {
      return { label: m[1], body: text.slice(m[0].length) };
    }
    return { label: null, body: text };
  }, [text]);

  return (
    <div>
      {index > 0 && <div className="section-divider" />}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {label && (
              <p className="text-amber-200/60 font-serif text-sm tracking-wider mb-3">
                {label}
              </p>
            )}
            <p className="text-stone-300 text-sm leading-loose whitespace-pre-line">
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
