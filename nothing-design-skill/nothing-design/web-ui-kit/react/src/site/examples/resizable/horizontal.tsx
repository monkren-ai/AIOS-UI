import { Resizable } from 'nothing-ui/resizable'

export default function ResizableHorizontal() {
  return (
    <Resizable className="h-48 w-full max-w-lg border border-border-visible">
      <div className="flex h-full items-center justify-center bg-surface-raised font-mono text-sm text-foreground-muted">
        Sidebar
      </div>
      <div className="flex h-full items-center justify-center font-mono text-sm text-foreground-muted">
        Content
      </div>
    </Resizable>
  )
}
