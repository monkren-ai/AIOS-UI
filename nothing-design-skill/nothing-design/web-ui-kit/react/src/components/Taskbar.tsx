import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useNow, useTelemetry } from '../system/hooks'
import { cn, dataAttr } from '../lib/utils'
import '../styles/taskbar.css'

const taskbarVariants = cva('nothing-taskbar', {
  variants: {
    theme: {
      light: 'nothing-taskbar--light',
      dark: 'nothing-taskbar--dark',
    },
    fixed: { true: 'nothing-taskbar--fixed', false: '' },
  },
  defaultVariants: { theme: 'dark', fixed: false },
})

export interface TaskbarApp {
  name: string
  icon?: string
  onClick?: () => void
}

export interface TaskbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'>,
    Omit<VariantProps<typeof taskbarVariants>, 'fixed'> {
  apps?: TaskbarApp[]
  showSearch?: boolean
  showTime?: boolean
  showBattery?: boolean
  fixed?: boolean
}

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const StartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const VolumeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)

const TaskbarBatteryIcon = ({ percent, charging }: { percent?: number; charging?: boolean }) => {
  // percent 0-100, fill 比例
  const fillW = Math.max(0, Math.min(100, percent ?? 0))
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nothing-taskbar__battery-svg">
      <rect x="2" y="5" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="20" y="9" width="2" height="6" rx="1" fill="currentColor" />
      {percent !== undefined && (
        <rect
          x="5"
          y="8"
          width={12 * (fillW / 100)}
          height="8"
          rx="1"
          fill="currentColor"
          data-charging={dataAttr(charging)}
        />
      )}
    </svg>
  )
}

const DefaultAppIcon = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase()
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <text x="12" y="17" textAnchor="middle" fontSize="14" fontFamily="var(--font-body)" fill="currentColor">{initial}</text>
    </svg>
  )
}

export const Taskbar = React.forwardRef<HTMLDivElement, TaskbarProps>(
  ({ className, theme = 'dark', apps = [], showSearch = true, showTime = true, showBattery = true, fixed = false, ...props }, ref) => {
    // useNow 替代裸 setInterval,自动暂停
    const time = useNow(1000)
    // 真实 battery 遥测
    const snap = useTelemetry()
    const batteryReal = snap.batteryReal
    const batteryPercent = batteryReal && snap.battery ? Math.round(snap.battery.level * 100) : undefined
    const batteryCharging = batteryReal && snap.battery ? snap.battery.charging : false

    return (
      <div
        ref={ref}
        className={cn(taskbarVariants({ theme, fixed }), className)}
        role="toolbar"
        aria-label="Taskbar"
        data-state={dataAttr(fixed ? 'fixed' : 'inline')}
        data-battery={dataAttr(batteryReal)}
        data-battery-percent={dataAttr(batteryPercent)}
        data-battery-charging={dataAttr(batteryCharging)}
        data-time-real={dataAttr(true)}
        {...props}
      >
        <div className="nothing-taskbar__left">
          <button className="nothing-taskbar__start" type="button" aria-label="Start">
            <StartIcon />
          </button>
          {showSearch && (
            <button className="nothing-taskbar__search" type="button" aria-label="Search">
              <span className="nothing-taskbar__search-icon">
                <SearchIcon />
              </span>
              <span className="nothing-taskbar__search-text">Search</span>
            </button>
          )}
        </div>

        <div className="nothing-taskbar__center">
          {apps.map((app, index) => (
            <button
              key={index}
              className="nothing-taskbar__app"
              type="button"
              aria-label={app.name}
              title={app.name}
              onClick={app.onClick}
              data-state={dataAttr('app')}
            >
              <span className="nothing-taskbar__app-icon">
                {app.icon ? (
                  <img src={app.icon} alt={app.name} draggable={false} />
                ) : (
                  <DefaultAppIcon name={app.name} />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="nothing-taskbar__right">
          <span className="nothing-taskbar__tray-icon" aria-label="Volume">
            <VolumeIcon />
          </span>
          {showBattery && (
            <span className="nothing-taskbar__battery" aria-label={`Battery ${batteryPercent ?? 0}%`}>
              <TaskbarBatteryIcon percent={batteryPercent} charging={batteryCharging} />
              {batteryPercent !== undefined && (
                <span className="nothing-taskbar__battery-percent">{batteryPercent}%</span>
              )}
            </span>
          )}
          {showTime && (
            <span className="nothing-taskbar__time">{formatTime(time)}</span>
          )}
        </div>
      </div>
    )
  }
)
Taskbar.displayName = 'Taskbar'

export { taskbarVariants }
export default Taskbar
