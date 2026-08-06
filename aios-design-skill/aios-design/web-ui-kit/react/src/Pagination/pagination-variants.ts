import { cva } from 'class-variance-authority'

/** Pagination 根导航。等宽字，尺寸随字号走。 */
export const paginationVariants = cva('font-mono text-sm')

/** 页码列表。 */
export const paginationListVariants = cva('m-0 flex list-none items-center gap-1 p-0')

/** 单个列表项。 */
export const paginationItemVariants = cva('flex items-center')

/** 页码 / 翻页按钮。 */
export const paginationButtonVariants = cva(
  [
    'inline-flex h-8 min-w-8 items-center justify-center px-2 py-1',
    'rounded-sm border border-border-visible bg-transparent',
    'font-mono text-sm text-foreground-muted',
    'cursor-pointer select-none',
    'transition-[background-color,border-color,color,opacity] duration-200 ease-aios',
    'motion-reduce:transition-none',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'hover:not-disabled:bg-muted hover:not-disabled:text-foreground',
  ],
  {
    variants: {
      active: {
        true: [
          'border-interactive bg-interactive text-white',
          'hover:not-disabled:bg-interactive hover:not-disabled:text-white hover:not-disabled:opacity-90',
        ],
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed text-foreground-disabled opacity-50 hover:bg-transparent hover:text-foreground-disabled',
        false: '',
      },
    },
    defaultVariants: { active: false, disabled: false },
  },
)

/** 省略号占位，宽高与按钮对齐。 */
export const paginationEllipsisVariants = cva(
  'inline-flex h-8 min-w-8 select-none items-center justify-center text-foreground-disabled',
)

/**
 * 上/下一页的箭头字形。
 *
 * `‹` / `›` 是普通字符，不会跟随书写方向翻转，
 * 所以 RTL 下手动做一次水平镜像。
 */
export const paginationArrowVariants = cva('inline-block leading-none rtl:-scale-x-100')
