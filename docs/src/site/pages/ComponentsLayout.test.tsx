import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { ComponentsLayout } from './ComponentsLayout'

function renderDetail(entry: string) {
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
            <Route path="overview" element={<div>交互总览正文</div>} />
            <Route path=":slug" element={<div>组件正文</div>} />
          </Route>
        </Routes>
      </ShowcaseProvider>
    </MemoryRouter>,
  )
}

describe('ComponentsLayout', () => {
  it('infers the AI Agent group from a legacy component detail URL', () => {
    renderDetail('/components/aicss')

    expect(screen.getByRole('link', { name: /AI Agent 组件/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
    const sideNav = screen.getByRole('navigation', { name: '组件导航' })
    expect(within(sideNav).getByText('AI OS 与对话')).toBeInTheDocument()
    expect(within(sideNav).queryByText('操作与输入')).not.toBeInTheDocument()
  })

  it('keeps basic detail pages inside the basic component navigation', () => {
    renderDetail('/components/autocomplete')

    expect(screen.getByRole('link', { name: /基础组件/ })).toHaveAttribute('aria-current', 'page')
    const sideNav = screen.getByRole('navigation', { name: '组件导航' })
    expect(within(sideNav).getByText('操作与输入')).toBeInTheDocument()
    expect(within(sideNav).queryByText('AI OS 与对话')).not.toBeInTheDocument()
  })

  it('places the live overview entry inside the component side navigation', () => {
    renderDetail('/components/autocomplete')

    const sideNav = screen.getByRole('navigation', { name: '组件导航' })
    expect(within(sideNav).getByText('浏览')).toBeInTheDocument()
    expect(within(sideNav).getByRole('link', { name: '交互总览' })).toHaveAttribute(
      'href',
      '/components/overview',
    )
    expect(screen.getAllByRole('link', { name: '交互总览' })).toHaveLength(1)
  })

  it('gives the live overview the full component content area', () => {
    renderDetail('/components/overview')

    expect(screen.getByText('交互总览正文')).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: '组件分组分页' })).not.toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: '组件导航' })).not.toBeInTheDocument()
  })
})
