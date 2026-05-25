// ============================================================
// ThrowButton —— 起卦按钮 (VISUAL_REFACTOR: 仪式圆形按钮)
// 圆形 · 琥珀光晕 · 涟漪反馈 · 状态切换
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { IChingPhase } from '../../types';

interface ThrowButtonProps {
  phase: IChingPhase;
  currentThrow: number;
  onThrow: () => void;
}

export function ThrowButton({ phase, currentThrow, onThrow }: ThrowButtonProps): ReactNode {
  const isDisabled = phase === 'throwing' || phase === 'completed';

  const label =
    phase === 'throwing'
      ? '摇卦中...'
      : phase === 'completed'
        ? '请求解卦'
        : `第 ${currentThrow + 1} / 6`;

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={onThrow}
        disabled={isDisabled}
        whileTap={{ scale: 0.92 }}
        className="ritual-circle"
      >
        <span
          className={`text-sm font-serif tracking-wider ${
            isDisabled ? 'text-amber-200/40' : 'text-amber-200/80'
          }`}
        >
          {label}
        </span>
      </motion.button>

      {!isDisabled && (
        <p className="text-stone-500 text-xs">
          {6 - currentThrow} 次后成卦
        </p>
      )}
    </div>
  );
}
