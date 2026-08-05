import * as React from 'react'
import { Card } from 'nothing-ui/card'

export default function CardInteractive() {
  const [selected, setSelected] = React.useState('daily')

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {[
        { id: 'daily', label: 'Daily digest' },
        { id: 'weekly', label: 'Weekly digest' },
      ].map((option) => (
        <Card
          key={option.id}
          interactive
          variant={selected === option.id ? 'secondary' : 'outline'}
          title={option.label}
          aria-pressed={selected === option.id}
          onClick={() => setSelected(option.id)}
        >
          Click or press Enter to pick this cadence.
        </Card>
      ))}
      <Card interactive disabled title="Realtime">
        Unavailable on the current plan.
      </Card>
    </div>
  )
}
