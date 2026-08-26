import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Chip, ChipGroup } from './Chip'

describe('Chip', () => {
  it('exposes selection as a pressed state', () => {
    render(<Chip selected>Research</Chip>)
    const chip = screen.getByRole('button', { name: 'Research' })
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(chip).toHaveAttribute('data-selected')
    expect(chip).toHaveAttribute('data-size', 'md')
  })

  it('supports interaction and disabled state', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { rerender } = render(<Chip onClick={onClick}>Open</Chip>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()

    rerender(<Chip disabled onClick={onClick}>Open</Chip>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('groups chips in a horizontally scrollable row', () => {
    render(
      <ChipGroup aria-label="Filters">
        <Chip>All</Chip>
        <Chip>Agent</Chip>
      </ChipGroup>,
    )
    const group = screen.getByRole('group', { name: 'Filters' })
    expect(group).toHaveAttribute('data-slot', 'chip-group')
    expect(group).toHaveClass('overflow-x-auto')
  })
})
