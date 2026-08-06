import { ContextMenu } from 'aios-ui-kit/context-menu'

export default function ContextMenuSeparators() {
  return (
    <ContextMenu
      items={[
        { label: 'Play next', onClick: () => console.log('next') },
        { label: 'Add to queue', onClick: () => console.log('queue') },
        // A rule is an entry of its own, exactly as in DropdownMenu.
        { separator: true },
        { label: 'Go to album', disabled: true },
        { label: 'Remove', onClick: () => console.log('remove') },
        { separator: true },
        { label: 'Report a problem', onClick: () => console.log('report') },
      ]}
    >
      <div className="flex h-32 w-64 items-center justify-center border border-dashed border-border-visible font-mono text-label uppercase tracking-wider text-foreground-muted">
        Right-click here
      </div>
    </ContextMenu>
  )
}
