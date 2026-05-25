// ============================================================
// useDeepSeek —— AI 解卦 Hook
// 支持 demo 模式（模拟延迟返回通用解读）和真实 API 模式
// 防御性：防重、超时、错误分类、兜底文案
// ============================================================

import { useState, useCallback, useRef } from 'react';
import type { AIResponse, APIState, APIError } from '../types';
import { fetchWithTimeout, classifyError, FALLBACK_MESSAGE, DEFAULT_TIMEOUT_MS, generateTarotDemoReply } from '../utils/api';

interface DeepSeekConfig {
  /** API endpoint，不传则启用 demo 模式 */
  endpoint?: string;
  /** API Key，仅真实模式需要 */
  apiKey?: string;
  /** 模型名称，默认 deepseek-chat */
  model?: string;
  /** 超时毫秒数 */
  timeoutMs?: number;
}

/** 六爻 Demo 模式下的通用解读 */
function generateIChingDemoReply(): string {
  return (
    '【通俗解读】\n' +
    '此卦象提示你，当前所问之事正处于发展变化之中。' +
    '建议你保持冷静的头脑，不急不躁，稳步推进。' +
    '如果卦中有变爻，意味着事情还有转圜的余地——' +
    '关注变化的方向，顺势而为，往往能得到更好的结果。' +
    '记住：易者变也，没有一成不变的答案，你的选择才是关键。\n\n' +
    '【专业解读】\n' +
    '本卦体用关系已在上方详细列出。' +
    '如需更精准的卦象分析，请配置 DeepSeek API 获取 AI 深度解读。' +
    '当前为 Demo 模式，展示的是通用占卜逻辑与卦象匹配能力。' +
    '卦象数据库已覆盖《周易》全部六十四卦，' +
    '包括卦辞、彖辞、象辞、爻辞以及通俗和专业双版本解读。'
  );
}

export function useDeepSeek(config: DeepSeekConfig = {}) {
  const { endpoint, apiKey, model = 'deepseek-chat', timeoutMs = DEFAULT_TIMEOUT_MS } = config;

  const [state, setState] = useState<APIState>('idle');
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<APIError | null>(null);

  // 保存当前的 AbortController，用于组件卸载时取消
  const abortRef = useRef<AbortController | null>(null);

  // 防止 StrictMode 下重复调用
  const loadingRef = useRef(false);

  /** 发起解卦请求 */
  const analyze = useCallback(
    async (
      prompt: string,
      mode: 'iching' | 'tarot' = 'iching',
      demoMeta?: { cardName?: string; isReversed?: boolean; question?: string },
    ): Promise<void> => {
      // 防重：loading 中忽略新请求
      if (loadingRef.current) return;
      loadingRef.current = true;

      setState('loading');
      setError(null);

      try {
        // ---- Demo 模式：模拟延迟 + 占卜体系专属回复 ----
        if (!endpoint) {
          await new Promise<void>((resolve) => setTimeout(resolve, 2000));
          const reply =
            mode === 'tarot'
              ? generateTarotDemoReply({
                  cardName: demoMeta?.cardName ?? '未知',
                  isReversed: demoMeta?.isReversed ?? false,
                  question: demoMeta?.question ?? '',
                })
              : generateIChingDemoReply();
          setResult({ content: reply, model: 'demo' });
          setState('success');
          loadingRef.current = false;
          return;
        }

        // ---- 真实 API 模式 ----
        const controller = new AbortController();
        abortRef.current = controller;

        const response = await fetchWithTimeout(
          endpoint,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
            },
            body: JSON.stringify({
              model,
              messages: [{ role: 'user', content: prompt }],
              stream: false,
            }),
          },
          timeoutMs,
        );

        if (!response.ok) {
          // 尝试从响应体中提取 API 错误详情
          let apiErrorMsg = `服务器返回错误: ${response.status} ${response.statusText}`;
          try {
            const errData: Record<string, unknown> = await response.json();
            const errDetail = (errData.error as { message?: string })?.message;
            if (errDetail) apiErrorMsg = errDetail;
          } catch {
            // 无法解析 JSON，使用默认错误信息
          }
          throw new Error(apiErrorMsg);
        }

        const data: Record<string, unknown> = await response.json();
        const choices = data.choices as Array<{ message: { content: string } }> | undefined;
        const content = choices?.[0]?.message?.content ?? FALLBACK_MESSAGE;

        setResult({ content, model });
        setState('success');
      } catch (err: unknown) {
        const classified = classifyError(err);
        setError(classified);
        // 保留 API 原始错误信息，而非直接覆盖为兜底文案
        setResult({ content: classified.message });
        setState('error');
      } finally {
        loadingRef.current = false;
        abortRef.current = null;
      }
    },
    [endpoint, apiKey, model, timeoutMs],
  );

  /** 重置，允许重新请求 */
  const reset = useCallback((): void => {
    // 取消进行中的请求
    abortRef.current?.abort();
    abortRef.current = null;

    setState('idle');
    setResult(null);
    setError(null);
    loadingRef.current = false;
  }, []);

  return { state, result, error, analyze, reset };
}
