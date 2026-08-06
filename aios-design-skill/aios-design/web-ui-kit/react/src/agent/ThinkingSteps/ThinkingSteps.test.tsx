import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ThinkingSteps } from './ThinkingSteps'

const steps = [
  { id: '1', title: 'Analyze input' },
  { id: '2', title: 'Search memory', content: 'Checking long-term context' },
  { id: '3', title: 'Formulate response' },
]

describe('ThinkingSteps', () => {
  it('renders with data-slot', () => {
    render(<ThinkingSteps steps={steps} />)
    expect(screen.getByText('THINKING').closest('[data-slot]')).toHaveAttribute(
      'data-slot',
      'thinking-steps',
    )
  })

  it('renders title and progress count', () => {
    render(<ThinkingSteps steps={steps} title="THOUGHTS" />)
    expect(screen.getByText('THOUGHTS')).toBeInTheDocument()
    expect(screen.getByText('01/03')).toBeInTheDocument()
  })

  it('renders all step titles and content', () => {
    render(<ThinkingSteps steps={steps} />)
    expect(screen.getByText('Analyze input')).toBeInTheDocument()
    expect(screen.getByText('Search memory')).toBeInTheDocument()
    expect(screen.getByText('Checking long-term context')).toBeInTheDocument()
    expect(screen.getByText('Formulate response')).toBeInTheDocument()
  })

  it('renders status classes and data attributes', () => {
    render(<ThinkingSteps steps={steps} activeIndex={1} />)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveClass('aios-thinking-steps__item--done')
    expect(items[0]).toHaveAttribute('data-status', 'done')
    expect(items[1]).toHaveClass('aios-thinking-steps__item--thinking')
    expect(items[1]).toHaveAttribute('data-status', 'thinking')
    expect(items[2]).toHaveClass('aios-thinking-steps__item--pending')
  })

  it('renders status labels', () => {
    render(<ThinkingSteps steps={steps} activeIndex={1} />)
    expect(screen.getByText('[DONE]')).toBeInTheDocument()
    expect(screen.getByText('[THINKING]')).toBeInTheDocument()
    expect(screen.getByText('[PENDING]')).toBeInTheDocument()
  })

  it('supports compact variant', () => {
    render(<ThinkingSteps steps={steps} compact />)
    expect(screen.getByText('THINKING').closest('[data-slot]')).toHaveClass(
      'aios-thinking-steps--compact',
    )
  })

  it('supports controlled activeIndex', () => {
    const { rerender } = render(<ThinkingSteps steps={steps} activeIndex={0} />)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveAttribute('data-status', 'thinking')

    rerender(<ThinkingSteps steps={steps} activeIndex={2} />)
    expect(screen.getAllByRole('listitem')[2]).toHaveAttribute('data-status', 'thinking')
    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('data-status', 'done')
  })

  it('auto-advances active index', async () => {
    const onStepChange = vi.fn()
    render(<ThinkingSteps steps={steps} autoAdvance interval={100} onStepChange={onStepChange} />)

    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('data-status', 'thinking')

    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith(1), { timeout: 300 })
    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith(2), { timeout: 500 })
  })

  it('loops when loop is true', async () => {
    const onStepChange = vi.fn()
    render(
      <ThinkingSteps steps={steps} autoAdvance interval={50} loop onStepChange={onStepChange} />,
    )

    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith(1), { timeout: 200 })
    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith(2), { timeout: 300 })
    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith(0), { timeout: 400 })
  })

  it('supports custom className', () => {
    render(<ThinkingSteps steps={steps} className="custom-steps" />)
    const root = screen.getByText('THINKING').closest('[data-slot]')
    expect(root).toHaveClass('custom-steps')
    expect(root).toHaveClass('aios-thinking-steps')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ThinkingSteps steps={steps} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
