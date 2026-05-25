这是一个非常棒的工程化实践。将这些严谨的约束条件整合进需求文档，这个项目就从一个简单的“玩具网页”，蜕变成了一个能够展示扎实前端基础、复杂状态机流转、以及清晰架构设计能力的**企业级级工程/高价值的底层项目**。这样的项目在应对即将到来的秋招技术面时，是非常拿得出手的“护城河”。

在合并之前，我站在**工程化和防御性编程**的角度，再为你补充三个真正体现“高级感”的优化点，并直接融入最终版文档：

1. **常量的彻底抽离（分离关注点）**：64卦的静态数据、塔罗牌的基础配置，不应该和核心的业务逻辑（`ichingLogic.ts`）混在一起。新增 `constants/` 目录，展现你对数据与逻辑解耦的理解。
2. **API 的防御性设计（优雅降级）**：调用大模型 API 极易发生超时或失败。需求文档中必须明确要求加上 `AbortController` (超时中断) 和优雅的错误回退（Fallback UI），这能体现你对真实网络环境的考量。
3. **全局错误边界（Error Boundary）**：React 项目的标配，防止局部组件崩溃导致整个页面白屏。

下面是经过全面重构、融合了所有护丁与工程化思想的**终极版 AI 协作需求文档**。你可以直接一键复制，扔给你的 AI 编程助手（或者通过你的 DeepSeek-TUI 终端代理）作为根指令：

Markdown

```
# 「玄机」六爻 & 塔罗 占卜网页 React 项目架构与开发文档

## 1. 项目概述与工程目标
- 项目名称：**xuanji-divination**
- 功能：提供中式六爻（金钱卦）和西方塔罗两种占卜方式。用户选择模式 → 提出问题 → 遵循严格的交互状态机进行占卜 → 调用 AI 获取解读 → 结果展示。
- 工程目标：严格遵循“单一数据源 (SSOT)”、“关注点分离”和“防御性编程”原则，产出一个具备高可维护性、可直接运行的 React 企业级规范项目。
- 目标用户：中文用户，对周易和塔罗感兴趣，开发者可后期扩展。

## 2. 技术栈（严格限定，禁止发散）
| 类别      | 技术                                                       |
| :-------- | :--------------------------------------------------------- |
| 前端框架  | React 18+ （函数组件 + Hooks）                             |
| 构建工具  | Vite                                                       |
| 样式方案  | Tailwind CSS （v3+）                                       |
| 动画库    | Framer Motion （初版做占位，后续迭代）                     |
| HTTP 请求 | 原生 fetch（禁止 axios，需结合 AbortController）           |
| 路由      | React Router v6 （路由驱动模式）                           |
| 包管理器  | npm 或 pnpm                                                |
| 语言      | TypeScript（强制，开启严格模式，无 `any`）                 |

**限制与规范**：禁止使用 Redux/MobX 等全局状态库；组件颗粒度需合理拆分；字体使用系统自带中文字体（如 `'Noto Serif SC', '宋体'`）通过 Tailwind 扩展。

## 3. 项目结构规范
```text
xuanji-divination/
├── ... (基础配置文件：vite.config.ts, tailwind.config.js 等)
├── src/
│   ├── main.tsx
│   ├── App.tsx             （包含 ErrorBoundary、Router 和 Provider）
│   ├── index.css          
│   ├── components/
│   │   ├── ModeSelector.tsx （基于 useNavigate 的导航组件）
│   │   ├── IChing/        （六爻模块相关组件）
│   │   ├── Tarot/         （塔罗模块相关组件）
│   │   └── common/        （通用组件：QuestionInput, ResultCard 等）
│   ├── hooks/
│   │   ├── useIChing.ts   （六爻核心状态机）
│   │   ├── useTarot.ts    （塔罗核心状态机）
│   │   └── useDeepSeek.ts （API 调用，需包含超时与错误捕获）
│   ├── utils/
│   │   ├── ichingLogic.ts （纯函数：核心算法流转）
│   │   └── api.ts         （Prompt 组装与 Fetch 封装）
│   ├── constants/
│   │   └── ichingData.ts  （预留：64卦数据结构声明与 Mock）
│   ├── types/
│   │   └── index.ts       （全局类型定义，严禁 any）
│   └── context/
│       └── AppContext.tsx  （仅管理跨页面共享数据，如 question）
└── .env.example
```

## 4. 全局状态与路由设计（严守单一数据源）

- **路由驱动模式**：应用的当前占卜模式（`mode`）**唯一由 URL 路由决定**。禁止在 Context 中维护 `mode` 状态，避免状态不同步。
- **路由表**：
  - `/`：首页，重定向到 `/iching`。
  - `/iching`：渲染 `IChingPage`。
  - `/tarot`：渲染 `TarotPage`。
- **Context 极简设计**：`AppContext` 仅负责透传全局共享的非控制类数据（如用户输入的问题 `question`）。

## 5. UI/UX 风格与视觉规范

- **底色与容器**：深色背景（`bg-[#0a0c0f]`）配合半透明毛玻璃卡片（`backdrop-blur-xl border-white/10`）。
- **色调与交互**：暖灰文字（`text-stone-300`），核心元素使用金色/琥珀色（`text-amber-200`）。按钮需有明确的 `disabled` 状态和悬停发光反馈。

## 6. 六爻模式核心生命周期（必须严格遵守）

### 6.1 状态机流转时序 (`useIChing`)

1. 用户点击“起卦”，`phase` 变为 `throwing`，UI 按钮禁用，文案显示“摇卦中...”。
2. 触发 `throwCoins()`，**必须等待物理动画结束**（通过 Framer Motion 的 `onAnimationComplete` 或 Promise 模拟 0.7s 延迟）。
3. **动画明确结束后**，才进行数学计算，推入 `lines` 数组，更新 `currentThrow`，并将 `phase` 恢复为 `idle`。
4. `currentThrow === 6` 时，流程进入 `completed`，按钮变为“请求解卦”。

### 6.2 常量与数据解耦

- 在 `utils/ichingLogic.ts` 中实现核心算法，但在查表函数 `getHexagramName` 中，必须从 `constants/ichingData.ts` 读取数据。
- `constants/ichingData.ts` 中**只需声明完整的数据结构接口，并提供乾、坤两卦作为 mock**。完整数据由人工后续补充。

## 7. 塔罗模式基本要求

- 与六爻类似，具备 `drawCard` 动作，严格遵循“点击 -> 翻牌动画进行 -> 动画结束回调 -> 触发网络请求 -> 展示结果”的时序。

## 8. API 防御性封装 (`useDeepSeek`)

- 必须使用 `AbortController` 设置请求超时（如 30 秒）。
- 具备明确的 `isLoading`、`isError` 状态。当发生网络错误或超时时，需要向 UI 层抛出友好的兜底文案（如：“玄机未显，请稍后再试”）。

## 9. 迭代开发原则（先骨架，后皮囊）

- **骨架优先**：初版优先打通核心业务逻辑、状态机流转和数据流。
- **视觉预留**：凡是文档中涉及动画的组件（如 `Coin`, `TarotCard`），初版代码中必须使用 `<motion.div>` 进行结构包裹，并暴露出 `variants` 或 `animate` 接口，用最基础的透明度 `opacity` 变化代替 3D 动画，为后续迭代留出插槽。

## 10. 开发者协作指令（请严格执行！）

请你现在作为前端架构师和核心开发，阅读并深刻理解上述所有需求。

**第一步（当前任务）**：请不要立即生成任何业务代码！只需回复：“我已完全理解项目架构、技术栈规范和状态机时序限制。请指示下一步开发任务。”

**后续流程约定**： 我们将采用分步开发的模式。我会按模块向你下达指令。每次你输出代码后，**必须**在回答末尾附带以下【自查清单】，并逐项打勾确认（未做到项请自我纠正）：

- [ ] 是否完全遵循路由驱动，没有在 Context 中滥用 mode 状态？
- [ ] 摇卦/抽牌状态机中，是否正确处理了动画结束后的回调，避免了数据瞬移？
- [ ] 所有组件和 Hook 是否具备完整的 TypeScript 类型注解且零 `any`？
- [ ] 网络请求是否加入了防重、超时等防御性代码？
- [ ] 动画组件是否已用 `motion.div` 妥善包裹预留？