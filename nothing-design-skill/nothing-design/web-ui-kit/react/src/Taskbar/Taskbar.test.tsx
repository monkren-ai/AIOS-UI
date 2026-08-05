import * as React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Taskbar } from './Taskbar'

// 只替换 useTelemetry：jsdom 里没有 Battery API，充电态无法从真实遥测走出来
const telemetry = vi.hoisted(() => ({
  snapshot: { battery: null as { level: number; charging: boolean } | null, batteryReal: false },
}))

vi.mock('@/system/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/system/hooks')>()
  return { ...actual, useTelemetry: () => telemetry.snapshot }
})

describe('Taskbar', () => {
  beforeEach(() => {
    telemetry.snapshot = { battery: null, batteryReal: false }
  })

  it('renders as a toolbar with the three regions', () => {
    render(<Taskbar data-testid="taskbar" />)
    const taskbar = screen.getByTestId('taskbar')

    expect(taskbar).toHaveAttribute('data-slot', 'taskbar')
    expect(taskbar).toHaveAttribute('role', 'toolbar')
    expect(taskbar).toHaveAttribute('aria-label', 'Taskbar')
    expect(taskbar).toHaveAttribute('data-state', 'inline')
    expect(taskbar.querySelector('[data-slot="taskbar-left"]')).toBeInTheDocument()
    expect(taskbar.querySelector('[data-slot="taskbar-center"]')).toBeInTheDocument()
    expect(taskbar.querySelector('[data-slot="taskbar-right"]')).toBeInTheDocument()
  })

  it('switches to the fixed state', () => {
    render(<Taskbar fixed data-testid="taskbar" />)
    expect(screen.getByTestId('taskbar')).toHaveAttribute('data-state', 'fixed')
  })

  it('renders the start button and search by default', () => {
    render(<Taskbar data-testid="taskbar" />)
    expect(screen.getByLabelText('Start')).toHaveAttribute('data-slot', 'taskbar-start')
    expect(screen.getByLabelText('Search')).toHaveAttribute('data-slot', 'taskbar-search')
  })

  it('hides search, battery and time when asked', () => {
    render(
      <Taskbar showSearch={false} showBattery={false} showTime={false} data-testid="taskbar" />,
    )
    const taskbar = screen.getByTestId('taskbar')

    expect(taskbar.querySelector('[data-slot="taskbar-search"]')).toBeNull()
    expect(taskbar.querySelector('[data-slot="taskbar-battery"]')).toBeNull()
    expect(taskbar.querySelector('[data-slot="taskbar-time"]')).toBeNull()
  })

  it('renders one button per app and calls its handler', () => {
    const onClick = vi.fn()
    render(<Taskbar apps={[{ name: 'Files', onClick }, { name: 'Mail' }]} data-testid="taskbar" />)
    const taskbar = screen.getByTestId('taskbar')

    expect(taskbar.querySelectorAll('[data-slot="taskbar-app"]')).toHaveLength(2)
    fireEvent.click(screen.getByLabelText('Files'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('keeps the clock on tabular numerals', () => {
    render(<Taskbar data-testid="taskbar" />)
    expect(screen.getByTestId('taskbar').querySelector('[data-slot="taskbar-time"]')).toHaveClass(
      'tabular-nums',
    )
  })

  it('keeps the widget palette out of the global data-theme attribute', () => {
    render(<Taskbar theme="light" data-testid="taskbar" />)
    const taskbar = screen.getByTestId('taskbar')
    expect(taskbar).toHaveAttribute('data-widget-theme', 'light')
    expect(taskbar).not.toHaveAttribute('data-theme')
  })

  it('dims the tray battery while telemetry is simulated', () => {
    render(<Taskbar data-testid="taskbar" />)
    const battery = screen.getByTestId('taskbar').querySelector('[data-slot="taskbar-battery"]')

    expect(battery).toHaveAttribute('data-state', 'simulated')
    expect(battery).not.toHaveAttribute('data-real')
    expect(battery).toHaveClass('opacity-40')
  })

  it('undims the tray battery once telemetry is real', () => {
    telemetry.snapshot = { battery: { level: 0.62, charging: false }, batteryReal: true }
    render(<Taskbar data-testid="taskbar" />)
    const taskbar = screen.getByTestId('taskbar')
    const battery = taskbar.querySelector('[data-slot="taskbar-battery"]')

    expect(battery).toHaveAttribute('data-state', 'real')
    expect(battery).toHaveAttribute('data-real', '')
    expect(battery).not.toHaveClass('opacity-40')
    expect(taskbar.querySelector('[data-slot="taskbar-battery-percent"]')).toHaveTextContent('62%')
  })

  it('paints the battery fill with the accent only while charging', () => {
    telemetry.snapshot = { battery: { level: 0.4, charging: false }, batteryReal: true }
    const { unmount } = render(<Taskbar data-testid="taskbar" />)
    const idle = screen
      .getByTestId('taskbar')
      .querySelector('[data-slot="taskbar-battery-fill"]') as SVGRectElement

    expect(idle).not.toHaveAttribute('data-charging')
    expect(idle).toHaveClass('fill-current')
    expect(idle).not.toHaveClass('fill-accent')
    unmount()

    telemetry.snapshot = { battery: { level: 0.4, charging: true }, batteryReal: true }
    render(<Taskbar data-testid="taskbar" />)
    const charging = screen
      .getByTestId('taskbar')
      .querySelector('[data-slot="taskbar-battery-fill"]') as SVGRectElement

    expect(charging).toHaveAttribute('data-charging', '')
    expect(charging).toHaveClass('fill-accent')
    expect(charging).not.toHaveClass('fill-current')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Taskbar className="rounded-none" data-testid="taskbar" />)
    const taskbar = screen.getByTestId('taskbar')
    expect(taskbar).toHaveClass('rounded-none')
    expect(taskbar).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Taskbar ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
