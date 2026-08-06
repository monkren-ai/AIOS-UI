import * as React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { CopyButton } from './CopyButton'

const writeText = vi.fn()

describe('CopyButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    writeText.mockReset()
    writeText.mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
      writable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with data-slot and a bilingual aria-label', () => {
    render(<CopyButton value="abc" />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-slot', 'copy-button')
    expect(button).toHaveAttribute('data-state', 'idle')
    expect(button).toHaveAttribute('aria-label', '复制 Copy')
  })

  it('copies the value, flashes [COPIED], then reverts after 1.5s', async () => {
    const onCopy = vi.fn()
    render(
      <CopyButton value="abc123" onCopy={onCopy}>
        Copy
      </CopyButton>,
    )
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(writeText).toHaveBeenCalledWith('abc123')
    expect(onCopy).toHaveBeenCalledWith(true)
    expect(screen.getByText('[COPIED]')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1500)
    })
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('shows [ERROR] and reports failure when clipboard rejects', async () => {
    writeText.mockRejectedValueOnce(new Error('denied'))
    const onCopy = vi.fn()
    render(
      <CopyButton value="x" onCopy={onCopy}>
        Copy
      </CopyButton>,
    )
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(onCopy).toHaveBeenCalledWith(false)
    expect(screen.getByText('[ERROR]')).toBeInTheDocument()
  })

  it('does not copy when disabled', async () => {
    render(
      <CopyButton value="x" disabled>
        Copy
      </CopyButton>,
    )
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(writeText).not.toHaveBeenCalled()
  })

  it('lets the caller override the copied / error text', async () => {
    render(
      <CopyButton value="x" copiedText="[已复制]" errorText="[出错]">
        Copy
      </CopyButton>,
    )
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByText('[已复制]')).toBeInTheDocument()

    writeText.mockRejectedValueOnce(new Error('denied'))
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByText('[出错]')).toBeInTheDocument()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<CopyButton value="x" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
