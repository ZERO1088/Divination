// ============================================================
// Input —— 通用输入框
// 设计：虚空中被轻轻擦亮的区域
// ============================================================

import { type ReactNode, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 输入框宽度约束 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
}

const maxWidthClass = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'w-full',
};

export function Input({
  maxWidth = 'sm',
  className = '',
  ...props
}: InputProps): ReactNode {
  return (
    <div className={`w-full ${maxWidthClass[maxWidth]}`}>
      <input
        className={`w-full px-4 py-2 rounded-xl
                    bg-white/5 border border-white/10
                    text-stone-200 placeholder-stone-500 text-sm
                    focus:outline-none focus:border-amber-200/30 focus:bg-white/8
                    focus:shadow-[0_0_12px_rgba(253,230,138,0.08)]
                    transition-all duration-300
                    disabled:opacity-40 disabled:cursor-not-allowed
                    ${className}`}
        {...props}
      />
    </div>
  );
}
