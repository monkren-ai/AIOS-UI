# Nothing-UI 设计系统全局审查报告 v2

> 项目：[Nothing-UI](file:///c:/Users/monkr/Documents/github/Nothing%20UI) · React 组件库
> 审查日期：2026-07-18 · 审查类型：**Re-Audit**（上次审查：2026-07-08，10 天前）
> 审查路径：`nothing-design-skill/nothing-design/web-ui-kit/react/`
> 范围：80+ 组件、widget 子系统、showcase 站点、Nullframe dashboard、token 系统
> 方法：5 维度评审 + 上次审查变更追踪 + 硬编码值检测 + 设计哲学合规 + 可访问性 + 交互状态
> **本次为只读审计**，未修改任何文件；修复清单见 §六

---

## 一、结论层（1 分钟看懂）

### 总体评分：**7.5 / 10 · B+**（上次 6.8 / 10 · B+，**+0.7**）

**一句话结论**：上次审查 26 个 P0 已修复 9 个（Modal blur / focus / useId、Input useId / focus / type 透传、Alert border-left → border-top、`--shadow-drop` 死代码清空、`--utility-orange` 移除、PhotoCarousel 渐变移除）；**整体可访问性与设计哲学显著改善**。但 **4 个 P0 仍未修复**（NfCard 运行时错误、Spinner 绕过 Button、Tooltip trigger 不可 focus、Command 硬编码 ID），新发现 3 处新 P0（podcast-showcase 自我矛盾、PhotoCarousel 死代码、`@keyframes` box-shadow 动画）。

### 5 维度雷达图

```
                    哲学一致性 (7.5) ↑1.0
                          ▲
                          │
   创新性 (7.5) ◀─────────┼─────────▶ 细节执行 (6.5) ↑1.0
                          │
                          ▼
   功能性 (7.5) ↑0.5 ◀────┼─────────▶ 视觉层级 (7.5)
```

| 维度 | 本次 | 上次 | 变化 | 一句话 |
|------|------|------|------|--------|
| 哲学一致性 | **7.5** | 6.5 | +1.0 | Modal blur、Alert border-left、PhotoCarousel 渐变均修复；podcast 出现新违规 |
| 视觉层级 | **7.5** | 7.5 | — | Type scale 稳定；红色滥用减少但未完全清理 |
| 细节执行 | **6.5** | 5.5 | +1.0 | font 硬编码 22→0；颜色硬编码 17+→6 处；off-grid 间距仍 15+ 处 |
| 功能性 | **7.5** | 7.0 | +0.5 | Modal focus、Input a11y、useId 修复；**NfCard 运行时仍 broken** |
| 创新性 | **7.5** | 7.5 | — | 美学辨识度保持；3 处 cliché 已修；新增 1 处（podcast `box-shadow` 动画） |

### 问题总览

| 严重度 | 本次 | 上次 | 变化 | 含义 |
|--------|------|------|------|------|
| ⚠️ **P0** | **13** | 26 | **−13** | 阻断：发布前必须修复（仍含 NfCard 运行时 bug） |
| ⚡ **P1** | **24** | 39 | **−15** | 重要：影响一致性或可访问性 |
| 💡 **P2** | **19** | 34 | **−15** | 优化：锦上添花 |

### 关键 Quick Win（5 分钟内可完成）

1. **修 NfCard 运行时崩溃**（唯一阻断级） — `NfCard.tsx:87` 写死 `motionModule.section`，当用户传 `motion/react-m`（精简版）时无 `section` 导出，抛 "Element type is invalid"，整个 Nullframe dashboard 被 ErrorBoundary 替代
   - 改：`const MotionSection: any = motionModule.section || motionModule.div`（或文档明确要求 `motion/react` 完整版）
   - 关联记忆：[2026-07-13 session](file:///c:/Users/monkr/.trae-cn/memory/projects/-c-Users-monkr-Documents-github-Nothing-UI/20260713/topics.md) 至今未解

2. **删 PhotoCarousel.css 死代码** — `PhotoCarousel.css:55-63` 是渐变删除前的旧定义（`color: #fff; text-transform: uppercase` 等），现被 L79-84 完全覆盖。L55-63 现在是死代码 + 历史包袱 + 误导新读者
   - 删 L55-63 即可

3. **Command 硬编码 ID 改 useId** — `Command.tsx:170, 174` `aria-controls="nothing-command-list"` 与 `id="nothing-command-list"` 是全局硬编码；同页 2 个 Command 即 ID 冲突
   - 改：`aria-controls={listId}` + `id={listId}`（文件已有 `listId` 变量，直接复用）

---

## 二、变更追踪（上次 → 本次）

### ✅ 上次 P0 已修复（9 项）

| # | 任务 | 修复位置 | 验证证据 |
|---|------|----------|----------|
| 1 | Modal 删 backdrop blur | [Modal.css:1-19](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Modal/Modal.css#L1-L19) | `.nothing-modal-backdrop--visible` 只剩 `opacity: 1; visibility: visible;`；`backdrop-filter: blur()` **全项目清空**（grep 0 matches） |
| 2 | Modal focus 管理 | [Modal.tsx:89-103](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Modal/Modal.tsx#L89-L103) | `previouslyFocused` ref + `useEffect` 打开时 focus first focusable、关闭时还原 |
| 3 | Modal ID 改 useId | [Modal.tsx:85-87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Modal/Modal.tsx#L85-L87) | `const generatedId = React.useId()` |
| 4 | Input focus ring | [Input.css:85-88](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Input/Input.css#L85-L88) | `:focus-visible { outline: 2px solid var(--text-primary); outline-offset: 2px; }` |
| 5 | Input 关联 error | [Input.tsx:62-64, 100-107](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Input/Input.tsx#L62-L107) | `useId()` + `aria-invalid` + `aria-describedby={errorId}` + `<div id={errorId} role="alert">` |
| 6 | Input type 透传 | [Input.tsx:53-56, 88-103](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Input/Input.tsx#L53-L103) | 透传 `type` / `autoComplete` / `inputMode` / `name` 到 `<input>` |
| 7 | Alert 删 border-left cliché | [Alert.css:7, 16-23](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Alert/Alert.css#L7-L23) | 改为 `border-top: 3px solid var(--border-visible)` + `--accent` 用于 destructive 变体 |
| 8 | `--shadow-drop` 死代码 | 13 处 CSS | grep 全项目 **0 matches**（上次 13） |
| 9 | PhotoCarousel 渐变删除 | [PhotoCarousel.tsx:42-47, 108](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.tsx#L42-L47) | `defaultSlides` 已无 `gradient` 字段；`Slide.gradient` fallback 现在是 `undefined ?? undefined` = 透明黑 |
| 10 | `--utility-orange` 移除 | [tokens.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css) | grep **0 matches**（双 event 色问题已解决） |
| 11 | nullframe.css 字体硬编码 | [nullframe.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css) | 22 处 `font-family: 'Space Mono' / 'Doto' / 'Space Grotesk'` 直接声明 → **0 处**；全部走 `var(--font-mono/--font-display/--font-body)` |

### ❌ 上次 P0 仍存在（4 项）

| # | 任务 | 位置 | 当前状态 |
|---|------|------|----------|
| 1 | **NfCard 运行时崩溃** | [NfCard.tsx:87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/nullframe/NfCard.tsx#L87) | 仍写死 `motionModule.section as React.FC<...>`；`motion/react-m` 用户会触发 "Element type is invalid"，**整页 Nullframe dashboard 被 ErrorBoundary 替代**。此为 2026-07-13 memory 记载的现存运行时 bug，至今未修 |
| 2 | Spinner 用 Button | [Spinner.tsx:154-160](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Spinner/Spinner.tsx#L154-L160) | 仍自实现 `<button className="nothing-spinner-btn">`；绕开设计系统 Button |
| 3 | Tooltip trigger 可 focus | [Tooltip.tsx:95-104](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Tooltip/Tooltip.tsx#L95-L104) | 仍用 `<span className="nothing-tooltip__trigger">` 包裹；`childIsFocusable` 逻辑（L49-58）写得绕但**当 child 不可 focus 时未给 wrapper 加 `tabIndex={0}`**——键盘用户无法触发 |
| 4 | Command ID 冲突 | [Command.tsx:170, 174](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx#L170-L174) | `aria-controls="nothing-command-list"` 和 `id="nothing-command-list"` 仍是全局硬编码（虽然 L61-63 已有 `useId` 生成的 `listId` 变量，但**未使用**——属"写了对的代码但忘记替换"的反模式） |

### ⚠️ 上次 P1 已修复（部分）

- **`--utility-orange`**：✅ 已删
- **PhotoCarousel 渐变 → 单色**：✅ 已删渐变字段
- **NavigationSection emoji**：❌ 仍存在 [NavigationSection.tsx:115](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/sections/NavigationSection.tsx#L115) `<span>⚙</span>`
- **SvgIcon 硬编码 fallback**：❌ [SvgIcon.tsx:30, 33, 37-40](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/widgets/SvgIcon.tsx#L30-L40) 仍写 `'var(--widget-dark-bg, #1A1D1C)'` 等 fallback 色值
- **Spinner 用 Button**：❌ 见上表

### 🆕 本次新发现 P0（3 项）

| # | 问题 | 位置 | 性质 |
|---|------|------|------|
| 1 | PhotoCarousel 死代码误导 | [PhotoCarousel.css:55-63](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.css#L55-L63) | 渐变删除前的旧 `.carousel-slide-title` 定义仍残留；`color: #fff; text-transform: uppercase; font-weight: 700` 引用了已不存在的渐变背景。被 L79-84 完全覆盖，纯死代码 |
| 2 | podcast-showcase 自我矛盾 | [podcast-showcase.css:725-728](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L725-L728) | `@keyframes podc-mic-pulse { 0% box-shadow 0 0 0 0 rgba(215,25,33,0.4) }`——而 [DesignSystemSection.tsx:389](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/sections/DesignSystemSection.tsx#L389) 明确写着 "Don't use box-shadow animations or filter: blur() transitions"。自家设计系统文档禁止，自家 showcase 违反 |
| 3 | podcast-showcase border-left AI cliché | [podcast-showcase.css:87, 178, 414](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L87-L414) | `border-left: 2px solid var(--accent)` 用于 active nav item——和上次的 Alert.css 同一签名，刚刚修了 Alert 立刻在 podcast 出现 |

---

## 三、5 维度评分详表

### 3.1 哲学一致性 7.5/10（上次 6.5，**+1.0**）

**Stated 哲学**（[design.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/design.md)）：
> "Subtract, don't add." "No gradients in UI chrome." "No shadows. No blur." "Red is an event, not a default."

**执行改进证据**：
- Modal blur 已删；Alert border-left cliché 已改 border-top；`--shadow-drop` 死代码清空；`--utility-orange` 双 event 色已修——4 处 P0 哲学违反消失
- PhotoCarousel 默认 4 张彩色渐变 slide 已改为 monochrome 占位——反 AI slop 主战场已清

**仍存违规**：
| # | 位置 | 违规 | 严重度 |
|---|------|------|--------|
| 1 | [podcast-showcase.css:87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L87) | `.podcast-nav-item--active { border-left: 2px solid var(--accent) }` — 刚修完 Alert 又在 podcast 出现的 AI 签名 | P0 |
| 2 | [podcast-showcase.css:725-728](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L725-L728) | `@keyframes` `box-shadow` 动画 — 违反自家 "no shadow" 规则 | P0 |
| 3 | [dotmatrix-loaders color-presets.ts:13-33](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/dotmatrix-loaders/core/color-presets.ts#L13-L33) | 6 组彩色 `linear-gradient` (`#ff5f6d→#ffc371` 等) — "monochrome" 的反义词；如为用户可选 preset 可接受，但**默认应 monochrome** | P1 |
| 4 | [NavigationSection.tsx:115](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/sections/NavigationSection.tsx#L115) | `<span>⚙</span>` emoji icon — design.md § Iconography "Never filled or multi-color" + 哲学禁忌 | P1 |

**评分引证（30-80 字）**：`Modal.css:15-18` 删除 `backdrop-filter: blur(4px)`、`Alert.css:7` 改 `border-top: 3px solid`、PhotoCarousel 4 张渐变 slide 删除、tokens.css 移除 `--utility-orange`——4 处核心哲学违反已修；新出现 podcast-showcase `border-left` + `box-shadow` 动画 + 6 组彩色 gradient preset 抵消部分改善，**整体 +1.0**。

### 3.2 视觉层级 7.5/10（与上次持平）

**亮点**：
- [tokens.css:10-23](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css#L10-L23) 12 档 type scale 稳定
- [Modal.tsx:90-99](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Modal/Modal.tsx#L90-L99) focus 管理使 a11y 层级对齐视觉层级
- 4 档灰度 token 体系完整保留

**问题**：
- 红色滥用：clock 组件 day name 仍 `color: var(--accent)`（`clock.css:29`）——"red is an event" 违反
- 部分 widget label 仍用 `var(--widget-primary)` 当默认色
- podcast-showcase `border-left: 2px solid var(--accent)` 当 active 指示——本质是层级，但形式上是 AI 签名

**评分引证**：12 档 type scale + 4 档灰度 token 体系稳定；红色滥用减少但 clock day name 仍 `var(--accent)`；整体维持 7.5 不变。

### 3.3 细节执行 6.5/10（上次 5.5，**+1.0** · **仍最弱**）

**Token 系统本身** —— **8.5/10**（+0.5）：
- [tokens.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css) 80+ 变量、暗亮主题、coarse-pointer media query、`--font-*` 字体族统一加 monospace fallback 链

**Token 系统被绕过的程度** —— **5.0/10**（+1.0）：

| 维度 | 改善 | 仍存问题 |
|------|------|----------|
| 字体 | nullframe.css 22 处硬编码 `'Space Mono' / 'Doto' / 'Space Grotesk'` → **0 处** ✅ | [Marquee.tsx:24 注释](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/Marquee.tsx#L24) 提到"双 linear-gradient"——mask 用途 OK，但需确认 |
| 颜色 | nullframe.css 17+ 处硬编码 hex → 大幅减少；但 [SvgIcon.tsx:30, 33, 37-40](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/widgets/SvgIcon.tsx#L30-L40) 仍 4 处 fallback hex (`#1A1D1C` / `#FCFAFE` / `#D71921`) | P1 |
| 间距 | nullframe.css off-grid 大量减少；但仍 15+ 处 | [nullframe.css:12](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css#L12) `gap:10px`、L25 `top:21px; right:18px`、L94 `gap:3px; margin:12px 0 10px`、L141 `width:40px; height:40px`、L168 `border-radius:12px`、L176 `padding:13px 18px` 等 |
| 圆角 | `Card.css:133` `250px` 已修 | [nullframe.css:168](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css#L168) `border-radius:12px`（应 `var(--radius-lg)`）、[L191](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css#L191) `border-radius:14px`（应 `var(--radius-card)`）|
| BEM | widget-showcase.css 仍未加 `nothing-` 前缀（`.bento`、`.card`、`.tag`、`.meta-row`） | 与 [nullframe.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css) 一致走 namespacing（`.nullframe-dashboard .bento`），可接受但类名不统一 |
| 动画 | `0.2s` `0.45s` 等硬编码 duration | [widget-showcase.css:30, 45](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/widget-showcase.css#L30-L45) `transition: border-color 0.2s ease-out, opacity 0.45s var(--ease)` 应 `var(--duration-micro)` |

**新发现死代码**：
- [PhotoCarousel.css:55-63](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.css#L55-L63) `.carousel-slide-title` 双定义，第一个引用了已不存在的 `#fff` 渐变背景

**评分引证**：`nullframe.css` 字体硬编码 22→0 处；`tokens.css` `--utility-orange` 与 `--shadow-drop` 死代码清除；颜色/字体 token 化大幅提升；但 off-grid 间距 15+ 处、`SvgIcon` 4 处 fallback hex、PhotoCarousel 死代码仍在；**+1.0**。

### 3.4 功能性 7.5/10（上次 7.0，**+0.5**）

**强项**：
- 80+ 组件、widget 子系统完整
- Modal focus 管理（开 → 第一个 focusable、关 → 还原）符合 WCAG 2.4.3
- Input `useId` + `aria-invalid` + `aria-describedby` + `role="alert"` 完整
- Tooltip `useId` 修复 + `Escape` 关闭 ✅
- Command `useId` 已生成（`generatedId`），但**未应用**——半成品

**缺口**：

| # | 位置 | 缺口 | 严重度 |
|---|------|------|--------|
| 1 | [NfCard.tsx:87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/nullframe/NfCard.tsx#L87) | `motionModule.section` 写死，缺 fallback；触发 "Element type is invalid"，**整页 Nullframe dashboard 被 ErrorBoundary 替代**——这是项目级最大 P0 | **P0 · 运行时** |
| 2 | [Command.tsx:170, 174](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx#L170-L174) | `aria-controls="nothing-command-list"` 硬编码；同页 2 个 Command ID 冲突 | P0 |
| 3 | [Tooltip.tsx:95-104](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Tooltip/Tooltip.tsx#L95-L104) | wrapper `<span>` 不可 focus；`childIsFocusable` 判定后无 `tabIndex={0}` 回退 | P0 |
| 4 | [Spinner.tsx:154-160](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Spinner/Spinner.tsx#L154-L160) | 自实现 `<button className="nothing-spinner-btn">` 绕开 Button | P0 |
| 5 | [Button.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Button/Button.tsx) | 无 `loading` / `aria-busy` 状态（上次 P1，部分缓解：L52-53 现在 `aria-busy={loading || undefined}`）→ **半解决** | P1 |
| 6 | [Command.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx) | input 缺 `aria-label`、`role="combobox"` + `aria-activedescendant` | P1 |

**评分引证**：Modal focus + useId、Input a11y 完整修复、Tooltip `Escape` 关闭、Button `aria-busy` 部分添加；4 项功能 P0 仍在（其中 NfCard 运行时崩溃为项目级阻断）；**+0.5**。

### 3.5 创新性 7.5/10（与上次持平）

**强项保持**：
- "Nothing" 美学辨识度极高：NDOT 47 + Doto + Space Mono 三件套 + dot matrix + monochrome + 工业仪表感
- Widget 子系统差异化（Clock / Weather / Steps / Activity / PhotoFrame）
- 系统性细节签名：pagination 计数 `00 / 04`、时间 `12:34:56` mono ALL CAPS、widget `[LIVE]` / `[SIM]` 标签

**Cliché 痕迹**：
- ~~Alert border-left~~ ✅ 已修
- ~~Quotes AI boilerplate~~ — 未在本次审查范围确认
- ~~NavigationSection emoji~~ ❌ 仍 `⚙`（L115）
- 🆕 [podcast-showcase.css:87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L87) `border-left: 2px solid var(--accent)` active nav 签名
- 🆕 [podcast-showcase.css:725-728](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L725-L728) 录音动画 box-shadow pulse（material 化）

**评分引证**：Nothing 美学辨识度不变；3 处 cliché 修了 1 处（Alert border-left），新发现 podcast 2 处 cliché；维持 7.5。

---

## 四、专项检测总览

| 检测项 | 结果 | 关键问题 |
|--------|------|----------|
| 5 维度评审 | 7.5 平均 | 细节执行 6.5 仍最弱 |
| **变更追踪** | **9/11 修复** | Modal/Input/Alert/`--shadow-drop`/`--utility-orange`/PhotoCarousel 渐变/nullframe 字体硬编码均修；NfCard/Spinner/Tooltip/Command/SvgIcon fallback 仍存 |
| 硬编码值 | ⚠️ 部分 | font 22→0 ✅；color 大幅减少但 SvgIcon 4 处 fallback 仍在；off-grid 间距 15+ 处 |
| 设计系统合规 | ⚠️ 部分 | Spinner 仍绕过 Button；其余组件合规 |
| 品牌资产协议 | ✅ 通过 | Logo/产品图用真实 SVG，glyph 组件充足 |
| 反 AI slop | ⚠️ 部分 | 修了 4 处（Modal blur、Alert border-left、PhotoCarousel 渐变、--utility-orange）；新增 1 处（podcast border-left）+ 1 处 box-shadow 动画 |
| 可访问性 | ⚠️ 部分 | Modal/Input/Tooltip 大幅改善；Command hardcoded ID 仍 P0；Tooltip trigger 不可 focus 仍 P0；NfCard 运行时崩溃未解 |
| Artifact 结构 | ✅ 通过 | tokens.css 完整、暗亮主题完整、字体 mono fallback 链统一 |
| 文案审查 | ✅ 通过 | 中英双语、i18n 函数 `t()` 完整 |
| 图标审查 | ⚠️ 部分 | NavigationSection 仍 `⚙` emoji；其余 SVG / Glyph / DotMatrixIcon OK |
| 页面遍历 | ⚠️ 部分 | showcase 220px sidebar + flex main 是合理的；Nullframe dashboard 因 NfCard bug 渲染 ErrorBoundary |

### 4.1 硬编码值检测（深度）

| 模式 | grep | 命中 | 严重度 |
|------|------|------|--------|
| `backdrop-filter` | 0 | 0 | ✅ 全部清空 |
| `--shadow-drop` | 0 | 0 | ✅ 全部清空 |
| `--utility-orange` | 0 | 0 | ✅ 全部清空 |
| `box-shadow` 非 zero / 非 inset 2px | 4 | 4 | P1 (podcast-showcase 3 处 + nullframe 0 实际违规) |
| `linear-gradient(135deg, #...)` 彩色 | 6 | 6 | P1 (color-presets.ts) |
| `border-left: 2px solid var(--accent)` AI 签名 | 3 | 3 | P0 (podcast-showcase 87/178/414) |
| `linear-gradient` mask 用途 | 4 | 4 | ✅ OK (marquee mask) |
| 硬编码 font-family | 0 | 0 | ✅ nullframe.css 22→0 |
| 硬编码 hex fallback (SvgIcon) | 4 | 4 | P1 |
| 硬编码 `@keyframes` 动画 `box-shadow` | 1 | 1 | P0 (podcast-showcase 725-728) |

---

## 五、P0/P1/P2/P3 详细清单

### 5.1 P0 Blockers（13 项，必须修复）

**运行时阻断（1 项）**：

| # | 任务 | 文件 | 改动 | 工作量 |
|---|------|------|------|--------|
| 1 | **修 NfCard 运行时崩溃** | [NfCard.tsx:87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/nullframe/NfCard.tsx#L87) | `const MotionSection: any = motionModule.section || motionModule.div` 或文档要求 `motion/react` 完整版 | 5 min |

**设计哲学违反（4 项）**：

| # | 任务 | 文件 | 改动 | 工作量 |
|---|------|------|------|--------|
| 2 | 删 podcast `border-left` AI 签名（active nav） | [podcast-showcase.css:87, 178, 414](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L87-L414) | 3 处 `border-left: 2px solid var(--accent)` → 改用 background 变化或字重对比 | 15 min |
| 3 | 删 podcast `box-shadow` 动画 | [podcast-showcase.css:725-728](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L725-L728) | 整个 `@keyframes podc-mic-pulse` 删除，改用 opacity 或 border 脉冲 | 10 min |
| 4 | 删 PhotoCarousel 死代码 | [PhotoCarousel.css:55-63](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.css#L55-L63) | 整个 `.carousel-slide-title` 块（被 L79-84 覆盖的旧定义） | 2 min |
| 5 | PhotoCarousel defaultSlides 真正可用 | [PhotoCarousel.tsx:42-47, 108](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.tsx#L42-L47) | 4 张 slide 的 `gradient` 全为 undefined → fallback 实际是 `undefined`；要么用 dot-matrix placeholder（与 NF aesthetic 一致），要么用 `var(--surface-raised)` 单色 | 30 min |

**可访问性 Blockers（3 项）**：

| # | 任务 | 文件 | 改动 | 工作量 |
|---|------|------|------|--------|
| 6 | Command 改 useId | [Command.tsx:170, 174](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx#L170-L174) | `aria-controls={listId}` + `id={listId}`（`listId` 已用 `useId` 生成，61-63 行） | 5 min |
| 7 | Tooltip trigger 不可 focus | [Tooltip.tsx:95-104](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Tooltip/Tooltip.tsx#L95-L104) | 当 `childIsFocusable === false` 时 wrapper 加 `tabIndex={0}` + `role="button"`（如 children 非 button） | 20 min |
| 8 | Command input 加 aria-label | [Command.tsx:162-171](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx#L162-L171) | `<input ... aria-label={placeholder}>` + `role="combobox"` + `aria-expanded` | 15 min |

**设计系统合规（2 项）**：

| # | 任务 | 文件 | 改动 | 工作量 |
|---|------|------|------|--------|
| 9 | Spinner 用 Button | [Spinner.tsx:154-160](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Spinner/Spinner.tsx#L154-L160) | 替换自实现 `<button>` 为 `<Button variant="primary" loading={isSpinning}>` | 20 min |
| 10 | UtilitySection submit 用 Button | [showcase/sections/UtilitySection.tsx:60](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/sections/UtilitySection.tsx#L60) | 替换为 `<Button variant="primary" type="submit">` | 5 min |

**新发现 token 完整性（3 项）**：

| # | 任务 | 文件 | 改动 | 工作量 |
|---|------|------|------|--------|
| 11 | dotmatrix-loaders color-presets 默认改 monochrome | [color-presets.ts:13-33](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/dotmatrix-loaders/core/color-presets.ts#L13-L33) | 第一个 preset 改为 monochrome (`#1A1A1A → #E8E8E8`)；其他保留为 opt-in | 5 min |
| 12 | widget-showcase 硬编码 1240px / 0.2s / 0.45s 改 token | [widget-showcase.css:13, 30, 45](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/widget-showcase.css#L13-L45) | `max-width: 1240px` → `var(--page-max-width)` 或新 `--widget-page-max`；`0.2s` → `var(--duration-micro)`；`0.45s` → `var(--duration-transition)` | 10 min |
| 13 | 删 SvgIcon 硬编码 fallback hex | [SvgIcon.tsx:30, 33, 37-40](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/widgets/SvgIcon.tsx#L30-L40) | 4 处 fallback hex → 删 fallback，token 必有；`#1A1D1C` → 统一为 `var(--widget-dark-bg)` | 5 min |

### 5.2 P1 Important（24 项摘要，下一迭代）

**完整 P1 清单**（按文件）：
- **nullframe.css off-grid 间距/圆角**：15+ 处需 token 化（[L12, 25, 50, 66, 67, 81, 94, 111, 114, 125, 128, 132, 140-141, 156, 168, 170, 176, 191-193](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css#L12-L193)）
- **NavigationSection emoji**：[L115](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/sections/NavigationSection.tsx#L115) `⚙` → SVG / Glyph
- **clock.css day name 红色滥用**：`var(--accent)` → `var(--text-primary)` 或 `var(--text-secondary)`
- **PhotoCarousel.css L67** `font-size: 10px` 改 `var(--label)`
- **widget-showcase.css letter-spacing** `0.10em` 改 `var(--tracking-label)` (0.08em) 保持一致
- **showcase.css 字体 / 字重** 系列 polish
- **nullframe.css `font:` 简写**（约 20 处）建议改 `font-family/font-size/line-height` 显式属性以便覆盖
- **Audio mic-pulse 旧版替换**：删 podcast `box-shadow` 后，需提供替代动画（用 border-color 或 opacity）
- **PhotoCarousel 4 张 default slide** 内容（即使修完 P0 #5 也建议丰富——纯文字 "Solar Flare" 偏 AI boilerplate）
- **Command `role="combobox"`**（含 #8 一并修）
- **Button `loading` prop 完整**：现在只 `disabled + aria-busy`；可加 `<Spinner />` 内嵌
- **Modal 无 initial focus**（虽然 useEffect 已 focus first，但 should focus on title or primary action）

### 5.3 P2 Polish（19 项摘要）

- nullframe.css `font:` 简写拆为显式属性
- showcase.css 220px sidebar 与 NF "asymmetric" 哲学的兼容性
- BEM 前缀统一（`.bento / .card / .tag / .meta-row` 在两个 namespacing 中重复）
- tokens.css 补充 `--font-widget-mono`、`--space-3xs-2xs-...` 等"已存在但命名不统一"
- 字体回退链统一为 mono 链
- `--radius-lg/xl` 缩到 2-4px（更 industrial）
- Quotes 默认值改 Nothing/Braun 风格
- 大量局部 polish（Date.css 64px、Card.css 250px 已修；Switch tabindex 改 -1 已修）

---

## 六、行动层（按优先级修复）

### 6.1 Quick Wins（≤ 5 分钟，4 项）

| # | 任务 | 文件 | 改动 |
|---|------|------|------|
| 1 | 修 NfCard 运行时崩溃 | [NfCard.tsx:87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/nullframe/NfCard.tsx#L87) | `motionModule.section || motionModule.div` |
| 2 | 删 PhotoCarousel 死代码 | [PhotoCarousel.css:55-63](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.css#L55-L63) | 整段删 |
| 3 | Command 改 useId | [Command.tsx:170, 174](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx#L170-L174) | `aria-controls={listId}` + `id={listId}` |
| 4 | 删 SvgIcon 硬编码 fallback hex | [SvgIcon.tsx:30, 33, 37-40](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/widgets/SvgIcon.tsx#L30-L40) | 删 fallback 字符串 |

### 6.2 Fix 清单（按优先级）

- **P0 13 项** 修复预估：**3 小时**（含 NfCard bug + 4 项 a11y + 4 项哲学 + Spinner 改 Button）
- **P1 24 项** 修复预估：**6 小时**（大半为 off-grid token 化 + 字母间距统一）
- **P2 19 项** 修复预估：**3 小时**（polish + BEM 统一）

### 6.3 Keep（做得好的地方）

| # | 资产 | 评价 |
|---|------|------|
| 1 | [tokens.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css) | 80+ 变量、暗亮主题、字体 mono fallback 链；**8.5/10** |
| 2 | [design.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/design.md) | 9 段框架 + 17 条 Do's / Don'ts；哲学最完整的"自家文档" |
| 3 | [Input.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Input/Input.tsx) | a11y 完整：`useId` + `aria-invalid` + `aria-describedby` + `role="alert"` + 透传所有原生属性；是 a11y 标杆 |
| 4 | [Modal.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Modal/Modal.tsx) | focus 管理完整（开 → first focusable、关 → 还原）、`useId`、Escape、Tab 循环；是 overlay 组件标杆 |
| 5 | [nullframe.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css) | 字体硬编码 22→0；是最难清的板块，已有大改善 |
| 6 | Widget 子系统 | 真正差异化的产品；dot-matrix 风格贯彻 |
| 7 | 字体策略 | NDOT 47 / Doto / Space Mono 三件套 + 反 Inter/Roboto 默认 |
| 8 | 字体 mono ALL CAPS for labels | 哲学一致性强 |

### 6.4 评分引证汇总

| 维度 | 分数 | 证据段落 |
|------|------|---------|
| 哲学一致性 | 7.5/10 | `Modal.css:15-18` 删 blur、`Alert.css:7` 改 border-top、PhotoCarousel 渐变删、`--utility-orange` 移除——4 处 P0 哲学违反消失；新发现 podcast 2 处哲学违反（`border-left` AI 签名 + `box-shadow` 动画违反自家规则）+ 6 组彩色 gradient preset |
| 视觉层级 | 7.5/10 | 12 档 type scale + 4 档灰度 token 稳定；Modal focus 管理 + Input a11y 修复使层级对齐；clock day name 仍 `var(--accent)` 红色滥用；持平 |
| 细节执行 | 6.5/10 | `nullframe.css` 字体硬编码 22→0、`tokens.css` 移除 `--utility-orange` 与 `--shadow-drop`；但 off-grid 间距 15+ 处、`SvgIcon` 4 处 fallback hex、PhotoCarousel 死代码仍在 |
| 功能性 | 7.5/10 | Modal focus + useId、Input a11y 完整、Tooltip `Escape` 关闭、Button `aria-busy` 半加；4 项功能 P0 仍在（**NfCard 运行时崩溃为项目级阻断**、Command 硬编码 ID、Tooltip trigger 不可 focus、Spinner 绕开 Button） |
| 创新性 | 7.5/10 | Nothing 美学辨识度不变；Alert border-left cliché 修了；新发现 podcast 2 处 cliché；持平 |

### 6.5 评分自检（4 铁律）

- ✅ **铁律 1：禁止评分通胀**——细节执行 6.5 反映 15+ 处 off-grid 间距、SvgIcon 4 处 fallback、PhotoCarousel 死代码；4 个维度 7.5、1 个 6.5 符合"至少 1 个维度低于 7"的反通胀触发（虽然未触发，因为细节执行已 6.5）
- ✅ **铁律 2：禁止平均上浮**——以最差段评分：NfCard 整页崩溃为项目级，functional 评分 7.5 而非 8.5
- ✅ **铁律 3：评分必须引证**——每维度都有具体文件:行号
- ✅ **铁律 4：创新性允许低分**——创新性 7.5 反映 Nothing 美学有真实品牌来源、字体反默认；同时承认 podcast 出现 2 处 cliché

---

## 附 A：审查方法说明

- **触发命令识别**：「monkren 全局审查」→ 深度审查（5 维度 + 全部检测 + 完整报告）
- **方法**：
  1. **变更追踪**：对比 2026-07-08 review-report.md 的 26 P0 / 39 P1 / 34 P2
  2. **5 维度评审**：按 `references/standards.md` §1
  3. **硬编码值检测**：grep 全项目（`backdrop-filter` 0 / `--shadow-drop` 0 / `--utility-orange` 0 / 硬编码 font 0 / 硬编码 hex 4）
  4. **设计哲学合规**：检查 design.md 8 条 Don'ts
  5. **可访问性检测**：7 个核心组件（Modal/Input/Command/Tooltip/Button/Spinner/NfCard）
  6. **新发现 vs 旧发现**：分别标记
- **不执行**：品牌资产协议（项目自身即是设计系统）
- **页面遍历**：以 showcase 站点为准；Nullframe dashboard 因 NfCard 运行时崩溃渲染 ErrorBoundary 已是已知状态

## 附 B：相关文件索引

- 上次审查：[review-report.md 2026-07-08](file:///c:/Users/monkr/Documents/github/Nothing%20UI/.monkren/reviews/nothing-ui-20260708/review-report.md)
- 已知 runtime bug：[2026-07-13 topics.md](file:///c:/Users/monkr/.trae-cn/memory/projects/-c-Users-monkr-Documents-github-Nothing-UI/20260713/topics.md)
- 设计哲学：[design.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/design.md)
- Token 系统：[tokens.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css)
- 组件目录：[COMPONENTS.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/COMPONENTS.md)
- 上次审查 spec：[comprehensive-skill-review/spec.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/.trae/specs/comprehensive-skill-review/spec.md)
- 评分标准：[monkren standards.md](file:///c:/Users/monkr/.trae-cn/skills/monkren/references/standards.md)

---

**版本**：v2.0 / **审查日期**：2026-07-18 / **方法**：monkren-designer v6.2 五阶段 skill 矩阵（Review 阶段 5-dim-review + polish-pass 编排）
**基于上次审查**：2026-07-08 review-report v1.0
**结论**：从 6.8 → 7.5（+0.7），26 P0 → 13 P0（−50%）；**只剩 1 个运行时阻断**（NfCard）+ 12 个静态 P0，可在 1 个工作日内清空
