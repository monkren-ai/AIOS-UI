import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Collapsible } from './Collapsible'

describe('Collapsible', () => {
  it('renders a data-slot for every part', () => {
    const { container } = render(<Collapsible trigger="Details">Body</Collapsible>)
    expect(container.querySelector('[data-slot="collapsible"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="collapsible-trigger"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="collapsible-content"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="collapsible-content-inner"]')).toBeInTheDocument()
  })

  it('starts closed', () => {
    const { container } = render(<Collapsible trigger="Details">Body</Collapsible>)
    expect(container.querySelector('[data-slot="collapsible"]')).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('honours defaultOpen', () => {
    const { container } = render(
      <Collapsible trigger="Details" defaultOpen>
        Body
      </Collapsible>,
    )
    expect(container.querySelector('[data-slot="collapsible"]')).toHaveAttribute(
      'data-state',
      'open',
    )
  })

  it('toggles on click when uncontrolled', () => {
    const { container } = render(<Collapsible trigger="Details">Body</Collapsible>)
    const trigger = screen.getByRole('button')

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(container.querySelector('[data-slot="collapsible-content"]')).toHaveAttribute(
      'data-state',
      'open',
    )

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('calls onOpenChange with the next state', () => {
    const onOpenChange = vi.fn()
    render(
      <Collapsible trigger="Details" onOpenChange={onOpenChange}>
        Body
      </Collapsible>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('stays controlled when open is provided', () => {
    const { container, rerender } = render(
      <Collapsible trigger="Details" open={false}>
        Body
      </Collapsible>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(container.querySelector('[data-slot="collapsible"]')).toHaveAttribute(
      'data-state',
      'closed',
    )

    rerender(
      <Collapsible trigger="Details" open>
        Body
      </Collapsible>,
    )
    expect(container.querySelector('[data-slot="collapsible"]')).toHaveAttribute(
      'data-state',
      'open',
    )
  })

  it('exposes the open content as a region named by its trigger', () => {
    render(
      <Collapsible trigger="Details" defaultOpen>
        Body
      </Collapsible>,
    )
    const region = screen.getByRole('region', { name: 'Details' })
    expect(region).toHaveTextContent('Body')
  })

  it('points aria-controls and aria-labelledby at elements that exist', () => {
    const { container } = render(
      <Collapsible trigger="Details" defaultOpen>
        Body
      </Collapsible>,
    )
    const trigger = container.querySelector('[data-slot="collapsible-trigger"]')!
    const content = container.querySelector('[data-slot="collapsible-content"]')!

    const controlledId = trigger.getAttribute('aria-controls')!
    expect(document.getElementById(controlledId)).toBe(content)

    const labelId = content.getAttribute('aria-labelledby')!
    expect(document.getElementById(labelId)).toBe(trigger)
  })

  it('gives each instance its own ids', () => {
    const { container } = render(
      <>
        <Collapsible trigger="First">One</Collapsible>
        <Collapsible trigger="Second">Two</Collapsible>
      </>,
    )
    const [first, second] = Array.from(
      container.querySelectorAll('[data-slot="collapsible-trigger"]'),
    )
    expect(first.getAttribute('aria-controls')).not.toBe(second.getAttribute('aria-controls'))
  })

  it('keeps closed content out of the accessibility tree', () => {
    const { container } = render(<Collapsible trigger="Details">Body</Collapsible>)
    const content = container.querySelector('[data-slot="collapsible-content"]')!

    expect(content).toBeInTheDocument()
    expect(content).toHaveAttribute('inert')
    expect(content).toHaveStyle({ visibility: 'hidden' })
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('drops the guards once open', () => {
    const { container } = render(
      <Collapsible trigger="Details" defaultOpen>
        Body
      </Collapsible>,
    )
    const content = container.querySelector('[data-slot="collapsible-content"]')!
    expect(content).not.toHaveAttribute('inert')
    expect(content).not.toHaveStyle({ visibility: 'hidden' })
  })

  it('keeps focusable content out of the tab order while closed', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Collapsible trigger="Details">
          <a href="#target">Inside link</a>
        </Collapsible>
        <button type="button">after</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Details' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
  })

  it('puts the content back in the tab order once open', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Collapsible trigger="Details" defaultOpen>
          <a href="#target">Inside link</a>
        </Collapsible>
        <button type="button">after</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Details' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('link', { name: 'Inside link' })).toHaveFocus()
  })

  it('lets the caller override variant defaults through className', () => {
    const { container } = render(
      <Collapsible trigger="Details" className="rounded-none">
        Body
      </Collapsible>,
    )
    const root = container.querySelector('[data-slot="collapsible"]')
    expect(root).toHaveClass('rounded-none')
    expect(root).not.toHaveClass('rounded-md')
  })

  it('accepts a ref on the root', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Collapsible ref={ref} trigger="Details">
        Body
      </Collapsible>,
    )
    expect(ref.current).toHaveAttribute('data-slot', 'collapsible')
  })
})
