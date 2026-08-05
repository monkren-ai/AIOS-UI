import { DateWidget } from 'nothing-ui/date'

export default function DateTypes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <DateWidget type="rect" theme="light" />
      <DateWidget type="dual-ring" theme="dark" />
      <DateWidget type="serif" />
    </div>
  )
}
