import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, act } from '@testing-library/react'
import { AIOS_BUILTIN_THEMES, ThemeProvider, useTheme, DEFAULT_STORAGE_KEY } from './index'

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme, toggleTheme, themeId, setThemeId } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <span data-testid="theme-id">{themeId}</span>
      <button onClick={() => setTheme('light')}>light</button>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={() => setThemeId('aios-paper')}>paper</button>
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
  document.documentElement.removeAttribute('data-theme-id')
  document.documentElement.removeAttribute('style')
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

  it('switches theme families without changing color mode', () => {
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
    const before = screen.getByTestId('resolved').textContent
    act(() => screen.getByText('paper').click())
    expect(screen.getByTestId('theme-id')).toHaveTextContent('aios-paper')
    expect(screen.getByTestId('resolved')).toHaveTextContent(before ?? 'dark')
    expect(document.documentElement).toHaveAttribute('data-theme-id', 'aios-paper')
    expect(document.documentElement.style.getPropertyValue('--surface')).toBe(
      AIOS_BUILTIN_THEMES[1].modes.dark?.['color.surface.default'],
    )
  })

  // storageKey 曾经只存在于 ThemeScript 上，provider 这边写死 'aios-theme'，
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
