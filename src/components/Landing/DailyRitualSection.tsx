// ============================================================
// DailyRitualSection —— 日常仪式
// 种下"每天可以来"的种子 · 缓慢旋转光环
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASING } from '../../utils/motion';

export function DailyRitualSection(): ReactNode {
  return (
    <section className="relative min-h-[55vh] flex flex-col items-center justify-center px-4 py-20">
      {/* 光环 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, ease: EASING.enter }}
        className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px] mb-8"
      >
        {/* 静止光环 */}
        <div className="absolute inset-0 rounded-full border border-amber-200/15" />

        {/* 旋转光点 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-200/40"
            style={{ boxShadow: '0 0 8px rgba(253,230,138,0.25)' }}
          />
        </motion.div>
      </motion.div>

      {/* 第一行 */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: DURATION.enterLg, ease: EASING.enter, delay: 0.3 }}
        className="text-xl text-stone-300 font-serif text-center"
      >
        每一天，都可以来坐坐
      </motion.p>

      {/* 第二行 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: DURATION.enterMd, ease: EASING.enter, delay: 0.6 }}
        className="text-stone-500 text-xs text-center mt-3"
      >
        这里不需要答案，只需要一个安静的时刻
      </motion.p>
    </section>
  );
}
