import { DropdownMenu } from 'nothing-ui/dropdown-menu'

export default function DropdownMenuMenubar() {
  return (
    <DropdownMenu
      variant="menubar"
      items={[
        {
          label: 'File',
          items: [
            { label: 'New window', shortcut: '⌘N', onClick: () => console.log('new') },
            { label: 'Open…', shortcut: '⌘O', onClick: () => console.log('open') },
            { separator: true },
            { label: 'Close', shortcut: '⌘W', onClick: () => console.log('close') },
          ],
        },
        {
          label: 'Edit',
          items: [
            { label: 'Undo', shortcut: '⌘Z', onClick: () => console.log('undo') },
            { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
          ],
        },
        {
          label: 'View',
          items: [{ label: 'Toggle sidebar', shortcut: '⌘B', onClick: () => console.log('view') }],
        },
      ]}
    />
  )
}
