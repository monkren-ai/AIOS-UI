import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './InputCopy.css'

export const inputCopyVariants = cva('nothing-input-copy', {
  variants: {
    size: {
      sm: 'nothing-input-copy--sm',
      md: 'nothing-input-copy--md',
      lg: 'nothing-input-copy--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface InputCopyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'onCopy'>,
    VariantProps<typeof inputCopyVariants> {
  value?: string
  defaultValue?: string
  label?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  copyLabel?: string
  copiedLabel?: string
  copiedDuration?: number
  onCopy?: (value: string) => void
  readOnly?: boolean
}

export const InputCopy = React.forwardRef<HTMLDivElement, InputCopyProps>(
  (
    {
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
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = isControlled ? valueProp : internalValue
    const [copied, setCopied] = React.useState(false)
    const inputId = React.useId()

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
        className={cn(inputCopyVariants({ size }), className)}
        data-slot="input-copy"
        data-size={dataAttr(size)}
        data-copied={dataAttr(copied)}
        {...props}
      >
        {label && (
          <label className="nothing-input-copy__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="nothing-input-copy__control">
          <input
            id={inputId}
            className="nothing-input-copy__field"
            type="text"
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={handleChange}
          />
          <button
            type="button"
            className={cn('nothing-input-copy__button', copied && 'nothing-input-copy__button--copied')}
            onClick={handleCopy}
            onKeyDown={handleKeyDown}
            aria-live="polite"
            aria-label={copied ? copiedLabel : copyLabel}
          >
            <span className="nothing-input-copy__button-text">{copied ? copiedLabel : copyLabel}</span>
          </button>
        </div>
      </div>
    )
  },
)
InputCopy.displayName = 'InputCopy'

export default InputCopy
