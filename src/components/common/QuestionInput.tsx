// ============================================================
// QuestionInput —— 用户问题输入组件
// 受控组件，存入 AppContext
// ============================================================

import { type ReactNode } from 'react';
import { useAppContext } from '../../context/AppContext';

interface QuestionInputProps {
  disabled?: boolean;
}

export function QuestionInput({ disabled = false }: QuestionInputProps): ReactNode {
  const { question, setQuestion } = useAppContext();

  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={disabled}
        placeholder="默念所问之事（可选）"
        maxLength={100}
        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                   text-stone-200 placeholder-stone-500 text-sm
                   focus:outline-none focus:border-amber-200/30 focus:bg-white/8
                   transition-all duration-300 disabled:opacity-40"
      />
    </div>
  );
}
