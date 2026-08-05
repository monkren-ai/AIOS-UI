import type * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Resizable } from './Resizable'

function renderPair(props: Partial<React.ComponentProps<typeof Resizable>> = {}) {
  return render(
    <Resizable data-testid="resizable" {...props}>
      <div>A</div>
      <div>B</div>
    </Resizable>,
  )
}

describe('Resizable', () => {
  it('renders with data-slot and the default direction', () => {
    renderPair()
    const root = screen.getByTestId('resizable')
    expect(root).toHaveAttribute('data-slot', 'resizable')
    expect(root).toHaveAttribute('data-direction', 'horizontal')
  })

  it('renders one panel per child', () => {
    renderPair()
    expect(
      screen.getByTestId('resizable').querySelectorAll('[data-slot="resizable-panel"]'),
    ).toHaveLength(2)
  })

  it('renders one handle between panels', () => {
    renderPair()
    const handles = screen.getAllByRole('separator')
    expect(handles).toHaveLength(1)
    expect(handles[0]).toHaveAttribute('data-slot', 'resizable-handle')
  })

  it('exposes vertical orientation on the handle', () => {
    renderPair({ direction: 'vertical' })
    expect(screen.getByTestId('resizable')).toHaveAttribute('data-direction', 'vertical')
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('splits evenly by default', () => {
    renderPair()
    const panels = screen
      .getByTestId('resizable')
      .querySelectorAll<HTMLElement>('[data-slot="resizable-panel"]')
    expect(panels[0].style.flexBasis).toBe('50%')
  })

  it('honours initialSizes', () => {
    renderPair({ initialSizes: [30, 70] })
    const panels = screen
      .getByTestId('resizable')
      .querySelectorAll<HTMLElement>('[data-slot="resizable-panel"]')
    expect(panels[0].style.flexBasis).toBe('30%')
    expect(panels[1].style.flexBasis).toBe('70%')
  })

  it('resizes with the arrow keys', () => {
    renderPair({ initialSizes: [50, 50] })
    const handle = screen.getByRole('separator')
    fireEvent.keyDown(handle, { key: 'ArrowRight' })
    expect(handle).toHaveAttribute('aria-valuenow', '52')
    fireEvent.keyDown(handle, { key: 'ArrowLeft' })
    expect(handle).toHaveAttribute('aria-valuenow', '50')
  })

  it('ignores unrelated keys', () => {
    renderPair({ initialSizes: [50, 50] })
    const handle = screen.getByRole('separator')
    fireEvent.keyDown(handle, { key: 'Enter' })
    expect(handle).toHaveAttribute('aria-valuenow', '50')
  })

  it('marks the handle active while dragging', () => {
    renderPair()
    const handle = screen.getByRole('separator')
    fireEvent.mouseDown(handle, { clientX: 0 })
    expect(handle).toHaveAttribute('data-active', '')
    fireEvent.mouseUp(document)
    expect(handle).not.toHaveAttribute('data-active')
  })

  it('lets the caller override variant defaults', () => {
    renderPair({ className: 'h-40' })
    const root = screen.getByTestId('resizable')
    expect(root.className).toContain('h-40')
    expect(root.className).not.toContain('h-full')
  })
})
