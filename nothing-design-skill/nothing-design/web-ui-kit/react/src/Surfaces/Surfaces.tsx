import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  surfaceVariants,
  type SurfaceBorder,
  type SurfaceElevation,
  type SurfacePadding,
  type SurfaceRadius,
} from './surfaces-variants'

export interface SurfacesProps extends React.ComponentPropsWithRef<'div'> {
  /** 层级。数值越大背景/边框越靠前，靠 background + border 表达，不用阴影。 */
  elevation?: SurfaceElevation
  padding?: SurfacePadding
  border?: SurfaceBorder
  radius?: SurfaceRadius
}

export function Surfaces({
  elevation = 1,
  padding = 'md',
  border = 'default',
  radius = 'md',
  className,
  children,
  ...props
}: SurfacesProps) {
  return (
    <div
      className={cn(surfaceVariants({ elevation, padding, border, radius }), className)}
      data-slot="surface"
      data-elevation={dataAttr(elevation)}
      data-padding={dataAttr(padding)}
      data-border={dataAttr(border)}
      data-radius={dataAttr(radius)}
      {...props}
    >
      {children}
    </div>
  )
}

Surfaces.displayName = 'Surfaces'

export { surfaceVariants }
export default Surfaces
