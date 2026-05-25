// ============================================================
// FooterSection —— 安静的句号
// ============================================================

import { type ReactNode } from 'react';

export function FooterSection(): ReactNode {
  return (
    <footer className="relative min-h-[22vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="flex items-center gap-4 text-stone-600 text-xs">
        <span>玄机</span>
        <span className="text-stone-700">·</span>
        <a href="#" className="hover:text-amber-200 transition-colors duration-150">关于</a>
        <span className="text-stone-700">·</span>
        <a href="#" className="hover:text-amber-200 transition-colors duration-150">隐私</a>
      </div>
      <p className="text-stone-600/60 text-xs mt-2">
        © 2026 在不确定中，寻一个安放之处
      </p>
    </footer>
  );
}
