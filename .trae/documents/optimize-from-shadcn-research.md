# 调研 shadcn/ui 并优化 Nothing UI 设计系统

## 摘要

基于 shadcn/ui（GitHub 17k+ stars，2024-2025 最流行的 React 设计系统）的成熟模式，对 Nothing UI 进行**架构级**优化。核心是引入 CVA 变体管理、`cn()` 工具函数、路径别名与 `data-slot`/`data-variant` 属性约定，让 67+ 组件的类型安全、可扩展性和一致性达到 shadcn 同等水准。

研究结论：
- shadcn 本质 = `Radix UI`（行为 + 无障碍） + `Tailwind CSS`（样式） + `CLI`（分发）
- Nothing UI 已具备 BEM + CSS 变量 + 浅/深主题，无需复制 Tailwind 工具链
- **可借鉴的 shadcn 核心模式**：CVA、`cn()` 合并、`data-slot` 属性、`components.json` 配置、类型安全 API 导出
- **不适用**：复制粘贴分发（已有源码）、Tailwind 集成（与现有 token 系统冲突）、`lucide-react`（已有自定义 widget icon）

## 当前状态分析

### 项目概况（已探索）

| 指标 | 数值 |
|------|------|
| 顶层组件 | 67 个（`src/components/*.tsx`） |
| Widget 子组件 | 43 个（`src/components/widgets/sub/`） |
| Nullframe 组件 | 14 个（`src/components/nullframe/`） |
| CSS 文件 | 78 个（`src/styles/*.css`） |
| 样式约定 | BEM `nothing-{block}--{modifier}` |
| Token 系统 | `tokens.css` 含深/浅主题 CSS 变量 |
| TypeScript | 严格模式（`strict: true`） |
| 运行时依赖 | 4 个（react, react-dom, clsx, motion） |
| 包管理器 | npm（存在 `package-lock.json` + `pnpm-lock.yaml` 冲突） |

### 已具备但未充分利用

- ✅ `tsconfig.json` 已配置 `@/*` 路径别名（指向 `./src/*`）
- ✅ `vite.config.ts` 已配置 `@` 别名解析
- ✅ 已安装 `clsx`
- ✅ 已有 `tokens.css`（CSS 变量驱动主题）
- ✅ 已有 BEM 命名规范
- ✅ 已有 `useDisclosure`、`useClickOutside`、`useFloating` 等 hooks

### 关键缺陷（按严重度）

#### P0 — 缺失核心工具函数

1. **无 `cn()` 工具函数**：67 个组件全部使用手写 `[...].filter(Boolean).join(' ')`，约 150+ 处重复模板代码
2. **无 CVA 变体管理**：所有 `variant`/`size`/`theme` 等枚举都靠 `if/三元` 拼接，类型不完整，无法 IDE 提示

#### P1 — 缺失现代约定

3. **无 `data-slot`/`data-variant` 属性**：CSS 只能用 BEM 修饰类，无法用 `[data-variant="primary"]` 选择器
4. **无 `lib/utils.ts`**：约定缺失，无法扩展（如 `composeProps`、`mergeRefs`）
5. **无 `components.json` 配置**：未来要做 CLI/Registry 时缺少项目元数据
6. **包管理器冲突**：`package-lock.json` 与 `pnpm-lock.yaml` 同时存在

#### P2 — 一致性问题

7. **Variant API 不统一**：`<Button variant="primary">` vs `<WidgetCard theme="dark">` vs `<Badge variant="outline">`，三套独立逻辑
8. **类型导出分散**：`ButtonProps`、`CardProps` 等内联，缺少数统一类型入口
9. **`CtlCtx` 类型不安全**（来自 project-audit.md）：`createContext<Ctl>(null as unknown as Ctl)`
10. **App.tsx 膨胀**：1410 行，40+ CSS 手动导入，缺代码分割

## 提议的修改（具体到文件）

### 阶段 A：基础设施（不破坏现有 API）

#### A1. 新增 `src/lib/utils.ts` — cn 工具函数

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/src/lib/utils.ts`（新建）

```ts
import { clsx, type ClassValue } from 'clsx'

/**
 * 合并 className（替代 [...].filter(Boolean).join(' ')）
 * 设计系统基于 CSS（而非 Tailwind），无需 tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/**
 * 合并多个 refs（用于 forwardRef 场景）
 */
export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(node)
      else if (ref && 'current' in ref) (ref as React.MutableRefObject<T | null>).current = node
    })
  }
}

/**
 * 为组件 props 注入标准 data 属性（让 CSS 钩子更稳健）
 */
export function dataAttr(value: string | number | boolean | undefined | null) {
  return value === undefined || value === false || value === null ? undefined : value
}
```

#### A2. 安装 `class-variance-authority` 依赖

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/package.json`

添加到 `dependencies`：
```json
"class-variance-authority": "^0.7.0"
```

执行：`npm install class-variance-authority`

#### A3. 删除 `pnpm-lock.yaml` 冲突文件

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/pnpm-lock.yaml`（删除）

理由：项目使用 npm + `package-lock.json`，pnpm-lock 残留会导致依赖漂移。

#### A4. 修复 `CtlCtx` 类型安全（顺手）

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/src/system/hooks.ts`

```ts
// 修改前
export const CtlCtx = createContext<Ctl>(null as unknown as Ctl)
export const useCtl = () => useContext(CtlCtx)

// 修改后
export const CtlCtx = createContext<Ctl | null>(null)
export function useCtl(): Ctl {
  const ctx = useContext(CtlCtx)
  if (!ctx) throw new Error('useCtl must be used within <CtlCtx.Provider>')
  return ctx
}
```

---

### 阶段 B：建立 CVA 变体约定（仅限高频组件）

选择 6 个最常用、有清晰变体维度的组件作为试点，避免一次性大改。

#### B1. 重构 `Button` 组件

**文件**：
- `src/components/Buttons.tsx`（修改）
- `src/styles/buttons.css`（无需改动，但补充 `[data-variant="xxx"]` 选择器支持）

**做法**：
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/buttons.css'

const buttonVariants = cva('nothing-btn', {
  variants: {
    variant: {
      primary: 'nothing-btn--primary',
      secondary: 'nothing-btn--secondary',
      ghost: 'nothing-btn--ghost',
      destructive: 'nothing-btn--destructive',
    },
    size: {
      default: '',
      sm: 'nothing-btn--sm',
      lg: 'nothing-btn--lg',
    },
    fullWidth: { true: 'nothing-btn--full', false: '' },
  },
  defaultVariants: { variant: 'primary', size: 'default', fullWidth: false },
})

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    disabled?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      data-variant={dataAttr(variant)}
      data-size={dataAttr(size)}
      {...props}
    />
  )
)
Button.displayName = 'Button'
export default Button
```

#### B2-B6. 同样模式应用到 5 个组件

| # | 组件 | 变体维度 | 文件 |
|---|------|---------|------|
| B2 | `Card` | mode(content/widget) × variant × interactive | `src/components/Card.tsx` |
| B3 | `Badge` | variant(default/secondary/destructive/outline) | `src/components/Badge.tsx` |
| B4 | `Alert` | variant(default/destructive) | `src/components/Alert.tsx` |
| B5 | `Input` | variant(underline/bordered) × error × disabled | `src/components/Inputs.tsx` |
| B6 | `QuickToggle` | variant(circle/pill) × theme(light/dark/accent/error) | `src/components/QuickToggle.tsx` |

每个组件都：
1. 引入 `cva` 和 `cn`
2. 提取 `xxxVariants` 配置到组件顶部
3. 导出 `xxxVariants` 与 `xxxProps` 类型
4. 渲染时添加 `data-variant`、`data-size` 属性
5. **CSS 文件不动**（保持 BEM 后向兼容）

---

### 阶段 C：建立约定文档与配置

#### C1. 新增 `src/lib/variants.ts` — 共享变体定义

**文件**：`src/lib/variants.ts`（新建）

集中定义跨组件复用的变体（如 `light/dark/accent` 主题），避免重复：

```ts
import { cva } from 'class-variance-authority'

/** 主题变体：浅/深/强调/错误 */
export const themeVariants = cva('', {
  variants: {
    theme: {
      light: 'nothing-theme--light',
      dark: 'nothing-theme--dark',
      accent: 'nothing-theme--accent',
      error: 'nothing-theme--error',
    },
  },
  defaultVariants: { theme: 'dark' },
})

/** 尺寸变体：小/默认/大 */
export const sizeVariants = cva('', {
  variants: {
    size: {
      sm: 'nothing-size--sm',
      md: 'nothing-size--md',
      lg: 'nothing-size--lg',
    },
  },
  defaultVariants: { size: 'md' },
})
```

#### C2. 新增 `components.json` — 设计系统元数据

**文件**：`nothing-design-skill/nothing-design/web-ui-kit/react/components.json`（新建）

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "name": "nothing-ui",
  "version": "1.0.0",
  "style": "nothing",
  "tsx": true,
  "cssVariables": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "styles": "@/styles"
  },
  "tokens": "./src/styles/tokens.css",
  "iconLibrary": "svg-icon"
}
```

用途：
- 文档化项目结构
- 为未来 CLI / Registry 工具预留接口
- 团队成员快速理解约定

#### C3. 创建 `src/lib/index.ts` 公共导出

**文件**：`src/lib/index.ts`（新建）

```ts
export { cn, mergeRefs, dataAttr } from './utils'
export { themeVariants, sizeVariants } from './variants'
```

---

### 阶段 D：清理与文档

#### D1. 更新 `SKILL.md` Available Components 章节

**文件**：`nothing-design-skill/nothing-design/SKILL.md`

在 `## 4. WEB UI KIT WORKFLOW` 章节中，补充：
- `cn()` 工具函数使用说明
- 路径别名约定 `@/components`、`@/lib/utils`、`@/hooks`
- 变体约定（推荐使用 CVA 模式）

#### D2. 补充 `references/tokens.md` — 路径别名与工具函数章节

**文件**：`nothing-design-skill/nothing-design/references/tokens.md`

新增 "7. Path Aliases & Utilities" 章节，列出所有可用的 `@/` 别名与 `cn()` 用法。

#### D3. 验证清单

| 检查项 | 命令 | 期望结果 |
|--------|------|---------|
| TypeScript 类型 | `npx tsc --noEmit` | 0 错误 |
| ESLint | `npm run lint` | 0 警告（除既有） |
| 视觉回归 | `npm run dev` + 浏览器目测 | 6 个重构组件外观与重构前一致 |
| 构建 | `npm run build` | 成功，bundle 体积不增加 >5% |

## 假设与决策

1. **保留 CSS 而非切换 Tailwind**：现有 78 个 CSS 文件 + token 系统已成熟，迁移成本高、收益小。`cn()` 退化为纯 `clsx` 即可。
2. **CVA 仅用于 6 个试点组件**：避免一次性全量重构；待模式验证后再扩展。
3. **不引入 shadcn CLI/Registry**：现有 `npm` + 源码分发已满足需求；`components.json` 仅作文档与未来预留。
4. **保留 BEM 类名**：`nothing-btn--primary` 仍然存在，`cva` 只是把字符串字面量集中管理，不删除 CSS 类。
5. **向后兼容 API**：所有 `variant`/`size`/`theme` props 名称、类型、可选值不变，重构不影响调用方。
6. **CSS 文件不动**：所有 `*.css` 文件保持原样，`data-variant` 属性作为可选 CSS 钩子，不强制使用。
7. **修复 `CtlCtx` 类型安全**：与 CVA 重构无依赖关系，但同属代码质量提升，归入本计划。

## 实施顺序

| 顺序 | 阶段 | 估时 | 风险 |
|------|------|------|------|
| 1 | A1-A3（基础设施） | 短 | 低 |
| 2 | A4（CtlCtx 修复） | 短 | 低 |
| 3 | B1（Button 重构） | 中 | 低（API 兼容） |
| 4 | B2-B6（其余 5 个组件） | 中 | 低 |
| 5 | C1-C3（约定与配置） | 短 | 极低 |
| 6 | D1-D2（文档更新） | 短 | 极低 |
| 7 | 验证（D3） | 短 | — |

## 验证步骤

1. **类型检查**：`npx tsc --noEmit` 在 `react/` 目录执行，期望 0 错误
2. **构建测试**：`npm run build` 成功，bundle 体积与重构前差异 < 5%
3. **视觉对比**：
   - 启动 dev server，访问 Button/Card/Badge/Alert/Input/QuickToggle 6 个组件的演示页
   - 对比所有变体（variant × size × theme 笛卡尔积），确保外观与重构前完全一致
4. **Linter**：`npm run lint` 无新增警告
5. **依赖审计**：`npm ls class-variance-authority clsx` 确认无版本冲突

## 不在本次范围

- ❌ 引入 Tailwind CSS（与现有 CSS 冲突）
- ❌ 复制 shadcn Registry CLI（投入产出比低）
- ❌ 替换 `lucide-react`（已有自定义 WidgetIcons）
- ❌ 全量组件 CVA 化（仅 6 个试点）
- ❌ App.tsx 拆分懒加载（属于独立 task）
- ❌ 添加 Storybook（属于独立 task）
- ❌ nullframe 亮色主题适配（属于已存在的 project-audit.md P0，独立修复）
- ❌ 拼写错误修复（`NoSignam` → `NoSignal` 等，属于 P2，独立修复）

## 关键文件清单

| 操作 | 路径 |
|------|------|
| 新建 | `src/lib/utils.ts` |
| 新建 | `src/lib/variants.ts` |
| 新建 | `src/lib/index.ts` |
| 新建 | `components.json` |
| 修改 | `package.json`（添加 CVA 依赖） |
| 删除 | `pnpm-lock.yaml` |
| 修改 | `src/system/hooks.ts`（CtlCtx 类型） |
| 修改 | `src/components/Buttons.tsx` |
| 修改 | `src/components/Card.tsx` |
| 修改 | `src/components/Badge.tsx` |
| 修改 | `src/components/Alert.tsx` |
| 修改 | `src/components/Inputs.tsx` |
| 修改 | `src/components/QuickToggle.tsx` |
| 修改 | `SKILL.md`（追加约定文档） |
| 修改 | `references/tokens.md`（追加章节） |
