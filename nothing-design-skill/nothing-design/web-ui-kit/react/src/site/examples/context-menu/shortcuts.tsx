import { useState } from 'react'
import { ContextMenu } from 'nothing-ui/context-menu'

export default function ContextMenuShortcuts() {
  const [last, setLast] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-2">
      <ContextMenu
        items={[
          { label: 'Cut', shortcut: '⌘X', onClick: () => setLast('Cut') },
          { label: 'Copy', shortcut: '⌘C', onClick: () => setLast('Copy') },
          { label: 'Paste', shortcut: '⌘V', onClick: () => setLast('Paste') },
        ]}
      >
        <p className="max-w-64 border border-border p-4 text-sm">
          Shortcut hints are labels, not bindings — the component never listens for ⌘X, so wire the
          real keyboard handler up yourself.
        </p>
      </ContextMenu>
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {last ?? 'No command run'}
      </p>
    </div>
  )
}
