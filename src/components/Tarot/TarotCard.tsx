// ============================================================
// TarotCard —— 塔罗单牌组件
// 支持：卡背装饰 + 卡面展示 + 3D 翻牌动画
//       hover 悬浮抬升 + 选中金辉高亮 + 扇形旋转
// ============================================================

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import type { TarotCard as TarotCardType } from '../../types';
import type { TarotCardData } from '../../constants/tarotData';

interface TarotCardProps {
  /** 静态牌数据（用于卡背展示和选中时生成卡面） */
  data: TarotCardData;
  /** 是否已被选中（触发翻牌动画） */
  isSelected: boolean;
  /** 选中后的运行时牌对象（含 isReversed 和 keywords） */
  selectedCard?: TarotCardType;
  /** 扇形旋转角度（度） */
  fanRotation?: number;
  /** 点击回调 */
  onClick: () => void;
  /** 是否禁用交互（已选牌后禁止再选其他） */
  disabled: boolean;
}

/** 罗马数字映射 0-21 */
const ROMAN: string[] = [
  '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII',
  'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV',
  'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI',
];

const hoverVariants: Variants = {
  idle: { y: 0, scale: 1, boxShadow: '0 0 0 rgba(253,230,138,0)' },
  hover: {
    y: -8,
    scale: 1.06,
    boxShadow: '0 0 24px rgba(253,230,138,0.18)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export function TarotCard({
  data,
  isSelected,
  selectedCard,
  fanRotation = 0,
  onClick,
  disabled,
}: TarotCardProps): ReactNode {
  const displayCard = selectedCard;

  return (
    <motion.div
      variants={hoverVariants}
      initial="idle"
      whileHover={disabled ? undefined : 'hover'}
      onClick={disabled ? undefined : onClick}
      className="relative cursor-pointer select-none shrink-0"
      style={{
        width: 88,
        height: 136,
        perspective: 600,
        transform: `rotate(${fanRotation}deg)`,
      }}
    >
      {/* 选中高亮光环 */}
      {isSelected && (
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
        animate={{ rotateY: isSelected ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
        className="relative w-full h-full rounded-xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ---- 卡背 ---- */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="tarot-back w-full h-full flex flex-col items-center justify-center">
            {/* 外边框 */}
            <div className="tarot-back-border w-[calc(100%-8px)] h-[calc(100%-8px)] flex flex-col items-center justify-center">
              {/* 中心菱形装饰 */}
              <div className="tarot-back-diamond" />
              {/* 四角星点 */}
              <div className="tarot-back-star top-left" />
              <div className="tarot-back-star top-right" />
              <div className="tarot-back-star bottom-left" />
              <div className="tarot-back-star bottom-right" />
            </div>
          </div>
        </div>

        {/* ---- 卡面（翻转后可见） ---- */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center p-2 text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(160deg, #1e1a24 0%, #16131c 100%)',
            border: '1.5px solid rgba(253,230,138,0.3)',
          }}
        >
          {/* 逆位标签 */}
          {displayCard?.isReversed && (
            <span className="text-[10px] text-red-300/80 mb-0.5 tracking-wider">
              逆位
            </span>
          )}

          {/* 序号 */}
          <span className="text-[11px] text-amber-300/60 font-serif">
            {ROMAN[data.id]}
          </span>

          {/* 牌名 */}
          <span
            className={`text-sm font-serif mt-0.5 leading-tight ${
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
