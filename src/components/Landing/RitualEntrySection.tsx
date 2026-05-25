// ============================================================
// RitualEntrySection —— 仪式入口 · 两扇门
// Tarot（星光/直觉） vs I Ching（烛光/推演）
// ============================================================

import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DURATION, EASING, GLOW } from '../../utils/motion';

export function RitualEntrySection(): ReactNode {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<'tarot' | 'iching' | null>(null);

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
        {/* ======== Tarot 门（左侧） ======== */}
        <motion.article
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: DURATION.enterLg, ease: EASING.enter }}
          onMouseEnter={() => setHovered('tarot')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/tarot')}
          className={`glass-card-lg p-8 flex flex-col items-center text-center cursor-pointer
                     ${hovered === 'iching' ? 'opacity-80' : ''}`}
          style={{
            borderColor: hovered === 'tarot' ? 'rgba(253,230,138,0.20)' : undefined,
            boxShadow: hovered === 'tarot' ? GLOW.cardHover : undefined,
          }}
        >
          {/* 星芒图标 */}
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            {/* 上三角 */}
            <motion.div
              animate={hovered === 'tarot' ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: DURATION.hover, ease: EASING.hover }}
              className="absolute"
              style={{
                width: 0, height: 0,
                borderLeft: '24px solid transparent',
                borderRight: '24px solid transparent',
                borderBottom: `40px solid rgba(253,230,138,${hovered === 'tarot' ? 0.3 : 0.2})`,
              }}
            />
            {/* 下三角 */}
            <motion.div
              animate={hovered === 'tarot' ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: DURATION.hover, ease: EASING.hover }}
              className="absolute"
              style={{
                width: 0, height: 0,
                borderLeft: '24px solid transparent',
                borderRight: '24px solid transparent',
                borderTop: `40px solid rgba(253,230,138,${hovered === 'tarot' ? 0.3 : 0.2})`,
                marginTop: '16px',
              }}
            />
            {/* 中心光点 */}
            <motion.div
              animate={hovered === 'tarot' ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0.4 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-amber-200/60 z-10"
            />
          </div>

          <h2 className="text-2xl text-amber-200 font-serif tracking-widest mb-3">
            塔罗抽牌
          </h2>
          <p className="text-stone-400 text-sm mb-8">
            二十二张大阿卡纳<br />凭直觉选一张
          </p>
          <span className={`text-xs transition-colors duration-200 ${
            hovered === 'tarot' ? 'text-amber-200/70' : 'text-stone-500'
          }`}>
            闭上眼睛，选一张牌 →
          </span>
        </motion.article>

        {/* ======== I Ching 门（右侧） ======== */}
        <motion.article
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: DURATION.enterLg, ease: EASING.enter, delay: 0.15 }}
          onMouseEnter={() => setHovered('iching')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate('/iching')}
          className={`glass-card-lg p-8 flex flex-col items-center text-center cursor-pointer
                     ${hovered === 'tarot' ? 'opacity-80' : ''}`}
          style={{
            borderColor: hovered === 'iching' ? 'rgba(253,230,138,0.20)' : undefined,
            boxShadow: hovered === 'iching' ? GLOW.cardHover : undefined,
          }}
        >
          {/* 铜钱三线图标 */}
          <div className="relative w-16 h-16 mb-6 flex flex-col items-center justify-center gap-1">
            {/* 铜钱 */}
            <motion.div
              animate={hovered === 'iching' ? { rotate: [0, 2, 0, -2, 0] } : { rotate: 0 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: `rgba(253,230,138,${hovered === 'iching' ? 0.30 : 0.20})` }}
            >
              <div className="w-3 h-3 border"
                   style={{ borderColor: `rgba(253,230,138,${hovered === 'iching' ? 0.25 : 0.15})` }} />
            </motion.div>
            {/* 三条横线 */}
            <div className="flex flex-col gap-0.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-8 h-px"
                     style={{ background: `rgba(253,230,138,${hovered === 'iching' ? 0.30 : 0.18})` }} />
              ))}
            </div>
          </div>

          <h2 className="text-2xl text-amber-200 font-serif tracking-widest mb-3">
            六爻起卦
          </h2>
          <p className="text-stone-400 text-sm mb-8">
            三枚铜钱，六次掷出<br />问天机
          </p>
          <span className={`text-xs transition-colors duration-200 ${
            hovered === 'iching' ? 'text-amber-200/70' : 'text-stone-500'
          }`}>
            心中默念，摇动铜钱 →
          </span>
        </motion.article>
      </div>
    </section>
  );
}
