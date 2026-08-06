import { SystemMonitor } from 'aios-ui-kit/system-monitor'

export default function SystemMonitorWarning() {
  return (
    <div className="w-full max-w-sm">
      <SystemMonitor
        cpuPercent={92}
        ramPercent={88}
        ramTotal={16}
        storagePercent={96}
        storageTotal={256}
        netConnected={false}
        netSpeed={0}
        batteryPercent={8}
        batteryCharging={false}
      />
    </div>
  )
}
