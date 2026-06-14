import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/clipboard.css'

interface ClipboardItem {
  text: string
  time: Date
}

export type ClipboardState = 'idle' | 'copied'
export type ClipboardSize = 'sm' | 'md' | 'lg'

const clipboardVariants = cva('nothing-clipboard', {
  variants: {
    size: {
      sm: 'nothing-clipboard--sm',
      md: 'nothing-clipboard--md',
      lg: 'nothing-clipboard--lg',
    },
    state: {
      idle: '',
      copied: 'nothing-clipboard--copied',
    },
  },
  defaultVariants: { size: 'md', state: 'idle' },
})

export interface ClipboardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof clipboardVariants>, 'size' | 'state'> {
  maxItems?: number
  truncateLength?: number
  copiedDuration?: number
  demoItems?: ClipboardItem[]
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

export const Clipboard = React.forwardRef<HTMLDivElement, ClipboardProps>(
  (
    {
      className,
      maxItems = 5,
      truncateLength = 40,
      copiedDuration = 2000,
      demoItems = defaultDemoItems,
      size = 'md',
      state: stateProp,
      style,
      ...props
    },
    ref
  ) => {
    const [items, setItems] = useState<ClipboardItem[]>([...demoItems])
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const derivedState: ClipboardState = stateProp ?? (copiedIndex !== null ? 'copied' : 'idle')

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
      [items]
    )

    const handleCopyKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCopy(index)
        }
      },
      [handleCopy]
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
        className={cn(clipboardVariants({ size, state: derivedState }), className)}
        style={style}
        data-size={dataAttr(size)}
        data-state={dataAttr(derivedState)}
        {...props}
      >
        <div className="clipboard-header">
          <div className="clipboard-title">Clipboard</div>
          <div className="clipboard-count">
            {items.length}/{maxItems}
          </div>
        </div>
        <div className="clipboard-list">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn('clipboard-item', copiedIndex === index && 'copied')}
              role="button"
              tabIndex={0}
              onClick={() => handleCopy(index)}
              onKeyDown={(e) => handleCopyKeyDown(e, index)}
            >
              <div className="clipboard-item-content">
                <div className="clipboard-text">{truncate(item.text)}</div>
                <div className="clipboard-time">{formatTime(item.time)}</div>
              </div>
              <div className="clipboard-copied">[COPIED]</div>
              <button
                className="clipboard-delete"
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
          <button className="clipboard-clear" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>
    )
  }
)
Clipboard.displayName = 'Clipboard'

export { clipboardVariants }
export default Clipboard
