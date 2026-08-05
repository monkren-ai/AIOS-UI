import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders with data-slot and the horizontal/md defaults', () => {
    render(<Separator />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveAttribute('data-slot', 'separator')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(separator).toHaveAttribute('data-size', 'md')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('reports the vertical orientation', () => {
    render(<Separator orientation="vertical" />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
    expect(separator).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Separator size={size} />)
      expect(screen.getByRole('separator')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('hides decorative separators from the accessibility tree', () => {
    render(<Separator decorative data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('separator')).toBeNull()
  })

  it('renders a label between two lines', () => {
    render(<Separator label="OR" data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('data-labeled', '')
    expect(screen.getByText('OR')).toHaveAttribute('data-slot', 'separator-label')
    expect(separator.querySelectorAll('[data-slot="separator-line"]')).toHaveLength(2)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Separator className="w-px" data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('w-px')
    expect(separator).not.toHaveClass('w-full')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Separator ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
