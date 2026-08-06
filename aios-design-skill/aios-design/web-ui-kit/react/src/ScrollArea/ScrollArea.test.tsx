import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { ScrollArea } from './ScrollArea'

describe('ScrollArea', () => {
  // jsdom 没有 ResizeObserver，组件挂载时会用到
  beforeAll(() => {
    globalThis.ResizeObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  it('renders a data-slot for every part', () => {
    const { container } = render(<ScrollArea>Content</ScrollArea>)
    expect(container.querySelector('[data-slot="scroll-area"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="scroll-area-viewport"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="scroll-area-scrollbar"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="scroll-area-thumb"]')).toBeInTheDocument()
  })

  it('renders children inside the viewport', () => {
    const { container } = render(<ScrollArea>Scrollable body</ScrollArea>)
    expect(container.querySelector('[data-slot="scroll-area-viewport"]')).toHaveTextContent(
      'Scrollable body',
    )
  })

  it('applies the height prop as an inline style', () => {
    const { container } = render(<ScrollArea height="200px">Content</ScrollArea>)
    expect(container.querySelector('[data-slot="scroll-area"]')).toHaveStyle({ height: '200px' })
  })

  it('keeps caller styles alongside the height prop', () => {
    const { container } = render(
      <ScrollArea height="200px" style={{ width: '100px' }}>
        Content
      </ScrollArea>,
    )
    const root = container.querySelector('[data-slot="scroll-area"]')
    expect(root).toHaveStyle({ height: '200px' })
    expect(root).toHaveStyle({ width: '100px' })
  })

  it('flags dragging state while the thumb is held', () => {
    const { container } = render(<ScrollArea>Content</ScrollArea>)
    const root = container.querySelector('[data-slot="scroll-area"]')!
    const thumb = container.querySelector('[data-slot="scroll-area-thumb"]')!

    expect(root).not.toHaveAttribute('data-dragging')

    fireEvent.mouseDown(thumb, { clientY: 10 })
    expect(root).toHaveAttribute('data-dragging')

    fireEvent.mouseUp(window)
    expect(root).not.toHaveAttribute('data-dragging')
  })

  it('does not throw when the track is clicked', () => {
    const { container } = render(<ScrollArea>Content</ScrollArea>)
    const scrollbar = container.querySelector('[data-slot="scroll-area-scrollbar"]')!
    expect(() => fireEvent.click(scrollbar, { clientY: 5 })).not.toThrow()
  })

  it('lets the caller override variant defaults through className', () => {
    const { container } = render(<ScrollArea className="overflow-visible">Content</ScrollArea>)
    const root = container.querySelector('[data-slot="scroll-area"]')
    expect(root).toHaveClass('overflow-visible')
    expect(root).not.toHaveClass('overflow-hidden')
  })

  it('accepts a ref on the root', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ScrollArea ref={ref}>Content</ScrollArea>)
    expect(ref.current).toHaveAttribute('data-slot', 'scroll-area')
  })

  it('makes the viewport focusable', async () => {
    const user = userEvent.setup()
    const { container } = render(<ScrollArea>Prose with nothing focusable inside</ScrollArea>)
    const viewport = container.querySelector('[data-slot="scroll-area-viewport"]')!

    expect(viewport).toHaveAttribute('tabindex', '0')
    await user.tab()
    expect(viewport).toHaveFocus()
  })

  it('names the viewport as a region when a label is supplied', () => {
    const { container } = render(
      <ScrollArea viewportProps={{ 'aria-label': 'Release notes' }}>Content</ScrollArea>,
    )
    expect(screen.getByRole('region', { name: 'Release notes' })).toBe(
      container.querySelector('[data-slot="scroll-area-viewport"]'),
    )
  })

  it('accepts aria-labelledby just as well', () => {
    render(
      <>
        <h2 id="notes-heading">Release notes</h2>
        <ScrollArea viewportProps={{ 'aria-labelledby': 'notes-heading' }}>Content</ScrollArea>
      </>,
    )
    const region = screen.getByRole('region', { name: 'Release notes' })
    expect(document.getElementById(region.getAttribute('aria-labelledby')!)).toBeInTheDocument()
  })

  it('leaves the region role off when there is no accessible name', () => {
    const { container } = render(<ScrollArea>Content</ScrollArea>)
    expect(container.querySelector('[data-slot="scroll-area-viewport"]')).not.toHaveAttribute(
      'role',
    )
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('lets the caller reach the viewport with a ref', () => {
    const viewportRef = createRef<HTMLDivElement>()
    render(<ScrollArea viewportProps={{ ref: viewportRef }}>Content</ScrollArea>)
    expect(viewportRef.current).toHaveAttribute('data-slot', 'scroll-area-viewport')
  })

  it('calls the caller onScroll alongside the thumb maths', () => {
    const onScroll = vi.fn()
    const { container } = render(<ScrollArea viewportProps={{ onScroll }}>Content</ScrollArea>)
    fireEvent.scroll(container.querySelector('[data-slot="scroll-area-viewport"]')!)
    expect(onScroll).toHaveBeenCalled()
  })

  it('merges viewport classes without dropping the defaults', () => {
    const { container } = render(
      <ScrollArea viewportProps={{ className: 'h-auto' }}>Content</ScrollArea>,
    )
    const viewport = container.querySelector('[data-slot="scroll-area-viewport"]')
    expect(viewport).toHaveClass('h-auto')
    expect(viewport).not.toHaveClass('h-full')
    expect(viewport).toHaveClass('overflow-auto')
  })

  it('keeps forwarded props on the frame', () => {
    const { container } = render(<ScrollArea data-testid="frame">Content</ScrollArea>)
    expect(container.querySelector('[data-slot="scroll-area"]')).toHaveAttribute(
      'data-testid',
      'frame',
    )
    expect(container.querySelector('[data-slot="scroll-area-viewport"]')).not.toHaveAttribute(
      'data-testid',
    )
  })
})
