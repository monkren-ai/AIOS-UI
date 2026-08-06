import { cva } from 'class-variance-authority'

/**
 * Combobox 的视觉变体。
 *
 * 与 `Autocomplete` 共用同一套浮层 / 输入 / 列表样式：层级只靠 background + border
 * 表达，没有阴影、没有 blur、没有渐变。选中态额外加了 Select 那条 2px 左条与 ✓ 标记。
 */
export const comboboxVariants = cva(['relative flex w-full flex-col gap-1'], {
  variants: {
    size: { sm: '', md: '', lg: '' },
    disabled: { true: 'opacity-40', false: '' },
    hasError: { true: '', false: '' },
  },
  defaultVariants: { size: 'md', disabled: false, hasError: false },
})

/** 字段标签。 */
export const comboboxLabelVariants = cva(
  ['font-mono uppercase tracking-wider text-foreground-muted'],
  {
    variants: {
      size: { sm: 'text-micro', md: 'text-label', lg: 'text-caption' },
      hasError: { true: 'text-accent', false: '' },
      disabled: { true: 'text-foreground-disabled', false: '' },
    },
    defaultVariants: { size: 'md', hasError: false, disabled: false },
  },
)

/** 输入框外壳：边框 / 背景都在这里，Input 本体透明。 */
export const comboboxControlVariants = cva(
  [
    'relative flex w-full items-center gap-2',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        outline: 'rounded-input border border-border-visible bg-transparent focus-within:border-foreground',
        soft: 'rounded-input border border-border bg-surface-raised focus-within:border-border-visible',
      },
      size: { sm: 'h-9 min-h-9 px-2', md: 'h-11 min-h-11 px-3', lg: 'h-13 min-h-13 px-4' },
      hasError: { true: 'border-accent focus-within:border-accent', false: '' },
      disabled: { true: 'border-border focus-within:border-border', false: '' },
    },
    defaultVariants: { variant: 'outline', size: 'md', hasError: false, disabled: false },
  },
)

/** Input 本体：无边框、无背景。 */
export const comboboxInputVariants = cva(
  [
    'w-full min-w-0 flex-1 border-0 bg-transparent font-mono text-foreground outline-none',
    'placeholder:text-foreground-disabled',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'disabled:cursor-not-allowed disabled:text-foreground-disabled',
  ],
  {
    variants: { size: { sm: 'py-1 text-sm', md: 'py-2 text-base', lg: 'py-2 text-base' } },
    defaultVariants: { size: 'md' },
  },
)

export const comboboxPositionerVariants = cva(['z-[var(--z-overlay)]'])

/** 浮层：与 Select / Autocomplete 同款，surface-raised 底 + border-visible 框，无阴影。 */
export const comboboxContentVariants = cva([
  'min-w-40 overflow-hidden rounded-sm border border-border-visible bg-popover',
  'transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate',
  'motion-reduce:transition-none',
  'closed:-translate-y-1 closed:opacity-0 open:translate-y-0 open:opacity-100',
])

export const comboboxListVariants = cva(['max-h-60 overflow-y-auto py-1'])

/**
 * 选项。
 *
 * 选中态沿用 Select 的表达：左侧 2px 红条 + muted 底，`before:start-0` 在 RTL 下自动换边。
 * 高亮态垫 `accent-subtle`，焦点环走 `interactive`。
 */
export const comboboxItemVariants = cva(
  [
    'relative flex min-h-9 cursor-pointer select-none items-center justify-between gap-2 px-4',
    'font-mono text-sm text-foreground [-webkit-tap-highlight-color:transparent]',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'hover:bg-surface',
    'focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-interactive',
  ],
  {
    variants: {
      size: { sm: 'min-h-9 px-3', md: 'min-h-11 px-4', lg: 'min-h-13 px-4' },
      selected: {
        true: [
          'bg-muted text-foreground-display',
          "before:absolute before:inset-y-0 before:start-0 before:w-0.5 before:bg-accent before:content-['']",
        ],
        false: '',
      },
      highlighted: { true: 'bg-accent-subtle', false: '' },
      disabled: { true: 'pointer-events-none text-foreground-disabled', false: '' },
    },
    defaultVariants: { size: 'md', selected: false, highlighted: false, disabled: false },
  },
)

/** 选中打勾。默认透明，选中时淡入；`ms-auto` 保证 RTL 下也贴在行尾。 */
export const comboboxItemIndicatorVariants = cva([
  'ms-auto ps-2 text-caption text-interactive opacity-0',
  'transition-opacity duration-200 ease-nothing motion-reduce:transition-none',
  'selected:opacity-100',
])

/** 无结果占位行。 */
export const comboboxEmptyVariants = cva([
  'flex min-h-9 items-center px-4 font-mono text-sm text-foreground-disabled',
])

/** 右侧下拉箭头。 */
export const comboboxIconVariants = cva([
  'shrink-0 select-none text-caption text-foreground-muted',
  'transition-transform duration-200 ease-nothing motion-reduce:transition-none',
])

/** 清除按钮。 */
export const comboboxClearVariants = cva([
  'inline-flex shrink-0 cursor-pointer items-center justify-center',
  'border-0 bg-transparent text-foreground-muted',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  'hover:text-foreground',
  'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  '[&svg]:size-[1em] [&svg]:shrink-0',
])

/** 错误文案。 */
export const comboboxErrorVariants = cva([
  'mt-xs font-mono text-label uppercase tracking-wide text-accent',
])

export type ComboboxSize = 'sm' | 'md' | 'lg'
export type ComboboxVariant = 'outline' | 'soft'
