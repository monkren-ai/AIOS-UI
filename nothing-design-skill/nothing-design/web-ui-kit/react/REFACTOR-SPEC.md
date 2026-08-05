# Nothing UI v2 组件重构规范

> 以 [appica-ui](https://github.com/appica-dev/appica-ui) 的工程约定为基础，配色与形态仍严格服从 Nothing 设计语言。
> 所有参与重构的人/Agent 必须先读完本文，再动组件。

样板参考实现：`src/Button/`（`Button.tsx` + `button-variants.ts` + `index.ts` + `Button.test.tsx`，**没有 .css 文件**）。

---

## 1. 本次重构改了什么

| 维度 | v1（旧） | v2（新） |
|---|---|---|
| 样式载体 | 每组件一个 `.css` + `nothing-*` BEM 类 | Tailwind v4 工具类，写在 CVA 里 |
| className 合并 | `clsx` | `cn()` = `clsx` + `tailwind-merge`（调用方的类能覆盖变体默认值） |
| ref | `React.forwardRef` | React 19 ref-as-prop，**不再用 forwardRef** |
| size | `default \| sm \| lg \| icon \| icon-sm \| icon-lg` | `sm \| md \| lg`（+ 需要时 `icon-sm \| icon-md \| icon-lg`） |
| variant | 各组件各自发挥 | 收敛到统一词表（见 §3） |
| 图标间距 | `leadingIcon` / `trailingIcon` props | children 里用 `data-icon="start" \| "end"` 标注 |
| 方向 | 物理属性 `margin-left` | 逻辑属性 `ms-*` / `me-*` / `ps-*` / `pe-*`，RTL 自动镜像 |

设计令牌没有变。`src/styles/tokens.css` 仍是唯一真源，`src/styles/theme.css` 只是把它映射进 Tailwind 的 namespace。

---

## 2. 可用的工具类

**只能用 `theme.css` 里声明过的刻度。** Tailwind 默认调色板已被 `--color-*: initial` 整体关掉——写 `bg-blue-500` 不会有任何样式，这是刻意的。

### 颜色

| 工具类 | 指向 tokens.css |
|---|---|
| `bg-background` | `--black`（页面底色） |
| `bg-surface` / `bg-surface-raised` | `--surface` / `--surface-raised` |
| `bg-muted` | `--muted-bg`（hover 垫色） |
| `border-border` / `border-border-visible` | `--border` / `--border-visible` |
| `text-foreground` | `--text-primary` |
| `text-foreground-display` | `--text-display`（最高对比，标题/主按钮） |
| `text-foreground-muted` | `--text-secondary` |
| `text-foreground-subtle` | `--text-tertiary` |
| `text-foreground-disabled` | `--text-disabled` |
| `text-accent` / `bg-accent` / `bg-accent-subtle` | `--accent`（#D71921，Nothing 红） |
| `outline-interactive` | `--interactive`（焦点环） |
| `bg-popover` / `text-popover-foreground` | 浮层 |
| `text-white` / `text-black` | 绝对色，仅用于「红底白字」这类必须锁死的场合 |

### 字号

`text-display-xl|lg|md|sm` · `text-heading` · `text-subheading` · `text-base` · `text-sm` · `text-xs` · `text-caption` · `text-label` · `text-micro`
（自带 line-height 与 letter-spacing，不用再手写）

### 字体

`font-mono`（控件标签，大写）· `font-body` / `font-sans`（正文）· `font-display`（Doto，大号数字）· `font-ndot`

### 圆角

`rounded-2xs|xs|sm|md|lg|xl|2xl|full|pill` + 语义化的 `rounded-button` · `rounded-card` · `rounded-card-compact` · `rounded-input` · `rounded-tag` · `rounded-tooltip` · `rounded-segment`

### 间距

`--spacing` 基准是 **4px**，所以 `p-1`=4px、`p-2`=8px、`p-4`=16px、`p-6`=24px。也可以用具名的 `p-md` / `gap-lg`。

### 动效

`ease-nothing`（默认缓动）· `ease-back` · `ease-spring-fast|moderate|slow` · `animate-agent-breathe|pulse|step`

### 状态变体

`open:` `closed:` `highlighted:` `selected:` `checked:` `unchecked:` `pressed:` `loading:` —— 对应 Base UI 的 `data-*` 约定。
主题用 `dark:` / `light:`，它们匹配 `[data-theme]`（不是 `prefers-color-scheme`）。

---

## 3. 统一的 variant / size 词表

```ts
size:    'sm' | 'md' | 'lg'                       // 默认 'md'
         // 纯图标控件追加 'icon-sm' | 'icon-md' | 'icon-lg'

variant: 'primary'          // 实心反相：bg-foreground-display text-background
       | 'primary-outline'  // 描边，hover 反相填充
       | 'secondary'        // border-border-visible + 透明底
       | 'soft'             // bg-surface-raised + border-border
       | 'outline'          // border-border + 透明底，文字更弱
       | 'ghost'            // 无边框，hover 才有 bg-muted
       | 'destructive'      // border-accent + text-accent
```

不是每个组件都要实现全部 7 个变体，但**实现了的必须叫这个名字、长这个样子**。
输入类控件（Input / Textarea / Select / Autocomplete…）通常只需要 `outline`（默认）与 `soft` 两个。

高度基线：`sm` = 36px（`h-9`）· `md` = 44px（`h-11`，等于 `--touch-target-min`）· `lg` = 52px（`h-13`）。

---

## 4. 逐组件的改造步骤

1. **`<Name>-variants.ts`** —— 用 `cva()` 写 Tailwind 类。第一个参数是 base 类数组，`variants` 里放 `variant` / `size` / 其它布尔开关，末尾给 `defaultVariants`。
   - 旧的变体名不要直接删。像 Button 那样加一张 `LEGACY_VARIANTS` 映射表 + `resolveXxxVariant()`，让老调用点继续能跑。
2. **`<Name>.tsx`**
   - 普通函数组件，`ref` 直接写在 props 里（`React.ComponentPropsWithRef<'button'>`），**不要 forwardRef**。
   - 根元素必须有 `data-slot="<kebab-name>"`，子元素用 `data-slot="<name>-<part>"`。
   - 布尔状态用 `dataAttr()` 输出成 `data-*`，供 CSS 与测试选择。
   - `className={cn(xxxVariants({ ... }), className)}` —— 调用方的 className 永远放最后。
   - 交给 Base UI 的部分保持不变；Base UI 的 `className` 支持函数形式 `(state) => string`，需要读 state 时用它。
3. **删掉 `<Name>.css`**，同时 `rg` 一遍它的类名，把库内和 showcase 里的引用点一并改掉。
4. **`index.ts`** 导出组件、props 类型、以及 `xxxVariants`（让「长得像按钮的链接」这类需求有出路）。
5. **测试** 断言 `data-slot` / `data-*` 属性和行为，**不要断言具体 Tailwind 类名**——那太脆。唯一值得测类名的是「调用方能覆盖变体默认值」这条，参考 `Button.test.tsx` 里的 `rounded-none` 用例。

---

## 5. 硬约束（沿用 AGENTS.md，Tailwind 下同样成立）

- **禁止**阴影、blur、渐变。没有 `shadow-*`、没有 `backdrop-blur-*`、没有 `bg-gradient-*`。层级只用 background + border 表达。
- **禁止**引入新颜色。默认调色板已关，想加色先改 `tokens.css` 并说明理由。
- 主题切换只认 `[data-theme]`，不写 `prefers-color-scheme` 媒体查询。
- 所有 UI 文案走 `t(zh, en)` 双语。
- 动效必须给 `motion-reduce:` 兜底。
- 间距/尺寸走逻辑属性，别写 `left`/`right`。

---

## 6. 自查

```bash
npm run type-check
npm run test
npm run lint
npm run sync:exports -- --check
npm run build:showcase
```

外加人工过一遍：亮/暗主题、中/英切换、RTL（`<html dir="rtl">`）、键盘导航。
