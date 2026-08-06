import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  thumbnailVariants,
  type ThumbnailRatio,
  type ThumbnailRounded,
  type ThumbnailSize,
} from './thumbnail-variants'

export interface ThumbnailProps extends React.ComponentPropsWithRef<'div'> {
  /** 图片地址。加载失败后自动切到 `fallback`。 */
  src?: string
  /** 图片替代文本；无图时也会作为兜底元素的 `aria-label`。 */
  alt?: string
  /**
   * 图片缺席或加载失败时展示的内容。不传时使用点阵占位——
   * 用一个低调的点阵网格而不是灰块来表达「空」，更贴近 Nothing 的视觉语言。
   */
  fallback?: React.ReactNode
  /** 高度：48 / 64 / 96px。 */
  size?: ThumbnailSize
  /** 圆角。默认 `card`。 */
  rounded?: ThumbnailRounded
  /** 宽高比。默认 `square`。 */
  ratio?: ThumbnailRatio
}

/**
 * 点阵占位。
 *
 * 用 SVG `<pattern>` 画一个 4×4 的点阵，比一整块灰色更克制，也避免了
 * 「图片没加载出来」的错觉。`useId` 保证多实例同时渲染时 pattern id 不冲突。
 */
function DotMatrix() {
  const rawId = React.useId()
  const patternId = `thumbnail-dots-${rawId.replace(/:/g, '')}`
  return (
    <svg
      data-slot="thumbnail-dots"
      aria-hidden="true"
      className="size-full text-foreground-muted opacity-60 motion-reduce:opacity-70"
      viewBox="0 0 16 16"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={patternId} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="16" height="16" fill={`url(#${patternId})`} />
    </svg>
  )
}

export function Thumbnail({
  className,
  src,
  alt = '',
  fallback,
  size,
  rounded,
  ratio,
  ...props
}: ThumbnailProps) {
  const [imageError, setImageError] = React.useState(false)
  // `src` 变化时重置错误状态，让替换后的图片有机会重新加载。
  React.useEffect(() => {
    setImageError(false)
  }, [src])

  const showImage = Boolean(src) && !imageError

  const inner = showImage ? (
    <img
      data-slot="thumbnail-img"
      className="block size-full rounded-[inherit] object-cover"
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
    />
  ) : (
    <span
      data-slot="thumbnail-fallback"
      className="flex size-full items-center justify-center"
      aria-label={alt || undefined}
    >
      {fallback ?? <DotMatrix />}
    </span>
  )

  return (
    <div
      className={cn(thumbnailVariants({ size, ratio, rounded }), className)}
      data-slot="thumbnail"
      data-size={dataAttr(size ?? 'md')}
      data-rounded={dataAttr(rounded ?? 'card')}
      data-state={showImage ? 'image' : 'fallback'}
      {...props}
    >
      {inner}
    </div>
  )
}

Thumbnail.displayName = 'Thumbnail'

export { thumbnailVariants }
export default Thumbnail
