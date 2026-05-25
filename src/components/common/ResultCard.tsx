// ============================================================
// ResultCard —— AI 解读结果卡片
// 处理 loading / error / success 三态展示
// 与卦象解读卡片视觉对称：相同宽度、内边距、标题层级
// ============================================================

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import type { AIResponse, APIState, APIError } from '../../types';
import { stripMarkdown } from '../../utils/api';
import { LoadingSpinner } from './LoadingSpinner';

interface ResultCardProps {
  state: APIState;
  result: AIResponse | null;
  error: APIError | null;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function ResultCard({ state, result, error }: ResultCardProps): ReactNode {
  if (state === 'idle') return null;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4 }}
      className="glass-card p-6 max-w-2xl w-full"
    >
      {/* Loading 态 */}
      {state === 'loading' && <LoadingSpinner />}

      {/* Error 态 — 显示具体错误信息 */}
      {state === 'error' && (
        <div>
          <p className="text-amber-200/70 font-serif text-sm mb-3">请求异常</p>
          {error && (
            <div className="mb-3">
              <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-red-400/10 text-red-300/80">
                {error.type === 'timeout' ? '超时' : error.type === 'network' ? '网络错误' : error.type === 'server' ? '服务器错误' : '未知错误'}
              </span>
            </div>
          )}
          <p className="text-stone-300 text-sm leading-relaxed">
            {result?.content ?? '玄机未显，请稍后再试'}
          </p>
        </div>
      )}

      {/* Success 态 */}
      {state === 'success' && result && (
        <div>
          <p className="text-amber-200/70 font-serif text-sm mb-3">解卦结果</p>
          <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
            {stripMarkdown(result.content)}
          </p>
          {result.model && (
            <p className="text-stone-600 text-xs mt-3">
              {result.model === 'demo' ? 'Demo 模式' : `模型：${result.model}`}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
