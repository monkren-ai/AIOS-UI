import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr, mergeSemanticProps } from '@/lib/utils'
import { Button } from '@/Button'
import { senderVariants } from './sender-variants'
import './Sender.css'

export type SenderSemanticType =
  | 'root'
  | 'header'
  | 'content'
  | 'prefix'
  | 'input'
  | 'suffix'
  | 'footer'

export interface SenderComponents {
  SendButton: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>
  CancelButton: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>
}

export interface SenderProps
  extends
    Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'value' | 'defaultValue' | 'onChange' | 'onSubmit' | 'prefix' | 'size'
    >,
    VariantProps<typeof senderVariants> {
  value?: string
  defaultValue?: string
  loading?: boolean
  submitType?: 'enter' | 'shiftEnter'
  readOnly?: boolean
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  prefix?: React.ReactNode | ((info: { components: SenderComponents }) => React.ReactNode)
  suffix?: React.ReactNode | ((info: { components: SenderComponents }) => React.ReactNode)
  header?: React.ReactNode
  footer?: React.ReactNode | ((info: { components: SenderComponents }) => React.ReactNode)
  onSubmit?: (value: string) => void
  onCancel?: () => void
  onChange?: (value: string, event?: React.ChangeEvent<HTMLTextAreaElement>) => void
  classNames?: Partial<Record<SenderSemanticType, string>>
  styles?: Partial<Record<SenderSemanticType, React.CSSProperties>>
}

function getAutoSizeRows(autoSize: boolean | { minRows?: number; maxRows?: number } | undefined): {
  minRows: number
  maxRows: number
} {
  if (autoSize === true) {
    return { minRows: 2, maxRows: 6 }
  }
  if (typeof autoSize === 'object' && autoSize !== null) {
    return {
      minRows: autoSize.minRows ?? 2,
      maxRows: autoSize.maxRows ?? 6,
    }
  }
  return { minRows: 2, maxRows: 2 }
}

function calculateHeight(rows: number): number {
  // Approximation: line-height ~ 1.5em + padding.
  // This is intentionally simple; browsers will still allow manual resize.
  return rows * 24 + 24
}

export const Sender = React.forwardRef<HTMLTextAreaElement, SenderProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      placeholder,
      loading = false,
      submitType = 'enter',
      readOnly = false,
      disabled = false,
      autoSize = false,
      prefix,
      suffix,
      header,
      footer,
      onSubmit,
      onCancel,
      onChange,
      onKeyDown,
      className,
      style,
      classNames: userClassNames,
      styles: userStyles,
      variant,
      size,
      rows,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const { classNames, styles } = mergeSemanticProps<SenderSemanticType>({
      classNames: userClassNames,
      styles: userStyles,
    })

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue, event)
    }

    const handleSubmit = () => {
      if (disabled || readOnly || loading || !value.trim()) return
      onSubmit?.(value)
      if (!isControlled) {
        setInternalValue('')
      }
    }

    const handleCancel = () => {
      if (!loading) return
      onCancel?.()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const isEnter = event.key === 'Enter' && !event.nativeEvent.isComposing
      if (!isEnter) {
        onKeyDown?.(event)
        return
      }

      const shouldSubmit =
        submitType === 'enter'
          ? !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey
          : event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey

      if (shouldSubmit) {
        event.preventDefault()
        if (loading) {
          handleCancel()
        } else {
          handleSubmit()
        }
        return
      }

      onKeyDown?.(event)
    }

    const autoSizeConfig = getAutoSizeRows(autoSize)
    const computedStyle: React.CSSProperties = autoSize
      ? {
          minHeight: calculateHeight(autoSizeConfig.minRows),
          maxHeight: calculateHeight(autoSizeConfig.maxRows),
          overflow: 'auto',
        }
      : {}

    const components: SenderComponents = {
      SendButton: ({ children, ...props }) => (
        <Button
          variant="primary"
          size="sm"
          disabled={disabled || (!loading && !value.trim())}
          onClick={handleSubmit}
          {...props}
        >
          {children ?? 'Send'}
        </Button>
      ),
      CancelButton: ({ children, ...props }) => (
        <Button variant="destructive" size="sm" onClick={handleCancel} {...props}>
          {children ?? 'Cancel'}
        </Button>
      ),
    }

    const renderNode = (
      node: React.ReactNode | ((info: { components: SenderComponents }) => React.ReactNode),
    ): React.ReactNode => {
      if (typeof node === 'function') {
        return node({ components })
      }
      return node
    }

    return (
      <div
        className={cn(
          senderVariants({ variant, size }),
          disabled && 'aios-sender--disabled',
          loading && 'aios-sender--loading',
          readOnly && 'aios-sender--readonly',
          classNames.root,
          className,
        )}
        style={{ ...styles.root, ...style }}
        data-slot="sender"
        data-variant={dataAttr(variant)}
        data-size={dataAttr(size)}
        data-loading={dataAttr(loading)}
        data-readonly={dataAttr(readOnly)}
        data-disabled={dataAttr(disabled)}
      >
        {header && (
          <div
            className={cn('aios-sender__header', classNames.header)}
            style={styles.header}
            data-slot="sender-header"
          >
            {header}
          </div>
        )}

        <div
          className={cn('aios-sender__content', classNames.content)}
          style={styles.content}
          data-slot="sender-content"
        >
          {prefix && (
            <div
              className={cn('aios-sender__prefix', classNames.prefix)}
              style={styles.prefix}
              data-slot="sender-prefix"
            >
              {renderNode(prefix)}
            </div>
          )}

          <textarea
            ref={ref}
            className={cn('aios-sender__input', classNames.input)}
            style={{ ...styles.input, ...computedStyle }}
            data-slot="sender-input"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly || loading}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={autoSize ? 1 : rows}
            aria-busy={loading || undefined}
            {...rest}
          />

          {suffix && (
            <div
              className={cn('aios-sender__suffix', classNames.suffix)}
              style={styles.suffix}
              data-slot="sender-suffix"
            >
              {renderNode(suffix)}
            </div>
          )}
        </div>

        {footer && (
          <div
            className={cn('aios-sender__footer', classNames.footer)}
            style={styles.footer}
            data-slot="sender-footer"
          >
            {renderNode(footer)}
          </div>
        )}
      </div>
    )
  },
)

Sender.displayName = 'Sender'

export default Sender
