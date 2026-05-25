// ============================================================
// HeroSection —— Landing Page 首屏
// 5层空间 · 入场编排 0→2.5s · 持续环境动画
// ============================================================

import { type ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ParticleSystem } from '../common/ParticleSystem';
import { Button } from '../common/Button';
import { DURATION, EASING } from '../../utils/motion';

export function HeroSection(): ReactNode {
  const navigate = useNavigate();
  const [entrancePhase, setEntrancePhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setEntrancePhase(1), 600);
    const t2 = setTimeout(() => setEntrancePhase(2), 1200);
    const t3 = setTimeout(() => setEntrancePhase(3), 1600);
    const t4 = setTimeout(() => setEntrancePhase(4), 2000);
    const t5 = setTimeout(() => setEntrancePhase(5), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ======== Z=-4：虚空黑底 ======== */}
      <div className="absolute inset-0 bg-brand-void" />

      {/* ======== Z=-3：星云光斑 ======== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 光斑A · 左上 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entrancePhase >= 1 ? [0.012, 0.018, 0.012] : 0 }}
          transition={{ duration: DURATION.breatheSlow, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(253,230,138,0.025) 0%, transparent 70%)',
          }}
        />
        {/* 光斑B · 右下 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entrancePhase >= 1 ? [0.006, 0.010, 0.006] : 0 }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[5%] right-[10%] w-[35vw] h-[35vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(253,230,138,0.015) 0%, transparent 70%)',
          }}
        />
        {/* 光斑C · 中右 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entrancePhase >= 1 ? [0.008, 0.014, 0.008] : 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[30%] right-[25%] w-[18vw] h-[18vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(253,230,138,0.020) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ======== Z=-2：粒子系统 ======== */}
      <ParticleSystem
        count={50}
        visible={entrancePhase >= 1}
      />

      {/* ======== Z=-1：毛玻璃光柱 ======== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: entrancePhase >= 2 ? 1 : 0, scale: entrancePhase >= 2 ? 1 : 0.98 }}
        transition={{ duration: 0.8, ease: EASING.enter }}
        className="absolute w-[60vw] h-[80vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(253,230,138,0.03) 0%, transparent 70%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* ======== Z=0：前景内容 ======== */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4"
           style={{ marginTop: '-5vh' }}>

        {/* 品牌名 */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: entrancePhase >= 2 ? 1 : 0, y: entrancePhase >= 2 ? 0 : 10 }}
          transition={{ duration: DURATION.enterLg, ease: EASING.enter }}
          className="text-5xl md:text-6xl text-amber-200 font-serif tracking-[0.3em]"
          style={{
            textShadow: '0 0 40px rgba(253,230,138,0.15), 0 0 80px rgba(253,230,138,0.06)',
          }}
        >
          玄机
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: entrancePhase >= 3 ? 1 : 0 }}
          transition={{ duration: DURATION.enterMd, ease: EASING.enter }}
          className="text-stone-400 text-xs tracking-widest"
        >
          AI 占卜 · 六爻 · 塔罗
        </motion.p>

        {/* 情绪文案 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: entrancePhase >= 3 ? 1 : 0 }}
          transition={{ duration: DURATION.enterMd, ease: EASING.enter, delay: 0.15 }}
          className="text-stone-300/80 text-base italic font-serif mt-2"
        >
          在不确定中，寻一个安放之处
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entrancePhase >= 4 ? 1 : 0 }}
          transition={{ duration: DURATION.enterMd, ease: EASING.enter }}
          className="mt-8"
        >
          <Button variant="cta" size="lg" onClick={() => navigate('/iching')}>
            开始占卜
          </Button>
        </motion.div>
      </div>

      {/* ======== 滚动指示器 ======== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entrancePhase >= 5 ? [0.15, 0.40, 0.15] : 0 }}
        transition={{ duration: DURATION.breathe, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-4 h-4 border-b border-r border-stone-600/40 rotate-45" />
      </motion.div>
    </section>
  );
}
