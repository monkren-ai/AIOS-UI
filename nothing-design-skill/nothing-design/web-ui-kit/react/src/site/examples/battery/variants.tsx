import { Battery } from 'aios-ui-kit/battery'

export default function BatteryVariants() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <Battery variant="segmented" percent={68} isCharging={false} />
      <Battery variant="ring" percent={22} isCharging />
    </div>
  )
}
