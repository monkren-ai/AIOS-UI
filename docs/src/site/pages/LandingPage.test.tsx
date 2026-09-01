import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { CATEGORIES } from '../registry/categories'
import { COMPONENT_MANIFEST } from '../registry'
import { LandingPage } from './LandingPage'

function renderPage(lang: 'zh' | 'en' = 'zh') {
  const context: ShowcaseContextValue = {
    lang,
    t: (zh, en) => (lang === 'zh' ? zh : en),
    toggleLang: vi.fn(),
    preloadProjectIntro: vi.fn(),
    preloadAIPoc: vi.fn(),
    preloadShowcase: vi.fn(),
  }

  return render(
    <MemoryRouter>
      <ShowcaseProvider value={context}>
        <LandingPage />
      </ShowcaseProvider>
    </MemoryRouter>,
  )
}

describe('LandingPage', () => {
  it('renders the stable bilingual value proposition and primary routes', () => {
    renderPage('zh')

    expect(
      screen.getByRole('heading', { level: 1, name: /为 AI Agent 构建界面.*更快，也更清晰/ }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '安装指南' })).toHaveAttribute(
      'href',
      '/docs/installation',
    )
    expect(screen.getByRole('link', { name: '浏览组件' })).toHaveAttribute(
      'href',
      '/components',
    )
  })

  it('derives its proof numbers from the registries', () => {
    renderPage('en')

    const stats = screen.getByLabelText('Library statistics')
    expect(within(stats).getByText(String(COMPONENT_MANIFEST.length))).toBeInTheDocument()
    expect(within(stats).getByText(String(CATEGORIES.length))).toBeInTheDocument()
    expect(within(stats).getByText('complete themes')).toBeInTheDocument()
  })

  it('shows a curated component gallery without waitlist capture', () => {
    renderPage('en')

    const main = screen.getByRole('main')
    expect(within(main).getAllByRole('article')).toHaveLength(6)
    expect(screen.getByRole('heading', { name: 'Real states for every step an agent takes' })).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /email/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Get Access')).not.toBeInTheDocument()
  })
})
