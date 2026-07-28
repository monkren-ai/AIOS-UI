import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Bubble, BubbleList } from './index'

describe('Bubble', () => {
  it('renders with content', () => {
    render(<Bubble content="Hello" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders data-slot attributes', () => {
    render(<Bubble content="Hello" />)
    expect(document.querySelector('[data-slot="bubble"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="bubble-content"]')).toHaveTextContent('Hello')
  })

  it('supports end placement', () => {
    render(<Bubble content="Hello" placement="end" />)
    const bubble = document.querySelector('[data-slot="bubble"]')
    expect(bubble).toHaveClass('nothing-bubble--end')
    expect(bubble).toHaveAttribute('data-placement', 'end')
  })

  it('renders avatar, header, footer, extra', () => {
    render(
      <Bubble
        content="Hello"
        avatar={<span>A</span>}
        header={<span data-testid="header">Header</span>}
        footer={<span data-testid="footer">Footer</span>}
        extra={<span data-testid="extra">Extra</span>}
      />,
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('extra')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="bubble-avatar"]')).toHaveTextContent('A')
  })

  it('applies semantic classNames', () => {
    render(<Bubble content="Hello" classNames={{ content: 'custom-content' }} />)
    expect(document.querySelector('[data-slot="bubble-content"]')).toHaveClass('custom-content')
  })

  it('renders loading state', () => {
    render(<Bubble content="Hello" loading />)
    expect(document.querySelector('.nothing-bubble__loading')).toBeInTheDocument()
  })

  it('typing renders text progressively', async () => {
    render(<Bubble content="Hello" typing={{ step: 1, interval: 10 }} />)
    await waitFor(() => expect(screen.getByText('Hello')).toBeInTheDocument(), { timeout: 200 })
  })
})

describe('BubbleList', () => {
  it('renders items', () => {
    const items = [
      { key: '1', role: 'user' as const, content: 'User message' },
      { key: '2', role: 'ai' as const, content: 'AI message' },
    ]
    render(<BubbleList items={items} />)
    expect(screen.getByText('User message')).toBeInTheDocument()
    expect(screen.getByText('AI message')).toBeInTheDocument()
  })

  it('applies role config', () => {
    const items = [{ key: '1', role: 'user' as const, content: 'User message' }]
    render(<BubbleList items={items} role={{ user: { placement: 'end' } }} />)
    const bubble = document.querySelector('[data-slot="bubble"]')
    expect(bubble).toHaveClass('nothing-bubble--end')
  })

  it('calls onScroll when provided', () => {
    const items = [{ key: '1', content: 'Hello' }]
    const handleScroll = vi.fn()
    render(<BubbleList items={items} onScroll={handleScroll} />)
    const list = document.querySelector('[data-slot="bubble-list"]')
    list?.dispatchEvent(new Event('scroll', { bubbles: true }))
    expect(handleScroll).toHaveBeenCalled()
  })
})
