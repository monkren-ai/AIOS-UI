import { useState } from 'react'
import { DateNav } from '../DateNav'

export default function Demo() {
  const [date, setDate] = useState(() => new Date())
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <DateNav currentDate={date} onDateChange={setDate} />
      <DateNav currentDate={date} onDateChange={setDate} grotesk />
      <DateNav label="Custom Label" onPrev={() => {}} onNext={() => {}} />
    </div>
  )
}
