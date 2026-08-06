import { Resizable } from 'aios-ui-kit/resizable'

export default function ResizableConstraints() {
  return (
    <Resizable
      className="h-48 w-full max-w-lg border border-border-visible"
      initialSizes={[20, 50, 30]}
      minSizes={[10, 20, 10]}
      maxSizes={[40, 80, 60]}
    >
      <div className="flex h-full items-center justify-center bg-surface-raised font-mono text-caption text-foreground-muted">
        Files
      </div>
      <div className="flex h-full items-center justify-center font-mono text-caption text-foreground-muted">
        Editor
      </div>
      <div className="flex h-full items-center justify-center bg-surface-raised font-mono text-caption text-foreground-muted">
        Outline
      </div>
    </Resizable>
  )
}
