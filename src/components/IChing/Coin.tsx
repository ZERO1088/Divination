// ============================================================
// Coin —— 单枚铜钱组件 (仪式增强版)
// 三态：hidden → tossing(抛起旋转) → landed(落定显面)
// ============================================================

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

export interface CoinProps {
  /** 铜钱面值：2=反面, 3=正面, 0=未揭示（抛转中） */
  value: number;
  /** 抛掷动画阶段 */
  stage: 'hidden' | 'tossing' | 'landed';
}

export function Coin({ value, stage }: CoinProps): ReactNode {
  const isHead = value === 3;
  const label = value === 0 ? '' : isHead ? '正' : '反';

  return (
    <motion.div
      initial={
        stage === 'hidden'
          ? { opacity: 0, scale: 0.6 }
          : false
      }
      animate={
        stage === 'tossing'
          ? {
              opacity: 1,
              y: [-2, -40, 0],
              rotateZ: [0, 720, 720],
              scale: [0.6, 1.05, 1],
              transition: { duration: 0.55, ease: 'easeOut' },
            }
          : stage === 'landed'
            ? {
                opacity: 1,
                y: 0,
                rotateZ: 0,
                scale: 1,
                transition: { duration: 0.25, ease: 'easeOut' },
              }
            : { opacity: 0, scale: 0.6 }
      }
      className={`w-13 h-13 rounded-full flex items-center justify-center font-serif text-sm select-none ${
        value === 0
          ? 'bg-amber-200/10 border border-amber-200/20 text-transparent'
          : isHead
            ? 'bg-amber-200/18 border border-amber-200/35 text-amber-200'
            : 'bg-stone-400/10 border border-stone-400/25 text-stone-400'
      }`}
    >
      {label}
    </motion.div>
  );
}

/** 三枚铜钱并排容器 */
export function CoinTrio({
  coinValues,
  stage,
}: {
  coinValues: [number, number, number] | null;
  stage: 'hidden' | 'tossing' | 'landed';
}): ReactNode {
  if (!coinValues) return null;
  return (
    <div className="flex items-center justify-center gap-3">
      {coinValues.map((v, i) => (
        <Coin
          key={i}
          value={v}
          stage={v === 0 && stage === 'landed' ? 'tossing' : stage}
        />
      ))}
    </div>
  );
}
