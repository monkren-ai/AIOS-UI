import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'

const segbarVariants = cva('segbar', {
  variants: {
    color: {
      white: '',
      green: 'green',
      orange: 'orange',
    },
  },
  defaultVariants: { color: 'white' },
})

export interface SegbarProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof segbarVariants>, 'color'> {
  total: number
  on: number
  color?: 'white' | 'green' | 'orange'
  baseDelay?: number
}

export const Segbar = React.forwardRef<HTMLDivElement, SegbarProps>(
  ({ className, total, on, color = 'white', baseDelay = 0.4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(segbarVariants({ color }), className)}
        data-color={dataAttr(color)}
        data-on={dataAttr(on)}
        data-total={dataAttr(total)}
        {...props}
      >
        {Array.from({ length: total }, (_, i) => (
          <i
            key={i}
            className={cn(i < on && 'on')}
            style={{ animationDelay: `${baseDelay + i * 0.045}s` }}
            data-active={dataAttr(i < on)}
          />
        ))}
      </div>
    )
  },
)
Segbar.displayName = 'Segbar'

export { segbarVariants }
export default Segbar
