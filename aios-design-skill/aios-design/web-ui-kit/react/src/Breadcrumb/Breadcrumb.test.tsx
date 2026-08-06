import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Breadcrumb } from './Breadcrumb'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb' },
]

describe('Breadcrumb', () => {
  it('renders with data-slot and the md default', () => {
    render(<Breadcrumb items={items} />)
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav).toHaveAttribute('data-slot', 'breadcrumb')
    expect(nav).toHaveAttribute('data-size', 'md')
    expect(nav.querySelector('[data-slot="breadcrumb-list"]')).toBeInTheDocument()
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Breadcrumb items={items} size={size} />)
      expect(screen.getByRole('navigation')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('marks the last item as the current page', () => {
    render(<Breadcrumb items={items} />)
    const current = screen.getByText('Breadcrumb').closest('[data-slot="breadcrumb-item"]')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current).toHaveAttribute('data-current', '')
  })

  it('renders links for every item but the last', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getAllByRole('link')).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  })

  it('renders a button when an item only has onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Breadcrumb items={[{ label: 'Back', onClick }, { label: 'Here' }]} />)
    const button = screen.getByRole('button', { name: 'Back' })
    expect(button).toHaveAttribute('data-slot', 'breadcrumb-link')
    await user.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders separators between items and hides them from AT', () => {
    render(<Breadcrumb items={items} separator=">" />)
    const separators = screen
      .getByRole('navigation')
      .querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators).toHaveLength(2)
    expect(separators[0]).toHaveAttribute('aria-hidden', 'true')
    expect(separators[0]).toHaveTextContent('>')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Breadcrumb items={items} className="font-body" />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('font-body')
    expect(nav).not.toHaveClass('font-mono')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLElement>()
    render(<Breadcrumb items={items} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current?.tagName).toBe('NAV')
  })
})
