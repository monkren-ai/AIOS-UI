import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Separator.css'

export const separatorVariants = cva('nothing-separator', {
  variants: {
    orientation: {
      horizontal: 'nothing-separator--horizontal',
      vertical: 'nothing-separator--vertical',
    },
    labeled: {
      true: 'nothing-separator--labeled',
      false: '',
    },
  },
  defaultVariants: { orientation: 'horizontal', labeled: false },
})

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof separatorVariants> & {
    decorative?: boolean
    label?: string
  }

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = 'horizontal', decorative = false, labeled, label, ...props },
    ref
  ) => {
    const isLabeled = labeled ?? Boolean(label)
    const safeOrientation: 'horizontal' | 'vertical' = orientation ?? 'horizontal'

    const ariaProps = decorative
      ? { 'aria-hidden': true as const }
      : label
        ? {}
        : { role: 'separator' as const, 'aria-orientation': safeOrientation }

    return (
      <div
        ref={ref}
        className={cn(separatorVariants({ orientation, labeled: isLabeled }), className)}
        data-orientation={dataAttr(orientation)}
        data-labeled={dataAttr(isLabeled)}
        {...ariaProps}
        {...props}
      >
        <div className="nothing-separator__line" />
        {label && <span className="nothing-separator__label">{label}</span>}
        <div className="nothing-separator__line" />
      </div>
    )
  }
)
Separator.displayName = 'Separator'

export default Separator
