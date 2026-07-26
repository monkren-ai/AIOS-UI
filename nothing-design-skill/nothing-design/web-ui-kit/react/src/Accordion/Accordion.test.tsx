import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, type AccordionItem } from './Accordion'

const items: AccordionItem[] = [
  { id: '1', title: 'Section 1', content: 'Content for section 1' },
  { id: '2', title: 'Section 2', content: 'Content for section 2' },
  { id: '3', title: 'Section 3', content: 'Content for section 3' },
]

describe('Accordion', () => {
  it('renders all items with triggers', () => {
    render(<Accordion items={items} />)
    items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.content)).toBeInTheDocument()
    })
    const triggers = screen.getAllByRole('button')
    expect(triggers).toHaveLength(3)
    triggers.forEach((trigger) => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('expands and collapses a panel on click', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    const trigger = screen.getByRole('button', { name: 'Section 1' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('in single mode, opening one panel closes others', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} type="single" />)
    const trigger1 = screen.getByRole('button', { name: 'Section 1' })
    const trigger2 = screen.getByRole('button', { name: 'Section 2' })

    await user.click(trigger1)
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger2).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger2)
    expect(trigger1).toHaveAttribute('aria-expanded', 'false')
    expect(trigger2).toHaveAttribute('aria-expanded', 'true')
  })

  it('in multiple mode, allows multiple panels open', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} type="multiple" />)
    const trigger1 = screen.getByRole('button', { name: 'Section 1' })
    const trigger2 = screen.getByRole('button', { name: 'Section 2' })

    await user.click(trigger1)
    await user.click(trigger2)
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger2).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not expand disabled panels', () => {
    const disabledItems: AccordionItem[] = [
      { id: '1', title: 'Active', content: 'Active content' },
      { id: '2', title: 'Disabled', content: 'Disabled content', disabled: true },
    ]
    render(<Accordion items={disabledItems} />)
    const disabledTrigger = screen.getByRole('button', { name: 'Disabled' })
    expect(disabledTrigger).toBeDisabled()

    fireEvent.click(disabledTrigger)
    expect(disabledTrigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports custom className', () => {
    render(<Accordion items={items} className="my-accordion" />)
    const triggers = screen.getAllByRole('button')
    // Walk up to the accordion root: button -> h3 -> item div -> accordion root
    const accordionRoot = triggers[0].closest('.nothing-accordion')
    expect(accordionRoot).toHaveClass('my-accordion')
    expect(accordionRoot).toHaveClass('nothing-accordion')
  })

  it('opens items specified in defaultOpen', () => {
    render(<Accordion items={items} defaultOpen={['1']} />)
    const trigger1 = screen.getByRole('button', { name: 'Section 1' })
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    const trigger2 = screen.getByRole('button', { name: 'Section 2' })
    expect(trigger2).toHaveAttribute('aria-expanded', 'false')
  })

  it('triggers have correct aria-controls pointing to content', () => {
    render(<Accordion items={items} />)
    const triggers = screen.getAllByRole('button')
    triggers.forEach((trigger) => {
      const controlsId = trigger.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()
      const content = document.getElementById(controlsId!)
      expect(content).not.toBeNull()
      expect(content).toHaveAttribute('role', 'region')
    })
  })
})
