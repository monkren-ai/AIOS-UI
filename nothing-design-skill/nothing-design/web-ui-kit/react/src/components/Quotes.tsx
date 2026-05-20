import { useState, useEffect, useCallback } from 'react'
import '../styles/quotes.css'

interface QuoteData {
  text: string
  author: string
}

interface QuotesProps {
  theme?: 'light' | 'dark'
  quotes?: QuoteData[]
  interval?: number
  className?: string
}

const Quotes: React.FC<QuotesProps> = ({
  theme = 'dark',
  quotes = [],
  interval = 300000,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    if (quotes.length <= 1) return
    setCurrentIndex(prev => (prev + 1) % quotes.length)
  }, [quotes.length])

  useEffect(() => {
    if (quotes.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [quotes.length, interval, next])

  useEffect(() => {
    if (currentIndex >= quotes.length && quotes.length > 0) {
      setCurrentIndex(0)
    }
  }, [quotes.length, currentIndex])

  const quote = quotes.length > 0
    ? quotes[currentIndex]
    : { text: 'No quotes available', author: '' }

  return (
    <div
      className={[
        'nothing-quotes',
        `nothing-quotes--${theme}`,
        className
      ].filter(Boolean).join(' ')}
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

export default Quotes
