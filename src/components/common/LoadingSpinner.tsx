// ============================================================
// LoadingSpinner —— 呼吸光点 Loading（重构版）
// 替代旋转 spinner · 使用 BreathingDots
// ============================================================

import { type ReactNode } from 'react';
import { BreathingDots } from './BreathingDots';

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = '解卦中...' }: LoadingSpinnerProps): ReactNode {
  return <BreathingDots text={text} />;
}
