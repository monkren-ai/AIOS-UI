import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Battery, type BatteryDevice } from './Battery'

const DEVICES: BatteryDevice[] = [
  { name: 'Ear (2)', type: 'earbuds', percent: 64 },
  { name: 'Phone (3a)', type: 'phone', percent: 12, isCharging: true },
]

describe('Battery', () => {
  it('renders the segmented layout as an accessible meter', () => {
    render(<Battery percent={75} data-testid="battery" />)
    const battery = screen.getByTestId('battery')

    expect(battery).toHaveAttribute('data-slot', 'battery')
    expect(battery).toHaveAttribute('data-variant', 'segmented')
    expect(battery).toHaveAttribute('data-widget-mode', 'none')
    expect(battery).toHaveAttribute('role', 'meter')
    expect(battery).toHaveAttribute('aria-valuenow', '75')
    expect(battery.querySelector('[data-slot="battery-percent"]')).toHaveTextContent('75%')
    expect(battery.querySelector('[data-slot="battery-status"]')).toHaveTextContent('Discharging')
  })

  it('keeps the percentage on tabular numerals', () => {
    render(<Battery percent={75} data-testid="battery" />)
    expect(
      screen.getByTestId('battery').querySelector('[data-slot="battery-percent"]'),
    ).toHaveClass('tabular-nums')
  })

  it('derives the level from the percentage', () => {
    const cases = [
      [8, 'critical'],
      [18, 'low'],
      [40, 'medium'],
      [90, 'high'],
    ] as const

    cases.forEach(([percent, level]) => {
      const { unmount } = render(<Battery percent={percent} data-testid="battery" />)
      expect(screen.getByTestId('battery')).toHaveAttribute('data-state', level)
      unmount()
    })
  })

  it('fills the right number of segments', () => {
    render(<Battery percent={50} totalSegments={10} data-testid="battery" />)
    const battery = screen.getByTestId('battery')
    expect(battery.querySelectorAll('[data-slot="battery-segment"]')).toHaveLength(10)
    expect(battery.querySelectorAll('[data-slot="battery-segment"][data-filled]')).toHaveLength(5)
  })

  it('reports charging through data-charging on the status slot', () => {
    render(<Battery percent={40} isCharging data-testid="battery" />)
    const status = screen.getByTestId('battery').querySelector('[data-slot="battery-status"]')
    expect(status).toHaveTextContent('Charging')
    expect(status).toHaveAttribute('data-charging', '')
  })

  it('renders the ring variant with its arc', () => {
    render(<Battery variant="ring" percent={60} data-testid="battery" />)
    const battery = screen.getByTestId('battery')

    expect(battery).toHaveAttribute('data-variant', 'ring')
    expect(battery).toHaveAttribute('data-state', 'mid')
    expect(battery.querySelector('[data-slot="battery-ring-progress"]')).toBeInTheDocument()
    expect(battery.querySelector('[data-slot="battery-ring-percent"]')).toHaveTextContent('60%')
  })

  it('derives the ring status from the percentage', () => {
    const cases = [
      [20, 'low'],
      [60, 'mid'],
      [95, 'full'],
    ] as const

    cases.forEach(([percent, status]) => {
      const { unmount } = render(<Battery variant="ring" percent={percent} data-testid="battery" />)
      expect(screen.getByTestId('battery')).toHaveAttribute('data-state', status)
      unmount()
    })
  })

  it('renders the segmented widget card mode', () => {
    render(<Battery widgetMode="card" percent={30} data-testid="battery" />)
    const battery = screen.getByTestId('battery')

    expect(battery).toHaveAttribute('data-widget-mode', 'card')
    expect(battery.querySelector('[data-slot="battery-widget-percent"]')).toHaveTextContent('30%')
    expect(battery.querySelector('[data-slot="battery-widget-status"]')).toHaveTextContent(
      'Discharging',
    )
  })

  it('renders the ring widget card mode', () => {
    render(<Battery widgetMode="ring" percent={30} data-testid="battery" />)
    const battery = screen.getByTestId('battery')

    expect(battery).toHaveAttribute('data-widget-mode', 'ring')
    expect(battery.querySelector('[data-slot="battery-ring-svg"]')).toBeInTheDocument()
  })

  it('lists bluetooth devices in widget modes', () => {
    render(<Battery widgetMode="card" percent={30} devices={DEVICES} data-testid="battery" />)
    const battery = screen.getByTestId('battery')

    expect(battery.querySelectorAll('[data-slot="battery-device"]')).toHaveLength(2)
    expect(battery.querySelector('[data-slot="battery-device-name"]')).toHaveTextContent('Ear (2)')
    expect(battery.querySelectorAll('[data-slot="battery-device"]')[1]).toHaveAttribute(
      'data-state',
      'charging',
    )
  })

  it('calls onDeviceClick on click and keyboard activation', () => {
    const onDeviceClick = vi.fn()
    render(
      <Battery
        widgetMode="card"
        percent={30}
        devices={DEVICES}
        onDeviceClick={onDeviceClick}
        data-testid="battery"
      />,
    )
    const device = screen.getByTestId('battery').querySelector('[data-slot="battery-device"]')!

    expect(device).toHaveAttribute('role', 'button')
    fireEvent.click(device)
    expect(onDeviceClick).toHaveBeenCalledWith(DEVICES[0])

    fireEvent.keyDown(device, { key: 'Enter' })
    expect(onDeviceClick).toHaveBeenCalledTimes(2)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Battery percent={50} className="rounded-none" data-testid="battery" />)
    const battery = screen.getByTestId('battery')
    expect(battery).toHaveClass('rounded-none')
    expect(battery).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Battery ref={ref} percent={50} />)
    expect(ref.current).toHaveAttribute('data-slot', 'battery')
  })
})
