import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Reasoning, ReasoningGroup } from './Reasoning'

afterEach(() => vi.useRealTimers())

describe('Reasoning', () => {
  it('renders status, details, and data slots', () => {
    render(
      <Reasoning status="running" subject="src/App.tsx" defaultOpen>
        Inspecting the route
      </Reasoning>,
    )
    expect(screen.getByText('src/App.tsx').closest('[data-slot="reasoning"]')).toHaveAttribute(
      'data-status',
      'running',
    )
    expect(screen.getByText('Inspecting the route')).toBeInTheDocument()
    expect(screen.getByLabelText('运行中 / Running')).toBeInTheDocument()
  })

  it('supports controlled disclosure', async () => {
    const onOpenChange = vi.fn()
    render(
      <Reasoning open={false} onOpenChange={onOpenChange}>
        Details
      </Reasoning>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByText('Details')).not.toBeInTheDocument()
  })

  it('collapses when running completes', () => {
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <Reasoning status="running" defaultOpen collapseOnComplete onOpenChange={onOpenChange}>
        Details
      </Reasoning>,
    )
    rerender(
      <Reasoning status="finished" defaultOpen collapseOnComplete onOpenChange={onOpenChange}>
        Details
      </Reasoning>,
    )
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.queryByText('Details')).not.toBeInTheDocument()
  })
})

describe('ReasoningGroup', () => {
  it('reveals rows progressively and completes once', () => {
    vi.useFakeTimers()
    const onComplete = vi.fn()
    render(
      <ReasoningGroup stream startDelay={100} stepInterval={100} onComplete={onComplete}>
        <span>One</span>
        <span>Two</span>
      </ReasoningGroup>,
    )
    expect(screen.queryByText('One')).not.toBeInTheDocument()
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByText('One')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByText('Two')).toBeInTheDocument()
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
