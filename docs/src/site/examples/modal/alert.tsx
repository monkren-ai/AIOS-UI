import { useState } from 'react'
import { Button } from 'aios-ui-kit/button'
import { Modal } from 'aios-ui-kit/modal'

export default function ModalAlert() {
  const [open, setOpen] = useState(false)
  const [outcome, setOutcome] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Leave the page
      </Button>
      {outcome && (
        <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
          {outcome}
        </p>
      )}
      <Modal
        variant="alert"
        open={open}
        onClose={() => setOpen(false)}
        title="Discard draft?"
        description="You have unsaved changes. Leaving now throws them away."
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        onConfirm={() => setOutcome('Discarded')}
        onCancel={() => setOutcome('Still editing')}
      />
    </div>
  )
}
