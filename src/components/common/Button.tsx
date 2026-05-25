// ============================================================
// Button —— 通用按钮组件
// 变体：primary | secondary | ghost | danger | cta | ritual
// ============================================================

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASING } from '../../utils/motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'cta' | 'ritual';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  danger:    'btn-danger',
  cta:       'btn-cta',
  ritual:    'btn-ritual',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps): ReactNode {
  return (
    <motion.button
      whileHover={!props.disabled ? { scale: 1.02 } : undefined}
      whileTap={!props.disabled ? { scale: 0.97 } : undefined}
      transition={{ duration: DURATION.hover, ease: EASING.hover }}
      className={`${variantClass[variant]} ${sizeClass[size]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </motion.button>
  );
}
