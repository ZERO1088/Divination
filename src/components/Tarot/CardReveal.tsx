// ============================================================
// CardReveal —— 塔罗揭示面板 (VISUAL_REFACTOR: 侧翼展开)
// 从右侧滑入 · 与选中牌构成左右分栏
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardRevealProps {
  name: string;
  nameEn?: string;
  isReversed: boolean;
  keywords: string;
  meaning: string;
  onAnalyze?: () => void;
  analyzeLabel?: string;
}

export function CardReveal({
  name,
  nameEn,
  isReversed,
  keywords,
  meaning,
  onAnalyze,
  analyzeLabel = '请求解读',
}: CardRevealProps): ReactNode {
  const keywordList = keywords.split('、');

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0, 0, 0.2, 1], delay: 0.15 }}
      className="w-full max-w-sm"
    >
      {/* 牌名 —— 大字号 */}
      <div className="mb-5">
        <h2
          className={`text-3xl font-serif ${
            isReversed ? 'text-red-200/90' : 'text-amber-200'
          }`}
        >
          {name}
          <span
            className={`text-base ml-2 font-sans ${
              isReversed ? 'text-red-300/70' : 'text-amber-400/60'
            }`}
          >
            {isReversed ? '逆位' : '正位'}
          </span>
        </h2>
        {nameEn && (
          <p className="text-stone-500 text-xs mt-1 tracking-wide">
            {nameEn}
          </p>
        )}
      </div>

      {/* 逆位警示条 */}
      {isReversed && (
        <div className="w-full h-px bg-red-400/25 mb-4 rounded-full" />
      )}

      {/* 含义 —— 引号 + 金线左边框 */}
      <div
        className={`pl-4 mb-5 ${
          isReversed
            ? 'border-l-2 border-red-400/30'
            : 'border-l-2 border-amber-200/30'
        }`}
      >
        <p className="text-stone-300 text-base leading-relaxed">
          「{meaning}」
        </p>
      </div>

      {/* 关键词 —— 浮动标签 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {keywordList.map((kw, i) => (
          <motion.span
            key={kw}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
              delay: 0.3 + i * 0.06,
            }}
            className={`px-3 py-1 rounded-full text-xs ${
              isReversed
                ? 'bg-red-400/8 text-red-300/80 border border-red-400/18'
                : 'bg-amber-200/8 text-amber-200/80 border border-amber-200/18'
            }`}
          >
            {kw}
          </motion.span>
        ))}
      </div>

      {/* 解读按钮 —— "门"的视觉 */}
      {onAnalyze && (
        <button
          type="button"
          onClick={onAnalyze}
          className="w-full px-6 py-4 rounded-2xl font-serif tracking-widest text-base
                     bg-amber-200/[0.06] text-amber-200/90
                     border border-amber-200/20
                     hover:bg-amber-200/[0.14] hover:border-amber-200/35
                     hover:shadow-[0_0_48px_rgba(253,230,138,0.16),0_0_80px_rgba(253,230,138,0.06)]
                     active:scale-[0.97]
                     transition-all duration-200"
        >
          {analyzeLabel}
        </button>
      )}
    </motion.div>
  );
}
