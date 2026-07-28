import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Prompts } from './Prompts'

describe('Prompts', () => {
  const items = [
    { key: '1', title: 'Hello', description: 'Say hello', icon: '👋' },
    { key: '2', title: 'Help', description: 'Get help' },
  ]

  it('renders root with data-slot', () => {
    render(<Prompts items={items} />)
    expect(document.querySelector('[data-slot="prompts"]')).toBeInTheDocument()
    expect(document.querySelectorAll('[data-slot="prompts-item"]')).toHaveLength(2)
  })

  it('renders title', () => {
    render(<Prompts items={items} title="Suggested prompts" />)
    expect(screen.getByText('Suggested prompts')).toBeInTheDocument()
  })

  it('renders icon, title and description', () => {
    render(<Prompts items={items} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Say hello')).toBeInTheDocument()
    expect(screen.getByText('👋')).toBeInTheDocument()
  })

  it('calls onItemClick with item and index when clicked', () => {
    const handleClick = vi.fn()
    render(<Prompts items={items} onItemClick={handleClick} />)
    fireEvent.click(screen.getByText('Hello'))
    expect(handleClick).toHaveBeenCalledWith(items[0], 0)
  })

  it('triggers click on Enter key', () => {
    const handleClick = vi.fn()
    render(<Prompts items={items} onItemClick={handleClick} />)
    const firstItem = document.querySelectorAll('[data-slot="prompts-item"]')[0]
    fireEvent.keyDown(firstItem, { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledWith(items[0], 0)
  })

  it('triggers click on Space key', () => {
    const handleClick = vi.fn()
    render(<Prompts items={items} onItemClick={handleClick} />)
    const firstItem = document.querySelectorAll('[data-slot="prompts-item"]')[0]
    fireEvent.keyDown(firstItem, { key: ' ' })
    expect(handleClick).toHaveBeenCalledWith(items[0], 0)
  })

  it('does not trigger click for disabled items', () => {
    const handleClick = vi.fn()
    const disabledItems = [{ key: '1', title: 'Disabled', disabled: true }]
    render(<Prompts items={disabledItems} onItemClick={handleClick} />)
    const item = screen.getByRole('button', { name: 'Disabled' })
    expect(item).toBeDisabled()
    fireEvent.click(item)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies layout class', () => {
    render(<Prompts items={items} layout="list" />)
    expect(document.querySelector('[data-slot="prompts"]')).toHaveClass('nothing-prompts--list')
  })

  it('applies semantic classNames', () => {
    render(<Prompts items={items} classNames={{ root: 'custom-root', item: 'custom-item' }} />)
    expect(document.querySelector('[data-slot="prompts"]')).toHaveClass('custom-root')
    expect(document.querySelector('[data-slot="prompts-item"]')).toHaveClass('custom-item')
  })
})
