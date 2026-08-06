import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemMonitor } from './SystemMonitor'

const CONTROLLED = {
  cpuPercent: 42,
  ramPercent: 67,
  storagePercent: 54,
  netConnected: true,
  netSpeed: 12.5,
  batteryPercent: 85,
  batteryCharging: false,
} as const

const item = (type: string) =>
  document.querySelector<HTMLElement>(`[data-slot="monitor-item"][data-type="${type}"]`)!

describe('SystemMonitor', () => {
  it('renders all five metrics with their own slots', () => {
    render(<SystemMonitor {...CONTROLLED} data-testid="monitor" />)
    const monitor = screen.getByTestId('monitor')

    expect(monitor).toHaveAttribute('data-slot', 'system-monitor')
    expect(monitor).toHaveAttribute('data-state', 'monitoring')
    expect(monitor.querySelector('[data-slot="monitor-title"]')).toHaveTextContent('System')
    expect(monitor.querySelectorAll('[data-slot="monitor-item"]')).toHaveLength(5)
    ;['cpu', 'ram', 'storage', 'network', 'battery'].forEach((type) => {
      expect(item(type)).toBeInTheDocument()
    })
  })

  it('keeps the readouts on tabular numerals', () => {
    render(<SystemMonitor {...CONTROLLED} />)
    expect(item('cpu').querySelector('[data-slot="monitor-item-value"]')).toHaveClass(
      'tabular-nums',
    )
  })

  it('escalates a metric to warning and critical', () => {
    render(<SystemMonitor {...CONTROLLED} cpuPercent={80} ramPercent={95} />)
    expect(item('cpu')).toHaveAttribute('data-state', 'warning')
    expect(item('ram')).toHaveAttribute('data-state', 'critical')
  })

  it('stays at none below the warning threshold', () => {
    render(<SystemMonitor {...CONTROLLED} cpuPercent={20} />)
    expect(item('cpu')).toHaveAttribute('data-state', 'none')
  })

  it('reports network connectivity', () => {
    const { unmount } = render(<SystemMonitor {...CONTROLLED} netConnected />)
    expect(item('network')).toHaveAttribute('data-state', 'connected')
    expect(item('network').querySelector('[data-slot="monitor-item-status"]')).toHaveTextContent(
      'Connected',
    )
    unmount()

    render(<SystemMonitor {...CONTROLLED} netConnected={false} />)
    expect(item('network')).toHaveAttribute('data-state', 'disconnected')
  })

  it('reports battery charging and low states', () => {
    const { unmount } = render(<SystemMonitor {...CONTROLLED} batteryCharging />)
    expect(item('battery')).toHaveAttribute('data-state', 'charging')
    unmount()

    render(<SystemMonitor {...CONTROLLED} batteryPercent={15} />)
    expect(item('battery')).toHaveAttribute('data-state', 'low')
  })

  it('fills the right number of segments per metric', () => {
    render(<SystemMonitor {...CONTROLLED} cpuPercent={50} totalSegments={10} />)
    expect(item('cpu').querySelectorAll('[data-slot="monitor-segment"]')).toHaveLength(10)
    expect(item('cpu').querySelectorAll('[data-slot="monitor-segment"][data-filled]')).toHaveLength(
      5,
    )
  })

  it('shows the used/total detail line for RAM and storage', () => {
    render(<SystemMonitor {...CONTROLLED} ramTotal={16} storageTotal={512} />)
    expect(item('ram').querySelector('[data-slot="monitor-item-details"]')).toHaveTextContent(
      '10.7 / 16 GB',
    )
    expect(item('storage').querySelector('[data-slot="monitor-item-details"]')).toHaveTextContent(
      '276 / 512 GB',
    )
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<SystemMonitor {...CONTROLLED} className="rounded-none" data-testid="monitor" />)
    const monitor = screen.getByTestId('monitor')
    expect(monitor).toHaveClass('rounded-none')
    expect(monitor).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<SystemMonitor {...CONTROLLED} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
