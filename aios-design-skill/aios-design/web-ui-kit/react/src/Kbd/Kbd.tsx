import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { kbdVariants, type KbdSize, type KbdVariant } from './kbd-variants'

export interface KbdProps extends React.ComponentPropsWithRef<'kbd'> {
  /** 视觉样式。 */
  variant?: KbdVariant
  /** 键帽高度与字号。 */
  size?: KbdSize
  /**
   * 一次渲染一串键。传了 `keys` 就忽略 children，
   * 每个键各自是一个 `<kbd>`，外层 `<kbd>` 负责把它们串起来。
   */
  keys?: string[]
  /** `keys` 之间的连接符。 */
  separator?: string
}

export function Kbd({
  className,
  variant,
  size = 'md',
  keys,
  separator = '+',
  children,
  ...props
}: KbdProps) {
  const dataProps = {
    'data-slot': 'kbd',
    'data-variant': dataAttr(variant ?? 'soft'),
    'data-size': dataAttr(size),
  }

  if (keys?.length) {
    return (
      <kbd
        className={cn('inline-flex shrink-0 items-center gap-1 font-mono', className)}
        {...dataProps}
        {...props}
      >
        {keys.map((key, index) => (
          <React.Fragment key={`${key}-${index}`}>
            {index > 0 && (
              <span data-slot="kbd-separator" aria-hidden="true" className="text-foreground-subtle">
                {separator}
              </span>
            )}
            <kbd
              data-slot="kbd-key"
              data-size={dataAttr(size)}
              className={kbdVariants({ variant, size })}
            >
              {key}
            </kbd>
          </React.Fragment>
        ))}
      </kbd>
    )
  }

  return (
    <kbd className={cn(kbdVariants({ variant, size }), className)} {...dataProps} {...props}>
      {children}
    </kbd>
  )
}

Kbd.displayName = 'Kbd'

export { kbdVariants }
export default Kbd
