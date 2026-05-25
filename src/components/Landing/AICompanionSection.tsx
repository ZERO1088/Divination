// ============================================================
// AICompanionSection —— AI 陪伴
// 传递核心价值：不是算命工具，是情绪陪伴
// ============================================================

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASING, STAGGER } from '../../utils/motion';

const PILLS = ['温柔回应', '双版解读', '情绪陪伴'];

export function AICompanionSection(): ReactNode {
  return (
    <section className="relative min-h-[55vh] flex flex-col items-center justify-center px-4 py-20">
      {/* 标题 */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: DURATION.enterLg, ease: EASING.enter }}
        className="text-2xl text-amber-200 font-serif text-center"
      >
        不只是占卜，是有人懂你
      </motion.h2>

      {/* 描述 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: DURATION.enterMd, ease: EASING.enter, delay: 0.2 }}
        className="text-stone-400 text-sm text-center max-w-prose mt-6 leading-relaxed"
      >
        AI 不是冰冷的算法，而是温和的倾听者。<br />
        每一次解读，都是一次被认真对待的对话。<br />
        占卜的答案会消散，但被理解的感觉会留下。
      </motion.p>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {PILLS.map((pill, i) => (
          <motion.span
            key={pill}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{
              duration: DURATION.enterSm,
              ease: EASING.enter,
              delay: 0.4 + i * STAGGER.pill,
            }}
            className="px-3 py-1.5 rounded-full text-xs text-amber-200/80
                       bg-amber-200/5 border border-amber-200/10"
          >
            {pill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
