# 组件集成计划

## 现状分析

- **50 个 shadcn/ui 组件** 已存在于 `src/app/components/ui/` 目录
- **React Router 7.13.0** 已安装但未使用
- **唯一的页面** `App.tsx` 仅渲染 `NothingWidgets20` 组件
- **没有组件统一导出索引**（barrel export）
- **没有页面路由系统**

---

## 集成步骤

### Step 1: 创建组件统一导出索引
**文件**: `src/app/components/ui/index.ts`

- 将所有 50 个 UI 组件通过 barrel export 统一导出
- 同时导出 `ImageWithFallback` 组件
- 导出 `utils.ts` 中的 `cn` 工具函数
- 优点：外部只需 `import { Button, Card, ... } from "@/app/components/ui"` 一行导入即可

### Step 2: 建立页面路由结构
**涉及文件**:
- `src/app/pages/Home.tsx` — 首页（保留现有 NothingWidgets 内容）
- `src/app/pages/Components.tsx` — 组件展示页
- `src/app/App.tsx` — 改造为路由入口

**操作**:
- 将 `App.tsx` 中现有的 NothingWidgets 渲染逻辑抽到 `pages/Home.tsx`
- 使用 React Router 的 `BrowserRouter` / `Routes` / `Route` 设置两条路由：
  - `/` → `Home` 页面（NothingWidgets）
  - `/components` → `Components` 页面（组件展示）
- `App.tsx` 添加导航栏，允许在首页和组件展示页之间切换

### Step 3: 创建组件展示页面
**文件**: `src/app/pages/Components.tsx`

按类别分组展示所有可用组件，至少包含以下分类：

| 分类 | 组件 |
|------|------|
| **基础元素** | Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Slider |
| **布局** | Card, Separator, AspectRatio, Resizable, ScrollArea |
| **导航** | Breadcrumb, NavigationMenu, Pagination, Tabs, Sidebar |
| **反馈** | Alert, AlertDialog, Dialog, Drawer, Sheet, Sonner(Toast), Skeleton, Progress, Tooltip, HoverCard, Popover |
| **数据展示** | Avatar, Badge, Table, Chart, Calendar, Carousel, Accordion, Collapsible, Command |
| **其他** | DropdownMenu, ContextMenu, Menubar, Toggle, ToggleGroup, Form |

每个组件展示包含：
- 组件名称标题
- 基础用法代码示例（静态展示）
- 交互式演示（如点击 Button 触发 Toast）

### Step 4: 添加 Layout 布局组件
**文件**: `src/app/components/ui/layout.tsx`（可选）

- 创建一个简单的 `Layout` 组件包装导航和内容区域
- 包含顶部导航栏，链接到首页和组件页面
- 支持暗色模式切换（利用已有的 next-themes）

### Step 5: 验证与修复
- 运行 `pnpm dev` 启动开发服务器
- 检查所有组件导入是否正常，无 TypeScript 报错
- 确保 Tailwind CSS 样式正常工作
- 测试暗色模式切换

---

## 执行顺序

```
Step 1 (组件索引导出)
  → Step 2 (路由 + 页面结构)
    → Step 3 (组件展示页)
      → Step 4 (Layout 导航)
        → Step 5 (验证)
```

## 涉及的关键文件

| 操作 | 文件路径 |
|------|----------|
| 新建 | `src/app/components/ui/index.ts` |
| 新建 | `src/app/pages/Home.tsx` |
| 新建 | `src/app/pages/Components.tsx` |
| 修改 | `src/app/App.tsx` |
| 可能新建 | `src/app/components/ui/layout.tsx` |

---

## 不需要做的

- ❌ 不需要修改 `NothingWidgets20.tsx`（保持原样不变）
- ❌ 不需要修改任何已有的 `src/app/components/ui/*.tsx` 组件文件
- ❌ 不需要新增 npm 依赖（React Router 已安装）
- ❌ 不需要修改 `vite.config.ts`、`package.json`、样式文件等配置文件
