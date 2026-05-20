# web-ui-kit 组件统一实现方案

## 审计结论

`web-ui-kit` 下存在 **三套完全独立的组件系统**，各自采用不同的技术栈和设计令牌体系：

| 维度 | React 系统 (79 组件) | Vanilla JS 系统 (39 组件) | shadcn 系统 (47 组件) |
|------|---------------------|--------------------------|----------------------|
| CSS 方案 | 纯全局 CSS + BEM 命名 | **与 React 共享完全相同的 CSS** | Tailwind CSS v4 inline classes |
| 变体系统 | 手动数组拼接 BEM 修饰符 | 同 React | class-variance-authority (cva) |
| 核心依赖 | **零外部依赖**（仅 React） | **零外部依赖**（仅浏览器 API） | 5+ 依赖：@radix-ui/*, cva, clsx, tailwind-merge, lucide-react |
| 设计令牌 | `tokens.css`（183 行 CSS 变量） | 与 React 共享同一份 tokens.css | `theme.css`（独立 CSS 变量 + Tailwind @theme） |
| 主题切换 | `[data-theme="dark"]` / `[data-theme="light"]` | 同 React | `.dark` class + @custom-variant |
| 组件基元 | 原生 HTML 元素 | 原生 HTML 元素 | Radix UI primitives（部分） |
| 动画 | 纯 CSS transition | 同 React | Tailwind animate + Radix data-state |
| 构建要求 | 任意打包器 + CSS loader | **零构建**，浏览器直接使用 | Tailwind v4 + PostCSS 必须 |
| 组件间 CSS 共享 | React 和 Vanilla 共享 CSS | 与 React 共享 CSS | 完全独立，零共享 |

### 核心问题

1. **Vanilla JS 是 React 的子集副本**：39 个 Vanilla 组件对应 React 中的同名组件，CSS 100% 共享。双重维护无意义。
2. **shadcn 是独立体系**：不同的 CSS 方案、不同的设计令牌命名、不同的依赖链。与 React 系统 **零代码共享**。
3. **三套系统维护成本高**：修改一个组件样式需要改 2-3 个地方。
4. **shadcn Token 与 React Token 不一致**：
   - React 用 `--text-display`, shadcn 用 `--foreground`
   - React 用 `--surface`, shadcn 用 `--background`
   - React 用 `--radius-pill`, shadcn 用 `--radius: 1.25rem`
   - 两者语义虽然相近但命名完全不同

---

## 统一决策：以 React 系统为基准

**选择 React 系统的实现方式作为统一标准**，原因：

| 优势 | 说明 |
|------|------|
| **组件最全面** | 79 个组件，覆盖时钟、日历、音乐播放器、天气等完整场景 |
| **零外部依赖** | 仅需 React，无需 Radix/cva/clsx/tailwind-merge 等额外依赖 |
| **设计令牌成熟** | `tokens.css` 是手工精心设计的完整令牌体系，比 shadcn 的 theme.css 更细致 |
| **CSS 即文档** | BEM 命名 + CSS 自定义属性，可读性极高，新人友好 |
| **React 和 Vanilla 天然统一** | React 和 Vanilla 已共享同名 CSS 文件，只需统一 JS 部分 |

**统一后的实现方式**：
- CSS：纯全局 CSS，BEM 命名，100% CSS 自定义属性引用
- 变体：手动数组拼接 BEM 修饰符（`nothing-btn--primary`）
- 依赖：仅 React（可选 `class-variance-authority` 辅助）
- 令牌：统一使用 `tokens.css`
- 动画：纯 CSS transition + animation

---

## 执行步骤

### Step 1: 完整组件清单与去重映射

建立三套系统的组件对照表，标记重复项和独有项。

#### 1.1 三套系统同名组件对照

| 组件类别 | React (79) | Vanilla JS (39) | shadcn (47) | 统一后保留 |
|----------|-----------|----------------|-------------|-----------|
| 手风琴 | Accordion.tsx | — | accordion.tsx | React |
| 活动小部件 | ActivityWidget.tsx | activity-widget.js | — | React |
| 年龄动画 | AgeMotion.tsx | age-motion.js | — | React |
| 提示 | Alert.tsx | — | alert.tsx | React |
| 提示对话框 | AlertDialog.tsx | — | alert-dialog.tsx | React |
| 宽高比 | AspectRatio.tsx | — | aspect-ratio.tsx | React |
| 头像 | Avatar.tsx | — | avatar.tsx | React |
| 徽章 | Badge.tsx | — | badge.tsx | React |
| 电池 | Battery.tsx | battery.js | — | React |
| 底部弹出 | BottomSheet.tsx | bottom-sheet.js | — | React |
| 面包屑 | Breadcrumb.tsx | — | breadcrumb.tsx | React |
| 按钮 | Buttons.tsx | buttons.js | button.tsx | React |
| 咖啡因计时 | Caffeinate.tsx | caffeinate.js | — | React |
| 日历 | Calendar.tsx | calendar.js | calendar.tsx | React |
| 卡片 | Cards.tsx | cards.js | card.tsx | React |
| 复选框 | Checkbox.tsx | — | checkbox.tsx | React |
| 计时器 | Chrono.tsx | chrono.js | — | React |
| 剪贴板 | Clipboard.tsx | clipboard.js | — | React |
| 时钟 | Clock.tsx | clock.js | — | React |
| 折叠 | Collapsible.tsx | — | collapsible.tsx | React |
| 命令面板 | Command.tsx | — | command.tsx | React |
| 指南针 | CompassWidget.tsx | compass-widget.js | — | React |
| 右键菜单 | ContextMenu.tsx | — | context-menu.tsx | React |
| 数据网格 | DataGrid.tsx | data-grid.js | — | React |
| 数据行 | DataRows.tsx | data-rows.js | — | React |
| 日期 | Date.tsx | date.js | — | React |
| 日期导航 | DateNav.tsx | date-nav.js | — | React |
| 点阵 | DotMatrix.tsx | dot-matrix.js | — | React |
| 下拉菜单 | DropdownMenu.tsx | — | dropdown-menu.tsx | React |
| 下拉 | Dropdown.tsx | dropdown.js | — | React |
| 表单 | Form.tsx | — | form.tsx | React |
| 悬浮卡片 | HoverCard.tsx | — | hover-card.tsx | React |
| 输入OTP | InputOTP.tsx | — | input-otp.tsx | React |
| 输入框 | Inputs.tsx | inputs.js | input.tsx | React |
| 标签 | Label.tsx | — | label.tsx | React |
| 菜单栏 | Menubar.tsx | — | menubar.tsx | React |
| 模态框 | Modal.tsx | modal.js | dialog.tsx | React |
| 音乐播放器 | MusicPlayer.tsx | music-player.js | — | React |
| 导航 | Navigation.tsx | navigation.js | — | React |
| 导航菜单 | NavigationMenu.tsx | — | navigation-menu.tsx | React |
| 下一个事件 | NextEvent.tsx | next-event.js | — | React |
| 分页 | Pagination.tsx | — | pagination.tsx | React |
| 相册轮播 | PhotoCarousel.tsx | photo-carousel.js | — | React |
| 番茄钟 | Pomodoro.tsx | pomodoro.js | — | React |
| 弹出框 | Popover.tsx | — | popover.tsx | React |
| 进度条 | ProgressBar.tsx | progress-bar.js | progress.tsx | React |
| 快速切换 | QuickToggle.tsx | quick-toggle.js | — | React |
| 名言 | Quotes.tsx | quotes.js | — | React |
| 单选组 | RadioGroup.tsx | — | radio-group.tsx | React |
| 可调整大小 | Resizable.tsx | — | resizable.tsx | React |
| 滚动区域 | ScrollArea.tsx | — | scroll-area.tsx | React |
| 分段控制 | SegmentedControl.tsx | segmented-control.js | — | React |
| 选择器 | Select.tsx | — | select.tsx | React |
| 分割线 | Separator.tsx | — | separator.tsx | React |
| Sheet | Sheet.tsx | — | sheet.tsx | React |
| 侧边栏 | Sidebar.tsx | — | sidebar.tsx | React |
| 骨架屏 | Skeleton.tsx | — | skeleton.tsx | React |
| 滑块 | Slider.tsx | — | slider.tsx | React |
| Sonner | Sonner.tsx | — | sonner.tsx | React |
| 旋转器 | Spinner.tsx | spinner.js | — | React |
| 状态 | States.tsx | states.js | — | React |
| 步数小部件 | StepsWidget.tsx | steps-widget.js | — | React |
| 日晷 | SunDial.tsx | sun-dial.js | — | React |
| 系统监控 | SystemMonitor.tsx | system-monitor.js | — | React |
| 表格 | Table.tsx | — | table.tsx | React |
| 标签页 | Tabs.tsx | — | tabs.tsx | React |
| 标签 | Tags.tsx | tags.js | — | React |
| 任务栏 | Taskbar.tsx | taskbar.js | — | React |
| 文本域 | Textarea.tsx | — | textarea.tsx | React |
| 时间小部件 | TimeWidget.tsx | time-widget.js | — | React |
| 切换 | Toggle.tsx | — | toggle.tsx | React |
| 开关组 | Toggles.tsx | toggles.js | toggle-group.tsx | React |
| 工具提示 | Tooltip.tsx | — | tooltip.tsx | React |
| 对讲机 | WalkieTalkie.tsx | walkie-talkie.js | — | React |
| 天气小部件 | WeatherWidget.tsx | weather-widget.js | — | React |
| 小部件卡片 | WidgetCard.tsx | widget-card.js | — | React |
| 小部件网格 | WidgetGrid.tsx | — | — | React |
| 世界时钟 | WorldClock.tsx | world-clock.js | — | React |
| NothingWidgets20 | — | — | NothingWidgets20.tsx | 保留（shadcn 独有） |
| 轮播 | — | — | carousel.tsx | 保留（shadcn 独有） |
| 图表 | — | — | chart.tsx | 保留（shadcn 独有） |
| ImageWithFallback | — | — | 已删除 | — |

**统计**：
- React 独有：41 个（电池、时钟、音乐播放器、日历小部件等）
- shadcn 独有：5 个（NothingWidgets20、carousel、chart 等，其中 ImageWithFallback 已删除）
- 三系统共有（改名）：25 个同名对应
- Vanilla JS：39 个，全部是 React 的子集

#### 1.2 Vanilla JS 冗余分析

Vanilla JS 的 39 个组件全部对应 React 中的同名组件，CSS 100% 共享。这些 JS 文件仅包含 DOM 操作逻辑（类实例化、模板渲染、事件绑定），功能是 React 版本的子集。

**结论**: Vanilla JS 目录（`js/` + `css/` + `vanilla/`）是 React 系统的冗余子集，可安全移除。CSS 文件在 `react/src/styles/` 中已有完整副本。

### Step 2: 删除 Vanilla JS 冗余子系统

删除整个 Vanilla JS 系统：

```
删除:
  web-ui-kit/js/          (39 个 .js 文件)
  web-ui-kit/css/         (83 个 .css 文件，与 react/src/styles/ 重复)
  web-ui-kit/vanilla/     (Vanilla 演示入口)
```

**注意**：`react/src/styles/` 中保留完整的 83 个 CSS 文件。如果未来需要 Vanilla 版本，可直接从 React 组件提取。

### Step 3: 将 shadcn 组件对齐 React 模式

#### 3.1 shadcn → React 命名映射

shadcn 的组件使用 shadcn/ui 标准命名（小写+连字符），需重命名为 React 系统的 PascalCase 约定：

| shadcn 文件名 | React 对应组件 | 操作 |
|-------------|---------------|------|
| `accordion.tsx` | `Accordion.tsx` | 用 React 版本替换 |
| `alert.tsx` | `Alert.tsx` | 用 React 版本替换 |
| `badge.tsx` | `Badge.tsx` | 用 React 版本替换 |
| `button.tsx` | `Buttons.tsx` | 用 React 版本替换 |
| `card.tsx` | `Cards.tsx` | 用 React 版本替换 |
| `dialog.tsx` | `Modal.tsx` | 用 React 版本替换 |
| `input.tsx` | `Inputs.tsx` | 用 React 版本替换 |
| `progress.tsx` | `ProgressBar.tsx` | 用 React 版本替换 |
| `toggle-group.tsx` | `Toggles.tsx` | 用 React 版本替换 |
| (其余 15 个) | 同名 React 组件 | 用 React 版本替换 |

#### 3.2 shadcn 独有组件保留并转换

以下 shadcn 独有组件 React 系统中没有对应，需转换实现方式：

| shadcn 独有 | 操作 |
|------------|------|
| **NothingWidgets20.tsx** | 保留，抽离 Tailwind → 改为纯 CSS + BEM + tokens.css |
| **svg-qvv4ctcv53.ts** | 保留，SVG 路径数据无需变更 |
| **carousel.tsx** | 转换：Tailwind → 纯 CSS，Embla Carousel 保留 |
| **chart.tsx** | 转换：Tailwind → 纯 CSS，Recharts 保留 |
| **calendar.tsx** | 转换：Radix/react-day-picker → 手写 or 保留轻量 Radix |
| **sidebar.tsx** | 转换：Tailwind → 纯 CSS（已用 CSS 变量） |
| **command.tsx** | 转换：Tailwind → 纯 CSS，cmdk 保留 |
| **sonner.tsx** | 保留（toast 库包装器），Tailwind → 纯 CSS |
| **use-mobile.ts** | 保留，改名为 `useMobile.ts` |
| **utils.ts** | 保留，删除 tailwind-merge，仅保留 clsx |

#### 3.3 转换示例：shadcn Button → React 模式

```
转换前 (shadcn/button.tsx):
  import { cva } from "class-variance-authority"
  const buttonVariants = cva("inline-flex ... rounded-2xl ...", {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ...
      }
    }
  })

转换后 (Buttons.tsx 模式):
  import '../styles/buttons.css'
  const classNames = [
    'nothing-btn',
    `nothing-btn--${variant}`,
    size !== 'default' ? `nothing-btn--${size}` : '',
  ].filter(Boolean).join(' ')
```

### Step 4: 统一设计令牌

将 shadcn 的 `theme.css` 中 Nothing 品牌色值合并到 React 的 `tokens.css` 中：

| 用途 | shadcn theme.css | → tokens.css 新增 |
|------|-----------------|-------------------|
| 深色主色 | `#1a1d1c` | 已存在于 tokens.css 暗色主题 |
| 浅灰底色 | `#e1e5ea` | `--surface-dim` |
| 近白 | `#FCFAFE` | 已存在（`--text-display` 类似） |
| 强调灰 | `#aeabb1` | `--text-secondary` |
| 次级文字 | `#6c696e` | `--text-tertiary` |
| 大圆角(20px) | `--radius: 1.25rem` | `--radius-lg` 调整为 1.25rem |

### Step 5: 删除 shadcn 冗余

转换完成后，删除 shadcn 的冗余依赖和文件：

```
删除:
  shadcn/theme.css              (令牌已合并到 tokens.css)
  shadcn/tailwind.css           (不再使用 Tailwind)
  shadcn/postcss.config.mjs     (不再需要 PostCSS)
  shadcn/default_shadcn_theme.css (已删除)
  shadcn/node_modules/ 中不再需要的依赖:
    - @radix-ui/react-slot
    - class-variance-authority
    - tailwind-merge
    - tailwindcss
    - @tailwindcss/vite
    - tw-animate-css
```

保留的依赖：
- `react`, `react-dom`（必需）
- `@radix-ui/react-dialog` 等有状态原语（可选，或等待用 React Modal 替换）
- `lucide-react`（图标库，React 系统也用）
- `clsx`（类名合并，轻量）
- `recharts`, `embla-carousel-react`, `cmdk` 等（功能库）

### Step 6: 统一入口与目录结构

整理后的 `web-ui-kit/react/` 结构：

```
web-ui-kit/react/
├── src/
│   ├── main.tsx                  (统一入口)
│   ├── App.tsx                   (统一 Showcase)
│   ├── components/
│   │   ├── Accordion.tsx
│   │   ├── ...                   (79 个 React 组件)
│   │   ├── ...                   (+ shadcn 独有的转换后组件)
│   │   ├── Carousel.tsx          (从 shadcn 转换)
│   │   ├── Chart.tsx             (从 shadcn 转换)
│   │   ├── Command.tsx           (从 shadcn 转换)
│   │   ├── Sidebar.tsx           (从 shadcn 转换)
│   │   └── widgets/
│   │       ├── NothingWidgets20.tsx
│   │       └── svg-qvv4ctcv53.ts
│   ├── styles/
│   │   ├── tokens.css            (统一设计令牌)
│   │   ├── accordion.css
│   │   ├── ...                   (83 个 CSS 文件)
│   │   ├── carousel.css          (从 shadcn 提取)
│   │   ├── chart.css             (从 shadcn 提取)
│   │   ├── command.css           (从 shadcn 提取)
│   │   ├── sidebar.css           (从 shadcn 提取)
│   │   └── widgets.css           (NothingWidgets20 样式)
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useToggle.ts
│   │   ├── useDisclosure.ts
│   │   ├── useClickOutside.ts
│   │   ├── useKeyboardNavigation.ts
│   │   ├── useFloating.ts
│   │   └── useMobile.ts          (从 shadcn 迁移)
│   ├── lib/
│   │   └── utils.ts              (cn 函数，仅保留 clsx)
│   └── assets/
│       └── images/               (7 个 PNG)
├── package.json
├── vite.config.ts
└── index.html
```

### Step 7: 验证

1. `pnpm install` → 无报错
2. `pnpm dev` → React Showcase 正常渲染所有组件
3. 浏览器无 404、无样式错误
4. `pnpm build` → 构建成功
5. `pnpm type-check` → TypeScript 编译通过

---

## 变更量统计

| 操作 | 文件数 | 说明 |
|------|--------|------|
| 删除 Vanilla JS | 122 个文件 | `js/`(39) + `css/`(83) + `vanilla/`(1) |
| 删除 shadcn 冗余 | ~20 个文件 | Tailwind 配置、theme.css、node_modules 依赖 |
| 合并重名组件 | 25 个 tsx | 删除 shadcn 版本，保留 React 版本 |
| 转换独有组件 | 8 个 tsx | shadcn/Tailwind → React/CSS 模式 |
| 新建 CSS 文件 | ~5 个 | carousel.css, chart.css 等 |
| 更新 tokens.css | 1 个文件 | 合并 Nothing 品牌色值 |
| 更新 App.tsx | 1 个文件 | 统一 Showcase |
| 更新 package.json | 1 个文件 | 移除 Tailwind 相关依赖 |

---

## 不涉及

- ❌ 不修改 React 系统 79 个组件的业务逻辑
- ❌ 不修改 hooks/ 中已有 5 个自定义 hook
- ❌ 不改变 BEM 命名约定
- ❌ 不改变 CSS 自定义属性令牌体系
