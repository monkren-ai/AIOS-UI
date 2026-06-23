import { useState } from 'react'
import { Modal } from '../Modal'

export default function Demo() {
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <button className="nothing-btn nothing-btn--primary" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <button className="nothing-btn nothing-btn--secondary" onClick={() => setAlertOpen(true)}>
        Open Alert
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
        <p>This is the modal body content.</p>
      </Modal>
      <Modal
        variant="alert"
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Are you sure?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  )
}
