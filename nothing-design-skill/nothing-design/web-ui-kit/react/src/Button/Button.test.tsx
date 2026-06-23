import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with default variant (primary)', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('nothing-btn')
    expect(button).toHaveClass('nothing-btn--primary')
  })

  it('renders with explicit variant and data-variant attribute', () => {
    render(<Button variant="primary">Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toHaveAttribute('data-variant', 'primary')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders all variants with correct classes', () => {
      ;['primary', 'secondary', 'ghost', 'destructive'].forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant as 'primary'}>Btn</Button>
        )
        const button = screen.getByRole('button')
        expect(button).toHaveClass(`nothing-btn--${variant}`)
        expect(button).toHaveAttribute('data-variant', variant)
        unmount()
      })
  })

  it('renders all sizes with correct classes', () => {
    const { unmount: u1 } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('nothing-btn--sm')
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'sm')
    u1()

    const { unmount: u2 } = render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('nothing-btn--lg')
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
    u2()

    const { unmount: u3 } = render(<Button size="default">Default</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'default')
    u3()
  })

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Full</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('nothing-btn--full')
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('supports custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('nothing-btn')
  })

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current?.tagName).toBe('BUTTON')
  })
})
