import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toolbar } from './Toolbar'

describe('Toolbar', () => {
  it('renders a toolbar role with the provided aria-label', () => {
    render(
      <Toolbar label="Formatting">
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar>,
    )
    const toolbar = screen.getByRole('toolbar')
    expect(toolbar).toHaveAttribute('aria-label', 'Formatting')
    expect(toolbar).toHaveAttribute('data-slot', 'toolbar')
  })

  it('defaults to horizontal orientation and md size', () => {
    render(
      <Toolbar label="Actions">
        <Toolbar.Button>Save</Toolbar.Button>
      </Toolbar>,
    )
    const toolbar = screen.getByRole('toolbar')
    expect(toolbar).toHaveAttribute('data-orientation', 'horizontal')
    expect(toolbar).toHaveAttribute('data-size', 'md')
  })

  it('switches to vertical orientation via data-orientation', () => {
    render(
      <Toolbar label="Side" orientation="vertical">
        <Toolbar.Button>One</Toolbar.Button>
      </Toolbar>,
    )
    expect(screen.getByRole('toolbar')).toHaveAttribute('data-orientation', 'vertical')
  })

  it('passes children through', () => {
    render(
      <Toolbar label="Actions">
        <Toolbar.Button>Cut</Toolbar.Button>
        <Toolbar.Button>Copy</Toolbar.Button>
      </Toolbar>,
    )
    expect(screen.getByRole('button', { name: 'Cut' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('propagates size from the toolbar to its buttons', () => {
    render(
      <Toolbar label="Actions" size="lg">
        <Toolbar.Button>Save</Toolbar.Button>
      </Toolbar>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveAttribute('data-slot', 'toolbar-button')
    expect(button).toHaveAttribute('data-size', 'lg')
  })

  it('lets a button override the toolbar size', () => {
    render(
      <Toolbar label="Actions" size="lg">
        <Toolbar.Button size="sm">Save</Toolbar.Button>
      </Toolbar>,
    )
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-size', 'sm')
  })

  it('exposes the pressed state through aria-pressed and data-pressed', () => {
    render(
      <Toolbar label="Formatting">
        <Toolbar.Button pressed>Bold</Toolbar.Button>
      </Toolbar>,
    )
    const button = screen.getByRole('button', { name: 'Bold' })
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveAttribute('data-pressed', '')
  })

  it('renders a separator with data-slot', () => {
    render(
      <Toolbar label="Actions">
        <Toolbar.Button>Cut</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Button>Copy</Toolbar.Button>
      </Toolbar>,
    )
    expect(screen.getByRole('separator')).toHaveAttribute('data-slot', 'toolbar-separator')
  })

  it('renders a group with data-slot', () => {
    render(
      <Toolbar label="Actions">
        <Toolbar.Group>
          <Toolbar.Button>Cut</Toolbar.Button>
        </Toolbar.Group>
      </Toolbar>,
    )
    expect(screen.getByRole('group')).toHaveAttribute('data-slot', 'toolbar-group')
  })

  it('disables every button when the toolbar is disabled', () => {
    // Base UI 的 ToolbarButton 默认 focusableWhenDisabled，禁用时用 aria-disabled 而非原生 disabled，
    // 让禁用项仍可被方向键聚焦——这是工具条的正确行为。
    render(
      <Toolbar label="Actions" disabled>
        <Toolbar.Button>Save</Toolbar.Button>
      </Toolbar>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveAttribute('data-disabled', '')
    expect(screen.getByRole('toolbar')).toHaveAttribute('data-disabled', '')
  })

  it('calls onClick when a toolbar button is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Toolbar label="Actions">
        <Toolbar.Button onClick={handleClick}>Save</Toolbar.Button>
      </Toolbar>,
    )
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('accepts ref as a plain prop pointing at the toolbar root', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Toolbar ref={ref} label="Actions">
        <Toolbar.Button>Save</Toolbar.Button>
      </Toolbar>,
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current).toHaveAttribute('data-slot', 'toolbar')
  })
})
