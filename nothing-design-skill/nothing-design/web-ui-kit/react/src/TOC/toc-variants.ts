import { cva } from 'class-variance-authority'

export const tocVariants = cva(['flex flex-col gap-0.5'])

/**
 * 单条目录项。
 *
 * 当前节用一条 2px 左条（`--border-width-accent`）高亮，与 DataTable active 行
 * 同一套语言：左条贴着导航容器边缘，文字按 `level` 缩进，所以多级标题的层级
 * 靠缩进表达，而高亮始终对齐在同一根线上。
 */
export const tocItemVariants = cva(
  [
    'relative flex items-center',
    'font-mono text-xs uppercase tracking-wider',
    'text-foreground-muted',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'hover:text-foreground-display',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      level: {
        '1': 'ps-3',
        '2': 'ps-6',
        '3': 'ps-9',
      },
      active: {
        true: 'text-foreground-display',
        false: '',
      },
    },
    defaultVariants: { level: '1', active: false },
  },
)

export type TocItemLevel = '1' | '2' | '3'
