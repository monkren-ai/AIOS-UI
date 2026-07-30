import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Badge.css'

export const badgeVariants = cva('nothing-badge', {
  variants: {
    variant: {
      default: '',
      secondary: 'nothing-badge--secondary',
      destructive: 'nothing-badge--destructive',
      outline: 'nothing-badge--outline',
    },
    dot: {
      true: 'nothing-badge--dot',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    dot: false,
  },
})

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    dot?: boolean
  }

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, dot, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, dot }), className)}
        data-variant={dataAttr(variant)}
        data-dot={dataAttr(dot)}
        {...props}
      >
        {dot && <span className="nothing-badge__dot" aria-hidden="true" />}
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'

export default Badge
