import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { IconsPage } from './IconsPage'

vi.mock('./tabler-icons', async () => {
  const actual = await vi.importActual<typeof import('./tabler-icons')>('./tabler-icons')
  const FakeIcon = forwardRef<SVGSVGElement, { size?: number }>(({ size = 24 }, ref) => (
    <svg ref={ref} data-testid="fake-tabler-icon" width={size} height={size} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={size / 3} />
    </svg>
  ))
  return {
    ...actual,
    loadTablerIcons: vi.fn(async () => [
      {
        id: 'tabler/IconHome',
        source: 'tabler' as const,
        groupId: 'outline',
        name: 'home',
        componentName: 'IconHome',
        searchText: 'home iconhome',
        Component: FakeIcon,
      },
      {
        id: 'tabler/IconHomeFilled',
        source: 'tabler' as const,
        groupId: 'filled',
        name: 'home-filled',
        componentName: 'IconHomeFilled',
        searchText: 'home-filled iconhomefilled',
        Component: FakeIcon,
      },
    ]),
  }
})

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
  it('uses Tabler as the only icon source', async () => {
    renderPage()
    expect(screen.queryByRole('button', { name: 'AIOS' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Tabler' })).not.toBeInTheDocument()
    expect(screen.queryByRole('group', { name: 'Icon source' })).not.toBeInTheDocument()
    expect(await screen.findByText('2 icons')).toBeInTheDocument()
  })

  it('renders grid cells as focusable buttons', async () => {
    renderPage()
    await screen.findByText('2 icons')
    const grid = document.querySelector('[data-slot="icon-grid"]') as HTMLElement
    expect(within(grid).getAllByRole('button').length).toBeGreaterThan(0)
  })

  it('filters by group', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByText('2 icons')
    await user.click(screen.getByRole('button', { name: /^Filled/ }))
    expect(screen.getByText('1 icons')).toBeInTheDocument()
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
    await screen.findByText('2 icons')
    const grid = document.querySelector('[data-slot="icon-grid"]') as HTMLElement
    await user.click(within(grid).getAllByRole('button')[0])
    expect(document.querySelector('[data-slot="icon-detail"]')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Copy JSX' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy import' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Copy SVG' })).toBeInTheDocument()
  })

  it('toggles dot-matrix rendering', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByText('2 icons')
    const toggle = screen.getByRole('button', { name: 'Dot matrix' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await waitFor(() => {
      expect(document.querySelector('.aios-dot-matrix-icon')).not.toBeNull()
    })
  })

  it('loads and renders Tabler icons on page entry', async () => {
    renderPage()

    await waitFor(() => {
      expect(screen.getByText('2 icons')).toBeInTheDocument()
    })

    expect(screen.queryByText('Failed to load the Tabler icons.')).toBeNull()
    expect(screen.queryByText('Loading Tabler icons…')).toBeNull()

    const grid = document.querySelector('[data-slot="icon-grid"]') as HTMLElement
    expect(grid).not.toBeNull()
    expect(within(grid).getAllByTestId('fake-tabler-icon').length).toBeGreaterThan(0)
    expect(within(grid).getByTitle('home')).toBeInTheDocument()
  })

  it('still loads Tabler icons under React StrictMode remount', async () => {
    const { StrictMode } = await import('react')

    render(
      <StrictMode>
        <ShowcaseProvider value={context}>
          <IconsPage />
        </ShowcaseProvider>
      </StrictMode>,
    )

    await waitFor(() => {
      expect(screen.getByText('2 icons')).toBeInTheDocument()
    })
    expect(screen.queryByText('Loading Tabler icons…')).toBeNull()
  })
})
