import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HoverCard } from './HoverCard'

describe('HoverCard', () => {
  it('renders the trigger with data-slot and hides the card initially', () => {
    render(
      <HoverCard content="Profile">
        <button>Peek</button>
      </HoverCard>,
    )
    expect(screen.getByRole('button', { name: 'Peek' })).toHaveAttribute(
      'data-slot',
      'hover-card-trigger',
    )
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })

  it('opens on hover and marks the parts with data-slot', async () => {
    const user = userEvent.setup()
    render(
      <HoverCard content="Profile" delay={0}>
        <button>Peek</button>
      </HoverCard>,
    )

    await user.hover(screen.getByRole('button', { name: 'Peek' }))
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument()
    })
    const content = document.querySelector('[data-slot="hover-card-content"]') as HTMLElement
    expect(content).toHaveAttribute('data-side', 'bottom')
    expect(document.querySelector('[data-slot="hover-card-positioner"]')).toBeInTheDocument()
  })

  it('reports the requested side', async () => {
    const user = userEvent.setup()
    render(
      <HoverCard content="Profile" side="top" delay={0}>
        <button>Peek</button>
      </HoverCard>,
    )
    await user.hover(screen.getByRole('button', { name: 'Peek' }))
    await waitFor(() => {
      expect(document.querySelector('[data-slot="hover-card-content"]')).toHaveAttribute(
        'data-side',
        'top',
      )
    })
  })

  it('lets a caller-supplied utility win over the variant default', async () => {
    const user = userEvent.setup()
    render(
      <HoverCard content="Profile" delay={0} className="rounded-none">
        <button>Peek</button>
      </HoverCard>,
    )
    await user.hover(screen.getByRole('button', { name: 'Peek' }))
    await waitFor(() => {
      expect(document.querySelector('[data-slot="hover-card-content"]')).toHaveClass('rounded-none')
    })
    expect(document.querySelector('[data-slot="hover-card-content"]')).not.toHaveClass('rounded-md')
  })

  it('accepts ref as a plain prop', async () => {
    const user = userEvent.setup()
    const ref = React.createRef<HTMLDivElement>()
    render(
      <HoverCard content="Profile" delay={0} ref={ref}>
        <button>Peek</button>
      </HoverCard>,
    )
    await user.hover(screen.getByRole('button', { name: 'Peek' }))
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
