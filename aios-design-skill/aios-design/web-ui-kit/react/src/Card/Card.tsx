import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { contentCardVariants, resolveCardShape, resolveCardSize, resolveCardVariant, type CardShape, type CardSize, type CardVariant } from './card-variants'

export type ContentCardProps = React.ComponentPropsWithRef<'div'> & {
  variant?: CardVariant
  size?: CardSize
  shape?: CardShape
  interactive?: boolean
  disabled?: boolean
  title?: string
  action?: string
  onAction?: (event: React.MouseEvent<HTMLElement>) => void
  footer?: React.ReactNode
  media?: React.ReactNode
  logo?: React.ReactNode
  feature?: React.ReactNode
}
export type CardProps = ContentCardProps

export function ContentCard({ variant, size, shape, interactive, disabled, title, action, onAction, onClick, footer, media, logo, feature, children, className, ...props }: ContentCardProps) {
  const resolvedVariant = (resolveCardVariant(variant) ?? 'soft') as 'soft'
  const resolvedSize = (resolveCardSize(variant, size) ?? 'md') as 'md'
  const resolvedShape = (resolveCardShape(variant, shape) ?? 'rounded') as 'rounded'
  const activate = (event: React.MouseEvent<HTMLElement>) => { if (!disabled) onClick?.(event as React.MouseEvent<HTMLDivElement>) }
  const keydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>) }
  }
  return (
    <div
      className={cn(contentCardVariants({ variant: resolvedVariant, size: resolvedSize, shape: resolvedShape, interactive, disabled }), className)}
      role={interactive ? 'button' : undefined} tabIndex={interactive && !disabled ? 0 : undefined}
      onClick={interactive ? activate : undefined} onKeyDown={interactive ? keydown : undefined}
      data-slot="card" data-variant={dataAttr(resolveCardVariant(variant) ?? 'soft')}
      data-size={dataAttr(resolveCardSize(variant, size) ?? 'md')} data-shape={dataAttr(resolveCardShape(variant, shape) ?? 'rounded')}
      data-interactive={dataAttr(interactive)} data-disabled={dataAttr(disabled)} {...props}
    >
      {logo && <div data-slot="card-logo" className="mb-2 inline-flex text-foreground-muted [&_svg]:size-6">{logo}</div>}
      {(title || action || feature) && <div data-slot="card-header" className="mb-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {title && <div data-slot="card-title" className="font-mono text-caption uppercase tracking-wider text-foreground-muted">{title}</div>}
          {feature && <span data-slot="card-feature" className="rounded-pill border border-border-visible px-2 py-0.5 font-mono text-micro uppercase tracking-wider text-foreground-muted">{feature}</span>}
        </div>
        {action && <button type="button" data-slot="card-action" className="cursor-pointer border-none bg-transparent p-0 font-mono text-label uppercase tracking-wider text-foreground-muted hover:text-foreground-display focus-visible:outline-2 focus-visible:outline-interactive" onClick={onAction}>{action}</button>}
      </div>}
      {media && <div data-slot="card-media" className="mb-4 overflow-hidden rounded-md [&_img]:w-full">{media}</div>}
      <div data-slot="card-body" className="text-foreground">{children}</div>
      {footer && <div data-slot="card-footer" className="mt-4 flex items-center gap-2 border-t border-border pt-4">{footer}</div>}
    </div>
  )
}

ContentCard.displayName = 'ContentCard'
export const Card = ContentCard
Card.displayName = 'Card'
export { contentCardVariants }
export default Card
