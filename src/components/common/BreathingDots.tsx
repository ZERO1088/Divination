// ============================================================
// BreathingDots —— 呼吸光点 Loading
// 替代旋转 spinner · 三个光点依次明灭
// ============================================================

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { DURATION } from '../../utils/motion';

interface BreathingDotsProps {
  text?: string;
}

export function BreathingDots({ text = '正在感应你的问题……' }: BreathingDotsProps): ReactNode {
  const dots = [0, 1, 2];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1.5">
        {dots.map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-amber-200/50"
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: DURATION.breathe * 0.7,
              repeat: Infinity,
              delay: i * (DURATION.breathe * 0.7) / 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      {text && (
        <p className="text-stone-400 text-sm text-center">{text}</p>
      )}
    </div>
  );
}
