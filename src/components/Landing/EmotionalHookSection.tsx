// ============================================================
// EmotionalHookSection —— 情绪峰值
// 一句话击穿防线 · 极致虚空 · 从模糊到清晰
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { blurRevealVariants } from '../../utils/motion';

export function EmotionalHookSection(): ReactNode {
  return (
    <section className="relative min-h-[65vh] flex flex-col items-center justify-center px-4"
             style={{ background: '#06080b' }}>
      <motion.blockquote
        variants={blurRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15%' }}
        className="text-center max-w-prose"
      >
        <p className="text-xl md:text-2xl text-stone-300 italic font-serif leading-loose"
           style={{ textShadow: '0 0 20px rgba(253,230,138,0.08)' }}>
          你不需要一个正确答案，
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-stone-300 italic font-serif leading-loose"
          style={{ textShadow: '0 0 20px rgba(253,230,138,0.08)' }}
        >
          你只需要一个认真的回应。
        </motion.p>
      </motion.blockquote>
    </section>
  );
}
