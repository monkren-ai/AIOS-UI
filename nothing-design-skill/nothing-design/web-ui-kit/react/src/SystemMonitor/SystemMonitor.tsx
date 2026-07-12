import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './SystemMonitor.css'

const systemMonitorVariants = cva('nothing-system-monitor', {
  variants: {
    variant: {
      default: '',
      compact: 'nothing-system-monitor--compact',
      detailed: 'nothing-system-monitor--detailed',
    },
    size: {
      sm: 'nothing-system-monitor--sm',
      md: 'nothing-system-monitor--md',
      lg: 'nothing-system-monitor--lg',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

const monitorItemVariants = cva('monitor-item', {
  variants: {
    type: {
      cpu: 'cpu',
      ram: 'ram',
      storage: 'storage',
      network: 'network',
      battery: 'battery',
    },
    status: {
      none: '',
      warning: 'warning',
      critical: 'critical',
      charging: 'charging',
      low: 'low',
      connected: 'connected',
      disconnected: 'disconnected',
    },
  },
  defaultVariants: { type: 'cpu', status: 'none' },
})

const monitorSegmentVariants = cva('monitor-segment', {
  variants: {
    filled: { true: 'filled', false: '' },
  },
  defaultVariants: { filled: false },
})

export interface SystemMonitorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
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

export const SystemMonitor = React.forwardRef<HTMLDivElement, SystemMonitorProps>(
  ({ className, variant = 'default', size = 'md', updateInterval = 2000, totalSegments = 12, cpuPercent: initialCpuPercent, ramPercent: initialRamPercent, storagePercent: initialStoragePercent, ramTotal = 8, storageTotal = 256, netConnected: initialNetConnected, netSpeed: initialNetSpeed, batteryPercent: initialBatteryPercent, batteryCharging: initialBatteryCharging, ...props }, ref) => {
    const [internalCpuPercent, setInternalCpuPercent] = React.useState(initialCpuPercent ?? 42)
    const [internalRamPercent, setInternalRamPercent] = React.useState(initialRamPercent ?? 67)
    const [internalStoragePercent, setInternalStoragePercent] = React.useState(initialStoragePercent ?? 54)
    const [internalNetConnected, setInternalNetConnected] = React.useState(initialNetConnected ?? true)
    const [internalNetSpeed, setInternalNetSpeed] = React.useState(initialNetSpeed ?? 12.5)
    const [internalBatteryPercent, setInternalBatteryPercent] = React.useState(initialBatteryPercent ?? 85)
    const [internalBatteryCharging, setInternalBatteryCharging] = React.useState(initialBatteryCharging ?? false)

    const cpuPercent = initialCpuPercent ?? internalCpuPercent
    const ramPercent = initialRamPercent ?? internalRamPercent
    const storagePercent = initialStoragePercent ?? internalStoragePercent
    const netConnected = initialNetConnected ?? internalNetConnected
    const netSpeed = initialNetSpeed ?? internalNetSpeed
    const batteryPercent = initialBatteryPercent ?? internalBatteryPercent
    const batteryCharging = initialBatteryCharging ?? internalBatteryCharging

    React.useEffect(() => {
      const hasInitialValues = initialCpuPercent !== undefined ||
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
    }, [updateInterval, initialCpuPercent, initialRamPercent, initialStoragePercent, initialNetConnected, initialNetSpeed, initialBatteryPercent, initialBatteryCharging])

    const getStatusClass = (percent: number): 'none' | 'warning' | 'critical' => {
      if (percent >= 90) return 'critical'
      if (percent >= 75) return 'warning'
      return 'none'
    }

    const getBatteryStatus = (percent: number, charging: boolean): 'none' | 'charging' | 'low' | 'critical' => {
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

    const ramUsed = (ramTotal * ramPercent / 100).toFixed(1)
    const storageUsed = (storageTotal * storagePercent / 100).toFixed(0)

    return (
      <div
        ref={ref}
        className={cn(systemMonitorVariants({ variant, size }), className)}
        data-state={dataAttr('monitoring')}
        {...props}
      >
        <div className="monitor-header">
          <div className="monitor-title">System</div>
        </div>

        <div className={cn(monitorItemVariants({ type: 'cpu', status: getStatusClass(cpuPercent) }))} data-state={dataAttr(getStatusClass(cpuPercent))}>
          <div className="monitor-item-header-row">
            <div className="monitor-item-label">CPU</div>
            <div className="monitor-item-value">{cpuPercent}%</div>
          </div>
          <div className="monitor-progress">
            {Array.from({ length: totalSegments }).map((_, index) => (
              <div
                key={index}
                className={cn(monitorSegmentVariants({ filled: index < cpuFilledSegments }))}
              />
            ))}
          </div>
        </div>

        <div className={cn(monitorItemVariants({ type: 'ram', status: getStatusClass(ramPercent) }))} data-state={dataAttr(getStatusClass(ramPercent))}>
          <div className="monitor-item-header-row">
            <div className="monitor-item-label">RAM</div>
            <div className="monitor-item-value">{ramPercent}%</div>
          </div>
          <div className="monitor-item-details">{ramUsed} / {ramTotal} GB</div>
          <div className="monitor-progress">
            {Array.from({ length: totalSegments }).map((_, index) => (
              <div
                key={index}
                className={cn(monitorSegmentVariants({ filled: index < ramFilledSegments }))}
              />
            ))}
          </div>
        </div>

        <div className={cn(monitorItemVariants({ type: 'storage', status: getStatusClass(storagePercent) }))} data-state={dataAttr(getStatusClass(storagePercent))}>
          <div className="monitor-item-header-row">
            <div className="monitor-item-label">Storage</div>
            <div className="monitor-item-value">{storagePercent}%</div>
          </div>
          <div className="monitor-item-details">{storageUsed} / {storageTotal} GB</div>
          <div className="monitor-progress">
            {Array.from({ length: totalSegments }).map((_, index) => (
              <div
                key={index}
                className={cn(monitorSegmentVariants({ filled: index < storageFilledSegments }))}
              />
            ))}
          </div>
        </div>

        <div className={cn(monitorItemVariants({ type: 'network', status: netConnected ? 'connected' : 'disconnected' }))} data-state={dataAttr(netConnected ? 'connected' : 'disconnected')}>
          <div className="monitor-item-header-row">
            <div className="monitor-item-label">NET</div>
            <div>
              <span className="monitor-item-value">{netSpeed} MB/s</span>
              <span className={`monitor-item-status ${netConnected ? 'connected' : 'disconnected'}`}>
                {netConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <div className="monitor-progress">
            {Array.from({ length: totalSegments }).map((_, index) => (
              <div
                key={index}
                className={cn(monitorSegmentVariants({ filled: index < netFilledSegments }))}
              />
            ))}
          </div>
        </div>

        <div className={cn(monitorItemVariants({ type: 'battery', status: getBatteryStatus(batteryPercent, batteryCharging) }))} data-state={dataAttr(getBatteryStatus(batteryPercent, batteryCharging))}>
          <div className="monitor-item-header-row">
            <div className="monitor-item-label">Battery</div>
            <div>
              <span className="monitor-item-value">{batteryPercent}%</span>
              <span className={`monitor-item-status ${batteryCharging ? 'charging' : 'discharging'}`}>
                {batteryCharging ? 'Charging' : 'Discharging'}
              </span>
            </div>
          </div>
          <div className="monitor-progress">
            {Array.from({ length: totalSegments }).map((_, index) => (
              <div
                key={index}
                className={cn(monitorSegmentVariants({ filled: index < batteryFilledSegments }))}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
)
SystemMonitor.displayName = 'SystemMonitor'

export { systemMonitorVariants, monitorItemVariants, monitorSegmentVariants }
export default SystemMonitor
