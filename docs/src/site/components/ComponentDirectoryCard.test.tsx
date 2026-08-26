import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { ComponentDirectoryCard } from './ComponentDirectoryCard'
import type { ComponentDoc } from '../registry'

vi.mock('../registry', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../registry')>()
  return {
    ...actual,
    hasComponentDoc: () => true,
    loadComponentDoc: async (): Promise<ComponentDoc> => ({
      slug: 'button',
      name: 'Button',
      category: 'actions-inputs',
      description: { zh: '按钮', en: 'Button' },
      preview: () => <span>static preview</span>,
      examples: [
        {
          id: 'variants',
          title: { zh: '变体', en: 'Variants' },
          code: '',
          render: () => <button type="button">实景按钮</button>,
        },
      ],
      importStatement: '',
      usageSnippet: '',
      api: [],
      accessibility: [],
    }),
  }
})

class ImmediateIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', ImmediateIntersectionObserver)

function renderCard() {
  const context: ShowcaseContextValue = {
    lang: 'zh',
    t: (zh) => zh,
    toggleLang: vi.fn(),
    preloadProjectIntro: vi.fn(),
    preloadAIPoc: vi.fn(),
    preloadShowcase: vi.fn(),
  }

  return render(
    <MemoryRouter>
      <ShowcaseProvider value={context}>
        <ComponentDirectoryCard
          entry={{
            slug: 'button',
            name: 'Button',
            category: 'actions-inputs',
            description: { zh: '触发动作的按钮', en: 'A clickable button' },
          }}
        />
      </ShowcaseProvider>
    </MemoryRouter>,
  )
}

describe('ComponentDirectoryCard', () => {
  it('embeds the live example inside the directory entry without wrapping it in the docs link', async () => {
    const user = userEvent.setup()
    renderCard()

    expect(screen.getByRole('link', { name: /按钮/ })).toHaveAttribute('href', '/components/button')
    const live = await screen.findByRole('button', { name: '实景按钮' })
    await user.click(live)
    expect(screen.getByRole('link', { name: /按钮/ })).toBeInTheDocument()
  })

  it('keeps the docs link available while the live scene is still loading', async () => {
    renderCard()
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /按钮/ })).toBeInTheDocument()
    })
  })
})
