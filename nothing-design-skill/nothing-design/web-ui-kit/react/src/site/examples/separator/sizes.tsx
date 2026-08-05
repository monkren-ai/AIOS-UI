import { Separator } from 'nothing-ui/separator'

export default function SeparatorSizes() {
  return (
    <div className="w-full max-w-sm">
      <p className="font-mono text-caption uppercase tracking-wider text-foreground-muted">sm</p>
      <Separator size="sm" />
      <p className="font-mono text-caption uppercase tracking-wider text-foreground-muted">md</p>
      <Separator size="md" />
      <p className="font-mono text-caption uppercase tracking-wider text-foreground-muted">lg</p>
      <Separator size="lg" />
      <p className="font-mono text-caption uppercase tracking-wider text-foreground-muted">end</p>
    </div>
  )
}
