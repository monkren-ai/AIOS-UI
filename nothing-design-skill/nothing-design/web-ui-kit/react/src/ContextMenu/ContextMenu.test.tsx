import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContextMenu } from './ContextMenu'

function makeItems() {
  return [
    { label: 'Cut', onClick: vi.fn(), shortcut: '⌘X' },
    { label: 'Copy', onClick: vi.fn(), separator: true },
    { label: 'Paste', onClick: vi.fn(), disabled: true },
  ]
}

describe('ContextMenu', () => {
  it('renders the trigger wrapper and stays closed', () => {
    const { container } = render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    const root = container.querySelector('[data-slot="context-menu"]')
    expect(root).toHaveAttribute('data-state', 'closed')
    expect(container.querySelector('[data-slot="context-menu-trigger"]')).toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens on contextmenu and marks the parts with data-slot', async () => {
    const { container } = render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )

    fireEvent.contextMenu(screen.getByText('Right click me'), { clientX: 20, clientY: 30 })
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    const content = screen.getByRole('menu')
    expect(content).toHaveAttribute('data-slot', 'context-menu-content')
    expect(content).toHaveAttribute('data-state', 'open')
    expect(content).toHaveStyle({ top: '30px', left: '20px' })
    expect(container.querySelector('[data-slot="context-menu"]')).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(screen.getAllByRole('menuitem')).toHaveLength(3)
    expect(document.querySelector('[data-slot="context-menu-separator"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="context-menu-item-shortcut"]')).toHaveTextContent(
      '⌘X',
    )
  })

  it('runs the item callback and closes', async () => {
    const user = userEvent.setup()
    const items = makeItems()
    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>,
    )

    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())

    await user.click(screen.getByRole('menuitem', { name: /Cut/ }))
    expect(items[0].onClick).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('marks a disabled item and never fires its callback', async () => {
    const items = makeItems()
    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>,
    )

    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())

    const disabled = screen.getByRole('menuitem', { name: 'Paste' })
    expect(disabled).toHaveAttribute('data-disabled')
    expect(disabled).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(disabled)
    expect(items[2].onClick).not.toHaveBeenCalled()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('exposes the trigger as a keyboard-reachable menu opener', () => {
    render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    const trigger = document.querySelector('[data-slot="context-menu-trigger"]')!
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('tabindex', '0')
  })

  it('flips aria-expanded while open', async () => {
    render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    const trigger = document.querySelector('[data-slot="context-menu-trigger"]')!
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'))
  })

  it('opens on Shift+F10 and on the ContextMenu key', async () => {
    render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    const trigger = document.querySelector('[data-slot="context-menu-trigger"]') as HTMLElement

    fireEvent.keyDown(trigger, { key: 'F10', shiftKey: true })
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())

    fireEvent.keyDown(trigger, { key: 'ContextMenu' })
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())
  })

  it('moves focus to the first enabled item on open', async () => {
    render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /Cut/ })).toHaveFocus())
  })

  it('restores focus to the previously focused element on Escape', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <ContextMenu items={makeItems()}>
          <div>Right click me</div>
        </ContextMenu>
      </>,
    )
    const before = screen.getByRole('button', { name: 'Before' })
    before.focus()

    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /Cut/ })).toHaveFocus())

    await user.keyboard('{Escape}')
    await waitFor(() => expect(before).toHaveFocus())
  })

  it('restores focus after selecting an item and after an outside click', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <ContextMenu items={makeItems()}>
          <div>Right click me</div>
        </ContextMenu>
      </>,
    )
    const before = screen.getByRole('button', { name: 'Before' })

    before.focus()
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())
    await user.click(screen.getByRole('menuitem', { name: /Cut/ }))
    await waitFor(() => expect(before).toHaveFocus())

    before.focus()
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())
    fireEvent.mouseDown(document.body)
    await waitFor(() => expect(before).toHaveFocus())
  })

  it('falls back to the trigger when nothing was focused before opening', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    const trigger = document.querySelector('[data-slot="context-menu-trigger"]')!

    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())
    await user.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('keeps Tab inside the menu and skips disabled items', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <ContextMenu items={makeItems()}>
          <div>Right click me</div>
        </ContextMenu>
        <button type="button">After</button>
      </>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /Cut/ })).toHaveFocus())

    await user.tab()
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toHaveFocus()
    // 只有两个可用项，第三次 Tab 必须绕回第一项而不是走到 After 按钮上。
    await user.tab()
    expect(screen.getByRole('menuitem', { name: /Cut/ })).toHaveFocus()
    await user.tab({ shift: true })
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toHaveFocus()
    expect(screen.getByRole('menuitem', { name: 'Paste' })).not.toHaveFocus()
  })

  it('keeps disabled items out of arrow navigation and the tab order', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu items={makeItems()}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /Cut/ })).toHaveFocus())

    expect(screen.getByRole('menuitem', { name: 'Paste' })).toHaveAttribute('tabindex', '-1')

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: /Cut/ })).toHaveFocus()
  })

  it('fires the callback exactly once on Enter', async () => {
    const user = userEvent.setup()
    const items = makeItems()
    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: /Cut/ })).toHaveFocus())

    await user.keyboard('{Enter}')
    expect(items[0].onClick).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('renders a standalone { separator: true } as a rule and not as a menuitem', async () => {
    render(
      <ContextMenu
        items={[
          { label: 'Cut', onClick: vi.fn() },
          { separator: true },
          { label: 'Paste', onClick: vi.fn() },
        ]}
      >
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())

    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
    expect(screen.getAllByRole('separator')).toHaveLength(1)
    expect(document.querySelectorAll('[data-slot="context-menu-separator"]')).toHaveLength(1)
    // 独立分隔线不是菜单项：既不占 role 也不进 tab 序列。
    expect(screen.getByRole('separator')).not.toHaveAttribute('tabindex')
  })

  it('steps arrow keys and the Tab cycle over a standalone separator', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu
        items={[
          { label: 'Cut', onClick: vi.fn() },
          { separator: true },
          { label: 'Paste', onClick: vi.fn() },
        ]}
      >
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus())

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Paste' })).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('menuitem', { name: 'Paste' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus()
  })

  it('does not make a leading separator the initial focus target', async () => {
    render(
      <ContextMenu items={[{ separator: true }, { label: 'Cut', onClick: vi.fn() }]}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveFocus())
    expect(screen.getByRole('menuitem', { name: 'Cut' })).toHaveAttribute('tabindex', '0')
  })

  it('keeps focus on the menu body when every entry is a separator or disabled', async () => {
    render(
      <ContextMenu items={[{ separator: true }, { label: 'Paste', disabled: true }]}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus())
  })

  it('still renders the deprecated flag form as an item plus a rule below it', async () => {
    render(
      <ContextMenu
        items={[
          { label: 'Add to queue', separator: true, onClick: vi.fn() },
          { label: 'Remove', onClick: vi.fn() },
        ]}
      >
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument())

    expect(screen.getAllByRole('menuitem').map((el) => el.textContent)).toEqual([
      'Add to queue',
      'Remove',
    ])
    expect(screen.getAllByRole('separator')).toHaveLength(1)
    const rows = screen.getByRole('menu').children
    expect(rows[1]).toHaveAttribute('data-slot', 'context-menu-separator')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <ContextMenu items={makeItems()} ref={ref}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
