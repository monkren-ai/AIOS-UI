# Nothing Widgets 2.0 组件展示修复计划

## 问题描述
1. 在 `App.tsx` 中，"Nothing Widgets 2.0" 部分目前只展示了部分组件（Quick Toggles、Widget Cards、Wide Widgets），
   但没有展示从 Figma 完整导出的原始 2.0 设计。
2. `NothingWidgets20.tsx` 文件中已经有完整的 Figma 导出组件 `NothingWidgets()`，
   但这个组件在当前 App 中完全没有被使用。

## 修复方案
在 `App.tsx` 的 "Nothing Widgets 2.0" 部分，增加一个新的分组 "Figma 2.0 完整展示"，
用来展示从 Figma 导出的完整 2.0 组件。

## 具体步骤

### 步骤 1：导入 NothingWidgets 组件
在 `App.tsx` 的 import 部分，增加：
```typescript
import NothingWidgets from './components/widgets/NothingWidgets20';
```

### 步骤 2：在 Nothing Widgets 2.0 部分增加新区域
在 "Dot Matrix Showcase" 之后，增加：
```tsx
<div style={{ marginTop: 'var(--space-xl)' }}>
  <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-md)' }}>
    Figma 2.0 完整展示
  </h3>
  <div style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px' }}>
    <NothingWidgets />
  </div>
</div>
```

### 步骤 3：检查并修复 CSS（如果需要）
- 确保 `widgets.css` 中的样式完整并且不会导致重叠问题
- 之前已修复了嵌套 CSS 问题

## 预期结果
在最终页面中，"Nothing Widgets 2.0" 部分将展示：
1. Quick Toggles
2. Widget Cards
3. Wide Widgets
4. Dot Matrix Showcase
5. **Figma 2.0 完整展示**（新增）

