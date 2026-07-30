import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Card, WidgetCard } from './Card'

describe('Card', () => {
  it('renders content card with title and children', () => {
    render(
      <Card title="Card Title" data-testid="content-card">
        Card body
      </Card>,
    )
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card body')).toBeInTheDocument()
    expect(screen.getByTestId('content-card')).toHaveClass('nothing-card')
    expect(screen.getByTestId('content-card')).toHaveAttribute('data-slot', 'card')
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

    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(card, { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('renders media, logo and feature slots', () => {
    render(
      <Card
        title="Feature Card"
        logo={<span data-testid="logo">Logo</span>}
        feature={<span data-testid="feature-tag">New</span>}
        media={<div data-testid="media">Media</div>}
      >
        Body
      </Card>,
    )
    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByTestId('feature-tag')).toBeInTheDocument()
    expect(screen.getByTestId('media')).toBeInTheDocument()
  })

  it('renders borderless variant', () => {
    render(
      <Card variant="borderless" data-testid="borderless-card">
        Borderless
      </Card>,
    )
    expect(screen.getByTestId('borderless-card')).toHaveClass('nothing-card--borderless')
  })
})

describe('WidgetCard', () => {
  it('renders widget card with title, value and subtitle', () => {
    render(<WidgetCard title="Steps" value={1234} subtitle="today" data-testid="widget" />)
    expect(screen.getByText('Steps')).toBeInTheDocument()
    expect(screen.getByText('1234')).toBeInTheDocument()
    expect(screen.getByText('today')).toBeInTheDocument()
    expect(screen.getByTestId('widget')).toHaveClass('nothing-widget-card')
    expect(screen.getByTestId('widget')).toHaveAttribute('data-slot', 'widget-card')
  })

  it('calls onClick when clicked or activated by keyboard', () => {
    const handleClick = vi.fn()
    render(<WidgetCard title="Clickable" onClick={handleClick} data-testid="clickable-widget" />)
    const widget = screen.getByTestId('clickable-widget')

    fireEvent.click(widget)
    expect(handleClick).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(widget, { key: ' ' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
