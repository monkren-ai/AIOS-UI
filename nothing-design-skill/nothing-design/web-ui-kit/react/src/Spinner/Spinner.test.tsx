import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Spinner } from './Spinner'

const items = ['ALPHA', 'BETA', 'GAMMA']

describe('Spinner', () => {
  it('renders with data-slot and the soft/md defaults', () => {
    render(<Spinner items={items} data-testid="spinner" />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('data-slot', 'spinner')
    expect(spinner).toHaveAttribute('data-variant', 'soft')
    expect(spinner).toHaveAttribute('data-size', 'md')
    expect(spinner).toHaveAttribute('data-state', 'idle')
  })

  it('maps the v1 variant aliases onto their replacements', () => {
    const { unmount } = render(<Spinner variant="default" items={items} data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-variant', 'soft')
    unmount()

    render(<Spinner variant="accent" items={items} data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-variant', 'destructive')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Spinner size={size} items={items} data-testid="spinner" />)
      expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('renders one sector per item plus the hub', () => {
    render(<Spinner items={items} data-testid="spinner" />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner.querySelectorAll('[data-slot="spinner-sector"]')).toHaveLength(items.length)
    expect(spinner.querySelectorAll('[data-slot="spinner-sector-text"]')).toHaveLength(items.length)
    expect(spinner.querySelector('[data-slot="spinner-hub"]')).toBeInTheDocument()
    items.forEach((item) => expect(screen.getByText(item)).toBeInTheDocument())
  })

  it('enters the spinning state when the spin button is pressed', async () => {
    const user = userEvent.setup()
    render(<Spinner items={items} data-testid="spinner" />)
    await user.click(screen.getByRole('button', { name: /spin/i }))
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('data-state', 'spinning')
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Spinner items={items} className="rounded-none" data-testid="spinner" />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('rounded-none')
    expect(spinner).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Spinner items={items} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
