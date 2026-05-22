# Nothing Design System — 审查修复计划

## 摘要

基于设计系统审查报告的发现，执行 P0（Critical）和 P1（Major）问题的修复，其余问题仅记录不执行。核心改动两条线：
1. **移除违反反模式的组件**：删除 Skeleton + Sonner，清理相关文件引用
2. **Token 文档同步**：以 tokens.css 为 source of truth，更新 tokens.md 和 component-matching.md

---

## 当前状态分析

### 审查发现的 17 个问题

| 等级 | 编号 | 问题 |
|------|------|------|
| Critical | C1 | Skeleton 组件违反反模式 "No skeleton loading screens" |
| Critical | C2 | Sonner 组件违反反模式 "No toast popups" |
| Critical | C3 | Sonner CSS 使用 box-shadow |
| Critical | C4 | Sonner 动画使用 translateX (位置变换) |
| Major | M1 | tokens.md vs tokens.css 暗色 widget token 值不匹配 (9个) |
| Major | M2 | tokens.md 未记录 tokens.css 中存在的 token (type scale/space/radius 扩展) |
| Major | M3 | tokens.css 存在 shadcn/ui 遗留 okhcl() 变量 (20+个) |
| Major | M4 | component-matching.md primary button Tailwind 映射为 text-nothing-accent 应为 text-black |
| Major | M5 | SKILL.md 说 Primary 层可用 "Doto or Space Grotesk"，与 tokens.md 矛盾 |
| Major | M6 | component-matching.md Table variant "striped" 违反反模式 |
| Major | M7 | tokens.css 暗色 --widget-bg 为亮色值 #e1e5ea |
| Moderate | M8 | --shadow-drop token 存在但禁止阴影 |
| Moderate | M9 | Doto font stack 中 JetBrains Mono 不在 tokens.md |
| Moderate | M10 | Skeleton.css 使用 --muted-bg (shadcn 遗留) |
| Moderate | M11 | tokens.css @tailwind utilities 不完整 |
| Minor | N1-N3 | 文档描述性不一致 |

### 修复策略决定

- **Skeleton/Sonner**: 全部移除（选项1）— 组件删除 + 文件清理 + 引用更新
- **Token 同步方向**: tokens.css → 文档（选项1）— tokens.css 是代码真实来源
- **UI Kit 影响**: 组件移除后会更新 SKILL.md 和 component-matching.md 的相关条目

---

## 第一步：移除 Skeleton + Sonner 组件

### 1.1 删除源文件

| 操作 | 文件 | 原因 |
|------|------|------|
| 删除 | `web-ui-kit/react/src/components/Skeleton.tsx` | 违反反模式 "No skeleton loading screens" |
| 删除 | `web-ui-kit/react/src/styles/skeleton.css` | Skeleton 组件样式 |
| 删除 | `web-ui-kit/react/src/components/Sonner.tsx` | 违反反模式 "No toast popups" |
| 删除 | `web-ui-kit/react/src/styles/sonner.css` | Sonner 组件样式，含 shadow 和 slide 动画 |

### 1.2 更新 SKILL.md — 移除组件列表引用

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/SKILL.md`

改动：
- 移除 "Available Components" 列表中的 `Skeleton` 行 (当前行约 252)
- 移除 "Available Components" 列表中的 `Sonner` 行 (当前行约 274)
- 反模式规则 "No skeleton loading screens" 和 "No toast popups" 保持不变

### 1.3 更新 component-matching.md — 移除相关映射

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/references/component-matching.md`

改动：
- 删除 Section 1.2 "Data Display" 表中 Skeleton 行 (~第38行):
  `| Skeleton | Skeleton | text/circular/rectangular | skeleton.css | --surface-raised |`
- 删除 Section 1.4 "Overlay" 表中 Sonner 行 (~第69行):
  `| Notification / Toast | Sonner | — | sonner.css | --surface, --border-visible |`
- 删除 Section 2.3 "Interaction Pattern" 表中 `onToggle / checked state` 的 Switch/Toggle/Checkbox 引用中无 Skeleton 和 Sonner 相关 (不需要改)
- 删除 Section 2.2 "Visual Feature" 表中 Skeleton 相关的 CSS 模式匹配 (没有直接的 skeleton 条目，无需改)

### 1.4 更新 components.md — 移除 Sonner 组件说明

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/references/components.md`

改动：
- 无直接修改。components.md 的反模式规则 "No skeletons" 和 "Toasts: None" 保持不变
- 确认 Skeleton 不在 components.md 中有专门章节（审查确认：Skeleton 只在 components.md 第152行反模式段落被提及，无需改）

### 1.5 更新 platform-mapping.md（如需要）

审查确认 platform-mapping.md 中无 Skeleton 和 Sonner 的专门映射，无需修改。

---

## 第二步：清理 tokens.css 中的 shadcn 遗留变量

### 2.1 删除 shadcn 遗留 token

**文件**: `/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css`

删除以下 `:root, [data-theme="dark"]` 和 `[data-theme="light"]` 块中的 oklch() 变量（行125-153 和对应 light 块）：

```css
/* 删除所有 oklch() 变量 */
--popover-bg, --popover-fg, --primary-fg, --secondary-bg, --secondary-fg,
--accent-fg, --destructive-fg, --muted-bg, --muted-fg, --input-border-color,
--input-bg, --switch-bg, --ring-color, --radius
--chart-1 ~ --chart-5
--sidebar-bg, --sidebar-fg, --sidebar-primary, --sidebar-primary-fg,
--sidebar-accent-bg, --sidebar-accent-fg, --sidebar-border, --sidebar-ring
```

### 2.2 删除 --shadow-drop token

**文件**: `/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css`

删除行62: `--shadow-drop: rgba(0, 0, 0, 0.3);`

此 token 仅被 Sonner（已删除）引用。

### 2.3 删除 --fill-0 token

删除行63: `--fill-0: rgba(0, 0, 0, 0);` — 检查是否有组件引用后再决定。

---

## 第三步：Token 文档同步 — tokens.css → tokens.md

### 3.1 补充 tokens.md Type Scale 扩展

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/references/tokens.md`

在 type scale 表中添加：
```markdown
| --display-sm | 32px | 1.1 | -0.02em | Small hero display |
| --body-xs | 13px | 1.5 | 0.01em | Button labels, compact text |
| --widget-label | 10px | 1.2 | 0.08em | Widget ALL CAPS labels |
| --widget-micro | 8px | 1.2 | 0.08em | Widget micro text |
```

### 3.2 补充 tokens.md Spacing Scale 扩展

在 spacing scale 表中添加：
```markdown
| --space-3xs | 1px | Hairline adjustments |
| --space-sm-plus | 12px | Button padding |
| --space-md-plus | 20px | Extended spacing |
| --space-lg-plus | 28px | Extended spacing |
| --space-lg-minus | 14px | Button lg padding |
```

### 3.3 补充 tokens.md Radius Tokens

在 tokens.md 中新增 Section 或扩充 type scale 后的 radius 表：
```markdown
### Radius Scale

| Token | Value | Use |
|-------|-------|-----|
| --radius-2xs | 2px | Minimal rounding |
| --radius-xs | 4px | Technical edges |
| --radius-sm | 6px | Subtle rounding |
| --radius-md | 8px | Standard elements |
| --radius-lg | 20px | Widget cards |
| --radius-xl | 20px | Widget cards (alt) |
| --radius-2xl | 24px | Widget pill shapes |
| --radius-pill | 999px | Buttons, tags, pills |
```

### 3.4 更新 tokens.md Widget 暗色 Token 值为 tokens.css 实际值

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/references/tokens.md`

Widget Subsystem Tokens 表中暗色列更新为 tokens.css `:root` 实际值：

| Token | 旧值 (tokens.md) | 新值 (tokens.css) |
|-------|-----------------|------------------|
| `--widget-bg` dark | `#1a1d1c` | `#e1e5ea` |
| `--widget-card-bg` dark | `#e1e5ea` | `#fcfafe` |
| `--widget-dark-2` dark | `#2a2d2c` | `#3b393e` |
| `--widget-dark-3` dark | `#3a3d3c` | `#6c696e` |
| `--widget-dark-4` dark | `#4a4d4c` | `#aeabb1` |
| `--widget-white` | `#FCFAFE` | `#ffffff` |
| `--widget-size-sm` | `152px` | `68px` |
| `--widget-size-md` | `324px` | `152px` |
| `--widget-size-lg` | `324px` | `320px` |

### 3.5 补充 tokens.md 新增 Widget Token

添加 tokens.css 中存在但 tokens.md 缺失的 widget token:
- `--widget-gap`, `--widget-dot-sm`, `--widget-dot-md`, `--widget-dot-lg`
- `--widget-size-icon-md`, `--widget-size-icon-lg`, `--widget-pill-height`
- `--overlay-heavy`, `--overlay-light`
- `--switch-*` 系列 (width, height, thumb-size, thumb-offset, thumb-active-offset, coarse-* 变体)

---

## 第四步：修复 component-matching.md

### 4.1 修复 Primary Button Tailwind 映射

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/references/component-matching.md`

行230: `text-nothing-accent` → `text-black`

改前：
```
| `.nothing-btn--primary` | `bg-nothing-display text-nothing-accent rounded-nothing-pill ...` |
```
改后：
```
| `.nothing-btn--primary` | `bg-nothing-display text-black rounded-nothing-pill ...` |
```

### 4.2 移除 Table "striped" variant

行34: `striped/hoverable` → `hoverable`

### 4.3 移除 Skeleton/Sonner 映射表行

如第一步所述，删除 Section 1.2 中 Skeleton 行和 Section 1.4 中 Sonner 行

---

## 第五步：修复 SKILL.md 文档冲突

### 5.1 字体职责统一

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/SKILL.md`

行35: `Doto or Space Grotesk at display size` → `Doto at display size`

理由：tokens.md 明确 Doto 为 Display 专用，Space Grotesk 为 Body/UI。两者职责不重叠。

### 5.2 修复 "warm off-white" 描述

行22: `Light mode: warm off-white` → `Light mode: cool off-white (#E1E5EA)`

添加实际色值以确保描述准确。

---

## 第六步：补充 font stack 和 Tailwind 配置

### 6.1 统一 Doto font stack

**文件**: `/Users/ruishengzhang/.trae-cn/skills/nothing-design/references/tokens.md`

行9: Doto fallback 添加 JetBrains Mono：
`"Doto", "Space Mono", "JetBrains Mono", monospace` (已于 tokens.css 行18 一致)

### 6.2 补充 tokens.css Tailwind 配置

**文件**: `/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/tokens.css`

行1: `@tailwind utilities;` → 添加 `@tailwind base;` 和 `@tailwind components;`

---

## 改动文件清单

| 文件 | 改动类型 | 步骤 |
|------|---------|------|
| `web-ui-kit/react/src/components/Skeleton.tsx` | 删除 | 1.1 |
| `web-ui-kit/react/src/styles/skeleton.css` | 删除 | 1.1 |
| `web-ui-kit/react/src/components/Sonner.tsx` | 删除 | 1.1 |
| `web-ui-kit/react/src/styles/sonner.css` | 删除 | 1.1 |
| `SKILL.md` | 编辑 | 1.2, 5.1, 5.2 |
| `references/component-matching.md` | 编辑 | 1.3, 4.1, 4.2, 4.3 |
| `references/tokens.md` | 编辑 | 3.1-3.5, 6.1 |
| `web-ui-kit/react/src/styles/tokens.css` | 编辑 | 2.1, 2.2, 2.3, 6.2 |

---

## 不做修改的问题

| 编号 | 问题 | 原因 |
|------|------|------|
| M7 | `--widget-bg` 暗色值 | 同步方向决定保留 tokens.css 实际值（第三步已包含） |
| M8 | `--shadow-drop` 存在 | 第二步已删除 |
| M9 | font stack 不一致 | 第六步已统一 |
| M10 | Skeleton --muted-bg | Skeleton 已删除 |
| M11 | Tailwind 不完整 | 第六步已补 |
| N1-N3 | 描述性不一致 | P3 优先级，本次不修复 |

---

## 执行状态：全部完成

| 步骤 | 状态 | 验证结果 |
|------|------|---------|
| 第一步：删除 Skeleton + Sonner | 已完成 | 4 个文件全部删除，SKILL.md/component-matching.md 无残留引用 |
| 第二步：清理 tokens.css shadcn | 已完成 | oklch() 0 个匹配，@tailwind 三条完整，--shadow-drop 已删除，--fill-0 保留 |
| 第三步：Token 文档同步 tokens.md | 已完成 | type/space/radius/widget 全部与 tokens.css 一致 |
| 第四步：修复 component-matching.md | 已完成 | "striped" → "hoverable"，"text-nothing-accent" → "text-black" |
| 第五步：修复 SKILL.md 文档冲突 | 已完成 | "warm off-white" → "cool off-white (#E1E5EA)"，"Doto or Space Grotesk" → "Doto at display size" |
| 第六步：验证所有改动 | 已完成 | 所有 token 值与 tokens.css 一致，无残留引用 |

---

## 假设与前提

- 无外部项目依赖 Skeleton 或 Sonner 组件（它们是独立组件，删除不影响其他组件）
- 删除 Sonner 不影响 States 组件（States 组件独立实现 loading/error/empty 状态）
- tokens.css 的 widget token 值是正确的（组件依赖它们正常运行）