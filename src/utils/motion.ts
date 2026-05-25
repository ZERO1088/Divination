// ============================================================
// Motion System —— 缓动曲线 · 时长 · Stagger · Glow Token
// 设计参照：Apple HIG · Linear · Arc
// ============================================================

import type { Variants, Transition } from 'framer-motion';

// ---- 缓动曲线 ----
export const EASING = {
  /** 入场：先快后慢——"光突然亮起，然后稳定" */
  enter: [0, 0, 0.2, 1] as const,
  /** 退场：先慢后快——"光还在，忽然消散" */
  exit: [0.4, 0, 1, 1] as const,
  /** 悬停反馈：对称——"回应触碰，回到原位" */
  hover: [0.4, 0, 0.2, 1] as const,
  /** 仪式动画：轻微 overshoot——"落定后有回响" */
  ritual: [0.34, 1.56, 0.64, 1] as const,
  /** 翻牌专用曲线——模拟真实翻牌物理 */
  flip: [0.23, 0.86, 0.39, 0.96] as const,
  /** 呼吸循环：对称 easing-in-out */
  breathe: [0.45, 0, 0.55, 1] as const,
} as const;

// ---- 时长 (ms) ----
export const DURATION = {
  /** 微交互：颜色/边框变化 */
  micro: 0.15,
  /** 微交互：scale/位移 */
  microScale: 0.2,
  /** 悬停反馈 */
  hover: 0.2,
  /** 悬停退出（稍慢，制造余韵） */
  hoverExit: 0.25,
  /** 小元素入场 */
  enterSm: 0.3,
  /** 中元素入场 */
  enterMd: 0.4,
  /** 大元素入场 */
  enterLg: 0.5,
  /** 仪式动画 */
  ritual: 0.65,
  /** 翻牌动画 */
  flip: 0.6,
  /** 退场 */
  exit: 0.25,
  /** 页面切换总时长 */
  pageTransition: 0.9,
  /** 呼吸周期 */
  breathe: 3,
  /** 慢呼吸 */
  breatheSlow: 6,
} as const;

// ---- Stagger 间隔 (ms) ----
export const STAGGER = {
  /** 塔罗牌阵展开：22张牌 */
  tarotSpread: 0.03,
  /** Landing Pill 标签 */
  pill: 0.08,
  /** 情绪碎片文字 */
  reflection: 0.4,
  /** Ritual Entry 双卡片 */
  ritualEntry: 0.15,
  /** 六爻爻线 */
  hexagramLine: 0.08,
  /** 列表项 */
  list: 0.05,
  /** 关键词标签 */
  keyword: 0.08,
} as const;

// ---- Typewriter ----
export const TYPEWRITER = {
  /** 每字间隔 (ms) */
  perChar: 30,
  /** 逗号停顿 */
  comma: 100,
  /** 句号停顿 */
  period: 150,
  /** 问号/感叹号停顿 */
  exclaim: 180,
  /** 省略号停顿 */
  ellipsis: 250,
  /** 换行停顿 */
  newline: 200,
  /** 光标闪烁周期 */
  cursorBlink: 500,
} as const;

// ---- Framer Motion Variants 预制件 ----

/** 标准入场：opacity + translateY */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.enterMd, ease: EASING.enter },
  },
};

/** 从模糊到清晰（情绪/回忆类） */
export const blurRevealVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease: EASING.enter },
  },
};

/** 卡片从空气中凝聚 */
export const cardRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.enterMd, ease: EASING.enter },
  },
};

/** 从下方生长（CardReveal / 面板展开） */
export const growDownVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: DURATION.enterMd, ease: EASING.enter },
  },
};

/** 光之门转场：卡片缩放 + 光扩散 */
export const portalVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  expanding: {
    scale: 50,
    opacity: 0,
    transition: { duration: 0.5, ease: EASING.ritual },
  },
};

/** hover 微升 */
export const hoverLift: Transition = {
  duration: DURATION.hover,
  ease: EASING.hover,
};

/** active 按压 */
export const activePress: Transition = {
  duration: 0.1,
  ease: [0.4, 0, 1, 1],
};

// ============================================================
// 转场动画封装
// ============================================================

/** 页面切换：光之门转场（Landing → 仪式空间） */
export function portalTransition(duration = DURATION.pageTransition) {
  return {
    duration,
    ease: EASING.ritual,
  };
}

/** 页面切换：静谧切换（导航栏模式切换） */
export function quietTransition(duration = 0.55) {
  return {
    duration,
    ease: EASING.enter,
  };
}

// ============================================================
// Glow Token —— 光晕值
// ============================================================
export const GLOW = {
  weak: '0 0 24px rgba(253,230,138,0.06)',
  medium: '0 0 24px rgba(253,230,138,0.10)',
  strong: '0 0 40px rgba(253,230,138,0.15)',
  cta: '0 0 32px rgba(253,230,138,0.18), 0 0 64px rgba(253,230,138,0.06)',
  ritual: '0 0 48px rgba(253,230,138,0.22), 0 0 80px rgba(253,230,138,0.08)',
  error: '0 0 20px rgba(248,113,113,0.15)',
  cardHover: '0 0 24px rgba(253,230,138,0.08), 0 0 0 1px rgba(253,230,138,0.15)',
} as const;
