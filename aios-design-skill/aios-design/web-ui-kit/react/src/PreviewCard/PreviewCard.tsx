import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Thumbnail } from '@/Thumbnail'
import {
  previewCardBodyVariants,
  previewCardFooterVariants,
  previewCardMediaVariants,
  previewCardVariants,
  type PreviewCardSize,
  type PreviewCardVariant,
} from './preview-card-variants'

export interface PreviewCardProps extends React.ComponentPropsWithRef<'div'> {
  /** 标题。 */
  title?: string
  /** 描述文字，渲染为 muted 小字。 */
  description?: string
  /** 副元数据，渲染为 mono caption（AIOS 标签语言）。 */
  meta?: string
  /** 顶部图片地址。不传则不渲染媒体区。 */
  image?: string
  imageAlt?: string
  /** 页脚，常放操作按钮。 */
  footer?: React.ReactNode
  size?: PreviewCardSize
  variant?: PreviewCardVariant
}

/**
 * 媒体预览卡。
 *
 * 顶部是一张贴边铺满的 `Thumbnail`（图片加载失败会回退到点阵占位），
 * 下方是 meta / title / description 的元信息组，可选页脚。卡片本身不依赖
 * Base UI 的浮动 PreviewCard 原语——那是 hover 弹层，与本组件「静态内容卡」
 * 的语义不同，所以这里用 Card 的视觉语言 + Thumbnail 自实现。
 */
export function PreviewCard({
  className,
  title,
  description,
  meta,
  image,
  imageAlt,
  footer,
  size,
  variant,
  children,
  ...props
}: PreviewCardProps) {
  const resolvedVariant = (variant ?? 'default') as PreviewCardVariant
  const resolvedSize = (size ?? 'md') as PreviewCardSize
  const compact = resolvedVariant === 'compact'

  return (
    <div
      className={cn(previewCardVariants({ variant: resolvedVariant }), className)}
      data-slot="preview-card"
      data-variant={dataAttr(resolvedVariant)}
      data-size={dataAttr(resolvedSize)}
      {...props}
    >
      {image !== undefined && (
        <div
          data-slot="preview-card-media"
          className={previewCardMediaVariants({ size: resolvedSize, compact })}
        >
          <Thumbnail
            src={image}
            alt={imageAlt ?? ''}
            rounded="none"
            className="size-full rounded-none border-0"
          />
        </div>
      )}
      <div
        data-slot="preview-card-body"
        className={previewCardBodyVariants({ size: resolvedSize, compact })}
      >
        {meta && (
          <div
            data-slot="preview-card-meta"
            className="font-mono text-micro uppercase tracking-wider text-foreground-muted"
          >
            {meta}
          </div>
        )}
        {title && (
          <div
            data-slot="preview-card-title"
            className="font-mono text-sm text-foreground-display"
          >
            {title}
          </div>
        )}
        {description && (
          <div
            data-slot="preview-card-description"
            className="text-xs text-foreground-muted"
          >
            {description}
          </div>
        )}
        {children}
      </div>
      {footer && (
        <div
          data-slot="preview-card-footer"
          className={previewCardFooterVariants({ size: resolvedSize, compact })}
        >
          {footer}
        </div>
      )}
    </div>
  )
}

PreviewCard.displayName = 'PreviewCard'

export {
  previewCardVariants,
  previewCardMediaVariants,
  previewCardBodyVariants,
  previewCardFooterVariants,
}
export default PreviewCard
