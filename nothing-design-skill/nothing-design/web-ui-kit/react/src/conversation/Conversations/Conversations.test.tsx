import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Conversations } from './Conversations'

describe('Conversations', () => {
  const items = [
    { key: '1', label: 'Chat A', meta: '2 messages' },
    { key: '2', label: 'Chat B' },
  ]

  it('renders root with data-slot', () => {
    render(<Conversations items={items} />)
    expect(document.querySelector('[data-slot="conversations"]')).toBeInTheDocument()
    expect(document.querySelectorAll('[data-slot="conversations-item"]')).toHaveLength(2)
  })

  it('renders header and footer', () => {
    render(<Conversations items={items} header="Header" footer="Footer" />)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('activates defaultActiveKey', () => {
    render(<Conversations items={items} defaultActiveKey="2" />)
    const activeItem = document.querySelector('[data-active="true"]')
    expect(activeItem).toHaveTextContent('Chat B')
  })

  it('calls onActiveChange when item clicked', () => {
    const handleChange = vi.fn()
    render(<Conversations items={items} onActiveChange={handleChange} />)
    fireEvent.click(screen.getByText('Chat B'))
    expect(handleChange).toHaveBeenCalledWith('2')
  })

  it('does not call onActiveChange for disabled items', () => {
    const handleChange = vi.fn()
    const disabledItems = [{ key: '1', label: 'Disabled', disabled: true }]
    render(<Conversations items={disabledItems} onActiveChange={handleChange} />)
    const item = screen.getByRole('tab', { name: 'Disabled' })
    expect(item).toBeDisabled()
    fireEvent.click(item)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports controlled activeKey', () => {
    const { rerender } = render(<Conversations items={items} activeKey="1" />)
    expect(document.querySelector('[data-active="true"]')).toHaveTextContent('Chat A')
    rerender(<Conversations items={items} activeKey="2" />)
    expect(document.querySelector('[data-active="true"]')).toHaveTextContent('Chat B')
  })

  it('renders item actions', () => {
    const actionItems = [
      { key: '1', label: 'Chat A', actions: <span data-testid="action">Delete</span> },
    ]
    render(<Conversations items={actionItems} />)
    expect(screen.getByTestId('action')).toHaveTextContent('Delete')
  })

  it('applies semantic classNames', () => {
    render(<Conversations items={items} classNames={{ root: 'custom-root', item: 'custom-item' }} />)
    expect(document.querySelector('[data-slot="conversations"]')).toHaveClass('custom-root')
    expect(document.querySelector('[data-slot="conversations-item"]')).toHaveClass('custom-item')
  })
})
