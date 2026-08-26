import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { ComponentsLayout } from './ComponentsLayout'
import { ComponentsIndexPage } from './ComponentsIndexPage'

function renderPage(entry = '/components') {
  const context: ShowcaseContextValue = {
    lang: 'zh',
    t: (zh) => zh,
    toggleLang: vi.fn(),
    preloadProjectIntro: vi.fn(),
    preloadAIPoc: vi.fn(),
    preloadShowcase: vi.fn(),
  }

  return render(
    <MemoryRouter initialEntries={[entry]}>
      <ShowcaseProvider value={context}>
        <Routes>
          <Route path="/components" element={<ComponentsLayout />}>
            <Route index element={<ComponentsIndexPage />} />
          </Route>
        </Routes>
      </ShowcaseProvider>
    </MemoryRouter>,
  )
}

describe('ComponentsIndexPage', () => {
  it('defaults to the basic component page', () => {
    renderPage()

    expect(screen.getByRole('link', { name: /基础组件/ })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('heading', { name: '操作与输入' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'AI OS 与对话' })).not.toBeInTheDocument()
  })

  it('shows only the AI Agent category on the agent page', () => {
    renderPage('/components?group=agent')

    expect(screen.getByRole('link', { name: /AI Agent 组件/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('heading', { name: 'AI OS 与对话' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '操作与输入' })).not.toBeInTheDocument()
  })

  it('keeps the three requested subgroups on the other page', () => {
    renderPage('/components?group=other')

    expect(screen.getByRole('heading', { name: '时间与系统' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '桌面小组件' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '装饰与效果' })).toBeInTheDocument()
  })
})
