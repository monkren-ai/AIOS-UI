import { useState } from 'react'
import { DateNav } from 'aios-ui-kit/date-nav'

function shiftMonth(date: Date, delta: number): Date {
  const next = new Date(date)
  next.setDate(1)
  next.setMonth(next.getMonth() + delta)
  return next
}

const MIN = new Date(2026, 0, 1)
const MAX = new Date(2026, 11, 1)

export default function DateNavControlled() {
  const [date, setDate] = useState(new Date(2026, 5, 1))

  return (
    <div className="flex flex-col items-center gap-3">
      <DateNav
        currentDate={date}
        onPrev={() => setDate((d) => shiftMonth(d, -1))}
        onNext={() => setDate((d) => shiftMonth(d, 1))}
        prevDisabled={date.getTime() <= MIN.getTime()}
        nextDisabled={date.getTime() >= MAX.getTime()}
      />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        Selected: {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  )
}
