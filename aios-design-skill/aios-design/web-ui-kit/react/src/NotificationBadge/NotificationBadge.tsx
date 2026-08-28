import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Badge } from '@/Badge/Badge'
import {
  notificationBadgeDotVariants,
  notificationBadgeMarkerVariants,
  notificationBadgeVariants,
} from './notification-badge-variants'

export interface NotificationBadgeProps extends React.ComponentPropsWithRef<'span'> {
  /** 计数。`0` / `undefined` 时不渲染标记，除非同时开了 `dot`。 */
  count?: number
  /** 只显示圆点，不显示数字。 */
  dot?: boolean
  /** 超过该值显示 `{max}+`。 */
  max?: number
  children: React.ReactNode
}

function formatCount(count: number, max: number) {
  return count > max ? `${max}+` : String(count)
}

export function NotificationBadge({
  count,
  dot = false,
  max = 99,
  children,
  className,
  ref,
  ...props
}: NotificationBadgeProps) {
  const numericCount = count ?? 0
  const showCount = numericCount > 0
  const visible = showCount || dot

  return (
    <span
      ref={ref}
      className={cn(notificationBadgeVariants(), className)}
      data-slot="notification-badge"
      data-count={showCount ? String(numericCount) : undefined}
      data-dot={dataAttr(dot && !showCount)}
      {...props}
    >
      {children}
      {visible && (
        <span
          className={notificationBadgeMarkerVariants({ dot: !showCount })}
          data-slot="notification-badge-marker"
          aria-hidden={showCount ? undefined : true}
        >
          {showCount ? (
            <Badge size="sm" variant="destructive">
              {formatCount(numericCount, max)}
            </Badge>
          ) : (
            <span className={notificationBadgeDotVariants()} data-slot="notification-badge-dot" />
          )}
        </span>
      )}
    </span>
  )
}

NotificationBadge.displayName = 'NotificationBadge'

export { notificationBadgeVariants, notificationBadgeMarkerVariants }
export default NotificationBadge
