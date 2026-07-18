# Nothing-UI P0 修复计划 v1

> 上游：[review-report.md 2026-07-18](file:///c:/Users/monkr/Documents/github/Nothing%20UI/.monkren/reviews/nothing-ui-20260718/review-report.md)
> 范围：12 个 P0 类别（13 个文件编辑点）
> 方法：按"运行时 → a11y → 哲学 → Token"4 阶段，每阶段 5 分钟/项
> 预计总工时：**3.0 小时**（含 1 项运行时验证）
> **不修改本计划文件**——本计划是路线图；按阶段输出 patch 需进入 05 设计改进阶段

---

## 〇、关于计数

上次审查列出 13 个 P0 **文件编辑点**。本计划按"逻辑类别"聚合为 **12 项**（仅 1 项涉及 2 文件 = #9 Button 替换）。每个类别下细分到文件级 diff。

| # | 类别 | 涉及文件 | 哲学/a11y/合规 | 工作量 |
|---|------|----------|----------------|--------|
| 1 | NfCard 运行时崩溃 | 1 | **运行时阻断** | 5 min |
| 2 | podcast border-left AI 签名 | 1 | 哲学 | 15 min |
| 3 | podcast box-shadow 动画 | 1 | 哲学 | 10 min |
| 4 | PhotoCarousel 死代码 | 1 | 哲学 | 2 min |
| 5 | PhotoCarousel defaultSlides fallback | 1 | 哲学 + 视觉 | 30 min |
| 6 | Command useId | 1 | **a11y** | 5 min |
| 7 | Tooltip trigger focus | 1 | **a11y** | 20 min |
| 8 | Command aria-label + role | 1 | **a11y** | 15 min |
| 9 | 改用 Button（Spinner + UtilitySection） | 2 | 设计系统合规 | 25 min |
| 10 | dotmatrix-loaders 默认 monochrome | 1 | 哲学 + Token | 5 min |
| 11 | widget-showcase 硬编码 token 化 | 1 | Token | 10 min |
| 12 | SvgIcon fallback hex 清除 | 1 | Token | 5 min |
| | | **13 文件** | | **~3.0 h** |

---

## 一、阶段路线（按依赖排序）

```
Phase 0 ─ NfCard 运行时        ← 必须最先，整页 ErrorBoundary
   │
   ▼
Phase 1 ─ Quick Win (4 类)     ← 5 分钟内 4 项
   │    #4 PhotoCarousel 死代码
   │    #6 Command useId
   │    #12 SvgIcon fallback hex
   │    #10 dotmatrix-loaders 默认
   ▼
Phase 2 ─ a11y Blocker (3 类)  ← 必须在展示前
   │    #7 Tooltip trigger focus
   │    #8 Command aria-label + role
   │    (Phase 0 + 1 已含 #6)
   ▼
Phase 3 ─ 设计哲学 (3 类)      ← 视觉/哲学一致性
   │    #2 podcast border-left
   │    #3 podcast box-shadow 动画
   │    #5 PhotoCarousel defaultSlides
   ▼
Phase 4 ─ 设计系统 + Token (2 类)
        #9 改用 Button
        #11 widget-showcase 硬编码
```

---

## 二、Phase 0：NfCard 运行时崩溃（**先做**）

### P0-1 · NfCard.tsx:87 缺 fallback

**根因**：`useMotionComponent()` 返回的 `motionModule` 在 `motion/react-m`（精简版）中**没有 `section` 导出**。`as React.FC<...>` 类型断言骗过 TS，但运行时 `motionModule.section === undefined` → JSX `<undefined>` → React 抛 "Element type is invalid" → 整页 Nullframe dashboard 被 ErrorBoundary 替代。

**当前代码**（[NfCard.tsx:87](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/nullframe/NfCard.tsx#L87)）：

```tsx
const MotionSection = motionModule.section as React.FC<Record<string, unknown>>
```

**修复方案**（2 选 1）：

**方案 A（推荐，防御式）**：

```tsx
const MotionSection = (motionModule.section ??
  motionModule.div ??
  motionModule.article ??
  ((props: React.HTMLAttributes<HTMLElement>) => <section {...props} />)) as React.FC<Record<string, unknown>>
```

**方案 B（文档化）**：保留 `motionModule.section`，但 [MotionProvider](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/MotionProvider/index.tsx) JSDoc 注释明确要求 `motion/react`（非 `motion-m`）；并给 `package.json` 加 `peerDependencies` 警告。

**推荐 A**，因为它对库的最终用户更友好（不强制依赖完整版 motion）。

**验证**：
- 启动 dev server（`pnpm dev`）
- 访问 `/nullframe` 路由（如有）；或在 showcase 主页
- 浏览器控制台**不应再有 "Element type is invalid"**
- Nullframe dashboard 6 个 widget（Clock/Weather/Steps/Activity/PhotoFrame/MusicPlayer）**应正常渲染**
- 单元测试：`pnpm test`（如配置）应不挂

**风险**：
- 极低。`motionModule.section` 在 `motion/react` 完整版中必有；fallback 到 `div` 不影响功能
- 可能影响 NfCard 的 `data-*` 属性位置（section → div 不影响，但若 CSS selector 依赖 element type 需注意 → NfCard CSS 用 `.card / .meta-row` 等类名，无 element type selector，无影响）

**工作量**：5 min

---

## 三、Phase 1：Quick Win（4 项 ≤ 5 分钟）

### P0-4 · PhotoCarousel.css:55-63 死代码

**根因**：上次审查把 4 张默认 slide 的 `linear-gradient` 删除时，JS 的 `defaultSlides` 已清空（[PhotoCarousel.tsx:42-47](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.tsx#L42-L47)），但 CSS 里的旧定义未删。**两处 `.carousel-slide-title` 块**——前者 `color: #fff; font-family: var(--font-display); font-weight: 700`（L55-63），后者 `color: var(--text-primary); font-family: var(--font-body)`（L79-84）——后者完全覆盖前者，前者 100% 死代码。

**当前代码**（[PhotoCarousel.css:55-63](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.css#L55-L63)）：

```css
.carousel-slide-title {
  font-family: var(--font-display);
  font-size: var(--heading, 24px);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #fff;                  /* ← 引用已不存在的渐变背景 */
  text-transform: uppercase;
  transition: color var(--duration-transition) var(--easing);
}
```

**修复方案**：

```diff
- .carousel-slide-title {
-   font-family: var(--font-display);
-   font-size: var(--heading, 24px);
-   font-weight: 700;
-   letter-spacing: -0.01em;
-   color: #fff;
-   text-transform: uppercase;
-   transition: color var(--duration-transition) var(--easing);
- }
-
  .carousel-slide-subtitle {
    ...
```

**验证**：
- grep `color: #fff` 在 PhotoCarousel.css 应为 0 matches
- 浏览器 DevTools 检查 `.carousel-slide-title` computed style 仍为 `var(--text-primary)`（来自 L79-84 块）
- 不应有视觉变化

**风险**：零。纯死代码删除。

**工作量**：2 min

### P0-6 · Command.tsx:170, 174 硬编码 ID

**根因**：`useId` 已生成 `listId`（L63）但**未被使用**。`<input aria-controls="nothing-command-list">` + `<div id="nothing-command-list">` 仍是全局硬编码——同页 2 个 Command 即 ID 冲突，导致 `aria-controls` 指向错误列表。

**当前代码**（[Command.tsx:170, 174](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx#L170-L174)）：

```tsx
aria-controls="nothing-command-list"     // L170
...
id="nothing-command-list"               // L174
```

**修复方案**：

```diff
- aria-controls="nothing-command-list"
+ aria-controls={listId}
```

```diff
- id="nothing-command-list"
+ id={listId}
```

**验证**：
- 浏览器 DevTools 检查同页 2 个 Command 的 `aria-controls` 各自唯一
- 单元测试或手动：第一个 Command 用 Tab 导航后 ↓↑ 选中项，第二个 Command 同样可用且不互相干扰
- 屏幕阅读器（NVDA / VoiceOver）应正确读取 listbox 关联

**风险**：低。`listId` 已是 `useId()` 输出，自带 `:` 转义，HTML ID 合法。

**工作量**：5 min

### P0-12 · SvgIcon.tsx:30, 33, 37-40 fallback hex

**根因**：fallback 字符串是**双轨制**失败的安全网——当 CSS 变量未定义时回退到 hex。但项目强制 [tokens.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css) 是**完整**的：`--widget-dark-bg` / `--widget-card-bg` / `--widget-primary` / `--widget-error` / `--widget-white` 全部存在（grep 验证）。fallback 永远不触发，反而**误导读者**以为这些 token 可能缺失。

**当前代码**（[SvgIcon.tsx:29-41](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/widgets/SvgIcon.tsx#L29-L41)）：

```ts
const themeBgTokens: Record<SvgIconTheme, string> = {
  dark: 'var(--widget-dark-bg, #1A1D1C)',
  light: 'var(--widget-card-bg, #FCFAFE)',
  accent: 'var(--widget-primary, #D71921)',
  error: 'var(--widget-error, #D71921)',
}

const themeIconTokens: Record<SvgIconTheme, string> = {
  dark: 'var(--widget-white, #FCFAFE)',
  light: 'var(--widget-dark-bg, #1A1D1C)',
  accent: 'var(--widget-white, #FCFAFE)',
  error: 'var(--widget-white, #FCFAFE)',
}
```

**修复方案**：

```diff
  const themeBgTokens: Record<SvgIconTheme, string> = {
-   dark: 'var(--widget-dark-bg, #1A1D1C)',
-   light: 'var(--widget-card-bg, #FCFAFE)',
-   accent: 'var(--widget-primary, #D71921)',
-   error: 'var(--widget-error, #D71921)',
+   dark: 'var(--widget-dark-bg)',
+   light: 'var(--widget-card-bg)',
+   accent: 'var(--widget-primary)',
+   error: 'var(--widget-error)',
  }

  const themeIconTokens: Record<SvgIconTheme, string> = {
-   dark: 'var(--widget-white, #FCFAFE)',
-   light: 'var(--widget-dark-bg, #1A1D1C)',
-   accent: 'var(--widget-white, #FCFAFE)',
-   error: 'var(--widget-white, #FCFAFE)',
+   dark: 'var(--widget-white)',
+   light: 'var(--widget-dark-bg)',
+   accent: 'var(--widget-white)',
+   error: 'var(--widget-white)',
  }
```

**验证**：
- `grep -E "#[0-9A-Fa-f]{3,6}" SvgIcon.tsx` 应 0 matches
- 浏览器 DevTools：`<svg>` 元素 `fill` / `stroke` 仍为正确颜色（来自 CSS 变量）

**风险**：极低。如担心外部使用方无 tokens.css（场景少见），可保留但加注释说明 "Require tokens.css to be loaded"。

**工作量**：5 min

### P0-10 · dotmatrix-loaders 默认 monochrome

**根因**：[color-presets.ts:3-36](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/dotmatrix-loaders/core/color-presets.ts#L3-L36) 8 个 preset，第 1 个 `solid-theme` 已 monochrome（`var(--color-dot-on)`），但其余 7 个全是彩色渐变。用户**不指定 preset** 时（[L40-46 fallback](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/dotmatrix-loaders/core/color-presets.ts#L40-L46)）直接走 `color` prop——OK。但若 showcase 演示、文档示例**默认选了彩色 preset**（如 `grad-sunset`），会与"monochrome first"哲学冲突。

**当前代码**（[color-presets.ts:3-36](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/dotmatrix-loaders/core/color-presets.ts#L3-L36)）：

```ts
export const DOT_MATRIX_COLOR_PRESETS = {
  "solid-theme":  { fill: "var(--color-dot-on)", glow: "var(--color-dot-on)" },
  "solid-mint":   { fill: "#34d399",             glow: "#34d399" },
  "grad-sunset":  { fill: "linear-gradient(135deg, #ff5f6d 0%, #ffc371 52%, #ffe29a 100%)", glow: "#ff8b73" },
  // ... 5 more 彩色
} as const;
```

**修复方案**（**不删彩色，只改"默认"行为**——保留 7 个彩色 preset 作为 opt-in）：

不改 presets 本身。改 **resolveDmxColorTokens** 默认值，让未指定 preset 时**强制 monochrome**：

```diff
  export function resolveDmxColorTokens(color: string, colorPreset?: DotMatrixColorPreset): {
    resolvedColor: string;
    dotFill: string;
  } {
    if (!colorPreset) {
-     return { resolvedColor: color, dotFill: color };
+     // 默认走 monochrome theme，调用方需显式指定 preset 才能用彩色
+     return { resolvedColor: "var(--color-dot-on)", dotFill: "var(--color-dot-on)" };
    }
    ...
```

**更优解（推荐）**：在每个 dot-matrix-loader 组件的 props default 加 `"solid-theme"`：

```diff
- colorPreset?: DotMatrixColorPreset  // 不传 = 默认走 color
+ colorPreset?: DotMatrixColorPreset = "solid-theme"  // 默认 monochrome，opt-in 彩色
```

**验证**：
- showcase 中 DotMatrixLoader 默认渲染应**全是 monochrome**（无彩虹/夕阳/海洋）
- 在 [DotMatrixLoaderSection.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/sections/DotMatrixLoaderSection.tsx) 找 `colorPreset="grad-sunset"` 演示仍在（opt-in 保留）

**风险**：低。Opt-in 保留所有彩色 preset；只是让 monochrome 真正成为默认。

**工作量**：5 min

---

## 四、Phase 2：a11y Blocker（3 项）

### P0-7 · Tooltip.tsx:95-104 wrapper span 不可 focus

**根因**：当前 wrapper 是 `<span>`（HTML inline 元素，不可 focus）。`childIsFocusable` 逻辑（L49-58）写得绕且**有 bug**——实际意图是"若 child 已 focusable（button/a/input）则不重复包装，若 child 不可 focus（如 `<span>`、`<div>`）则给 wrapper 加 `tabIndex={0}` 让 keyboard 用户能 focus"，但当前实现：

- `aria-describedby` 加在 wrapper `<span>` 上而非 child（违反 a11y 最佳实践——读屏会把"tooltip 内容"念到 wrapper 上）
- `childIsFocusable` 逻辑错位（`FOCUSABLE_TAGS.has(... displayName) === false` 的反向判断混乱）
- 即使判定为不可 focus，wrapper 仍无 `tabIndex`

**当前代码**（[Tooltip.tsx:49-58, 95-106](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Tooltip/Tooltip.tsx#L49-L106)）：

```tsx
const FOCUSABLE_TAGS = new Set(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'])
const childIsFocusable =
  React.isValidElement(children) &&
  FOCUSABLE_TAGS.has((children.type as { displayName?: string; name?: string })?.displayName ||
    (children.type as { displayName?: string; name?: string })?.name ||
    '') === false
    ? false
    : React.isValidElement(children) &&
      (FOCUSABLE_TAGS.has((children.type as unknown) as never) ||
        (children.props as { tabIndex?: number })?.tabIndex !== undefined)
```

```tsx
<span
  className="nothing-tooltip__trigger"
  ref={triggerRef}
  onMouseEnter={show}
  onMouseLeave={hide}
  onFocus={show}
  onBlur={hide}
  onKeyDown={handleKeyDown}
  aria-describedby={visible ? tooltipId : undefined}
>
  {children}
</span>
```

**修复方案**（**核心思路**：用 `React.cloneElement` 把 `aria-describedby` 透传到 child，把 wrapper 改为只在 child 不可 focus 时存在的可 focus 元素）：

```tsx
const FOCUSABLE_TAGS = new Set(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'])
const childIsFocusable = React.isValidElement(children) && (
  FOCUSABLE_TAGS.has(((children.type as unknown) as { displayName?: string; name?: string })
    ?.displayName || ((children.type as unknown) as { displayName?: string; name?: string })?.name || '') ||
  (children.props as { tabIndex?: number })?.tabIndex !== undefined
)

// 把 a11y 透传到 child
const accessibleChild = React.isValidElement(children)
  ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      'aria-describedby': visible ? tooltipId : (children.props as Record<string, unknown>)?.['aria-describedby'],
    })
  : children

const trigger = (
  <span
    ref={triggerRef}
    onMouseEnter={show}
    onMouseLeave={hide}
    onFocus={show}
    onBlur={hide}
    onKeyDown={handleKeyDown}
    className="nothing-tooltip__trigger"
    // 仅当 child 不可 focus 时，wrapper 需承担 focus 责任
    {...(childIsFocusable ? {} : { tabIndex: 0, role: 'button' })}
  >
    {accessibleChild}
  </span>
)
```

**CSS 配合**（[Tooltip.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Tooltip/Tooltip.css) 增加 focus 状态）：

```css
.nothing-tooltip__trigger:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}
```

**验证**：
- `<Tooltip content="hi"><span>text</span></Tooltip>` → Tab 可 focus `<span>`，读屏念 "hi"
- `<Tooltip content="hi"><button>btn</button></Tooltip>` → Tab focus `<button>`，读屏念 "hi"，**wrapper 无 tabIndex 不重复 focus**
- 浏览器 DevTools：`childIsFocusable === false` 时 `<span>` 有 `tabindex="0"`，为 `true` 时**无** `tabindex` 属性

**风险**：中。`React.cloneElement` 修改 children 是 React 中等风险操作；需仔细检查所有现有 `<Tooltip>` 调用方。**建议在 phase 2 第一项做完后立即跑 showcase 站点 + a11y 自动化测试**（如 `@axe-core/playwright`）。

**工作量**：20 min

### P0-8 · Command.tsx:162-171 input a11y

**根因**：`role="dialog"` 在 L156 设了，但 input 不是 combobox，缺：
- `aria-label`（无 label 元素关联时）
- `role="combobox"`
- `aria-expanded={isOpen}`
- `aria-activedescendant`（指向当前选中项 id）

**当前代码**（[Command.tsx:156-171](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Command/Command.tsx#L156-L171)）：

```tsx
<div ... role="dialog" aria-label="Command palette" ...>
  <input
    className="nothing-command__input"
    ref={inputRef}
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder={placeholder}
    aria-autocomplete="list"
    aria-controls={listId}    // Phase 1 P0-6 修复后
  />
```

**修复方案**：

```diff
  <input
    className="nothing-command__input"
    ref={inputRef}
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder={placeholder}
    aria-autocomplete="list"
    aria-controls={listId}
+   role="combobox"
+   aria-expanded={isOpen}
+   aria-haspopup="listbox"
+   aria-activedescendant={
+     isOpen && flatFilteredItems[selectedIndex]
+       ? `${generatedId}-item-${flatFilteredItems[selectedIndex].id}`
+       : undefined
+   }
+   aria-label={placeholder}
  />
```

**验证**：
- 屏幕阅读器（NVDA）：focus input 时念 "Command palette, combobox, expanded, has popup listbox"
- ↑↓ 选中项时 `aria-activedescendant` 实时变化
- a11y 测试：axe-core 0 violations

**风险**：低。无破坏性。

**工作量**：15 min

### P0-6 · Command.tsx:170, 174（已含 Phase 1，重复记录）

详见 P0-6 章节。

---

## 五、Phase 3：设计哲学（3 项）

### P0-2 · podcast-showcase.css:87, 178, 414 border-left AI 签名

**根因**：刚修完 [Alert.css:7](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Alert/Alert.css#L7) 的 `border-left` cliché，[podcast-showcase.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css) 立即复用同签名。`border-left: 2px solid var(--accent)` 是 AI 设计时代标志性签名（"active 状态"用 2px 红色边框）。

**当前代码**（[podcast-showcase.css:84-89](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L84-L89)）：

```css
.podcast-nav-item--active {
  background: var(--surface-raised);
  color: var(--text-display);
  border-left: 2px solid var(--accent);
  padding-left: calc(var(--space-sm) - 2px);
}
```

**修复方案**（3 选 1，按 NF 哲学优先级）：

**方案 A（推荐，最 NF）** — 用**字重 + 背景** 表达 active：

```diff
  .podcast-nav-item--active {
-   background: var(--surface-raised);
-   color: var(--text-display);
-   border-left: 2px solid var(--accent);
-   padding-left: calc(var(--space-sm) - 2px);
+   background: var(--text-primary);
+   color: var(--surface-base);
+   font-weight: 700;
+   /* 用 inverse 表达 active，零 border，零 shadow */
  }
```

**方案 B** — 用 **`::before` 三角点**（与 widget `[LIVE]` 标签同语义）：

```diff
  .podcast-nav-item--active {
    background: var(--surface-raised);
    color: var(--text-display);
-   border-left: 2px solid var(--accent);
-   padding-left: calc(var(--space-sm) - 2px);
+   position: relative;
+ }
+ .podcast-nav-item--active::before {
+   content: '';
+   position: absolute;
+   left: var(--space-sm);
+   top: 50%;
+   transform: translateY(-50%);
+   width: 4px;
+   height: 4px;
+   background: var(--accent);
+   /* 4px dot indicator，与 NF dot matrix 一致 */
  }
```

L178 与 L414 同理替换（`border-left` → 同方案）。先 grep 全文件 `border-left`，确保一次清完。

**验证**：
- grep `border-left: 2px solid var(--accent)` 在 podcast-showcase.css 应 0 matches
- 浏览器视觉：active nav item 仍能清晰辨识（背景或字重对比足够）
- 暗亮主题：两套主题下 active 都清晰

**风险**：低。视觉变化 1 处但都可通过对比度强化替代。

**工作量**：15 min

### P0-3 · podcast-showcase.css:725-728 box-shadow 动画

**根因**：`.ai-voice-hint`（录音按钮）使用 `@keyframes podc-mic-pulse` 配合 `box-shadow` 表达"正在录音"——而 [DesignSystemSection.tsx:389](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/sections/DesignSystemSection.tsx#L389) 明确写着 "Don't use box-shadow animations or filter: blur() transitions"。自家设计文档禁止，自家 showcase 违反。

**当前代码**（[podcast-showcase.css:720-728](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/podcast-showcase.css#L720-L728)）：

```css
.ai-voice-hint.recording {
  border-color: var(--accent);
  color: var(--text-display);
  animation: podc-mic-pulse 1.5s ease-in-out infinite;
}

@keyframes podc-mic-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(215, 25, 33, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(215, 25, 33, 0); }
}
```

**修复方案**（**用 `border-color` 或 `opacity` 替代**——与"recording"语义同源，零 shadow 零 blur）：

```diff
  .ai-voice-hint.recording {
    border-color: var(--accent);
    color: var(--text-display);
-   animation: podc-mic-pulse 1.5s ease-in-out infinite;
+   animation: podc-mic-blink 1.5s ease-in-out infinite;
  }

- @keyframes podc-mic-pulse {
-   0%, 100% { box-shadow: 0 0 0 0 rgba(215, 25, 33, 0.4); }
-   50% { box-shadow: 0 0 0 8px rgba(215, 25, 33, 0); }
+ @keyframes podc-mic-blink {
+   0%, 100% { border-color: var(--accent); }
+   50% { border-color: var(--text-primary); }
+   /* border-color 闪烁，0 shadow，0 blur */
  }
```

**验证**：
- grep `box-shadow` 在 podcast-showcase.css 应**仅剩** allowed uses（none for animation）
- 浏览器：录音时按钮**边框**闪烁而非阴影扩散
- 性能：border-color 动画比 box-shadow 性能好（不触发 paint）

**风险**：零。语义保留（"录制中"），动画形式更 NF。

**工作量**：10 min

### P0-5 · PhotoCarousel defaultSlides 真正可用

**根因**：上次修了"4 张渐变 slide"，但修法是**只删 gradient 字段**而非**给个真正的占位**。结果：`slide.gradient` 与 `defaultSlides[i].gradient` 都是 `undefined`，L108 fallback `undefined ?? undefined` = `undefined` → `style={{ background: undefined }}` → slide **变成空白黑块**。N/A 占位图标（[PhotoCarousel.tsx:112-124](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.tsx#L112-L124)）SVG 还在，但**没有背景填充**。

**当前代码**（[PhotoCarousel.tsx:42-47, 105-109](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.tsx#L42-L47)）：

```ts
const defaultSlides: Slide[] = [
  { title: 'Solar Flare', subtitle: 'Chromosphere · H-alpha' },
  { title: 'Verdant', subtitle: 'Coastal pine · 04:21' },
  { title: 'Glacial', subtitle: 'Polar · -12°C' },
  { title: 'Ember', subtitle: 'Magma flow' },
]
```

```tsx
style={
  slide.image
    ? { backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: slide.gradient ?? defaultSlides[index % defaultSlides.length].gradient }
  //                                                              ↑ undefined → 整张 slide 无背景
}
```

**修复方案**（**用 dot-matrix pattern 占位**——与 NF 美学一致，不是彩色渐变）：

```tsx
// 在 defaultSlides 顶部加 pattern 字段
interface Slide {
  title: string
  subtitle?: string
  /** CSS background (gradient / color). 默认回退到 var(--surface-raised)。 */
  gradient?: string
  /** 可选图片 URL (优先于 gradient). */
  image?: string
  /** 占位 dot-matrix 索引 0-7，NF 美学默认（无 image/gradient 时） */
  pattern?: number
}

const defaultSlides: Slide[] = [
  { title: 'Solar Flare', subtitle: 'Chromosphere · H-alpha', pattern: 0 },
  { title: 'Verdant',     subtitle: 'Coastal pine · 04:21',   pattern: 1 },
  { title: 'Glacial',     subtitle: 'Polar · -12°C',          pattern: 2 },
  { title: 'Ember',       subtitle: 'Magma flow',             pattern: 3 },
]
```

```diff
  style={
    slide.image
      ? { backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
-     : { background: slide.gradient ?? defaultSlides[index % defaultSlides.length].gradient }
+     : { background: `var(--pattern-${slide.pattern ?? (index % 4)})` }
  }
```

[PhotoCarousel.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.css) 加 4 个 NF pattern token（dot-matrix 二值图，可参考 [StaticDotMatrix.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/StaticDotMatrix.tsx)）：

```css
:root {
  --pattern-0: radial-gradient(circle at 25% 25%, var(--text-secondary) 1px, transparent 1px) 0 0 / 8px 8px;
  --pattern-1: radial-gradient(circle at 75% 25%, var(--text-secondary) 1px, transparent 1px) 0 0 / 8px 8px;
  --pattern-2: radial-gradient(circle at 25% 75%, var(--text-secondary) 1px, transparent 1px) 0 0 / 8px 8px;
  --pattern-3: radial-gradient(circle at 75% 75%, var(--text-secondary) 1px, transparent 1px) 0 0 / 8px 8px;
}
```

**验证**：
- 不传 `slides` prop 时，4 张 slide 各自有**不同 dot-matrix 占位**（区别可辨）
- 传 `slides={[{ image: '...' }, ...]}` 时图片优先
- 暗亮主题：pattern 与 surface 对比度足够（`var(--text-secondary)` 是 token，会随主题变）

**风险**：低。API 扩展（加 `pattern` 字段是可选），向后兼容（现有传 `image` 不变）。

**工作量**：30 min

---

## 六、Phase 4：设计系统 + Token（2 项）

### P0-9 · 用 Button 替代自实现 button（2 文件）

**A) Spinner.tsx:154-160**

**根因**：Spinner 自身实现 `<button className="nothing-spinner-btn">`——绕开设计系统 Button，导致：
1. 一致性破坏（Spinner SPIN 按钮与其他 Button 视觉可能不同步）
2. 状态丢失（无 `loading` 自动 spinner、无 `aria-busy` 等）
3. 样式维护成本（修 Button 样式不会同步）

**当前代码**（[Spinner.tsx:154-160](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Spinner/Spinner.tsx#L154-L160)）：

```tsx
<button
  className="nothing-spinner-btn"
  onClick={handleSpin}
  disabled={isSpinning}
>
  SPIN
</button>
```

**修复方案**：

```diff
  import * as React from 'react'
  import { cva, type VariantProps } from 'class-variance-authority'
  import { cn, dataAttr } from '@/lib/utils'
+ import Button from '@/Button'
  import './Spinner.css'
```

```diff
  return (
    <div ...>
      <div className="nothing-spinner-wheel-container">
        ...
      </div>
-     <button
-       className="nothing-spinner-btn"
-       onClick={handleSpin}
-       disabled={isSpinning}
-     >
-       SPIN
-     </button>
+     <Button
+       variant="primary"
+       size="lg"
+       onClick={handleSpin}
+       loading={isSpinning}
+       loadingText="SPINNING…"
+     >
+       SPIN
+     </Button>
      <div className="nothing-spinner-result">{result}</div>
    </div>
  )
```

[Spinner.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Spinner/Spinner.css) 删 `.nothing-spinner-btn` 全部规则。

**验证**：
- Spinner 视觉：SPIN 按钮与其他 `Button variant="primary"` 一致
- 状态：spinning 时按钮**显示内嵌 spinner**（Button 已有） + 文字变 "SPINNING…"
- a11y：`aria-busy` 自动正确

**风险**：低。Button 已支持 `loading` prop。

**工作量**：20 min

---

**B) UtilitySection.tsx:60**

**根因**：表单 submit 按钮用 `<button className="showcase-form-submit">`——同样绕开 Button。Showcase 文档示范应**展示最佳实践**而不是反面教材。

**当前代码**（[UtilitySection.tsx:60](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/sections/UtilitySection.tsx#L60)）：

```tsx
<button type="submit" className="showcase-form-submit">{t('提交', 'Submit')}</button>
```

**修复方案**：

```diff
  import InputOTP from '@/InputOTP'
+ import Button from '@/Button'
  import { CategorySection } from '../components/CategorySection'
```

```diff
- <button type="submit" className="showcase-form-submit">{t('提交', 'Submit')}</button>
+ <Button type="submit" variant="primary">{t('提交', 'Submit')}</Button>
```

**验证**：
- 表单提交按钮视觉与 Button 一致
- 暗亮主题切换正常
- Form 的 `onSubmit` 触发（Form 已有）

**风险**：低。

**工作量**：5 min

---

### P0-11 · widget-showcase.css 硬编码 token 化

**根因**：[widget-showcase.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/widget-showcase.css) 多处硬编码值绕过 tokens：
- `max-width: 1240px`（L13） — 1240px 不在 token 中（`--page-max-width` 是 1120px）
- `transition: ... 0.2s ease-out, ... 0.45s var(--ease)`（L30）— duration 硬编码
- `top: 21px; right: 18px`（L39-40）— off-grid
- `letter-spacing: 0.10em`（L42）— 与 token `var(--tracking-label)` (= 0.08em) 不一致

**当前代码**（[widget-showcase.css:11-46](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/widget-showcase.css#L11-L46)）：

```css
.widget-showcase .bento {
  width: 100%;
  max-width: 1240px;            /* L13 */
  ...
}

.widget-showcase .card {
  ...
  transition: border-color 0.2s ease-out, opacity 0.45s var(--ease);  /* L30 */
}

.widget-showcase .tag {
  position: absolute;
  top: 21px;                    /* L39 */
  right: 18px;                  /* L40 */
  font: 700 11px/1 var(--font-mono);
  letter-spacing: 0.10em;       /* L42 */
  ...
}
```

**修复方案**：

**Step 1** — [tokens.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css) 加 3 个 token（如果还没有）：

```css
:root {
  ...
  --page-max-width-widget: 1240px;        /* 1240 = 4-col bento + gutter */
  --duration-micro: 200ms;
  --duration-slow: 450ms;
  --tracking-label: 0.08em;               /* 如果还没 */
  ...
}
```

**Step 2** — widget-showcase.css 改：

```diff
  .widget-showcase .bento {
    width: 100%;
-   max-width: 1240px;
+   max-width: var(--page-max-width-widget);
    display: grid;
    ...
  }

  .widget-showcase .card {
    ...
-   transition: border-color 0.2s ease-out, opacity 0.45s var(--ease);
+   transition: border-color var(--duration-micro) var(--ease),
+               opacity var(--duration-slow) var(--ease);
  }

  .widget-showcase .tag {
    position: absolute;
-   top: 21px;
-   right: 18px;
+   top: var(--space-md);    /* 20px */
+   right: var(--space-md);  /* 20px */
    font: 700 11px/1 var(--font-mono);
-   letter-spacing: 0.10em;
+   letter-spacing: var(--tracking-label);
    ...
  }
```

**验证**：
- grep `1240px` 在 widget-showcase.css 应 0 matches
- grep `0.2s` `0.45s` `0.10em` 应 0 matches
- 视觉：tag 位置（21, 18 → 20, 20）几乎不可见变化，文字间距 0.10em → 0.08em 微调（NF label 0.08em 是设计系统标准）
- 暗亮主题：token 切换正常

**风险**：低。视觉差异 < 1px，文字间距是 polish。

**工作量**：10 min

---

## 七、验证策略总览

每个 Phase 完成后跑：

| 阶段 | 必做 | 可选 |
|------|------|------|
| Phase 0 | 启动 dev server，访问 Nullframe 路由，Console 无 error；NfCard 6 widget 渲染正常 | `pnpm test` 单元测试 |
| Phase 1 | grep 死代码/硬编码 0 matches；DevTools computed style 不变 | 浏览器无视觉回归 |
| Phase 2 | `pnpm test`；手工 Tab 导航；axe-core 扫描 | NVDA / VoiceOver 真实测试 |
| Phase 3 | grep 0 matches；showcase 站无视觉回归 | Lighthouse a11y score ≥ 95 |
| Phase 4 | grep 0 matches；Button 视觉一致 | Storybook（如有） |

**最终验收（所有 Phase 完成后）**：
- `pnpm dev` 启动
- 访问每条路由：showcase / nullframe / 各组件 demo
- Console 0 error / 0 warning
- Tab 键键盘可达所有交互元素
- `pnpm test` 全绿
- `pnpm build` 无 TS error
- `pnpm run lint` 0 issues（如配置）

---

## 八、风险评估总览

| P0 | 风险 | 缓解 |
|----|------|------|
| #1 NfCard | 极低 | fallback 链兜底 |
| #2 border-left | 低 | 方案 A/B 都可逆 |
| #3 box-shadow | 零 | border 替代同语义 |
| #4 死代码 | 零 | 纯删除 |
| #5 PhotoCarousel | 低 | 扩展 API，向后兼容 |
| #6 Command useId | 低 | useId 已存在 |
| #7 Tooltip | **中** | cloneElement 需测全调用方；**Phase 2 第一项做完后立即跑 showcase 验证** |
| #8 Command aria | 低 | 增量加属性 |
| #9 Button 替换 | 低 | Button API 已稳定 |
| #10 默认 mono | 低 | opt-in 保留 |
| #11 token 化 | 低 | 视觉差异 < 1px |
| #12 SvgIcon | 极低 | 删 fallback |

**最复杂项**：#7 Tooltip——cloneElement + 条件 tabIndex 是中等风险，**建议最后做 #7 并优先做 #8/9 减少并发修改**。

---

## 九、执行顺序建议（再优化）

按"风险前置 + 依赖"重排：

1. **#1 NfCard**（必须，运行时阻断）— 5 min
2. **#4 死代码**（零风险热身）— 2 min
3. **#6 Command useId**（低风险热身）— 5 min
4. **#12 SvgIcon fallback**（零风险）— 5 min
5. **#10 dotmatrix 默认 mono**（低风险）— 5 min
6. **#11 widget-showcase token**（低风险）— 10 min
7. **#2 border-left 3 处**（低风险）— 15 min
8. **#3 box-shadow**（零风险）— 10 min
9. **#5 PhotoCarousel**（中风险）— 30 min
10. **#9 Button 替换（Spinner + UtilitySection）**（低风险）— 25 min
11. **#8 Command a11y**（低风险）— 15 min
12. **#7 Tooltip**（**中风险，放最后，有完整 showcase 验证**）— 20 min

**总计时**：5+2+5+5+5+10+15+10+30+25+15+20 = **147 min ≈ 2.5 h**

---

## 十、执行入口

此计划是**只读路线图**。要实际修改文件请明确：

> **"按 fix-plan.md 全部修复"** — 进入 05 设计改进阶段
> **"按 fix-plan.md 修 Phase 0 + Phase 1"** — 先修运行时 + 4 个 Quick Win
> **"按 fix-plan.md 修 #X"** — 修单类
> **"只修 P0 #7 Tooltip"** — 单项最复杂 a11y

按 monkren 默认规则，**不主动写文件**。如需开工请明确指令。
