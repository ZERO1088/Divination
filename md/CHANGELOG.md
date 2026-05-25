# 「玄机」实现变更文档

> 基于设计系统（DESIGN_SYSTEM.md / VISUAL_STYLE.md / PAGE_BLUEPRINT.md / LANDING_PAGE_DESIGN.md）的首次完整实现。
> 变更范围：配置 → 样式系统 → Motion 常量 → 通用组件 → Landing Page → 业务组件重构 → Bug 修复。

---

## 一、配置文件变更

### 1.1 `tailwind.config.js`（重写）

**变更前**：4 色 Token（dark / surface / card / border），无光晕，无动画。

**变更后**：完整设计 Token 体系

| 类别 | Token 数量 | 说明 |
|------|-----------|------|
| 虚空黑体系 | 5 级 | void / deep / base / surface / elevated |
| 边框体系 | 3 级 | subtle(0.04) / default(0.08) / emphasis(0.12) |
| 玻璃基底 | 2 级 | glass(0.03) / glass-hover(0.06) |
| 琥珀金体系 | 8 级 | gold / gold-hover / gold-glow / gold-soft / gold-border / gold-glow-* (3级) |
| 文本体系 | 4 级 | primary / secondary / tertiary / disabled |
| 警示色 | 3 级 | danger / danger-soft / danger-border |
| 光晕 boxShadow | 5 级 | glow-weak → glow-cta → glow-error |
| 动画 keyframes | 4 个 | breathe / breathe-slow / pulseGold / float |

### 1.2 `src/index.css`（重写）

**变更前**：3 个 CSS 类（glass-card / btn-primary / tarot-back），约 80 行。

**变更后**：完整的组件样式系统，约 210 行。

| 新增 | 内容 |
|------|------|
| `@layer base` | body 底色改为 brand-void + SVG 噪点纹理 + 滚动条静默 |
| 卡片体系（7 变体） | glass-card / glass-card-sm / glass-card-lg / glass-card-accent / glass-card-danger / glass-card-static（各含 hover 态） |
| 按钮体系（6 变体） | btn-primary / btn-secondary / btn-ghost / btn-danger / btn-cta / btn-ritual（各含 hover / active / disabled / focus-visible） |
| Tarot 卡背 | 保持原有的 6 个 CSS 类，样式未变 |

---

## 二、新增文件

### 2.1 `src/utils/motion.ts`（新建 · 186 行）

Motion System 的全部常量和预制件：

| 类别 | 内容 |
|------|------|
| 缓动曲线（6 条） | EASING.enter / exit / hover / ritual / flip / breathe |
| 时长 Token（14 个） | DURATION.micro → pageTransition |
| Stagger 间隔（7 个） | STAGGER.tarotSpread / pill / reflection / ritualEntry / hexagramLine / list / keyword |
| Typewriter 参数 | perChar(30ms) / comma(100ms) / period(150ms) / exclaim(180ms) / ellipsis(250ms) / newline(200ms) / cursorBlink(500ms) |
| Variants 预制件（6 个） | fadeUpVariants / blurRevealVariants / cardRevealVariants / growDownVariants / portalVariants / hoverLift + activePress |
| Glow Token（7 个） | GLOW.weak / medium / strong / cta / ritual / error / cardHover |

### 2.2 通用组件（9 个新文件）

| 文件 | 说明 |
|------|------|
| `common/Button.tsx` | 6 变体 × 3 尺寸，Framer Motion whileHover/whileTap 集成 |
| `common/Input.tsx` | focus 金色发光边框，4 种宽度约束 |
| `common/BreathingDots.tsx` | 3 光点依次明灭（2s 周期），替代旋转 spinner |
| `common/Modal.tsx` | AnimatePresence + 毛玻璃遮罩 + Escape 关闭 |
| `common/FloatingPanel.tsx` | 点击外部关闭，透亮材质 |
| `common/AIResponseCard.tsx` | 三态（loading 呼吸光点 / success 含 Typewriter / error"玄机未显"），内置 TypewriterText 子组件（逐字浮现 + 标点停顿 + 闪烁光标） |
| `common/DailyCardWidget.tsx` | "今日一言"便签卡片 |
| `common/RitualButton.tsx` | 仪式按钮，双层级发光（normal/peak），副文案支持 |
| `common/ParticleSystem.tsx` | Canvas 粒子系统（200 行），40-60 粒微尘，非均匀分布（光斑附近密度高），生命周期管理，内容区避让 |

### 2.3 Landing Page（8 个新文件）

| 文件 | 说明 |
|------|------|
| `Landing/HeroSection.tsx` | 5 层空间（虚空黑 → 星云光斑 → 粒子 → 光柱 → 文字），入场编排 0→2.5s（5 阶段 setTimeout），星云光斑相位错开呼吸，ParticleSystem 集成，Button(cta) 呼吸 CTA，滚动指示器 |
| `Landing/RitualEntrySection.tsx` | 两扇仪式之门（Tarot 六角星芒 + I Ching 铜钱三线），hover 互斥（非 hover 卡片 opacity 0.80），图标微动效 |
| `Landing/EmotionalHookSection.tsx` | blur→清晰浮现，两行 stagger 600ms，更深底色 #06080b |
| `Landing/AICompanionSection.tsx` | 标题 + 描述 + 3 个 Feature Pill（stagger 80ms/个） |
| `Landing/DailyRitualSection.tsx` | 24s 旋转光环 + 呼吸光点，两行文字 stagger |
| `Landing/ReflectionSection.tsx` | 3 条情绪碎片，blur→清晰，400ms stagger |
| `Landing/FooterSection.tsx` | 极简 Footer，hover 金色链接 |
| `Landing/LandingPage.tsx` | 7 个 Section 组装，bg-brand-void 全局底色 |

---

## 三、修改的现有文件

### 3.1 `src/App.tsx`

| 变更项 | 变更前 | 变更后 |
|--------|--------|--------|
| 路由 `/` | `<Navigate to="/iching" replace />` | `<LandingPage />` |
| 新增 import | — | `import LandingPage from './components/Landing/LandingPage'` |
| 根容器 | `flex flex-col` + main 内 `items-center justify-center` | `flex flex-col bg-brand-void` + main 内无居中 |
| 移除 import | `Navigate` | — |

### 3.2 `src/components/Tarot/TarotPage.tsx`

| 变更项 | 变更前 | 变更后 |
|--------|--------|--------|
| 详情面板 | 内联 `<motion.div>` + 手动渲染关键词/按钮 | 抽取为独立 `CardReveal` 组件 |
| AI 解读 | 使用旧 `ResultCard` | 使用新 `AIResponseCard`（含 Typewriter + BreathingDots） |
| 重新开始按钮 | 仅 `phase === 'drawn'` 时显示 | 仅 `aiState === 'success'` 时显示 |
| 按钮样式 | `text-stone-400` 文字按钮 | `btn-secondary` |
| 顶部间距 | `pt-12` | `pt-24`（适配固定导航栏） |
| 新增 import | — | CardReveal, AIResponseCard |
| 移除 import | ResultCard, detailVariants | — |

### 3.3 `src/components/Tarot/CardReveal.tsx`（新建）

翻牌后从选中牌下方"生长"的信息面板：
- 牌名 + 正逆位标签（双色系）
- 英文牌名（可选）
- 逆位警示条（红色）
- 关键词 pill（stagger 80ms/个，正位 amber 色 / 逆位 red 色）
- 简要含义
- "请求解读"按钮（btn-primary）

### 3.4 `src/components/IChing/IChingPage.tsx`

| 变更项 | 变更前 | 变更后 |
|--------|--------|--------|
| AI 解读 | 使用旧 `ResultCard` | 使用新 `AIResponseCard` |
| 卦象卡片 | `glass-card` | `glass-card-static`（无 hover 动画） |
| 变卦卡片 | `glass-card` + 手动 `border-l-4` | `glass-card-accent` |
| AI 解读按钮 | `btn-primary` + 内联样式 | `btn-ritual` |
| 重新起卦按钮 | `text-stone-400` 文字按钮 | `btn-secondary` |
| 专业版爻辞 | 带背景的 `<li>` 列表 | 简化 `<p>` 列表，动爻 `text-amber-200/80` |
| 顶部间距 | `pt-16` | `pt-24` |
| 新增 import | — | AIResponseCard |
| 移除 import | ResultCard | — |

### 3.5 `src/components/common/LoadingSpinner.tsx`

| 变更项 | 变更前 | 变更后 |
|--------|--------|--------|
| 实现 | 旋转 `motion.div` | 委托给 `BreathingDots` 组件 |
| 代码行数 | 23 行 | 15 行 |

---

## 四、Bug 修复

### 4.1 `src/index.css` — `.btn-secondary` Tailwind 编译错误

**错误**：`Cannot apply unknown utility class: hover:bg-white/8`

**原因**：Tailwind v3 默认不透明度 scale 不含 `8`，仅含 0, 5, 10, 15, 20…。`@apply` 只能引用已生成的 utility class。

**修复**：
```diff
- hover:bg-white/8 hover:border-white/15
+ hover:bg-white/[0.08] hover:border-white/[0.15]
```
使用 bracket 任意值语法。视觉效果完全不变。

---

## 五、变更统计

| 类别 | 新建 | 修改 | 合计 |
|------|------|------|------|
| 配置文件 | 0 | 2 | 2 |
| 工具/常量 | 1 | 0 | 1 |
| 通用组件 | 9 | 1 | 10 |
| Landing Page | 8 | 0 | 8 |
| 业务组件 | 1 | 3 | 4 |
| 根组件 | 0 | 1 | 1 |
| **总计** | **19** | **7** | **26** |

所有变更均通过 `tsc --noEmit` 零错误编译验证。
