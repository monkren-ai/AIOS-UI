import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/textarea.css'

const textareaVariants = cva('nothing-textarea', {
  variants: {
    hasError: {
      true: 'nothing-textarea--error',
      false: '',
    },
    disabled: {
      true: 'nothing-textarea--disabled',
      false: '',
    },
    focused: {
      true: 'nothing-textarea--focused',
      false: '',
    },
  },
  defaultVariants: { hasError: false, disabled: false, focused: false },
})

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'value' | 'defaultValue' | 'children'
> &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'value' | 'defaultValue' | 'children'
  > & {
    value?: string
    defaultValue?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label?: string
  error?: string
  autoResize?: boolean
  minRows?: number
  maxRows?: number
} & VariantProps<typeof textareaVariants>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder,
      label,
      error,
      disabled,
      autoResize = false,
      minRows = 3,
      maxRows,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
    const [focused, setFocused] = React.useState(false)
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const generatedId = React.useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue
    const hasError = !!error
    const isDisabled = !!disabled

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref && 'current' in ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
      },
      [ref]
    )

    const resizeTextarea = React.useCallback(() => {
      const textarea = internalRef.current
      if (!textarea || !autoResize) return
      textarea.style.height = 'auto'
      const lineHeight =
        parseFloat(getComputedStyle(textarea).lineHeight) || 20
      const padding =
        parseFloat(getComputedStyle(textarea).paddingTop) +
          parseFloat(getComputedStyle(textarea).paddingBottom) || 0
      const minHeight = lineHeight * minRows + padding
      const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
      textarea.style.height = `${newHeight}px`
      textarea.style.overflow = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
    }, [autoResize, minRows, maxRows])

    React.useEffect(() => {
      resizeTextarea()
    }, [value, resizeTextarea])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(e)
    }

    return (
      <div
        className={cn(
          textareaVariants({ hasError, disabled: isDisabled, focused }),
          className
        )}
        data-state={dataAttr(hasError ? 'error' : focused ? 'focused' : 'default')}
        {...props}
      >
        {label && (
          <label className="nothing-textarea__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <textarea
          ref={setRefs}
          className="nothing-textarea__input"
          id={inputId}
          placeholder={placeholder}
          value={value}
          disabled={isDisabled}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={minRows}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
        {error && (
          <div className="nothing-textarea__error" id={errorId}>
            {error}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { textareaVariants }
export default Textarea
