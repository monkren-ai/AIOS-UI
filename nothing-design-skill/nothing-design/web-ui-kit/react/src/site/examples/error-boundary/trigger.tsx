import { useState } from 'react'
import ErrorBoundary from 'nothing-ui/error-boundary'
import { Button } from 'nothing-ui/button'

function BrokenChild({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Demo render error')
  }
  return <p className="font-mono text-xs text-foreground-muted">Everything is fine.</p>
}

export default function ErrorBoundaryTrigger() {
  const [broken, setBroken] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button size="sm" variant="secondary" onClick={() => setBroken(true)}>
        Trigger error
      </Button>
      <ErrorBoundary
        fallback={
          <div className="rounded border border-border-visible p-4 text-center">
            <p className="font-mono text-xs text-foreground-display">Custom fallback</p>
            <Button size="sm" className="mt-3" onClick={() => setBroken(false)}>
              Reset
            </Button>
          </div>
        }
      >
        <BrokenChild shouldThrow={broken} />
      </ErrorBoundary>
    </div>
  )
}
