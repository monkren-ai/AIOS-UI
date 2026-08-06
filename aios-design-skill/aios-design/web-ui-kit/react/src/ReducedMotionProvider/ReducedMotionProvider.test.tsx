import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { ReducedMotionProvider, useReducedMotion } from './ReducedMotionProvider'

function MotionProbe() {
  const reducedMotion = useReducedMotion()
  return <span data-testid="probe">{String(reducedMotion)}</span>
}

/** jsdom 没有 matchMedia，得自己造一个能报告指定偏好的替身。 */
function stubMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const mql = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
      listeners.delete(listener),
  }
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mql),
  )
  return mql
}

beforeEach(() => {
  stubMatchMedia(false)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  document.documentElement.removeAttribute('data-reduced-motion')
})

describe('ReducedMotionProvider', () => {
  it('reports false when the user has expressed no preference', () => {
    render(
      <ReducedMotionProvider>
        <MotionProbe />
      </ReducedMotionProvider>,
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('false')
    expect(document.documentElement).not.toHaveAttribute('data-reduced-motion')
  })

  it('picks up the system preference', () => {
    stubMatchMedia(true)
    render(
      <ReducedMotionProvider>
        <MotionProbe />
      </ReducedMotionProvider>,
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('true')
    expect(document.documentElement).toHaveAttribute('data-reduced-motion')
  })

  it('lets force override the system preference in both directions', () => {
    const { unmount } = render(
      <ReducedMotionProvider force>
        <MotionProbe />
      </ReducedMotionProvider>,
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('true')
    unmount()

    stubMatchMedia(true)
    render(
      <ReducedMotionProvider force={false}>
        <MotionProbe />
      </ReducedMotionProvider>,
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('false')
  })

  it('is safe to call the hook without a provider', () => {
    render(<MotionProbe />)
    expect(screen.getByTestId('probe')).toHaveTextContent('false')
  })

  it('still honours the system preference without a provider', () => {
    stubMatchMedia(true)
    render(<MotionProbe />)
    expect(screen.getByTestId('probe')).toHaveTextContent('true')
  })

  it('falls back to no-preference when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    render(<MotionProbe />)
    expect(screen.getByTestId('probe')).toHaveTextContent('false')
  })
})
