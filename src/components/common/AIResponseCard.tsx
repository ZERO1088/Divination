// ============================================================
// AIResponseCard —— AI 解读组件 (VISUAL_REFACTOR: 命中句 + 渐进展开)
// 三态：loading · 命中句 · 渐进阅读
// ============================================================

import { type ReactNode, useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AIResponse, APIState, APIError } from '../../types';
import { stripMarkdown } from '../../utils/api';
import { BreathingDots } from './BreathingDots';

interface AIResponseCardProps {
  state: APIState;
  result: AIResponse | null;
  error: APIError | null;
  title?: string;
}

export function AIResponseCard({
  state,
  result,
  error,
  title = '解读结果',
}: AIResponseCardProps): ReactNode {
  if (state === 'idle') return null;

  return (
    <>
      {state === 'loading' && (
        <div className="flex justify-center py-16">
          <BreathingDots text="正在感应你的问题……" />
        </div>
      )}

      {state === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center px-6"
        >
          <p className="text-amber-200/70 font-serif text-sm mb-3">请求异常</p>
          {error && (
            <span className="inline-block px-2 py-0.5 rounded text-xs bg-red-400/10 text-red-300/80 mb-3">
              {error.type === 'timeout'
                ? '超时'
                : error.type === 'network'
                  ? '网络错误'
                  : error.type === 'server'
                    ? '服务器错误'
                    : '未知错误'}
            </span>
          )}
          <p className="text-stone-300 text-sm leading-relaxed">
            {result?.content ?? '玄机未显，请稍后再试'}
          </p>
        </motion.div>
      )}

      {state === 'success' && result && (
        <DestinyProgressiveReveal
          content={stripMarkdown(result.content)}
          model={result.model}
          title={title}
        />
      )}
    </>
  );
}

// ============================================================
// 命中句 + 渐进展开
// ============================================================

function DestinyProgressiveReveal({
  content,
  model,
  title,
}: {
  content: string;
  model?: string;
  title?: string;
}): ReactNode {
  const [viewPhase, setViewPhase] = useState<'destiny' | 'reading'>('destiny');

  const { destinyLine, sections } = useMemo(() => {
    const match = content.match(/^(.+?[。！？…])/);
    const line = match ? match[1] : content.slice(0, 30);
    const rest = match
      ? content.slice(match[0].length).trim()
      : content.slice(30).trim();

    const raw = rest
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    let secs: string[];
    if (raw.length === 0) {
      secs = [];
    } else if (raw.length === 1) {
      const sentences = raw[0].split(/(?<=[。！？…])/);
      const chunks: string[] = [];
      let buf = '';
      for (const s of sentences) {
        buf += s;
        if (buf.length > 80) {
          chunks.push(buf.trim());
          buf = '';
        }
      }
      if (buf.trim()) chunks.push(buf.trim());
      secs = chunks.length <= 1 ? raw : chunks;
    } else {
      secs = raw;
    }
    return { destinyLine: line, sections: secs };
  }, [content]);

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {viewPhase === 'destiny' && (
          <motion.div
            key="destiny"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', y: -20 }}
            transition={{ duration: 0.6 }}
            className="destiny-sentence flex flex-col items-center cursor-pointer"
            onClick={() => setViewPhase('reading')}
          >
            <DestinyTypewriter text={destinyLine} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-stone-500 text-sm mt-10 hover:text-amber-200/60 transition-colors"
            >
              ↓ 轻触展开全文
            </motion.p>
          </motion.div>
        )}

        {viewPhase === 'reading' && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="w-full max-w-[620px] mx-auto px-6 pt-8 pb-16"
          >
            {title && (
              <p className="text-amber-200/70 font-serif text-sm mb-6 text-center">
                {title}
              </p>
            )}
            <p className="text-amber-200/80 font-serif text-lg text-center mb-6">
              {destinyLine}
            </p>

            {sections.map((section, i) => (
              <ProgressiveSection key={i} text={section} index={i} />
            ))}

            {model && (
              <p className="text-stone-600 text-xs text-center mt-16">
                {model === 'demo' ? 'Demo 模式' : `模型：${model}`}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// 命中句逐字浮现
// ============================================================

function DestinyTypewriter({ text }: { text: string }): ReactNode {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let idx = 0;
    const advance = () => {
      if (idx >= text.length) {
        setDone(true);
        return;
      }
      const char = text[idx];
      idx += 1;
      setDisplayed(text.slice(0, idx));
      let delay = 120;
      if (char === '，') delay = 200;
      if (char === '。') delay = 350;
      if (char === '！' || char === '？') delay = 380;
      if (char === '…') delay = 400;
      timerRef.current = setTimeout(advance, delay);
    };
    timerRef.current = setTimeout(advance, 80);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text]);

  return (
    <p className="text-2xl sm:text-3xl text-amber-200 font-serif tracking-wider leading-relaxed text-center max-w-lg">
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block w-[2px] h-6 bg-amber-200/50 ml-1 align-middle"
        />
      )}
    </p>
  );
}

// ============================================================
// 渐进展开章节
// ============================================================

function ProgressiveSection({
  text,
  index,
}: {
  text: string;
  index: number;
}): ReactNode {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300 + index * 400);
    return () => clearTimeout(timer);
  }, [index]);

  const { label, body } = useMemo(() => {
    const m = text.match(/^(.{2,6}[：:])\s*/);
    if (m) {
      return { label: m[1], body: text.slice(m[0].length) };
    }
    return { label: null, body: text };
  }, [text]);

  return (
    <div>
      {index > 0 && <div className="section-divider" />}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {label && (
              <p className="text-amber-200/60 font-serif text-sm tracking-wider mb-3">
                {label}
              </p>
            )}
            <p className="text-stone-300 text-sm leading-loose whitespace-pre-line">
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
