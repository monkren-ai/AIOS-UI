import { useState } from 'react'
import { Button } from 'nothing-ui/button'
import { Modal } from 'nothing-ui/modal'

export default function ModalWithFooter() {
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Rename device
      </Button>
      {saved && (
        <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">Saved</p>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Rename device"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setSaved(true)
                setOpen(false)
              }}
            >
              Save
            </Button>
          </>
        }
      >
        <p>The name is visible to anyone you share the device with.</p>
      </Modal>
    </div>
  )
}
