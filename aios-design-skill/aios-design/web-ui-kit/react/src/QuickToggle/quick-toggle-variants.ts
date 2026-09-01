import { cva } from 'class-variance-authority'

/**
 * QuickToggle 的视觉变体。
 *
 * v1 里 `active` 只挂了 `--active` 类名、没有对应 CSS，所以它不改变外观，
 * 只通过 `aria-pressed` / `data-state` 暴露。这里保持一致。
 */
export const quickToggleVariants = cva(
  [
    'flex cursor-pointer select-none items-center justify-center border-none',
    '[-webkit-tap-highlight-color:transparent]',
    'transition-[background-color,color,transform,opacity] duration-200 ease-aios',
    'motion-reduce:transition-none',
    'active:scale-95 motion-reduce:active:scale-100',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      variant: {
        circle: 'size-17 flex-col rounded-full gap-y-2',
        pill: 'min-h-11 min-w-36 flex-row rounded-pill gap-x-2 px-6',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { active: true, class: 'bg-foreground-display text-background' },
      { active: false, class: 'border border-border bg-surface text-foreground-muted hover:bg-muted' },
    ],
    defaultVariants: {
      variant: 'circle',
      active: false,
    },
  },
)

/** 图标槽位。 */
export const quickToggleIconVariants = cva('flex size-6 shrink-0 items-center justify-center text-inherit [&_svg]:size-6 [&_svg]:fill-current')

/** 文案槽位。字号跟着「形状 × 配色」的组合走，与 v1 一致。 */
export const quickToggleLabelVariants = cva(['truncate text-center font-body leading-none'], {
  variants: {
    variant: {
      circle: '',
      pill: 'text-caption',
    },
  },
  defaultVariants: { variant: 'circle' },
})
