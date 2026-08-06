import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Fieldset } from './Fieldset'

describe('Fieldset', () => {
  it('renders a group with a legend and data-slot', () => {
    render(
      <Fieldset legend="通知">
        <input />
      </Fieldset>,
    )
    const group = screen.getByRole('group', { name: '通知' })
    expect(group).toHaveAttribute('data-slot', 'fieldset')
    expect(group.tagName).toBe('FIELDSET')
    expect(screen.getByText('通知').tagName).toBe('LEGEND')
  })

  it('supports disabled', () => {
    render(
      <Fieldset legend="偏好" disabled>
        <input />
      </Fieldset>,
    )
    const group = screen.getByRole('group')
    expect(group).toBeDisabled()
    expect(group).toHaveAttribute('data-disabled')
  })

  it('renders children', () => {
    render(
      <Fieldset legend="偏好">
        <input name="a" />
      </Fieldset>,
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders without a legend', () => {
    const { container } = render(
      <Fieldset>
        <input />
      </Fieldset>,
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(container.querySelector('legend')).toBeNull()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLElement>()
    render(
      <Fieldset ref={ref} legend="偏好">
        <input />
      </Fieldset>,
    )
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement)
  })
})
