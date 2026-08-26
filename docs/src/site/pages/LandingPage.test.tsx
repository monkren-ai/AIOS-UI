import { fireEvent, render, screen, within } from '@testing-library/react'
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
      screen.getByRole('heading', { level: 1, name: /把 AI 界面从“能运行”推进到“值得交付”/ }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '阅读安装文档' })).toHaveAttribute(
      'href',
      '/docs/installation',
    )
    expect(screen.getByRole('link', { name: '浏览全部组件' })).toHaveAttribute(
      'href',
      '/components',
    )
  })

  it('derives its proof numbers from the registries', () => {
    renderPage('en')

    const stats = screen.getByRole('region', { name: 'Library statistics' })
    expect(within(stats).getByText(String(COMPONENT_MANIFEST.length))).toBeInTheDocument()
    expect(within(stats).getByText(String(CATEGORIES.length))).toBeInTheDocument()
    expect(within(stats).getByText('complete themes')).toBeInTheDocument()
  })

  it('keeps only the live Agent workflow preview', () => {
    renderPage('en')

    expect(screen.getByRole('heading', { name: 'Agent workflow' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Human approval' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Conversation' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'System status' })).not.toBeInTheDocument()
    expect(screen.queryByText('Start with a real interface')).not.toBeInTheDocument()
  })

  it('maps a vertical mouse wheel gesture to the horizontal landing rail', () => {
    renderPage('en')

    const main = screen.getByRole('main')
    fireEvent.wheel(main, { deltaY: 120 })

    expect(main.scrollLeft).toBe(120)
  })
})
