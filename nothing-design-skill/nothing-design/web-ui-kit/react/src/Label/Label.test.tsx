import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from './Label'
import { labelVariants } from './label-variants'

const slot = (name: string) => document.querySelector(`[data-slot="${name}"]`)

describe('Label', () => {
  it('renders with data-slot and the md default', () => {
    render(<Label>Email</Label>)
    const label = slot('label')
    expect(label).toHaveAttribute('data-size', 'md')
    expect(label).not.toHaveAttribute('data-disabled')
    expect(screen.getByText('Email')).toHaveAttribute('data-slot', 'label-text')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Label size={size}>Field</Label>)
      expect(slot('label')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('marks the required asterisk as decorative', () => {
    render(<Label required>Email</Label>)
    expect(slot('label')).toHaveAttribute('data-required')
    const asterisk = slot('label-required')
    expect(asterisk).toHaveTextContent('*')
    expect(asterisk).toHaveAttribute('aria-hidden', 'true')
  })

  it('flags the disabled state', () => {
    render(<Label disabled>Email</Label>)
    expect(slot('label')).toHaveAttribute('data-disabled')
  })

  it('associates itself with a control through htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Email</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Label className="text-base">Email</Label>)
    const label = slot('label')
    expect(label).toHaveClass('text-base')
    expect(label).not.toHaveClass('text-label')
  })

  it('exports labelVariants so a plain span can look like a label', () => {
    render(<span className={labelVariants({ size: 'sm' })}>Standalone</span>)
    expect(screen.getByText('Standalone')).toHaveClass('font-mono')
  })
})
