import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Surfaces.css'

export const surfaceVariants = cva('nothing-surface', {
  variants: {
    elevation: {
      1: 'nothing-surface--elevation-1',
      2: 'nothing-surface--elevation-2',
      3: 'nothing-surface--elevation-3',
      4: 'nothing-surface--elevation-4',
      5: 'nothing-surface--elevation-5',
      6: 'nothing-surface--elevation-6',
      7: 'nothing-surface--elevation-7',
      8: 'nothing-surface--elevation-8',
    },
    padding: {
      none: 'nothing-surface--padding-none',
      sm: 'nothing-surface--padding-sm',
      md: 'nothing-surface--padding-md',
      lg: 'nothing-surface--padding-lg',
    },
    border: {
      none: 'nothing-surface--border-none',
      default: 'nothing-surface--border-default',
      visible: 'nothing-surface--border-visible',
    },
    radius: {
      none: 'nothing-surface--radius-none',
      sm: 'nothing-surface--radius-sm',
      md: 'nothing-surface--radius-md',
      lg: 'nothing-surface--radius-lg',
    },
  },
  defaultVariants: {
    elevation: 1,
    padding: 'md',
    border: 'default',
    radius: 'md',
  },
})

export interface SurfacesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {
  elevation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

export const Surfaces = React.forwardRef<HTMLDivElement, SurfacesProps>(
  (
    {
      elevation = 1,
      padding = 'md',
      border = 'default',
      radius = 'md',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(surfaceVariants({ elevation, padding, border, radius }), className)}
        data-slot="surface"
        data-elevation={dataAttr(elevation)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Surfaces.displayName = 'Surfaces'

export default Surfaces
