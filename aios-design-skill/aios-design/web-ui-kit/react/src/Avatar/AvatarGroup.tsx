import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import type { AvatarProps } from './Avatar'
import { resolveAvatarSize, type AvatarSize } from './avatar-variants'
import { avatarGroupOverflowVariants, avatarGroupVariants } from './avatar-group-variants'

export interface AvatarGroupProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactElement<AvatarProps> | React.ReactElement<AvatarProps>[]
  /** 最多展示的头像数量；其余头像折叠为 +N。 */
  max?: number
  size?: AvatarSize
}

export function AvatarGroup({
  children,
  max,
  size = 'md',
  className,
  ref,
  ...props
}: AvatarGroupProps) {
  const avatars = React.Children.toArray(children).filter(React.isValidElement)
  const visibleCount = max == null ? avatars.length : Math.max(0, Math.min(max, avatars.length))
  const overflow = avatars.length - visibleCount
  const resolvedSize = (resolveAvatarSize(size) ?? 'md') as 'sm' | 'md' | 'lg'

  return (
    <div
      ref={ref}
      role="group"
      className={cn(avatarGroupVariants(), className)}
      data-slot="avatar-group"
      data-size={dataAttr(resolvedSize)}
      {...props}
    >
      {avatars.slice(0, visibleCount).map((avatar, index) => {
        const typedAvatar = avatar as React.ReactElement<AvatarProps>
        return React.cloneElement(typedAvatar, {
          key: typedAvatar.key ?? index,
          size: resolvedSize,
          className: cn('border-2 border-background', typedAvatar.props.className),
        })
      })}
      {overflow > 0 && (
        <span
          aria-label={`+${overflow}`}
          className={avatarGroupOverflowVariants({ size: resolvedSize })}
          data-slot="avatar-group-overflow"
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}

AvatarGroup.displayName = 'AvatarGroup'
