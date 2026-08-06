import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/widget-grid.css'

const widgetGridVariants = cva('nothing-widget-grid', {
  variants: {
    dense: { true: 'nothing-widget-grid--dense', false: '' },
    compact: { true: 'nothing-widget-grid--compact', false: '' },
  },
  defaultVariants: { dense: false, compact: false },
})

export interface WidgetGridProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof widgetGridVariants> {
  children?: React.ReactNode
}

export const WidgetGrid = React.forwardRef<HTMLDivElement, WidgetGridProps>(
  ({ className, dense, compact, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(widgetGridVariants({ dense, compact }), className)}
        data-dense={dataAttr(dense)}
        data-compact={dataAttr(compact)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
WidgetGrid.displayName = 'WidgetGrid'

export { widgetGridVariants }
export default WidgetGrid
