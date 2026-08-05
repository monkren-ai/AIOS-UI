import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Card, WidgetCard } from './Card'

describe('Card', () => {
  it('renders with data-slot and the soft/md/rounded defaults', () => {
    render(
      <Card title="Card Title" data-testid="content-card">
        Card body
      </Card>,
    )
    const card = screen.getByTestId('content-card')
    expect(screen.getByText('Card Title')).toHaveAttribute('data-slot', 'card-title')
    expect(screen.getByText('Card body')).toBeInTheDocument()
    expect(card).toHaveAttribute('data-slot', 'card')
    expect(card).toHaveAttribute('data-variant', 'soft')
    expect(card).toHaveAttribute('data-size', 'md')
    expect(card).toHaveAttribute('data-shape', 'rounded')
  })

  it('maps the v1 variant aliases onto variant, size and shape', () => {
    const cases = [
      { legacy: 'default', variant: 'soft', size: 'md', shape: 'rounded' },
      { legacy: 'raised', variant: 'secondary', size: 'md', shape: 'rounded' },
      { legacy: 'borderless', variant: 'ghost', size: 'md', shape: 'rounded' },
      { legacy: 'compact', variant: 'soft', size: 'sm', shape: 'rounded' },
      { legacy: 'technical', variant: 'soft', size: 'md', shape: 'technical' },
    ] as const

    cases.forEach(({ legacy, variant, size, shape }) => {
      const { unmount } = render(
        <Card variant={legacy} data-testid="card">
          Body
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('data-variant', variant)
      expect(card).toHaveAttribute('data-size', size)
      expect(card).toHaveAttribute('data-shape', shape)
      unmount()
    })
  })

  it('supports interactive mode and keyboard activation', () => {
    const handleClick = vi.fn()
    render(
      <Card interactive onClick={handleClick} data-testid="interactive-card">
        Click me
      </Card>,
    )
    const card = screen.getByTestId('interactive-card')
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(card).toHaveAttribute('data-interactive', '')
    expect(card).toHaveAttribute('data-state', 'interactive')

    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(card, { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('does not activate a disabled interactive card', () => {
    const handleClick = vi.fn()
    render(
      <Card interactive disabled onClick={handleClick} data-testid="disabled-card">
        Disabled
      </Card>,
    )
    const card = screen.getByTestId('disabled-card')
    expect(card).toHaveAttribute('data-state', 'disabled')
    expect(card).not.toHaveAttribute('tabIndex')
    fireEvent.click(card)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders media, logo, feature and footer in their own slots', () => {
    render(
      <Card
        title="Feature Card"
        logo={<span data-testid="logo">Logo</span>}
        feature={<span data-testid="feature-tag">New</span>}
        media={<div data-testid="media">Media</div>}
        footer={<span data-testid="footer">Footer</span>}
        data-testid="card"
      >
        Body
      </Card>,
    )
    const card = screen.getByTestId('card')
    expect(screen.getByTestId('logo').closest('[data-slot="card-logo"]')).toBeInTheDocument()
    expect(
      screen.getByTestId('feature-tag').closest('[data-slot="card-feature"]'),
    ).toBeInTheDocument()
    expect(screen.getByTestId('media').closest('[data-slot="card-media"]')).toBeInTheDocument()
    expect(screen.getByTestId('footer').closest('[data-slot="card-footer"]')).toBeInTheDocument()
    expect(card.querySelector('[data-slot="card-body"]')).toHaveTextContent('Body')
  })

  it('calls onAction from the header action button', () => {
    const onAction = vi.fn()
    render(
      <Card title="With action" action="More" onAction={onAction}>
        Body
      </Card>,
    )
    const action = screen.getByRole('button', { name: 'More' })
    expect(action).toHaveAttribute('data-slot', 'card-action')
    fireEvent.click(action)
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(
      <Card className="rounded-none" data-testid="card">
        Squared
      </Card>,
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('rounded-none')
    expect(card).not.toHaveClass('rounded-card')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('WidgetCard', () => {
  it('renders title, value and subtitle in their own slots', () => {
    render(<WidgetCard title="Steps" value={1234} subtitle="today" data-testid="widget" />)
    const widget = screen.getByTestId('widget')
    expect(widget).toHaveAttribute('data-slot', 'widget-card')
    expect(widget).toHaveAttribute('data-size', 'square')
    expect(widget).toHaveAttribute('data-widget-theme', 'dark')
    expect(screen.getByText('Steps')).toHaveAttribute('data-slot', 'widget-card-title')
    expect(screen.getByText('1234')).toHaveAttribute('data-slot', 'widget-card-value')
    expect(screen.getByText('today')).toHaveAttribute('data-slot', 'widget-card-subtitle')
  })

  it('keeps the widget palette out of the global data-theme attribute', () => {
    render(<WidgetCard title="Light" theme="light" data-testid="widget" />)
    const widget = screen.getByTestId('widget')
    expect(widget).not.toHaveAttribute('data-theme')
    expect(widget).toHaveAttribute('data-widget-theme', 'light')
  })

  it('accepts sm/md/lg as aliases for the v1 form factors', () => {
    ;(
      [
        ['sm', 'tall'],
        ['md', 'square'],
        ['lg', 'wide'],
      ] as const
    ).forEach(([alias, format]) => {
      const { unmount } = render(<WidgetCard size={alias} data-testid="widget" />)
      expect(screen.getByTestId('widget')).toHaveAttribute('data-size', format)
      unmount()
    })
  })

  it('calls onClick when clicked or activated by keyboard', () => {
    const handleClick = vi.fn()
    render(<WidgetCard title="Clickable" onClick={handleClick} data-testid="clickable-widget" />)
    const widget = screen.getByTestId('clickable-widget')
    expect(widget).toHaveAttribute('role', 'button')

    fireEvent.click(widget)
    expect(handleClick).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(widget, { key: ' ' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('renders the icon slot next to the value', () => {
    render(
      <WidgetCard
        value={42}
        icon={<span data-testid="widget-icon">*</span>}
        iconPosition="left"
        data-testid="widget"
      />,
    )
    expect(
      screen.getByTestId('widget-icon').closest('[data-slot="widget-card-icon"]'),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('widget').querySelector('[data-slot="widget-card-row"]'),
    ).toBeInTheDocument()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<WidgetCard ref={ref} title="Ref" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
