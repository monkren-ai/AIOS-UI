import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  labelRequiredVariants,
  labelTextVariants,
  labelVariants,
  type LabelSize,
} from './label-variants'

export type LabelProps = Omit<React.ComponentPropsWithRef<'label'>, 'children'> & {
  /** 字号阶梯。 */
  size?: LabelSize
  disabled?: boolean
  required?: boolean
  children?: React.ReactNode
}

export function Label({
  className,
  size = 'md',
  disabled,
  required,
  children,
  ref,
  ...props
}: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn(labelVariants({ size, disabled: !!disabled }), className)}
      data-slot="label"
      data-size={dataAttr(size)}
      data-disabled={dataAttr(disabled)}
      data-required={dataAttr(required)}
      {...props}
    >
      <span className={labelTextVariants()} data-slot="label-text">
        {children}
      </span>
      {required && (
        <span className={labelRequiredVariants()} data-slot="label-required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

Label.displayName = 'Label'

export { labelVariants }
export default Label
