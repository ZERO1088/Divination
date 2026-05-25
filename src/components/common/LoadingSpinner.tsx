// ============================================================
// LoadingSpinner —— 加载动画占位
// motion.div 旋转动画
// ============================================================

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = '解卦中...' }: LoadingSpinnerProps): ReactNode {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-2 border-amber-200/20
                   border-t-amber-200/60"
      />
      <p className="text-stone-400 text-sm">{text}</p>
    </div>
  );
}
