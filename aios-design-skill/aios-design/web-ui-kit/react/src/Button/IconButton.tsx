import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Button, type ButtonProps } from './Button'
import {
  iconButtonVariants,
  type IconButtonShape,
  type IconButtonSize,
} from './icon-button-variants'

export interface IconButtonProps
  extends Omit<ButtonProps, 'aria-label' | 'children' | 'leadingIcon' | 'trailingIcon' | 'size'> {
  /** 纯图标按钮必须提供可访问名称。 */
  'aria-label': string
  /** 按钮内的图标。 */
  icon: React.ReactNode
  size?: IconButtonSize
  shape?: IconButtonShape
}

export function IconButton({
  icon,
  size = 'md',
  shape = 'circle',
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      size={`icon-${size}`}
      className={cn(iconButtonVariants({ shape }), className)}
      data-slot="icon-button"
      data-shape={dataAttr(shape)}
      {...props}
    >
      <span data-slot="icon-button-icon" aria-hidden="true" className="inline-flex">
        {icon}
      </span>
    </Button>
  )
}

IconButton.displayName = 'IconButton'
