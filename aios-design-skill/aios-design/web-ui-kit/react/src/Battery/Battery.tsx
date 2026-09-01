import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { batteryDeviceVariants, batteryPercentVariants, batteryProgressVariants, batteryRingVariants, batterySegmentVariants, batteryStatusVariants, batteryVariants } from './battery-variants'

export interface BatteryDevice {
  name: string
  type: 'mouse' | 'keyboard' | 'earbuds' | 'phone' | 'watch'
  percent: number
  isCharging?: boolean
}

export interface BatteryProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'onClick'>, Omit<VariantProps<typeof batteryVariants>, 'level'> {
  updateInterval?: number
  totalSegments?: number
  percent?: number
  isCharging?: boolean
  devices?: BatteryDevice[]
  onDeviceClick?: (device: BatteryDevice) => void
}

const CIRCUMFERENCE = 2 * Math.PI * 52

function levelFor(percent: number, charging: boolean): 'critical' | 'low' | 'medium' | 'high' {
  if (charging || percent > 50) return 'high'
  if (percent <= 10) return 'critical'
  if (percent <= 20) return 'low'
  return 'medium'
}

export function Battery({ updateInterval = 5000, totalSegments = 10, percent: controlledPercent, isCharging: controlledCharging, variant = 'segmented', devices, onDeviceClick, className, ref, ...props }: BatteryProps) {
  const [internalPercent, setInternalPercent] = React.useState(controlledPercent ?? 75)
  const [internalCharging, setInternalCharging] = React.useState(controlledCharging ?? false)
  const percent = Math.max(0, Math.min(100, controlledPercent ?? internalPercent))
  const isCharging = controlledCharging ?? internalCharging

  React.useEffect(() => {
    if (controlledPercent !== undefined || controlledCharging !== undefined) return
    const update = async () => {
      const batteryNavigator = navigator as Navigator & { getBattery?: () => Promise<{ level: number; charging: boolean }> }
      if (!batteryNavigator.getBattery) return
      try { const value = await batteryNavigator.getBattery(); setInternalPercent(Math.round(value.level * 100)); setInternalCharging(value.charging) } catch { /* keep session value */ }
    }
    void update()
    const timer = setInterval(() => void update(), updateInterval)
    return () => clearInterval(timer)
  }, [controlledCharging, controlledPercent, updateInterval])

  const level = levelFor(percent, isCharging)
  const filled = Math.round(percent / 100 * totalSegments)
  const meter = { role: 'meter' as const, 'aria-valuenow': percent, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': `Battery at ${percent}%, ${isCharging ? 'charging' : 'discharging'}` }

  return (
    <div ref={ref} className={cn(batteryVariants({ variant, level }), className)} data-slot="battery" data-variant={dataAttr(variant)} data-state={dataAttr(isCharging ? 'charging' : level)} {...meter} {...props}>
      {variant === 'ring' ? (
        <div className={cn(batteryRingVariants())}>
          <svg className="absolute inset-2 size-36 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke={isCharging ? 'var(--success)' : level === 'low' || level === 'critical' ? 'var(--warning)' : 'var(--accent)'} strokeWidth="8" strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)} />
          </svg>
          <span className="relative font-display text-heading tabular-nums text-foreground-display">{percent}%</span>
        </div>
      ) : (
        <>
          <div className="mb-4 flex w-full items-baseline justify-between"><span className={cn(batteryPercentVariants())}>{percent}%</span><span className={cn(batteryStatusVariants({ charging: isCharging }))}>{isCharging ? 'Charging' : 'Discharging'}</span></div>
          <div className={cn(batteryProgressVariants())}>{Array.from({ length: totalSegments }).map((_, index) => <span key={index} data-filled={dataAttr(index < filled)} className={cn(batterySegmentVariants({ filled: index < filled, level }))} />)}</div>
        </>
      )}
      {devices?.length ? <div className="mt-4 flex w-full flex-col border-t border-border pt-2">{devices.map((device) => <div key={`${device.type}-${device.name}`} className={cn(batteryDeviceVariants({ clickable: Boolean(onDeviceClick) }))} role={onDeviceClick ? 'button' : undefined} tabIndex={onDeviceClick ? 0 : undefined} onClick={() => onDeviceClick?.(device)} onKeyDown={(event) => { if (onDeviceClick && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onDeviceClick(device) } }}><span aria-hidden="true" className="font-mono text-label uppercase text-foreground-subtle">{device.type.slice(0, 2)}</span><span className="min-w-0 flex-1 truncate text-body-sm text-foreground">{device.name}</span><span className="font-mono text-caption tabular-nums text-foreground-muted">{device.isCharging ? '↯ ' : ''}{device.percent}%</span></div>)}</div> : null}
    </div>
  )
}

Battery.displayName = 'Battery'
export { batteryVariants, batteryRingVariants, batteryDeviceVariants }
export default Battery
