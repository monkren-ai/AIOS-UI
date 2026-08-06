import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TextAnimate } from './TextAnimate'
import { textAnimateVariants } from './text-animate-variants'

const segmentsOf = (container: HTMLElement) =>
  container.querySelectorAll('[data-slot="text-animate-segment"]')

describe('TextAnimate', () => {
  it('renders with data-slot and data-mode', () => {
    const { container } = render(<TextAnimate mode="char">x</TextAnimate>)
    expect(container.firstChild as HTMLElement).toHaveAttribute('data-slot', 'text-animate')
    expect(container.firstChild as HTMLElement).toHaveAttribute('data-mode', 'char')
  })

  it('splits into words by default', () => {
    const { container } = render(<TextAnimate>one two three</TextAnimate>)
    expect(segmentsOf(container)).toHaveLength(3)
  })

  it('splits into characters in char mode', () => {
    const { container } = render(<TextAnimate mode="char">ab</TextAnimate>)
    expect(segmentsOf(container)).toHaveLength(2)
  })

  it('splits on newlines in line mode', () => {
    const { container } = render(
      <TextAnimate mode="line">{'first line\nsecond line\nthird line'}</TextAnimate>,
    )
    expect(segmentsOf(container)).toHaveLength(3)
  })

  it('renders the chosen tag through the as prop', () => {
    const { container } = render(<TextAnimate as="span">hi</TextAnimate>)
    expect((container.firstChild as HTMLElement).tagName).toBe('SPAN')
  })

  it('applies a motion-reduce fallback so segments stay visible', () => {
    const { container } = render(<TextAnimate>x</TextAnimate>)
    const seg = container.querySelector('[data-slot="text-animate-segment"]') as HTMLElement
    expect(seg.className).toContain('motion-reduce')
  })

  it('loops the reveal when once is false', () => {
    const { container } = render(<TextAnimate once={false}>hi</TextAnimate>)
    const seg = container.querySelector('[data-slot="text-animate-segment"]') as HTMLElement
    expect(seg.className).toContain('infinite')
    expect(seg.className).not.toMatch(/_1_both/)
  })

  it('exports textAnimateVariants for direct use', () => {
    expect(typeof textAnimateVariants).toBe('function')
  })
})
