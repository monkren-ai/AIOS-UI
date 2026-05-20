# 修复新增样式未展示问题

## 问题分析

通过对当前 `App.tsx` 和新增组件的全面排查，发现以下问题：

### 问题 1: 导航栏缺少 "UI Primitives" 入口

[App.tsx:L203](file:///c:/Users/monkr/Documents/github/Nothing/UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx#L203) 的 `categories` 数组定义了 7 个分组，但第 8 个分组 "UI Primitives"（包含 Accordion、AlertDialog、Checkbox 等 30+ 个新组件）未在导航栏中列出，用户无法通过锚点跳转到该区域，可能造成"样式未展示"的误解。

### 问题 2: ProgressBar `slim` 变体 CSS 类名冲突

[ProgressBar.tsx:L46-L52](file:///c:/Users/monkr/Documents/github/Nothing/UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/ProgressBar.tsx#L46-L52) 中当 `variant='slim'` 时，`size` 默认值为 `'standard'`，导致元素同时拥有 `nothing-progress--standard` 和 `nothing-progress--slim` 两个类名。当前 CSS 中 `--slim` 通过源码顺序覆盖 `--standard`，但这依赖 CSS 文件加载顺序，不够健壮。

- `nothing-progress--standard .nothing-progress__track { height: 10px; }` (progress-bar.css:L79)
- `nothing-progress--slim .nothing-progress__track { height: 4px; gap: 1px; }` (progress-bar.css:L95)

如果浏览器缓存或加载顺序变化，`--standard` 可能覆盖 `--slim` 导致样式不生效。

### 问题 3: ProgressBar `slim` 变体中 label 属性被忽略

[ProgressBar.tsx:L59-L78](file:///c:/Users/monkr/Documents/github/Nothing/UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/ProgressBar.tsx#L59-L78) 中 slim 变体直接返回一个不包含 readout 的简化 DOM，完全忽略了 `label` 属性。CSS 中也通过 `display: none` 隐藏了 readout。这可能是设计意图，但如果用户传了 `label` 却看不到，会造成困惑。

## 修复方案

### Step 1: 修复 ProgressBar slim 变体 CSS 类名冲突

修改 [ProgressBar.tsx:L46-L52](file:///c:/Users/monkr/Documents/github/Nothing/UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/ProgressBar.tsx#L46-L52) 中的 `classNames` 构建逻辑：当 `variant='slim'` 时，不应添加 `nothing-progress--${size}` 类名（即不应添加 `--standard`），避免与 `--slim` 冲突。

```tsx
const classNames = [
  'nothing-progress',
  variant === 'slim' ? '' : `nothing-progress--${size}`,
  variant === 'slim' ? 'nothing-progress--slim' : '',
  indeterminate ? 'nothing-progress--indeterminate' : '',
  disabled ? 'nothing-progress--disabled' : ''
].filter(Boolean).join(' ')
```

### Step 2: 在导航栏增加 "UI Primitives" 入口

在 [App.tsx:L203](file:///c:/Users/monkr/Documents/github/Nothing/UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx#L203) 的 `categories` 数组中追加：

```tsx
{ id: 'ui-primitives', label: 'UI Primitives' }
```

### Step 3: 验证

- 运行 `npx tsc --noEmit` 确认编译通过
- 启动 dev server 验证：
  - ProgressBar slim 变体视觉效果正确（4px 高度、1px 间隙）
  - 导航栏 "UI Primitives" 链接可点击跳转
  - 锚点跳转后 `scrollMarginTop` 正确避免遮挡

## 涉及文件

| 文件 | 修改内容 |
|------|---------|
| `nothing-design-skill/nothing-design/web-ui-kit/react/src/components/ProgressBar.tsx` | 修复 classNames 构建逻辑，避免 --standard 与 --slim 共存 |
| `nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx` | categories 数组追加 UI Primitives 入口 |
