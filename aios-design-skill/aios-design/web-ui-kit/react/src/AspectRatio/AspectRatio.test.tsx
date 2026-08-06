import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AspectRatio } from './AspectRatio'

describe('AspectRatio', () => {
  it('renders with data-slot', () => {
    render(<AspectRatio data-testid="ar">content</AspectRatio>)
    expect(screen.getByTestId('ar')).toHaveAttribute('data-slot', 'aspect-ratio')
  })

  it('defaults to 16 / 9 and exposes it through data-ratio', () => {
    render(<AspectRatio data-testid="ar" />)
    const root = screen.getByTestId('ar')
    expect(root).toHaveAttribute('data-ratio', String(16 / 9))
    expect(root.style.aspectRatio).toContain(String(16 / 9))
  })

  it('honours a custom ratio', () => {
    render(<AspectRatio data-testid="ar" ratio={1} />)
    expect(screen.getByTestId('ar')).toHaveAttribute('data-ratio', '1')
  })

  it('wraps children in the inner slot', () => {
    render(<AspectRatio data-testid="ar">child</AspectRatio>)
    const inner = screen.getByTestId('ar').querySelector('[data-slot="aspect-ratio-inner"]')
    expect(inner).not.toBeNull()
    expect(inner).toHaveTextContent('child')
  })

  it('lets the caller override variant defaults', () => {
    render(<AspectRatio data-testid="ar" className="w-1/2" />)
    const root = screen.getByTestId('ar')
    expect(root.className).toContain('w-1/2')
    expect(root.className).not.toContain('w-full')
  })
})
