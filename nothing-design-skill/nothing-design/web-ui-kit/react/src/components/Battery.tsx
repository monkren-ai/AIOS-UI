import { useState, useEffect, useMemo } from 'react'
import { withWidgetCard } from './widgets/withWidgetCard'
import '../styles/battery.css'

export interface BatteryDevice {
  name: string;
  type: 'mouse' | 'keyboard' | 'earbuds' | 'phone' | 'watch';
  percent: number;
  isCharging?: boolean;
}

interface BatteryProps {
  updateInterval?: number
  totalSegments?: number
  percent?: number
  isCharging?: boolean
  variant?: 'segmented' | 'ring'
  theme?: 'light' | 'dark'
  widgetMode?: 'card' | 'ring'
  devices?: BatteryDevice[]
  onDeviceClick?: (device: BatteryDevice) => void
}

const CIRCUMFERENCE = 2 * Math.PI * 95

const BatteryIcon = ({ percent, isCharging }: { percent: number; isCharging: boolean }) => {
  if (isCharging) {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (percent <= 30) {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="20" y="10" width="2" height="6" rx="1" fill="currentColor" />
        <rect x="6" y="12" width="4" height="4" rx="1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="10" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="6" y="10" width="8" height="6" rx="1" fill="currentColor" />
    </svg>
  )
}

const DeviceTypeIcon: React.FC<{ type: BatteryDevice['type'] }> = ({ type }) => {
  switch (type) {
    case 'mouse':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="2" width="12" height="20" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="12" y2="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case 'keyboard':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="6" width="22" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="5" y1="10" x2="7" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'earbuds':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 11v5a4 4 0 0 0 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17 11v5a4 4 0 0 1-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'watch':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 2h6l-1 4H10L9 2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 22h6l-1-4H10L9 22z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
  }
}

const SmallBatteryIcon: React.FC<{ percent: number }> = ({ percent }) => {
  const fillWidth = Math.max(1, Math.round((percent / 100) * 8))
  return (
    <svg viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg" className="nothing-battery__device-battery-icon">
      <rect x="0.5" y="0.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="14" y="3" width="2" height="4" rx="0.5" fill="currentColor" />
      <rect x="2" y="2" width={fillWidth} height="6" rx="0.5" fill="currentColor" />
    </svg>
  )
}

const ChargingIcon = () => (
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" className="nothing-battery__device-charging-icon">
    <path d="M7 1L2 7h4l-1 4 5-6H6l1-4z" fill="currentColor" />
  </svg>
)

const DeviceList: React.FC<{
  devices: BatteryDevice[]
  onDeviceClick?: (device: BatteryDevice) => void
}> = ({ devices, onDeviceClick }) => (
  <div className="nothing-battery__devices">
    {devices.map((device, idx) => (
      <div
        key={idx}
        className={[
          'nothing-battery__device',
          onDeviceClick ? 'nothing-battery__device--clickable' : ''
        ].filter(Boolean).join(' ')}
        onClick={onDeviceClick ? () => onDeviceClick(device) : undefined}
        role={onDeviceClick ? 'button' : undefined}
        tabIndex={onDeviceClick ? 0 : undefined}
        onKeyDown={onDeviceClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onDeviceClick(device)
          }
        } : undefined}
      >
        <div className="nothing-battery__device-icon">
          <DeviceTypeIcon type={device.type} />
        </div>
        <div className="nothing-battery__device-name">{device.name}</div>
        <div className="nothing-battery__device-level">
          {device.isCharging && <ChargingIcon />}
          <span className="nothing-battery__device-percent">{device.percent}%</span>
          <SmallBatteryIcon percent={device.percent} />
        </div>
      </div>
    ))}
  </div>
)

const Battery: React.FC<BatteryProps> = ({
  updateInterval = 5000,
  totalSegments = 10,
  percent: initialPercent,
  isCharging: initialIsCharging,
  variant = 'segmented',
  theme = 'dark',
  widgetMode,
  devices,
  onDeviceClick
}) => {
  const [internalPercent, setInternalPercent] = useState(initialPercent ?? 75)
  const [internalIsCharging, setInternalIsCharging] = useState(initialIsCharging ?? false)

  const percent = initialPercent ?? internalPercent
  const isCharging = initialIsCharging ?? internalIsCharging

  useEffect(() => {
    if (initialPercent !== undefined || initialIsCharging !== undefined) {
      return
    }

    const updateBattery = async () => {
      try {
        if ('getBattery' in navigator) {
          const battery = await navigator.getBattery()
          setInternalPercent(Math.round(battery.level * 100))
          setInternalIsCharging(battery.charging)
        }
      } catch {
        const demoPercent = 75
        const demoCharging = Math.random() > 0.5
        setInternalPercent(demoPercent)
        setInternalIsCharging(demoCharging)
      }
    }

    updateBattery()
    const timer = setInterval(updateBattery, updateInterval)

    return () => clearInterval(timer)
  }, [updateInterval, initialPercent, initialIsCharging])

  const ringStatusClass = useMemo(() => {
    if (isCharging) return 'charging'
    if (percent <= 30) return 'low'
    if (percent <= 80) return 'mid'
    return 'full'
  }, [percent, isCharging])

  const ringDashOffset = useMemo(() => {
    return CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE
  }, [percent])

  const filledSegments = Math.round((percent / 100) * totalSegments)

  let batteryClass = 'high'
  if (isCharging) {
    batteryClass = 'charging'
  } else if (percent <= 10) {
    batteryClass = 'critical'
  } else if (percent <= 20) {
    batteryClass = 'low'
  } else if (percent <= 50) {
    batteryClass = 'medium'
  }

  // --- Widget Card mode (segmented) ---
  if (widgetMode === 'card') {
    return (
      <div
        className={`nothing-battery nothing-battery--widget-card ${batteryClass}`}
        role="meter"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Battery at ${percent}%, ${isCharging ? 'charging' : 'discharging'}`}
      >
        <div className="nothing-battery__widget-percent">{percent}%</div>
        <div className={`nothing-battery__widget-status ${isCharging ? 'charging' : 'discharging'}`}>
          {isCharging ? 'Charging' : 'Discharging'}
        </div>
        <div className="nothing-battery__progress">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={`nothing-battery__segment ${index < filledSegments ? 'nothing-battery__segment--filled' : ''}`}
            />
          ))}
        </div>
        {devices && devices.length > 0 && (
          <DeviceList devices={devices} onDeviceClick={onDeviceClick} />
        )}
      </div>
    )
  }

  // --- Widget Ring mode ---
  if (widgetMode === 'ring') {
    return (
      <div
        className={`nothing-battery-ring nothing-battery-ring--${theme} nothing-battery-ring--widget-card ${ringStatusClass}`}
        role="meter"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Battery at ${percent}%, ${isCharging ? 'charging' : 'discharging'}`}
      >
        <svg className="nothing-battery-ring__svg" viewBox="0 0 200 200">
          <circle className="nothing-battery-ring__outer" cx="100" cy="100" r="95" />
          <circle className="nothing-battery-ring__inner" cx="100" cy="100" r="85" />
          <circle
            className="nothing-battery-ring__progress"
            cx="100"
            cy="100"
            r="95"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={ringDashOffset}
          />
        </svg>
        <div className="nothing-battery-ring__content">
          <div className="nothing-battery-ring__icon">
            <BatteryIcon percent={percent} isCharging={isCharging} />
          </div>
          <div className="nothing-battery-ring__percent">{percent}%</div>
        </div>
        {devices && devices.length > 0 && (
          <DeviceList devices={devices} onDeviceClick={onDeviceClick} />
        )}
      </div>
    )
  }

  // --- Original ring variant (no widgetMode) ---
  if (variant === 'ring') {
    return (
      <div className={`nothing-battery-ring nothing-battery-ring--${theme} ${ringStatusClass}`}>
        <svg className="nothing-battery-ring__svg" viewBox="0 0 200 200">
          <circle className="nothing-battery-ring__outer" cx="100" cy="100" r="95" />
          <circle className="nothing-battery-ring__inner" cx="100" cy="100" r="85" />
          <circle
            className="nothing-battery-ring__progress"
            cx="100"
            cy="100"
            r="95"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={ringDashOffset}
          />
        </svg>
        <div className="nothing-battery-ring__content">
          <div className="nothing-battery-ring__icon">
            <BatteryIcon percent={percent} isCharging={isCharging} />
          </div>
          <div className="nothing-battery-ring__percent">{percent}%</div>
        </div>
      </div>
    )
  }

  // --- Original segmented variant (no widgetMode) ---
  return (
    <div
      className={`nothing-battery ${batteryClass}`}
      role="meter"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Battery at ${percent}%, ${isCharging ? 'charging' : 'discharging'}`}
    >
      <div className="nothing-battery__header">
        <div className="nothing-battery__percent">{percent}%</div>
        <div className={`nothing-battery__status ${isCharging ? 'charging' : 'discharging'}`}>
          {isCharging ? 'Charging' : 'Discharging'}
        </div>
      </div>
      <div className="nothing-battery__progress">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div
            key={index}
            className={`nothing-battery__segment ${index < filledSegments ? 'nothing-battery__segment--filled' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default withWidgetCard(Battery)
