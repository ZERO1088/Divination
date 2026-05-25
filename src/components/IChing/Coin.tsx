// ============================================================
// Coin —— 单枚铜钱视觉组件
// 用 motion.div 包裹，暴露 variants 接口
// ============================================================

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

export type CoinAnimation = 'initial' | 'flipping' | 'landed';

export interface CoinProps {
  side: '正面' | '反面';
  animate?: CoinAnimation;
}

export const coinVariants: Variants = {
  initial: { opacity: 0, rotateY: 0 },
  flipping: { opacity: [0.3, 0.7, 1], rotateY: [0, 180, 360] },
  landed: { opacity: 1, rotateY: 0 },
};

export function Coin({ side, animate = 'initial' }: CoinProps): ReactNode {
  return (
    <motion.div
      variants={coinVariants}
      initial="initial"
      animate={animate}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-14 h-14 rounded-full bg-amber-200/15 border border-amber-200/30
                 flex items-center justify-center text-amber-200 text-sm font-serif"
    >
      {side === '正面' ? '正' : '反'}
    </motion.div>
  );
}
