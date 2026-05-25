// ============================================================
// ReflectionSection —— 情绪回响
// 三条匿名情绪碎片 · 从模糊到清晰
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { blurRevealVariants, STAGGER } from '../../utils/motion';

const FRAGMENTS = [
  '我问了一个不敢问别人的问题。',
  '牌面说"放手"的时候，我哭了。',
  '这里比朋友圈安静。',
];

export function ReflectionSection(): ReactNode {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="flex flex-col items-center gap-10 max-w-prose">
        {FRAGMENTS.map((text, i) => (
          <motion.p
            key={i}
            variants={blurRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: i * STAGGER.reflection }}
            className="text-lg md:text-xl text-stone-300 italic font-serif text-center"
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
