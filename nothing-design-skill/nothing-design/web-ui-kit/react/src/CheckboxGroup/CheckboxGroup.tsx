import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Checkbox } from '@/Checkbox'
import { useMergeSplit } from '@/hooks/useMergeSplit'
import { cn, dataAttr } from '@/lib/utils'
import './CheckboxGroup.css'

const checkboxGroupVariants = cva('nothing-checkbox-group', {
  variants: {
    orientation: {
      horizontal: 'nothing-checkbox-group--horizontal',
      vertical: 'nothing-checkbox-group--vertical',
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

export interface CheckboxGroupOption {
  value: string
  label: string
  disabled?: boolean
}

export type CheckboxGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
  VariantProps<typeof checkboxGroupVariants> & {
    options: CheckboxGroupOption[]
    value?: string[]
    defaultValue?: string[]
    onValueChange?: (value: string[]) => void
    disabled?: boolean
  }

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      className,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      orientation = 'vertical',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? [])
    const selectedValues = controlledValue !== undefined ? controlledValue : internalValue
    const containerRef = React.useRef<HTMLDivElement>(null)

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref],
    )
    const { calculateMerge, registerItem } = useMergeSplit(containerRef, { axis: orientation === 'horizontal' ? 'x' : 'y' })
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
      setMergeStyle({
        opacity: 1,
        transform: `translate(${merge.left}px, ${merge.top}px)`,
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
        {...props}
      >
        <span className="nothing-checkbox-group__merge-bg" style={mergeStyle} aria-hidden="true" />
        {options.map((option, index) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <div
              key={option.value}
              ref={(el) => registerItem(index, el)}
              className={cn(
                'nothing-checkbox-group__item',
                isSelected && 'nothing-checkbox-group__item--selected',
                option.disabled && 'nothing-checkbox-group__item--disabled',
              )}
            >
              <Checkbox
                label={option.label}
                checked={isSelected}
                onCheckedChange={() => toggleValue(option.value)}
                disabled={disabled || option.disabled}
              />
            </div>
          )
        })}
      </div>
    )
  },
)
CheckboxGroup.displayName = 'CheckboxGroup'

export { checkboxGroupVariants }
export default CheckboxGroup
