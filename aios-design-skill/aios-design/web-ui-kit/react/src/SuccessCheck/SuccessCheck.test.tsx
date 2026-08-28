import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SuccessCheck } from './SuccessCheck'

describe('SuccessCheck', () => {
  it('renders idle by default with the done label', () => {
    render(<SuccessCheck />)
    const root = screen.getByRole('img', { name: '[DONE]' })
    expect(root).toHaveAttribute('data-slot', 'success-check')
    expect(root).toHaveAttribute('data-state', 'idle')
    expect(root).toHaveAttribute('data-size', 'md')
  })

  it('draws the check when active', () => {
    render(<SuccessCheck active />)
    expect(screen.getByRole('img')).toHaveAttribute('data-state', 'active')
    expect(document.querySelector('[data-slot="success-check-mark"]')).toBeInTheDocument()
  })

  it('hides the label when null is passed', () => {
    render(<SuccessCheck label={null} />)
    expect(document.querySelector('[data-slot="success-check-label"]')).not.toBeInTheDocument()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<SuccessCheck ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
