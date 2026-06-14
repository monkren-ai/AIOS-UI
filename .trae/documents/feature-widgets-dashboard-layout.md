# 特色组件展示形式参考仪表板展示形式 - 实施计划

## 摘要

将 App.tsx 中 `feature-widgets` 分类的展示形式从当前"逐行 section + 标题"列表模式，改造为参考 NullframeDashboard 的 Bento 网格仪表板布局，使特色组件以卡片网格（带标签、动画入场）形式呈现。

## 当前状态分析

### 现状（`App.tsx` L1231-L1304）

`feature-widgets` 使用 7 个独立 `<section>` 区块展示组件：

* 每个 `<section>` 使用 `flexWrapSectionStyle`（flex-wrap + gap）样式

* `<h2>` 作为组件类型标题（天气组件、模拟时钟、数字时钟...）

* 组件直接散布在 section 中，无卡片包裹

### 目标参考（`NullframeDashboard.tsx`）

NullframeDashboard 的展示特征：

* **Bento 网格布局**：`display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: 200px 200px 185px 185px`

* **卡片包裹**：`NfCard` 组件包裹每个卡片（带标签、标签大号(元数据行、滑入入场动画)

* **入场动画**：motion.section 带弹簧动画（y:22, scale:0.93 → identity）

* **统一视觉**：所有卡片共享 `var(--surface)` 背景、`1px solid var(--border)` 边框、16px 圆角

* **响应式**：≤940px 切换到 2 列，≤520px 缩小内边距和字号

## 方案决策

### 复用 vs 新建

**决策：复用 NfCard 组件，新建独立的 Dashboard CSS 作为展示容器，新建 WidgetShowcaseCard body 组件用于展示各类组件。**

理由：

* NfCard 提供完整的标签、元数据行、入场动画逻辑，无需重写

* 新增 `widget-showcase.css` 避免污染 nullframe.css

* 新建 body 组件将现有组件渲染封装为仪表板卡片内容

### 实现方式

**决策：保持** **`feature-widgets`** **类别名称和位置不变，仅替换其内部 children 内容。**

理由：不改变 App.tsx 结构，不影响侧边栏锚点导航，不影响其他类别。

## 待实施变更

### 文件清单

| 文件                                                     | 操作     | 说明                                             |
| ------------------------------------------------------ | ------ | ---------------------------------------------- |
| `react/src/styles/widget-showcase.css`                 | **新建** | Widget 展示仪表板专用样式                               |
| `react/src/components/showcase/WidgetShowcase.tsx`     | **新建** | 展示仪表板容器组件                                      |
| `react/src/components/showcase/WidgetShowcaseCard.tsx` | **新建** | 展示卡片 body 组件（渲染各类型组件）                          |
| `react/src/App.tsx`                                    | **修改** | `feature-widgets` 类别内容替换为 `<WidgetShowcase />` |

### 详情

#### 1. `widget-showcase.css` - 仪表板样式（\~80 行）

```css
/* 命名空间 .widget-showcase 与 .nullframe-dashboard 隔离 */

.widget-showcase .bento {
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 10px;
}

/* 响应式 */
@media (max-width: 940px) {
  .widget-showcase .bento {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 190px;
    grid-auto-flow: dense;
  }
}
@media (max-width: 520px) {
  .widget-showcase .bento { gap: 8px; grid-auto-rows: 180px; }
}

/* varies 用于大卡片占据 2 列 */
.widget-showcase .card-wide { grid-column: span 2; }
.widget-showcase .card-tall { grid-row: span 2; }
```

#### 2. `WidgetShowcase.tsx` - 展示仪表板容器

参考 NullframeDashboard 的结构：

* `<div className="widget-showcase">` 作为命名空间

* `<main className="bento">` 作为网格容器

* 渲染多个 `<NfCard>`，每个 body 由对应的 WidgetShowcaseCard 组件渲染

Props: 无需额外 props（showcase 是静态展示）

映射关系（组件类型 → body 内容）：

* Weather card → WeatherWidget 以 card 模式渲染

* Weather wide → WeatherWidget 以 wide card 模式渲染

* Weather circular → WeatherWidget 以 circular 模式渲染

* Weather grid → WeatherWidget 以 grid 模式渲染

* Analog Clock → Time 以 analog 模式渲染

* Digital Clock → Time 以 digital-large 模式渲染

* Battery card → Battery 以 segmented + widgetMode="card" 模式渲染

* Battery ring → Battery 以 ring + widgetMode="ring" 模式渲染

* Date → DateWidget 以 serif 模式渲染

* Music → MusicPlayer 以 compact 模式渲染

* Photo → PhotoFrameWidget 以 square/pill 模式渲染

#### 3. `WidgetShowcaseCard.tsx` - 展示卡片内容组件

这是一个 body 组件，并非独立卡片。每个 body 接收具体组件实例作为 props。

实际上更简单的做法：直接在 WidgetShowcase.tsx 中渲染各组件实例并作为 `<NfCard body={...} />` 传入。

```tsx
// 示例结构
<NfCard
  index={0}
  label="Weather · Card"
  tag="LIVE"
  body={<WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" card />}
/>
```

#### 4. `App.tsx` 修改

`feature-widgets` 类别 L1231-L1304 替换为：

```tsx
<CategorySection id="feature-widgets" title={t('特色组件', 'Feature Widgets')}>
  <WidgetShowcase />
</CategorySection>
```

同时：

* 新增 import: `import { WidgetShowcase } from './components/showcase/WidgetShowcase'`

* 导入新 CSS: `import '@/styles/widget-showcase.css'`

## 假设与决策

1. **NfCard 可跨模块复用**：NfCard 作为独立组件存在，WidgetShowcase 可以直接 import。NfCard 依赖 CtlCtx，而 WidgetShowcase 不需要 telemetry/control 功能 → **WidgetShowcase 需要提供自己的 CtlCtx.Provider 或使用精简版卡片**。

   **决策：创建简化版卡片 ShowcaseCard，不依赖 CtlCtx**，仅保留：

   * 基础 layout（background/border/radius/padding）

   * 标签 tag（可省略）

   * 元数据行 label

   * 入场动画（motion.section）

   * 去除：焦点/focus/motionOff/autoSweep 相关逻辑

   * 去除：sweep shimmer 效果

   或采用更简单的方案：**直接让 WidgetShowcase 提供空 CtlCtx**，使 NfCard 正常运行。

   **最终决策：在 WidgetShowcase 中提供 mock CtlCtx（motionOff=false, focus=false），复用 NfCard**。这样不重复代码。

2. **不改变其他类别**：widget-layout、widget-ui、nullframe 等类别保持原样。

3. **组件展示顺序**：保持原有展示顺序（天气→时钟→电量→日期→音乐→相框），仅将线性布局改为网格布局。

## 验证步骤

1. 打开 `react` 项目 dev server
2. 导航到 "特色组件 / Feature Widgets" 类别
3. 验证组件以 Bento 网格卡片形式展示（4 列桌面端 / 2 列平板端）
4. 验证每张卡片包含标签（label）和内容
5. 验证卡片入场动画（从下方滑入 + opacity）
6. 验证悬停效果（border 边框颜色变化）
7. 验证深色/浅色主题切换时卡片正常渲染
8. 验证响应式断点（≤940px 2 列，≤520px 缩小）

