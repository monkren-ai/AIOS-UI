import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DropdownMenu } from './DropdownMenu'

const ITEMS = [
  { label: 'Edit', onClick: vi.fn() },
  { label: 'Duplicate', onClick: vi.fn(), disabled: true },
  { separator: true },
  { label: 'Delete', onClick: vi.fn(), shortcut: '⌘⌫' },
] as const

describe('DropdownMenu', () => {
  it('renders trigger and opens menu', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu trigger="Actions" items={[...ITEMS]} />)

    const trigger = screen.getByRole('button', { name: 'Actions' })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('data-slot', 'dropdown-menu-trigger')

    await user.click(trigger)
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    })
  })

  it('marks up the root and the open parts with data-slot', async () => {
    const user = userEvent.setup()
    const { container } = render(<DropdownMenu trigger="Actions" items={[...ITEMS]} />)

    const root = container.querySelector('[data-slot="dropdown-menu"]')
    expect(root).toBeInTheDocument()
    expect(root).toHaveAttribute('data-variant', 'default')

    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => {
      expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toBeInTheDocument()
    })
    expect(document.querySelector('[data-slot="dropdown-menu-content"]')).toHaveAttribute(
      'data-align',
      'start',
    )
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute(
      'data-slot',
      'dropdown-menu-item',
    )
    expect(document.querySelector('[data-slot="dropdown-menu-item-shortcut"]')).toHaveTextContent(
      '⌘⌫',
    )
  })

  it('calls onClick when item selected', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu trigger="Actions" items={[...ITEMS]} />)

    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
    expect(ITEMS[0].onClick).toHaveBeenCalled()
  })

  it('flags a disabled item through data-disabled', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu trigger="Actions" items={[...ITEMS]} />)

    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toBeInTheDocument()
    })
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveAttribute('data-disabled')
  })

  it('renders separator', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu trigger="Actions" items={[...ITEMS]} />)

    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => {
      expect(screen.getAllByRole('separator').length).toBeGreaterThan(0)
    })
    expect(document.querySelector('[data-slot="dropdown-menu-separator"]')).toBeInTheDocument()
  })

  it('renders menubar variant', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <DropdownMenu
        variant="menubar"
        items={[
          {
            label: 'File',
            items: [{ label: 'New', onClick: vi.fn() }],
          },
        ]}
      />,
    )

    expect(container.querySelector('[data-slot="dropdown-menu"]')).toHaveAttribute(
      'data-variant',
      'menubar',
    )

    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument()
    })
    expect(
      document.querySelector('[data-slot="dropdown-menu-menubar-content"]'),
    ).toBeInTheDocument()
  })

  it('merges a caller className onto the root', () => {
    const { container } = render(
      <DropdownMenu trigger="Actions" items={[...ITEMS]} className="my-menu" />,
    )
    expect(container.querySelector('[data-slot="dropdown-menu"]')).toHaveClass('my-menu')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DropdownMenu ref={ref} trigger="Actions" items={[...ITEMS]} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
