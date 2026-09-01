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
  it('renders project information without creator details', () => {
    renderPage('zh')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '把难以描述的设计判断，变成可以执行的共同语言',
    )
    expect(screen.queryByText(/张瑞圣|MONK\.REN|创作者/)).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('links to the component overview and GitHub', () => {
    renderPage('en')

    expect(screen.queryByRole('link', { name: 'Visit MONK.REN' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'View public résumé' })).not.toBeInTheDocument()
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
