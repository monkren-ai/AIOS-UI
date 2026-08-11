import { useEffect, useState } from 'react'
import { Command } from 'aios-ui-kit/command'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="relative flex flex-col items-center gap-3">
      <button
        type="button"
        className="rounded-md border border-border-visible bg-transparent px-4 py-2 font-mono text-sm text-foreground"
        onClick={() => setOpen(true)}
      >
        ⌘K / Ctrl+K
      </button>
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {lastRun ? `Ran: ${lastRun}` : 'AIOS run yet'}
      </p>
      {open && (
        <div className="absolute inset-0 z-10 flex items-start justify-center bg-overlay pt-4">
          <Command
            open={open}
            onOpenChange={setOpen}
            groups={[
              {
                heading: 'Actions',
                items: [
                  {
                    id: 'new',
                    label: 'New file',
                    shortcut: '⌘N',
                    onSelect: () => setLastRun('New file'),
                  },
                  {
                    id: 'open',
                    label: 'Open file',
                    shortcut: '⌘O',
                    onSelect: () => setLastRun('Open file'),
                  },
                ],
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}
