import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Thumbnail } from './Thumbnail'

describe('Thumbnail', () => {
  it('renders with data-slot and the md/card/square defaults', () => {
    render(<Thumbnail data-testid="thumbnail" />)
    const thumbnail = screen.getByTestId('thumbnail')
    expect(thumbnail).toHaveAttribute('data-slot', 'thumbnail')
    expect(thumbnail).toHaveAttribute('data-size', 'md')
    expect(thumbnail).toHaveAttribute('data-rounded', 'card')
    expect(thumbnail).toHaveAttribute('data-state', 'fallback')
  })

  it('renders the image slot when src is given', () => {
    render(<Thumbnail src="/photo.png" alt="A photo" data-testid="thumbnail" />)
    const thumbnail = screen.getByTestId('thumbnail')
    expect(thumbnail).toHaveAttribute('data-state', 'image')
    expect(screen.getByAltText('A photo')).toHaveAttribute('data-slot', 'thumbnail-img')
  })

  it('falls back to the dot matrix when the image fails to load', () => {
    render(<Thumbnail src="/broken.png" alt="A photo" data-testid="thumbnail" />)
    fireEvent.error(screen.getByTestId('thumbnail').querySelector('[data-slot="thumbnail-img"]')!)
    const thumbnail = screen.getByTestId('thumbnail')
    expect(thumbnail).toHaveAttribute('data-state', 'fallback')
    expect(thumbnail.querySelector('[data-slot="thumbnail-fallback"]')).toBeTruthy()
    expect(thumbnail.querySelector('[data-slot="thumbnail-dots"]')).toBeTruthy()
  })

  it('renders a custom fallback when provided', () => {
    render(
      <Thumbnail
        fallback={<span data-testid="custom-fallback">N/A</span>}
        data-testid="thumbnail"
      />,
    )
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
  })

  it('reports size, rounded and ratio through data attributes', () => {
    render(
      <Thumbnail size="lg" rounded="none" ratio="16:9" data-testid="thumbnail" />,
    )
    const thumbnail = screen.getByTestId('thumbnail')
    expect(thumbnail).toHaveAttribute('data-size', 'lg')
    expect(thumbnail).toHaveAttribute('data-rounded', 'none')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Thumbnail className="rounded-none" data-testid="thumbnail" />)
    const thumbnail = screen.getByTestId('thumbnail')
    expect(thumbnail).toHaveClass('rounded-none')
    expect(thumbnail).not.toHaveClass('rounded-card')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Thumbnail ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
