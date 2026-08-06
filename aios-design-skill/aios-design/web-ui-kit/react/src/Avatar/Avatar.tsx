import * as React from 'react'
import { Slot } from '@/lib/slot'
import { cn, dataAttr } from '@/lib/utils'
import {
  avatarFallbackVariants,
  avatarVariants,
  resolveAvatarSize,
  type AvatarShape,
  type AvatarSize,
  type AvatarVariant,
} from './avatar-variants'

export interface AvatarProps extends React.ComponentPropsWithRef<'div'> {
  /** 视觉样式。 */
  variant?: AvatarVariant
  /** 直径。 */
  size?: AvatarSize
  /** 圆形或工业风方角。 */
  shape?: AvatarShape
  /** 把样式合并到唯一的子元素上，而不是渲染额外的 div。 */
  asChild?: boolean
  /** 图片地址。加载失败会自动退回 `fallback`。 */
  src?: string
  alt?: string
  /** 图片缺席时展示的缩写。 */
  fallback?: string
}

export function Avatar({
  className,
  variant,
  size,
  shape,
  asChild = false,
  src,
  alt = '',
  fallback,
  children,
  ...props
}: AvatarProps) {
  const Comp = asChild ? Slot : 'div'
  const [imageError, setImageError] = React.useState(false)
  const showImage = Boolean(src) && !imageError
  const resolvedSize = (resolveAvatarSize(size) ?? 'md') as 'sm' | 'md' | 'lg'

  const inner = showImage ? (
    <img
      data-slot="avatar-image"
      className="block size-full rounded-[inherit] object-cover"
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
    />
  ) : (
    <span
      data-slot="avatar-fallback"
      className={avatarFallbackVariants({ size: resolvedSize })}
      aria-label={alt || fallback}
    >
      {fallback || ''}
    </span>
  )

  return (
    <Comp
      className={cn(avatarVariants({ variant, size: resolvedSize, shape }), className)}
      data-slot="avatar"
      data-variant={dataAttr(variant ?? 'soft')}
      data-size={dataAttr(resolvedSize)}
      data-shape={dataAttr(shape ?? 'circle')}
      data-state={showImage ? 'image' : 'fallback'}
      {...props}
    >
      {asChild ? children : inner}
    </Comp>
  )
}

Avatar.displayName = 'Avatar'

export { avatarVariants }
export default Avatar
