import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Textarea.css'

const textareaVariants = cva('nothing-textarea', {
  variants: {
    variant: {
      underline: 'nothing-textarea--underline',
      bordered: 'nothing-textarea--bordered',
    },
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
  defaultVariants: { variant: 'underline', hasError: false, disabled: false, focused: false },
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
    message?: string
    autoResize?: boolean
    minRows?: number
    maxRows?: number
  } & VariantProps<typeof textareaVariants>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      style,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder,
      label,
      error,
      message,
      disabled,
      autoResize = false,
      minRows = 3,
      maxRows,
      variant,
      id,
      onFocus,
      onBlur,
      ...textareaProps
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
    const [focused, setFocused] = React.useState(false)
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const generatedId = React.useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const messageId = `${inputId}-message`
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
      [ref],
    )

    const resizeTextarea = React.useCallback(() => {
      const textarea = internalRef.current
      if (!textarea || !autoResize) return
      textarea.style.height = 'auto'
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20
      const padding =
        parseFloat(getComputedStyle(textarea).paddingTop) + parseFloat(getComputedStyle(textarea).paddingBottom) || 0
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

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false)
      onBlur?.(e)
    }

    const describedBy = hasError ? errorId : message ? messageId : undefined

    return (
      <div
        className={cn(
          textareaVariants({ variant, hasError, disabled: isDisabled, focused }),
          autoResize && 'nothing-textarea--auto-resize',
          className,
        )}
        style={style}
        data-slot="textarea"
        data-variant={dataAttr(variant)}
        data-state={dataAttr(hasError ? 'error' : focused ? 'focused' : 'default')}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={minRows}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          {...textareaProps}
        />
        {hasError && (
          <div className="nothing-textarea__error" id={errorId} role="alert">
            {error}
          </div>
        )}
        {!hasError && message && (
          <div className="nothing-textarea__message" id={messageId}>
            {message}
          </div>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { textareaVariants }
export default Textarea
