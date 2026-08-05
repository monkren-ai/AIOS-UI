import { SystemMonitor } from 'nothing-ui/system-monitor'

export default function SystemMonitorDefault() {
  return (
    <div className="w-full max-w-sm">
      <SystemMonitor
        cpuPercent={38}
        ramPercent={54}
        ramTotal={16}
        storagePercent={61}
        storageTotal={512}
        netConnected
        netSpeed={14.2}
        batteryPercent={82}
        batteryCharging={false}
      />
    </div>
  )
}
