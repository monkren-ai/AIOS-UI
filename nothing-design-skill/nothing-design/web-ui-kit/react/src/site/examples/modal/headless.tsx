import { useState } from 'react'
import { Button } from 'nothing-ui/button'
import { Modal } from 'nothing-ui/modal'

export default function ModalHeadless() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        Show artwork
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} aria-label="Album artwork">
        <div className="flex aspect-square w-full items-center justify-center border border-border bg-surface-raised font-mono text-label uppercase tracking-wider text-foreground-muted">
          Artwork
        </div>
      </Modal>
    </>
  )
}
