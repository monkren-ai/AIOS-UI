import { useState } from 'react'
import { SuccessCheck } from 'aios-ui-kit/success-check'
import { Button } from 'aios-ui-kit/button'

export default function SuccessCheckBasic() {
  const [done, setDone] = useState(false)

  return (
    <div className="flex flex-col items-start gap-4">
      <SuccessCheck active={done} />
      <Button size="sm" variant="secondary" onClick={() => setDone((value) => !value)}>
        {done ? 'Reset' : 'Mark done'}
      </Button>
    </div>
  )
}
