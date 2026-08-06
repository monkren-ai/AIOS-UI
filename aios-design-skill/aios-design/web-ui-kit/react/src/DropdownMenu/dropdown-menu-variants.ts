import { cva } from 'class-variance-authority'

/* ────────────────────────────────────────────────────────────
   default 变体
   ──────────────────────────────────────────────────────────── */

export const dropdownMenuVariants = cva('relative inline-block')

export const dropdownMenuTriggerVariants = cva([
  'inline-flex cursor-pointer items-center',
  'rounded-sm border-none bg-transparent px-2 py-1',
  'font-mono text-sm text-foreground',
  'transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none',
  'hover:bg-muted',
  'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
])

export const dropdownMenuPositionerVariants = cva('z-[var(--z-dropdown)]')

export const dropdownMenuContentVariants = cva(
  [
    'min-w-[180px] rounded-sm border border-border-visible bg-popover py-1 text-popover-foreground',
    'transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate',
    'motion-reduce:transition-none',
    'closed:scale-95 closed:opacity-0 open:scale-100 open:opacity-100',
  ],
  {
    variants: {
      visible: { true: 'scale-100 opacity-100', false: '' },
      // v1 的 align 修饰类没有样式；对齐交给 Base UI 的 Positioner，这里只留 API。
      align: { start: '', center: '', end: '' },
    },
    defaultVariants: { visible: false, align: 'start' },
  },
)

export const dropdownMenuItemVariants = cva(
  [
    'flex cursor-pointer select-none items-center gap-2 whitespace-nowrap px-4 py-1',
    'font-mono text-sm text-foreground',
    'transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none',
    'hover:bg-muted highlighted:bg-muted',
    'outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
  ],
  {
    variants: {
      disabled: { true: 'pointer-events-none text-foreground-disabled', false: '' },
      highlighted: { true: 'bg-muted', false: '' },
    },
    defaultVariants: { disabled: false, highlighted: false },
  },
)

export const dropdownMenuItemIconVariants = cva(
  'inline-flex size-4 shrink-0 items-center justify-center text-foreground-muted',
)

export const dropdownMenuItemLabelVariants = cva('flex-1')

export const dropdownMenuItemShortcutVariants = cva(
  'ms-6 font-mono text-caption text-foreground-disabled',
)

export const dropdownMenuSeparatorVariants = cva('my-1 h-px bg-border')

/* ────────────────────────────────────────────────────────────
   menubar 变体
   ──────────────────────────────────────────────────────────── */

export const menubarVariants = cva('flex items-center gap-0 font-mono text-sm')

export const menubarTriggerVariants = cva(
  [
    'inline-flex min-h-11 cursor-pointer select-none items-center whitespace-nowrap',
    'border-none bg-transparent px-4 py-2',
    'font-mono text-sm text-foreground-muted',
    'transition-[color,background-color] duration-[var(--duration-micro)] ease-aios',
    'motion-reduce:transition-none',
    'hover:text-foreground',
    'outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
  ],
  {
    variants: {
      active: { true: 'bg-surface-raised text-foreground', false: '' },
    },
    defaultVariants: { active: false },
  },
)

export const menubarDropdownVariants = cva(
  [
    'min-w-[200px] rounded-sm border border-border-visible bg-popover py-1',
    'transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate',
    'motion-reduce:transition-none',
    'closed:-translate-y-1 closed:opacity-0 open:translate-y-0 open:opacity-100',
  ],
  {
    variants: {
      visible: { true: 'translate-y-0 opacity-100', false: '' },
    },
    defaultVariants: { visible: false },
  },
)

export const menubarItemVariants = cva(
  [
    'flex cursor-pointer select-none items-center justify-between gap-6 whitespace-nowrap px-4 py-2',
    'text-popover-foreground',
    'transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none',
    'hover:bg-muted highlighted:bg-muted',
    'outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
  ],
  {
    variants: {
      disabled: { true: 'pointer-events-none text-foreground-disabled', false: '' },
      highlighted: { true: 'bg-muted', false: '' },
    },
    defaultVariants: { disabled: false, highlighted: false },
  },
)

export const menubarItemLabelVariants = cva('font-body text-sm')

export const menubarItemShortcutVariants = cva('font-mono text-caption text-foreground-disabled')

export const menubarSeparatorVariants = cva('my-1 h-px bg-border')
