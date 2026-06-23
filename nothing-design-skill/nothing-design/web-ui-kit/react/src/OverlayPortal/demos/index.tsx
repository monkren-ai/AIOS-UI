import { useState } from 'react'
import { OverlayPortal, useEscapeKey, useScrollLock } from '../OverlayPortal'

export default function Demo() {
  const [open, setOpen] = useState(false)
  useEscapeKey(open, () => setOpen(false))
  useScrollLock(open)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Overlay</button>
      <OverlayPortal open={open}>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              padding: 24,
              background: 'var(--surface)',
              border: '1px solid var(--border-visible)',
              borderRadius: 8,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)',
            }}
          >
            Portal Content — click backdrop to close
          </div>
        </div>
      </OverlayPortal>
    </>
  )
}
