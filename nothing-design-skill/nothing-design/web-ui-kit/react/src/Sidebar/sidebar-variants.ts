import { cva } from 'class-variance-authority'

/**
 * Sidebar 的视觉变体。
 *
 * 侧栏停靠在行首（inline-start），所以分隔边用 `border-e` 而不是
 * `border-right`——RTL 下它会自动跑到左侧，跟内容区的相对关系不变。
 *
 * v1 引用的 `--sidebar-bg` / `--sidebar-fg` / `--sidebar-border` /
 * `--sidebar-accent-bg` 四个变量在 tokens.css 里从来没有定义过，侧栏因此一直
 * 是透明无边框的。这里改用语义令牌（surface / border / foreground / muted），
 * 视觉上是「修好了」而不是「照搬」。
 */
export const sidebarVariants = cva(
  [
    'flex h-full flex-col overflow-hidden',
    'border-e border-border bg-surface text-foreground',
    'transition-[width] duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      collapsed: {
        true: 'w-15',
        false: 'w-60',
      },
    },
    defaultVariants: { collapsed: false },
  },
)

/** 顶部自定义区。 */
export const sidebarHeaderVariants = cva(['shrink-0 border-b border-border p-4'])

/** 折叠开关。 */
export const sidebarToggleVariants = cva([
  'flex w-full min-h-11 cursor-pointer select-none items-center justify-center p-2',
  'border-x-0 border-t-0 border-b border-border bg-transparent text-foreground',
  'font-mono text-sm',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  'hover:bg-muted',
  'outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
  '[-webkit-tap-highlight-color:transparent]',
])

/** 导航列表。 */
export const sidebarListVariants = cva(['m-0 flex-1 list-none overflow-y-auto py-1'])

/** 列表项容器。 */
export const sidebarItemVariants = cva(['m-0'], {
  variants: {
    active: { true: '', false: '' },
  },
  defaultVariants: { active: false },
})

/** 列表项里的可点区域。 */
export const sidebarItemLinkVariants = cva(
  [
    'flex min-h-11 cursor-pointer select-none items-center gap-2 whitespace-nowrap no-underline',
    'text-foreground',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'hover:bg-muted',
    'outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
    '[-webkit-tap-highlight-color:transparent]',
  ],
  {
    variants: {
      active: {
        true: 'bg-accent-subtle text-foreground-display',
        false: '',
      },
      collapsed: {
        true: 'justify-center p-2',
        false: 'px-4 py-2',
      },
    },
    defaultVariants: { active: false, collapsed: false },
  },
)

/** 列表项图标。 */
export const sidebarItemIconVariants = cva([
  'inline-flex size-5 shrink-0 items-center justify-center',
])

/** 列表项文字。折叠时不渲染。 */
export const sidebarItemLabelVariants = cva([
  'flex-1 overflow-hidden text-ellipsis font-body text-sm',
])

/** 列表项角标。 */
export const sidebarItemBadgeVariants = cva([
  'min-w-5 shrink-0 rounded-pill bg-accent px-1 py-0.5 text-center',
  'font-mono text-caption text-foreground-display',
])

/** 底部自定义区。 */
export const sidebarFooterVariants = cva(['shrink-0 border-t border-border p-4'])
