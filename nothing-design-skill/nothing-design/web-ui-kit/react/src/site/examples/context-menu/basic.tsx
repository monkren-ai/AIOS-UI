import { ContextMenu } from 'nothing-ui/context-menu'

export default function ContextMenuBasic() {
  return (
    <ContextMenu
      items={[
        { label: 'Open', onClick: () => console.log('open') },
        { label: 'Rename', onClick: () => console.log('rename') },
        { label: 'Delete', onClick: () => console.log('delete') },
      ]}
    >
      <div className="flex h-32 w-64 items-center justify-center border border-dashed border-border-visible font-mono text-label uppercase tracking-wider text-foreground-muted">
        Right-click here
      </div>
    </ContextMenu>
  )
}
