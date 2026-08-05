import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  clipboardClearVariants,
  clipboardCopiedVariants,
  clipboardCountVariants,
  clipboardDeleteVariants,
  clipboardHeaderVariants,
  clipboardItemContentVariants,
  clipboardItemVariants,
  clipboardListVariants,
  clipboardTextVariants,
  clipboardTimeVariants,
  clipboardTitleVariants,
  clipboardVariants,
  resolveClipboardSize,
  type ClipboardSize,
} from './clipboard-variants'

interface ClipboardItem {
  text: string
  time: Date
}

export type ClipboardState = 'idle' | 'copied'
export type { ClipboardSize }

export interface ClipboardProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  maxItems?: number
  truncateLength?: number
  copiedDuration?: number
  demoItems?: ClipboardItem[]
  /** 卡片内边距与条目高度：36 / 44 / 52px。 */
  size?: ClipboardSize
  state?: ClipboardState
}

const defaultDemoItems: ClipboardItem[] = [
  { text: 'npm install nothing-design@latest', time: new Date(Date.now() - 3600000) },
  {
    text: 'The quick brown fox jumps over the lazy dog and keeps running',
    time: new Date(Date.now() - 7200000),
  },
  { text: 'git commit -m "feat: add clipboard widget"', time: new Date(Date.now() - 10800000) },
]

export function Clipboard({
  className,
  maxItems = 5,
  truncateLength = 40,
  copiedDuration = 2000,
  demoItems = defaultDemoItems,
  size = 'md',
  state: stateProp,
  style,
  ref,
  ...props
}: ClipboardProps) {
  const [items, setItems] = useState<ClipboardItem[]>([...demoItems])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const derivedState: ClipboardState = stateProp ?? (copiedIndex !== null ? 'copied' : 'idle')
  const resolvedSize = (resolveClipboardSize(size) ?? 'md') as 'sm' | 'md' | 'lg'

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const truncate = (text: string) => {
    return text.length > truncateLength ? text.substring(0, truncateLength) + '...' : text
  }

  const handleCopy = useCallback(
    async (index: number) => {
      const item = items[index]
      if (!item) return

      try {
        await navigator.clipboard.writeText(item.text)
      } catch {
        // fallback
      }

      setCopiedIndex(index)
    },
    [items],
  )

  const handleCopyKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleCopy(index)
      }
    },
    [handleCopy],
  )

  useEffect(() => {
    if (copiedIndex === null) return

    const timer = setTimeout(() => setCopiedIndex(null), copiedDuration)
    return () => clearTimeout(timer)
  }, [copiedIndex, copiedDuration])

  const handleDelete = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClearAll = () => {
    setItems([])
  }

  useEffect(() => {
    if (!navigator.clipboard?.readText) return

    let lastText = ''
    const monitor = setInterval(async () => {
      try {
        const text = await navigator.clipboard.readText()
        if (text && text !== lastText) {
          lastText = text
          setItems((prev) => {
            const next = [{ text: text.trim(), time: new Date() }, ...prev]
            return next.slice(0, maxItems)
          })
        }
      } catch {
        // clipboard permission denied
      }
    }, 2000)

    return () => clearInterval(monitor)
  }, [maxItems])

  return (
    <div
      ref={ref}
      className={cn(clipboardVariants({ size: resolvedSize, state: derivedState }), className)}
      style={style}
      data-slot="clipboard"
      data-size={dataAttr(resolvedSize)}
      data-state={dataAttr(derivedState)}
      {...props}
    >
      <div className={clipboardHeaderVariants()} data-slot="clipboard-header">
        <div className={clipboardTitleVariants({ size: resolvedSize })} data-slot="clipboard-title">
          Clipboard
        </div>
        <div className={clipboardCountVariants()} data-slot="clipboard-count">
          {items.length}/{maxItems}
        </div>
      </div>
      <div className={clipboardListVariants()} data-slot="clipboard-list">
        {items.map((item, index) => (
          <div
            key={index}
            className={clipboardItemVariants({
              size: resolvedSize,
              copied: copiedIndex === index,
            })}
            data-slot="clipboard-item"
            data-copied={dataAttr(copiedIndex === index)}
            role="button"
            tabIndex={0}
            onClick={() => handleCopy(index)}
            onKeyDown={(e) => handleCopyKeyDown(e, index)}
          >
            <div className={clipboardItemContentVariants()} data-slot="clipboard-item-content">
              <div className={clipboardTextVariants()} data-slot="clipboard-text">
                {truncate(item.text)}
              </div>
              <div className={clipboardTimeVariants()} data-slot="clipboard-time">
                {formatTime(item.time)}
              </div>
            </div>
            <div className={clipboardCopiedVariants()} data-slot="clipboard-copied">
              [COPIED]
            </div>
            <button
              type="button"
              className={clipboardDeleteVariants()}
              data-slot="clipboard-delete"
              aria-label="Delete item"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(index)
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <button
          type="button"
          className={clipboardClearVariants({ size: resolvedSize })}
          data-slot="clipboard-clear"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      )}
    </div>
  )
}

Clipboard.displayName = 'Clipboard'

export { clipboardVariants }
export default Clipboard
