import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  inputCopyButtonTextVariants,
  inputCopyButtonVariants,
  inputCopyControlVariants,
  inputCopyFieldVariants,
  inputCopyLabelVariants,
  inputCopyVariants,
  resolveInputCopySize,
  type InputCopySize,
} from './input-copy-variants'
import './InputCopy.css'

export interface InputCopyProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'children' | 'onChange' | 'onCopy'
> {
  value?: string
  defaultValue?: string
  label?: string
  placeholder?: string
  /** 控件高度：36 / 44 / 52px。 */
  size?: InputCopySize
  copyLabel?: string
  copiedLabel?: string
  copiedDuration?: number
  onCopy?: (value: string) => void
  readOnly?: boolean
}

export function InputCopy({
  value: valueProp,
  defaultValue = '',
  label,
  placeholder,
  size = 'md',
  copyLabel = 'COPY',
  copiedLabel = 'COPIED',
  copiedDuration = 2000,
  onCopy,
  readOnly = true,
  className,
  ref,
  ...props
}: InputCopyProps) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = isControlled ? valueProp : internalValue
  const [copied, setCopied] = React.useState(false)
  const inputId = React.useId()
  const resolvedSize = (resolveInputCopySize(size) ?? 'md') as 'sm' | 'md' | 'lg'

  React.useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), copiedDuration)
    return () => clearTimeout(timer)
  }, [copied, copiedDuration])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
  }

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Fallback: silently ignore
    }
    setCopied(true)
    onCopy?.(value)
  }, [value, onCopy])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCopy()
    }
  }

  return (
    <div
      ref={ref}
      className={cn(inputCopyVariants({ size: resolvedSize, copied }), className)}
      data-slot="input-copy"
      data-size={dataAttr(resolvedSize)}
      data-copied={dataAttr(copied)}
      {...props}
    >
      {label && (
        <label className={inputCopyLabelVariants()} data-slot="input-copy-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div
        className={inputCopyControlVariants({ size: resolvedSize })}
        data-slot="input-copy-control"
      >
        <input
          id={inputId}
          className={inputCopyFieldVariants({ size: resolvedSize })}
          data-slot="input-copy-field"
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={handleChange}
        />
        <button
          type="button"
          className={inputCopyButtonVariants({ size: resolvedSize, copied })}
          data-slot="input-copy-button"
          data-copied={dataAttr(copied)}
          onClick={handleCopy}
          onKeyDown={handleKeyDown}
          aria-live="polite"
          aria-label={copied ? copiedLabel : copyLabel}
        >
          <span className={inputCopyButtonTextVariants()} data-slot="input-copy-button-text">
            {copied ? copiedLabel : copyLabel}
          </span>
        </button>
      </div>
    </div>
  )
}

InputCopy.displayName = 'InputCopy'

export { inputCopyVariants }
export default InputCopy
