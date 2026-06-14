import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/badge.css'

const badgeVariants = cva('nothing-badge', {
  variants: {
    variant: {
      default: '',
      secondary: 'nothing-badge--secondary',
      destructive: 'nothing-badge--destructive',
      outline: 'nothing-badge--outline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        data-variant={dataAttr(variant)}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
export default Badge
