import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  separatorLabelVariants,
  separatorLineVariants,
  separatorVariants,
  type SeparatorOrientation,
  type SeparatorSize,
} from './separator-variants'

export interface SeparatorProps extends React.ComponentPropsWithRef<'div'> {
  /** 走向。 */
  orientation?: SeparatorOrientation
  /** 线两侧的留白与标签字号。 */
  size?: SeparatorSize
  /** 纯装饰，不进无障碍树。 */
  decorative?: boolean
  /** 中缀文案。传了就自动进入 labeled 形态。 */
  label?: string
  /** 手动强制 labeled 形态。 */
  labeled?: boolean
}

export function Separator({
  className,
  orientation = 'horizontal',
  size = 'md',
  decorative = false,
  labeled,
  label,
  ...props
}: SeparatorProps) {
  const isLabeled = labeled ?? Boolean(label)

  const ariaProps = decorative
    ? { 'aria-hidden': true as const }
    : label
      ? {}
      : { role: 'separator' as const, 'aria-orientation': orientation }

  return (
    <div
      className={cn(separatorVariants({ orientation, size }), className)}
      data-slot="separator"
      data-orientation={dataAttr(orientation)}
      data-size={dataAttr(size)}
      data-labeled={dataAttr(isLabeled)}
      {...ariaProps}
      {...props}
    >
      <div data-slot="separator-line" className={separatorLineVariants({ orientation })} />
      {label && (
        <span data-slot="separator-label" className={separatorLabelVariants({ orientation, size })}>
          {label}
        </span>
      )}
      <div data-slot="separator-line" className={separatorLineVariants({ orientation })} />
    </div>
  )
}

Separator.displayName = 'Separator'

export { separatorVariants }
export default Separator
