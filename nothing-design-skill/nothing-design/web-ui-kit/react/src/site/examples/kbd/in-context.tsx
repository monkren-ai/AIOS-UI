import { Kbd } from 'nothing-ui/kbd'

export default function KbdInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="text-sm text-foreground-muted">
        Press <Kbd size="sm">/</Kbd> to focus the search field.
      </p>
      <div className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
        <span className="text-sm text-foreground">Command palette</span>
        <Kbd keys={['⌘', 'K']} size="sm" variant="ghost" />
      </div>
    </div>
  )
}
