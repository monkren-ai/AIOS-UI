import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Form } from './Form'

describe('Form', () => {
  it('renders with data-slot', () => {
    render(
      <Form data-testid="form">
        <input name="a" />
      </Form>,
    )
    expect(screen.getByTestId('form')).toHaveAttribute('data-slot', 'form')
  })

  it('calls onSubmit and prevents the default navigation', () => {
    const onSubmit = vi.fn()
    render(
      <Form data-testid="form" onSubmit={onSubmit}>
        <button type="submit">Go</button>
      </Form>,
    )
    fireEvent.submit(screen.getByTestId('form'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].defaultPrevented).toBe(true)
  })

  it('renders children', () => {
    render(
      <Form>
        <label htmlFor="x">Name</label>
        <input id="x" />
      </Form>,
    )
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('lets the caller override variant defaults', () => {
    render(<Form data-testid="form" className="gap-8" />)
    const form = screen.getByTestId('form')
    expect(form.className).toContain('gap-8')
    expect(form.className).not.toContain('gap-md')
  })
})
