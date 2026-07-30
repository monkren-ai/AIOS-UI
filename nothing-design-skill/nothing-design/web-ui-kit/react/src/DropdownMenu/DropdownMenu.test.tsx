import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DropdownMenu } from './DropdownMenu'

const ITEMS = [
  { label: 'Edit', onClick: vi.fn() },
  { label: 'Duplicate', onClick: vi.fn(), disabled: true },
  { separator: true },
  { label: 'Delete', onClick: vi.fn() },
] as const

describe('DropdownMenu', () => {
  it('renders trigger and opens menu', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu trigger="Actions" items={[...ITEMS]} />)

    const trigger = screen.getByRole('button', { name: 'Actions' })
    expect(trigger).toBeInTheDocument()

    await user.click(trigger)
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    })
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

  it('renders separator', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu trigger="Actions" items={[...ITEMS]} />)

    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => {
      expect(screen.getAllByRole('separator').length).toBeGreaterThan(0)
    })
  })

  it('renders menubar variant', async () => {
    const user = userEvent.setup()
    render(
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

    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument()
    })
  })
})
