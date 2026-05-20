import { useState, useEffect } from 'react'
import '../styles/system-monitor.css'

interface SystemMonitorProps {
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

const SystemMonitor: React.FC<SystemMonitorProps> = ({
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
  batteryCharging: initialBatteryCharging
}) => {
  const [internalCpuPercent, setInternalCpuPercent] = useState(initialCpuPercent ?? 42)
  const [internalRamPercent, setInternalRamPercent] = useState(initialRamPercent ?? 67)
  const [internalStoragePercent, setInternalStoragePercent] = useState(initialStoragePercent ?? 54)
  const [internalNetConnected, setInternalNetConnected] = useState(initialNetConnected ?? true)
  const [internalNetSpeed, setInternalNetSpeed] = useState(initialNetSpeed ?? 12.5)
  const [internalBatteryPercent, setInternalBatteryPercent] = useState(initialBatteryPercent ?? 85)
  const [internalBatteryCharging, setInternalBatteryCharging] = useState(initialBatteryCharging ?? false)

  const cpuPercent = initialCpuPercent ?? internalCpuPercent
  const ramPercent = initialRamPercent ?? internalRamPercent
  const storagePercent = initialStoragePercent ?? internalStoragePercent
  const netConnected = initialNetConnected ?? internalNetConnected
  const netSpeed = initialNetSpeed ?? internalNetSpeed
  const batteryPercent = initialBatteryPercent ?? internalBatteryPercent
  const batteryCharging = initialBatteryCharging ?? internalBatteryCharging

  useEffect(() => {
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

  const getStatusClass = (percent: number) => {
    if (percent >= 90) return 'critical'
    if (percent >= 75) return 'warning'
    return ''
  }

  const getBatteryClass = (percent: number, charging: boolean) => {
    if (charging) return 'charging'
    if (percent <= 10) return 'critical'
    if (percent <= 20) return 'low'
    return ''
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
    <div className="nothing-system-monitor">
      <div className="monitor-header">
        <div className="monitor-title">System</div>
      </div>

      <div className={`monitor-item cpu ${getStatusClass(cpuPercent)}`}>
        <div className="monitor-item-header-row">
          <div className="monitor-item-label">CPU</div>
          <div className="monitor-item-value">{cpuPercent}%</div>
        </div>
        <div className="monitor-progress">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={`monitor-segment ${index < cpuFilledSegments ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={`monitor-item ram ${getStatusClass(ramPercent)}`}>
        <div className="monitor-item-header-row">
          <div className="monitor-item-label">RAM</div>
          <div className="monitor-item-value">{ramPercent}%</div>
        </div>
        <div className="monitor-item-details">{ramUsed} / {ramTotal} GB</div>
        <div className="monitor-progress">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={`monitor-segment ${index < ramFilledSegments ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={`monitor-item storage ${getStatusClass(storagePercent)}`}>
        <div className="monitor-item-header-row">
          <div className="monitor-item-label">Storage</div>
          <div className="monitor-item-value">{storagePercent}%</div>
        </div>
        <div className="monitor-item-details">{storageUsed} / {storageTotal} GB</div>
        <div className="monitor-progress">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={`monitor-segment ${index < storageFilledSegments ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="monitor-item network">
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
              className={`monitor-segment ${index < netFilledSegments ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={`monitor-item battery ${getBatteryClass(batteryPercent, batteryCharging)}`}>
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
              className={`monitor-segment ${index < batteryFilledSegments ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SystemMonitor
