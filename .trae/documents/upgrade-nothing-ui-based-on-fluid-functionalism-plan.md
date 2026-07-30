# Nothing UI 升级计划：全方位参考 fluid-functionalism

> 目标：在保持 Nothing 设计哲学（单色、零阴影/零 blur/零渐变、CSS Variables、`[data-theme]` 主题）的前提下，系统性参考 `https://github.com/mickadesign/fluid-functionalism` 的组件实现、变体设计、交互动效与文档展示形式，对本地 Nothing UI 进行升级。
>
> 用户确认：全面推进；先迁移到 `@base-ui/react` 再叠加 fluid-functionalism 的动效与变体；保持设计哲学一致。

---

## 1. 摘要（Summary）

本计划将升级分为 **5 个阶段**：

1. **基础层建设**：引入 spring 动效令牌、proximity-hover 等可复用能力；锁定 `@base-ui/react` 迁移规范。
2. **核心交互组件迁移 + 升级**：把 Tabs / Slider / Select / DropdownMenu / Modal / Accordion / Tooltip / Popover / HoverCard 等自定义实现迁移到 `@base-ui/react`，并叠加 proximity hover、spring 动画、font-weight 过渡、active/loading 等变体。
3. **现有组件变体增强**：Button / Input / Switch / Checkbox / RadioGroup / Badge / Card / DataTable / Tabs 等补充 fluid-functionalism 风格的变体与状态。
4. **缺失组件补充**：新增 AskUserQuestions、ColorPicker、ThinkingSteps、ThinkingIndicator、TabsSubtle、InputCopy、InputMessage、CheckboxGroup、Surfaces（无阴影版）等组件。
5. **展示与文档升级**：在 showcase 中新增组件矩阵、分类导航、Live Demo 卡片、Props Table、代码示例与视觉对比页。

每一阶段都包含具体的文件清单、改造点和验收命令。

---

## 2. 当前状态分析（Current State Analysis）

### 2.1 项目架构

- **主入口**：`nothing-design-skill/nothing-design/web-ui-kit/react/src/index.ts`（导出全部组件与 Provider）
- **技术栈**：React 19 + TypeScript 6 + Vite + tsdown；样式为纯 CSS + CSS Variables；变体使用 `class-variance-authority`。
- **可访问性基座**：已使用 `@base-ui/react` 的组件只有 4 个：
  - `Button`（`@base-ui/react/button`）
  - `Checkbox`（`@base-ui/react/checkbox`）
  - `RadioGroup`（`@base-ui/react/radio-group`）
  - `Switch`（`@base-ui/react/switch`）
- **自定义实现**：`Tabs`、`Input`、`Slider`、`Select`、`DropdownMenu`、`Modal`、`Accordion`、`Tooltip`、`Popover`、`HoverCard` 等均未使用 `@base-ui/react`， accessibility 与 keyboard 逻辑自行维护。
- **动效注入**：通过 `MotionProvider` / `useMotionComponent` 注入 `motion`，库本身不直接依赖 `motion`。
- **多语言**：showcase 通过 `ShowcaseContext` 提供 `t(zh, en)`，新增 UI 文本必须双语。

### 2.2 设计约束（来自 `AGENTS.md` 与 `tokens.css`）

- 全局令牌只能放在 `src/styles/tokens.css`。
- 不使用 Tailwind / Styled-components / CSS-in-JS；组件 CSS 使用 BEM 风格类名。
- 主题切换通过 `[data-theme="dark"]` / `[data-theme="light"]`。
- 禁止新增颜色、阴影、blur、渐变；颜色仅使用 monochrome 灰阶 + `--accent` 红色。
- 每个组件根元素必须加 `data-slot`。
- 新增组件必须伴随单元测试。

### 2.3 与 fluid-functionalism 的关键差距

| 维度 | fluid-functionalism | Nothing UI 现状 |
|---|---|---|
| 原始组件库 | shadcn/ui registry + Radix / Base UI | 自研组件库 |
| 样式方式 | Tailwind CSS v4 | 纯 CSS + CSS Variables |
| 动效 | Framer Motion spring、proximity hover、font-weight 动画 | 少量 CSS transition，motion 通过 Provider 注入 |
| 交互哲学 | Motion as information / Hover as preview / Spring physics | 偏静态，hover/active 反馈较弱 |
| 组件覆盖 | 25+ 组件，含 AskUserQuestions、ColorPicker、ThinkingSteps 等 | 60+ 组件，但部分 AI/表单组件缺失 |
| 文档站 | `/docs` 单页 + Live Preview + Props Table + Shiki 高亮 | `/showcase` 长页滚动，缺少 Props Table 与代码示例 |

### 2.4 可复用的关键参考资产

- `BASE-UI-MIGRATION-PLAN.md`：完整记录了从 Radix 迁移到 `@base-ui/react` 的决策、命名映射、动画桥接方案。
- `registry/default/lib/springs.ts`：spring 动效令牌。
- `registry/default/hooks/use-proximity-hover.ts`：proximity hover 实现。
- `registry/default/lib/shape-context.tsx`：shape 系统（pill / rounded）。
- `registry/default/lib/font-weight.ts`：可变字重过渡令牌。
- `registry/base/*.tsx`：Base UI  flavor 的组件实现，最接近本地技术选型。
- `components/flavored/*.tsx`：与 primitive 无关的独特组件（TabsSubtle、ThinkingSteps 等）。

---

## 3. 关键决策（Decisions Locked In）

| # | 决策 | 理由 |
|---|---|---|
| 1 | **不使用 Tailwind**。把 fluid-functionalism 的 Tailwind 类转换为本地 CSS Variables + BEM 类名。 | 项目规范明确禁止 Tailwind；保持 design tokens 统一。 |
| 2 | **不引入 Framer Motion 直接依赖**。继续使用 `MotionProvider` 注入 `motion`，所有 spring 动画通过 `useMotionComponent` 消费。 | 保持库的 peer-dependency 解耦；`package.json` 已把 `motion` 作为 peer。 |
| 3 | **不引入 shadows / blur / gradients**。fluid-functionalism 的 surface/elevation 系统转换为 border + background 层级表达。 | Nothing 设计哲学硬性约束。 |
| 4 | **不照搬 shape-context 的 pill/rounded 切换**。Nothing 使用固定 radius token（`--radius-button`、`--radius-card` 等），本次仅在新增组件时沿用现有 token。 | 避免与现有 tokens.css 冲突；保持视觉一致性。 |
| 5 | **优先使用 `@base-ui/react`**。对自定义实现的交互组件按 fluid-functionalism 的 Base UI 迁移经验重写。 | 用户确认；项目规范；reference 有成熟迁移方案。 |
| 6 | **新增 UI 文本全部双语**。继续使用 `t(zh, en)`。 | 项目规范。 |
| 7 | **新增/改造组件必须伴随测试、文档、demo**。 | 项目规范与 showcase 升级需求。 |

---

## 4. 分阶段实施计划

### Phase 1：基础层建设（Foundation）

**目标**：建立可被全库复用的动效与交互基座，并锁定迁移规范。

#### 4.1 新增共享动效模块

| 文件 | 操作 | 说明 |
|---|---|---|
| `src/lib/motion.ts` | 新增 | 定义 spring 令牌（映射 fluid-functionalism 的 `spring.fast/moderate/slow`），使用 `motion` 的 spring 类型；提供 `exitFallbackMs`。 |
| `src/hooks/useProximityHover.ts` | 新增 | 移植 `use-proximity-hover`，去掉 Tailwind 依赖，返回 `activeIndex`、`registerItem`、`handlers`；支持 `axis: 'x' \| 'y' \| 'xy'`。 |
| `src/hooks/useMergeSplit.ts` | 新增 | 移植 CheckboxGroup 的合并/拆分背景动画逻辑（用于连续选择项的 merged background）。 |
| `src/lib/fontWeight.ts` | 新增 | 本地字体不是 Inter variable，因此改为定义 `font-variation-settings` 降级方案：优先使用 `--weight-medium/bold` + `transition`，若用户加载可变字体则平滑过渡。 |
| `src/styles/tokens.css` | 编辑 | 新增 `--duration-spring-fast`、`--duration-spring-moderate`、`--duration-spring-slow`、`--ease-spring-*` 等动效 token；新增 `--surface-elevated-*` 层级（仅通过 background/border 区分，无 shadow）。 |

#### 4.2 建立 `@base-ui/react` 迁移规范

基于 fluid-functionalism 的 `BASE-UI-MIGRATION-PLAN.md` 制定本地规范：

- 使用 `render={(props, state) => <motion.div {...props} ref={props.ref} />}` 形式桥接 Base UI 与 motion。
- Base UI 通过 `element.getAnimations()` 检测退出动画，因此所有 exit 动画必须包含 `opacity` 变化。
- 将 Radix 的 `data-state` 习惯改为 Base UI 的 per-component attributes（如 `data-open`、`data-closed`、`data-starting-style`、`data-ending-style`）。
- 使用 `@base-ui/react/<component>` 的子路径导入（如 `import { Tabs } from '@base-ui/react/tabs'`）。

**验收**：

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npm run type-check
npm run lint
npm run test
```

---

### Phase 2：核心交互组件迁移 + 升级

**目标**：将目前自定义实现的交互组件迁移到 `@base-ui/react`，并叠加 fluid-functionalism 的动效与变体。

#### 2.1 Tabs 重构

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Tabs/Tabs.tsx` | 重写 | 改用 `@base-ui/react/tabs`；保留 `items`/`TabPanel` 便捷 API；trigger 使用 `Tabs.Tab`，content 使用 `Tabs.Panel`；indicator 用 motion.div 做滑动动画。 |
| `src/Tabs/Tabs.css` | 编辑 | 移除自定义 focus/keyboard CSS，改用 Base UI 的 `data-active`/`data-disabled`；添加 indicator transition 与 hover background。 |
| `src/Tabs/Tabs.test.tsx` | 编辑 | 测试 keyboard navigation、indicator position、data-slot。 |

新增变体：

- `variant: 'default' | 'pills' | 'subtle'`（`subtle` 对应 fluid-functionalism 的 TabsSubtle 风格，但合并到 Tabs 组件中）。
- `motion: boolean` 是否启用滑动指示器动画。

#### 2.2 Slider 重构

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Slider/Slider.tsx` | 重写 | 改用 `@base-ui/react/slider`；支持 `range` 模式；thumb 使用 motion 做 scale/weight 动画。 |
| `src/Slider/Slider.css` | 编辑 | 使用 Base UI 的 `data-disabled`；添加 thumb hover/active 动效。 |

新增变体：

- `variant: 'default' | 'filled'`
- `showTooltip: boolean`（hover thumb 时显示当前值）。

#### 2.3 Select 重构

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Select/Select.tsx` | 重写 | 改用 `@base-ui/react/select`；保留 `options`/`placeholder`/`searchable` API；popup 使用 motion 进入/退出。 |
| `src/Select/Select.css` | 编辑 | 使用 `data-open`/`data-closed`；添加 proximity hover 高亮。 |

新增变体：

- `variant: 'bordered' | 'borderless'`
- 多选支持（merged backgrounds）。

#### 2.4 DropdownMenu 重构

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/DropdownMenu/DropdownMenu.tsx` | 重写 | 改用 `@base-ui/react/menu`；支持 nested menu；popup 使用 motion。 |
| `src/ContextMenu/ContextMenu.tsx` | 可选升级 | 同样迁移到 `@base-ui/react/menu` 的右键触发模式。 |

新增变体：

- `variant: 'default' | 'compact'`
- 菜单项支持 `leadingIcon` / `trailingIcon` / `shortcut`。

#### 2.5 Modal / Sheet / Popover / Tooltip / HoverCard 重构

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Modal/Modal.tsx` | 重写 | 改用 `@base-ui/react/dialog`；`Dialog.Backdrop` + `Dialog.Popup`；支持 motion enter/exit。 |
| `src/Sheet/Sheet.tsx` | 重写 | 改用 `@base-ui/react/dialog` 或保持自定义滑动；加入 spring slide 动画。 |
| `src/Popover/Popover.tsx` | 重写 | 改用 `@base-ui/react/popover`。 |
| `src/Tooltip/Tooltip.tsx` | 重写 | 改用 `@base-ui/react/tooltip`；tooltip 内容使用 motion。 |
| `src/HoverCard/HoverCard.tsx` | 重写 | 改用 `@base-ui/react/preview-card`。 |

#### 2.6 Accordion 重构

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Accordion/Accordion.tsx` | 重写 | 改用 `@base-ui/react/accordion`；使用 `Accordion.Panel`；高度动画使用 motion。 |

新增变体：

- `variant: 'default' | 'flush'`
- 支持 `leadingIcon`。

#### 2.7 Button / Checkbox / RadioGroup / Switch 增强（已用 Base UI）

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Button/Button.tsx` | 编辑 | 新增 `leadingIcon` / `trailingIcon` / `active` / `asChild`；loading 状态参考 fluid-functionalism 的 spinner；添加 hover/active 背景层 motion。 |
| `src/Button/button-variants.ts` | 编辑 | 新增 `tertiary` 变体；`icon` / `icon-sm` / `icon-lg` 尺寸。 |
| `src/Button/Button.css` | 编辑 | 添加 proximity hover 背景、active scale、icon stroke-width 过渡。 |
| `src/Checkbox/Checkbox.tsx` | 编辑 | 支持 CheckboxGroup 模式；indeterminate 动画优化。 |
| `src/RadioGroup/RadioGroup.tsx` | 编辑 | 支持 merged backgrounds（连续选中项背景合并）。 |
| `src/Switch/Switch.tsx` | 编辑 | 添加 drag-to-toggle、pressed state、hover track color。 |

---

### Phase 3：现有组件变体增强

**目标**：在不改变底层 primitive 的情况下，给现有组件补充 fluid-functionalism 风格的变体与交互细节。

#### 3.1 Input / Textarea / InputOTP

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Input/Input.tsx` | 编辑 | 新增 `Input.Group` / `Input.Message` 子组件；支持 `leadingIcon` / `trailingIcon` / `clearable`；错误状态使用 shake 动画。 |
| `src/Input/Input.css` | 编辑 | 添加 focus ring 动画、hover border 颜色过渡。 |
| `src/Textarea/Textarea.tsx` | 编辑 | 支持 auto-resize（参考 InputMessage）。 |
| `src/InputOTP/InputOTP.tsx` | 编辑 | 添加 slot 之间的 proximity hover 与 focus indicator 滑动。 |

#### 3.2 Card / Badge / Tag / Alert

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Card/Card.tsx` | 编辑 | 新增 `WidgetCard` 的 2-D proximity hover；支持 `media` / `logo` / `feature` slots。 |
| `src/Badge/Badge.tsx` | 编辑 | 新增 `dot` 变体；颜色映射到 Nothing tokens。 |
| `src/Tag/Tag.tsx` | 编辑 | 新增 `removable` 动画与 proximity hover。 |
| `src/Alert/Alert.tsx` | 编辑 | 添加进入/退出 motion；支持 `onClose`。 |

#### 3.3 DataTable / Table / Pagination

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/DataTable/DataTable.tsx` | 编辑 | 行 hover 使用 proximity highlight；排序图标添加 weight 过渡。 |
| `src/Table/Table.tsx` | 编辑 | 同上。 |
| `src/Pagination/Pagination.tsx` | 编辑 | 当前页 indicator 滑动动画。 |

#### 3.4 Navigation / SegmentedControl / Toggle

| 文件 | 操作 | 改造点 |
|---|---|---|
| `src/Navigation/Navigation.tsx` | 编辑 | active indicator spring 动画。 |
| `src/SegmentedControl/SegmentedControl.tsx` | 编辑 | 滑动 indicator + proximity hover。 |
| `src/Toggle/Toggle.tsx` | 编辑 | pressed state、font-weight 过渡。 |

---

### Phase 4：缺失组件补充

**目标**：新增本地缺失、但在 fluid-functionalism 中成熟且符合 Nothing 风格的组件。

#### 4.1 AI / Agent 相关

| 组件 | 目录 | 说明 |
|---|---|---|
| `ThinkingIndicator` | `src/agent/ThinkingIndicator/` | 参考 `registry/default/thinking-indicator.tsx`；morphing SVG 状态指示器；用于 AgentOrb / ThoughtChain 周边。 |
| `ThinkingSteps` | `src/agent/ThinkingSteps/` | 参考 `components/flavored/thinking-steps.tsx`；链式思考步骤，顺序动画。 |

#### 4.2 表单 / 输入相关

| 组件 | 目录 | 说明 |
|---|---|---|
| `AskUserQuestions` | `src/AskUserQuestions/` | 参考 `registry/default/ask-user-questions.tsx`；步骤化问答流，单选/多选/inline other。 |
| `InputCopy` | `src/InputCopy/` | 只读输入框 + 复制按钮 + 复制成功反馈动画。 |
| `InputMessage` | `src/InputMessage/` 或合并到 `src/Sender` | 聊天 composer，auto-resize textarea，action slots，send 按钮；可与现有 `Sender` 整合。 |
| `CheckboxGroup` | `src/CheckboxGroup/` | 复选框组，连续选中项背景合并（merged backgrounds）。 |
| `ColorPicker` | `src/ColorPicker/` | HEX/RGB/HSL/OKLCH + alpha + swatches；使用本地 Slider。 |

#### 4.3 导航 / 展示相关

| 组件 | 目录 | 说明 |
|---|---|---|
| `TabsSubtle` | `src/Tabs/TabsSubtle.tsx` | 或作为 Tabs 的 `variant="subtle"`；subtle tab navigation with pill animation。 |
| `Surfaces` | `src/Surfaces/` | 8 级 elevation，仅用 border/background 区分（无 shadow）；为 popover/dialog/dropdown 提供嵌套可见性。 |

每个新增组件必须包含：

- `Component.tsx`
- `Component.css`
- `Component.test.tsx`
- `index.ts`
- showcase section 中的 demo
- 更新 `src/index.ts`（运行 `npm run sync:exports`）

---

### Phase 5：展示与文档升级

**目标**：把 showcase 从“长页滚动”升级为“组件矩阵 + 分类详情 + Live Demo + Props Table”。

#### 5.1 Showcase 结构升级

| 文件 | 操作 | 说明 |
|---|---|---|
| `src/showcase/components/ComponentPreview.tsx` | 新增 | Live Preview + Code Tab + 主题切换。 |
| `src/showcase/components/PropsTable.tsx` | 新增 | Props 表格，参考 fluid-functionalism 的 `PropsTable.tsx`。 |
| `src/showcase/components/DocSection.tsx` | 新增 | 统一文档区块布局。 |
| `src/showcase/components/ComponentGrid.tsx` | 新增 | 组件发现页网格。 |
| `src/showcase/sections/` | 编辑 | 每个 section 增加 Variant Gallery 与 Props Table。 |

#### 5.2 新增演示页

| 路由 | 文件 | 说明 |
|---|---|---|
| `/component-matrix` | `src/showcase/ComponentMatrixPage.tsx` | 全组件矩阵，按 Core / Data / Overlays / Navigation / Menus / States / Time / System / Agent 分类。 |
| `/compare-fluid` | `src/showcase/FluidComparisonPage.tsx` | 与 fluid-functionalism 的并排放置对比（视觉 + 交互），用于验证 1:1 还原度。 |

#### 5.3 现有 AI PoC 页升级

| 文件 | 操作 | 说明 |
|---|---|---|
| `src/showcase/AIPocPage.tsx` | 编辑 | 集成新增的 ThinkingIndicator / ThinkingSteps / InputMessage；增强 Sender 的 action slots。 |

---

## 5. 文件变更总览（按优先级）

### 5.1 高优先级（Phase 1-2）

```
src/
  lib/
    motion.ts                    # 新增
    fontWeight.ts                # 新增
  hooks/
    useProximityHover.ts         # 新增
    useMergeSplit.ts             # 新增
  styles/
    tokens.css                   # 编辑：新增 spring / surface tokens
  Button/
    Button.tsx                   # 编辑
    button-variants.ts           # 编辑
    Button.css                   # 编辑
    Button.test.tsx              # 编辑
  Tabs/
    Tabs.tsx                     # 重写
    Tabs.css                     # 编辑
    Tabs.test.tsx                # 编辑
  Slider/
    Slider.tsx                   # 重写
    Slider.css                   # 编辑
  Select/
    Select.tsx                   # 重写
    Select.css                   # 编辑
  DropdownMenu/
    DropdownMenu.tsx             # 重写
    DropdownMenu.css             # 编辑
  Modal/
    Modal.tsx                    # 重写
  Sheet/
    Sheet.tsx                    # 重写
  Popover/
    Popover.tsx                  # 重写
  Tooltip/
    Tooltip.tsx                  # 重写
  HoverCard/
    HoverCard.tsx                # 重写
  Accordion/
    Accordion.tsx                # 重写
  Checkbox/
    Checkbox.tsx                 # 编辑
  RadioGroup/
    RadioGroup.tsx               # 编辑
  Switch/
    Switch.tsx                   # 编辑
```

### 5.2 中优先级（Phase 3）

```
src/
  Input/
    Input.tsx                    # 编辑
    Input.css                    # 编辑
  Textarea/
    Textarea.tsx                 # 编辑
  InputOTP/
    InputOTP.tsx                 # 编辑
  Card/
    Card.tsx                     # 编辑
  Badge/
    Badge.tsx                    # 编辑
  Tag/
    Tag.tsx                      # 编辑
  Alert/
    Alert.tsx                    # 编辑
  DataTable/
    DataTable.tsx                # 编辑
  Table/
    Table.tsx                    # 编辑
  Pagination/
    Pagination.tsx               # 编辑
  Navigation/
    Navigation.tsx               # 编辑
  SegmentedControl/
    SegmentedControl.tsx         # 编辑
  Toggle/
    Toggle.tsx                   # 编辑
```

### 5.3 低优先级 / 新增（Phase 4-5）

```
src/
  AskUserQuestions/              # 新增目录
  ColorPicker/                   # 新增目录
  InputCopy/                     # 新增目录
  InputMessage/                  # 新增目录
  CheckboxGroup/                 # 新增目录
  Surfaces/                      # 新增目录
  agent/
    ThinkingIndicator/           # 新增目录
    ThinkingSteps/               # 新增目录
  Tabs/
    TabsSubtle.tsx               # 新增（或合并到 Tabs）
  showcase/
    components/
      ComponentPreview.tsx       # 新增
      PropsTable.tsx             # 新增
      DocSection.tsx             # 新增
      ComponentGrid.tsx          # 新增
    ComponentMatrixPage.tsx      # 新增
    FluidComparisonPage.tsx      # 新增
    AIPocPage.tsx                # 编辑
  index.ts                       # 编辑（运行 sync:exports）
```

---

## 6. 假设与依赖

1. **`@base-ui/react` 版本**：当前 `package.json` 已固定 `^1.6.0`，高于 fluid-functionalism 迁移时的 `1.4.1`；API 可能略有差异，迁移时需对照官方文档做微调。
2. **`motion` peer dependency**：用户需要在展示/文档站的入口注入 `motion`；新增组件内部通过 `useMotionComponent` 获取。
3. **字体**：Nothing UI 使用 `Space Grotesk` / `Space Mono` / `Doto`，不是 Inter variable；font-weight 动画需要降级为 `font-weight` + `letter-spacing` 微调，或仅在加载可变字体时启用 `font-variation-settings`。
4. **无阴影**：fluid-functionalism 的 `surface-context` / `elevated.tsx` 依赖 shadow tokens；本地改造时必须映射为 `border` + `background` 层级（如 `--surface-raised` / `--surface` / `--border-visible`）。
5. **图标**：fluid-functionalism 使用 `lucide-react` + `IconProvider`；本地项目无统一图标库，新增组件优先使用内联 SVG 或沿用现有图标模式，避免引入新图标包。

---

## 7. 验证步骤（Verification）

每个 Phase 结束后必须运行：

```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npm run type-check
npm run lint
npm run test
npm run build
npm run sync:exports -- --check
```

### 7.1 功能性验证

- 所有组件 `data-slot` 存在。
- 所有新增/改造组件的单元测试通过。
- 主题切换（dark/light）正常。
- 语言切换（zh/en）正常。

### 7.2 交互验证

- keyboard navigation 在 Tabs / Select / DropdownMenu / Modal / Accordion 中正常。
- motion enter/exit 在 Dialog / Tooltip / Popover / DropdownMenu 中平滑。
- proximity hover 在 Tabs / Select rows / Card / DataTable rows 中生效。
- spring 动画可被 `prefers-reduced-motion` 尊重（通过 `useReducedMotion` 或 CSS `@media`）。

### 7.3 视觉验证

- 无新引入的阴影、blur、渐变。
- 所有颜色来自 `tokens.css`。
- 在 `/compare-fluid` 或手动对比页中与 fluid-functionalism 截图进行 1:1 检查。

### 7.4 构建验证

- `npm run build` 产出 `es/` 无错误。
- `npm run build:showcase` 产出 `dist/` 无错误。
- 运行 `npm run preview` 后手动访问 `/`、`/ai-poc`、`/project-intro`、新增路由正常。

---

## 8. 风险与回退

| 风险 | 影响 | 回退方案 |
|---|---|---|
| `@base-ui/react` 1.6.0 API 与参考的 1.4.1 不兼容 | 迁移组件报错 | 先对单个组件（如 Tooltip）做 spike，验证 `render` + motion 桥接后再批量迁移。 |
| 引入过多动效导致性能下降 | 低端设备卡顿 | 所有动效默认开启但可通过 `ConfigProvider` 全局关闭；对长列表禁用 proximity hover。 |
| 改造覆盖广导致回归 | 现有 showcase 异常 | 每 Phase 保留一个“稳定分支检查点”；关键组件增加快照测试。 |
| Tailwind → CSS 映射复杂 | 还原度不足 | 对关键组件（Button / TabsSubtle）先做 PoC，用户确认后再推广。 |

---

## 9. 建议的执行顺序

1. **先跑 Phase 1**：建立 motion / proximity-hover / merge-split 基础模块；这是后续所有组件升级的前提。
2. **再做 Phase 2 的 Spike**：选择 `Tooltip` 或 `Tabs` 作为第一个迁移组件，验证 `@base-ui/react` + `useMotionComponent` 的退出动画桥接。
3. **批量 Phase 2**：按 “Tabs → Slider → Select → DropdownMenu → Modal/Sheet → Popover/Tooltip/HoverCard → Accordion” 顺序推进。
4. **并行 Phase 3**：在核心组件迁移稳定后，给 Button / Input / Card 等补充变体。
5. **最后 Phase 4-5**：新增缺失组件并升级 showcase。

---

## 10. 附录：fluid-functionalism → Nothing UI 映射速查

| fluid-functionalism | Nothing UI 对应 | 备注 |
|---|---|---|
| `spring.fast` | `--duration-spring-fast` + `motion` spring | 用于 hover、fade |
| `spring.moderate` | `--duration-spring-moderate` | 用于 dropdown、tabs、tooltip |
| `spring.slow` | `--duration-spring-slow` | 用于 modal、sheet |
| `use-proximity-hover` | `useProximityHover` | 去掉 Tailwind，纯 JS + CSS |
| `useShape` | 不使用 | Nothing 使用固定 radius token |
| `surface-context` / `elevated` | `--surface-elevated-*` | 用 border/background 替代 shadow |
| `fontWeights` | `--weight-*` + `font-variation-settings` 降级 | 因字体不同需适配 |
| `IconProvider` | 不引入 | 继续使用内联 SVG / 现有图标 |
| `TabsSubtle` | `Tabs variant="subtle"` 或独立组件 | 保留 sliding indicator |
| `ThinkingSteps` | `src/agent/ThinkingSteps` | 适配 AI OS 风格 |
| `AskUserQuestions` | `src/AskUserQuestions` | 双语化 |
| `InputCopy` / `InputMessage` | `src/InputCopy` / `src/InputMessage` | 与 Sender 风格统一 |
| `ColorPicker` | `src/ColorPicker` | 使用本地 Slider |
| `CheckboxGroup` | `src/CheckboxGroup` | merged backgrounds |

---

*计划创建日期：2026-07-29*
*参考项目：https://github.com/mickadesign/fluid-functionalism*
