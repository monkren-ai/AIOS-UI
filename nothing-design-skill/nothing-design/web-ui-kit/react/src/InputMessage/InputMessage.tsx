import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  inputMessageControlVariants,
  inputMessageCountVariants,
  inputMessageFieldVariants,
  inputMessageHintVariants,
  inputMessageMetaVariants,
  inputMessageSendIconVariants,
  inputMessageSendLabelVariants,
  inputMessageSendVariants,
  inputMessageVariants,
  resolveInputMessageSize,
  type InputMessageSize,
} from './input-message-variants'

export interface InputMessageProps extends Omit<
  React.ComponentPropsWithRef<'textarea'>,
  'value' | 'defaultValue' | 'onChange' | 'children'
> {
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
  /** 控件高度阶梯：36 / 44 / 52px。 */
  size?: InputMessageSize
}

export function InputMessage({
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
  ref,
  ...textareaProps
}: InputMessageProps) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = isControlled ? valueProp : internalValue
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const generatedId = React.useId()
  const inputId = textareaProps.id || generatedId
  const resolvedSize = (resolveInputMessageSize(size) ?? 'md') as 'sm' | 'md' | 'lg'

  const setRefs = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

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
      className={cn(inputMessageVariants({ size: resolvedSize, disabled }), className)}
      data-slot="input-message"
      data-size={dataAttr(resolvedSize)}
      data-disabled={dataAttr(disabled)}
    >
      <div
        className={inputMessageControlVariants({ size: resolvedSize })}
        data-slot="input-message-control"
      >
        <textarea
          ref={setRefs}
          id={inputId}
          className={inputMessageFieldVariants({ size: resolvedSize })}
          data-slot="input-message-field"
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
          className={inputMessageSendVariants({ size: resolvedSize })}
          data-slot="input-message-send"
          data-disabled={dataAttr(!canSend)}
          onClick={handleSend}
          disabled={!canSend}
          aria-label={sendLabel}
        >
          <span className={inputMessageSendLabelVariants()} data-slot="input-message-send-label">
            {sendLabel}
          </span>
          <svg
            className={inputMessageSendIconVariants({ size: resolvedSize })}
            data-slot="input-message-send-icon"
            data-icon="end"
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
        <div className={inputMessageMetaVariants()} data-slot="input-message-meta">
          <span className={inputMessageHintVariants()} data-slot="input-message-hint">
            {submitOnEnter ? 'Enter to send, Shift+Enter for new line' : ''}
          </span>
          <span className={inputMessageCountVariants()} data-slot="input-message-count">
            {countText}
          </span>
        </div>
      )}
    </div>
  )
}

InputMessage.displayName = 'InputMessage'

export { inputMessageVariants }
export default InputMessage
