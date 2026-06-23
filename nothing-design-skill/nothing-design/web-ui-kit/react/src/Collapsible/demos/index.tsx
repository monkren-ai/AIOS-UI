import { useState } from 'react'
import { Collapsible } from '@/Collapsible'

export default function Demo() {
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const pushLog = (msg: string) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()} · ${msg}`, ...prev].slice(0, 5))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Controlled · onOpenChange
        </div>
        <Collapsible
          open={open}
          onOpenChange={(next) => {
            setOpen(next)
            pushLog(`Controlled toggled → ${next ? 'open' : 'closed'}`)
          }}
          trigger={open ? '▾ Collapse' : '▸ Expand'}
        >
          This panel is fully controlled. The open state lives in the parent and is mirrored back
          through onOpenChange.
        </Collapsible>
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
          Uncontrolled · defaultOpen
        </div>
        <Collapsible trigger="Uncontrolled section" defaultOpen>
          Starts open and manages its own state internally.
        </Collapsible>
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
          Multiple group
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Collapsible trigger="Section A">Content for section A.</Collapsible>
          <Collapsible trigger="Section B">Content for section B.</Collapsible>
          <Collapsible trigger="Section C">Content for section C.</Collapsible>
        </div>
      </div>

      {log.length > 0 && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border)',
            paddingTop: 8,
          }}
        >
          {log.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
    </div>
  )
}
