import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '../lib/slot'
import { cn, dataAttr } from '../lib/utils'
import '../styles/avatar.css'

const avatarVariants = cva('nothing-avatar', {
  variants: {
    size: {
      sm: 'nothing-avatar--sm',
      md: 'nothing-avatar--md',
      lg: 'nothing-avatar--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarVariants> & {
    asChild?: boolean
    src?: string
    alt?: string
    fallback?: string
  }

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size, asChild = false, src, alt = '', fallback, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div'
    const [imageError, setImageError] = React.useState(false)
    const showImage = src && !imageError

    const inner = showImage ? (
      <img
        className="nothing-avatar__image"
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
      />
    ) : (
      <span className="nothing-avatar__fallback" aria-label={alt || fallback}>
        {fallback || ''}
      </span>
    )

    return (
      <Comp
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        data-size={dataAttr(size)}
        data-state={showImage ? 'image' : 'fallback'}
        {...props}
      >
        {asChild ? children : inner}
      </Comp>
    )
  }
)
Avatar.displayName = 'Avatar'

export { avatarVariants }
export default Avatar
