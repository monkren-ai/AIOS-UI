import { cva } from 'class-variance-authority'

/** 外层包裹：label / trigger / 错误文案的纵向容器。 */
export const selectVariants = cva(['relative inline-block w-full'], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    disabled: { true: 'pointer-events-none opacity-40', false: '' },
    hasError: { true: '', false: '' },
    open: { true: '', false: '' },
  },
  defaultVariants: { size: 'md', disabled: false, hasError: false, open: false },
})

export const selectLabelVariants = cva([
  'mb-xs block font-mono text-label uppercase tracking-wider text-foreground-muted',
])

/**
 * 触发器。
 *
 * 文字用 `text-start`、图标靠 flex 排到末尾，RTL 下整体自动镜像。
 */
export const selectTriggerVariants = cva(
  [
    'flex w-full cursor-pointer select-none items-center justify-between gap-2',
    'rounded-sm border border-border-visible bg-transparent',
    'whitespace-nowrap text-start font-mono text-sm text-foreground',
    '[-webkit-tap-highlight-color:transparent]',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'hover:border-foreground-muted',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'open:border-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 min-h-9 px-3',
        md: 'h-11 min-h-11 px-4',
        lg: 'h-13 min-h-13 px-4',
      },
      hasError: {
        true: 'border-accent hover:border-accent open:border-accent',
        false: '',
      },
      open: { true: '', false: '' },
    },
    defaultVariants: { size: 'md', hasError: false, open: false },
  },
)

export const selectValueVariants = cva(['flex-1 overflow-hidden text-ellipsis'])

export const selectPlaceholderVariants = cva([
  'flex-1 overflow-hidden text-ellipsis text-foreground-disabled',
])

/** 下拉箭头。展开时翻转 180°。 */
export const selectTriggerIconVariants = cva(
  [
    'shrink-0 text-caption text-foreground-muted',
    'transition-transform duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-0',
      },
    },
    defaultVariants: { open: false },
  },
)

export const selectPositionerVariants = cva(['z-[var(--z-overlay)]'])

/**
 * 浮层。
 *
 * 旧实现是 `@keyframes aios-select-enter`；这里换成 Base UI 的
 * `data-open` / `data-closed` + transition，不再需要关键帧。
 */
export const selectContentVariants = cva([
  'min-w-40 overflow-hidden rounded-sm border border-border-visible bg-popover',
  'transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate',
  'motion-reduce:transition-none',
  'closed:-translate-y-1 closed:opacity-0 open:translate-y-0 open:opacity-100',
])

export const selectSearchVariants = cva(['border-b border-border p-2'])

export const selectSearchInputVariants = cva([
  'w-full rounded-xs border border-border-visible bg-transparent px-2 py-1',
  'text-start font-mono text-sm text-foreground outline-none',
  'placeholder:text-foreground-disabled',
  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  'focus:border-interactive',
])

export const selectListVariants = cva(['max-h-60 overflow-y-auto py-1'])

/**
 * 选项。
 *
 * 选中态左侧那条 2px 红条用 `before:start-0`（不是 `left-0`），
 * RTL 下会自己换到右侧。
 */
export const selectItemVariants = cva(
  [
    'relative flex cursor-pointer select-none items-center justify-between gap-2',
    'overflow-hidden whitespace-nowrap text-ellipsis',
    'font-mono text-sm text-foreground [-webkit-tap-highlight-color:transparent]',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'hover:bg-surface',
    'focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-interactive',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9 px-3 py-1',
        md: 'min-h-11 px-4 py-2',
        lg: 'min-h-13 px-4 py-2',
      },
      selected: {
        true: [
          'bg-muted text-foreground-display',
          "before:absolute before:inset-y-0 before:start-0 before:w-0.5 before:bg-accent before:content-['']",
        ],
        false: '',
      },
      disabled: {
        true: 'pointer-events-none text-foreground-disabled',
        false: '',
      },
      highlighted: {
        true: 'bg-accent-subtle',
        false: '',
      },
    },
    defaultVariants: { size: 'md', selected: false, disabled: false, highlighted: false },
  },
)

/** 选中打勾。默认透明，选中时淡入；`ms-auto` 保证 RTL 下也贴在行尾。 */
export const selectItemIndicatorVariants = cva([
  'ms-auto ps-2 text-caption text-interactive opacity-0',
  'transition-opacity duration-200 ease-aios motion-reduce:transition-none',
  'selected:opacity-100',
])

export const selectErrorVariants = cva(['mt-xs font-mono text-caption text-error'])

/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = {
  default: 'md',
} as const

export type SelectSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES

export function resolveSelectSize(size: SelectSize | null | undefined) {
  if (!size) return undefined
  return (LEGACY_SIZES as Record<string, string>)[size] ?? size
}
