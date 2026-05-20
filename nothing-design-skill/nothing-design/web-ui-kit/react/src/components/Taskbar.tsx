import { useState, useEffect } from 'react'
import '../styles/taskbar.css'

interface TaskbarApp {
  name: string
  icon?: string
  onClick?: () => void
}

interface TaskbarProps {
  theme?: 'light' | 'dark'
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

const BatteryIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="13" x2="23" y2="11" />
    <rect x="4" y="9" width="10" height="6" rx="1" />
  </svg>
)

const DefaultAppIcon = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase()
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <text x="12" y="17" textAnchor="middle" fontSize="14" fontFamily="var(--font-body)" fill="currentColor">{initial}</text>
    </svg>
  )
}

const Taskbar: React.FC<TaskbarProps> = ({
  theme = 'dark',
  apps = [],
  showSearch = true,
  showTime = true,
  showBattery = true,
  fixed = false
}) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    if (!showTime) return
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [showTime])

  const classNames = [
    'nothing-taskbar',
    `nothing-taskbar--${theme}`,
    fixed ? 'nothing-taskbar--fixed' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames} role="toolbar" aria-label="Taskbar">
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
          <span className="nothing-taskbar__battery" aria-label="Battery">
            <BatteryIcon />
          </span>
        )}
        {showTime && (
          <span className="nothing-taskbar__time">{formatTime(time)}</span>
        )}
      </div>
    </div>
  )
}

export default Taskbar
