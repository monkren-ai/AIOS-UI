import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TOC } from './TOC'

const items = [
  { id: 'intro', label: 'Intro', level: 1 },
  { id: 'body', label: 'Body', level: 2 },
  { id: 'end', label: 'End', level: 2 },
]

describe('TOC', () => {
  it('renders every item as an anchor inside a nav with data-slot', () => {
    render(<TOC items={items} activeId="intro" />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('data-slot', 'toc')
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute('data-slot', 'toc-item')
    expect(links[0]).toHaveAttribute('href', '#intro')
    expect(links[1]).toHaveAttribute('href', '#body')
  })

  it('indents items by level', () => {
    render(<TOC items={items} activeId="intro" />)
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveClass('ps-3') // level 1
    expect(links[1]).toHaveClass('ps-6') // level 2
  })

  it('marks the active item with data-active, aria-current and a left bar', () => {
    render(<TOC items={items} activeId="body" />)
    const links = screen.getAllByRole('link')
    expect(links[1]).toHaveAttribute('data-active')
    expect(links[1]).toHaveAttribute('aria-current', 'location')
    expect(links[1].querySelector('[data-slot="toc-item-bar"]')).toBeTruthy()
    expect(links[0]).not.toHaveAttribute('data-active')
    expect(links[0].querySelector('[data-slot="toc-item-bar"]')).toBeNull()
  })

  it('scrolls the target into view on click and reports onActiveChange', async () => {
    const user = userEvent.setup()
    const onActiveChange = vi.fn()
    // jsdom 没有实现 scrollIntoView，挂一个 mock 上去。
    const scrollIntoView = vi.fn()
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    })
    render(
      <div>
        <div id="intro" />
        <div id="body" />
        <div id="end" />
        <TOC items={items} activeId="intro" onActiveChange={onActiveChange} />
      </div>,
    )
    await user.click(screen.getByRole('link', { name: 'Body' }))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(onActiveChange).toHaveBeenCalledWith('body')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLElement>()
    render(<TOC items={items} activeId="intro" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
