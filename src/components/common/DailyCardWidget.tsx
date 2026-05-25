// ============================================================
// DailyCardWidget —— 每日仪式轻量卡片
// "今日一言" · 便签风格 · 极弱光晕
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASING } from '../../utils/motion';

interface DailyCardWidgetProps {
  quote: string;
  suggestion?: string;
}

export function DailyCardWidget({ quote, suggestion }: DailyCardWidgetProps): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.enterMd, ease: EASING.enter }}
      className="glass-card-sm p-5 max-w-[280px] flex flex-col items-center text-center"
    >
      {/* 标题 */}
      <p className="text-amber-200/70 font-serif tracking-widest text-xs mb-4">
        今 日 一 言
      </p>

      {/* 引用 */}
      <p className="text-stone-300 text-sm leading-relaxed italic mb-4">
        「{quote}」
      </p>

      {/* 分割 */}
      <div className="w-4 h-px bg-white/10 mb-3" />

      {/* 建议 */}
      {suggestion && (
        <p className="text-stone-500 text-xs">
          {suggestion}
        </p>
      )}
    </motion.div>
  );
}
