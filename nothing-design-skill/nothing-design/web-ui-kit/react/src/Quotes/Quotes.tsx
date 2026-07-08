import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useNow } from '@/system/hooks'
import { cn, dataAttr } from '@/lib/utils'
import './Quotes.css'

const quotesVariants = cva('nothing-quotes', {
  variants: {
    theme: {
      light: 'nothing-quotes--light',
      dark: 'nothing-quotes--dark',
    },
    size: {
      sm: 'nothing-quotes--sm',
      md: 'nothing-quotes--md',
      lg: 'nothing-quotes--lg',
    },
  },
  defaultVariants: { theme: 'dark', size: 'md' },
})

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

export interface QuotesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof quotesVariants> {
  quotes?: QuoteData[]
  interval?: number
}

export const Quotes = React.forwardRef<HTMLDivElement, QuotesProps>(
  ({ className, theme = 'dark', size = 'md', quotes = defaultQuotes, interval = 30000, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    // useNow 节拍: 每次 interval 触发一次重新渲染
    const tick = useNow(quotes.length > 1 ? interval : 60_000)
    void tick

    React.useEffect(() => {
      if (quotes.length <= 1) return
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tick, quotes.length])

    React.useEffect(() => {
      if (currentIndex >= quotes.length && quotes.length > 0) {
        setCurrentIndex(0)
      }
    }, [quotes.length, currentIndex])

    const quote = quotes.length > 0
      ? quotes[currentIndex]
      : { text: 'No quotes available', author: '' }
    const real = quotes !== defaultQuotes

    return (
      <div
        ref={ref}
        className={cn(quotesVariants({ theme, size }), className)}
        data-state={dataAttr(quotes.length > 0 ? 'ready' : 'empty')}
        data-real={dataAttr(real)}
        {...props}
      >
        <svg
          className="nothing-quotes__svg"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle
            className="nothing-quotes__ring nothing-quotes__ring--bg"
            cx="100"
            cy="100"
            r="95"
            fill="none"
          />
          <circle
            className="nothing-quotes__ring nothing-quotes__ring--progress"
            cx="100"
            cy="100"
            r="95"
            fill="none"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - ((currentIndex + 1) / quotes.length) * 100}
          />
        </svg>
        <div className="nothing-quotes__content">
          <div className="nothing-quotes__text">{quote.text}</div>
          {quote.author && (
            <div className="nothing-quotes__author">{quote.author}</div>
          )}
        </div>
      </div>
    )
  }
)
Quotes.displayName = 'Quotes'

export { quotesVariants }
export default Quotes
