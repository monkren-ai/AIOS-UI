import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Button.css'

/**
 * Button 变体定义
 */
export const buttonVariants = cva('nothing-btn', {
  variants: {
    variant: {
      primary: 'nothing-btn--primary',
      secondary: 'nothing-btn--secondary',
      ghost: 'nothing-btn--ghost',
      destructive: 'nothing-btn--destructive',
    },
    size: {
      default: '',
      sm: 'nothing-btn--sm',
      lg: 'nothing-btn--lg',
    },
    fullWidth: {
      true: 'nothing-btn--full',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    fullWidth: false,
  },
})

/**
 * Button 组件
 *
 * Nothing 风格的按钮，支持 4 种变体（primary/secondary/ghost/destructive）
 * 和 3 种尺寸（default/sm/lg）。
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="destructive" size="sm">Delete</Button>
 * <Button variant="ghost" fullWidth>Full width ghost</Button>
 * ```
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        data-variant={dataAttr(variant)}
        data-size={dataAttr(size)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export default Button
