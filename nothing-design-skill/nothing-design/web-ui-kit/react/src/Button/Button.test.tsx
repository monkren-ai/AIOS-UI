import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

const Icon = () => (
  <svg data-testid="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
  </svg>
)

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
    ;['primary', 'secondary', 'ghost', 'destructive', 'tertiary'].forEach((variant) => {
      const { unmount } = render(<Button variant={variant as 'primary'}>Btn</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass(`nothing-btn--${variant}`)
      expect(button).toHaveAttribute('data-variant', variant)
      unmount()
    })
  })

  it('renders all sizes with correct classes', () => {
    const sizes: Array<'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg' | 'default'> = [
      'sm',
      'lg',
      'icon',
      'icon-sm',
      'icon-lg',
      'default',
    ]
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>Size</Button>)
      const button = screen.getByRole('button')
      if (size !== 'default') {
        expect(button).toHaveClass(`nothing-btn--${size}`)
      }
      expect(button).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Full</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('nothing-btn--full')
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    )
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

  it('renders leading icon', () => {
    render(
      <Button leadingIcon={<Icon />}>
        With Icon
      </Button>,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('With Icon')
  })

  it('renders trailing icon', () => {
    render(
      <Button trailingIcon={<Icon />}>
        With Icon
      </Button>,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('With Icon')
  })

  it('shows loading spinner and loadingText', () => {
    render(
      <Button loading loadingText="Saving...">
        Save
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveClass('nothing-btn--loading')
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('supports active state with aria-pressed', () => {
    render(<Button active>Toggle</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveAttribute('data-active')
  })
})
