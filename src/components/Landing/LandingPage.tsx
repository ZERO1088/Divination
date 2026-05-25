// ============================================================
// LandingPage —— 首页完整组装
// 7个 Section · 连续空间 · 虚空黑全局底色
// ============================================================

import { type ReactNode } from 'react';
import { HeroSection } from './HeroSection';
import { RitualEntrySection } from './RitualEntrySection';
import { EmotionalHookSection } from './EmotionalHookSection';
import { AICompanionSection } from './AICompanionSection';
import { DailyRitualSection } from './DailyRitualSection';
import { ReflectionSection } from './ReflectionSection';
import { FooterSection } from './FooterSection';

export default function LandingPage(): ReactNode {
  return (
    <div className="min-h-screen bg-brand-void">
      <HeroSection />
      <RitualEntrySection />
      <EmotionalHookSection />
      <AICompanionSection />
      <DailyRitualSection />
      <ReflectionSection />
      <FooterSection />
    </div>
  );
}
