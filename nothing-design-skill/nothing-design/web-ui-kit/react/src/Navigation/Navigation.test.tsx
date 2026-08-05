import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from './Navigation'

describe('Navigation', () => {
  const items = [{ label: 'Design' }, { label: 'Components' }, { label: 'Tokens' }]

  it('renders with data-slot', () => {
    const { container } = render(<Navigation items={items} syncWithUrl={false} />)
    expect(container.querySelector('[data-slot="navigation"]')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<Navigation items={items} syncWithUrl={false} />)
    expect(screen.getByRole('button', { name: 'Design' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Components' })).toBeInTheDocument()
  })

  it('marks first item as active by default', () => {
    render(<Navigation items={items} syncWithUrl={false} />)
    const first = screen.getByRole('button', { name: 'Design' })
    expect(first).toHaveAttribute('aria-current', 'page')
    expect(first).toHaveAttribute('data-state', 'active')
    expect(first).toHaveAttribute('data-active')
  })

  it('switches active item on click', () => {
    render(<Navigation items={items} syncWithUrl={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Components' }))
    expect(screen.getByRole('button', { name: 'Components' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: 'Design' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('button', { name: 'Design' })).toHaveAttribute('data-state', 'inactive')
  })

  it('calls onChange when item clicked', () => {
    const handleChange = vi.fn()
    render(<Navigation items={items} syncWithUrl={false} onChange={handleChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Tokens' }))
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('renders bracket variant without indicator', () => {
    const { container } = render(<Navigation items={items} variant="bracket" syncWithUrl={false} />)
    expect(container.querySelector('[data-slot="navigation-indicator"]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-slot="navigation"]')).not.toHaveAttribute(
      'data-has-indicator',
    )
  })

  it('renders default variant with sliding indicator', () => {
    const { container } = render(<Navigation items={items} variant="default" syncWithUrl={false} />)
    expect(container.querySelector('[data-slot="navigation-indicator"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="navigation"]')).toHaveAttribute(
      'data-has-indicator',
    )
  })

  it('positions the indicator with a logical inline-start offset', () => {
    const { container } = render(<Navigation items={items} syncWithUrl={false} />)
    const indicator = container.querySelector<HTMLElement>('[data-slot="navigation-indicator"]')
    expect(indicator?.style.insetInlineStart).not.toBe('')
    expect(indicator?.style.left).toBe('')
  })

  it('renders pipe separators only between items', () => {
    const { container } = render(<Navigation items={items} variant="pipe" syncWithUrl={false} />)
    expect(container.querySelectorAll('[data-slot="navigation-separator"]')).toHaveLength(
      items.length - 1,
    )
  })

  it('renders back button when showBack is true', () => {
    const handleBack = vi.fn()
    render(<Navigation items={items} showBack onBack={handleBack} syncWithUrl={false} />)
    const backButton = screen.getByRole('button', { name: 'Go back' })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('data-slot', 'navigation-back')
    fireEvent.click(backButton)
    expect(handleBack).toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLElement>()
    render(<Navigation ref={ref} items={items} syncWithUrl={false} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current?.tagName).toBe('NAV')
  })
})
