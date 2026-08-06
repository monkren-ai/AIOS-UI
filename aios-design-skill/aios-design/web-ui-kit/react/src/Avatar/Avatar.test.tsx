import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders with data-slot and the soft/md/circle defaults', () => {
    render(<Avatar fallback="ND" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('data-slot', 'avatar')
    expect(avatar).toHaveAttribute('data-variant', 'soft')
    expect(avatar).toHaveAttribute('data-size', 'md')
    expect(avatar).toHaveAttribute('data-shape', 'circle')
    expect(avatar).toHaveAttribute('data-state', 'fallback')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Avatar size={size} fallback="ND" data-testid="avatar" />)
      expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('maps the v1 default size onto md', () => {
    render(<Avatar size="default" fallback="ND" data-testid="avatar" />)
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'md')
  })

  it('renders the image slot when src is given', () => {
    render(<Avatar src="/face.png" alt="Face" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('data-state', 'image')
    expect(screen.getByAltText('Face')).toHaveAttribute('data-slot', 'avatar-image')
  })

  it('falls back to the initials when the image fails to load', () => {
    render(<Avatar src="/broken.png" fallback="ND" data-testid="avatar" />)
    fireEvent.error(screen.getByTestId('avatar').querySelector('[data-slot="avatar-image"]')!)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveAttribute('data-state', 'fallback')
    expect(avatar.querySelector('[data-slot="avatar-fallback"]')).toHaveTextContent('ND')
  })

  it('merges onto the child element with asChild', () => {
    render(
      <Avatar asChild data-testid="avatar">
        <button type="button">Me</button>
      </Avatar>,
    )
    expect(screen.getByRole('button', { name: 'Me' })).toHaveAttribute('data-slot', 'avatar')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Avatar className="rounded-none" fallback="ND" data-testid="avatar" />)
    const avatar = screen.getByTestId('avatar')
    expect(avatar).toHaveClass('rounded-none')
    expect(avatar).not.toHaveClass('rounded-full')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Avatar ref={ref} fallback="ND" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
