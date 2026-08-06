import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Command, type CommandGroup } from './Command'

const groups: CommandGroup[] = [
  {
    heading: 'Actions',
    items: [
      { id: 'new', label: 'New file', shortcut: '⌘N' },
      { id: 'open', label: 'Open file' },
    ],
  },
  {
    heading: 'Danger',
    items: [{ id: 'del', label: 'Delete file', disabled: true }],
  },
]

describe('Command', () => {
  it('renders with data-slot', () => {
    render(<Command groups={groups} />)
    expect(screen.getByRole('dialog')).toHaveAttribute('data-slot', 'command')
  })

  it('renders the input, list and every item', () => {
    render(<Command groups={groups} />)
    const root = screen.getByRole('dialog')
    expect(root.querySelector('[data-slot="command-input"]')).not.toBeNull()
    expect(root.querySelector('[data-slot="command-list"]')).not.toBeNull()
    expect(root.querySelectorAll('[data-slot="command-item"]')).toHaveLength(3)
  })

  it('renders group headings', () => {
    render(<Command groups={groups} />)
    expect(screen.getByText('Actions')).toHaveAttribute('data-slot', 'command-group-heading')
  })

  it('renders shortcuts and icons', () => {
    render(<Command groups={groups} />)
    const root = screen.getByRole('dialog')
    expect(root.querySelector('[data-slot="command-item-shortcut"]')).toHaveTextContent('⌘N')
  })

  it('defaults to the md size and the closed state', () => {
    render(<Command groups={groups} />)
    const root = screen.getByRole('dialog')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-state', 'closed')
  })

  it('reflects the open state', () => {
    render(<Command groups={groups} open />)
    expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open')
  })

  it('filters items by the query', () => {
    render(<Command groups={groups} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'open' } })
    expect(screen.getByRole('dialog').querySelectorAll('[data-slot="command-item"]')).toHaveLength(
      1,
    )
  })

  it('shows the empty message when nothing matches', () => {
    render(<Command groups={groups} emptyMessage="Nothing here" />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzz' } })
    expect(screen.getByText('Nothing here')).toHaveAttribute('data-slot', 'command-empty')
  })

  it('marks the highlighted item through data-selected', () => {
    render(<Command groups={groups} />)
    const items = screen.getByRole('dialog').querySelectorAll('[data-slot="command-item"]')
    expect(items[0]).toHaveAttribute('data-selected', '')
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowDown' })
    expect(items[1]).toHaveAttribute('data-selected', '')
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowUp' })
    expect(items[0]).toHaveAttribute('data-selected', '')
  })

  it('marks disabled items through data-disabled', () => {
    render(<Command groups={groups} />)
    const items = screen.getByRole('dialog').querySelectorAll('[data-slot="command-item"]')
    expect(items[2]).toHaveAttribute('data-disabled', '')
    expect(items[2]).toHaveAttribute('aria-disabled', 'true')
  })

  it('calls onSelect on click', () => {
    const onSelect = vi.fn()
    render(<Command groups={[{ items: [{ id: 'a', label: 'Run', onSelect }] }]} />)
    fireEvent.click(screen.getByRole('dialog').querySelector('[data-slot="command-item"]')!)
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('calls onSelect on Enter', () => {
    const onSelect = vi.fn()
    render(<Command groups={[{ items: [{ id: 'a', label: 'Run', onSelect }] }]} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('does not select disabled items', () => {
    const onSelect = vi.fn()
    render(<Command groups={[{ items: [{ id: 'a', label: 'Run', onSelect, disabled: true }] }]} />)
    fireEvent.click(screen.getByRole('dialog').querySelector('[data-slot="command-item"]')!)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('closes on Escape', () => {
    const onOpenChange = vi.fn()
    render(<Command groups={groups} open onOpenChange={onOpenChange} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('lets the caller override variant defaults', () => {
    render(<Command groups={groups} className="rounded-none" />)
    const root = screen.getByRole('dialog')
    expect(root.className).toContain('rounded-none')
    expect(root.className).not.toContain('rounded-lg')
  })
})
