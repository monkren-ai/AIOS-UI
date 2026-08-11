import { cva } from 'class-variance-authority'

/**
 * Surface 的视觉变体。
 *
 * AIOS 没有阴影，层级只能靠 background + border 表达，所以 8 级 elevation
 * 实际是 tokens.css 里 `--surface-elevated-*` / `--border-elevated-*` 的交替，
 * 而不是一条连续的明度曲线。这些令牌没有进 Tailwind 的 theme namespace
 * （它们是 elevation 专用的间接层），所以这里用 `var()` 直接引。
 */
export const surfaceVariants = cva(
  [
    'border border-solid',
    'transition-[background-color,border-color] duration-200 ease-aios',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      elevation: {
        1: 'bg-[var(--surface-elevated-1)] border-[var(--border-elevated-1)]',
        2: 'bg-[var(--surface-elevated-2)] border-[var(--border-elevated-2)]',
        3: 'bg-[var(--surface-elevated-3)] border-[var(--border-elevated-3)]',
        4: 'bg-[var(--surface-elevated-4)] border-[var(--border-elevated-4)]',
        5: 'bg-[var(--surface-elevated-5)] border-[var(--border-elevated-5)]',
        6: 'bg-[var(--surface-elevated-6)] border-[var(--border-elevated-6)]',
        7: 'bg-[var(--surface-elevated-7)] border-[var(--border-elevated-7)]',
        8: 'bg-[var(--surface-elevated-8)] border-[var(--border-elevated-8)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
      border: {
        /** 连边框宽度一起抹掉，等价于 v1 的 `border: none`。 */
        none: 'border-0',
        /** 跟着 elevation 走，不额外覆盖。 */
        default: '',
        visible: 'border-border-visible',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      elevation: 1,
      padding: 'md',
      border: 'default',
      radius: 'md',
    },
  },
)

export type SurfaceElevation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type SurfacePadding = 'none' | 'sm' | 'md' | 'lg'

export type SurfaceBorder = 'none' | 'default' | 'visible'

export type SurfaceRadius = 'none' | 'sm' | 'md' | 'lg'
