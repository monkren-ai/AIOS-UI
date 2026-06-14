import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/buttons.css'

const buttonVariants = cva('nothing-btn', {
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

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export default Button
