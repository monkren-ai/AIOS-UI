import { useState } from 'react'
import { ContextMenu } from '@/ContextMenu'

export default function Demo() {
  const [selected, setSelected] = useState<string>('—')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <ContextMenu
        items={[
          { label: 'Copy', shortcut: '⌘C', onClick: () => setSelected('Copy') },
          { label: 'Paste', shortcut: '⌘V', onClick: () => setSelected('Paste') },
          { label: 'Rename', shortcut: 'F2', onClick: () => setSelected('Rename') },
          { label: 'Separator', separator: true },
          { label: 'Delete', shortcut: '⌫', onClick: () => setSelected('Delete') },
          { label: 'Disabled', disabled: true },
        ]}
      >
        <div
          style={{
            width: 320,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--surface-raised)',
            border: '1px dashed var(--border-visible)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
          }}
        >
          Right-click this area
        </div>
      </ContextMenu>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Selected: {selected}
      </div>
    </div>
  )
}
