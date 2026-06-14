# 整合 nullframe 到 Nothing UI — 执行计划

## 摘要

将 [nullframe](https://github.com/m1ckc3s/nullframe) 项目整合到 Nothing UI 中。React 19 升级、nullframe 系统层（telemetry/hooks/fake）、14 个组件文件、CSS 样式文件均已就位。**唯一缺失的是 App.tsx 中的导入和渲染**。

## 当前状态分析

| 项目 | 状态 |
|---|---|
| React 版本 | ✅ 已升级到 19.2.7 |
| motion 依赖 | ✅ 已添加 ^12.40.0 |
| tsconfig.json | ✅ 已更新 ES2022 |
| main.tsx | ✅ 已迁移 createRoot/StrictMode |
| system/telemetry.ts | ✅ 已创建 |
| system/hooks.ts | ✅ 已创建 |
| system/fake.ts | ✅ 已创建 |
| components/nullframe/ (14 文件) | ✅ 已创建 |
| styles/nullframe.css | ✅ 已创建 |
| App.tsx categories 条目 | ✅ 已添加 `{ id: 'nullframe', label: 'Nullframe Dashboard' }` |
| App.tsx NullframeDashboard 导入 | ❌ 缺失 |
| App.tsx nullframe.css 导入 | ❌ 缺失 |
| App.tsx NullframeDashboard 渲染 | ❌ 缺失 |
| Google Fonts (Doto, Space Mono, Space Grotesk) | ❓ 需检查 |

## 执行步骤

### Step 1: 检查 Google Fonts 加载

nullframe 使用了 3 个特殊字体：Doto、Space Mono、Space Grotesk。需检查 `index.html` 是否已加载这些字体，若未加载则添加。

**文件**: `src/index.html`（或项目根目录的 HTML 入口）

**操作**: 添加 Google Fonts `<link>` 标签（如缺失）：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Doto&family=Space+Grotesk:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Step 2: 更新 App.tsx — 添加导入

**文件**: `src/App.tsx`

在现有导入区域添加：
```tsx
import { NullframeDashboard } from './components/nullframe/NullframeDashboard'
import './styles/nullframe.css'
```

### Step 3: 更新 App.tsx — 添加 NullframeDashboard 渲染

**文件**: `src/App.tsx`

在最后一个 `</CategorySection>` (figma-20-library) 之后、`</div>` 之前，添加：
```tsx
<CategorySection id="nullframe" title="Nullframe Dashboard">
  <NullframeDashboard />
</CategorySection>
```

### Step 4: TypeScript 编译验证

```bash
npx tsc --noEmit
```

如有类型错误，逐一修复。

### Step 5: 运行开发服务器验证

```bash
npm run dev
```

在浏览器中检查：
- Nullframe Dashboard 分类是否显示在导航中
- 点击导航能否跳转到对应区域
- NullframeDashboard 的 bento grid 布局是否正常
- 时钟、FPS、内存等卡片是否正常渲染
- Cmd+K 命令面板是否可用

## 假设与决策

1. **NullframeDashboard 作为独立 CategorySection 渲染**：不修改其内部结构，保持 nullframe 的 bento grid 布局完整
2. **CSS 命名空间隔离**：nullframe.css 已使用 `.nullframe-dashboard` 前缀，不会与 Nothing UI 现有样式冲突
3. **字体加载**：通过 Google Fonts CDN 加载，与 nullframe 原项目一致
4. **不修改 nullframe 组件内部逻辑**：仅做接入，不做重构

## 验证步骤

1. `npx tsc --noEmit` — 零类型错误
2. `npm run dev` — 开发服务器正常启动
3. 浏览器检查 — Nullframe Dashboard 区域完整显示，所有卡片正常工作
4. 导航跳转 — 点击 "Nullframe Dashboard" 导航链接可跳转到对应区域
