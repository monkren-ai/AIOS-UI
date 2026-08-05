import { Calendar } from 'nothing-ui/calendar'

export default function CalendarFull() {
  return (
    <div className="w-full max-w-sm">
      <Calendar type="full" initialDate={new Date(2026, 7, 1)} />
    </div>
  )
}
