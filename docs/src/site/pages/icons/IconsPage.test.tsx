import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ShowcaseProvider, type ShowcaseContextValue } from '@/showcase/ShowcaseContext'
import { IconsPage } from './IconsPage'
import { AIOS_ICONS } from './aios-icons'

vi.mock('./tabler-icons', async () => {
  const actual = await vi.importActual<typeof import('./tabler-icons')>('./tabler-icons')
  const FakeIcon = ({ size = 24 }: { size?: number }) => (
    <svg data-testid="fake-tabler-icon" width={size} height={size} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={size / 3} />
    </svg>
  )
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
  it('renders the AIOS set with a live count', () => {
    renderPage()
    expect(screen.getByText(`${AIOS_ICONS.length} icons`)).toBeInTheDocument()
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
    expect(document.querySelector('.aios-dot-matrix-icon')).not.toBeNull()
  })

  it('loads and renders Tabler icons after switching source', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'Tabler' }))

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
    const user = userEvent.setup()
    const { StrictMode } = await import('react')

    render(
      <StrictMode>
        <ShowcaseProvider value={context}>
          <IconsPage />
        </ShowcaseProvider>
      </StrictMode>,
    )

    await user.click(screen.getByRole('button', { name: 'Tabler' }))

    await waitFor(() => {
      expect(screen.getByText('2 icons')).toBeInTheDocument()
    })
    expect(screen.queryByText('Loading Tabler icons…')).toBeNull()
  })
})
