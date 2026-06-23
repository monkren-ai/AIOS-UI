import { useState } from 'react'
import { ScrollArea } from '@/ScrollArea'

export default function Demo() {
  const [count, setCount] = useState(15)

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Height 160px · {count} items
        </div>
        <ScrollArea height="160px" style={{ width: 280, border: '1px solid var(--border-visible)' }}>
          <div style={{ padding: 16 }}>
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                }}
              >
                Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button
            className="nothing-btn nothing-btn--secondary"
            onClick={() => setCount((c) => Math.max(5, c - 5))}
          >
            −5 items
          </button>
          <button
            className="nothing-btn nothing-btn--secondary"
            onClick={() => setCount((c) => c + 5)}
          >
            +5 items
          </button>
        </div>
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Height 240px · custom scrollbar
        </div>
        <ScrollArea height="240px" style={{ width: 280, border: '1px solid var(--border-visible)' }}>
          <div style={{ padding: 16 }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                }}
              >
                Row {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
