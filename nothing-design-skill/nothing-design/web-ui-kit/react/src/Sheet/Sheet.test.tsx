import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sheet } from './Sheet'

describe('Sheet', () => {
  it('does not render when closed', () => {
    render(<Sheet open={false}>Content</Sheet>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders with data-slot and the right/default side', () => {
    render(
      <Sheet open title="Filters">
        Content
      </Sheet>,
    )
    const panel = screen.getByRole('dialog')
    expect(panel).toHaveAttribute('data-slot', 'sheet')
    expect(panel).toHaveAttribute('data-side', 'right')
    expect(panel).toHaveAttribute('data-state', 'open')
    expect(panel).toHaveAttribute('aria-modal', 'true')
    expect(document.querySelector('[data-slot="sheet-backdrop"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="sheet-header"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="sheet-title"]')).toHaveTextContent('Filters')
    expect(document.querySelector('[data-slot="sheet-body"]')).toHaveTextContent('Content')
  })

  it('reports every side through data-side', () => {
    ;(['left', 'right', 'top', 'bottom'] as const).forEach((side) => {
      const { unmount } = render(
        <Sheet open side={side}>
          Content
        </Sheet>,
      )
      expect(screen.getByRole('dialog')).toHaveAttribute('data-side', side)
      unmount()
    })
  })

  it('flags the full-bleed variant', () => {
    render(
      <Sheet open full>
        Content
      </Sheet>,
    )
    expect(screen.getByRole('dialog')).toHaveAttribute('data-full')
  })

  it('calls onOpenChange when the close button is used', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Sheet open onOpenChange={onOpenChange}>
        Content
      </Sheet>,
    )
    const close = screen.getByRole('button', { name: 'Close' })
    expect(close).toHaveAttribute('data-slot', 'sheet-close')
    await user.click(close)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders the bottom-sheet handle and Done button when sections are supplied', () => {
    render(<Sheet open side="bottom" sections={[{ title: 'Sort', content: <div>Newest</div> }]} />)
    expect(document.querySelector('[data-slot="sheet-handle"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="sheet-handle-bar"]')).toBeInTheDocument()
    // 按钮上写着 Done，读屏就该念 Done —— 之前它被 aria-label 改口成了 Close。
    expect(screen.getByRole('button', { name: 'Done' })).toHaveTextContent('Done')
    expect(document.querySelector('[data-slot="sheet-section-title"]')).toHaveTextContent('Sort')
    expect(screen.getByText('Newest')).toBeInTheDocument()
  })

  it('names the drawer from its title', () => {
    render(
      <Sheet open title="Filters">
        Content
      </Sheet>,
    )
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument()
  })

  it('lets a caller-supplied aria-label name an untitled drawer', () => {
    render(
      <Sheet open aria-label="Quick settings">
        Content
      </Sheet>,
    )
    expect(screen.getByRole('dialog', { name: 'Quick settings' })).toBeInTheDocument()
  })

  it('renders the footer when supplied', () => {
    render(
      <Sheet open footer={<button>Apply</button>}>
        Content
      </Sheet>,
    )
    expect(document.querySelector('[data-slot="sheet-footer"]')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(
      <Sheet open className="rounded-none">
        Content
      </Sheet>,
    )
    const panel = screen.getByRole('dialog')
    expect(panel).toHaveClass('rounded-none')
    expect(panel).not.toHaveClass('rounded-s-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Sheet open ref={ref}>
        Content
      </Sheet>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
