import { Calendar } from 'aios-ui-kit/calendar'

export default function CalendarFull() {
  return (
    <div className="w-full max-w-sm">
      <Calendar type="full" initialDate={new Date(2026, 7, 1)} />
    </div>
  )
}
