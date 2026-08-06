import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Field } from './Field'

describe('Field', () => {
  it('renders the label and associates it with the control via htmlFor/id', () => {
    render(
      <Field id="email" label="邮箱">
        <input id="email" />
      </Field>,
    )
    const input = screen.getByLabelText('邮箱')
    expect(input).toHaveAttribute('id', 'email')
    expect(screen.getByText('邮箱').closest('label')).toHaveAttribute('for', 'email')
  })

  it('auto-wires id and aria-describedby onto a single control', () => {
    render(
      <Field label="邮箱" description="用于登录">
        <input />
      </Field>,
    )
    const input = screen.getByLabelText('邮箱')
    expect(input.id).toBeTruthy()
    expect(input).toHaveAttribute('aria-describedby')
  })

  it('renders the error with role=alert and links it to the control', () => {
    render(
      <Field label="邀请码" error="邀请码已失效">
        <input />
      </Field>,
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('邀请码已失效')
    const input = screen.getByLabelText('邀请码')
    expect(input).toHaveAttribute('aria-describedby', alert.id)
  })

  it('marks required with a visible marker', () => {
    render(
      <Field label="邮箱" required>
        <input />
      </Field>,
    )
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /邮箱/ })).toBeInTheDocument()
  })

  it('hides the description when there is an error', () => {
    render(
      <Field label="邮箱" description="说明文字" error="出错了">
        <input />
      </Field>,
    )
    expect(screen.queryByText('说明文字')).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('出错了')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Field ref={ref} label="邮箱">
        <input />
      </Field>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
