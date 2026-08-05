import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThoughtChain } from './ThoughtChain'

describe('ThoughtChain', () => {
  it('renders items with data-slot', () => {
    const items = [{ key: '1', title: 'Step 1' }]
    render(<ThoughtChain items={items} />)
    expect(document.querySelector('[data-slot="thought-chain"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="thought-chain-item"]')).toBeInTheDocument()
    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })

  it('expands and collapses item', () => {
    const items = [{ key: '1', title: 'Step 1', content: 'Details' }]
    render(<ThoughtChain items={items} />)
    const header = document.querySelector('[data-slot="thought-chain-item-header"]')
    expect(
      document.querySelector('[data-slot="thought-chain-item-content"]'),
    ).not.toBeInTheDocument()
    fireEvent.click(header!)
    expect(document.querySelector('[data-slot="thought-chain-item-content"]')).toHaveTextContent(
      'Details',
    )
    fireEvent.click(header!)
    expect(
      document.querySelector('[data-slot="thought-chain-item-content"]'),
    ).not.toBeInTheDocument()
  })

  it('calls onExpand when toggled', () => {
    const handleExpand = vi.fn()
    const items = [{ key: '1', title: 'Step 1', content: 'Details' }]
    render(<ThoughtChain items={items} onExpand={handleExpand} />)
    const header = document.querySelector('[data-slot="thought-chain-item-header"]')
    fireEvent.click(header!)
    expect(handleExpand).toHaveBeenCalledWith(['1'])
  })

  it('supports controlled expandedKeys', () => {
    const items = [{ key: '1', title: 'Step 1', content: 'Details' }]
    const { rerender } = render(<ThoughtChain items={items} expandedKeys={[]} />)
    expect(
      document.querySelector('[data-slot="thought-chain-item-content"]'),
    ).not.toBeInTheDocument()
    rerender(<ThoughtChain items={items} expandedKeys={['1']} />)
    expect(document.querySelector('[data-slot="thought-chain-item-content"]')).toBeInTheDocument()
  })

  it('renders different statuses', () => {
    const items = [
      { key: '1', title: 'Pending', status: 'pending' as const },
      { key: '2', title: 'Active', status: 'active' as const },
      { key: '3', title: 'Success', status: 'success' as const },
      { key: '4', title: 'Error', status: 'error' as const },
    ]
    render(<ThoughtChain items={items} />)
    items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('applies semantic classNames', () => {
    const items = [{ key: '1', title: 'Step 1' }]
    render(<ThoughtChain items={items} classNames={{ root: 'custom-root' }} />)
    expect(document.querySelector('[data-slot="thought-chain"]')).toHaveClass('custom-root')
  })
})
