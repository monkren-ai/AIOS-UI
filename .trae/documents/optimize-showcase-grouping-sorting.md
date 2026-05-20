# 优化更新展示页组件分组及排序

## 问题分析

当前 `web-ui-kit/react/src/App.tsx` 展示页存在以下问题：

1. **无逻辑分组**：33 个组件以扁平列表展示，仅有 `<h2 style={demoTitleStyle}>` 作为标题，缺乏分组层级
2. **排序混乱**：基础 UI 组件（Buttons、Inputs）与功能 Widget（Caffeinate、Pomodoro）混排，无清晰逻辑
3. **重复展示**："Components" section 展示了 Card 示例，后面又有独立的 "Cards" section
4. **导航困难**：组件数量多，用户无法快速定位目标组件

## 当前排序（无分组）

Typography → Components → Clocks → Battery → Calendar → System Monitor → Music Player → Photo Carousel → Buttons → Inputs → Toggles → Tags → Segmented Control → Navigation → Cards → Data Rows → Data Grid → Progress Bar → Modal → Dropdown → Bottom Sheet → Date Nav → States → Caffeinate → Clipboard → Pomodoro → Walkie Talkie → Sun Dial → Age Motion → Chrono → Spinner → World Clock → Nothing Widgets 2.0

## 优化方案

### 新分组结构

```
1. 页面头部（Header）
   - Nothing UI 标题 + Design System 副标题 + 描述

2. 核心交互组件（Core Interaction）
   - Buttons
   - Inputs
   - Toggles
   - Tags
   - Segmented Control

3. 数据展示组件（Data Display）
   - Cards
   - Data Rows
   - Data Grid
   - Progress Bar

4. 覆盖层组件（Overlays）
   - Modal
   - Dropdown
   - Bottom Sheet

5. 导航与状态（Navigation & Status）
   - Navigation
   - Date Nav
   - States

6. 功能 Widget（Functional Widgets）
   - Clocks
   - Battery
   - Calendar
   - System Monitor
   - Music Player
   - Photo Carousel

7. 实用工具 Widget（Utility Widgets）
   - Caffeinate
   - Clipboard
   - Pomodoro
   - Walkie Talkie
   - Sun Dial
   - Age Motion
   - Chrono
   - Spinner
   - World Clock

8. Nothing Widgets 2.0（高级 Widget 系统）
   - Quick Toggles
   - Widget Cards
   - Wide Widgets
   - Dot Matrix Showcase
```

### 实施步骤

#### Step 1: 新增分组标题样式

在 `App.tsx` 中新增 `categoryTitleStyle`，用于分组大标题，与现有的 `demoTitleStyle`（组件标题）和 `groupTitleStyle` 形成三级层次：

- **categoryTitleStyle**（新增）：分组大标题，更大字号，带底部边框分隔线
- **demoTitleStyle**（现有）：组件标题，小号大写
- **groupTitleStyle**（现有）：组件内子标题

#### Step 2: 创建分组容器组件

新增 `CategorySection` 内联组件，封装分组标题 + 间距逻辑，统一分组间视觉分隔：

```tsx
function CategorySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'var(--space-4xl)' }}>
      <h2 style={categoryTitleStyle}>{title}</h2>
      {children}
    </div>
  )
}
```

#### Step 3: 重组 App.tsx 组件展示顺序

按新分组结构重新排列所有 `<section>` 块：

1. 删除原 "Components" section（与 "Cards" section 重复）
2. 将所有组件按新分组包裹在 `<CategorySection>` 中
3. 每个组件仍保留独立的 `<section style={sectionStyle}>` 用于间距

#### Step 4: 添加页面内快速导航

在页面头部区域添加锚点导航，允许用户快速跳转到各分组：

```tsx
<nav style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-2xl)' }}>
  {categories.map(cat => (
    <a href={`#${cat.id}`} key={cat.id} style={navLinkStyle}>{cat.label}</a>
  ))}
</nav>
```

各分组 `<CategorySection>` 添加对应 `id` 属性以支持锚点跳转。

#### Step 5: 验证

- 运行 `pnpm dev` 确认页面正常渲染
- 检查所有组件展示无遗漏
- 确认锚点导航跳转正确
- 确认分组标题视觉层次清晰

## 涉及文件

- `nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx` — 主要修改文件

## 新增样式定义

```tsx
const categoryTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--heading)',
  letterSpacing: '-0.02em',
  color: 'var(--text-display)',
  paddingBottom: 'var(--space-sm)',
  borderBottom: '1px solid var(--border-visible)',
  marginBottom: 'var(--space-2xl)',
  marginTop: 0
}
```

## 组件完整排序对照表

| 分组 | 组件 | 原 Section 标题 |
|------|------|-----------------|
| Core Interaction | Buttons | Buttons |
| Core Interaction | Inputs | Inputs |
| Core Interaction | Toggles | Toggles |
| Core Interaction | Tags | Tags |
| Core Interaction | Segmented Control | Segmented Control |
| Data Display | Cards | Cards |
| Data Display | Data Rows | Data Rows |
| Data Display | Data Grid | Data Grid |
| Data Display | Progress Bar | Progress Bar |
| Overlays | Modal | Modal |
| Overlays | Dropdown | Dropdown |
| Overlays | Bottom Sheet | Bottom Sheet |
| Navigation & Status | Navigation | Navigation |
| Navigation & Status | Date Nav | Date Nav |
| Navigation & Status | States | States |
| Functional Widgets | Clocks | Clocks |
| Functional Widgets | Battery | Battery |
| Functional Widgets | Calendar | Calendar |
| Functional Widgets | System Monitor | System Monitor |
| Functional Widgets | Music Player | Music Player |
| Functional Widgets | Photo Carousel | Photo Carousel |
| Utility Widgets | Caffeinate | Caffeinate |
| Utility Widgets | Clipboard | Clipboard |
| Utility Widgets | Pomodoro | Pomodoro |
| Utility Widgets | Walkie Talkie | Walkie Talkie |
| Utility Widgets | Sun Dial | Sun Dial |
| Utility Widgets | Age Motion | Age Motion |
| Utility Widgets | Chrono | Chrono |
| Utility Widgets | Spinner | Spinner |
| Utility Widgets | World Clock | World Clock |
| Nothing Widgets 2.0 | Quick Toggles | (子区域) |
| Nothing Widgets 2.0 | Widget Cards | (子区域) |
| Nothing Widgets 2.0 | Wide Widgets | (子区域) |
| Nothing Widgets 2.0 | Dot Matrix Showcase | (子区域) |
