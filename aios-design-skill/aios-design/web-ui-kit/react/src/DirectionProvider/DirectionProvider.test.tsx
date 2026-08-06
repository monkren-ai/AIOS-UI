import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { DirectionProvider, useDirection } from './DirectionProvider'

function DirectionProbe() {
  const { dir, sign } = useDirection()
  return (
    <span data-testid="probe" data-dir={dir}>
      {sign}
    </span>
  )
}

afterEach(() => {
  cleanup()
  document.documentElement.removeAttribute('dir')
})

describe('DirectionProvider', () => {
  it('defaults to ltr when used without a provider', () => {
    render(<DirectionProbe />)
    expect(screen.getByTestId('probe')).toHaveAttribute('data-dir', 'ltr')
  })

  it('exposes the direction and its sign through context', () => {
    render(
      <DirectionProvider dir="rtl">
        <DirectionProbe />
      </DirectionProvider>,
    )
    const probe = screen.getByTestId('probe')
    expect(probe).toHaveAttribute('data-dir', 'rtl')
    expect(probe).toHaveTextContent('-1')
  })

  it('writes dir onto <html> so CSS logical properties resolve', () => {
    render(
      <DirectionProvider dir="rtl">
        <span />
      </DirectionProvider>,
    )
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
  })

  it('restores the previous document dir on unmount', () => {
    document.documentElement.setAttribute('dir', 'ltr')
    const { unmount } = render(
      <DirectionProvider dir="rtl">
        <span />
      </DirectionProvider>,
    )
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
    unmount()
    expect(document.documentElement).toHaveAttribute('dir', 'ltr')
  })

  it('leaves the document alone when syncDocument is off', () => {
    render(
      <DirectionProvider dir="rtl" syncDocument={false}>
        <DirectionProbe />
      </DirectionProvider>,
    )
    expect(document.documentElement).not.toHaveAttribute('dir')
    expect(screen.getByTestId('probe')).toHaveAttribute('data-dir', 'rtl')
  })
})
