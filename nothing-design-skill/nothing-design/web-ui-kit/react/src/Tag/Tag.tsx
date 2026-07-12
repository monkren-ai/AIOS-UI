import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Tag.css'

const tagVariants = cva('nothing-tag', {
  variants: {
    variant: {
      pill: '',
      technical: 'nothing-tag--technical',
    },
    active: {
      true: 'nothing-tag--active',
      false: '',
    },
    disabled: {
      true: 'nothing-tag--disabled',
      false: '',
    },
  },
  defaultVariants: { variant: 'pill', active: false, disabled: false },
})

export type TagProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> & {
  variant?: 'pill' | 'technical'
  active?: boolean
  removable?: boolean
  disabled?: boolean
  onClick?: () => void
  onRemove?: () => void
  children?: React.ReactNode
} & VariantProps<typeof tagVariants>

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant = 'pill',
      active = false,
      removable = false,
      disabled = false,
      children,
      onClick,
      onRemove,
      ...props
    },
    ref
  ) => {
    const isDisabled = !!disabled

    const handleClick = () => {
      if (isDisabled) return
      onClick?.()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isDisabled) return
      onRemove?.()
    }

    const handleRemoveKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        e.stopPropagation()
        if (isDisabled) return
        onRemove?.()
      }
    }

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, active, disabled: isDisabled }), className)}
        data-variant={dataAttr(variant)}
        data-active={dataAttr(active)}
        data-disabled={dataAttr(isDisabled)}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
        {removable && (
          <button
            className="nothing-tag__remove"
            onClick={handleRemove}
            onKeyDown={handleRemoveKeyDown}
            tabIndex={isDisabled ? -1 : 0}
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </span>
    )
  }
)
Tag.displayName = 'Tag'

export type TagsProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
}

export const Tags = React.forwardRef<HTMLDivElement, TagsProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('nothing-tags', className)}
      {...props}
    >
      {children}
    </div>
  )
)
Tags.displayName = 'Tags'

export { tagVariants }
export default Tag
