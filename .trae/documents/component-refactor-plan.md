# 组件重构计划：对齐 Nothing 设计语言

## 目标

将 `src/app/components/ui/` 下 50 个 shadcn/ui 组件从通用风格重构为 **Nothing 品牌设计语言**，与项目中 `NothingWidgets20.tsx` 的视觉风格保持一致。

---

## Nothing 设计语言特征分析

通过分析 `NothingWidgets20.tsx` 提取以下核心设计标记：

### 颜色体系
| 用途 | 色值 | 说明 |
|------|------|------|
| 深色背景 | `#1a1d1c` | 小部件卡片背景 |
| 浅色页面背景 | `#e1e5ea` | Nothing Widgets 页底色 |
| 近白色 | `#FCFAFE` | 浅色模式图标/文字 |
| 灰色文字 | `#aeabb1` | 辅助/次级文字 |
| 深灰色文字 | `#6c696e` | 更次级文字 |

### 字体
| 用途 | 字体 | 
|------|------|
| 标题/品牌文字 | `NDOT 47 (inspired by NOTHING)` |
| 正文 | `Roboto` |

### 圆角
- 小部件卡片：`rounded-[20px]`
- 整体风格：**大圆角、椭圆/胶囊形**

### 边框
- **极少使用可见边框**，主要通过色块区分层级
- 小部件无边框，仅靠背景色区分

### 间距
- 小部件之间：`gap-[40px]`
- 小部件内边距：`p-[16px]`
- 整体偏宽松

---

## 重构步骤

### Step 1: 更新主题令牌 (theme.css)

**文件**: `src/styles/theme.css`

| 变量 | 当前值 | 新值 | 原因 |
|------|--------|------|------|
| `--radius` | `0.625rem` | `1.25rem` (20px) | 对齐 Nothing 的 20px 大圆角 |
| `--primary` | `#030213` | `#1a1d1c` | 对齐 Nothing 深色主色 |
| `--primary-foreground` | `oklch(1 0 0)` | `#FCFAFE` | 近白色前景 |
| `--secondary` | `oklch(0.95 0.0058 264.53)` | `#e1e5ea` | 对齐 Nothing 浅灰底色 |
| `--secondary-foreground` | `#030213` | `#1a1d1c` | 深色文字 |
| `--muted` | `#ececf0` | `#e1e5ea` | 对齐浅灰 |
| `--muted-foreground` | `#717182` | `#6c696e` | 次级文字色 |
| `--accent` | `#e9ebef` | `#aeabb1` | 强调灰色 |
| `--accent-foreground` | `#030213` | `#1a1d1c` | |
| `--border` | `rgba(0,0,0,0.1)` | `rgba(0,0,0,0.06)` | 更淡的边框 |
| `--input-background` | `#f3f3f5` | `#e1e5ea` | 对齐浅灰 |
| `--switch-background` | `#cbced4` | `#aeabb1` | |
| `--background` | `#ffffff` | `#FCFAFE` | 近白 (Nothing 风格) |

同时更新 `.dark` 类对应的变量值。

### Step 2: 添加 Nothing 字体声明

**文件**: `src/styles/fonts.css`

- 添加 NDOT 47 字体的 `@font-face` 声明（如字体文件可用）
- 如字体文件不可用，使用系统后备字体并记录

**文件**: `src/styles/index.css`
- 在 `@layer base` 中设置 `body { font-family: 'Roboto', ... }` 
- 标题使用 `font-family: 'NDOT 47', ...`

### Step 3: 逐组件重构样式

以下按优先级排列，每个组件进行针对性调整：

#### 高优先级（基础交互组件）

1. **[button.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/button.tsx)**
   - 圆角：`rounded-md` → `rounded-2xl`
   - default variant: 背景改为 `bg-[#1a1d1c]`（Nothing 深色），保持 `hover:opacity-90`
   - 字体使用 Nothing 风格

2. **[input.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/input.tsx)**
   - 圆角：`rounded-md` → `rounded-xl`
   - 背景保持 `bg-input-background`
   - 边框淡化

3. **[badge.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/badge.tsx)**
   - 圆角：`rounded-md` → `rounded-full`（胶囊形，Nothing 特色）
   - 字体调整

4. **[card.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/card.tsx)**
   - 圆角：`rounded-xl` → `rounded-[20px]`（对齐小部件卡片）

5. **[switch.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/switch.tsx)**
   - 轨道圆角保持 `rounded-full`
   - 滑块颜色对齐

6. **[slider.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/slider.tsx)**
   - 轨道圆角保持 `rounded-full`
   - 滑块圆角保持

7. **[tabs.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/tabs.tsx)**
   - 列表圆角 `rounded-xl` → `rounded-2xl`

8. **[progress.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/progress.tsx)**
   - 轨道圆角 `rounded-full` 保持

9. **[dialog.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/dialog.tsx)**
   - 内容区圆角 `rounded-lg` → `rounded-2xl`

10. **[alert.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/alert.tsx)**
    - 圆角 `rounded-lg` → `rounded-2xl`

#### 中优先级（布局/导航组件）

11. **[accordion.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/accordion.tsx)** — trigger 圆角调整
12. **[avatar.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/avatar.tsx)** — 保持 `rounded-full`
13. **[breadcrumb.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/breadcrumb.tsx)** — 检查圆角
14. **[tooltip.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/tooltip.tsx)** — `rounded-md` → `rounded-xl`
15. **[popover.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/popover.tsx)** — 圆角调整
16. **[select.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/select.tsx)** — 圆角调整
17. **[textarea.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/textarea.tsx)** — 对齐 input 风格

#### 低优先级（复合/特定组件）

18. **[sheet.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/sheet.tsx)**
19. **[drawer.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/drawer.tsx)**
20. **[dropdown-menu.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/dropdown-menu.tsx)**
21. **[command.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/command.tsx)**
22. **[context-menu.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/context-menu.tsx)**
23. **[menubar.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/menubar.tsx)**
24. **[navigation-menu.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/navigation-menu.tsx)**
25. **[pagination.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/pagination.tsx)**
26. **[sidebar.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/sidebar.tsx)**
27. **[table.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/table.tsx)**
28. **[calendar.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/calendar.tsx)**
29. **[carousel.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/carousel.tsx)**
30. **[chart.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/chart.tsx)**
31. **[form.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/form.tsx)**
32. **[toggle.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/toggle.tsx)** / **[toggle-group.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/toggle-group.tsx)**
33. **[alert-dialog.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/alert-dialog.tsx)**
34. **[checkbox.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/checkbox.tsx)**
35. **[radio-group.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/radio-group.tsx)**
36. **[label.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/label.tsx)**
37. **[separator.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/separator.tsx)**
38. **[skeleton.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/skeleton.tsx)**
39. **[collapsible.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/collapsible.tsx)**
40. **[aspect-ratio.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/aspect-ratio.tsx)** — 无视觉变更
41. **[hover-card.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/hover-card.tsx)**
42. **[input-otp.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/input-otp.tsx)**
43. **[resizable.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/resizable.tsx)**
44. **[scroll-area.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/scroll-area.tsx)**
45. **[sonner.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/2.0/src/app/components/ui/sonner.tsx)**

### Step 4: 统一 "use client" 指令

- 检查每个组件是否需要 `"use client"`：
  - 使用 Radix UI 交互原语的组件 → 保留
  - 纯展示组件（如 separator, skeleton, aspect-ratio）→ 移除（可选，保持 Server Component 兼容）

### Step 5: 验证

- 运行 `pnpm dev` 启动开发服务器
- 检查所有组件编译无 TypeScript 错误
- 确认 Tailwind CSS 样式正常应用
- 在浏览器中抽查关键组件（Button, Card, Input, Badge, Dialog）视觉一致性

---

## 执行顺序

```
Step 1 (更新 theme.css 颜色/半径令牌)
  → Step 2 (字体声明)
    → Step 3 (逐组件样式重构，高→低优先级)
      → Step 4 ("use client" 清理)
        → Step 5 (验证)
```

## 涉及文件清单

| 操作 | 文件路径 | 说明 |
|------|----------|------|
| 修改 | `src/styles/theme.css` | 颜色、半径令牌更新 |
| 修改 | `src/styles/fonts.css` | 添加 NDOT 47 字体声明 |
| 修改 | `src/styles/index.css` | 全局字体设置 |
| 修改 | `src/app/components/ui/button.tsx` | 圆角 + 颜色 |
| 修改 | `src/app/components/ui/input.tsx` | 圆角 + 边框 |
| 修改 | `src/app/components/ui/badge.tsx` | 胶囊形 + 颜色 |
| 修改 | `src/app/components/ui/card.tsx` | 20px 圆角 |
| 修改 | `src/app/components/ui/dialog.tsx` | 圆角 |
| 修改 | `src/app/components/ui/tabs.tsx` | 圆角 |
| 修改 | `src/app/components/ui/alert.tsx` | 圆角 |
| 修改 | `src/app/components/ui/tooltip.tsx` | 圆角 |
| 修改 | `src/app/components/ui/popover.tsx` | 圆角 |
| 修改 | `src/app/components/ui/select.tsx` | 圆角 |
| 修改 | `src/app/components/ui/textarea.tsx` | 对齐 input |
| 修改 | `src/app/components/ui/sheet.tsx` | 圆角 |
| 修改 | `src/app/components/ui/drawer.tsx` | 圆角 |
| 修改 | `src/app/components/ui/dropdown-menu.tsx` | 圆角 |
| 修改 | `src/app/components/ui/command.tsx` | 圆角 |
| 修改 | `src/app/components/ui/context-menu.tsx` | 圆角 |
| 修改 | `src/app/components/ui/menubar.tsx` | 圆角 |
| 修改 | `src/app/components/ui/navigation-menu.tsx` | 圆角 |
| 修改 | `src/app/components/ui/breadcrumb.tsx` | 圆角 |
| 修改 | `src/app/components/ui/accordion.tsx` | 圆角 |
| 修改 | `src/app/components/ui/calendar.tsx` | 圆角 |
| 修改 | `src/app/components/ui/checkbox.tsx` | 圆角 |
| 修改 | `src/app/components/ui/radio-group.tsx` | 圆角 |
| 修改 | `src/app/components/ui/toggle.tsx` | 圆角 |
| 修改 | `src/app/components/ui/toggle-group.tsx` | 圆角 |
| 修改 | `src/app/components/ui/alert-dialog.tsx` | 圆角 |
| 修改 | `src/app/components/ui/hover-card.tsx` | 圆角 |
| 修改 | `src/app/components/ui/input-otp.tsx` | 圆角 |
| 修改 | `src/app/components/ui/pagination.tsx` | 圆角 |
| 修改 | `src/app/components/ui/sidebar.tsx` | 圆角 |
| 修改 | `src/app/components/ui/table.tsx` | 圆角 |
| 修改 | `src/app/components/ui/skeleton.tsx` | 圆角 |
| 修改 | `src/app/components/ui/separator.tsx` | 无（纯展示） |
| 不变 | `src/app/components/ui/avatar.tsx` | 已用 rounded-full |
| 不变 | `src/app/components/ui/progress.tsx` | 已用 rounded-full |
| 不变 | `src/app/components/ui/switch.tsx` | 已用 rounded-full |
| 不变 | `src/app/components/ui/slider.tsx` | 已用 rounded-full |
| 不变 | `src/app/components/ui/sonner.tsx` | toast 外观 |
| 不变 | `NothingWidgets20.tsx` | 保持原样 |

---

## 不需要做的

- ❌ 不改变组件 API（props、variants 签名不变）
- ❌ 不修改 Radix UI 行为逻辑
- ❌ 不改变组件文件结构/命名
- ❌ 不改变 NothingWidgets20.tsx
- ❌ 不新增 npm 依赖
