import { useState } from 'react'
import { SegmentedControl } from '@/SegmentedControl'

export default function Demo() {
  const ranges = ['Day', 'Week', 'Month', 'Year']
  const [range, setRange] = useState(0)
  const [theme, setTheme] = useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Pill · onChange
        </div>
        <SegmentedControl segments={ranges} activeIndex={range} onChange={setRange} />
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
          Rounded variant
        </div>
        <SegmentedControl
          variant="rounded"
          segments={['Light', 'Dark']}
          activeIndex={theme}
          onChange={setTheme}
        />
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
          Disabled
        </div>
        <SegmentedControl segments={['A', 'B', 'C']} disabled />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Range: {ranges[range]} · Theme: {theme === 0 ? 'Light' : 'Dark'}
      </div>
    </div>
  )
}
