import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders a semantic-token content card', () => {
    render(<Card title="Title" footer="Footer" data-testid="card">Body</Card>)
    expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'card')
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'card-title')
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
  it('supports keyboard activation', () => {
    const onClick = vi.fn()
    render(<Card interactive onClick={onClick} data-testid="card">Open</Card>)
    fireEvent.keyDown(screen.getByTestId('card'), { key: 'Enter' })
    expect(onClick).toHaveBeenCalledOnce()
  })
  it('accepts ref as a prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
