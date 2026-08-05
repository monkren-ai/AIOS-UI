import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Kbd } from './Kbd'
import { kbdVariants } from './kbd-variants'

describe('Kbd', () => {
  it('renders a kbd element with data-slot and the soft/md defaults', () => {
    render(<Kbd>K</Kbd>)
    const kbd = screen.getByText('K')
    expect(kbd.tagName).toBe('KBD')
    expect(kbd).toHaveAttribute('data-slot', 'kbd')
    expect(kbd).toHaveAttribute('data-variant', 'soft')
    expect(kbd).toHaveAttribute('data-size', 'md')
  })

  it('reports every variant through data-variant', () => {
    ;(['soft', 'outline', 'ghost'] as const).forEach((variant) => {
      const { unmount } = render(<Kbd variant={variant}>K</Kbd>)
      expect(screen.getByText('K')).toHaveAttribute('data-variant', variant)
      unmount()
    })
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Kbd size={size}>K</Kbd>)
      expect(screen.getByText('K')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('renders one key per entry with separators in between', () => {
    render(<Kbd keys={['⌘', 'K']} data-testid="kbd" />)
    const root = screen.getByTestId('kbd')
    expect(root.querySelectorAll('[data-slot="kbd-key"]')).toHaveLength(2)
    const separators = root.querySelectorAll('[data-slot="kbd-separator"]')
    expect(separators).toHaveLength(1)
    expect(separators[0]).toHaveTextContent('+')
    expect(separators[0]).toHaveAttribute('aria-hidden', 'true')
  })

  it('honours a custom separator', () => {
    render(<Kbd keys={['CTRL', 'C']} separator="·" data-testid="kbd" />)
    expect(
      screen.getByTestId('kbd').querySelector('[data-slot="kbd-separator"]'),
    ).toHaveTextContent('·')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Kbd className="rounded-none">K</Kbd>)
    const kbd = screen.getByText('K')
    expect(kbd).toHaveClass('rounded-none')
    expect(kbd).not.toHaveClass('rounded-2xs')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLElement>()
    render(<Kbd ref={ref}>K</Kbd>)
    expect(ref.current?.tagName).toBe('KBD')
  })

  it('exports kbdVariants so a hint can be styled without the component', () => {
    render(
      <span className={kbdVariants({ variant: 'outline', size: 'sm' })} data-testid="hint">
        ⌘K
      </span>,
    )
    expect(screen.getByTestId('hint')).toBeInTheDocument()
  })
})
