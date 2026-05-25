# 「玄机」视觉风格方案 v1.0

> 风格锚点：Labyrinthos × Linear × Arc Browser × Apple Vision Pro
> 核心命题：如何在深色屏幕上，用光、玻璃、虚空和极少的金色，造出"不可名状的高级感"

---

## 1. 主色 — 虚空黑

不是纯黑。是从深空截取的一段"无星暗区"——带极微弱的靛蓝底色。

```
虚空黑（bg-deep）    #080a0f    ← 全屏底色，不可再深
深邃黑（bg-base）    #0c0f16    ← 主背景
暗物质（bg-surface） #11151e    ← 卡片底
暗云母（bg-elevated） #181c28   ← 浮层/hover 最高亮
```

**铁律**：绝对不使用 `#000000`。纯黑在 OLED 上会"吞掉"周围的光，破坏层次。

**视觉效果**：四层递进，每层亮度相差约 3-4%，在暗色模式下人眼刚好可辨。

```
┌─────────────────────────────────────────┐
│  #080a0f  虚空黑    ← 最深，页面底色     │
│  ┌───────────────────────────────────┐  │
│  │ #0c0f16 深邃黑   ← 主容器背景      │  │
│  │ ┌─────────────────────────────┐   │  │
│  │ │ #11151e 暗物质  ← 卡片       │   │  │
│  │ │ ┌───────────────────────┐   │   │  │
│  │ │ │ #181c28 暗云母 ←hover │   │   │  │
│  │ │ └───────────────────────┘   │   │  │
│  │ └─────────────────────────────┘   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 2. 辅助色

### 2.1 唯一的强调色：琥珀金

```
amber-100   #fef3c7    仅用于黑色背景上的极少量高亮文字（慎用）
amber-200   #fde68a    卦名、牌名、核心 CTA、选中态（主强调色）
amber-300   #fcd34d    悬停发光（hover glow 的峰值亮度）
amber-400   #fbbf24    仅在 glow 动画的瞬间峰值出现（0.3s 内消退）
```

金色不是装饰——它是"光"。在占卜语境中，金色=启示、烛火、被照亮的瞬间。

### 2.2 文本色

```
stone-200   #e7e5e4    正文主力
stone-300   #d6d3d1    卡片内标题
stone-400   #a8a29e    辅助信息、标注
stone-500   #78716c    极弱提示、英文牌名
stone-600   #57534e    禁用态、占位符
```

### 2.3 警示色

```
red-300     #fca5a5    逆位警示文字
red-400     #f87171    逆位分割线
red-400/15  rgba(248,113,113,0.15)  逆位底色
```

### 2.4 完整色板表

```
┌───────────────────────────────────────────────────────────┐
│ Token               │ 色值              │ 使用限制          │
├───────────────────────────────────────────────────────────┤
│ --void-black        │ #080a0f           │ 仅 body/全屏底色  │
│ --deep-black        │ #0c0f16           │ 主容器背景        │
│ --dark-matter       │ #11151e           │ 卡片底            │
│ --dark-mica         │ #181c28           │ hover/elevated    │
├───────────────────────────────────────────────────────────┤
│ --gold-primary      │ #fde68a (a200)    │ 标题/CTA/选中     │
│ --gold-hover        │ #fcd34d (a300)    │ hover 发光        │
│ --gold-glow         │ #fbbf24 (a400)    │ 动画瞬峰          │
│ --gold-soft         │ rgba(253,230,138,0.12) │ 底色/弱强调│
├───────────────────────────────────────────────────────────┤
│ --text-primary      │ #e7e5e4 (s200)    │ 正文              │
│ --text-secondary    │ #d6d3d1 (s300)    │ 卡片标题          │
│ --text-tertiary     │ #a8a29e (s400)    │ 辅助信息          │
│ --text-muted        │ #78716c (s500)    │ 占位/英文名       │
│ --text-disabled     │ #57534e (s600)    │ 禁用态            │
├───────────────────────────────────────────────────────────┤
│ --danger            │ #fca5a5 (r300)    │ 逆位/错误         │
│ --danger-soft       │ rgba(248,113,113,0.15)  │ 错误底色   │
└───────────────────────────────────────────────────────────┘
```

---

## 3. 阴影 — 不要投影，要"光晕"

传统 UI 用 `box-shadow` 制造 Y 轴投影（卡片浮起感）。这个方向在深色主题中廉价。

**方案**：用扩散光晕代替投影。所有的"浮起"效果由 `box-shadow` 的 `spread` + `blur` 实现，颜色取自金色而非黑色。

### 3.1 光晕层级

```
┌─────────────────────┬──────────────────────────────────────────────────┐
│ 层级                  │ CSS                                              │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 微弱（卡片默认）      │ box-shadow: 0 0 0 1px rgba(255,255,255,0.06)     │
│ 悬浮（hover）         │ box-shadow: 0 0 24px rgba(253,230,138,0.08),     │
│                       │             0 0 0 1px rgba(253,230,138,0.15)     │
│ 发光（重要卡片）      │ box-shadow: 0 0 40px rgba(253,230,138,0.12),     │
│                       │             0 0 0 1px rgba(253,230,138,0.20)     │
│ 脉冲（CTA / loading） │ box-shadow: 0 0 32px rgba(253,230,138,0.18),     │
│                       │             0 0 64px rgba(253,230,138,0.06)      │
│ 错误闪烁              │ box-shadow: 0 0 20px rgba(248,113,113,0.15),     │
│                       │             0 0 0 1px rgba(248,113,113,0.25)     │
└─────────────────────┴──────────────────────────────────────────────────┘
```

### 3.2 禁止的阴影

- `shadow-lg` / `shadow-2xl` — 传统 Material 式投影
- 黑色/灰色 `box-shadow` — 在深色背景上不可见且无意义
- 多重堆叠投影制造"厚度" — 游戏 UI 的廉价感来源

---

## 4. 边框 — 光在玻璃边缘的折射

### 4.1 边框层级

所有边框用半透明白色，不用纯色。边框是"玻璃的切面"，不是"框线"。

```
┌───────────────────────┬───────────────────────────────────┐
│ 层级                    │ CSS                               │
├───────────────────────┼───────────────────────────────────┤
│ 不可见（无边框）        │ 无边框 — 用于最弱分割              │
│ 微弱分割               │ border-white/[0.04] — 卡片内分隔   │
│ 默认边框               │ border-white/[0.08] — 卡片外框     │
│ 强调边框               │ border-white/[0.12] — hover/focus  │
│ 金色边框               │ border-amber-200/[0.15] — 选中/CTA │
│ 金色发光边框           │ border-amber-200/[0.25] — 峰值高亮  │
└───────────────────────┴───────────────────────────────────┘
```

### 4.2 圆角

```
元素               │ 圆角
───────────────────┼──────
小标签 / chip       │ rounded-lg  (8px)
按钮 / 小卡片       │ rounded-xl  (12px)
标准卡片            │ rounded-2xl (16px)
大面板 / Landing 卡 │ rounded-3xl (24px)
```

圆角不超过 `rounded-3xl`。超过则趋向"胶囊"感，破坏神秘学应有的方正稳重。

### 4.3 特殊边框

**卦象/重要信息的金色左边框**：
```css
border-l-2 border-amber-200/30
```

**逆位警示红色左边框**：
```css
border-l-2 border-red-400/30
```

---

## 5. Glow 规范 — 光的语言

Glow 是"神秘感"最直接的来源。光不来自物体本身，而是从物体边缘向外弥散。

### 5.1 Glow 类型

```
┌─────────────────────┬─────────────────────────────────────────────────┐
│ 类型                  │ 视觉 & CSS                                      │
├─────────────────────┼─────────────────────────────────────────────────┤
│ 弥散光晕（环境）      │ 大 blur radius (40-80px), 极低 opacity (0.04-   │
│                       │ 0.08)。用于页面背景中的"有光在远处"氛围。        │
│                       │                                                 │
│ 边缘光（边框发光）    │ 中等 blur (12-24px), 适中 opacity (0.10-0.20)。  │
│                       │ 用于 hover 态、选中态。紧贴元素边缘。            │
│                       │                                                 │
│ 脉冲光（CTA）         │ 周期性 opacity 呼吸 + blur 变化。用于主按钮、    │
│                       │ loading 状态。                                  │
│                       │                                                 │
│ 闪烁光（事件）        │ 一次性 opacity 峰值后快速消退。用于操作反馈。    │
│                       │ duration < 400ms。                              │
└─────────────────────┴─────────────────────────────────────────────────┘
```

### 5.2 Glow 色相

所有 glow 统一使用 amber 色系。不用白色 glow（冷酷）、不用蓝色 glow（科技感）、不用紫色 glow（廉价玄学）。

```
glow 色值      用途
──────────────────────────────────────
amber-200      标准 glow（卡片 hover、边框发光）
amber-300      峰值 glow（按钮 hover、选中闪烁）
amber-400      瞬时 glow（动画峰值，<300ms）
```

### 5.3 背景氛围光（星云感来源）

在页面最底层放置极淡的径向渐变，模拟深空中遥远星云的光：

```css
/* 页面背景氛围光 — 固定在左上和右下各一处 */
.cosmic-ambience {
  background:
    radial-gradient(ellipse 600px 400px at 20% 15%, rgba(253,230,138,0.03) 0%, transparent 70%),
    radial-gradient(ellipse 500px 500px at 80% 80%, rgba(253,230,138,0.02) 0%, transparent 70%);
  pointer-events: none;
}
```

这不是"背景图片"——是光的存在感。用户不会意识到的细节。

---

## 6. 字体系统

### 6.1 字体族声明

```css
/* Tailwind 配置 */
fontFamily: {
  serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"宋体"', 'SimSun', 'serif'],
  sans: ['"Inter"', 'system-ui', '-apple-system', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
  mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
}
```

### 6.2 字体层级与使用场景

```
层级    │ 字体               │ 大小          │ 字重   │ 场景
────────┼────────────────────┼───────────────┼────────┼────────────────────
hero    │ serif              │ text-5xl/6xl  │ 400    │ 品牌名"玄机"
标题    │ serif              │ text-2xl/3xl  │ 400    │ 卦名、牌名、页面标题
副标题  │ serif              │ text-xl       │ 400    │ 区块标题
引文    │ serif + italic     │ text-base/lg  │ 400    │ 卦辞、彖辞、《象》曰
正文    │ sans               │ text-sm/base  │ 400    │ 解读内容
辅助    │ sans               │ text-xs/sm    │ 400    │ 标签、标注、时间
代码    │ mono               │ text-xs       │ 400    │ （预留）调试信息
```

### 6.3 关键规则

- **serif 仅用于标题和引文**，绝不出现在按钮、标签、正文段落中
- **字重只用 400 (normal)**，不用 500/700。中式审美的"力量"来自留白而非粗重
- **金色 + serif** = 卦名/牌名的专属组合，其他任何地方不同时出现二者
- **行高**：正文 `leading-relaxed` (1.625)，标题 `leading-tight` (1.25)，引文 `leading-loose` (2)
- **字距**：品牌名和卦名 `tracking-widest`，正文 `tracking-normal`

---

## 7. Hover — 不是"亮起来"，而是"被光照到"

### 7.1 Hover 四维度变化

每次 hover 同时触发四个维度的过渡，制造"光扫过物体"的错觉：

```
维度          │ 变化                            │ 时长
──────────────┼─────────────────────────────────┼──────
亮度 (bg)     │ bg-opacity +0.05~0.10           │ 200ms
边缘 (border) │ border-opacity +0.04~0.08       │ 200ms
光晕 (glow)   │ box-shadow 出现/增强             │ 250ms
位移 (y)      │ translateY(-1px ~ -2px)         │ 200ms
```

### 7.2 各类元素 Hover 规格

```
元素          │ Hover 效果
──────────────┼─────────────────────────────────────────────
主按钮        │ scale(1.02) + glow 出现 + bg 提亮
次按钮        │ bg 提亮 + 边框微亮
模式切换按钮  │ text 变亮（amber → stone-200）+ bg 微显
塔罗牌（可选）│ translateY(-4px) + 边框金色发光 + scale(1.03)
塔罗牌（已选）│ 不响应 hover（已处于选中最高态）
卡片          │ translateY(-2px) + 边框微亮
文字链接      │ text 从 stone-400 → amber-200
```

### 7.3 Hover 禁用态

所有 `disabled` 的元素完全移除 hover 效果：

```css
disabled:hover:bg-* disabled:hover:shadow-none disabled:hover:scale-100 disabled:hover:translate-y-0
```

---

## 8. Transition — 一切变化都应该是"察觉不到"的

### 8.1 标准 Transition Token

```css
/* 颜色/透明度/边框变化 — 快速响应 */
transition-colors duration-150

/* 位置/缩放变化 — 柔和 */
transition-transform duration-200

/* 发光变化 — 略慢，有"弥散"感 */
transition-shadow duration-300

/* 组合（最常用） */
transition-all duration-200 ease-out
```

### 8.2 过渡时长速查

```
变化类型          │ duration │ ease
──────────────────┼──────────┼───────
opacity           │ 150ms    │ ease
color/bg/border   │ 150ms    │ ease
transform         │ 200ms    │ ease-out
box-shadow (glow) │ 300ms    │ ease-out
入场动画          │ 300-400ms│ ease-out
退场动画          │ 200ms    │ ease-in
仪式动画          │ 600-700ms│ 自定 cubic-bezier
```

### 8.3 自定义缓动曲线

```ts
// Framer Motion 用
export const EASE = {
  // 标准入场 — 快启慢停
  out: [0, 0, 0.2, 1] as const,

  // 标准退场 — 慢启快停
  in: [0.4, 0, 1, 1] as const,

  // 悬停 — 对称柔和
  hover: [0.4, 0, 0.2, 1] as const,

  // 仪式 — 带轻微弹性，模拟"落定"
  ritual: [0.34, 1.56, 0.64, 1] as const,

  // 光晕呼吸 — 纯正弦感
  breathe: [0.45, 0, 0.55, 1] as const,
};
```

---

## 9. 动效 — 缓慢、不可逆、有仪式感

### 9.1 动效哲学

> 一切动画都在告诉用户："你不是在操作一个工具，你正在经历一个仪式。"

- **慢** — 不赶时间。入场 300-400ms，仪式 600-700ms
- **不可逆** — 不提供"撤销动画"。流程是单向的，如同掷出的铜钱无法收回
- **阶段性** — 动画有明确的"起→转→落"三段结构
- **不循环** — 除了 loading 呼吸脉冲，没有任何无限循环动画

### 9.2 入场动画（Stagger）

所有列表/集合元素采用 stagger 逐项入场。延迟间隔 = 30-50ms/项。

```tsx
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE.out },
  },
};
```

### 9.3 页面过渡

页面切换使用淡入淡出，不做滑动：

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: EASE.in }}
  >
    <Routes>...</Routes>
  </motion.div>
</AnimatePresence>
```

### 9.4 微交互速查

```
交互              │ 动画                          │ 时长
──────────────────┼───────────────────────────────┼──────
按钮悬停          │ scale 1→1.02 + glow 出现       │ 200ms
按钮按下          │ scale 1.02→0.97（按压感）      │ 100ms
按钮释放          │ scale 0.97→1.02（弹回 hover）  │ 150ms
卡片悬停          │ translateY 0→-2px + 边框亮     │ 200ms
塔罗牌翻转        │ rotateY 0→180°（卡背→牌面）   │ 600ms
铜钱抛出          │ y + rotateZ + 落地             │ 700ms
爻线出现          │ opacity + scaleY (0→1)         │ 400ms
AI 文字逐字       │ 每字 30ms 追加                 │ 直到结束
loading 脉冲      │ opacity 0.4→0.8→0.4 循环       │ 2000ms/cycle
成功反馈          │ 金色 glow 闪一下 → 消退        │ 400ms
错误反馈          │ 红色边框闪 + 轻微抖动(x轴)     │ 400ms
```

### 9.5 禁止的动画

| 禁止 | 原因 |
|------|------|
| 无限旋转 | 焦虑感、游戏感 |
| 弹跳 (bounce) | 轻浮 |
| 彩虹/多色闪烁 | 廉价 |
| 3D 透视翻转（非翻牌场景） | 眩晕 |
| scroll-driven 视差 | 移动端性能灾难 |
| 自动播放背景动画 | 侵扰用户注意力 |

---

## 10. 卡片设计 — 玻璃、光、虚空

### 10.1 核心卡片：星河玻璃

```css
.glass-card {
  /* 半透明暗色底 */
  background: rgba(255, 255, 255, 0.025);
  /* 毛玻璃模糊 */
  backdrop-filter: blur(20px) saturate(120%);
  -webkit-backdrop-filter: blur(20px) saturate(120%);
  /* 微弱边框 — 玻璃切面 */
  border: 1px solid rgba(255, 255, 255, 0.08);
  /* 圆角 */
  border-radius: 16px;
  /* 微光晕 — 卡片从虚空浮起 */
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04),
              0 4px 24px rgba(0, 0, 0, 0.3);
}
```

### 10.2 卡片变体矩阵

```
变体              │ 底透明度     │ 边框          │ 光晕           │ 圆角     │ 场景
──────────────────┼─────────────┼──────────────┼───────────────┼─────────┼───────────
glass-card        │ 2.5% 白     │ white/8%     │ 微光环         │ 16px    │ 通用
glass-card-sm     │ 2% 白       │ white/6%     │ 无光晕         │ 12px    │ 紧凑信息
glass-card-lg     │ 3% 白       │ white/10%    │ 弱金色光晕     │ 24px    │ Landing
glass-card-accent │ 2.5% 白     │ white/8%     │ 金色左边框     │ 16px    │ 卦象/重点
                  │              │ + amber l-2  │               │         │
glass-card-danger │ 2.5% 白     │ white/8%     │ 红色左边框     │ 16px    │ 逆位/错误
                  │              │ + red l-2    │               │         │
glass-card-modal  │ 4% 白       │ white/12%    │ 强金色光晕     │ 20px    │ 弹窗/浮层
```

### 10.3 卡片内布局

```
┌──────────────────────────────────────┐
│  glass-card p-5 或 p-6               │
│                                      │
│  [Header]  标题/卦名                  │
│     ↓ mb-4                           │
│  [Content]                           │
│     正文段落 space-y-3               │
│     ↓ mt-4                           │
│  [Footer]  操作区                    │
│     pt-4 border-t border-white/[0.06]│
└──────────────────────────────────────┘
```

### 10.4 塔罗卡背设计

```css
.tarot-back {
  /* 紫黑渐变 — 模拟夜幕下的绒布牌背 */
  background: linear-gradient(145deg, #181420 0%, #100e1a 40%, #15101e 100%);
  border: 1px solid rgba(253, 230, 138, 0.18);
  border-radius: 8px;
  /* 内发光 — 牌边缘有微弱的金色渗入 */
  box-shadow: inset 0 0 20px rgba(253, 230, 138, 0.04);
  position: relative;
}

/* 中心星芒几何 */
.tarot-back::after {
  content: '';
  position: absolute;
  inset: 30%;
  border: 1px solid rgba(253, 230, 138, 0.12);
  transform: rotate(45deg);
}
```

---

## 11. 按钮设计 — 光的触发点

### 11.1 主按钮 CSS（完整）

```css
.btn-primary {
  /* 布局 */
  @apply px-6 py-3 rounded-xl font-medium
         select-none touch-manipulation;

  /* 颜色 — 金色半透明底 */
  background: rgba(253, 230, 138, 0.08);
  color: #fde68a;
  border: 1px solid rgba(253, 230, 138, 0.18);

  /* 默认微光 */
  box-shadow: 0 0 16px rgba(253, 230, 138, 0.06);

  /* 过渡 */
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Hover — 光增强 */
  &:hover {
    background: rgba(253, 230, 138, 0.14);
    border-color: rgba(253, 230, 138, 0.28);
    box-shadow: 0 0 28px rgba(253, 230, 138, 0.14),
                0 0 0 1px rgba(253, 230, 138, 0.12);
    transform: scale(1.02);
  }

  /* Active — 按压反馈 */
  &:active {
    transform: scale(0.97);
    transition: transform 80ms ease;
  }

  /* Disabled — 光熄灭 */
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background: rgba(253, 230, 138, 0.08);
      border-color: rgba(253, 230, 138, 0.18);
      box-shadow: none;
      transform: none;
    }
  }

  /* Focus — 键盘导航 */
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(253, 230, 138, 0.25);
  }
}
```

### 11.2 次按钮

```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.04);
  color: #a8a29e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  /* 无 glow */
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #e7e5e4;
    border-color: rgba(255, 255, 255, 0.14);
  }
}
```

### 11.3 文字按钮（导航/模式切换）

```css
.btn-ghost {
  background: transparent;
  color: #a8a29e;
  border: none;
  &:hover {
    color: #fde68a;
  }
  /* 选中态 */
  &[aria-current] {
    background: rgba(253, 230, 138, 0.08);
    color: #fde68a;
  }
}
```

### 11.4 按钮尺寸

```
尺寸    │ padding      │ font     │ min-w   │ 场景
────────┼──────────────┼──────────┼─────────┼──────────
sm      │ px-4 py-2    │ text-xs  │ 80px    │ 标签/次要操作
md      │ px-6 py-3    │ text-sm  │ 120px   │ 标准 CTA
lg      │ px-8 py-4    │ text-base│ 180px   │ Landing/Hero
```

### 11.5 按钮文案

- 2-6 个中文字
- 动词 + 名词结构：`起卦` `抽牌` `请求解读` `重新开始`
- 不含 emoji、不含英文、不含标点

---

## 12. 页面层级 — 空间纵深的构建

### 12.1 Z 轴层级（从远到近）

```
层级   │ z-index │ 元素                      │ 说明
───────┼─────────┼───────────────────────────┼────────────────────
L0     │ 底层    │ 星空/星云背景 (#080a0f)    │ 永远静止，不可交互
L1     │ z-0     │ 页面内容流                 │ 正文、卡片
L2     │ z-10    │ 悬浮卡片（hover 提升）      │ 塔罗牌 hover 态
L3     │ z-20    │ 下拉/弹出面板              │ 详情面板
L4     │ z-30    │ 模态浮层 (Modal)           │ 确认框、弹窗
L5     │ z-40    │ Toast / 通知               │ 操作反馈
L6     │ z-50    │ 固定导航栏                 │ 顶部/底部导航
```

### 12.2 星云背景实现（L0）

页面最深层的背景氛围。不是图片，是 CSS：

```css
#root {
  /* 虚空底色 */
  background-color: #080a0f;

  /* 星云光斑 — 两处极淡的径向渐变 */
  background-image:
    radial-gradient(ellipse 800px 500px at 15% 10%, rgba(253,230,138,0.025) 0%, transparent 70%),
    radial-gradient(ellipse 600px 600px at 85% 85%, rgba(253,230,138,0.018) 0%, transparent 65%);

  /* 微弱的噪点覆盖 — 模拟深空的不完美感 */
  /* 实现：SVG feTurbulence 或 CSS noise（可选，后续迭代） */
}
```

### 12.3 玻璃层次（L1 内）

在同一 z-index 层级内，通过透明度递进制造深度：

```
表面         │ 底透明度   │ 边框        │ 光晕     │ 代表
─────────────┼───────────┼────────────┼─────────┼─────────
最深（沉入）  │ 1.5% 白    │ white/4%   │ 无       │ 弱分割线
标准悬浮     │ 2.5% 白    │ white/8%   │ 微光环   │ 卡片
浮起         │ 3.5% 白    │ white/12%  │ 弱金光   │ 选中卡片
高亮         │ 5% 白      │ amber/20%  │ 金光     │ 弹窗/CTA
```

### 12.4 空间深度示意

```
用户视角（屏幕）
│
├─ z-50 导航栏 ─────────────────── 毛玻璃，强模糊
│   └─ (backdrop-blur-xl, bg-opacity: 20%)
│
├─ z-30 Modal ──────────────────── 最亮玻璃，大光晕
│   └─ (bg: 5% white, glow: amber 40px)
│
├─ z-10 选中卡片 ───────────────── 微升，金色边缘光
│   └─ (translateY: -4px, amber glow)
│
├─ z-0 普通卡片 ────────────────── 标准玻璃悬浮
│   └─ (2.5% white, 微光环)
│
├─ z-0 正文 ────────────────────── 直接渲染在背景上
│
└─ 星云背景 ────────────────────── 永远静止
   └─ (#080a0f + 两处径向渐变)
```

---

## 附录 A：快速参考 — 一句话总结

| 维度 | 一句话 |
|------|--------|
| 主色 | 四层递进的黑，从 `#080a0f` 到 `#181c28`，绝不纯黑 |
| 辅助色 | 唯一的光：amber-200。石灰色做正文，红色做警示 |
| 阴影 | 不用投影，用金色扩散光晕 |
| 边框 | 半透明白色的"玻璃切面"，6 级透明度 |
| Glow | 琥珀色系弥散光，分弥散/边缘/脉冲/闪烁四种 |
| 字体 | serif 做标题（Noto Serif SC），sans 做正文（Inter + 系统栈） |
| Hover | 四维联动：亮度↑ + 边框↑ + glow↑ + 微升 |
| Transition | 150-300ms，颜色快于位置快于发光 |
| 动效 | 慢、不可逆、有仪式感。入场 stagger，仪式 600-700ms |
| 卡片 | 星河玻璃：半透明底 + 毛玻璃 + 微光环。5 种变体 |
| 按钮 | 光的触发点。主按钮全状态覆盖，禁用态=光熄灭 |
| 页面层级 | 6 层 z-index + 5 级透明深度，从星云到导航 |

## 附录 B：与现有代码的对接

| 现有文件 | 需要调整 |
|----------|---------|
| `tailwind.config.js` | 扩展 `brand` 色板（bg/border/accent 子层级）+ `fontFamily.sans` |
| `src/index.css` | 补充 `btn-secondary`/`btn-danger`/`glass-card-*` 变体 + 星云背景 |
| `ThrowButton.tsx` | 已使用 `btn-primary`，符合规范 |
| `TarotCard.tsx` | 卡背样式已符合规范，翻牌动画方向后续调整 |
| `ModeSelector.tsx` | 导航栏样式已符合 z-50 + 毛玻璃 |

---

> 视觉方案和设计系统是互补文档。本文档侧重"怎么好看"，[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) 侧重"怎么规范"。
> 两者冲突时，以 DESIGN_SYSTEM.md 中的交互和流程约束为准。
