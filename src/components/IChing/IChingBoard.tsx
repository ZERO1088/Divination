// ============================================================
// IChingBoard —— 六条爻线展示区 (仪式增强版)
// 爻线 3× 放大 · 铜钱抛掷区 · 动爻脉动
// ============================================================

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import type { Line, IChingPhase } from '../../types';
import { CoinTrio } from './Coin';

interface IChingBoardProps {
  lines: Line[];
  /** 当前抛掷的三枚铜钱值 */
  coinValues: [number, number, number] | null;
  /** 当前阶段 */
  phase: IChingPhase;
  /** 本次将要生成的爻 index */
  activeIndex: number;
}

function yaoLabel(line: Line): string {
  const isYang = line.type === '老阳' || line.type === '少阳';
  const idx = line.index;
  return isYang ? `九${idx + 1}` : `六${idx + 1}`;
}

export function IChingBoard({
  lines,
  coinValues,
  phase,
  activeIndex,
}: IChingBoardProps): ReactNode {
  const slots = Array.from({ length: 6 }, (_, i) => {
    const line = lines.find((l) => l.index === i);
    return { index: i, line };
  }).reverse();

  const isThrowing = phase === 'throwing';
  // 最新加入的爻 index（用于下落动画）
  const latestIndex = lines.length > 0 ? lines[lines.length - 1].index : -1;

  return (
    <div className="flex flex-col items-center gap-5 py-8 w-full max-w-[420px] mx-auto">
      {slots.map(({ index, line }) => {
        const isYang = line
          ? line.type === '老阳' || line.type === '少阳'
          : null;
        const isLatest = line?.index === latestIndex;

        return (
          <div key={index} className="flex items-center gap-4 w-full">
            {/* 爻名标签 */}
            <span className="text-stone-500 text-xs w-14 text-right shrink-0">
              {line ? yaoLabel(line) : ''}
            </span>

            {/* 爻线 / 占位 / 铜钱区 */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-[36px]">
              {/* 铜钱抛掷区 —— 当前正在投掷的位置 */}
              {isThrowing && index === activeIndex && (
                <div className="mb-2">
                  <CoinTrio
                    coinValues={coinValues}
                    stage={coinValues && coinValues.every((v) => v > 0) ? 'landed' : 'tossing'}
                  />
                </div>
              )}

              {/* 爻线 */}
              {line ? (
                <motion.div
                  initial={isLatest ? { opacity: 0, y: -16 } : false}
                  animate={
                    isLatest
                      ? { opacity: 1, y: 0 }
                      : { opacity: 1 }
                  }
                  transition={
                    isLatest
                      ? {
                          duration: 0.4,
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: 0.12,
                        }
                      : {}
                  }
                  className="flex items-center gap-3 w-full"
                >
                  {isYang ? (
                    <div
                      className={`yao-bar flex-1 ${
                        line.isChanging ? 'yao-bar--changing' : ''
                      }`}
                    />
                  ) : (
                    <div className="flex gap-4 flex-1 justify-center">
                      <div
                        className={`yao-bar flex-1 max-w-[42%] ${
                          line.isChanging ? 'yao-bar--changing' : ''
                        }`}
                      />
                      <div
                        className={`yao-bar flex-1 max-w-[42%] ${
                          line.isChanging ? 'yao-bar--changing' : ''
                        }`}
                      />
                    </div>
                  )}

                  {line.isChanging && (
                    <div className="changing-pulse shrink-0" />
                  )}

                  <span className="text-stone-500 text-xs w-10 text-left shrink-0">
                    {line.type}
                  </span>
                </motion.div>
              ) : (
                <div className="flex-1 yao-placeholder" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
