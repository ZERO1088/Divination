// ============================================================
// IChingPage —— 六爻占卜页面
// 组合：QuestionInput + IChingBoard + ThrowButton
// 集成：useDeepSeek + 双版本解读（通俗 + 专业）
// ============================================================

import { type ReactNode, useCallback, useState } from 'react';
import { useIChing } from '../../hooks/useIChing';
import { useDeepSeek } from '../../hooks/useDeepSeek';
import { useAppContext } from '../../context/AppContext';
import { buildIChingPrompt } from '../../utils/api';
import { deepseekConfig } from '../../config/api';
import { IChingBoard } from './IChingBoard';
import { ThrowButton } from './ThrowButton';
import { QuestionInput } from '../common/QuestionInput';
import { ResultCard } from '../common/ResultCard';

type InterpretMode = 'popular' | 'professional';

export default function IChingPage(): ReactNode {
  const { phase, lines, currentThrow, throwCoins, hexagram, reset: resetIChing } = useIChing();
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

  /** 动爻索引列表（0-based，初爻=0） */
  const changingIndices = lines
    .filter((l) => l.isChanging)
    .map((l) => l.index);

  /** 动爻的中文描述 */
  const changingLabel = (idx: number): string => {
    const names = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
    return names[idx] ?? `第${idx + 1}爻`;
  };

  /** 组装 Prompt 并请求 AI 解卦 */
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

  /** 重置 */
  const handleReset = useCallback(() => {
    resetIChing();
    resetAI();
  }, [resetIChing, resetAI]);

  // 仅卦象完成后才渲染解读区
  const hex = hexagram?.original;

  return (
    <div className="flex flex-col items-center gap-4 pt-16 pb-12">
      <h1 className="text-3xl text-amber-200 font-serif">六爻起卦</h1>

      {/* 问题输入 */}
      <QuestionInput disabled={phase === 'throwing'} />

      {/* 爻线展示 */}
      <IChingBoard lines={lines} />

      {/* 摇卦按钮 */}
      {phase !== 'completed' && (
        <ThrowButton
          phase={phase}
          currentThrow={currentThrow}
          onThrow={throwCoins}
        />
      )}

      {/* ======== 卦象解读区 ======== */}
      {hex && (
        <div className="flex flex-col gap-4 max-w-2xl w-full mt-4">
          {/* ---- 卦名和基础信息 ---- */}
          <div className="glass-card p-6 text-center">
            <p className="text-2xl text-amber-200 font-serif tracking-widest">
              {hex.name}
            </p>
            <p className="text-stone-400 text-xs mt-1">
              上{hex.upperTrigram}下{hex.lowerTrigram} · 第{hex.id}卦
            </p>
            <p className="text-stone-300 text-sm mt-3 leading-relaxed italic">
              「{hex.description}」
            </p>
          </div>

          {/* ---- 变卦信息 ---- */}
          {hexagram?.changed && changingIndices.length > 0 && (
            <div className="glass-card p-5 text-center border-l-4 border-amber-400/40">
              <p className="text-amber-300/80 font-serif text-lg">
                之卦：{hexagram.changed.name}
              </p>
              <p className="text-stone-400 text-xs mt-1">
                上{hexagram.changed.upperTrigram}下{hexagram.changed.lowerTrigram}
              </p>
              <p className="text-stone-400 text-sm mt-2 leading-relaxed italic">
                「{hexagram.changed.description}」
              </p>
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-amber-200/60 text-sm">
                  动爻：
                  {changingIndices.map((idx) => (
                    <span key={idx} className="text-amber-400 font-serif mx-1">
                      {changingLabel(idx)}
                    </span>
                  ))}
                </p>
                <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                  老阳变少阴、老阴变少阳。动爻之处，以变卦爻辞参看。
                </p>
              </div>
            </div>
          )}

          {/* ---- 解读模式切换 + 内容 ---- */}
          <div className="glass-card p-6">
            {/* 模式切换 tab */}
            <div className="flex gap-1 mb-4 bg-white/5 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setInterpretMode('popular')}
                className={`flex-1 py-2 rounded-md text-sm font-serif transition-colors ${
                  interpretMode === 'popular'
                    ? 'bg-amber-200/15 text-amber-200'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                通俗解读
              </button>
              <button
                type="button"
                onClick={() => setInterpretMode('professional')}
                className={`flex-1 py-2 rounded-md text-sm font-serif transition-colors ${
                  interpretMode === 'professional'
                    ? 'bg-amber-200/15 text-amber-200'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                专业解读
              </button>
            </div>

            {/* 通俗版 */}
            {interpretMode === 'popular' && (
              <div className="space-y-4">
                <div>
                  <p className="text-amber-200/70 font-serif text-sm mb-1">卦辞今译</p>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {hex.popularDescription}
                  </p>
                </div>
                <div>
                  <p className="text-amber-200/70 font-serif text-sm mb-1">通俗解读</p>
                  <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                    {hex.popularJudgment}
                  </p>
                </div>

                {/* 象辞 */}
                <div className="pt-2 border-t border-white/10">
                  <p className="text-stone-500 text-xs leading-relaxed italic">
                    《象》曰：{hex.image}
                  </p>
                </div>
              </div>
            )}

            {/* 专业版 */}
            {interpretMode === 'professional' && (
              <div className="space-y-4">
                <div>
                  <p className="text-amber-200/70 font-serif text-sm mb-1">彖辞</p>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    《彖》曰：{hex.judgment}
                  </p>
                </div>
                <div>
                  <p className="text-amber-200/70 font-serif text-sm mb-1">象辞</p>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    《象》曰：{hex.image}
                  </p>
                </div>
                <div>
                  <p className="text-amber-200/70 font-serif text-sm mb-1">专业分析</p>
                  <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                    {hex.professionalInterpretation}
                  </p>
                </div>

                {/* 爻辞列表（动爻高亮） */}
                <div className="pt-2 border-t border-white/10">
                  <p className="text-amber-200/70 font-serif text-sm mb-2">六爻爻辞</p>
                  <ul className="space-y-1">
                    {hex.lines.map((lineText, i) => {
                      const isChanging = changingIndices.includes(i);
                      return (
                        <li
                          key={i}
                          className={`text-xs leading-relaxed px-2 py-1 rounded ${
                            isChanging
                              ? 'bg-amber-200/10 text-amber-300 font-serif border-l-2 border-amber-400'
                              : 'text-stone-500'
                          }`}
                        >
                          {lineText}
                          {isChanging && (
                            <span className="text-amber-400 ml-1">← 动爻</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* ---- AI 解卦按钮 ---- */}
          {aiState === 'idle' && (
            <button
              type="button"
              onClick={handleAnalyze}
              className="btn-primary min-w-[180px] self-center"
            >
              请求 AI 深度解卦
            </button>
          )}

          {/* ---- AI 解读结果 ---- */}
          <ResultCard state={aiState} result={aiResult} error={aiError} />
        </div>
      )}

      {/* 重置按钮 */}
      {phase === 'completed' && (
        <button
          type="button"
          onClick={handleReset}
          className="text-stone-400 text-sm mt-2 hover:text-stone-200 transition-colors"
        >
          重新起卦
        </button>
      )}
    </div>
  );
}
