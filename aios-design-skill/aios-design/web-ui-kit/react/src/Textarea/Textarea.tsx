import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  resolveTextareaVariant,
  textareaFieldVariants,
  textareaLabelVariants,
  textareaMessageVariants,
  textareaVariants,
  type TextareaSize,
  type TextareaVariant,
} from './textarea-variants'

export type TextareaProps = Omit<
  React.ComponentPropsWithRef<'textarea'>,
  'value' | 'defaultValue' | 'children' | 'size'
> & {
  value?: string
  defaultValue?: string
  /**
   * 值变化回调，直接给新值——这是本库表单件的统一形状（对齐 Select、RadioGroup
   * 等的 `onValueChange`）。想拿到原生事件对象请用 `onChange`，两者都会触发。
   */
  onValueChange?: (value: string) => void
  /** 视觉样式。`underline` / `bordered` 是 v1 别名。 */
  variant?: TextareaVariant
  /** 最小高度阶梯。 */
  size?: TextareaSize
  label?: string
  error?: string
  message?: string
  autoResize?: boolean
  minRows?: number
  maxRows?: number
  /** 挂到最外层 wrapper 上的 style。 */
  style?: React.CSSProperties
}

export function Textarea({
  className,
  style,
  value: controlledValue,
  defaultValue,
  onChange,
  onValueChange,
  placeholder,
  label,
  error,
  message,
  disabled,
  autoResize = false,
  minRows = 3,
  maxRows,
  variant,
  size,
  id,
  onFocus,
  onBlur,
  ref,
  ...textareaProps
}: TextareaProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const [focused, setFocused] = React.useState(false)
  const internalRef = React.useRef<HTMLTextAreaElement | null>(null)
  const generatedId = React.useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const messageId = `${inputId}-message`
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const hasError = !!error
  const isDisabled = !!disabled

  const resolvedVariant = (resolveTextareaVariant(variant) ?? 'outline') as 'outline' | 'soft'
  const resolvedSize = size ?? 'md'

  const setRefs = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      internalRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const resizeTextarea = React.useCallback(() => {
    const textarea = internalRef.current
    if (!textarea || !autoResize) return
    textarea.style.height = 'auto'
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value)
    }
    onChange?.(event)
    onValueChange?.(event.target.value)
  }

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false)
    onBlur?.(event)
  }

  const describedBy = hasError ? errorId : message ? messageId : undefined

  return (
    <div
      className={cn(
        textareaVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          hasError,
          disabled: isDisabled,
          focused,
        }),
        className,
      )}
      style={style}
      data-slot="textarea"
      data-variant={dataAttr(resolvedVariant)}
      data-size={dataAttr(resolvedSize)}
      data-disabled={dataAttr(isDisabled)}
      data-invalid={dataAttr(hasError)}
      data-auto-resize={dataAttr(autoResize)}
      data-state={hasError ? 'error' : focused ? 'focused' : 'default'}
    >
      {label && (
        <label
          className={textareaLabelVariants({
            size: resolvedSize,
            focused,
            hasError,
            disabled: isDisabled,
          })}
          data-slot="textarea-label"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <textarea
        ref={setRefs}
        className={textareaFieldVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          hasError,
          disabled: isDisabled,
          autoResize,
        })}
        data-slot="textarea-field"
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
        <div
          className={textareaMessageVariants({ variant: 'error' })}
          data-slot="textarea-error"
          id={errorId}
          role="alert"
        >
          {error}
        </div>
      )}
      {!hasError && message && (
        <div
          className={textareaMessageVariants({ variant: 'default' })}
          data-slot="textarea-message"
          id={messageId}
        >
          {message}
        </div>
      )}
    </div>
  )
}

Textarea.displayName = 'Textarea'

export { textareaVariants }
export default Textarea
