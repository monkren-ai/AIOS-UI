import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  monitorItemDetailsVariants,
  monitorItemLabelVariants,
  monitorItemStatusVariants,
  monitorItemValueVariants,
  monitorItemVariants,
  monitorSegmentVariants,
  monitorTitleVariants,
  systemMonitorVariants,
} from './system-monitor-variants'

type MonitorType = 'cpu' | 'ram' | 'storage' | 'network' | 'battery'
type MonitorStatus =
  | 'none'
  | 'warning'
  | 'critical'
  | 'charging'
  | 'low'
  | 'connected'
  | 'disconnected'

export interface SystemMonitorProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
    VariantProps<typeof systemMonitorVariants> {
  updateInterval?: number
  totalSegments?: number
  cpuPercent?: number
  ramPercent?: number
  storagePercent?: number
  ramTotal?: number
  storageTotal?: number
  netConnected?: boolean
  netSpeed?: number
  batteryPercent?: number
  batteryCharging?: boolean
}

export function SystemMonitor({
  className,
  variant = 'default',
  size = 'md',
  updateInterval = 2000,
  totalSegments = 12,
  cpuPercent: initialCpuPercent,
  ramPercent: initialRamPercent,
  storagePercent: initialStoragePercent,
  ramTotal = 8,
  storageTotal = 256,
  netConnected: initialNetConnected,
  netSpeed: initialNetSpeed,
  batteryPercent: initialBatteryPercent,
  batteryCharging: initialBatteryCharging,
  ref,
  ...props
}: SystemMonitorProps) {
  const [internalCpuPercent, setInternalCpuPercent] = React.useState(initialCpuPercent ?? 42)
  const [internalRamPercent, setInternalRamPercent] = React.useState(initialRamPercent ?? 67)
  const [internalStoragePercent, setInternalStoragePercent] = React.useState(
    initialStoragePercent ?? 54,
  )
  const [internalNetConnected, setInternalNetConnected] = React.useState(
    initialNetConnected ?? true,
  )
  const [internalNetSpeed, setInternalNetSpeed] = React.useState(initialNetSpeed ?? 12.5)
  const [internalBatteryPercent, setInternalBatteryPercent] = React.useState(
    initialBatteryPercent ?? 85,
  )
  const [internalBatteryCharging, setInternalBatteryCharging] = React.useState(
    initialBatteryCharging ?? false,
  )

  const cpuPercent = initialCpuPercent ?? internalCpuPercent
  const ramPercent = initialRamPercent ?? internalRamPercent
  const storagePercent = initialStoragePercent ?? internalStoragePercent
  const netConnected = initialNetConnected ?? internalNetConnected
  const netSpeed = initialNetSpeed ?? internalNetSpeed
  const batteryPercent = initialBatteryPercent ?? internalBatteryPercent
  const batteryCharging = initialBatteryCharging ?? internalBatteryCharging

  React.useEffect(() => {
    const hasInitialValues =
      initialCpuPercent !== undefined ||
      initialRamPercent !== undefined ||
      initialStoragePercent !== undefined ||
      initialNetConnected !== undefined ||
      initialNetSpeed !== undefined ||
      initialBatteryPercent !== undefined ||
      initialBatteryCharging !== undefined

    if (hasInitialValues) return

    const updateDemo = () => {
      setInternalCpuPercent(35 + Math.floor(Math.random() * 25))
      setInternalRamPercent(45 + Math.floor(Math.random() * 30))
      setInternalStoragePercent(60 + Math.floor(Math.random() * 20))
      setInternalNetConnected(Math.random() > 0.1)
      setInternalNetSpeed(parseFloat((5 + Math.random() * 20).toFixed(1)))
    }

    const updateBattery = async () => {
      try {
        if ('getBattery' in navigator) {
          const battery = await navigator.getBattery()
          setInternalBatteryPercent(Math.round(battery.level * 100))
          setInternalBatteryCharging(battery.charging)
        }
      } catch {
        setInternalBatteryPercent(85)
        setInternalBatteryCharging(Math.random() > 0.5)
      }
    }

    updateDemo()
    updateBattery()
    const timer = setInterval(() => {
      updateDemo()
      updateBattery()
    }, updateInterval)

    return () => clearInterval(timer)
  }, [
    updateInterval,
    initialCpuPercent,
    initialRamPercent,
    initialStoragePercent,
    initialNetConnected,
    initialNetSpeed,
    initialBatteryPercent,
    initialBatteryCharging,
  ])

  const getStatusClass = (percent: number): 'none' | 'warning' | 'critical' => {
    if (percent >= 90) return 'critical'
    if (percent >= 75) return 'warning'
    return 'none'
  }

  const getBatteryStatus = (
    percent: number,
    charging: boolean,
  ): 'none' | 'charging' | 'low' | 'critical' => {
    if (charging) return 'charging'
    if (percent <= 10) return 'critical'
    if (percent <= 20) return 'low'
    return 'none'
  }

  const cpuFilledSegments = Math.round((cpuPercent / 100) * totalSegments)
  const ramFilledSegments = Math.round((ramPercent / 100) * totalSegments)
  const storageFilledSegments = Math.round((storagePercent / 100) * totalSegments)
  const netPercent = Math.min(100, (netSpeed / 50) * 100)
  const netFilledSegments = Math.round((netPercent / 100) * totalSegments)
  const batteryFilledSegments = Math.round((batteryPercent / 100) * totalSegments)

  const ramUsed = ((ramTotal * ramPercent) / 100).toFixed(1)
  const storageUsed = ((storageTotal * storagePercent) / 100).toFixed(0)

  const renderProgress = (type: MonitorType, status: MonitorStatus, filled: number) => (
    <div data-slot="monitor-progress" className="flex h-3 w-full gap-0.5">
      {Array.from({ length: totalSegments }).map((_, index) => (
        <div
          key={index}
          data-slot="monitor-segment"
          data-filled={dataAttr(index < filled)}
          className={cn(monitorSegmentVariants({ filled: index < filled, type, status }))}
        />
      ))}
    </div>
  )

  const cpuStatus = getStatusClass(cpuPercent)
  const ramStatus = getStatusClass(ramPercent)
  const storageStatus = getStatusClass(storagePercent)
  const netStatus: MonitorStatus = netConnected ? 'connected' : 'disconnected'
  const batteryStatus = getBatteryStatus(batteryPercent, batteryCharging)

  return (
    <div
      ref={ref}
      className={cn(systemMonitorVariants({ variant, size }), className)}
      data-slot="system-monitor"
      data-variant={dataAttr(variant)}
      data-size={dataAttr(size)}
      data-state={dataAttr('monitoring')}
      {...props}
    >
      <div data-slot="monitor-header" className="mb-6 flex w-full items-baseline justify-between">
        <div data-slot="monitor-title" className={cn(monitorTitleVariants())}>
          System
        </div>
      </div>

      <div
        data-slot="monitor-item"
        data-type="cpu"
        className={cn(monitorItemVariants({ type: 'cpu', status: cpuStatus }))}
        data-state={dataAttr(cpuStatus)}
      >
        <div data-slot="monitor-item-header" className="mb-1 flex items-baseline justify-between">
          <div data-slot="monitor-item-label" className={cn(monitorItemLabelVariants())}>
            CPU
          </div>
          <div
            data-slot="monitor-item-value"
            className={cn(monitorItemValueVariants({ status: cpuStatus }))}
          >
            {cpuPercent}%
          </div>
        </div>
        {renderProgress('cpu', cpuStatus, cpuFilledSegments)}
      </div>

      <div
        data-slot="monitor-item"
        data-type="ram"
        className={cn(monitorItemVariants({ type: 'ram', status: ramStatus }))}
        data-state={dataAttr(ramStatus)}
      >
        <div data-slot="monitor-item-header" className="mb-1 flex items-baseline justify-between">
          <div data-slot="monitor-item-label" className={cn(monitorItemLabelVariants())}>
            RAM
          </div>
          <div
            data-slot="monitor-item-value"
            className={cn(monitorItemValueVariants({ status: ramStatus }))}
          >
            {ramPercent}%
          </div>
        </div>
        <div data-slot="monitor-item-details" className={cn(monitorItemDetailsVariants())}>
          {ramUsed} / {ramTotal} GB
        </div>
        {renderProgress('ram', ramStatus, ramFilledSegments)}
      </div>

      <div
        data-slot="monitor-item"
        data-type="storage"
        className={cn(monitorItemVariants({ type: 'storage', status: storageStatus }))}
        data-state={dataAttr(storageStatus)}
      >
        <div data-slot="monitor-item-header" className="mb-1 flex items-baseline justify-between">
          <div data-slot="monitor-item-label" className={cn(monitorItemLabelVariants())}>
            Storage
          </div>
          <div
            data-slot="monitor-item-value"
            className={cn(monitorItemValueVariants({ status: storageStatus }))}
          >
            {storagePercent}%
          </div>
        </div>
        <div data-slot="monitor-item-details" className={cn(monitorItemDetailsVariants())}>
          {storageUsed} / {storageTotal} GB
        </div>
        {renderProgress('storage', storageStatus, storageFilledSegments)}
      </div>

      <div
        data-slot="monitor-item"
        data-type="network"
        className={cn(monitorItemVariants({ type: 'network', status: netStatus }))}
        data-state={dataAttr(netStatus)}
      >
        <div data-slot="monitor-item-header" className="mb-1 flex items-baseline justify-between">
          <div data-slot="monitor-item-label" className={cn(monitorItemLabelVariants())}>
            NET
          </div>
          <div>
            <span data-slot="monitor-item-value" className={cn(monitorItemValueVariants())}>
              {netSpeed} MB/s
            </span>
            <span
              data-slot="monitor-item-status"
              data-tone={netConnected ? 'connected' : 'disconnected'}
              className={cn(
                monitorItemStatusVariants({ tone: netConnected ? 'connected' : 'disconnected' }),
              )}
            >
              {netConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        {renderProgress('network', netStatus, netFilledSegments)}
      </div>

      <div
        data-slot="monitor-item"
        data-type="battery"
        className={cn(monitorItemVariants({ type: 'battery', status: batteryStatus }))}
        data-state={dataAttr(batteryStatus)}
      >
        <div data-slot="monitor-item-header" className="mb-1 flex items-baseline justify-between">
          <div data-slot="monitor-item-label" className={cn(monitorItemLabelVariants())}>
            Battery
          </div>
          <div>
            <span
              data-slot="monitor-item-value"
              className={cn(monitorItemValueVariants({ status: batteryStatus }))}
            >
              {batteryPercent}%
            </span>
            <span
              data-slot="monitor-item-status"
              data-tone={batteryCharging ? 'charging' : 'discharging'}
              className={cn(
                monitorItemStatusVariants({ tone: batteryCharging ? 'charging' : 'discharging' }),
              )}
            >
              {batteryCharging ? 'Charging' : 'Discharging'}
            </span>
          </div>
        </div>
        {renderProgress('battery', batteryStatus, batteryFilledSegments)}
      </div>
    </div>
  )
}

SystemMonitor.displayName = 'SystemMonitor'

export { systemMonitorVariants, monitorItemVariants, monitorSegmentVariants }
export default SystemMonitor
