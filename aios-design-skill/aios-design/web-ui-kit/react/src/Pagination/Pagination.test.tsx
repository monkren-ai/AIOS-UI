import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders with data-slot', () => {
    const { container } = render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(container.querySelector('[data-slot="pagination"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="pagination-list"]')).toBeInTheDocument()
  })

  it('renders nothing when there is a single page', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('marks the current page with aria-current and data-active', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />)
    const current = screen.getByRole('button', { name: 'Page 3' })
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current).toHaveAttribute('data-active')
  })

  it('calls onPageChange when a page is clicked', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Page 3' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('does not fire when clicking the already active page', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Page 2' }))
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('disables the previous arrow on the first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    const previous = screen.getByRole('button', { name: 'Previous page' })
    expect(previous).toBeDisabled()
    expect(previous).toHaveAttribute('data-disabled')
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled()
  })

  it('disables the next arrow on the last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled()
  })

  it('steps pages through the arrow buttons', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('renders ellipsis placeholders for long ranges', () => {
    const { container } = render(<Pagination page={10} totalPages={40} onPageChange={vi.fn()} />)
    expect(container.querySelectorAll('[data-slot="pagination-ellipsis"]')).toHaveLength(2)
  })

  it('moves pages with the arrow keys in LTR', () => {
    const onPageChange = vi.fn()
    const { container } = render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)
    const nav = container.querySelector('[data-slot="pagination"]')!

    fireEvent.keyDown(nav, { key: 'ArrowRight' })
    expect(onPageChange).toHaveBeenCalledWith(4)

    fireEvent.keyDown(nav, { key: 'ArrowLeft' })
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('mirrors arrow-key direction under RTL', () => {
    const onPageChange = vi.fn()
    const { container } = render(
      <div dir="rtl">
        <Pagination page={3} totalPages={5} onPageChange={onPageChange} />
      </div>,
    )
    const nav = container.querySelector('[data-slot="pagination"]')!

    fireEvent.keyDown(nav, { key: 'ArrowLeft' })
    expect(onPageChange).toHaveBeenCalledWith(4)

    fireEvent.keyDown(nav, { key: 'ArrowRight' })
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('exposes page state through data attributes', () => {
    const { container } = render(<Pagination page={2} totalPages={7} onPageChange={vi.fn()} />)
    const nav = container.querySelector('[data-slot="pagination"]')
    expect(nav).toHaveAttribute('data-page', '2')
    expect(nav).toHaveAttribute('data-total', '7')
  })

  it('lets the caller override variant defaults through className', () => {
    const { container } = render(
      <Pagination page={1} totalPages={5} onPageChange={vi.fn()} className="text-base" />,
    )
    const nav = container.querySelector('[data-slot="pagination"]')
    expect(nav).toHaveClass('text-base')
    expect(nav).not.toHaveClass('text-sm')
  })

  it('accepts a ref on the root', () => {
    const ref = createRef<HTMLElement>()
    render(<Pagination ref={ref} page={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(ref.current).toHaveAttribute('data-slot', 'pagination')
  })
})
