import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tag, Tags } from './Tag'

describe('Tag', () => {
  it('renders with data-slot', () => {
    render(<Tag>Label</Tag>)
    expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'tag')
  })

  it('renders technical variant class and data attribute', () => {
    render(<Tag variant="technical">Technical</Tag>)
    const tag = screen.getByRole('button')
    expect(tag).toHaveClass('nothing-tag--technical')
    expect(tag).toHaveAttribute('data-variant', 'technical')
  })

  it('renders active state class and data attribute', () => {
    render(<Tag active>Active</Tag>)
    const tag = screen.getByRole('button')
    expect(tag).toHaveClass('nothing-tag--active')
    expect(tag).toHaveAttribute('data-active', '')
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Tag disabled onClick={onClick}>
        Disabled
      </Tag>,
    )
    const tag = screen.getByRole('button')
    expect(tag).toHaveAttribute('data-disabled', '')
    expect(tag).toHaveAttribute('tabIndex', '-1')
    await user.click(tag)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Tag onClick={onClick}>Clickable</Tag>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when pressing Enter', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Tag onClick={onClick}>Keyboard</Tag>)
    const tag = screen.getByRole('button')
    tag.focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders remove button and calls onRemove', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(
      <Tag removable onRemove={onRemove}>
        Removable
      </Tag>,
    )
    const removeButton = screen.getByRole('button', { name: 'Remove' })
    expect(removeButton).toBeInTheDocument()
    await user.click(removeButton)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('supports custom className', () => {
    render(<Tag className="custom-tag">Custom</Tag>)
    const tag = screen.getByRole('button')
    expect(tag).toHaveClass('custom-tag')
    expect(tag).toHaveClass('nothing-tag')
  })

  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Tag ref={ref}>Ref</Tag>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(ref.current?.tagName).toBe('SPAN')
  })
})

describe('Tags', () => {
  it('renders children', () => {
    render(
      <Tags>
        <Tag>One</Tag>
        <Tag>Two</Tag>
      </Tags>,
    )
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('supports custom className and ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Tags className="custom-tags" ref={ref}>
        <Tag>Child</Tag>
      </Tags>,
    )
    expect(ref.current).toHaveClass('custom-tags')
    expect(ref.current).toHaveClass('nothing-tags')
  })

  it('applies proximity mode class', () => {
    render(
      <Tags proximity>
        <Tag>One</Tag>
        <Tag>Two</Tag>
      </Tags>,
    )
    const tags = screen.getByText('One').closest('.nothing-tags')
    expect(tags).toHaveClass('nothing-tags--proximity')
  })
})
