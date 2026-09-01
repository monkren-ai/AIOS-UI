import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { StreamingText } from './StreamingText'

afterEach(() => vi.useRealTimers())

describe('StreamingText', () => {
  it('renders the initial value as settled text', () => {
    render(<StreamingText>Hello</StreamingText>)
    expect(screen.getByText('Hello')).toHaveAttribute('data-slot', 'streaming-text')
    expect(document.querySelector('[data-slot="streaming-text-segment"]')).toBeNull()
  })

  it('animates only appended tokens and folds them after settling', () => {
    vi.useFakeTimers()
    const { rerender } = render(<StreamingText>Hello</StreamingText>)
    rerender(<StreamingText>Hello world</StreamingText>)
    expect(document.querySelector('[data-slot="streaming-text-segment"]')).toHaveTextContent(
      'world',
    )
    act(() => vi.advanceTimersByTime(800))
    expect(document.querySelector('[data-slot="streaming-text-segment"]')).toBeNull()
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('replaces truncated content without replaying animation', () => {
    const { rerender } = render(<StreamingText>Long answer</StreamingText>)
    rerender(<StreamingText>Short</StreamingText>)
    expect(screen.getByText('Short')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="streaming-text-segment"]')).toBeNull()
  })

  it('renders plain streams without animated segments', () => {
    const { rerender } = render(<StreamingText variant="plain">A</StreamingText>)
    rerender(<StreamingText variant="plain">A B</StreamingText>)
    expect(screen.getByText('A B')).toHaveAttribute('data-variant', 'plain')
    expect(document.querySelector('[data-slot="streaming-text-segment"]')).toBeNull()
  })

  it('shows a hidden-from-assistive-tech caret while streaming', () => {
    render(<StreamingText streaming>Hello</StreamingText>)
    expect(screen.getByText('Hello')).toHaveAttribute('aria-busy', 'true')
    expect(document.querySelector('[data-slot="streaming-text-caret"]')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })
})
