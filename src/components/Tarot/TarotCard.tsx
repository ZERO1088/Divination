// ============================================================
// TarotCard —— 塔罗单牌组件 (VISUAL_REFACTOR)
// 三态：网格态 / 聚光灯态 / 弱化态
// ============================================================

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import type { TarotCard as TarotCardType } from '../../types';
import type { TarotCardData } from '../../constants/tarotData';

interface TarotCardProps {
  data: TarotCardData;
  isSelected: boolean;
  selectedCard?: TarotCardType;
  onClick: () => void;
  disabled: boolean;
  /** 聚光灯态——选中后的放大居中版 */
  spotlight?: boolean;
  /** 弱化态——其他牌被选中时的背景牌 */
  dimmed?: boolean;
}

const ROMAN: string[] = [
  '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII',
  'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV',
  'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI',
];

export function TarotCard({
  data,
  isSelected,
  selectedCard,
  onClick,
  disabled,
  spotlight = false,
  dimmed = false,
}: TarotCardProps): ReactNode {
  const displayCard = selectedCard;

  // 网格/聚光灯尺寸
  const cardW = spotlight ? 220 : 100;
  const cardH = spotlight ? 340 : 155;

  return (
    <motion.div
      animate={{
        opacity: dimmed ? 0.08 : spotlight ? 1 : 0.5,
        filter: dimmed ? 'blur(8px)' : 'blur(0px)',
        scale: dimmed ? 0.92 : 1,
      }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      whileHover={
        !disabled && !spotlight && !dimmed
          ? { opacity: 0.8, scale: 1.04, y: -4, transition: { duration: 0.2 } }
          : undefined
      }
      onClick={disabled || dimmed ? undefined : onClick}
      className="relative shrink-0"
      style={{
        width: cardW,
        height: cardH,
        perspective: 800,
        cursor: disabled || dimmed ? 'default' : 'pointer',
        pointerEvents: dimmed ? 'none' : 'auto',
      }}
    >
      {/* 聚光灯光晕（选中牌背后） */}
      {spotlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="absolute pointer-events-none"
          style={{
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background:
              'radial-gradient(ellipse 500px 400px at center, rgba(253,230,138,0.12) 0%, transparent 70%)',
          }}
        />
      )}

      {/* 选中牌外发光（聚光灯态） */}
      {spotlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="absolute -inset-2 rounded-2xl pointer-events-none"
          style={{
            boxShadow:
              '0 0 48px rgba(253,230,138,0.15), 0 0 96px rgba(253,230,138,0.05)',
          }}
        />
      )}

      {/* 选中高亮光环（网格态） */}
      {isSelected && !spotlight && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1.04 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="absolute -inset-1 rounded-xl pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(253,230,138,0.35), rgba(253,200,80,0.15), rgba(253,230,138,0.35))',
            filter: 'blur(6px)',
          }}
        />
      )}

      {/* 3D 翻牌容器 */}
      <motion.div
        animate={{
          rotateY: isSelected ? 180 : 0,
        }}
        transition={{
          rotateY: { duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] },
        }}
        className="relative w-full h-full rounded-xl"
        style={{
          transformStyle: 'preserve-3d',
          animation: spotlight ? 'cardFloat 8s ease-in-out infinite' : 'none',
        }}
      >
        {/* ---- 卡背 ---- */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="tarot-back w-full h-full flex flex-col items-center justify-center">
            <div className="tarot-back-border w-[calc(100%-8px)] h-[calc(100%-8px)] flex flex-col items-center justify-center">
              <div className="tarot-back-diamond" />
              <div className="tarot-back-star top-left" />
              <div className="tarot-back-star top-right" />
              <div className="tarot-back-star bottom-left" />
              <div className="tarot-back-star bottom-right" />
            </div>
          </div>
        </div>

        {/* ---- 卡面（翻转后可见） ---- */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(160deg, #1e1a24 0%, #16131c 100%)',
            border: '1.5px solid rgba(253,230,138,0.3)',
            padding: spotlight ? 12 : 6,
          }}
        >
          {displayCard?.isReversed && (
            <span
              className={`${
                spotlight ? 'text-xs' : 'text-[10px]'
              } text-red-300/80 mb-0.5 tracking-wider`}
            >
              逆位
            </span>
          )}

          <span
            className={`${
              spotlight ? 'text-sm' : 'text-[11px]'
            } text-amber-300/60 font-serif`}
          >
            {ROMAN[data.id]}
          </span>

          <span
            className={`font-serif mt-0.5 leading-tight ${
              spotlight ? 'text-xl' : 'text-sm'
            } ${
              displayCard?.isReversed ? 'text-red-200/90' : 'text-amber-200'
            }`}
          >
            {data.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
