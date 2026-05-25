// ============================================================
// IChingPage —— 六爻占卜页面 (VISUAL_REFACTOR: 仪式空间)
// 爻线仪式 · 卦象卷轴面板 · pill 模式切换 · AI 命中句
// ============================================================

import { type ReactNode, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIChing } from '../../hooks/useIChing';
import { useDeepSeek } from '../../hooks/useDeepSeek';
import { useAppContext } from '../../context/AppContext';
import { buildIChingPrompt } from '../../utils/api';
import { deepseekConfig } from '../../config/api';
import { IChingBoard } from './IChingBoard';
import { ThrowButton } from './ThrowButton';
import { QuestionInput } from '../common/QuestionInput';
import { AIResponseCard } from '../common/AIResponseCard';

type InterpretMode = 'popular' | 'professional';

export default function IChingPage(): ReactNode {
  const {
    phase,
    lines,
    currentThrow,
    coinValues,
    throwCoins,
    hexagram,
    reset: resetIChing,
  } = useIChing();
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

  const [interpretMode, setInterpretMode] = useState<InterpretMode>('popular');

  const changingIndices = lines
    .filter((l) => l.isChanging)
    .map((l) => l.index);

  const changingLabel = (idx: number): string => {
    const names = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
    return names[idx] ?? `第${idx + 1}爻`;
  };

  const handleAnalyze = useCallback(() => {
    if (!hexagram?.original) return;
    const prompt = buildIChingPrompt({
      originalName: hexagram.original.name,
      originalDesc: hexagram.original.description,
      originalJudgment: hexagram.original.judgment,
      originalImage: hexagram.original.image,
      originalLines: hexagram.original.lines.join('\n'),
      popularDesc: hexagram.original.popularDescription,
      popularJudgment: hexagram.original.popularJudgment,
      professionalInterpretation: hexagram.original.professionalInterpretation,
      changedName: hexagram.changed?.name,
      changedDesc: hexagram.changed?.description,
      changedJudgment: hexagram.changed?.judgment,
      changingLines: changingIndices.map((i) => changingLabel(i)).join('、'),
      question,
    });
    analyze(prompt);
  }, [hexagram, question, analyze, changingIndices]);

  const handleReset = useCallback(() => {
    resetIChing();
    resetAI();
  }, [resetIChing, resetAI]);

  const hex = hexagram?.original;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      {/* 问题输入 */}
      <div className="w-full max-w-lg px-4 pt-24 pb-6">
        <QuestionInput disabled={phase === 'throwing'} />
      </div>

      {/* 爻线区域 */}
      <IChingBoard
        lines={lines}
        coinValues={coinValues}
        phase={phase}
        activeIndex={currentThrow}
      />

      {/* 摇卦按钮 */}
      {phase !== 'completed' && (
        <ThrowButton
          phase={phase}
          currentThrow={currentThrow}
          onThrow={throwCoins}
        />
      )}

      {/* ================================================================
          卦象完成 —— 仪式结果
          ================================================================ */}
      <AnimatePresence>
        {hex && phase === 'completed' && (
          <motion.div
            key="hexagram-result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
            className="w-full max-w-xl mx-auto px-4 mt-4 flex flex-col gap-6"
          >
            {/* 卦名 —— 大字浮现 */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl text-amber-200 font-serif tracking-widest"
              >
                {hex.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-stone-400 text-xs mt-2"
              >
                上{hex.upperTrigram}下{hex.lowerTrigram} · 第{hex.id}卦
              </motion.p>
            </div>

            {/* 卦辞引用 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card-static p-6"
            >
              <p className="text-stone-300 text-sm leading-relaxed italic border-l-2 border-amber-200/30 pl-4">
                「{hex.description}」
              </p>
            </motion.div>

            {/* 变卦信息 */}
            {hexagram?.changed && changingIndices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="glass-card-accent p-5"
              >
                <p className="text-amber-300/80 font-serif text-lg text-center">
                  之卦：{hexagram.changed.name}
                </p>
                <p className="text-stone-400 text-xs text-center mt-1">
                  上{hexagram.changed.upperTrigram}下{hexagram.changed.lowerTrigram}
                </p>
                <p className="text-stone-400 text-sm mt-2 text-center italic">
                  「{hexagram.changed.description}」
                </p>
                <div className="mt-3 pt-3 border-t border-white/08">
                  <p className="text-amber-200/60 text-sm text-center">
                    动爻：
                    {changingIndices.map((idx) => (
                      <span key={idx} className="text-amber-400 font-serif mx-1">
                        {changingLabel(idx)}
                      </span>
                    ))}
                  </p>
                  <p className="text-stone-500 text-xs mt-1 text-center">
                    老阳变少阴、老阴变少阳。动爻之处，以变卦爻辞参看。
                  </p>
                </div>
              </motion.div>
            )}

            {/* 解读模式 —— pill 切换器 */}
            <div className="glass-card-static p-6">
              <div className="flex justify-center gap-1 mb-5 bg-white/[0.03] rounded-full p-1 w-fit mx-auto">
                <button
                  type="button"
                  onClick={() => setInterpretMode('popular')}
                  className={`px-5 py-2 rounded-full text-sm font-serif transition-all duration-200 ${
                    interpretMode === 'popular'
                      ? 'bg-amber-200/15 text-amber-200 shadow-[0_0_16px_rgba(253,230,138,0.08)]'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  通俗解读
                </button>
                <button
                  type="button"
                  onClick={() => setInterpretMode('professional')}
                  className={`px-5 py-2 rounded-full text-sm font-serif transition-all duration-200 ${
                    interpretMode === 'professional'
                      ? 'bg-amber-200/15 text-amber-200 shadow-[0_0_16px_rgba(253,230,138,0.08)]'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  专业解读
                </button>
              </div>

              <AnimatePresence mode="wait">
                {interpretMode === 'popular' && (
                  <motion.div
                    key="popular"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <p className="text-amber-200/60 font-serif text-sm tracking-wider mb-2">
                        卦辞今译
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed">
                        {hex.popularDescription}
                      </p>
                    </div>
                    <div>
                      <p className="text-amber-200/60 font-serif text-sm tracking-wider mb-2">
                        通俗解读
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                        {hex.popularJudgment}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/06">
                      <p className="text-stone-500 text-xs leading-relaxed italic">
                        《象》曰：{hex.image}
                      </p>
                    </div>
                  </motion.div>
                )}

                {interpretMode === 'professional' && (
                  <motion.div
                    key="professional"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div>
                      <p className="text-amber-200/60 font-serif text-sm tracking-wider mb-2">
                        彖辞
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed">
                        {hex.judgment}
                      </p>
                    </div>
                    <div className="mt-5">
                      <p className="text-amber-200/60 font-serif text-sm tracking-wider mb-2">
                        专业解读
                      </p>
                      <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                        {hex.professionalInterpretation}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-white/06">
                      <p className="text-stone-500 text-xs leading-relaxed italic">
                        《象》曰：{hex.image}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-amber-200/60 font-serif text-sm tracking-wider mb-2">
                        爻辞
                      </p>
                      <div className="space-y-1.5">
                        {hex.lines.map((line, i) => (
                          <p
                            key={i}
                            className={`text-xs leading-relaxed ${
                              changingIndices.includes(i)
                                ? 'text-amber-200/80'
                                : 'text-stone-500'
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI 解读按钮 */}
            {aiState === 'idle' && (
              <button
                type="button"
                onClick={handleAnalyze}
                className="btn-ritual w-full max-w-sm mx-auto"
              >
                请求 AI 解读
              </button>
            )}

            {/* AIResponseCard（命中句 + 渐进展开） */}
            <AIResponseCard
              state={aiState}
              result={aiResult}
              error={aiError}
              title="解卦结果"
            />

            {/* 重新开始 */}
            {aiState === 'success' && (
              <div className="text-center pb-12">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-stone-600 text-sm hover:text-amber-200/50 transition-colors"
                >
                  重新起卦
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
