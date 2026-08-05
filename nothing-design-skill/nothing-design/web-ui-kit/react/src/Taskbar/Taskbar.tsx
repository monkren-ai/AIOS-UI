import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { useNow, useTelemetry } from '@/system/hooks'
import { cn, dataAttr } from '@/lib/utils'
import DotMatrixIcon from '../components/DotMatrixIcon'
import { componentIconSvg } from '../widgets/icon-svg-registry'
import {
  taskbarAppIconVariants,
  taskbarAppVariants,
  taskbarBatteryFillVariants,
  taskbarBatteryPercentVariants,
  taskbarBatteryVariants,
  taskbarSearchVariants,
  taskbarStartVariants,
  taskbarTimeVariants,
  taskbarTrayIconVariants,
  taskbarVariants,
} from './taskbar-variants'

export interface TaskbarApp {
  name: string
  icon?: string
  onClick?: () => void
}

export interface TaskbarProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'onClick'>,
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

const StartIcon = ({ variant }: { variant?: 'solid' | 'dot' }) => {
  if (variant === 'dot') {
    return (
      <DotMatrixIcon
        svg={componentIconSvg.startIcon}
        rows={16}
        cols={16}
        dotSize={2}
        gap={1}
        alphaThreshold={100}
        baseColor="var(--widget-white, #FCFAFE)"
        backgroundColor="transparent"
      />
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  )
}

const SearchIcon = ({ variant }: { variant?: 'solid' | 'dot' }) => {
  if (variant === 'dot') {
    return (
      <DotMatrixIcon
        svg={componentIconSvg.searchIcon}
        rows={16}
        cols={16}
        dotSize={2}
        gap={1}
        alphaThreshold={100}
        baseColor="var(--widget-white, #FCFAFE)"
        backgroundColor="transparent"
      />
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

const VolumeIcon = ({ variant }: { variant?: 'solid' | 'dot' }) => {
  if (variant === 'dot') {
    return (
      <DotMatrixIcon
        svg={componentIconSvg.volumeIcon}
        rows={16}
        cols={16}
        dotSize={2}
        gap={1}
        alphaThreshold={100}
        baseColor="var(--widget-white, #FCFAFE)"
        backgroundColor="transparent"
      />
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

const TaskbarBatteryIcon = ({ percent, charging }: { percent?: number; charging?: boolean }) => {
  // percent 0-100, fill 比例
  const fillW = Math.max(0, Math.min(100, percent ?? 0))
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-slot="taskbar-battery-icon"
      className="h-4 w-[22px] shrink-0"
    >
      <rect
        x="2"
        y="5"
        width="18"
        height="14"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="20" y="9" width="2" height="6" rx="1" fill="currentColor" />
      {percent !== undefined && (
        <rect
          x="5"
          y="8"
          width={12 * (fillW / 100)}
          height="8"
          rx="1"
          data-slot="taskbar-battery-fill"
          className={cn(taskbarBatteryFillVariants({ charging: Boolean(charging) }))}
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
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="14"
        fontFamily="var(--font-body)"
        fill="currentColor"
      >
        {initial}
      </text>
    </svg>
  )
}

export function Taskbar({
  className,
  theme = 'dark',
  apps = [],
  showSearch = true,
  showTime = true,
  showBattery = true,
  fixed = false,
  ref,
  ...props
}: TaskbarProps) {
  // useNow 替代裸 setInterval,自动暂停
  const time = useNow(1000)
  // 真实 battery 遥测
  const snap = useTelemetry()
  const batteryReal = snap.batteryReal
  const batteryPercent =
    batteryReal && snap.battery ? Math.round(snap.battery.level * 100) : undefined
  const batteryCharging = batteryReal && snap.battery ? snap.battery.charging : false

  return (
    <div
      ref={ref}
      className={cn(taskbarVariants({ theme, fixed }), className)}
      role="toolbar"
      aria-label="Taskbar"
      data-slot="taskbar"
      data-widget-theme={dataAttr(theme)}
      data-state={dataAttr(fixed ? 'fixed' : 'inline')}
      data-battery={dataAttr(batteryReal)}
      data-battery-percent={dataAttr(batteryPercent)}
      data-battery-charging={dataAttr(batteryCharging)}
      data-time-real={dataAttr(true)}
      {...props}
    >
      <div data-slot="taskbar-left" className="flex shrink-0 items-center gap-4">
        <button
          data-slot="taskbar-start"
          className={cn(taskbarStartVariants({ theme }))}
          type="button"
          aria-label="Start"
        >
          <StartIcon />
        </button>
        {showSearch && (
          <button
            data-slot="taskbar-search"
            className={cn(taskbarSearchVariants({ theme }))}
            type="button"
            aria-label="Search"
          >
            <span
              data-slot="taskbar-search-icon"
              className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-full [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:2]"
            >
              <SearchIcon />
            </span>
            <span data-slot="taskbar-search-text" className="truncate">
              Search
            </span>
          </button>
        )}
      </div>

      <div
        data-slot="taskbar-center"
        className="flex flex-1 items-center justify-center gap-1 overflow-x-auto px-2 md:gap-2 md:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {apps.map((app, index) => (
          <button
            key={index}
            data-slot="taskbar-app"
            className={cn(taskbarAppVariants({ theme }))}
            type="button"
            aria-label={app.name}
            title={app.name}
            onClick={app.onClick}
            data-state={dataAttr('app')}
          >
            <span data-slot="taskbar-app-icon" className={cn(taskbarAppIconVariants({ theme }))}>
              {app.icon ? (
                <img src={app.icon} alt={app.name} draggable={false} />
              ) : (
                <DefaultAppIcon name={app.name} />
              )}
            </span>
          </button>
        ))}
      </div>

      <div data-slot="taskbar-right" className="flex shrink-0 items-center gap-2 md:gap-4">
        <span
          data-slot="taskbar-tray-icon"
          className={cn(taskbarTrayIconVariants({ theme }))}
          aria-label="Volume"
        >
          <VolumeIcon />
        </span>
        {showBattery && (
          <span
            data-slot="taskbar-battery"
            className={cn(taskbarBatteryVariants({ theme, real: batteryReal }))}
            data-real={dataAttr(batteryReal)}
            data-state={dataAttr(batteryReal ? 'real' : 'simulated')}
            aria-label={`Battery ${batteryPercent ?? 0}%`}
          >
            <TaskbarBatteryIcon percent={batteryPercent} charging={batteryCharging} />
            {batteryPercent !== undefined && (
              <span
                data-slot="taskbar-battery-percent"
                className={cn(taskbarBatteryPercentVariants())}
              >
                {batteryPercent}%
              </span>
            )}
          </span>
        )}
        {showTime && (
          <span data-slot="taskbar-time" className={cn(taskbarTimeVariants({ theme }))}>
            {formatTime(time)}
          </span>
        )}
      </div>
    </div>
  )
}

Taskbar.displayName = 'Taskbar'

export { taskbarVariants }
export default Taskbar
