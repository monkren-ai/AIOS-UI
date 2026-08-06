import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/Button'
import { ButtonGroup } from './ButtonGroup'

describe('ButtonGroup', () => {
  it('renders a group with data-slot and the horizontal default', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('data-slot', 'button-group')
    expect(group).toHaveAttribute('data-orientation', 'horizontal')
    expect(group).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('supports vertical orientation', () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('data-orientation', 'vertical')
    expect(group).toHaveAttribute('aria-orientation', 'vertical')
    expect(group).toHaveClass('flex-col')
  })

  it('renders its children', () => {
    render(
      <ButtonGroup>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('propagates size to Button children', () => {
    render(
      <ButtonGroup size="lg">
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('data-size', 'lg')
    expect(buttons[1]).toHaveAttribute('data-size', 'lg')
  })

  it('lets a child keep its own size', () => {
    render(
      <ButtonGroup size="sm">
        <Button size="lg">A</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
  })

  it('renders a separator between adjacent buttons', () => {
    render(
      <ButtonGroup separator={<span data-testid="sep" />}>
        <Button>A</Button>
        <Button>B</Button>
        <Button>C</Button>
      </ButtonGroup>,
    )
    expect(screen.getAllByTestId('sep')).toHaveLength(2)
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <ButtonGroup ref={ref}>
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
