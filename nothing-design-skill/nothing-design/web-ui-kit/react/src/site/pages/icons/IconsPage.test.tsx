import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { IconsPage } from './IconsPage'
import { NOTHING_ICONS } from './nothing-icons'

const context: ShowcaseContextValue = {
  lang: 'en',
  t: (_zh: string, en: string) => en,
  toggleLang: vi.fn(),
  preloadProjectIntro: vi.fn(),
  preloadAIPoc: vi.fn(),
  preloadShowcase: vi.fn(),
}

function renderPage() {
  return render(
    <ShowcaseProvider value={context}>
      <IconsPage />
    </ShowcaseProvider>,
  )
}

describe('IconsPage', () => {
  it('renders the Nothing set with a live count', () => {
    renderPage()
    expect(screen.getByText(`${NOTHING_ICONS.length} icons`)).toBeInTheDocument()
  })

  it('renders grid cells as focusable buttons', () => {
    renderPage()
    const grid = document.querySelector('[data-slot="icon-grid"]') as HTMLElement
    expect(within(grid).getAllByRole('button').length).toBeGreaterThan(0)
  })

  it('filters by group', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /^Weather/ }))
    expect(screen.getByText('7 icons')).toBeInTheDocument()
  })

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByLabelText('Search icons'), 'zzzznope')
    expect(await screen.findByText('No icons match')).toBeInTheDocument()
  })

  it('opens the detail panel with copy actions', async () => {
    const user = userEvent.setup()
    renderPage()
    const grid = document.querySelector('[data-slot="icon-grid"]') as HTMLElement
    await user.click(within(grid).getAllByRole('button')[0])
    expect(document.querySelector('[data-slot="icon-detail"]')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Copy JSX' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy import' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy SVG' })).toBeInTheDocument()
  })

  it('toggles dot-matrix rendering', async () => {
    const user = userEvent.setup()
    renderPage()
    const toggle = screen.getByRole('button', { name: 'Dot matrix' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(document.querySelector('.nothing-dot-matrix-icon')).not.toBeNull()
  })
})
