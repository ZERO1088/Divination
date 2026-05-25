// ============================================================
// IChingBoard —— 六条爻线展示区
// 自上而下显示：上爻 → 初爻
// 已摇出的爻带 motion 入场动画，未摇爻显示占位符
// ============================================================

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import type { Line } from '../../types';

interface IChingBoardProps {
  lines: Line[];
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

/** 获取爻的显示符号 */
function lineSymbol(line: Line): string {
  const isYang = line.type === '老阳' || line.type === '少阳';
  return isYang ? '━━━━━' : '━━ ╋ ━━';
}

export function IChingBoard({ lines }: IChingBoardProps): ReactNode {
  // 构建6个槽位（index 0-5），反转以便上爻在上方显示
  const slots = Array.from({ length: 6 }, (_, i) => {
    const line = lines.find((l) => l.index === i);
    return { index: i, line };
  }).reverse();

  return (
    <div className="flex flex-col gap-2 w-72">
      {slots.map(({ index, line }) => (
        <motion.div
          key={index}
          variants={lineVariants}
          initial="hidden"
          animate={line ? 'visible' : 'hidden'}
          transition={{ duration: 0.3 }}
          className="h-10 flex items-center justify-center"
        >
          {line ? (
            <div className="flex items-center gap-2">
              <span className="text-amber-200 font-serif text-lg tracking-widest">
                {lineSymbol(line)}
              </span>
              {line.isChanging && (
                <span className="text-amber-400 text-xs">○</span>
              )}
              <span className="text-stone-500 text-xs w-8 text-right">
                {line.type}
              </span>
            </div>
          ) : (
            <span className="text-stone-700 text-lg">· · ·</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
