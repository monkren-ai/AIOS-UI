# Nothing-UI 评分提升建议

> 配套主报告：[review-report.md](file:///Users/monkren/Documents/GitHub/Nothing-UI/.monkren/reviews/nothing-ui-20260708/review-report.md)
> 目标：从 6.8/10 提升到 8.5/10
> 方法：按 ROI 排序的修复路线（先高杠杆、再低杠杆）

## 5 步路线图

| 步骤 | 预计耗时 | 分数变化 | 关注维度 |
|------|---------|---------|---------|
| 1. 死代码与哲学违反 | 1h | 6.8 → 7.4 | 哲学一致性 +0.6, 细节执行 +0.3 |
| 2. 硬编码值清零（nullframe.css 重点） | 3h | 7.4 → 7.9 | 细节执行 +0.9, 哲学一致性 +0.2 |
| 3. a11y P0 修复 | 4h | 7.9 → 8.5 | 功能性 +1.0 |
| 4. Showcase 不对称化 + 删 utility-orange | 2h | 8.5 → 8.7 | 哲学一致性 +0.2, 视觉层级 +0.1 |
| 5. P2 polish | 4h | 8.7 → 9.0+ | 全部维度 +0.1 |

---

## 步骤 1：死代码与哲学违反（1 小时，+0.6 分）

| # | 任务 | 杠杆 | 文件 |
|---|------|------|------|
| 1.1 | 删 `--shadow-drop` 13 处死引用 | 立刻消除"虚假严谨"信号 | Sheet/Popover/HoverCard/ContextMenu/DropdownMenu/Select/Command/NavigationMenu/Spinner 的 CSS |
| 1.2 | 删 Modal `backdrop-filter: blur(4px)` | 违反 stated 规则 | [Modal.css:15-17](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Modal/Modal.css#L15-L17) |
| 1.3 | 删 nullframe `.shine` shimmer + keyframes | 移除装饰渐变 | [nullframe.css:21-26](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css#L21-L26) + widget-showcase.css:37-52 |
| 1.4 | 删 nullframe `.social-btn` `backdrop-filter: blur(20px)` | 违反 stated 规则 | [nullframe.css:151-152](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/nullframe.css#L151-L152) |
| 1.5 | 改 Alert `border-left` cliché | 移除 AI signature | [Alert.css:5-7,15-22](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Alert/Alert.css#L5-L22) |
| 1.6 | 改 PhotoCarousel 默认渐变为 monochrome placeholder | 移除 4 个 chromy 默认 | [PhotoCarousel.tsx:43-46](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/PhotoCarousel/PhotoCarousel.tsx#L43-L46) |

**预期**：哲学一致性 6.5 → 7.1，细节执行 5.5 → 5.8

---

## 步骤 2：硬编码值清零（3 小时，+0.5 分）

### 重点文件：nullframe.css

这是全项目**唯一**严重违反 token 纪律的文件。集中处理一次可消除 60+ 处硬编码。

| 子任务 | 行数 | 工作量 |
|--------|------|--------|
| 22 处硬编码 `font-family` → `var(--font-*)` | 32-192 | 30 min |
| 17+ 处硬编码 hex → `var(--nf-*)` / `var(--muted-bg)` / `var(--overlay-heavy)` | 56-174 | 30 min |
| 6 处硬编码 `rgba()` → 对应 token | 150-166 | 10 min |
| 20+ 处 off-grid 间距 → `var(--space-xs/sm/md)` 或新增 token | 12-202 | 45 min |
| 4 处硬编码 `border-radius` → `var(--radius-*)` | 16, 102, 179, 202 | 10 min |
| 删 `radial-gradient` 中 `1px` / `0.5px`（保留 token 化） | 209, 214 | 5 min |

### 其他文件（次重点）

| 文件 | 工作量 |
|------|--------|
| [widget-showcase.css:69,86,111](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/widget-showcase.css#L69-L111) | 10 min |
| [widget-pill.css:53](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/widget-pill.css#L53) | 2 min |
| [Date.css:23,24,63,158](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Date/Date.css#L23-L158) | 10 min |
| [Card.css:133](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Card/Card.css#L133) | 2 min |
| [photo-frame-widget.css:35](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/photo-frame-widget.css#L35) | 2 min |
| [SvgIcon.tsx:28-31,35-38](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/widgets/SvgIcon.tsx#L28-L38) 删 fallback | 5 min |

### BEM 前缀补全

| 文件 | 改动 | 工作量 |
|------|------|--------|
| [widgets.css](file:///Users/monkren/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/widgets.css) | 全文 `.widget-*` → `.nothing-widget-*` + 同步 TSX className | 1h |
| widget-showcase.css、nullframe.css | `.card/.shine/.tag/.bento` 等通用类加 `nothing-` 前缀 | 30 min |

**预期**：细节执行 5.5 → 6.4

---

## 步骤 3：可访问性 P0（4 小时，+0.6 分）

| # | 任务 | 工作量 | WCAG |
|---|------|--------|------|
| 3.1 | Input 加 `:focus-visible` ring | 10 min | 2.4.7 |
| 3.2 | Input 透传 `type/autoComplete/inputMode/name` + `aria-describedby` 关联 error | 30 min | 1.3.5, 1.3.1, 3.3.1 |
| 3.3 | Modal 用 `useId()` + 初始 focus + focus restoration | 1h | 2.4.3 |
| 3.4 | Command 用 `useId()` + `aria-label` + 改 `role="combobox"` | 45 min | 4.1.2, 1.3.1 |
| 3.5 | Tooltip trigger 在子元素非 focusable 时加 `tabIndex={0}` | 20 min | 1.3.1, 2.1.1 |
| 3.6 | Button 加 `loading` prop + `aria-busy` + `<Spinner>` | 45 min | 4.1.2 |
| 3.7 | `--text-disabled` 提亮到 `#7A7A7A` | 2 min | 1.4.3 |
| 3.8 | Tabs 改 hidden 而非 unmount | 30 min | APG tabs |

**预期**：功能性 7.0 → 8.0

---

## 步骤 4：Showcase 不对称化 + 删 utility-orange（2 小时，+0.2 分）

| # | 任务 | 工作量 |
|---|------|--------|
| 4.1 | Showcase 主列改不对称布局：删 `max-width: 1000px; margin: 0 auto`；左 margin auto，右贴边 | 45 min |
| 4.2 | 删 `--utility-orange` token；nullframe 中使用处改 `var(--accent)` 或 `var(--text-primary)` | 1h |
| 4.3 | NavigationSection emoji icon 换 `<Glyph />` | 15 min |

**预期**：哲学一致性 7.1 → 7.3，视觉层级 7.5 → 7.6

---

## 步骤 5：P2 Polish（4 小时，+0.3 分）

按 ROI 排序：

1. **字体 fallback 链统一为 mono**（避免 Doto 未加载时掉到 sans-serif）—— 30 min
2. **`--radius-lg/xl` 缩到 2-4px**（更 industrial）—— 15 min
3. **Quotes 默认值改 Nothing/Braun 风格**（或留 `quotes` prop 让用户传）—— 30 min
4. **Quotes SVG 装饰环去化**（或赋予功能：剩余时间）—— 30 min
5. **compass-widget.css 加 dot-matrix 二级纹理**（与其他 widget 一致）—— 1h
6. **Widget 字体策略统一**（统一用 `var(--font-widget)` 而非各 widget 自定）—— 30 min
7. **showcase "排版 / Typography" 隐藏或挂内容** —— 15 min
8. **其余 off-grid 间距 / 圆角 / BEM 补全** —— 30 min

**预期**：5 维度 +0.1 平均

---

## ROI 矩阵

```
                    高 ROI
                      ▲
                      │  Step 1 (1h, +0.6)
                      │  Step 2 (3h, +0.5)
                      │  Step 3 (4h, +0.6)
                      │
                      │  Step 4 (2h, +0.2)
                      │  Step 5 (4h, +0.3)
                      │
   低 ROI ────────────┼────────────► 高工作量
```

**最优策略**：先做 Step 1 + Step 2（4h，+1.1），再 Step 3（4h，+0.6）= 8h 总投入达到 8.5/10。

---

## 不建议做的（会扣分）

| 行为 | 后果 |
|------|------|
| 加 Box-shadow 装饰 | 违反 stated 哲学，立刻扣 0.5 |
| 引入第二 event 色 | 双重 default，扣哲学一致性 0.3 |
| 把 Spinner 改成 inline + animated gradient | 反 slop 检查失败，扣 0.4 |
| 在 showcase 加 toast / skeleton | 违反 "no toast / no skeleton" 规则，扣 0.3 |
| 引入 Inter/Roboto | 字体选择扣 0.5（AI 默认） |
| 用 emoji 装饰 | 反 slop 检查失败，扣 0.2 |

---

## 长期路线（8.5 → 9.5）

| # | 任务 | 维度影响 |
|---|------|---------|
| 1 | 把 Doto / Space Mono / NDOT 47 全部用 `font-display: swap` + preload，避免 FOUT | 创新性 +0.2 |
| 2 | 所有 widget 添加 `prefers-reduced-motion` 支持 | 功能性 +0.2 |
| 3 | 添加 dark mode 自动切换 + `prefers-color-scheme` 检测 | 功能性 +0.2 |
| 4 | 提供 1 个"完全可玩的 demo app"展示系统能力 | 哲学一致性 +0.3 |
| 5 | 添加 Storybook 化文档（替代当前 dumi？） | 创新性 +0.2 |

---

**版本**：v1.0 / **生成日期**：2026-07-08
