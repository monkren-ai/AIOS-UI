import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { useProximityHover } from '@/hooks/useProximityHover'
import {
  resolveTagShape,
  resolveTagVariant,
  tagVariants,
  tagsVariants,
  type TagShape,
  type TagSize,
  type TagVariant,
} from './tag-variants'

export type TagProps = Omit<React.ComponentPropsWithRef<'span'>, 'onClick'> & {
  /** 视觉样式。 */
  variant?: TagVariant
  /** 高度与字号。 */
  size?: TagSize
  /** 胶囊或工业风方角。 */
  shape?: TagShape
  /** 选中态。 */
  active?: boolean
  /** 渲染尾部的移除按钮。 */
  removable?: boolean
  disabled?: boolean
  onClick?: () => void
  onRemove?: () => void
  children?: React.ReactNode
}

export function Tag({
  className,
  variant,
  size = 'md',
  shape,
  active = false,
  removable = false,
  disabled = false,
  children,
  onClick,
  onRemove,
  ...props
}: TagProps) {
  const isDisabled = !!disabled
  const isInteractive = !!onClick
  const resolvedVariant = (resolveTagVariant(variant) ?? 'secondary') as never
  const resolvedShape = (resolveTagShape(variant, shape) ?? 'pill') as never

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
      className={cn(
        tagVariants({
          variant: resolvedVariant,
          size,
          shape: resolvedShape,
          active,
          disabled: isDisabled,
        }),
        className,
      )}
      data-slot="tag"
      data-variant={dataAttr(resolveTagVariant(variant) ?? 'secondary')}
      data-size={dataAttr(size)}
      data-shape={dataAttr(resolveTagShape(variant, shape) ?? 'pill')}
      data-active={dataAttr(active)}
      data-disabled={dataAttr(isDisabled)}
      // 只有真的能点的标签才是按钮。无条件挂 role="button" 会让纯展示的标记
      // 被读屏念成按钮，用户按下去却什么也不会发生。
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? (isDisabled ? -1 : 0) : undefined}
      // `active` 是双态，交互时要让辅助技术读得到按没按下。
      aria-pressed={isInteractive ? active : undefined}
      aria-disabled={isInteractive && isDisabled ? true : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          data-slot="tag-remove"
          className={cn(
            'inline-flex size-3.5 cursor-pointer items-center justify-center',
            'border-none bg-transparent p-0 text-micro leading-none text-current opacity-60',
            'transition-opacity duration-200 ease-aios motion-reduce:transition-none',
            'hover:opacity-100',
            'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
          )}
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

Tag.displayName = 'Tag'

export type TagsProps = React.ComponentPropsWithRef<'div'> & {
  children?: React.ReactNode
  /** 开启邻近高亮：鼠标靠近哪个 Tag，哪个就提亮放大，其余压暗。 */
  proximity?: boolean | 'x' | 'y' | 'xy'
}

export function Tags({ className, children, proximity = false, ref, ...props }: TagsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const axis = typeof proximity === 'string' ? proximity : 'xy'
  const enabled = !!proximity
  const { activeIndex, registerItem, handlers } = useProximityHover(
    containerRef as React.RefObject<HTMLElement | null>,
    { axis },
  )

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref && 'current' in ref)
        (ref as React.RefObject<HTMLDivElement | null>).current = node
    },
    [ref],
  )

  const items = React.Children.toArray(children).filter(React.isValidElement)

  return (
    <div
      ref={mergedRef}
      className={cn(tagsVariants({ proximity: enabled }), className)}
      data-slot="tags"
      data-proximity={dataAttr(enabled)}
      {...(enabled ? handlers : {})}
      {...props}
    >
      {enabled
        ? items.map((child, index) =>
            React.cloneElement(
              child as React.ReactElement<
                TagProps & {
                  ref?: React.Ref<HTMLSpanElement>
                  'data-proximity-active'?: boolean
                  'data-index'?: number
                }
              >,
              {
                ref: (node: HTMLSpanElement | null) => registerItem(index, node),
                'data-proximity-active': activeIndex === index,
                'data-index': index,
              },
            ),
          )
        : children}
    </div>
  )
}

Tags.displayName = 'Tags'

export { tagVariants, tagsVariants }
export default Tag
