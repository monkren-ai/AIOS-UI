import { Meter } from 'aios-ui-kit/meter'

export default function MeterThresholds() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {/* optimum=50 落在 mid：value=40 也在 mid → good，数值用默认前景色 */}
      <Meter
        value={40}
        min={0}
        max={100}
        low={33}
        high={66}
        optimum={50}
        label="Load"
        aria-label="System load"
      />
      {/* value=75 越过 high，与 optimum 相邻一段 → warning，数值变黄 */}
      <Meter
        value={75}
        min={0}
        max={100}
        low={33}
        high={66}
        optimum={50}
        label="Load"
        aria-label="System load"
      />
      {/* optimum=10 落在 low：value=90 在 high，两段之隔 → critical，数值变红 */}
      <Meter
        value={90}
        min={0}
        max={100}
        low={33}
        high={66}
        optimum={10}
        label="Load"
        aria-label="System load"
      />
    </div>
  )
}
