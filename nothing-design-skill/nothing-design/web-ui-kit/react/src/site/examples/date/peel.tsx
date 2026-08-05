import { useState } from 'react'
import { DateWidget } from 'nothing-ui/date'

export default function DatePeel() {
  const [torn, setTorn] = useState(0)

  return (
    <div className="flex flex-col items-center gap-3">
      <DateWidget type="serif" showPeel onPeelClick={() => setTorn((n) => n + 1)} />
      <p className="font-mono text-caption text-foreground-muted">Peeled {torn}x</p>
    </div>
  )
}
