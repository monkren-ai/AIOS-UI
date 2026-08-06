import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from './Toast'
import { toastVariants } from './toast-variants'

const SEVERITIES = ['info', 'success', 'warning', 'error'] as const

describe('Toast', () => {
  it('renders with data-slot, inline placement and role=status', () => {
    render(<Toast label="SAVED">saved</Toast>)
    const el = screen.getByRole('status')
    expect(el).toHaveAttribute('data-slot', 'toast')
    expect(el).toHaveAttribute('data-placement', 'inline')
    expect(el).toHaveAttribute('data-severity', 'info')
  })

  it('reports every severity through data-severity', () => {
    SEVERITIES.forEach((severity) => {
      const { unmount } = render(<Toast severity={severity}>msg</Toast>)
      expect(screen.getByRole('status')).toHaveAttribute('data-severity', severity)
      unmount()
    })
  })

  it('renders the bracket label in the [ LABEL ] idiom', () => {
    render(<Toast label="ERROR">boom</Toast>)
    expect(screen.getByText('[', { exact: false })).toBeInTheDocument()
    expect(screen.getByText(/ERROR/)).toBeInTheDocument()
  })

  it('stays in the document flow — no fixed / absolute / portal', () => {
    const { container } = render(<Toast>saved</Toast>)
    const el = container.firstChild as HTMLElement
    expect(el.className).not.toMatch(/\bfixed\b/)
    expect(el.className).not.toMatch(/\babsolute\b/)
    // 渲染在调用处的容器里，没有被搬运到 body 下
    expect(container.querySelector('[data-slot="toast"]')).toBe(el)
  })

  it('calls onDismiss from the close button', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(
      <Toast label="SAVED" onDismiss={onDismiss}>
        saved
      </Toast>,
    )
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not auto-dismiss by default (duration=0)', () => {
    vi.useFakeTimers()
    const onDismiss = vi.fn()
    render(<Toast onDismiss={onDismiss}>saved</Toast>)
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(onDismiss).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('auto-calls onDismiss after duration but keeps itself mounted', () => {
    vi.useFakeTimers()
    const onDismiss = vi.fn()
    const { container } = render(
      <Toast duration={1000} onDismiss={onDismiss}>
        saved
      </Toast>,
    )
    expect(onDismiss).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(onDismiss).toHaveBeenCalledTimes(1)
    // 改造要点：组件自己不卸载，卸载由调用方决定
    expect(container.querySelector('[data-slot="toast"]')).not.toBeNull()
    vi.useRealTimers()
  })

  it('exports toastVariants for direct use', () => {
    expect(typeof toastVariants).toBe('function')
  })
})
