import { cva } from 'class-variance-authority'

/** Breadcrumb 根导航。等宽字，尺寸只影响字号。 */
export const breadcrumbVariants = cva(['font-mono'], {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: { size: 'md' },
})

/** 单个层级里的链接 / 按钮 / 纯文本。 */
export const breadcrumbLinkVariants = cva(
  [
    'border-none bg-transparent p-0 no-underline',
    'font-mono [font-size:inherit] [line-height:inherit]',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      current: {
        true: 'cursor-default text-foreground',
        false: 'cursor-pointer text-foreground-muted hover:text-interactive',
      },
    },
    defaultVariants: { current: false },
  },
)

export type BreadcrumbSize = 'sm' | 'md' | 'lg'
