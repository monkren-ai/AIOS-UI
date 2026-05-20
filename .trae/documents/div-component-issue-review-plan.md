# `div` 组件问题审查计划

## 审查背景

在 Nothing UI 设计系统中，`<div>` 是使用频率最高的 HTML 元素，但项目**不存在专门的 div 抽象组件**（如 Box、Stack、Flex 等）。本次审查旨在识别与 `div` 使用相关的所有问题，并制定修复方案。

---

## 问题清单

### 问题 1：缺少通用布局原语组件

**现状：** 项目中没有 `Box`、`Stack`、`Flex` 等通用布局组件来抽象 `<div>`。现有的容器组件（Cards、WidgetCard、WidgetGrid）都带有特定语义结构（标题、操作、底部），无法作为通用布局原语使用。

**影响：** 开发者只能直接使用 `<div>` + 内联样式或手动写 BEM class，导致样式碎片化、不可复用。

**规范依据：** [SKILL.md](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/SKILL.md) 2.4 Container Strategy 定义了容器策略优先级（间距 > 分隔线 > 边框 > 表面卡片），但缺少对应的组件化实现。

**修复方案：** 创建以下通用布局组件：

| 组件 | 职责 | Props |
|------|------|-------|
| `Box` | 通用 div 抽象，支持 padding/margin/border/radius/background | `p`, `m`, `bg`, `border`, `radius`, `as` (多态) |
| `Stack` | 垂直/水平堆叠布局 | `direction`, `gap`, `align`, `justify` |
| `Grid` | CSS Grid 布局容器 | `cols`, `gap`, `align` |

**实施步骤：**

1. 在 `references/components.md` 中新增第 16 类组件规范 "LAYOUT PRIMITIVES"
2. 创建 `css/box.css`、`css/stack.css`、`css/grid.css` 样式文件
3. 创建 `js/box.js`、`js/stack.js`、`js/grid.js` Vanilla JS 组件
4. 创建 `react/src/components/Box.tsx`、`Stack.tsx`、`Grid.tsx` React 组件
5. 在 SKILL.md 组件列表中添加这三个组件
6. 更新 `supplement-components.md` 路线图

---

### 问题 2：App.tsx 大量使用内联样式

**现状：** [App.tsx](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx) 中存在 **30+ 处** `style={{}}` 内联样式，与组件库自身的 BEM class 模式严重不一致。

**典型问题代码：**

```tsx
// App.tsx 第 163 行
<div style={{ maxWidth: '800px', margin: '0 auto' }}>

// App.tsx 第 193-198 行
<div style={{
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  padding: 'var(--space-lg)',
  marginBottom: 'var(--space-md)'
}}>
```

**影响：** 演示页面未遵循组件库自身的模式，给使用者传递错误信号。

**修复方案：**

1. 将 `demoTitleStyle` 和 `sectionStyle` 提取为 CSS class（`.nothing-demo-title`、`.nothing-demo-section`）
2. 创建 `css/demo.css` 演示页专用样式文件
3. 将 App.tsx 中所有内联样式替换为 BEM class
4. 利用问题 1 中创建的 Box/Stack/Grid 组件重构布局代码

**实施步骤：**

1. 创建 `react/src/styles/demo.css`
2. 定义 `.nothing-demo-title`、`.nothing-demo-section`、`.nothing-demo-container`、`.nothing-demo-grid`、`.nothing-demo-flex` 等 class
3. 逐段替换 App.tsx 中的内联样式为 className
4. 验证所有组件渲染效果不变

---

### 问题 3：语义化 HTML 不足

**现状：** 多个组件中 `<div>` 被用于应使用语义化标签的场景。

**问题清单：**

| 文件 | 问题代码 | 应替换为 |
|------|---------|---------|
| States.tsx | `<div className="nothing-state__headline">` | `<h3>` |
| MusicPlayer.tsx | `<div className="player-title">` | 标题标签 |
| MusicPlayer.tsx | `<div className="player-artist">` | 标题标签 |
| Modal.tsx | backdrop `<div>` | `<dialog>` 或带 role 的 div |
| BottomSheet.tsx | backdrop `<div>` | `<aside>` 或带 role 的 div |
| App.tsx | `<div style={demoTitleStyle}>Typography</div>` | `<h2>` |

**修复方案：** 逐个替换为语义化 HTML 元素，同时保持 BEM class 不变。

**实施步骤：**

1. 审查所有 React 组件中的 div 使用，标记需要语义化的位置
2. 替换标题类 div 为 `<h1>`-`<h6>`
3. 替换导航类 div 为 `<nav>`
4. 为 Modal/BottomSheet backdrop 添加 `role="dialog"` 和 `aria-modal="true"`
5. 验证样式和功能不受影响

---

### 问题 4：Vanilla JS 与 React 的 div 创建方式不统一

**现状：** Vanilla JS 通过 `document.createElement('div')` 动态创建，React 在 JSX 中直接写 `<div>`。两者目的相同但范式完全不同，且 Vanilla JS 组件中大量硬编码 `createElement('div')`。

**修复方案：** 在 Vanilla JS 中引入轻量辅助函数，统一元素创建方式。

**实施步骤：**

1. 在 `js/utils.js` 中创建 `createElement(tag, className, attrs)` 辅助函数
2. 逐步重构 Vanilla JS 组件使用辅助函数
3. 保持与 React 组件的 BEM class 命名一致性

---

### 问题 5：Figma 导出代码质量低

**现状：** `.figma/` 目录下的自动导出代码存在严重问题：

- 所有元素映射为 `<div>`，无语义化
- 类名为自动生成的 `autoWrapper*`、`bG*`、`ellipse*`
- 大量硬编码像素值，未使用设计 token
- 深层嵌套 SCSS，无 BEM 规范

**修复方案：** Figma 导出代码作为参考，不直接纳入组件库。但需要建立导出代码到组件库的转换规范。

**实施步骤：**

1. 在 SKILL.md 或单独文档中定义 "Figma 导出转换规范"
2. 明确 `.figma/` 目录代码仅作为视觉参考
3. 规定转换时必须：使用 BEM 命名、替换硬编码值为 token、语义化 HTML

---

### 问题 6：CSS 中缺少 div 基础重置

**现状：** [tokens.css](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/css/tokens.css) 仅有 `* { box-sizing: border-box; }`，没有针对 div 的基础重置（如 margin: 0）。

**影响：** 浏览器默认的 div margin 可能在某些场景下造成意外间距。

**修复方案：** 在 tokens.css 中添加基础重置规则。

**实施步骤：**

1. 在 tokens.css 的全局重置部分添加 `div { margin: 0; }` 或纳入更完整的 reset
2. 验证不破坏现有组件样式

---

## 实施优先级

| 优先级 | 问题 | 理由 |
|--------|------|------|
| P0 | 问题 1：创建布局原语组件 | 是其他问题的基础，解决根本性缺失 |
| P0 | 问题 2：App.tsx 内联样式清理 | 演示页面应作为最佳实践范例 |
| P1 | 问题 3：语义化 HTML | 可访问性改进，影响 SEO 和无障碍 |
| P1 | 问题 6：CSS 基础重置 | 防御性修复，防止潜在样式问题 |
| P2 | 问题 4：Vanilla JS 统一 | 代码质量改进，不影响功能 |
| P2 | 问题 5：Figma 导出规范 | 文档性质，不涉及代码变更 |

---

## 验证标准

1. 所有新组件（Box/Stack/Grid）在 React 和 Vanilla JS 中功能一致
2. App.tsx 中零内联样式（除动态计算的样式外）
3. 所有语义化替换后组件渲染效果不变
4. `npm run build` / `npm run lint` 通过
5. 深色/浅色主题切换正常
