import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './InputMessage.css'

export const inputMessageVariants = cva('nothing-input-message', {
  variants: {
    size: {
      sm: 'nothing-input-message--sm',
      md: 'nothing-input-message--md',
      lg: 'nothing-input-message--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface InputMessageProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange' | 'children'>,
    VariantProps<typeof inputMessageVariants> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSend?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  minRows?: number
  maxRows?: number
  maxLength?: number
  submitOnEnter?: boolean
  sendLabel?: string
  countLabel?: string
  hideCount?: boolean
}

export const InputMessage = React.forwardRef<HTMLTextAreaElement, InputMessageProps>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onChange,
      onSend,
      placeholder,
      disabled = false,
      minRows = 1,
      maxRows = 6,
      maxLength,
      submitOnEnter = true,
      sendLabel = 'SEND',
      countLabel,
      hideCount = false,
      size = 'md',
      className,
      onKeyDown,
      ...textareaProps
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = isControlled ? valueProp : internalValue
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const generatedId = React.useId()
    const inputId = textareaProps.id || generatedId

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement, [])

    const resize = React.useCallback(() => {
      const textarea = textareaRef.current
      if (!textarea) return
      textarea.style.height = 'auto'
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20
      const padding =
        parseFloat(getComputedStyle(textarea).paddingTop) +
        parseFloat(getComputedStyle(textarea).paddingBottom)
      const minHeight = lineHeight * minRows + padding
      const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
      textarea.style.height = `${newHeight}px`
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
    }, [minRows, maxRows])

    React.useLayoutEffect(() => {
      resize()
    }, [value, resize])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleSend = React.useCallback(() => {
      if (disabled || !value.trim()) return
      onSend?.(value)
      if (!isControlled) {
        setInternalValue('')
      }
      onChange?.('')
    }, [disabled, value, onSend, isControlled, onChange])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (submitOnEnter && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
      onKeyDown?.(e)
    }

    const canSend = !disabled && value.trim().length > 0
    const countText = countLabel
      ? `${value.length}${maxLength ? `/${maxLength}` : ''} ${countLabel}`
      : `${value.length}${maxLength ? `/${maxLength}` : ''}`

    return (
      <div
        className={cn(inputMessageVariants({ size }), className)}
        data-slot="input-message"
        data-size={dataAttr(size)}
        data-disabled={dataAttr(disabled)}
      >
        <div className="nothing-input-message__control">
          <textarea
            ref={textareaRef}
            id={inputId}
            className="nothing-input-message__field"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            rows={minRows}
            maxLength={maxLength}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-multiline="true"
            {...textareaProps}
          />
          <button
            type="button"
            className="nothing-input-message__send"
            onClick={handleSend}
            disabled={!canSend}
            aria-label={sendLabel}
          >
            <span className="nothing-input-message__send-label">{sendLabel}</span>
            <svg
              className="nothing-input-message__send-icon"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M2 8h12M9 4l5 4-5 4" />
            </svg>
          </button>
        </div>
        {!hideCount && (
          <div className="nothing-input-message__meta">
            <span className="nothing-input-message__hint">
              {submitOnEnter ? 'Enter to send, Shift+Enter for new line' : ''}
            </span>
            <span className="nothing-input-message__count">{countText}</span>
          </div>
        )}
      </div>
    )
  },
)
InputMessage.displayName = 'InputMessage'

export default InputMessage
