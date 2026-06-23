import * as React from 'react'
import { cn } from '@/lib/utils'
import './AspectRatio.css'

export type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
  ratio?: number
  children?: React.ReactNode
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('nothing-aspect-ratio', className)}
      style={{ aspectRatio: `${ratio}`, ...style }}
      data-ratio={ratio}
      {...props}
    >
      <div className="nothing-aspect-ratio__inner">
        {children}
      </div>
    </div>
  )
)
AspectRatio.displayName = 'AspectRatio'

export default AspectRatio
