import { Resizable } from 'nothing-ui/resizable'

export default function ResizableVertical() {
  return (
    <Resizable direction="vertical" className="h-64 w-full max-w-sm border border-border-visible">
      <div className="flex h-full items-center justify-center bg-surface-raised font-mono text-sm text-foreground-muted">
        Preview
      </div>
      <div className="flex h-full items-center justify-center font-mono text-sm text-foreground-muted">
        Console
      </div>
    </Resizable>
  )
}
