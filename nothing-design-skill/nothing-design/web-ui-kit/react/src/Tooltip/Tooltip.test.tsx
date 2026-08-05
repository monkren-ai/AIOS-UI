import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('renders the trigger with data-slot and hides the popup initially', () => {
    render(
      <Tooltip content="Hint">
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByRole('button', { name: 'Hover me' })).toHaveAttribute(
      'data-slot',
      'tooltip-trigger',
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows the popup on hover with the tooltip role and data-slot', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Hint" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Hover me' }))
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
    const popup = screen.getByRole('tooltip')
    expect(popup).toHaveAttribute('data-slot', 'tooltip-popup')
    expect(popup).toHaveAttribute('data-side', 'top')
    expect(popup).toHaveTextContent('Hint')
    expect(document.querySelector('[data-slot="tooltip-positioner"]')).toBeInTheDocument()
  })

  it('reports the requested side', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Hint" side="right" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    )
    await user.hover(screen.getByRole('button', { name: 'Hover me' }))
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-side', 'right')
    })
  })

  it('lets a caller-supplied utility win over the variant default', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Hint" delay={0} className="rounded-none">
        <button>Hover me</button>
      </Tooltip>,
    )
    await user.hover(screen.getByRole('button', { name: 'Hover me' }))
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('rounded-none')
    })
    expect(screen.getByRole('tooltip')).not.toHaveClass('rounded-sm')
  })
})
