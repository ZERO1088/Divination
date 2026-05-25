// ============================================================
// ModeSelector —— 路由驱动的模式切换导航
// 当前模式唯一由 URL 决定，不从 Context 读取 mode
// ============================================================

import { type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { DivinationMode } from '../types';

interface ModeConfig {
  mode: DivinationMode;
  label: string;
  path: string;
}

const MODES: ModeConfig[] = [
  { mode: 'iching', label: '六爻', path: '/iching' },
  { mode: 'tarot', label: '塔罗', path: '/tarot' },
];

export function ModeSelector(): ReactNode {
  const navigate = useNavigate();
  const location = useLocation();

  // 从 URL 派生当前模式，单一数据源
  const currentMode: DivinationMode =
    location.pathname.startsWith('/tarot') ? 'tarot' : 'iching';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-lg mx-auto flex justify-center gap-1 p-2">
        {MODES.map(({ mode, label, path }) => (
          <button
            key={mode}
            type="button"
            onClick={() => navigate(path)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentMode === mode
                ? 'bg-amber-200/10 text-amber-200'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
