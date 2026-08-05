import { useState } from 'react'
import { DropdownMenu } from 'nothing-ui/dropdown-menu'

export default function DropdownMenuGroups() {
  const [last, setLast] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-2">
      <DropdownMenu
        trigger="Track ▾"
        items={[
          { label: 'Play next', onClick: () => setLast('Play next') },
          { label: 'Add to queue', onClick: () => setLast('Add to queue') },
          { separator: true },
          { label: 'Go to album', disabled: true },
          { separator: true },
          { label: 'Remove from library', onClick: () => setLast('Remove from library') },
        ]}
      />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        {last ?? 'Nothing chosen yet'}
      </p>
    </div>
  )
}
