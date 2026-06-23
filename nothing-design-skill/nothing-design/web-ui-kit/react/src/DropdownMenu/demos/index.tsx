import { DropdownMenu } from '../DropdownMenu'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <DropdownMenu
        trigger="Options"
        align="start"
        items={[
          { label: 'Edit', onClick: () => console.log('Edit') },
          { label: 'Duplicate', onClick: () => console.log('Duplicate') },
          { label: 'Separator', separator: true },
          { label: 'Delete', onClick: () => console.log('Delete') },
          { label: 'Disabled', disabled: true },
        ]}
      />
      <DropdownMenu
        variant="menubar"
        items={[
          {
            label: 'File',
            items: [
              { label: 'New', shortcut: '⌘N' },
              { label: 'Open', shortcut: '⌘O' },
              { label: 'Sep', separator: true },
              { label: 'Save', shortcut: '⌘S' },
            ],
          },
          {
            label: 'Edit',
            items: [
              { label: 'Undo', shortcut: '⌘Z' },
              { label: 'Redo', shortcut: '⌘⇧Z' },
            ],
          },
        ]}
      />
    </div>
  )
}
