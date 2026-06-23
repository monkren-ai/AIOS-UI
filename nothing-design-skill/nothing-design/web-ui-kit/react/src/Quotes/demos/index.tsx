import { useState } from 'react'
import { Quotes, type QuoteData } from '@/Quotes'

const btn = {
  padding: '6px 14px',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
}

const label = {
  fontSize: 10,
  opacity: 0.4,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: 8,
}

const designQuotes: QuoteData[] = [
  { text: 'Less, but better.', author: 'Dieter Rams' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'Design is not just what it looks like. Design is how it works.', author: 'Steve Jobs' },
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
]

const techQuotes: QuoteData[] = [
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Technology is best when it brings people together.', author: 'Matt Mullenweg' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { text: 'Stay hungry, stay foolish.', author: 'Stewart Brand' },
]

export default function Demo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [quoteSet, setQuoteSet] = useState<'design' | 'tech'>('design')

  const quotes = quoteSet === 'design' ? designQuotes : techQuotes

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={label}>Theme:</span>
          {(['dark', 'light'] as const).map((t) => (
            <button
              key={t}
              style={{
                ...btn,
                ...(theme === t
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={label}>Quotes:</span>
          {(['design', 'tech'] as const).map((s) => (
            <button
              key={s}
              style={{
                ...btn,
                ...(quoteSet === s
                  ? { background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.45)' }
                  : { opacity: 0.55 }),
              }}
              onClick={() => setQuoteSet(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Quotes key={`${theme}-${quoteSet}`} theme={theme} size="md" quotes={quotes} interval={6000} />
      </div>
    </div>
  )
}
