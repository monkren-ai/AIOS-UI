import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PreviewCard } from './PreviewCard'

describe('PreviewCard', () => {
  it('renders with data-slot and the default/md variants', () => {
    render(<PreviewCard title="Title" data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('data-slot', 'preview-card')
    expect(card).toHaveAttribute('data-variant', 'default')
    expect(card).toHaveAttribute('data-size', 'md')
  })

  it('renders the title and description', () => {
    render(<PreviewCard title="Engine OS" description="A lightweight runtime" />)
    expect(screen.getByText('Engine OS')).toHaveAttribute(
      'data-slot',
      'preview-card-title',
    )
    expect(screen.getByText('A lightweight runtime')).toHaveAttribute(
      'data-slot',
      'preview-card-description',
    )
  })

  it('renders the media thumbnail when image is given', () => {
    render(
      <PreviewCard title="Title" image="/cover.png" imageAlt="Cover" data-testid="card" />,
    )
    const card = screen.getByTestId('card')
    expect(card.querySelector('[data-slot="preview-card-media"]')).toBeTruthy()
    expect(screen.getByAltText('Cover')).toHaveAttribute('data-slot', 'thumbnail-img')
  })

  it('omits the media zone when no image is given', () => {
    render(<PreviewCard title="Title" data-testid="card" />)
    expect(
      screen.getByTestId('card').querySelector('[data-slot="preview-card-media"]'),
    ).toBeNull()
  })

  it('renders the footer when provided', () => {
    render(
      <PreviewCard
        title="Title"
        footer={<span data-testid="footer">Actions</span>}
      />,
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('reports variant and size through data attributes', () => {
    render(<PreviewCard title="Title" variant="raised" size="lg" data-testid="card" />)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('data-variant', 'raised')
    expect(card).toHaveAttribute('data-size', 'lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<PreviewCard title="Title" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
