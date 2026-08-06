import { Separator } from 'aios-ui-kit/separator'

export default function SeparatorVertical() {
  return (
    <div className="flex h-6 items-center justify-center font-mono text-caption uppercase tracking-wider text-foreground-muted">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Components</span>
      <Separator orientation="vertical" />
      <span>Icons</span>
    </div>
  )
}
