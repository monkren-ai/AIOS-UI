import { cva } from 'class-variance-authority'

/**
 * ButtonGroup 的容器变体。
 *
 * 思路和 `toggleGroupVariants` 的 outline 一致：通过 `[data-slot=button]`
 * 子选择器把相邻按钮的圆角收掉、只在首尾留圆角，并用负 margin 合并
 * 1px 边框——逻辑属性 `-ms-px` / `-mt-px` 保证 RTL 自动镜像。
 * hover / focus 时把按钮抬到顶层（z-10），避免被邻居盖住边框与焦点环。
 */
export const buttonGroupVariants = cva(
  [
    'inline-flex isolate',
    '[&>[data-slot=button]:hover]:z-10',
    '[&>[data-slot=button]:focus-visible]:z-10',
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          'flex-row gap-0',
          '[&>[data-slot=button]]:rounded-none',
          '[&>[data-slot=button]:first-child]:rounded-s-button',
          '[&>[data-slot=button]:last-child]:rounded-e-button',
          '[&>[data-slot=button]:not(:first-child)]:-ms-px',
        ],
        vertical: [
          'flex-col gap-0',
          '[&>[data-slot=button]]:rounded-none',
          '[&>[data-slot=button]:first-child]:rounded-t-button',
          '[&>[data-slot=button]:last-child]:rounded-b-button',
          '[&>[data-slot=button]:not(:first-child)]:-mt-px',
        ],
      },
    },
    defaultVariants: { orientation: 'horizontal' },
  },
)
