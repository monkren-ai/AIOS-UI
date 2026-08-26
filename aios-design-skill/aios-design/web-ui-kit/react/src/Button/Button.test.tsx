import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import { IconButton } from './IconButton'
import { buttonVariants } from './button-variants'

const Icon = () => (
  <svg data-testid="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
  </svg>
)

const VARIANTS = [
  'primary',
  'primary-outline',
  'secondary',
  'soft',
  'outline',
  'ghost',
  'destructive',
] as const

const SIZES = ['sm', 'md', 'lg', 'icon-sm', 'icon-md', 'icon-lg'] as const

describe('Button', () => {
  it('renders with data-slot and the primary/md defaults', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toHaveAttribute('data-slot', 'button')
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(button).toHaveAttribute('data-size', 'md')
  })

  it('reports every variant through data-variant', () => {
    VARIANTS.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>Btn</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
      unmount()
    })
  })

  it('reports every size through data-size', () => {
    SIZES.forEach((size) => {
      const { unmount } = render(<Button size={size}>Size</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('maps the v1 variant and size aliases onto their replacements', () => {
    const { unmount } = render(
      <Button variant="tertiary" size="icon">
        Legacy
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-variant', 'soft')
    expect(button).toHaveAttribute('data-size', 'icon-md')
    unmount()

    render(<Button size="default">Legacy default</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'md')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
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

  it('applies fullWidth', () => {
    render(<Button fullWidth>Full</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('merges custom className after the variant classes', () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Button className="rounded-none">Squared</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-none')
    expect(button).not.toHaveClass('rounded-button')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('marks icons with data-icon so they pick up the inner spacing', () => {
    const { unmount } = render(<Button leadingIcon={<Icon />}>With Icon</Button>)
    expect(screen.getByTestId('icon').closest('[data-icon]')).toHaveAttribute('data-icon', 'start')
    unmount()

    render(<Button trailingIcon={<Icon />}>With Icon</Button>)
    expect(screen.getByTestId('icon').closest('[data-icon]')).toHaveAttribute('data-icon', 'end')
  })

  it('swaps in loadingText and blocks interaction while loading', () => {
    render(
      <Button loading loadingText="Saving...">
        Save
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('data-loading')
    expect(button).toBeDisabled()
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('exposes the pressed state through aria-pressed', () => {
    render(<Button active>Toggle</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveAttribute('data-active')
  })

  it('exports buttonVariants so a link can look like a button without losing link semantics', () => {
    render(
      <a href="/docs" className={buttonVariants({ variant: 'soft', size: 'sm' })}>
        Docs
      </a>,
    )
    const link = screen.getByRole('link', { name: 'Docs' })
    expect(link).toHaveClass('aios-btn')
    expect(link.tagName).toBe('A')
  })
})

describe('IconButton', () => {
  it('requires an accessible label and keeps the icon decorative', () => {
    render(<IconButton aria-label="Search" icon={<Icon />} />)
    const button = screen.getByRole('button', { name: 'Search' })
    expect(button).toHaveAttribute('data-slot', 'icon-button')
    expect(button).toHaveAttribute('data-size', 'icon-md')
    expect(button).toHaveAttribute('data-shape', 'circle')
    expect(screen.getByTestId('icon').closest('[data-slot="icon-button-icon"]')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })

  it('maps semantic size and shape onto the shared button system', () => {
    render(
      <IconButton aria-label="Settings" icon={<Icon />} size="lg" shape="technical" />,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-size', 'icon-lg')
    expect(button).toHaveAttribute('data-shape', 'technical')
    expect(button).toHaveClass('rounded-card-technical')
  })
})
