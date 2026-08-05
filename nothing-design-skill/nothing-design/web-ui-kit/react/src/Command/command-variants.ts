import { cva } from 'class-variance-authority'

/** 命令面板容器。 */
export const commandVariants = cva([
  'w-full max-w-[var(--modal-max-width)] overflow-hidden',
  'rounded-lg border border-border-visible bg-surface-raised',
])

/**
 * 搜索框。
 *
 * 旧 CSS 的聚焦态是 `box-shadow: inset ...`；阴影在 v2 被禁掉了，
 * 换成向内偏移的 outline，视觉等价但不引入阴影。
 */
export const commandInputVariants = cva(
  [
    'w-full border-0 border-b border-border bg-transparent',
    'text-start font-mono text-sm text-foreground outline-none',
    'placeholder:text-foreground-disabled',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-interactive',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9 px-4 py-2',
        md: 'min-h-11 px-6 py-4',
        lg: 'min-h-13 px-6 py-4',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export const commandListVariants = cva(['max-h-80 overflow-y-auto py-1'])

export const commandGroupVariants = cva([])

export const commandGroupHeadingVariants = cva([
  'pt-2 pb-1 px-6 text-start',
  'font-mono text-caption uppercase tracking-wider text-foreground-disabled',
])

/** 单条命令。行高走 36 / 44 / 52 的触达基线。 */
export const commandItemVariants = cva(
  [
    'flex cursor-pointer select-none items-center gap-2',
    '[-webkit-tap-highlight-color:transparent]',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'hover:bg-muted',
    'focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-interactive',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9 px-4 py-1',
        md: 'min-h-11 px-6 py-2',
        lg: 'min-h-13 px-6 py-2',
      },
      selected: {
        true: 'bg-accent-subtle',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none text-foreground-disabled',
        false: '',
      },
    },
    defaultVariants: { size: 'md', selected: false, disabled: false },
  },
)

export const commandItemIconVariants = cva([
  'inline-flex size-5 shrink-0 items-center justify-center text-foreground-muted',
  '[&_svg]:size-full',
])

export const commandItemLabelVariants = cva(['flex-1 text-start font-body text-sm text-foreground'])

/** 快捷键提示。靠 flex 排在末尾，RTL 下自动跑到另一侧。 */
export const commandItemShortcutVariants = cva([
  'shrink-0 font-mono text-caption text-foreground-disabled',
])

export const commandEmptyVariants = cva([
  'p-6 text-center font-body text-sm text-foreground-disabled',
])

/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = {
  default: 'md',
} as const

export type CommandSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES

export function resolveCommandSize(size: CommandSize | null | undefined) {
  if (!size) return undefined
  return (LEGACY_SIZES as Record<string, string>)[size] ?? size
}
