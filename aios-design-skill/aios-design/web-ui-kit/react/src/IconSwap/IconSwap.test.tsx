import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IconSwap } from './IconSwap'

describe('IconSwap', () => {
  it('shows the first child by default', () => {
    render(
      <IconSwap>
        <span>Off</span>
        <span>On</span>
      </IconSwap>,
    )
    const root = document.querySelector('[data-slot="icon-swap"]')
    expect(root).toHaveAttribute('data-active', '0')
    expect(root).toHaveAttribute('data-size', 'md')
    const layers = document.querySelectorAll('[data-slot="icon-swap-layer"]')
    expect(layers[0]).toHaveAttribute('data-active')
    expect(layers[1]).not.toHaveAttribute('data-active')
    expect(layers[1]).toHaveAttribute('aria-hidden', 'true')
  })

  it('maps a boolean active flag onto the second child', () => {
    render(
      <IconSwap active>
        <span>Off</span>
        <span>On</span>
      </IconSwap>,
    )
    expect(document.querySelector('[data-slot="icon-swap"]')).toHaveAttribute('data-active', '1')
    expect(screen.getByText('On').parentElement).toHaveAttribute('data-active')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(
      <IconSwap ref={ref}>
        <span>A</span>
      </IconSwap>,
    )
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
