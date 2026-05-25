// ============================================================
// RitualButton —— 仪式按钮
// 六爻起卦 / 塔罗请求解读 · 比普通 CTA 更强的发光和仪式感
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASING, GLOW } from '../../utils/motion';

interface RitualButtonProps {
  /** 按钮文案 */
  label: string;
  /** 副文案（如 "第 3/6 次"） */
  subLabel?: string;
  /** 是否禁用（摇卦中/牌已选） */
  disabled?: boolean;
  /** 点击回调 */
  onClick: () => void;
  /** 发光强度级别 */
  glowLevel?: 'normal' | 'peak';
}

export function RitualButton({
  label,
  subLabel,
  disabled = false,
  onClick,
  glowLevel = 'normal',
}: RitualButtonProps): ReactNode {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.03 } : undefined}
      whileTap={!disabled ? { scale: 0.96 } : undefined}
      transition={{ duration: DURATION.hover, ease: EASING.hover }}
      className="btn-ritual flex flex-col items-center gap-1"
      style={{
        boxShadow: glowLevel === 'peak'
          ? GLOW.ritual
          : disabled
            ? 'none'
            : undefined,
      }}
    >
      <span>{label}</span>
      {subLabel && (
        <span className="text-stone-500 text-xs font-normal tracking-normal">
          {subLabel}
        </span>
      )}
    </motion.button>
  );
}
