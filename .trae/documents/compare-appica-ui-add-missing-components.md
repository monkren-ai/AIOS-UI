# 对比 appica-ui 补充缺失组件 + 更新 Skill

## 一、任务概要

对比 `https://github.com/appica-dev/appica-ui`（62 组件）与 Nothing-UI 当前清单（62 manifest 条目），补充缺失组件到 Nothing-UI React 项目，并同步更新 `nothing-design` Skill 文档。

**用户决策：**
- 范围：全部 18 个缺失组件 + 3 个冲突组件改造适配 Nothing 风格 = **21 个新组件**
- 冲突组件（GradientGlow/Skeleton/Toast）不照搬 appica，改造为符合 Nothing 设计语言的形态

## 二、现状分析（基于 Phase 1 探索）

### 项目根目录（真正工程源码）
`/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/`
下文简称 **REACT_ROOT**；其 `src/` 简称 **SRC**。

### 技术栈与约定（实现新组件必须遵守）
- React 19 + TS 6，**ref-as-prop（无 forwardRef）**——与 appica 一致
- 底层原语 `@base-ui/react`，动画 `motion`（经 MotionProvider 注入）
- Tailwind v4 CSS-first（`@theme` 在 `SRC/styles/theme.css`），无 `tailwind.config.js`
- 变体用 CVA，类名合并用 `cn()`（`@/lib/utils`），语义钩子用 `data-*`（`dataAttr()`）
- 路径别名 `@/components` `@/lib` `@/lib/utils` `@/hooks` `@/styles` `@/system`
- 每组件根元素加 `data-slot="<kebab-name>"`，状态用 `[data-state]`/`[data-active]`
- 全局令牌只在 `SRC/styles/tokens.css`；组件私有变量带组件前缀
- 禁止硬编码色值/阴影/blur/渐变；主题切换用 `[data-theme]`
- 所有 UI 文本经 `t(zh, en)` 双语；注释中文、标识符英文
- 每组件配 `*.test.tsx`（渲染不报错、data-slot、变体 className、aria/role、交互回调）

### 权威清单来源
- **库导出**：`SRC/index.ts`（由 `npm run sync:exports` 自动生成，**禁止手改**）
- **文档站清单**：`SRC/site/registry/manifest.ts`（手填一条）+ `SRC/site/registry/entries/<slug>.tsx`（一个文件）
- **示例**：`SRC/site/examples/<component>/<scenario>.tsx`
- **分类**：`SRC/site/registry/categories.ts`（9 类，已含全部所需分类）

### 单组件标准文件结构（参照 Button）
```
SRC/<Name>/
├── <Name>.tsx           # 实现：import Base UI 原语 + cn/dataAttr + 变体
├── <name>-variants.ts   # CVA 变体工厂 + 类型 + resolve* 兼容函数（如需）
├── <Name>.test.tsx       # 单测：渲染/data-slot/变体/aria/交互
└── index.ts             # export { Name, type NameProps } from './Name'
                        # export { nameVariants, ... } from './<name>-variants'
                        # export { default } from './Name'
```

### Registry 条目结构（参照 `entries/button.tsx`）
```tsx
import { <Name> } from 'aios-ui-kit/<name>'
import type { ComponentDoc } from '../types'
import <Example> from '../../examples/<name>/<scenario>'
import <example>Source from '../../examples/<name>/<scenario>.tsx?raw'

export const <name>Doc: ComponentDoc = {
  slug, name, category, status: 'stable', baseUi: '<BaseUi 原语>',
  description: { zh, en },
  preview: () => <<Name> ... />,
  importStatement, usageSnippet,
  examples: [{ id, title:{zh,en}, description:{zh,en}, code, render }],
  api: [{ name, description:{zh,en}, props:[{name,type,default,description:{zh,en}}] }],
  accessibility: [{ zh, en }, ...],
}
```

### Skill 文档位置
- **SKILL.md**：`/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/SKILL.md`
  - 第 264–347 行「Available Components」按分类列表（**当前已与 v2 manifest 不同步**，需校正）
  - 第 191–205 行「ANTI-PATTERNS」（需为改造组件补充说明）
- **references/components.md**：组件规格参考（按需补充新组件条目）
- **COMPONENTS.md**（REACT_ROOT）：旧版扁平文件目录，**已过时**，本次不更新（以 manifest 为权威）

## 三、新增组件清单（21 个）

### A. 操作与输入（actions-inputs）— 10 个

| # | 组件 | appica 对应 | Base UI 原语 | Nothing 适配要点 |
|---|------|------------|-------------|------------------|
| 1 | **Field** | field | Field/Field.Label/Field.Description/Field.Error | 表单字段壳：label + control + hint + error。复用 Input/Select 变体的 bordered/underline。无新色 |
| 2 | **Fieldset** | fieldset | Fieldset/Fieldset.Legend | 分组表单字段 + legend。用 `--border-visible` 1px 框，无圆角>16px |
| 3 | **NumberField** | number-field | NumberField/NumberField.Group/Decrement/Increment/Input | 数值输入 + 步进器。步进按钮用 `icon-sm` 尺寸，`aria-label` 中英双语 |
| 4 | **DateField** | date-field | DateField（Base UI date primitives） | 日期段输入（年/月/日分格）。复用 InputOTP 的分格交互模式 |
| 5 | **TimeField** | time-field | TimeField | 时分秒分格输入。同 DateField 模式，Space Mono 数字 |
| 6 | **Autocomplete** | autocomplete | Autocomplete/Input/Content/List/Item/Empty | 文本输入 + 过滤浮层。浮层用 `--surface-raised` + `--border-visible`，无阴影 |
| 7 | **Combobox** | combobox | Combobox（Base UI Combobox） | 可搜索 + 可自由输入的选择器。Select 的扩展，复用其浮层样式 |
| 8 | **ButtonGroup** | button-group | Group（Base UI） | 按钮组：相邻按钮共享边框，`data-orientation` 横/竖。复用 buttonVariants |
| 9 | **CopyButton** | copy-button | Button + useCopyToClipboard hook | 独立复制按钮。复制成功显示 `[COPIED]` 文本 1.5s 后回退，无 toast |
| 10 | **Toolbar** | toolbar | Toolbar/Toolbar.Group/Toolbar.Button | 水平工具条：Button + Separator + Toggle 组合。`role="toolbar"`，方向键切换焦点 |

### B. 数据展示（data-display）— 3 个

| # | 组件 | appica 对应 | Base UI 原语 | Nothing 适配要点 |
|---|------|------------|-------------|------------------|
| 11 | **Sparkline** | sparkline | 无（纯 SVG） | 迷你趋势线：1.5px 描边、无填充、`currentColor`、`--font-mono` 数值。最高/低点用 opacity 区分而非色相 |
| 12 | **Thumbnail** | thumbnail | 无 | 图片缩略图：`--surface` 底 + `1px --border-visible`，加载失败回退点阵占位（不用灰色块） |
| 13 | **PreviewCard** | preview-card | Card | 媒体预览卡：复用 Card 变体 + Thumbnail 顶部 + 标题/元数据。`--radius-card` |

### C. 菜单与导航（navigation）— 1 个

| # | 组件 | appica 对应 | Base UI 原语 | Nothing 适配要点 |
|---|------|------------|-------------|------------------|
| 14 | **TOC** | toc | 无（锚点滚动） | 目录导航：当前节高亮用 `--border-width-accent` 左条（同 DataTable active 行），ScrollArea 容器 |

### D. 浮层（overlays）— 1 个

| # | 组件 | appica 对应 | Base UI 原语 | Nothing 适配要点 |
|---|------|------------|-------------|------------------|
| 15 | **DatePicker** | date-picker | Popover + Calendar | 日期选择浮层：Popover 包裹 Calendar，触发器用 Input（readonly）+ 日历图标。复用 Popover/Calendar 样式 |

### E. 状态与反馈（feedback）— 3 个

| # | 组件 | appica 对应 | Base UI 原语 | Nothing 适配要点 |
|---|------|------------|-------------|------------------|
| 16 | **Meter** | meter | Meter（Base UI） | 量规（有界值，区别于 ProgressBar 无界进度）。分段条 + 临界值标记，`--warning`/`--accent` 仅作用于值本身 |
| 17 | **Skeleton**（改造） | skeleton | 无 | **改造为点阵占位**：不用灰色块，用 DotMatrix 网格 + 呼吸动画（motion-reduce 下静态）。保留 `Skeleton` 名以维持 appica 映射，但 `data-variant="dotmatrix"` |
| 18 | **Toast**（改造） | toast | 无 | **改造为内联状态条**：不浮窗、不自动消失、不 portal。文档流内 `role="status"` 横条，`[SAVED]`/`[ERROR: …]` 风格。`data-placement="inline"` |

### F. 时间与系统（time-system）— 1 个

| # | 组件 | appica 对应 | Base UI 原语 | Nothing 适配要点 |
|---|------|------------|-------------|------------------|
| 19 | **Countdown** | countdown | 无 | 倒计时：Doto 大数字（≥36px）+ Space Mono 单位。到期触发 `onComplete`，临近时升为 `--accent` |

### G. 装饰与效果（decoration）— 2 个

| # | 组件 | appica 对应 | Base UI 原语 | Nothing 适配要点 |
|---|------|------------|-------------|------------------|
| 20 | **TextAnimate** | text-animate | motion | 文本逐字/逐行揭示：`--transition-fade` + `--duration-transition`，无 spring/bounce。支持 `mode="char"/"word"/"line"` |
| 21 | **GradientGlow**（改造） | gradient-glow | 无 | **改造为点阵环境背景**：不用渐变/光晕/blur。DotMatrix 网格 + opacity 阶梯营造氛围。`data-variant="dotmatrix"`，仅作背景层 |

## 四、实施步骤

### 阶段 1：组件实现（21 个，按分类顺序）

每个组件按以下统一流程落地（参照 `SRC/Button/` 与 `entries/button.tsx`）：

1. **建目录** `SRC/<Name>/`
2. **写 `<name>-variants.ts`**：CVA 工厂 + 类型 + resolve* 兼容函数（无变体枚举的简单组件可省，直接在 .tsx 内联）
3. **写 `<Name>.tsx`**：
   - import Base UI 原语 + `cn`/`dataAttr` from `@/lib/utils` + 变体
   - `data-slot="<kebab-name>"` + `data-variant`/`data-size`/`data-state`
   - 中英双语 `aria-label`（交互组件）
   - `displayName = '<Name>'`
4. **写 `index.ts`**：导出组件 + 类型 + 变体工厂 + default
5. **写 `<Name>.test.tsx`**：渲染不报错、data-slot 存在、变体 className、aria/role、click/keyboard 回调
6. **建示例** `SRC/site/examples/<name>/<scenario>.tsx`：2–4 个场景（basic/variants/sizes/交互态）
7. **写 registry 条目** `SRC/site/registry/entries/<slug>.tsx`：参照 button.tsx 结构
8. **登记 manifest** `SRC/site/registry/manifest.ts`：在 ENTRIES 数组追加一条（slug/name/category/status: 'stable'/description:{zh,en}）

**实施顺序（依赖优先）：**
1. 先做被依赖的基础件：CopyButton（被 InputCopy 参考）、Thumbnail（被 PreviewCard 依赖）
2. 表单类：Field → Fieldset → NumberField → DateField → TimeField → Autocomplete → Combobox → ButtonGroup → Toolbar
3. 数据/导航：Sparkline → PreviewCard → TOC → DatePicker
4. 反馈：Meter → Skeleton(改造) → Toast(改造)
5. 时间/装饰：Countdown → TextAnimate → GradientGlow(改造)

### 阶段 2：同步导出

```bash
cd <REACT_ROOT>
npm run sync:exports    # 重新生成 SRC/index.ts + 子路径 exports
npm run sync:subpaths   # 生成 aios-ui-kit/<name> 子路径
```

### 阶段 3：更新 Skill 文档

**3.1 更新 `SKILL.md` 第 264–347 行「Available Components」**
- 校正现有列表与 v2 manifest 的一致性（移除已不存在的旧名如 Sonner/WorldClock 的错位，补齐 agent/conversation 组件）
- 在对应分类下追加 21 个新组件，每个一行：`- **<Name>** — <简短描述>`
- 分类归属见上表

**3.2 更新 `SKILL.md` 第 191–205 行「ANTI-PATTERNS」**
- 在「No skeleton loading screens」条目下补充：「如需结构占位，使用 `Skeleton` 组件的 `dotmatrix` 变体（点阵呼吸），而非灰色块」
- 在「No toast popups」条目下补充：「如需 transient 状态提示，使用 `Toast` 组件的 `inline` 变体（文档流内状态条），而非浮窗 portal」
- 在「No gradients」条目下补充：「如需环境氛围层，使用 `GradientGlow` 组件的 `dotmatrix` 变体（点阵 opacity 阶梯），而非渐变光晕」

**3.3 更新 `references/components.md`**（按需）
- 为 21 个新组件各补一条规格条目（名称、用途、变体、Props、Nothing 适配说明）
- 改造类组件（Skeleton/Toast/GradientGlow）显式标注「改造自 appica，适配 Nothing」

### 阶段 4：验证

```bash
cd <REACT_ROOT>
npm run lint            # ESLint 9 通过
npm run typecheck       # tsc --noEmit 通过
npm test               # Vitest 全绿（含 21 个新 *.test.tsx）
npm run dev             # 启动 Vite showcase（http://localhost:5175/Nothing-UI/）
```

人工验证：
- 文档站 `/components` 页面出现 21 个新条目，分类正确
- 每个新组件页：preview 渲染、示例可点、props 表完整、accessibility 段落有内容
- 暗/亮主题切换下新组件表现一致（无硬编码色值）
- 改造组件（Skeleton/Toast/GradientGlow）不出现灰色块/浮窗/渐变

## 五、假设与决策

1. **Base UI 原语可用性**：假设 `@base-ui/react` 已提供 Field/Fieldset/NumberField/Combobox/Toolbar/Meter 等原语（与 appica 同源，appica 即基于 Base UI）。若某原语不存在，退化为原生 HTML + 自实现 a11y。
2. **保留 appica 命名**：为维持对比映射清晰，21 个组件名与 appica 一致（含改造的 Skeleton/Toast/GradientGlow），通过 `data-variant` 区分 Nothing 改造形态。
3. **不更新 COMPONENTS.md**：该文件引用旧版扁平结构（`src/components/Buttons.tsx`），已过时；以 `manifest.ts` + `entries/` 为权威，避免双重维护。
4. **示例图标**：复用 `@tabler/icons-react`（站点已依赖），不引入新图标包。
5. **双语文案**：所有新组件的 description/aria-label/示例文案均提供 zh/en，沿用现有 `t(zh, en)` 约定。
6. **改造组件命名冲突处理**：Skeleton/Toast/GradientGlow 保留原名但在 registry 条目与 SKILL.md 中显式标注「Nothing 改造变体」，避免使用者误用 appica 原形态。

## 六、风险与缓解

| 风险 | 缓解 |
|------|------|
| Base UI 某些原语（如 Meter/Combobox）API 与 appica 不完全一致 | 实现时以 Base UI 官方 API 为准，参照 appica 的 props 设计但适配 Base UI 签名 |
| 21 组件工作量大，一次性 PR 难审查 | 按阶段 1 的依赖顺序分批提交，每批跑通 lint+test 再继续 |
| 改造组件可能被使用者误用为 appica 原形态 | 在 registry accessibility 段与 SKILL.md ANTI-PATTERNS 双重标注 |
| sync:exports 脚本可能因目录命名不符预期报错 | 严格按 `<Name>/index.ts` 导出格式，先跑 `sync:exports` 再补 manifest |

## 七、文件变更清单

### 新增文件（约 105 个）
- 21 × `SRC/<Name>/<Name>.tsx`
- 21 × `SRC/<Name>/<name>-variants.ts`（无变体的简单组件可省，合并入 .tsx）
- 21 × `SRC/<Name>/<Name>.test.tsx`
- 21 × `SRC/<Name>/index.ts`
- 21 × `SRC/site/registry/entries/<slug>.tsx`
- 约 60 × `SRC/site/examples/<name>/<scenario>.tsx`（每组件 2–4 个）

### 修改文件
- `SRC/site/registry/manifest.ts`（追加 21 条 ENTRIES）
- `SRC/index.ts`（由 sync:exports 自动生成，不手改）
- `nothing-design-skill/nothing-design/SKILL.md`（Available Components + ANTI-PATTERNS）
- `nothing-design-skill/nothing-design/references/components.md`（追加 21 条规格）
- `REACT_ROOT/package.json` 的 `exports` 字段（由 sync:subpaths 自动生成）
