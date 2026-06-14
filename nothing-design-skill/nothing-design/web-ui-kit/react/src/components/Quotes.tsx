import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useNow } from '../system/hooks'
import { cn, dataAttr } from '../lib/utils'
import '../styles/quotes.css'

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
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'Design is not just what it looks like. Design is how it works.', author: 'Steve Jobs' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { text: 'Stay hungry, stay foolish.', author: 'Stewart Brand' },
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { text: 'Less, but better.', author: 'Dieter Rams' },
  { text: 'Technology is best when it brings people together.', author: 'Matt Mullenweg' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
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
        <svg className="nothing-quotes__svg" viewBox="0 0 200 200">
          <circle className="nothing-quotes__outer" cx="100" cy="100" r="95" />
          <circle className="nothing-quotes__inner" cx="100" cy="100" r="85" />
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
