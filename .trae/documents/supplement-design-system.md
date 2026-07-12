# 补充 Nothing UI 设计系统 — 全面对齐 refero.design

## 摘要

基于对 3 个设计参考资源的调研（[styles.refero.design](https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26) 的 ElevenLabs 风格、[getdesign.md/notion](https://getdesign.md/notion/design-md) 的 Notion 风格、[neuform.ai/novaflow](https://neuform.ai/template/novaflow) 待用户提供截图），将 Nothing UI 设计系统全面对齐 refero.design 的完整结构。补缺 tokens.css 中未 token 化的值，新增 Layout / Surface / Elevation / Focus / Imagery / Agent Prompt Guide 等缺失章节，同时坚守 Nothing UI 的核心哲学（无阴影、无模糊、单色优先）。

## 参考资源调研结论

### 1. styles.refero.design（ElevenLabs 风格）— 主要参考

完整结构包含：Color tokens、Typography（含 line-height + letter-spacing tokens）、Spacing scale、Border radius（按元素命名）、Shadows（9 级）、Layout tokens、Components（精确规格）、Do's & Don'ts、Surfaces（4 级层级）、Elevation、Imagery、Layout guidelines、Agent Prompt Guide、Similar Brands、Quick Start（CSS + Tailwind v4 @theme）。

**可借鉴**：Typography token 化（line-height/letter-spacing 作为 CSS 变量）、按元素命名的 radius、Layout tokens、Surface 层级、Agent Prompt Guide、Do's & Don'ts 结构化。

**不可借鉴**：Shadows（Nothing UI 明确禁止）、彩色 accent（Nothing UI 仅用红色 accent）、warm paper 色调（Nothing UI 是 OLED 黑/暖灰白）。

### 2. getdesign.md/notion（Notion 风格）— 辅助参考

"Warm minimalism, serif headings, soft surfaces" — 概念方向不同（Nothing UI 是 monochrome + dot-matrix），但 "warm minimalism" 的克制理念与 Nothing UI 的 "Subtract, don't add" 哲学一致。参考价值有限，主要启发：文档应包含明确的 "best for" 场景描述。

### 3. neuform.ai/novaflow — 待补充

JS 渲染的 SPA，WebFetch 无法读取。用户选择提供截图/导出文件。本计划预留 Step 7 用于在截图到位后补充 neuform.ai 特有的设计要素。

## 当前状态分析

### 已有（完善）

| 文件 | 内容 | 状态 |
|------|------|------|
| [tokens.css](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css) | 字体族、字号、字重、间距、radius、颜色（dark/light）、accent/status、motion、z-index、widget tokens | ✅ 基础完善 |
| [tokens.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/references/tokens.md) | 8 节文档：Typography、Color、Spacing、Motion、Iconography、DotMatrix、Widget、Path Aliases | ✅ 文档完善 |
| [components.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/references/components.md) | 15 类组件规格 | ✅ 基础完善 |
| [SKILL.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/SKILL.md) | 6 节：Philosophy、Craft Rules（9 小节）、Anti-patterns、Workflow、References、Component Matching | ✅ 基础完善 |

### 缺失（经 Grep 验证）

| 缺失项 | 证据 | refero.design 对应 |
|--------|------|-------------------|
| **Line-height / letter-spacing CSS 变量** | tokens.md 文档表格中有，tokens.css 中无 `--leading-*` / `--tracking-*` | Typography → Type Scale 表 |
| **Layout tokens** | `max-width: 1120px` 硬编码在 widget-showcase.css:14、nullframe.css:10；`max-width: 480px` 硬编码在 modal.css:29 | Layout tokens（page-max-width, section-gap, card-padding, element-gap） |
| **按元素命名的 radius** | tokens.css 有 `--radius-xs` 到 `--radius-pill`，但无 `--radius-button` / `--radius-card` / `--radius-input` | Named Radii（tabs, tags, cards, pills, badges, inputs, buttons, tooltips） |
| **Focus ring tokens** | 全项目统一用 `outline: 2px solid var(--interactive); outline-offset: 2px`（switch.css:62-64, modal.css:81-83, dropdown-menu.css:25-27 等至少 8 处），但无 token | —（refero 未单独 token 化，但 Nothing UI 重复度极高，值得 token 化） |
| **Border width tokens** | `1px` / `2px` 硬编码遍布所有组件 CSS | —（refero 未单独 token 化） |
| **Touch target token** | components.md 多次提及 "44px touch target"（toggle、nav、segmented control），但无 `--touch-target-min` | — |
| **Opacity scale** | 仅有 `--overlay-heavy` / `--overlay-light` / `--fill-0`，无系统化 opacity scale | — |
| **Named transitions** | 仅有 `--duration-micro` / `--duration-transition` / `--easing` / `--ease-back`，无命名 transition（如 `--transition-fade`） | — |
| **Granular z-index** | 仅 `--z-base:1` / `--z-overlay:100` / `--z-modal:1000`；dropdown-menu 用 `--z-overlay` 兼作 dropdown 和 overlay | — |
| **Content width tokens** | 无 `--content-width-narrow/normal/wide` | — |
| **Surface 层级文档** | 有 `--surface` / `--surface-raised` 两级，无 4 级层级系统文档 | Surfaces（4 级：Canvas / Card Surface / Border / Elevated Card） |
| **Elevation 文档** | SKILL.md 说 "No shadows"，但未文档化 border-based elevation 替代方案 | Elevation（3 种模式） |
| **Imagery guidelines** | 无 | Imagery |
| **Layout guidelines** | SKILL.md §2.3 有 spacing-as-meaning，但无页面级 layout 规范 | Layout |
| **Agent Prompt Guide** | 无 | Agent Prompt Guide（5 个示例组件 prompt） |
| **Do's & Don'ts 结构化** | SKILL.md §3 有 Anti-patterns 列表，但未按类别结构化 | Do's and Don'ts |
| **Similar Brands** | 无 | Similar Brands |
| **Tailwind @theme 输出** | 无（tokens.css 是纯 CSS） | Quick Start → Tailwind v4 |

## 执行步骤

### Step 1: tokens.css — 补缺 CSS 变量

**文件**：[src/styles/tokens.css](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css)

**新增 token 组**（全部在 `:root` 块内，dark/light 通用）：

```css
/* === Line Height === */
--leading-display-xl: 1.0;
--leading-display-lg: 1.05;
--leading-display-md: 1.1;
--leading-heading: 1.2;
--leading-subheading: 1.3;
--leading-body: 1.5;
--leading-body-sm: 1.5;
--leading-caption: 1.4;
--leading-label: 1.2;

/* === Letter Spacing === */
--tracking-display-xl: -0.03em;
--tracking-display-lg: -0.02em;
--tracking-display-md: -0.02em;
--tracking-heading: -0.01em;
--tracking-subheading: 0;
--tracking-body: 0;
--tracking-body-sm: 0.01em;
--tracking-caption: 0.04em;
--tracking-label: 0.08em;

/* === Layout === */
--page-max-width: 1120px;
--modal-max-width: 480px;
--modal-max-width-sm: 400px;
--section-gap: 80px;
--section-gap-lg: 120px;
--card-padding: 24px;
--card-padding-sm: 16px;
--element-gap: 8px;

/* === Named Radius by Element === */
--radius-button: 999px;        /* pill */
--radius-button-technical: 8px; /* technical buttons */
--radius-card: 16px;
--radius-card-compact: 8px;
--radius-card-technical: 4px;
--radius-input: 8px;
--radius-input-underline: 0px;
--radius-tag: 999px;           /* pill tag */
--radius-tag-technical: 4px;   /* technical tag */
--radius-tooltip: 8px;
--radius-segment: 999px;       /* segmented control */

/* === Focus Ring === */
--focus-ring-width: 2px;
--focus-ring-color: var(--interactive);
--focus-ring-offset: 2px;
--focus-ring-offset-inset: -2px; /* for inset focus (dropdown items) */

/* === Border Width === */
--border-width-sm: 1px;
--border-width-md: 2px;
--border-width-lg: 4px;
--border-width-accent: 2px;   /* active row indicator */

/* === Touch Target === */
--touch-target-min: 44px;

/* === Opacity Scale === */
--opacity-0: 0;
--opacity-10: 0.1;
--opacity-20: 0.2;
--opacity-30: 0.3;
--opacity-40: 0.4;
--opacity-50: 0.5;
--opacity-60: 0.6;
--opacity-70: 0.7;
--opacity-80: 0.8;
--opacity-90: 0.9;
--opacity-100: 1;

/* === Named Transitions === */
--transition-fade: var(--duration-micro) var(--easing);
--transition-color: var(--duration-micro) var(--easing);
--transition-border: var(--duration-micro) var(--easing);
--transition-transform: var(--duration-transition) var(--easing);
--transition-opacity: var(--duration-micro) var(--easing);

/* === Granular Z-Index === */
--z-base: 1;
--z-dropdown: 50;
--z-sticky: 80;
--z-overlay: 100;
--z-popover: 200;
--z-tooltip: 300;
--z-modal: 1000;

/* === Content Width === */
--content-width-narrow: 640px;
--content-width-normal: 768px;
--content-width-wide: 1024px;
--content-width-full: 1120px;
```

**注意**：`--z-base` / `--z-overlay` / `--z-modal` 已存在，Step 1 会用更细粒度的版本替换（保持原有值不变，新增中间层级）。

### Step 2: tokens.md — 同步文档 + 新增章节

**文件**：[references/tokens.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/references/tokens.md)

**改动**：

1. **§1 Typography** — 在 Type Scale 表格后新增 "Line Height & Letter Spacing Tokens" 子节，列出 `--leading-*` / `--tracking-*` 变量表
2. **§3 Spacing** — 新增 "Named Radius by Element" 子节，列出 `--radius-button` / `--radius-card` 等
3. **新增 §3.5 Layout** — 文档化 `--page-max-width` / `--section-gap` / `--card-padding` / `--element-gap` / `--content-width-*`
4. **新增 §3.6 Border Width & Touch Target** — 文档化 `--border-width-*` / `--touch-target-min`
5. **新增 §3.7 Opacity Scale** — 文档化 `--opacity-0` 到 `--opacity-100`
6. **新增 §3.8 Named Transitions** — 文档化 `--transition-fade` 等
7. **§4 Motion** — 新增 "Named Transitions" 引用
8. **新增 §4.5 Focus Ring** — 文档化 `--focus-ring-width` / `--focus-ring-color` / `--focus-ring-offset`，说明 `:focus-visible` 统一模式
9. **新增 §4.6 Z-Index Scale** — 文档化 7 级 z-index 层级
10. **新增 §9 Surface & Elevation** — 4 级 Surface 层级 + border-based elevation（无阴影）
11. **新增 §10 Imagery** — 图像/图标/插图规范
12. **新增 §11 Layout Guidelines** — 页面级布局规范（max-width、section rhythm、grid）

### Step 3: SKILL.md — 新增设计规则章节

**文件**：[SKILL.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/SKILL.md)

**改动**：

1. **§2 CRAFT RULES** 新增子节：
   - **§2.10 Layout & Page Structure** — 页面 max-width、section rhythm、content width 选择、grid 布局规则
   - **§2.11 Surface & Elevation (No-Shadow)** — 4 级 surface 层级（Canvas → Surface → Surface-Raised → Border-Visible），elevation 通过 surface 对比 + border 实现，明确禁止 shadow/blur
   - **§2.12 Focus & Accessibility** — `:focus-visible` 统一模式（`outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset)`），44px touch target，ARIA 规范
   - **§2.13 Imagery** — 图像规范（产品截图在 elevated card 内、dot-matrix 插图、monoline 图标、无摄影/无吉祥物）

2. **§3 ANTI-PATTERNS** — 补充：
   - No hardcoded `max-width` / `outline` / `z-index` — 必须用 token
   - No shadow-based elevation — 用 surface 对比 + border

3. **新增 §7 DO'S & DON'TS**（结构化，按类别）：
   - Color Do's/Don'ts
   - Typography Do's/Don'ts
   - Layout Do's/Don'ts
   - Component Do's/Don'ts
   - Motion Do's/Don'ts

4. **新增 §8 AGENT PROMPT GUIDE** — 5 个示例组件 prompt（Hero section、Card、Navigation、Data row、Modal），参照 refero.design 的 Agent Prompt Guide 格式，用 Nothing UI 的 token 和风格

5. **新增 §9 SIMILAR BRANDS** — 列出与 Nothing UI 设计理念相近的品牌（Linear、Vercel、Teenage Engineering、Braun、Dieter Rams），用于设计语境参考

### Step 4: components.md — 细化组件规格

**文件**：[references/components.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/references/components.md)

**改动**：将每节的硬编码值替换为 token 引用：

1. **§1 Cards** — `Radius: 12–16px` → `Radius: var(--radius-card)`；`Padding: 16–24px` → `Padding: var(--card-padding-sm) – var(--card-padding)`
2. **§2 Buttons** — `Radius: 999px` → `var(--radius-button)`；`padding 12px 24px` → `padding 12px var(--space-lg)`
3. **§3 Inputs** — `8px radius` → `var(--radius-input)`；focus 规则引用 `--focus-ring-*`
4. **§6 Navigation** — `44px touch` → `var(--touch-target-min)`
5. **§7 Tags** — `999px (pill)` → `var(--radius-tag)`；`4px (technical)` → `var(--radius-tag-technical)`
6. **§10 Toggles** — `44px touch` → `var(--touch-target-min)`
7. **§14 Overlays** — `max 480px` → `var(--modal-max-width)`；`z-index` 引用 `--z-modal` / `--z-overlay` / `--z-popover`
8. 每节末尾新增 **Do's & Don'ts** 子节（2-4 条）

### Step 5: platform-mapping.md — 同步新 token

**文件**：[references/platform-mapping.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/references/platform-mapping.md)

**改动**：在 §1 HTML/CSS 的 `:root` 代码块中补充新增 token 的示例（选取关键几个：`--page-max-width`、`--focus-ring-width`、`--touch-target-min`、`--radius-button`、`--radius-card`）。SwiftUI §2 和 Compose §3 同步补充对应映射。

### Step 6: 组件 CSS — 替换硬编码为 token（可选优化）

**范围**：仅替换高频重复的硬编码值，不逐文件重构。

**优先级**：
1. `outline: 2px solid var(--interactive); outline-offset: 2px` → `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset)`（至少 8 处：switch.css、modal.css ×3、dropdown-menu.css ×3 等）
2. `max-width: 1120px` → `max-width: var(--page-max-width)`（widget-showcase.css:14、nullframe.css:10）
3. `max-width: 480px` → `max-width: var(--modal-max-width)`（modal.css:29）
4. `z-index: var(--z-overlay)` 用于 dropdown 的 → `z-index: var(--z-dropdown)`（dropdown-menu.css:32, 184）

**注意**：此步为可选优化，不改变视觉表现，仅提升可维护性。若用户希望仅做文档层面补充，可跳过此步。

### Step 7: neuform.ai/novaflow 补充（待用户提供截图）

**前提**：用户提供 neuform.ai/novaflow 页面截图或导出文件后执行。

**操作**：
1. 分析截图中 novaflow 模板的设计要素（颜色、排版、布局、组件模式、动效）
2. 识别与 Nothing UI 现有设计系统的差异与可借鉴点
3. 将可借鉴要素补充到 tokens.css / tokens.md / SKILL.md 的相应章节
4. 若 novaflow 有 Nothing UI 未覆盖的新设计维度（如特殊动效模式、响应式断点系统），新增专门章节文档化

## 假设与决策

1. **坚守无阴影哲学**：refero.design 有 9 级 shadow tokens，但 Nothing UI 明确禁止 shadow/blur。本计划不引入 shadow tokens，而是文档化 border-based elevation 替代方案。
2. **坚守单色优先**：不引入 refero.design 的彩色 accent 系统（Void Violet / Ember Orange）。Nothing UI 仅保留红色 `--accent` 作为唯一彩色中断。
3. **token 命名遵循现有约定**：`--leading-*` / `--tracking-*` / `--radius-*` / `--focus-ring-*` 等遵循 tokens.css 现有的 `--kebab-case` 命名风格。
4. **向后兼容**：所有新增 token 为增量添加，不修改/删除现有 token。`--z-base` / `--z-overlay` / `--z-modal` 保持原值，仅新增中间层级。
5. **Step 6 可选**：组件 CSS 的 token 替换为可选优化，不影响设计系统文档的完备性。若用户仅要文档层面补充，可跳过。
6. **neuform.ai 延后**：Step 7 在用户提供截图后独立执行，不阻塞 Step 1-6 的文档补充工作。
7. **不创建新文件**：所有改动在现有文件内进行（tokens.css、tokens.md、components.md、SKILL.md、platform-mapping.md），不新建文件。
8. **Tailwind @theme 输出暂不创建**：Nothing UI 使用纯 CSS（非 Tailwind），创建 Tailwind @theme 输出会引入混淆。若用户未来迁移到 Tailwind v4 再生成。

## 验证步骤

1. **tokens.css 语法验证**：在 dev server 运行状态下，浏览器 DevTools 检查新增 CSS 变量是否正确注册（`getComputedStyle(document.documentElement).getPropertyValue('--focus-ring-width')` 应返回 `2px`）
2. **文档一致性**：tokens.md 中列出的每个 token 都在 tokens.css 中有对应定义；components.md 中引用的 token 都存在
3. **无破坏性变更**：`npm run dev` 启动正常，现有组件视觉无变化（新增 token 为增量，未修改现有值）
4. **`npm run type-check`**：零新增类型错误（文档变更不影响类型）
5. **焦点环一致性**：若执行了 Step 6，Grep 验证 `outline: 2px solid` 不再出现在组件 CSS 中（全部替换为 token 引用）
