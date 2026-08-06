import * as React from 'react'
import { useNow } from '@/system/hooks'
import { cn, dataAttr } from '@/lib/utils'
import {
  quotesAuthorVariants,
  quotesContentVariants,
  quotesRingVariants,
  quotesSvgVariants,
  quotesTextVariants,
  quotesVariants,
  type QuotesSize,
  type QuotesTheme,
} from './quotes-variants'

export interface QuoteData {
  text: string
  author: string
}

const defaultQuotes: QuoteData[] = [
  { text: 'Less, but better.', author: 'Dieter Rams' },
  { text: 'We remove everything that is unnecessary.', author: 'Nothing Design Principles' },
  { text: 'Weniger, aber besser.', author: 'Dieter Rams' },
  { text: 'Form follows function.', author: 'Louis Sullivan' },
  { text: 'Good design is as little design as possible.', author: 'Dieter Rams' },
  { text: 'The details are not the details. They make the design.', author: 'Charles Eames' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
]

export interface QuotesProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  quotes?: QuoteData[]
  interval?: number
  theme?: QuotesTheme
  size?: QuotesSize
}

export function Quotes({
  className,
  theme = 'dark',
  size = 'md',
  quotes = defaultQuotes,
  interval = 30000,
  ...props
}: QuotesProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  // useNow 节拍: 每次 interval 触发一次重新渲染
  const tick = useNow(quotes.length > 1 ? interval : 60_000)
  void tick

  React.useEffect(() => {
    if (quotes.length <= 1) return
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
  }, [tick, quotes.length])

  React.useEffect(() => {
    if (currentIndex >= quotes.length && quotes.length > 0) {
      setCurrentIndex(0)
    }
  }, [quotes.length, currentIndex])

  const quote =
    quotes.length > 0 ? quotes[currentIndex] : { text: 'No quotes available', author: '' }
  const real = quotes !== defaultQuotes
  // pathLength 归一到 100，空列表时把环画满，避免除零
  const progress = quotes.length > 0 ? ((currentIndex + 1) / quotes.length) * 100 : 100

  return (
    <div
      className={cn(quotesVariants({ theme, size }), className)}
      data-slot="quotes"
      data-state={dataAttr(quotes.length > 0 ? 'ready' : 'empty')}
      data-quotes-theme={dataAttr(theme)}
      data-size={dataAttr(size)}
      data-index={dataAttr(currentIndex)}
      data-real={dataAttr(real)}
      {...props}
    >
      <svg
        data-slot="quotes-progress"
        className={quotesSvgVariants({ theme })}
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle
          data-slot="quotes-ring"
          data-kind="bg"
          className={quotesRingVariants({ kind: 'bg' })}
          cx="100"
          cy="100"
          r="95"
          fill="none"
        />
        <circle
          data-slot="quotes-ring"
          data-kind="progress"
          className={quotesRingVariants({ kind: 'progress' })}
          cx="100"
          cy="100"
          r="95"
          fill="none"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
        />
      </svg>
      <div data-slot="quotes-content" className={quotesContentVariants()}>
        <div data-slot="quotes-text" className={quotesTextVariants({ theme })}>
          {quote.text}
        </div>
        {quote.author && (
          <div data-slot="quotes-author" className={quotesAuthorVariants()}>
            {quote.author}
          </div>
        )}
      </div>
    </div>
  )
}

Quotes.displayName = 'Quotes'

export { quotesVariants }
export default Quotes
