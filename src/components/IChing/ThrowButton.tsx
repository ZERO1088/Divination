// ============================================================
// ThrowButton —— 起卦按钮
// 根据 phase 切换文案和 disabled 态
// ============================================================

import { type ReactNode } from 'react';
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
        : `起卦（第 ${currentThrow + 1} / 6 次）`;

  return (
    <button
      type="button"
      onClick={onThrow}
      disabled={isDisabled}
      className="btn-primary min-w-[180px]"
    >
      {label}
    </button>
  );
}
