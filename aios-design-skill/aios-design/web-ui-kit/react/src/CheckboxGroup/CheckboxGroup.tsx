import * as React from 'react'
import { Checkbox } from '@/Checkbox'
import type { CheckboxSize } from '@/Checkbox/checkbox-variants'
import { useMergeSplit } from '@/hooks/useMergeSplit'
import { cn, dataAttr } from '@/lib/utils'
import {
  checkboxGroupItemVariants,
  checkboxGroupMergeBgVariants,
  checkboxGroupVariants,
  type CheckboxGroupOrientation,
} from './checkbox-group-variants'

export interface CheckboxGroupOption {
  value: string
  label: string
  disabled?: boolean
}

export type CheckboxGroupProps = Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> & {
  options: CheckboxGroupOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  orientation?: CheckboxGroupOrientation
  /** 透传给每个 Checkbox 的尺寸：36 / 44 / 52px 行高。 */
  size?: CheckboxSize
}

export function CheckboxGroup({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  orientation = 'vertical',
  size = 'md',
  ref,
  ...props
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? [])
  const selectedValues = controlledValue !== undefined ? controlledValue : internalValue
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const setContainerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )
  const { calculateMerge, registerItem } = useMergeSplit(containerRef, {
    axis: orientation === 'horizontal' ? 'x' : 'y',
  })
  const [mergeStyle, setMergeStyle] = React.useState<React.CSSProperties>({})

  const toggleValue = React.useCallback(
    (value: string) => {
      const next = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
      if (controlledValue === undefined) {
        setInternalValue(next)
      }
      onValueChange?.(next)
    },
    [controlledValue, onValueChange, selectedValues],
  )

  React.useEffect(() => {
    const selectedIndices = options
      .map((option, index) => (selectedValues.includes(option.value) ? index : -1))
      .filter((index) => index !== -1)
    const merge = calculateMerge(selectedIndices)
    if (!merge.hasSelection) {
      setMergeStyle({ opacity: 0 })
      return
    }
    // hook 返回的是物理坐标；背景层锚在 inline-start，RTL 下要换算成「离右边多远」。
    const container = containerRef.current
    const rtl =
      typeof window !== 'undefined' && container
        ? window.getComputedStyle(container).direction === 'rtl'
        : false
    const inlineOffset = rtl
      ? -((container?.offsetWidth ?? 0) - merge.left - merge.width)
      : merge.left
    setMergeStyle({
      opacity: 1,
      transform: `translate(${inlineOffset}px, ${merge.top}px)`,
      width: merge.width,
      height: merge.height,
    })
  }, [calculateMerge, options, selectedValues])

  return (
    <div
      ref={setContainerRef}
      role="group"
      className={cn(checkboxGroupVariants({ orientation }), className)}
      data-slot="checkbox-group"
      data-orientation={dataAttr(orientation)}
      data-size={dataAttr(size)}
      data-disabled={dataAttr(disabled)}
      {...props}
    >
      <span
        className={checkboxGroupMergeBgVariants()}
        data-slot="checkbox-group-merge-bg"
        style={mergeStyle}
        aria-hidden="true"
      />
      {options.map((option, index) => {
        const isSelected = selectedValues.includes(option.value)
        const isDisabled = Boolean(disabled || option.disabled)
        return (
          <div
            key={option.value}
            ref={(el) => registerItem(index, el)}
            className={checkboxGroupItemVariants({ selected: isSelected, disabled: isDisabled })}
            data-slot="checkbox-group-item"
            data-value={option.value}
            data-state={isSelected ? 'checked' : 'unchecked'}
            data-disabled={dataAttr(isDisabled)}
          >
            <Checkbox
              label={option.label}
              size={size}
              checked={isSelected}
              onCheckedChange={() => toggleValue(option.value)}
              disabled={isDisabled}
            />
          </div>
        )
      })}
    </div>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

export { checkboxGroupVariants }
export default CheckboxGroup
