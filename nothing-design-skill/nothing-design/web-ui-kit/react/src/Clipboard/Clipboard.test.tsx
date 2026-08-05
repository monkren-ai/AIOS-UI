import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Clipboard } from './Clipboard'

const demoItems = [
  { text: 'first entry', time: new Date('2026-01-01T10:00:00Z') },
  { text: 'second entry', time: new Date('2026-01-01T11:00:00Z') },
]

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

describe('Clipboard', () => {
  it('renders with data-slot', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} />)
    expect(screen.getByTestId('cb')).toHaveAttribute('data-slot', 'clipboard')
  })

  it('defaults to the md size and the idle state', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} />)
    const root = screen.getByTestId('cb')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-state', 'idle')
  })

  it('exposes the requested size', () => {
    render(<Clipboard data-testid="cb" size="lg" demoItems={demoItems} />)
    expect(screen.getByTestId('cb')).toHaveAttribute('data-size', 'lg')
  })

  it('renders one item per entry with the item slot', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} />)
    expect(screen.getByTestId('cb').querySelectorAll('[data-slot="clipboard-item"]')).toHaveLength(
      2,
    )
  })

  it('shows the count against maxItems', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} maxItems={5} />)
    expect(
      screen.getByTestId('cb').querySelector('[data-slot="clipboard-count"]'),
    ).toHaveTextContent('2/5')
  })

  it('truncates long text', () => {
    render(
      <Clipboard
        data-testid="cb"
        truncateLength={5}
        demoItems={[{ text: 'abcdefghij', time: new Date() }]}
      />,
    )
    expect(
      screen.getByTestId('cb').querySelector('[data-slot="clipboard-text"]'),
    ).toHaveTextContent('abcde...')
  })

  it('copies on click and marks the row through data-copied', async () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} />)
    const items = screen.getByTestId('cb').querySelectorAll('[data-slot="clipboard-item"]')
    fireEvent.click(items[0])
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('first entry')
    await waitFor(() => expect(items[0]).toHaveAttribute('data-copied', ''))
    expect(screen.getByTestId('cb')).toHaveAttribute('data-state', 'copied')
  })

  it('copies on Enter', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} />)
    const items = screen.getByTestId('cb').querySelectorAll('[data-slot="clipboard-item"]')
    fireEvent.keyDown(items[1], { key: 'Enter' })
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('second entry')
  })

  it('deletes a single item without copying it', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} />)
    const root = screen.getByTestId('cb')
    const del = root.querySelectorAll('[data-slot="clipboard-delete"]')[0]
    fireEvent.click(del)
    expect(root.querySelectorAll('[data-slot="clipboard-item"]')).toHaveLength(1)
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
  })

  it('clears every item', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} />)
    const root = screen.getByTestId('cb')
    fireEvent.click(root.querySelector('[data-slot="clipboard-clear"]')!)
    expect(root.querySelectorAll('[data-slot="clipboard-item"]')).toHaveLength(0)
    expect(root.querySelector('[data-slot="clipboard-clear"]')).toBeNull()
  })

  it('lets the caller override variant defaults', () => {
    render(<Clipboard data-testid="cb" demoItems={demoItems} className="rounded-none" />)
    const root = screen.getByTestId('cb')
    expect(root.className).toContain('rounded-none')
    expect(root.className).not.toContain('rounded-lg')
  })
})
