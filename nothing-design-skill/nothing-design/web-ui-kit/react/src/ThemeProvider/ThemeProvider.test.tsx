import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, act } from '@testing-library/react'
import { ThemeProvider, useTheme, DEFAULT_STORAGE_KEY } from './index'

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('light')}>light</button>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}

/** jsdom 没有 matchMedia，造一个能报告指定 prefers-color-scheme 的替身。 */
function stubMatchMedia(prefersDark: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: prefersDark,
      media: '(prefers-color-scheme: dark)',
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  )
}

beforeEach(() => {
  stubMatchMedia(true)
  window.localStorage.clear()
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('ThemeProvider', () => {
  it('applies the default theme to data-theme on the root element', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('restores the persisted choice on mount', () => {
    window.localStorage.setItem(DEFAULT_STORAGE_KEY, 'light')
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('ignores a corrupted stored value instead of applying it', () => {
    window.localStorage.setItem(DEFAULT_STORAGE_KEY, 'chartreuse')
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeProbe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('persists a change back to storage', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )
    act(() => screen.getByText('light').click())
    expect(window.localStorage.getItem(DEFAULT_STORAGE_KEY)).toBe('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('resolves system to the media query result', () => {
    stubMatchMedia(false)
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeProbe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('system')
    expect(screen.getByTestId('resolved')).toHaveTextContent('light')
  })

  it('lets forcedTheme win over both the stored value and the system preference', () => {
    window.localStorage.setItem(DEFAULT_STORAGE_KEY, 'light')
    render(
      <ThemeProvider forcedTheme="dark">
        <ThemeProbe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  // storageKey 曾经只存在于 ThemeScript 上，provider 这边写死 'nothing-theme'，
  // 两者一旦不一致就会闪一下错误主题。这两条守住它现在是真的可配。
  describe('storageKey', () => {
    it('reads the initial theme from the custom key', () => {
      window.localStorage.setItem('my-app-theme', 'light')
      render(
        <ThemeProvider storageKey="my-app-theme">
          <ThemeProbe />
        </ThemeProvider>,
      )
      expect(screen.getByTestId('theme')).toHaveTextContent('light')
    })

    it('writes to the custom key and leaves the default one untouched', () => {
      render(
        <ThemeProvider storageKey="my-app-theme">
          <ThemeProbe />
        </ThemeProvider>,
      )
      act(() => screen.getByText('light').click())
      expect(window.localStorage.getItem('my-app-theme')).toBe('light')
      expect(window.localStorage.getItem(DEFAULT_STORAGE_KEY)).toBeNull()
    })
  })
})
