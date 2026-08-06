import { Meter } from 'aios-ui-kit/meter'

export default function MeterBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Meter value={42} label="Storage" aria-label="Storage used" />
      <Meter value={80} label="Memory" aria-label="Memory used" />
      <Meter value={15} size="sm" label="Cache" aria-label="Cache used" />
      <Meter value={64} size="lg" label="CPU" aria-label="CPU load" />
    </div>
  )
}
