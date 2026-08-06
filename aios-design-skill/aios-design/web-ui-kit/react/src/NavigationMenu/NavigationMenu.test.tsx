import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NavigationMenu } from './NavigationMenu'

const items = [
  { label: 'Home', href: '#home', active: true },
  {
    label: 'Products',
    // 有 href 才能被键盘聚焦，方向键用例依赖这一点
    href: '#products',
    children: [
      { label: 'Phone', href: '#phone' },
      { label: 'Ear', href: '#ear' },
    ],
  },
  { label: 'About', href: '#about' },
]

describe('NavigationMenu', () => {
  it('renders with data-slot', () => {
    const { container } = render(<NavigationMenu items={items} />)
    expect(container.querySelector('[data-slot="navigation-menu"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="navigation-menu-list"]')).toBeInTheDocument()
  })

  it('uses menubar role when horizontal and menu role when vertical', () => {
    const { rerender } = render(<NavigationMenu items={items} />)
    expect(screen.getByRole('menubar')).toBeInTheDocument()

    rerender(<NavigationMenu items={items} orientation="vertical" />)
    expect(screen.getAllByRole('menu').length).toBeGreaterThan(0)
  })

  it('exposes orientation through data-orientation', () => {
    const { container } = render(<NavigationMenu items={items} orientation="vertical" />)
    expect(container.querySelector('[data-slot="navigation-menu"]')).toHaveAttribute(
      'data-orientation',
      'vertical',
    )
  })

  it('marks the active item', () => {
    const { container } = render(<NavigationMenu items={items} />)
    const active = container.querySelectorAll('[data-slot="navigation-menu-item"][data-active]')
    expect(active).toHaveLength(1)
    expect(active[0]).toHaveTextContent('Home')
  })

  it('renders a caret only for items with children', () => {
    const { container } = render(<NavigationMenu items={items} />)
    expect(container.querySelectorAll('[data-slot="navigation-menu-caret"]')).toHaveLength(1)
  })

  it('toggles the submenu open state on click', () => {
    const { container } = render(<NavigationMenu items={items} />)
    const trigger = screen.getByRole('menuitem', { name: /Products/ })
    const submenu = container.querySelector('[data-slot="navigation-menu-submenu"]')!

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(submenu).not.toHaveAttribute('data-open')

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(submenu).toHaveAttribute('data-open')

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('calls onClick for leaf items', () => {
    const onClick = vi.fn()
    render(<NavigationMenu items={[{ label: 'Solo', onClick }]} />)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Solo' }))
    expect(onClick).toHaveBeenCalled()
  })

  it('closes the submenu on Escape', () => {
    const { container } = render(<NavigationMenu items={items} />)
    const trigger = screen.getByRole('menuitem', { name: /Products/ })

    fireEvent.click(trigger)
    expect(container.querySelector('[data-slot="navigation-menu-submenu"]')).toHaveAttribute(
      'data-open',
    )

    fireEvent.keyDown(trigger, { key: 'Escape' })
    expect(container.querySelector('[data-slot="navigation-menu-submenu"]')).not.toHaveAttribute(
      'data-open',
    )
  })

  it('moves focus with horizontal arrow keys', () => {
    render(<NavigationMenu items={items} />)
    const home = screen.getByRole('menuitem', { name: 'Home' })
    const products = screen.getByRole('menuitem', { name: /Products/ })

    home.focus()
    fireEvent.keyDown(home, { key: 'ArrowRight' })
    expect(products).toHaveFocus()

    fireEvent.keyDown(products, { key: 'ArrowLeft' })
    expect(home).toHaveFocus()
  })

  it('mirrors horizontal arrow keys under RTL', () => {
    render(
      <div dir="rtl">
        <NavigationMenu items={items} />
      </div>,
    )
    const home = screen.getByRole('menuitem', { name: 'Home' })
    const products = screen.getByRole('menuitem', { name: /Products/ })

    home.focus()
    fireEvent.keyDown(home, { key: 'ArrowLeft' })
    expect(products).toHaveFocus()

    fireEvent.keyDown(products, { key: 'ArrowRight' })
    expect(home).toHaveFocus()
  })

  it('opens the submenu with ArrowDown when horizontal', () => {
    const { container } = render(<NavigationMenu items={items} />)
    const trigger = screen.getByRole('menuitem', { name: /Products/ })

    fireEvent.keyDown(trigger, { key: 'ArrowDown' })
    expect(container.querySelector('[data-slot="navigation-menu-submenu"]')).toHaveAttribute(
      'data-open',
    )
  })

  it('invokes a submenu item and closes the menu', () => {
    const onClick = vi.fn()
    const { container } = render(
      <NavigationMenu items={[{ label: 'Products', children: [{ label: 'Phone', onClick }] }]} />,
    )

    fireEvent.click(screen.getByRole('menuitem', { name: /Products/ }))
    fireEvent.click(screen.getByRole('menuitem', { name: 'Phone' }))

    expect(onClick).toHaveBeenCalled()
    expect(container.querySelector('[data-slot="navigation-menu-submenu"]')).not.toHaveAttribute(
      'data-open',
    )
  })

  it('lets the caller override variant defaults through className', () => {
    const { container } = render(<NavigationMenu items={items} className="text-base" />)
    const nav = container.querySelector('[data-slot="navigation-menu"]')
    expect(nav).toHaveClass('text-base')
    expect(nav).not.toHaveClass('text-sm')
  })

  it('accepts a ref on the root', () => {
    const ref = createRef<HTMLElement>()
    render(<NavigationMenu ref={ref} items={items} />)
    expect(ref.current).toHaveAttribute('data-slot', 'navigation-menu')
  })
})
