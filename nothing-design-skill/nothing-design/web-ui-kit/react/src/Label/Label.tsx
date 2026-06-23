import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Label.css'

const labelVariants = cva('nothing-label', {
  variants: {
    disabled: {
      true: 'nothing-label--disabled',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
})

export type LabelProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'> &
  VariantProps<typeof labelVariants> & {
    required?: boolean
    children?: React.ReactNode
  }

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, disabled, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ disabled: !!disabled }), className)}
      data-disabled={dataAttr(disabled)}
      data-required={dataAttr(required)}
      {...props}
    >
      <span className="nothing-label__text">{children}</span>
      {required && (
        <span className="nothing-label__required" aria-hidden="true">*</span>
      )}
    </label>
  )
)
Label.displayName = 'Label'

export { labelVariants }
export default Label
