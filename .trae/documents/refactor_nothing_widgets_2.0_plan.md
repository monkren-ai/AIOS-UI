# Nothing Widgets 2.0 重构为 UI Kit 组件计划

## 目标
将 `NothingWidgets20.tsx` 中的 Figma 导出硬编码组件，转换为真实的、可复用的、参数化的 UI Kit 组件。

## 发现的组件类别
从 Figma 截图分析，主要有以下几类组件需要重构：

### 1. WidgetIcon - 圆形图标组件
- 尺寸：68x68px
- 主题：light / dark / accent / red (错误状态)
- 功能：显示图标，可选显示标签

### 2. WidgetPill - 胶囊按钮组件
- 尺寸：152x68px
- 主题：light / dark / accent
- 功能：显示文本或图标

### 3. WidgetSquare - 方形卡片组件
- 尺寸：152x152px
- 主题：light / dark / accent
- 内容：多行文本、图标等

### 4. WidgetWide - 宽卡片组件
- 尺寸：304x152px
- 主题：light / dark / accent
- 内容：更复杂的布局

### 5. GlyphComponent - 点阵图标组件
- 多种点阵图案
- 主题：light / dark

## 执行步骤

### 步骤 1：创建基础 WidgetIcon 组件
- 文件：`components/widgets/WidgetIcon.tsx`
- CSS：`styles/widget-icon.css`
- 参数：
  - `icon`: 图标 SVG 或图标名称
  - `theme`: 'light' | 'dark' | 'accent' | 'error'
  - `label?`: 可选显示的文字标签
  - `size?`: 'sm' | 'md' (默认 68px)

### 步骤 2：创建 WidgetPill 组件
- 文件：`components/widgets/WidgetPill.tsx`
- CSS：`styles/widget-pill.css`
- 参数：
  - `children`: 内容
  - `theme`: 'light' | 'dark' | 'accent'
  - `onClick?`: 点击事件
  - `icon?`: 可选图标

### 步骤 3：创建 WidgetSquare 组件
- 文件：`components/widgets/WidgetSquare.tsx`
- CSS：`styles/widget-square.css`
- 参数：
  - `theme`: 'light' | 'dark' | 'accent'
  - `title?`: 标题
  - `children`: 内容
  - `icon?`: 图标

### 步骤 4：创建 WidgetWide 组件
- 文件：`components/widgets/WidgetWide.tsx`
- CSS：`styles/widget-wide.css`
- 参数：
  - `theme`: 'light' | 'dark' | 'accent'
  - `children`: 内容

### 步骤 5：创建 Glyph 点阵图标集合
- 文件：`components/widgets/Glyphs.tsx`
- 导出所有点阵图标
- 提供 `Glyph` 组件来渲染

### 步骤 6：更新 App.tsx
- 用新创建的真实组件替换原有的硬编码组件
- 保持设计的完整性

## 预期结果
从不可复用的 Figma 导出代码，变为：
- 真实的、参数化的组件
- 符合项目现有的 BEM + CSS 变量架构
- 完全可复用
- 类型安全的 TypeScript

