# Nothing-UI 重构计划：借鉴 lobehub/lobe-ui 架构模式

> 参考项目：https://github.com/lobehub/lobe-ui
> 设计原则：保持 Nothing 设计语言风格不变，借鉴 lobe-ui 的工程化架构

## 摘要

将当前 Nothing-UI 项目从"平铺式组件文件 + 巨型 App.tsx"重构为"一组件一目录 + ConfigProvider + 文档系统 + 测试 + npm 包发布能力"的现代化组件库架构。保持纯 CSS + cva + clsx 技术栈与 Nothing 视觉风格，引入 @base-ui/react 替代手写复杂组件，新增 dumi 文档、vitest 测试、husky 工程化套件与 tsdown 构建能力。

## 当前状态分析

### 项目位置
`/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react`

### 现有架构
- **技术栈**：React 19 + TypeScript 6 + Vite 8 + 纯 CSS + cva + clsx + motion
- **组件数**：60+ 组件，平铺在 `src/components/*.tsx`
- **样式**：80+ CSS 文件集中在 `src/styles/`，BEM 命名（`nothing-xxx`）
- **入口**：`src/App.tsx`（1262 行巨型展示页）
- **设计令牌**：`src/styles/tokens.css`（完整但存在冗余）

### 核心问题
1. `App.tsx` 1262 行，难以维护
2. 组件平铺无目录隔离，样式与组件分离
3. `COMPONENTS.md` 与代码不同步
4. 受控/非受控 API 不统一（Switch 用 `on`，Slider 用 `value`）
5. `Input` 缺少 `forwardRef`
6. `mergeRefs` 在 `lib/utils.ts` 和 `lib/slot.tsx` 重复定义
7. Tailwind 安装但未使用
8. `tokens.css` 中 `#D71921` 重复定义 6 次
9. nullframe 对 system 层强耦合
10. `Wedget` 拼写错误
11. 缺少组件 JSDoc 文档
12. 缺少测试与文档系统

### lobehub/lobe-ui 借鉴点
- **一组件一目录**：`src/Button/{Button.tsx, style.ts, type.ts, index.ts, index.md, demos/}`
- **ConfigProvider**：统一配置（theme、motion、locale）
- **MotionProvider**：动画组件注入
- **多入口导出**：`@lobehub/ui/chat`、`@lobehub/ui/mobile` 等
- **tsdown 构建**：unbundle 模式，多入口
- **dumi 文档**：每个组件 index.md + demos/
- **vitest 测试**：核心组件单测
- **husky + commitlint + lint-staged**：工程化
- **@base-ui/react**：无头组件库

## 决策与假设

### 决策
1. **技术栈**：混合方案 - 保持纯 CSS + cva + clsx 主体，引入 @base-ui/react 替代手写复杂组件（Modal/Popover/Menu 等）
2. **范围**：全量重构所有 60+ 组件
3. **工程化**：dumi 文档 + vitest 测试 + husky 工程化套件 + tsdown npm 包发布

### 假设
- 重构期间保持现有视觉风格不变（Nothing 红色 #D71921、Doto/Space Grotesk/Space Mono 字体、BEM 命名）
- 现有 `tokens.css` 设计令牌体系保留，仅去重
- 现有 `lib/` 工具函数保留（cn、dataAttr、mergeRefs、Slot、polymorphic）
- nullframe 仪表盘作为高级演示保留，但解耦 system 层

## 重构阶段

### 阶段 1：基础设施搭建（Foundation）

#### 1.1 安装新依赖
- `@base-ui/react` - 无头组件库
- `dumi` + `dumi-theme-lobehub` - 文档系统
- `vitest` + `@testing-library/react` + `jsdom` - 测试
- `tsdown` - 构建工具
- `husky` + `commitlint` + `lint-staged` - 工程化
- `@commitlint/cli` + `@commitlint/config-conventional` - 提交规范

#### 1.2 创建 ConfigProvider
- 新建 `src/ConfigProvider/index.tsx`
- 提供 `theme`（light/dark）、`motion`（motion 组件）、`locale` 配置
- 创建 `ConfigContext` 与 `useConfig` hook
- 兼容现有 `data-theme` 属性切换机制

#### 1.3 创建 ThemeProvider
- 新建 `src/ThemeProvider/index.tsx`
- 封装 `data-theme` 属性切换
- 提供 `useTheme` hook（返回 `theme`、`setTheme`、`toggleTheme`）
- 与现有 `tokens.css` 协同

#### 1.4 创建 MotionProvider
- 新建 `src/MotionProvider/index.tsx`
- 注入 motion 组件（支持 LazyMotion）
- 提供 `useMotionComponent` hook

#### 1.5 重构 tokens.css
- 去重 `#D71921`（统一为 `--accent`，其他引用 `var(--accent)`）
- 去重 `--radius-lg` 和 `--radius-xl`
- 规范间距命名（移除 `sm-plus`、`md-plus` 等非标准命名，改为 `sm-2`、`md-2` 或合并）
- 保留所有现有令牌名称以维持向后兼容

#### 1.6 配置 tsdown 构建
- 新建 `tsdown.config.ts`
- 动态扫描 `src/*/index.ts` 作为多入口
- ESM 输出，dts 生成
- 配置 `package.json` 的 `exports` 字段

#### 1.7 配置 dumi 文档
- 新建 `.dumirc.ts`
- 配置 `dumi-theme-lobehub` 主题
- 配置导航与分组

#### 1.8 配置 vitest
- 新建 `vitest.config.ts`
- 配置 jsdom 环境
- 配置 `@testing-library/react`

#### 1.9 配置工程化套件
- 新建 `commitlint.config.mjs`
- 新建 `.husky/pre-commit`、`.husky/commit-msg`
- 配置 `lint-staged`

### 阶段 2：核心库重构（Core Libs）

#### 2.1 重构 lib/utils.ts
- 移除重复的 `mergeRefs`（统一从 `lib/slot.tsx` 导出或新建 `lib/refs.ts`）
- 保留 `cn`、`dataAttr`
- 添加 JSDoc

#### 2.2 重构 lib/variants.ts
- 保留所有共享变体
- 添加 JSDoc

#### 2.3 重构 lib/slot.tsx
- 修复 `as unknown as` 类型断言
- 添加 JSDoc

#### 2.4 重构 lib/polymorphic.ts
- 添加 JSDoc

#### 2.5 创建统一导出
- 新建 `src/index.ts`
- 统一导出所有组件、类型、工具

### 阶段 3：组件目录化重构（Components Migration）

#### 3.1 目录结构规范
每个组件迁移到：
```
src/ComponentName/
├── ComponentName.tsx      # 主组件实现
├── ComponentName.css      # 组件样式（从 styles/ 迁移）
├── style.ts              # cva 变体定义（可选，从组件中抽取）
├── type.ts               # 类型定义（从组件中抽取）
├── index.ts              # 导出
├── index.md              # dumi 文档
└── demos/                # 示例
    └── index.tsx
```

#### 3.2 组件迁移清单（按类别）

**表单类（13 个）**
- Buttons.tsx → Button/
- Inputs.tsx → Input/（补充 forwardRef）
- Switch.tsx → Switch/（统一 API 为 `checked`/`onCheckedChange`）
- Slider.tsx → Slider/
- Checkbox.tsx → Checkbox/
- RadioGroup.tsx → RadioGroup/
- Textarea.tsx → Textarea/
- Label.tsx → Label/
- InputOTP.tsx → InputOTP/
- Form.tsx → Form/
- Tags.tsx → Tag/
- SegmentedControl.tsx → SegmentedControl/
- Toggle.tsx → Toggle/

**数据展示类（8 个）**
- Card.tsx → Card/
- ui/DataTable.tsx → DataTable/
- ProgressBar.tsx → ProgressBar/
- Badge.tsx → Badge/
- Avatar.tsx → Avatar/
- Separator.tsx → Separator/
- DotMatrix.tsx → DotMatrix/
- Quotes.tsx → Quotes/

**反馈类（9 个）**
- Modal.tsx → Modal/（迁移到 @base-ui/react）
- Sheet.tsx → Sheet/（迁移到 @base-ui/react）
- Popover.tsx → Popover/（迁移到 @base-ui/react）
- HoverCard.tsx → HoverCard/（迁移到 @base-ui/react）
- Tooltip.tsx → Tooltip/（迁移到 @base-ui/react）
- Alert.tsx → Alert/
- States.tsx → States/
- Spinner.tsx → Spinner/
- ErrorBoundary.tsx → ErrorBoundary/

**导航类（8 个）**
- Navigation.tsx → Navigation/
- DateNav.tsx → DateNav/
- Tabs.tsx → Tabs/
- Breadcrumb.tsx → Breadcrumb/
- Pagination.tsx → Pagination/
- NavigationMenu.tsx → NavigationMenu/
- Sidebar.tsx → Sidebar/
- Taskbar.tsx → Taskbar/

**菜单类（6 个）**
- Accordion.tsx → Accordion/
- Select.tsx → Select/
- ContextMenu.tsx → ContextMenu/（迁移到 @base-ui/react）
- DropdownMenu.tsx → DropdownMenu/（迁移到 @base-ui/react）
- Command.tsx → Command/
- Collapsible.tsx → Collapsible/

**布局类（5 个）**
- ScrollArea.tsx → ScrollArea/
- Resizable.tsx → Resizable/
- AspectRatio.tsx → AspectRatio/
- Clipboard.tsx → Clipboard/
- ui/OverlayPortal.tsx → OverlayPortal/

**时钟与日历（7 个）**
- Calendar.tsx → Calendar/
- Date.tsx → Date/
- SunDial.tsx → SunDial/
- Chrono.tsx → Chrono/
- AgeMotion.tsx → AgeMotion/
- NextEvent.tsx → NextEvent/

**系统监控（8 个）**
- Battery.tsx → Battery/
- SystemMonitor.tsx → SystemMonitor/
- QuickToggle.tsx → QuickToggle/
- MusicPlayer.tsx → MusicPlayer/
- PhotoCarousel.tsx → PhotoCarousel/
- Caffeinate.tsx → Caffeinate/
- Pomodoro.tsx → Pomodoro/
- WalkieTalkie.tsx → WalkieTalkie/

#### 3.3 widgets 目录重构
- `src/components/widgets/` → `src/widgets/`
- 修正 `Wedget` → `Widget` 拼写错误
- `widgets/sub/` → `src/widgets/sub/`

#### 3.4 nullframe 目录重构
- `src/components/nullframe/` → `src/nullframe/`
- 解耦 `system` 层依赖（通过 props 注入而非直接 import）
- 保留为高级演示

### 阶段 4：App.tsx 拆分

#### 4.1 创建展示页结构
```
src/showcase/
├── index.tsx              # 展示页入口
├── sections/              # 各分类区段
│   ├── CoreInteractionSection.tsx
│   ├── DataDisplaySection.tsx
│   ├── FeedbackSection.tsx
│   ├── NavigationSection.tsx
│   ├── MenuSection.tsx
│   ├── LayoutSection.tsx
│   ├── ClockCalendarSection.tsx
│   ├── SystemMonitorSection.tsx
│   ├── WidgetsSection.tsx
│   └── NullframeSection.tsx
├── components/            # 展示页专用组件
│   ├── DemoCard.tsx
│   ├── SectionTitle.tsx
│   ├── FloatingControls.tsx
│   └── ThemeToggle.tsx
└── styles/                # 展示页样式
```

#### 4.2 消除内联样式硬编码
- 提取 `demoTitleStyle`、`groupTitleStyle` 等到 CSS 类
- 替换硬编码的 `150px`、`220px`、`250px`、`24px` 为设计令牌
- 替换 `zIndex: 10` 为 `var(--z-overlay)`

### 阶段 5：文档与测试

#### 5.1 dumi 文档
- 每个组件添加 `index.md`（API 表格 + 用法说明）
- 每个组件添加 `demos/index.tsx`（基础示例）
- 同步 `COMPONENTS.md` 或废弃

#### 5.2 vitest 测试
- 核心组件单测（Button、Input、Switch、Slider、Modal、Accordion）
- 测试覆盖：渲染、交互、可访问性、变体
- 配置 `test:coverage` 脚本

### 阶段 6：清理与发布

#### 6.1 清理
- 移除未使用的 Tailwind 依赖（或保留 preflight: false）
- 删除空的 `src/styles/` 旧文件（已迁移到组件目录）
- 修复所有 TypeScript 错误
- 运行 `lint:circular` 检查循环依赖

#### 6.2 npm 包发布能力
- 配置 `package.json` 的 `exports`、`files`、`sideEffects`
- 配置 `clean-package`
- 验证 `tsdown` 构建
- 验证 `npm pack` 输出

#### 6.3 更新 package.json scripts
```json
{
  "dev": "dumi dev",
  "build": "tsdown && npm run build:packages",
  "build:packages": "tsx ./scripts/build.ts",
  "docs:build": "dumi build",
  "test": "vitest",
  "test:coverage": "vitest run --coverage",
  "lint": "eslint src --ext ts,tsx",
  "lint:circular": "dpdm src/**/*.{ts,tsx} --warning false --tree false --exit-code circular:1 -T true",
  "type-check": "tsc --noEmit",
  "prepare": "husky"
}
```

## 验证步骤

### 阶段 1 验证
- [ ] `npm install` 成功安装所有新依赖
- [ ] `ConfigProvider`、`ThemeProvider`、`MotionProvider` 可正常使用
- [ ] `tokens.css` 去重后视觉无变化
- [ ] `tsdown.config.ts` 可构建出 `es/` 目录
- [ ] `dumi dev` 可启动文档站
- [ ] `vitest run` 可执行测试
- [ ] `git commit` 触发 husky 钩子

### 阶段 2-3 验证
- [ ] 所有组件迁移到 `src/ComponentName/` 目录
- [ ] `src/index.ts` 可统一导出所有组件
- [ ] `Wedget` 拼写修正
- [ ] `Input` 支持 `forwardRef`
- [ ] `mergeRefs` 无重复定义
- [ ] `npm run dev`（vite）展示页正常
- [ ] `npm run type-check` 无错误

### 阶段 4 验证
- [ ] `App.tsx` 拆分为 `src/showcase/` 结构
- [ ] 无内联样式硬编码
- [ ] 展示页功能完整

### 阶段 5 验证
- [ ] 每个组件有 `index.md` 文档
- [ ] 核心组件有单测且通过
- [ ] `npm run docs:build` 成功

### 阶段 6 验证
- [ ] `npm run build` 成功
- [ ] `npm pack` 输出正确
- [ ] `npm run lint:circular` 无循环依赖
- [ ] `npm run type-check` 无错误

## 关键文件路径

### 新建文件
- `src/ConfigProvider/index.tsx`
- `src/ThemeProvider/index.tsx`
- `src/MotionProvider/index.tsx`
- `src/index.ts`（统一导出）
- `tsdown.config.ts`
- `.dumirc.ts`
- `vitest.config.ts`
- `commitlint.config.mjs`
- `src/showcase/index.tsx`
- 各组件目录下的 `index.md`、`demos/`

### 修改文件
- `package.json`（依赖、scripts、exports）
- `src/styles/tokens.css`（去重）
- `src/lib/utils.ts`（移除重复 mergeRefs）
- `src/lib/slot.tsx`（修复类型）
- `src/main.tsx`（接入 ConfigProvider）

### 删除文件
- `src/App.tsx`（拆分后删除）
- `src/styles/*.css`（迁移到组件目录后删除）
- `src/components/*.tsx`（迁移到目录后删除）

## 执行顺序

由于任务规模巨大，按以下顺序执行：

1. **阶段 1**：基础设施（依赖、ConfigProvider、ThemeProvider、MotionProvider、tokens 去重、tsdown、dumi、vitest、husky 配置）
2. **阶段 2**：核心库重构（lib/、统一导出）
3. **阶段 3.1-3.2**：表单类组件迁移（13 个）
4. **阶段 3.3-3.4**：数据展示 + 反馈类迁移（17 个）
5. **阶段 3.5-3.6**：导航 + 菜单类迁移（14 个）
6. **阶段 3.7-3.8**：布局 + 时钟 + 系统监控迁移（20 个）
7. **阶段 3.9-3.10**：widgets + nullframe 重构
8. **阶段 4**：App.tsx 拆分
9. **阶段 5**：文档与测试
10. **阶段 6**：清理与发布验证

每个阶段完成后验证，确保不破坏现有功能。
