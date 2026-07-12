# 恢复执行：补充 Nothing UI 设计系统（剩余步骤）

## 摘要

上一轮 `/plan` 执行因上下文丢失中断。经审计确认：**Step 1（tokens.css）、Step 2（tokens.md）、Step 3a（SKILL.md §2.10–§2.13）已完成**。本计划聚焦剩余工作：Step 3b-3e（SKILL.md §3/§7/§8/§9）、Step 4（components.md）、Step 5（platform-mapping.md）、Step 6（组件 CSS token 化，可选）、Step 7（neuform.ai，待截图）。

原始计划文件：[supplement-design-system.md](file:///c:/Users/monkr/Documents/github/Nothing UI/.trae/documents/supplement-design-system.md)

## 审计结论（已完成 vs 剩余）

| 步骤 | 目标 | 状态 |
|------|------|------|
| Step 1 | tokens.css 新增 11 组 token | ✅ 已完成（lines 116–206） |
| Step 2 | tokens.md 新增 12 个章节 | ✅ 已完成 |
| Step 3a | SKILL.md §2.10–§2.13 | ✅ 已完成（lines 141–189） |
| **Step 3b** | **SKILL.md §3 ANTI-PATTERNS 补充** | ❌ 未完成 |
| **Step 3c** | **SKILL.md §7 DO'S & DON'TS** | ❌ 未完成 |
| **Step 3d** | **SKILL.md §8 AGENT PROMPT GUIDE** | ❌ 未完成 |
| **Step 3e** | **SKILL.md §9 SIMILAR BRANDS** | ❌ 未完成 |
| **Step 4** | **components.md token 化 + Do's/Don'ts** | ❌ 未完成 |
| **Step 5** | **platform-mapping.md 同步新 token** | ❌ 未完成 |
| **Step 6** | **组件 CSS 硬编码→token（可选）** | ❌ 未完成（实际范围远超预估） |
| Step 7 | neuform.ai 补充 | ⏸️ 阻塞（待用户截图） |

## 剩余执行步骤

### Step 3b: SKILL.md §3 ANTI-PATTERNS — 补充 2 条

**文件**：[SKILL.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/SKILL.md)

**当前 §3 末尾**（line 204）：
```
- Data visualization: differentiate with **opacity** (100%/60%/30%) or **pattern** (solid/striped/dotted) before introducing color.
```

**在此行后追加 2 条**：
```
- No hardcoded `max-width` / `outline` / `z-index` / `border-width` — must reference tokens (`var(--page-max-width)`, `var(--focus-ring-*)`, `var(--z-dropdown)`, `var(--border-width-*)`). Hardcoded values break theme consistency and block future token updates.
- No shadow-based elevation — Nothing UI is flat. Create hierarchy with **surface contrast** (`--canvas` → `--surface` → `--surface-raised`) + **border separation** (`1px solid var(--border-subtle)`). Never use `box-shadow` or `filter: blur()` to simulate depth.
```

### Step 3c: SKILL.md 新增 §7 DO'S & DON'TS

**位置**：在文件末尾（当前 line 605，§6 之后）追加。

**结构**（按类别，每类 2-4 条 Do + 2-4 条 Don't）：

```markdown
## 7. DO'S & DON'TS

### Color
**Do**
- Use `--canvas` / `--surface` / `--surface-raised` for surface hierarchy
- Use `--accent` (red) sparingly for destructive actions or active indicators only
- Differentiate data series with opacity (100%/60%/30%) before introducing hue

**Don't**
- Don't introduce new accent colors — monochrome + single red accent is the system
- Don't use `--text` color for borders; use `--border-subtle` / `--border-strong`

### Typography
**Do**
- Pair line-height + letter-spacing tokens (`--leading-*` + `--tracking-*`) with type scale
- Use uppercase + `--tracking-label` for labels/eyebrows
- Set display sizes with negative tracking (`--tracking-display-*`)

**Don't**
- Don't hardcode `line-height` or `letter-spacing` — use tokens
- Don't use serif fonts — Nothing UI is Inter (UI) + JetBrains Mono (data)

### Layout
**Do**
- Constrain pages with `var(--page-max-width)` (1120px)
- Use `var(--section-gap)` (80px) between major sections
- Select content width by purpose: narrow (640) for prose, wide (1024) for dashboards

**Don't**
- Don't hardcode `max-width` pixel values
- Don't exceed `--page-max-width` without explicit full-bleed intent

### Component
**Do**
- Apply `var(--focus-ring-width) solid var(--focus-ring-color)` with `outline-offset: var(--focus-ring-offset)` on `:focus-visible`
- Ensure interactive elements meet `var(--touch-target-min)` (44px)
- Use named radius by element: `--radius-button`, `--radius-card`, `--radius-input`, `--radius-tag`

**Don't**
- Don't remove focus outlines — accessibility is non-negotiable
- Don't mix radius scales within a component group (all cards use `--radius-card`)

### Motion
**Do**
- Use named transitions: `var(--transition-fade)`, `var(--transition-color)`, `var(--transition-transform)`
- Keep durations in `--duration-micro` (100ms) to `--duration-transition` (200ms) range

**Don't**
- Don't use `box-shadow` animations or `filter: blur()` transitions
- Don't exceed 200ms for UI feedback transitions
```

### Step 3d: SKILL.md 新增 §8 AGENT PROMPT GUIDE

**位置**：紧接 §7 之后。

**内容**：5 个示例组件 prompt，参照 refero.design Agent Prompt Guide 格式，用 Nothing UI token 和风格。每个 prompt 包含：组件类型、用途、关键 token、约束。

```markdown
## 8. AGENT PROMPT GUIDE

When prompting an agent to build Nothing UI components, include token references and constraints explicitly.

### Hero Section
> Build a hero section for a product page. Container: `max-width: var(--page-max-width)`, `padding: 0 var(--space-lg)`, vertically centered with `var(--section-gap)` margin below. Headline: `--font-size-display-lg` (64px), `font-weight: 700`, `line-height: var(--leading-display-lg)`, `letter-spacing: var(--tracking-display-lg)`, color `--text`. Subhead: `--font-size-body-lg`, `--leading-body`, `--text-muted`. No imagery — use a dot-matrix illustration in an elevated card (`--surface-raised`, `--radius-card`, `1px solid var(--border-subtle)`). CTA: pill button (`--radius-button`), `--accent` background only if primary action.

### Card
> Build a content card. Surface: `var(--surface)`, border: `1px solid var(--border-subtle)`, radius: `var(--radius-card)` (16px). Padding: `var(--card-padding)` (24px). Title: `--font-size-heading-sm`, `--tracking-heading`. Body: `--font-size-body`, `--leading-body`, `--text-muted`. No shadow. If nested cards, outer uses `--surface-raised` + inner uses `--surface` to create hierarchy via contrast.

### Navigation
> Build a top navigation bar. Height: `56px`, sticky (`position: sticky; top: 0; z-index: var(--z-sticky)`). Background: `var(--surface)` with `border-bottom: 1px solid var(--border-subtle)`. Logo: monoline, 24px, `--text`. Nav items: `--font-size-label`, uppercase, `--tracking-label`, `--text-muted` default → `--text` on hover/active. Active item: `2px solid var(--accent)` bottom border (`--border-width-accent`). Each item meets `var(--touch-target-min)` (44px) hit area.

### Data Row
> Build a list row for a data table. Layout: grid with label column (narrow) + value column (wide). Row height: `48px`, `padding: 0 var(--space-md)`. Border-bottom: `1px solid var(--border-subtle)`. Label: `--font-size-label`, uppercase, `--tracking-label`, `--text-muted`. Value: `--font-size-body`, `--text`. Hover: background `var(--surface-raised)`. Active: `2px solid var(--accent)` left border (`--border-width-accent`). Focus: `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset)`.

### Modal
> Build a modal dialog. Overlay: `background: var(--overlay-heavy)`, `z-index: var(--z-modal)`. Dialog: `max-width: var(--modal-max-width)` (480px), `var(--surface-raised)`, `border: 1px solid var(--border-strong)`, `border-radius: var(--radius-card)`. Padding: `var(--space-lg)`. Title: `--font-size-heading-sm`, `--tracking-heading`. Close button: top-right, `--radius-button`, `--text-muted` → `--text` on hover. Focus trap inside modal. Escape key closes. Animate with `var(--transition-fade)`.
```

### Step 3e: SKILL.md 新增 §9 SIMILAR BRANDS

**位置**：紧接 §8 之后。

```markdown
## 9. SIMILAR BRANDS

Design context references — brands sharing Nothing UI's monochrome, reduction-first philosophy:

| Brand | Shared Principle | Reference Value |
|-------|------------------|-----------------|
| **Linear** | Monochrome UI, keyboard-first, dense data, subtle motion | App UI patterns, issue tracking layout |
| **Vercel** | Black/white/geist aesthetic, minimal chrome, mono typography | Marketing page structure, deployment dashboards |
| **Teenage Engineering** | "Less, but better" hardware, dot-matrix displays, monochrome product | Dot-matrix aesthetic, hardware-software parity |
| **Braun (Dieter Rams)** | "Less but better", functional clarity, no decoration | Ten principles for good design — philosophical anchor |
| **Nothing (Phone)** | Dot-matrix UI, transparent materials, monochrome OS | Direct namesake — dot-matrix widget patterns, glyph font |

Use these as mood-board references when extending the system. Do NOT copy component patterns directly — extract the underlying discipline (restraint, hierarchy via contrast, typographic precision).
```

### Step 4: components.md — token 化 + Do's & Don'ts

**文件**：[components.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/references/components.md)

**改动 1：替换硬编码值为 token 引用**（经审计确认的 8 处）：

| 行 | 当前 | 替换为 |
|----|------|--------|
| 6 | `Radius: 12–16px cards, 8px compact, 4px technical` | `Radius: var(--radius-card) cards, var(--radius-card-compact) compact, var(--radius-card-technical) technical` |
| 15 | `999px (pill)` | `var(--radius-button) (pill)` |
| 20 | `padding 12px 24px` | `padding 12px var(--space-lg)` |
| 26 | `8px radius` | `var(--radius-input)` |
| 60 | `44px touch` | `var(--touch-target-min)` |
| 66 | `999px (pill) or 4px (technical)` | `var(--radius-tag) (pill) or var(--radius-tag-technical) (technical)` |
| 82 | `44px touch` | `var(--touch-target-min)` |
| 141 | `max 480px` + `16px radius` | `max var(--modal-max-width)` + `var(--radius-card)` |

**改动 2：每节末尾新增 Do's & Don'ts 子节**（§1–§15 共 15 节，每节 2-3 条）。

示例（§1 Cards）：
```markdown
**Do's & Don'ts**
- ✅ Do use `var(--radius-card)` for standard cards, `var(--radius-card-compact)` for dense layouts
- ❌ Don't add `box-shadow` — use `--surface-raised` + border for elevation
- ❌ Don't exceed `var(--card-padding)` (24px) without explicit reason
```

每节根据该组件类型定制 Do's & Don'ts，聚焦：token 使用、无阴影、focus 可达性、单色约束。

### Step 5: platform-mapping.md — 同步新 token

**文件**：[platform-mapping.md](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/references/platform-mapping.md)

**改动**：在 §1 HTML/CSS 的 `:root` 代码块（lines 8–31）中补充关键新 token 示例：

```css
/* Layout */
--page-max-width: 1120px;
--modal-max-width: 480px;
--section-gap: 80px;
--card-padding: 24px;

/* Named Radius */
--radius-button: 999px;
--radius-card: 16px;
--radius-input: 8px;

/* Focus Ring */
--focus-ring-width: 2px;
--focus-ring-color: var(--interactive);
--focus-ring-offset: 2px;

/* Touch Target */
--touch-target-min: 44px;

/* Z-Index (granular) */
--z-dropdown: 50;
--z-sticky: 80;
--z-popover: 200;
--z-tooltip: 300;
```

在 §2 SwiftUI 补充对应映射（如 `focusRingWidth` → `CGFloat(2)`，`touchTargetMin` → `CGFloat(44)`，`radiusCard` → `CGFloat(16)`）。

### Step 6: 组件 CSS — 硬编码→token（可选，范围已修正）

**审计发现实际范围远超原始预估**：

| 硬编码模式 | 出现次数 | 文件数 |
|-----------|---------|--------|
| `outline: 2px solid var(--interactive)` + `outline-offset: 2px` | 35 处 | 28 个 CSS 文件 |
| `max-width: 1120px`（含 `max-width:1120px` minified 变体） | 2 处 | widget-showcase.css:14, nullframe.css:10 |
| `max-width: 480px` | 2 处 | modal.css:29, command.css:8 |
| `z-index: var(--z-overlay)` 用于 dropdown/popover/tooltip | 9 处 | 8 个 CSS 文件 + 1 个 tsx |

**替换规则**：
1. `outline: 2px solid var(--interactive); outline-offset: 2px` → `outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset)`
2. `max-width: 1120px` / `max-width:1120px` → `max-width: var(--page-max-width)`
3. `max-width: 480px` → `max-width: var(--modal-max-width)`
4. `z-index: var(--z-overlay)` → 按语义替换：
   - dropdown-menu / context-menu / select → `var(--z-dropdown)`
   - popover / hover-card → `var(--z-popover)`
   - tooltip → `var(--z-tooltip)`
   - navigation-menu → `var(--z-sticky)`（若 sticky）或 `var(--z-dropdown)`
   - taskbar → `var(--z-sticky)`

**执行方式**：使用 `Edit` 工具的 `replace_all` 模式逐文件批量替换。`nullframe.css` 为 minified，需注意无空格变体。

**注意**：此步为可选优化，不改变视觉表现。若用户希望仅完成文档层面补充（Steps 3-5），可跳过此步。

### Step 7: neuform.ai/novaflow 补充（阻塞）

**前提**：用户提供 neuform.ai/novaflow 页面截图或导出文件。

**操作**（截图到位后执行）：
1. 分析截图中 novaflow 模板的设计要素
2. 识别与 Nothing UI 现有系统的差异与可借鉴点
3. 补充到 tokens.css / tokens.md / SKILL.md 相应章节
4. 若有新设计维度（特殊动效、响应式断点），新增专门章节

**本计划不执行 Step 7**，待用户单独提供截图后重新触发。

## 假设与决策

1. **沿用原始计划的所有决策**：无阴影、单色优先、token 命名约定、向后兼容、不创建新文件。
2. **Step 6 范围修正**：审计发现 48 处硬编码（原估 8 处），但替换规则不变。是否执行由用户在审批时决定。
3. **Step 7 延后**：本计划不包含 Step 7，用户提供截图后单独触发。
4. **执行顺序**：Step 3b → 3c → 3d → 3e → 4 → 5 →（可选 6）→ 验证。各步骤独立，无阻塞依赖。

## 验证步骤

1. **SKILL.md 结构完整性**：Grep `^## [0-9]+\.` 确认 §1–§9 全部存在
2. **components.md token 引用**：Grep `var(--radius-` / `var(--touch-target-min)` / `var(--modal-max-width)` 确认替换完成
3. **platform-mapping.md 新 token**：Grep `--page-max-width` / `--focus-ring-width` / `--touch-target-min` 确认已添加
4. **（若执行 Step 6）硬编码清零**：Grep `outline: 2px solid var(--interactive)` 在 `src/styles/` 下返回 0 结果；Grep `max-width: 1120px` 返回 0（不含 tokens.css 定义处）
5. **`npm run dev` 启动正常**：无新增编译错误
6. **文档一致性**：tokens.md 列出的 token 在 tokens.css 中有定义；components.md 引用的 token 存在
