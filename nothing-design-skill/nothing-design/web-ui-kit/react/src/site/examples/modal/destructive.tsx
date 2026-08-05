import { useState } from 'react'
import { Button } from 'nothing-ui/button'
import { Modal } from 'nothing-ui/modal'

export default function ModalDestructive() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Erase device
      </Button>
      <Modal
        variant="alert"
        destructive
        open={open}
        onClose={() => setOpen(false)}
        title="Erase this device?"
        description="Every photo, message and setting is removed. This cannot be undone."
        confirmLabel="Erase"
        cancelLabel="Cancel"
        onConfirm={() => console.log('erased')}
      />
    </>
  )
}
