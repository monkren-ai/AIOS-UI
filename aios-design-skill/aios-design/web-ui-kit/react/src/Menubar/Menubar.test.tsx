import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Menubar } from './Menubar'

describe('Menubar', () => {
  it('opens a menu and invokes an action', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<Menubar items={[{ label: 'File', items: [{ label: 'Open', onClick: onOpen }] }]} />)
    expect(screen.getByRole('menubar')).toHaveAttribute('data-slot', 'menubar')
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Open' })).toBeInTheDocument())
    await user.click(screen.getByRole('menuitem', { name: 'Open' }))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('reports vertical orientation', () => {
    render(<Menubar orientation="vertical" items={[{ label: 'File', items: [] }]} />)
    expect(screen.getByRole('menubar')).toHaveAttribute('data-orientation', 'vertical')
  })
})
