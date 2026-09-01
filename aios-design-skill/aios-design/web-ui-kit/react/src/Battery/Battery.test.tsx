import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Battery, type BatteryDevice } from './Battery'

const devices: BatteryDevice[] = [{ name: 'Phone', type: 'phone', percent: 64 }]

describe('Battery', () => {
  it('renders an accessible segmented meter', () => {
    render(<Battery percent={50} totalSegments={10} data-testid="battery" />)
    const battery = screen.getByTestId('battery')
    expect(battery).toHaveAttribute('role', 'meter')
    expect(battery).toHaveAttribute('aria-valuenow', '50')
    expect(battery.querySelectorAll('[data-filled]')).toHaveLength(5)
  })
  it('renders the standalone ring variant', () => {
    render(<Battery variant="ring" percent={60} data-testid="battery" />)
    expect(screen.getByTestId('battery')).toHaveAttribute('data-variant', 'ring')
    expect(screen.getByText('60%')).toBeInTheDocument()
  })
  it('keeps the optional device list keyboard operable', () => {
    const onDeviceClick = vi.fn()
    render(<Battery percent={30} devices={devices} onDeviceClick={onDeviceClick} />)
    const row = screen.getByRole('button')
    fireEvent.keyDown(row, { key: 'Enter' })
    expect(onDeviceClick).toHaveBeenCalledWith(devices[0])
  })
})
