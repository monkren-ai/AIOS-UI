import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from './Navigation'

describe('Navigation', () => {
  const items = [
    { label: 'Design' },
    { label: 'Components' },
    { label: 'Tokens' },
  ]

  it('renders navigation items', () => {
    render(<Navigation items={items} syncWithUrl={false} />)
    expect(screen.getByRole('button', { name: 'Design' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Components' })).toBeInTheDocument()
  })

  it('marks first item as active by default', () => {
    render(<Navigation items={items} syncWithUrl={false} />)
    expect(screen.getByRole('button', { name: 'Design' })).toHaveAttribute('aria-current', 'page')
  })

  it('switches active item on click', () => {
    render(<Navigation items={items} syncWithUrl={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Components' }))
    expect(screen.getByRole('button', { name: 'Components' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Design' })).not.toHaveAttribute('aria-current')
  })

  it('calls onChange when item clicked', () => {
    const handleChange = vi.fn()
    render(<Navigation items={items} syncWithUrl={false} onChange={handleChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Tokens' }))
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('renders bracket variant without indicator', () => {
    const { container } = render(<Navigation items={items} variant="bracket" syncWithUrl={false} />)
    expect(container.querySelector('.nothing-nav__indicator')).not.toBeInTheDocument()
  })

  it('renders default variant with sliding indicator', () => {
    const { container } = render(<Navigation items={items} variant="default" syncWithUrl={false} />)
    expect(container.querySelector('.nothing-nav__indicator')).toBeInTheDocument()
  })

  it('renders back button when showBack is true', () => {
    const handleBack = vi.fn()
    render(<Navigation items={items} showBack onBack={handleBack} syncWithUrl={false} />)
    const backButton = screen.getByRole('button', { name: 'Go back' })
    expect(backButton).toBeInTheDocument()
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
