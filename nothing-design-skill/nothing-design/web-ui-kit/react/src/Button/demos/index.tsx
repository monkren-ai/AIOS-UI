import { useState } from 'react'
import { Button } from '@/Button'

export default function Demo() {
  const [loading, setLoading] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    setLoading(true)
    setClickCount((c) => c + 1)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary" onClick={handleClick} disabled={loading}>
          {loading ? 'Loading...' : 'Primary'}
        </Button>
        <Button variant="secondary" onClick={handleClick} disabled={loading}>
          {loading ? 'Loading...' : 'Secondary'}
        </Button>
        <Button variant="ghost" onClick={handleClick} disabled={loading}>
          {loading ? 'Loading...' : 'Ghost'}
        </Button>
        <Button variant="destructive" onClick={handleClick} disabled={loading}>
          {loading ? 'Loading...' : 'Delete'}
        </Button>
      </div>
      <Button variant="primary" fullWidth onClick={handleClick} disabled={loading}>
        {loading ? 'Submitting...' : 'Full Width Submit'}
      </Button>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Clicks: {clickCount} · {loading ? 'loading' : 'idle'}
      </div>
    </div>
  )
}
