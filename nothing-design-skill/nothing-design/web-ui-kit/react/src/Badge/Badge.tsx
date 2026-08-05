import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  badgeDotVariants,
  badgeVariants,
  resolveBadgeVariant,
  type BadgeSize,
  type BadgeVariant,
} from './badge-variants'

export interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  /** 视觉样式。 */
  variant?: BadgeVariant
  /** 高度与字号。 */
  size?: BadgeSize
  /** 在文字前渲染一个呼吸的状态圆点。 */
  dot?: boolean
}

export function Badge({
  variant,
  size = 'md',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const resolvedVariant = resolveBadgeVariant(variant) as never

  return (
    <span
      className={cn(badgeVariants({ variant: resolvedVariant, size, dot }), className)}
      data-slot="badge"
      data-variant={dataAttr(resolveBadgeVariant(variant) ?? 'primary')}
      data-size={dataAttr(size)}
      data-dot={dataAttr(dot)}
      {...props}
    >
      {dot && (
        <span data-slot="badge-dot" aria-hidden="true" className={badgeDotVariants({ size })} />
      )}
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'

export { badgeVariants }
export default Badge
