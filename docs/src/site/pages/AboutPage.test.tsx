import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { AboutPage } from './AboutPage'

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
        <AboutPage />
      </ShowcaseProvider>
    </MemoryRouter>,
  )
}

describe('AboutPage', () => {
  it('renders verified creator information without private contact details', () => {
    renderPage('zh')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('张瑞圣 · MONK.REN')
    expect(screen.getByRole('img', { name: '张瑞圣的个人头像' })).toBeInTheDocument()
    expect(screen.getByText('张瑞圣 · MONK.REN')).toBeInTheDocument()
    expect(screen.queryByText('资深用户体验设计师')).not.toBeInTheDocument()
    expect(screen.queryByText(/185-1048/)).not.toBeInTheDocument()
    expect(screen.queryByText(/微信/)).not.toBeInTheDocument()
  })

  it('links to the public profile, component overview, and GitHub', () => {
    renderPage('en')

    expect(screen.getByRole('link', { name: 'Visit MONK.REN' })).toHaveAttribute(
      'href',
      'https://monk.ren/',
    )
    expect(screen.queryByRole('heading', { name: 'Less decoration, more structure' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View components' })).toHaveAttribute(
      'href',
      '/components',
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/monkren-ai/AIOS-UI',
    )
  })
})
