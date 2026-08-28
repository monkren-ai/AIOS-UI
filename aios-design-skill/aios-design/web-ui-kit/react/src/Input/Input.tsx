import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  inputClearVariants,
  inputClearGhostVariants,
  inputControlVariants,
  inputFieldVariants,
  inputIconVariants,
  inputLabelVariants,
  inputHelperVariants,
  inputVariants,
  resolveInputVariant,
  type InputSize,
  type InputVariant,
} from './input-variants'

export interface InputHelperProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  variant?: 'default' | 'error'
}

function InputMessage({ children, variant = 'default', className, ...props }: InputHelperProps) {
  return (
    <div
      className={cn(inputHelperVariants({ variant }), className)}
      data-slot="input-message"
      data-variant={variant}
      {...props}
    >
      {children}
    </div>
  )
}

InputMessage.displayName = 'Input.Message'

export type InputProps = Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'size'> & {
  /** 视觉样式。`underline` / `bordered` 是 v1 别名。 */
  variant?: InputVariant
  /** 控件高度：36 / 44 / 52px。 */
  size?: InputSize
  label?: string
  error?: string
  message?: string
  value?: string
  /** 非受控时的初始值。 */
  defaultValue?: string
  /**
   * 值变化回调，直接给新值——这是本库表单件的统一形状（对齐 Select、RadioGroup
   * 等的 `onValueChange`）。想拿到原生事件对象请用 `onChange`，两者都会触发。
   */
  onValueChange?: (value: string) => void
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  clearable?: boolean
}

export function Input({
  variant,
  size,
  label,
  placeholder,
  value: controlledValue,
  defaultValue,
  error,
  message,
  disabled = false,
  id,
  onChange,
  onValueChange,
  className,
  style,
  type = 'text',
  name,
  leadingIcon,
  trailingIcon,
  clearable,
  ref,
  ...rest
}: InputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const [shaking, setShaking] = React.useState(false)
  const [clearingText, setClearingText] = React.useState<string | null>(null)
  const generatedId = React.useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const hasError = Boolean(error)
  const wasError = React.useRef(hasError)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (hasError && !wasError.current) {
      setShaking(true)
    }
    wasError.current = hasError
  }, [hasError])

  const resolvedVariant = (resolveInputVariant(variant) ?? 'outline') as 'outline' | 'soft'
  const resolvedSize = size ?? 'md'

  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    if (controlledValue === undefined) {
      setInternalValue(nextValue)
    }
    onChange?.(event)
    onValueChange?.(nextValue)
  }

  /**
   * 清空按钮不走 `setInternalValue('')`，而是绕过 React 的 value 追踪、直接写 DOM
   * 再派发一次 `input`：这样 React 会当成一次真实输入，`onChange` 拿到的是货真价实
   * 的事件对象而不是我们捏的假货，后续状态也全部由 `handleChange` 一条路径处理。
   */
  const handleClear = React.useCallback(() => {
    const input = inputRef.current
    if (!input) return
    const current = input.value
    if (current) setClearingText(current)
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    setter?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.focus()
  }, [])

  const showClear = Boolean(clearable && value && !disabled)

  return (
    <div
      className={cn(
        inputVariants({ variant: resolvedVariant, size: resolvedSize, hasError, disabled }),
        className,
      )}
      style={style}
      data-slot="input"
      data-variant={dataAttr(resolvedVariant)}
      data-size={dataAttr(resolvedSize)}
      data-disabled={dataAttr(disabled)}
      data-invalid={dataAttr(hasError)}
      data-state={hasError ? 'error' : disabled ? 'disabled' : 'default'}
    >
      {label && (
        <label
          className={inputLabelVariants({ size: resolvedSize, hasError, disabled })}
          data-slot="input-label"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <div
        className={inputControlVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          hasError,
          disabled,
        })}
        data-slot="input-control"
        data-shaking={dataAttr(shaking)}
        onAnimationEnd={(event) => {
          if (event.animationName.includes('aios-input-shake')) {
            setShaking(false)
          }
        }}
      >
        {leadingIcon && (
          <span
            className={inputIconVariants()}
            data-slot="input-icon"
            data-icon="start"
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}
        <span className="relative min-w-0 flex-1 overflow-hidden">
          <input
            ref={setRefs}
            className={inputFieldVariants({ size: resolvedSize })}
            data-slot="input-field"
            type={type}
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : undefined}
            {...rest}
          />
          {clearingText && (
            <span
              className={inputClearGhostVariants()}
              data-slot="input-clear-ghost"
              aria-hidden="true"
              onAnimationEnd={() => setClearingText(null)}
            >
              {clearingText}
            </span>
          )}
        </span>
        {showClear && (
          <button
            type="button"
            className={inputClearVariants()}
            data-slot="input-clear"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
        {!showClear && trailingIcon && (
          <span
            className={inputIconVariants()}
            data-slot="input-icon"
            data-icon="end"
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        )}
      </div>
      {hasError && (
        <div
          id={errorId}
          className={inputHelperVariants({ variant: 'error' })}
          data-slot="input-error"
          role="alert"
        >
          {error}
        </div>
      )}
      {!hasError && message && <InputMessage>{message}</InputMessage>}
    </div>
  )
}

Input.displayName = 'Input'
Input.Message = InputMessage

export { inputVariants }
export default Input
