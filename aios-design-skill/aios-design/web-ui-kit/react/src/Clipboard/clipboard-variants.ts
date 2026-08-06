import { cva } from 'class-variance-authority'

/**
 * Clipboard 卡片容器。
 *
 * 层级只靠 surface + border 表达，没有阴影、没有 blur、没有渐变。
 */
export const clipboardVariants = cva(
  [
    'flex w-full flex-col',
    'rounded-lg border border-border bg-surface',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-8',
        lg: 'p-10',
      },
      state: {
        idle: '',
        copied: '',
      },
    },
    defaultVariants: { size: 'md', state: 'idle' },
  },
)

/** 头部一行：标题在前，计数在后。 */
export const clipboardHeaderVariants = cva(['mb-lg flex w-full items-baseline justify-between'])

export const clipboardTitleVariants = cva(
  [
    'font-mono uppercase tracking-widest text-foreground-muted',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'text-micro',
        md: 'text-label',
        lg: 'text-caption',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export const clipboardCountVariants = cva([
  'font-mono text-caption text-foreground-disabled',
  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
])

export const clipboardListVariants = cva(['mb-lg flex flex-col gap-xs'])

/** 单条剪贴记录。整行可点，所以高度走 36 / 44 / 52 的触达基线。 */
export const clipboardItemVariants = cva(
  [
    'group/clipboard-item flex cursor-pointer items-center justify-between gap-2',
    'border border-border bg-surface-raised',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'hover:border-border-visible',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9 px-3 py-1',
        md: 'min-h-11 px-4 py-2',
        lg: 'min-h-13 px-5 py-2',
      },
      copied: {
        true: '',
        false: '',
      },
    },
    defaultVariants: { size: 'md', copied: false },
  },
)

export const clipboardItemContentVariants = cva(['flex min-w-0 flex-1 flex-col gap-2xs'])

/** 文本行。复制成功时整行转成 success 色。 */
export const clipboardTextVariants = cva([
  'truncate text-start font-body text-sm text-foreground',
  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  'group-data-[copied]/clipboard-item:text-success',
])

export const clipboardTimeVariants = cva([
  'text-start font-mono text-caption text-foreground-disabled',
  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
])

/** [COPIED] 标记。默认透明，靠 group-data 淡入。 */
export const clipboardCopiedVariants = cva([
  'shrink-0 font-mono text-caption uppercase tracking-widest text-success opacity-0',
  'transition-opacity duration-200 ease-aios motion-reduce:transition-none',
  'group-data-[copied]/clipboard-item:opacity-100',
])

/** 删除按钮。 */
export const clipboardDeleteVariants = cva([
  'flex size-6 shrink-0 cursor-pointer items-center justify-center',
  'border-0 bg-transparent font-mono text-sm text-foreground-disabled',
  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  'hover:text-error',
  'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
])

/** 清空按钮。 */
export const clipboardClearVariants = cva(
  [
    'cursor-pointer self-start border border-border bg-transparent',
    'font-mono text-caption uppercase tracking-widest text-foreground-muted',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'hover:border-foreground-muted hover:text-foreground',
    'active:border-foreground',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9 px-3 py-2',
        md: 'min-h-11 px-4 py-2',
        lg: 'min-h-13 px-5 py-2',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = {
  default: 'md',
} as const

export type ClipboardSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES

export function resolveClipboardSize(size: ClipboardSize | null | undefined) {
  if (!size) return undefined
  return (LEGACY_SIZES as Record<string, string>)[size] ?? size
}
