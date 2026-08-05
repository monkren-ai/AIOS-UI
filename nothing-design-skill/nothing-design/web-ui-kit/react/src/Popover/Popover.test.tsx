import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover } from './Popover'

describe('Popover', () => {
  it('stays closed until the trigger is activated', () => {
    render(
      <Popover content="Panel">
        <button>Open</button>
      </Popover>,
    )
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute(
      'data-slot',
      'popover-trigger',
    )
    expect(screen.queryByText('Panel')).not.toBeInTheDocument()
  })

  it('opens on click and marks the parts with data-slot', async () => {
    const user = userEvent.setup()
    render(
      <Popover content="Panel">
        <button>Open</button>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await waitFor(() => {
      expect(screen.getByText('Panel')).toBeInTheDocument()
    })
    const content = document.querySelector('[data-slot="popover-content"]') as HTMLElement
    expect(content).toBeInTheDocument()
    expect(content).toHaveAttribute('data-side', 'bottom')
    expect(document.querySelector('[data-slot="popover-positioner"]')).toBeInTheDocument()
  })

  it('honours the controlled open prop and reports side', () => {
    render(
      <Popover open content="Panel" side="top">
        <button>Open</button>
      </Popover>,
    )
    const content = document.querySelector('[data-slot="popover-content"]') as HTMLElement
    expect(content).toHaveAttribute('data-state', 'open')
    expect(content).toHaveAttribute('data-side', 'top')
  })

  it('calls onOpenChange', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Popover content="Panel" onOpenChange={onOpenChange}>
        <button>Open</button>
      </Popover>,
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(
      <Popover open content="Panel" className="rounded-none">
        <button>Open</button>
      </Popover>,
    )
    const content = document.querySelector('[data-slot="popover-content"]') as HTMLElement
    expect(content).toHaveClass('rounded-none')
    expect(content).not.toHaveClass('rounded-md')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Popover open content="Panel" ref={ref}>
        <button>Open</button>
      </Popover>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
