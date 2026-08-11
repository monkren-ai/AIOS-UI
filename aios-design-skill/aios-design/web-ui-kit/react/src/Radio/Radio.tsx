import * as React from 'react'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { cn, dataAttr } from '@/lib/utils'
import { radioIndicatorVariants, radioVariants, type RadioSize } from './radio-variants'

export interface RadioProps extends Omit<React.ComponentProps<typeof BaseRadio.Root>, 'className'> {
  size?: RadioSize
  className?: string
}

export function Radio({ size = 'md', className, disabled, ...props }: RadioProps) {
  return (
    <BaseRadio.Root
      className={cn(radioVariants({ size }), className)}
      data-slot="radio"
      data-size={dataAttr(size)}
      data-disabled={dataAttr(disabled)}
      disabled={disabled}
      {...props}
    >
      <BaseRadio.Indicator
        className={cn(radioIndicatorVariants({ size }))}
        data-slot="radio-indicator"
        keepMounted
      />
    </BaseRadio.Root>
  )
}

Radio.displayName = 'Radio'

export { radioIndicatorVariants, radioVariants }
export default Radio
