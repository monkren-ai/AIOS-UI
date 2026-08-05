import { Chrono } from 'nothing-ui/chrono'

export default function ChronoSizes() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6">
      <Chrono size="sm" maxLaps={5} className="max-w-64" />
      <Chrono size="md" maxLaps={5} className="max-w-72" />
      <Chrono size="lg" maxLaps={5} className="max-w-80" />
    </div>
  )
}
