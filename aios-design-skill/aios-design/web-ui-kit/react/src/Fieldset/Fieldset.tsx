import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset'
import { fieldsetVariants, fieldsetLegendVariants } from './fieldset-variants'

export interface FieldsetProps
  extends Omit<React.ComponentPropsWithRef<'fieldset'>, 'ref'> {
  // Base UI 的 Fieldset.Root 把 ref 类型标为 HTMLElement（而非 HTMLFieldSetElement），这里对齐
  ref?: React.Ref<HTMLElement>
  legend?: string
  disabled?: boolean
  children?: React.ReactNode
}

/**
 * 字段分组。
 *
 * 渲染 `<fieldset>`（隐式 `role="group"`）+ `<legend>`，1px 边框、
 * `rounded-card` 圆角。`disabled` 透传给 Base UI，会连带禁用内部 Field。
 */
export function Fieldset({
  legend,
  disabled = false,
  className,
  children,
  ref,
  ...props
}: FieldsetProps) {
  return (
    <FieldsetPrimitive.Root
      ref={ref}
      disabled={disabled}
      className={cn(fieldsetVariants(), className)}
      data-slot="fieldset"
      data-disabled={dataAttr(disabled)}
      {...props}
    >
      {legend && (
        <FieldsetPrimitive.Legend
          render={<legend />}
          className={fieldsetLegendVariants()}
          data-slot="fieldset-legend"
        >
          {legend}
        </FieldsetPrimitive.Legend>
      )}
      {children}
    </FieldsetPrimitive.Root>
  )
}

Fieldset.displayName = 'Fieldset'

export { fieldsetVariants, fieldsetLegendVariants }
export default Fieldset
