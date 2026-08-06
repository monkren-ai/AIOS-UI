import * as React from 'react'
import { cn } from '@/lib/utils'
import { aspectRatioInnerVariants, aspectRatioVariants } from './aspect-ratio-variants'

export type AspectRatioProps = React.ComponentPropsWithRef<'div'> & {
  ratio?: number
  children?: React.ReactNode
}

export function AspectRatio({
  className,
  ratio = 16 / 9,
  style,
  children,
  ref,
  ...props
}: AspectRatioProps) {
  return (
    <div
      ref={ref}
      className={cn(aspectRatioVariants(), className)}
      style={{ aspectRatio: `${ratio}`, ...style }}
      data-slot="aspect-ratio"
      data-ratio={ratio}
      {...props}
    >
      <div className={aspectRatioInnerVariants()} data-slot="aspect-ratio-inner">
        {children}
      </div>
    </div>
  )
}

AspectRatio.displayName = 'AspectRatio'

export default AspectRatio
