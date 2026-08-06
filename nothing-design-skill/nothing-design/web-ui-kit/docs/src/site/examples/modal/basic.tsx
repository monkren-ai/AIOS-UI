import { useState } from 'react'
import { Button } from 'aios-ui-kit/button'
import { Modal } from 'aios-ui-kit/modal'

export default function ModalBasic() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Firmware 2.6.1">
        <p>
          The update installs on the next restart and takes about four minutes. Your device stays
          usable until then.
        </p>
      </Modal>
    </>
  )
}
