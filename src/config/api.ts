// ============================================================
// DeepSeek API 集中配置
// 从 Vite 环境变量读取，提供合理的默认值
// 你只需在 .env 中设置 VITE_DEEPSEEK_API_KEY 即可启用
// ============================================================

/** DeepSeek API 配置 */
export const deepseekConfig = {
  /** API 端点 */
  get endpoint(): string {
    return import.meta.env.VITE_DEEPSEEK_ENDPOINT ?? 'https://api.deepseek.com/v1/chat/completions';
  },

  /** API Key —— 从环境变量读取，设为空字符串则不传 Authorization 头 */
  get apiKey(): string {
    return import.meta.env.VITE_DEEPSEEK_API_KEY ?? '';
  },

  /** 模型名称 */
  get model(): string {
    return import.meta.env.VITE_DEEPSEEK_MODEL ?? 'deepseek-chat';
  },

  /** 请求超时（毫秒） */
  get timeoutMs(): number {
    const raw = import.meta.env.VITE_DEEPSEEK_TIMEOUT;
    return raw ? Number(raw) : 30_000;
  },

  // ---- 派生属性 ----

  /** 是否配置了 API Key（未配置则走 demo 模式） */
  get isConfigured(): boolean {
    return this.apiKey.length > 0 && this.apiKey !== 'sk-your-api-key-here';
  },
} as const;
