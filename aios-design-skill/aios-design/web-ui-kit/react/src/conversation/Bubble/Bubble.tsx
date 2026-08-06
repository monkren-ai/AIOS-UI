import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr, mergeSemanticProps } from '@/lib/utils'
import { bubbleVariants } from './bubble-variants'

export type BubbleSemanticType =
  | 'root'
  | 'avatar'
  | 'body'
  | 'header'
  | 'content'
  | 'footer'
  | 'extra'

export type BubblePlacement = 'start' | 'end'
export type BubbleVariant = 'filled' | 'outlined' | 'borderless'
export type BubbleShape = 'default' | 'round' | 'corner'

export interface BubbleProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof bubbleVariants> {
  content?: React.ReactNode
  placement?: BubblePlacement
  variant?: BubbleVariant
  shape?: BubbleShape
  loading?: boolean
  typing?: boolean | { step?: number; interval?: number }
  avatar?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  extra?: React.ReactNode
  classNames?: Partial<Record<BubbleSemanticType, string>>
  styles?: Partial<Record<BubbleSemanticType, React.CSSProperties>>
}

function useTypingRender(
  content: React.ReactNode,
  typing: boolean | { step?: number; interval?: number } | undefined,
): { displayed: React.ReactNode; isTyping: boolean } {
  const [displayedText, setDisplayedText] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const text = typeof content === 'string' ? content : ''

  React.useEffect(() => {
    if (!typing || !text) {
      setDisplayedText(text)
      setIsTyping(false)
      return
    }

    const options = typeof typing === 'object' ? typing : {}
    const step = options.step ?? 1
    const interval = options.interval ?? 30
    setIsTyping(true)
    let index = 0

    const timer = setInterval(() => {
      index += step
      if (index >= text.length) {
        setDisplayedText(text)
        setIsTyping(false)
        clearInterval(timer)
      } else {
        setDisplayedText(text.slice(0, index))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [text, typing])

  if (typeof content !== 'string') {
    return { displayed: content, isTyping: false }
  }

  return { displayed: displayedText, isTyping }
}

export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  (
    {
      content,
      placement = 'start',
      variant = 'filled',
      shape = 'default',
      loading = false,
      typing,
      avatar,
      header,
      footer,
      extra,
      className,
      style,
      classNames: userClassNames,
      styles: userStyles,
      ...rest
    },
    ref,
  ) => {
    const { classNames, styles } = mergeSemanticProps<BubbleSemanticType>({
      classNames: userClassNames,
      styles: userStyles,
    })

    const { displayed, isTyping } = useTypingRender(content, typing)

    return (
      <div
        ref={ref}
        className={cn(
          bubbleVariants({ placement, variant, shape, loading }),
          classNames.root,
          className,
        )}
        style={{ ...styles.root, ...style }}
        data-slot="bubble"
        data-placement={dataAttr(placement)}
        data-variant={dataAttr(variant)}
        data-shape={dataAttr(shape)}
        data-loading={dataAttr(loading)}
        {...rest}
      >
        {avatar && (
          <div
            className={cn('aios-bubble__avatar', classNames.avatar)}
            style={styles.avatar}
            data-slot="bubble-avatar"
          >
            {avatar}
          </div>
        )}

        <div
          className={cn('aios-bubble__body', classNames.body)}
          style={styles.body}
          data-slot="bubble-body"
        >
          {header && (
            <div
              className={cn('aios-bubble__header', classNames.header)}
              style={styles.header}
              data-slot="bubble-header"
            >
              {header}
            </div>
          )}

          <div
            className={cn('aios-bubble__content', classNames.content)}
            style={styles.content}
            data-slot="bubble-content"
          >
            {loading ? (
              <span className="aios-bubble__loading" aria-label="Loading">
                <span className="aios-bubble__loading-dot" />
                <span className="aios-bubble__loading-dot" />
                <span className="aios-bubble__loading-dot" />
              </span>
            ) : (
              <>
                {displayed}
                {isTyping && <span className="aios-bubble__cursor" aria-hidden="true" />}
              </>
            )}
          </div>

          {footer && (
            <div
              className={cn('aios-bubble__footer', classNames.footer)}
              style={styles.footer}
              data-slot="bubble-footer"
            >
              {footer}
            </div>
          )}

          {extra && (
            <div
              className={cn('aios-bubble__extra', classNames.extra)}
              style={styles.extra}
              data-slot="bubble-extra"
            >
              {extra}
            </div>
          )}
        </div>
      </div>
    )
  },
)

Bubble.displayName = 'Bubble'

export default Bubble
