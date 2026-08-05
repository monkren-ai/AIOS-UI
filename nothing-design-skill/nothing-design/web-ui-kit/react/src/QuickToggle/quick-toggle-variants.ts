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
    'transition-[background-color,color,transform,opacity] duration-200 ease-nothing',
    'motion-reduce:transition-none',
    'active:scale-95 motion-reduce:active:scale-100',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      variant: {
        circle:
          'h-[var(--widget-pill-height)] w-[var(--widget-size-sm)] flex-col rounded-full gap-y-2',
        pill: 'h-[var(--widget-pill-height)] w-[var(--widget-size-md)] flex-row rounded-pill gap-x-2 px-6',
      },
      theme: {
        light: 'bg-widget-card',
        dark: 'bg-widget-dark',
        accent: 'bg-accent',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // 红底的圆形挡位更紧一点
      { variant: 'circle', theme: 'accent', class: 'gap-y-1' },
    ],
    defaultVariants: {
      variant: 'circle',
      theme: 'light',
      active: false,
    },
  },
)

/** 图标槽位。 */
export const quickToggleIconVariants = cva(
  ['flex size-6 shrink-0 items-center justify-center [&_svg]:size-6 [&_svg]:fill-current'],
  {
    variants: {
      theme: {
        light: 'text-[var(--widget-dark-3)]',
        dark: 'text-[var(--widget-dark-4)]',
        accent: 'text-[var(--widget-text-on-accent)]',
      },
    },
    defaultVariants: { theme: 'light' },
  },
)

/** 文案槽位。字号跟着「形状 × 配色」的组合走，与 v1 一致。 */
export const quickToggleLabelVariants = cva(['truncate text-center font-body leading-none'], {
  variants: {
    variant: {
      circle: '',
      pill: 'text-caption',
    },
    theme: {
      light: 'text-[var(--widget-dark-3)]',
      dark: 'text-[var(--widget-dark-4)]',
      accent: 'text-[var(--widget-text-on-accent)]',
    },
  },
  compoundVariants: [
    { variant: 'circle', theme: 'light', class: 'text-sm' },
    { variant: 'circle', theme: 'dark', class: 'text-sm' },
    { variant: 'circle', theme: 'accent', class: 'text-[8px]' },
  ],
  defaultVariants: { variant: 'circle', theme: 'light' },
})
