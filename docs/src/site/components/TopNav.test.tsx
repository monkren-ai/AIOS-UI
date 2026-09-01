import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { TopNav } from './TopNav'

const toggleTheme = vi.fn()

vi.mock('@/ThemeProvider', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme }),
}))

function renderNav() {
  const toggleLang = vi.fn()
  const context: ShowcaseContextValue = {
    lang: 'zh',
    t: (zh) => zh,
    toggleLang,
    preloadProjectIntro: vi.fn(),
    preloadAIPoc: vi.fn(),
    preloadShowcase: vi.fn(),
  }

  render(
    <MemoryRouter initialEntries={['/about']}>
      <ShowcaseProvider value={context}>
        <TopNav onOpenSearch={vi.fn()} />
      </ShowcaseProvider>
    </MemoryRouter>,
  )

  return { toggleLang }
}

describe('TopNav', () => {
  it('exposes About in the desktop navigation with the active state', () => {
    renderNav()
    expect(screen.queryByRole('link', { name: '项目' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '总览' })).not.toBeInTheDocument()
    const about = screen.getByRole('link', { name: '关于' })
    expect(about).toHaveAttribute('href', '/about')
    expect(about).toHaveAttribute('aria-current', 'page')
  })

  it('exposes the theme-family page separately from color mode', () => {
    renderNav()
    expect(screen.getByRole('link', { name: '主题' })).toHaveAttribute('href', '/themes')
    expect(screen.getByRole('button', { name: '切换明暗模式' })).toBeInTheDocument()
  })

  it('closes the mobile menu after selecting About', async () => {
    const user = userEvent.setup()
    renderNav()

    await user.click(screen.getByRole('button', { name: '切换导航' }))
    expect(screen.getAllByRole('link', { name: '关于' })).toHaveLength(2)

    await user.click(screen.getAllByRole('link', { name: '关于' })[1])
    expect(screen.getAllByRole('link', { name: '关于' })).toHaveLength(1)
  })

  it('keeps the language control wired', async () => {
    const user = userEvent.setup()
    const { toggleLang } = renderNav()

    await user.click(screen.getByRole('button', { name: '切换语言' }))
    expect(toggleLang).toHaveBeenCalledOnce()
  })
})
