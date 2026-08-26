import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { keywordTagVariants } from './keyword-tag-variants'
export interface KeywordTagProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof keywordTagVariants> {
  icon?: React.ReactNode
  onRemove?: () => void
  removeLabel?: string
}
export function KeywordTag({
  kind,
  icon,
  onRemove,
  removeLabel = '移除标签 / Remove tag',
  className,
  children,
  ref,
  ...props
}: KeywordTagProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={cn(keywordTagVariants({ kind }), className)}
      data-slot="keyword-tag"
      data-kind={kind ?? 'context'}
      {...props}
    >
      {icon && <span aria-hidden>{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          className="-me-1 grid size-9 place-items-center rounded-button hover:bg-muted"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  )
}
