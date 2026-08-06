import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { AgeMotion } from './AgeMotion'

describe('AgeMotion', () => {
  it('renders only the input until a birth date is given', () => {
    render(<AgeMotion data-testid="age" />)
    const age = screen.getByTestId('age')

    expect(age).toHaveAttribute('data-slot', 'age-motion')
    expect(age).toHaveAttribute('data-state', 'empty')
    expect(age.querySelector('[data-slot="age-motion-input"]')).toBeInTheDocument()
    expect(age.querySelector('[data-slot="age-motion-display"]')).toBeNull()
  })

  it('renders the readouts once a birth date is set', () => {
    render(<AgeMotion birthDate="1990-01-01" data-testid="age" />)
    const age = screen.getByTestId('age')

    expect(age).toHaveAttribute('data-state', 'ready')
    expect(age.querySelectorAll('[data-slot="age-motion-unit"]')).toHaveLength(3)
    expect(age.querySelector('[data-slot="age-motion-secondary"]')).toBeInTheDocument()
  })

  it('updates when the user types a birth date', () => {
    render(<AgeMotion data-testid="age" />)
    const input = screen.getByLabelText('Date of Birth')

    fireEvent.change(input, { target: { value: '1990-01-01' } })
    expect(screen.getByTestId('age')).toHaveAttribute('data-state', 'ready')
  })

  it('draws one decade segment per ten years of lifespan', () => {
    render(<AgeMotion birthDate="1990-01-01" lifespan={80} data-testid="age" />)
    expect(
      screen.getByTestId('age').querySelectorAll('[data-slot="age-motion-decade"]'),
    ).toHaveLength(8)
  })

  it('marks past decades completed and exactly one decade current', () => {
    render(<AgeMotion birthDate="1990-01-01" lifespan={80} data-testid="age" />)
    const decades = Array.from(
      screen.getByTestId('age').querySelectorAll('[data-slot="age-motion-decade"]'),
    )

    expect(decades.filter((d) => d.getAttribute('data-state') === 'current')).toHaveLength(1)
    expect(decades[0]).toHaveAttribute('data-state', 'completed')
  })

  it('draws the requested number of year segments', () => {
    render(<AgeMotion birthDate="1990-01-01" yearSegments={12} data-testid="age" />)
    expect(
      screen.getByTestId('age').querySelectorAll('[data-slot="age-motion-year-segment"]'),
    ).toHaveLength(12)
  })

  it('shows the year progress as a one-decimal percentage', () => {
    render(<AgeMotion birthDate="1990-01-01" data-testid="age" />)
    expect(
      screen.getByTestId('age').querySelector('[data-slot="age-motion-year-percent"]')?.textContent,
    ).toMatch(/^\d+\.\d%$/)
  })

  it('keeps the ticking readouts on tabular numerals', () => {
    render(<AgeMotion birthDate="1990-01-01" data-testid="age" />)
    const age = screen.getByTestId('age')

    expect(age.querySelector('[data-slot="age-motion-value"]')).toHaveClass('tabular-nums')
    expect(age.querySelector('[data-slot="age-motion-secondary"]')).toHaveClass('tabular-nums')
    expect(age.querySelector('[data-slot="age-motion-year-percent"]')).toHaveClass('tabular-nums')
  })

  it('drops the progress tween under reduced motion', () => {
    render(<AgeMotion birthDate="1990-01-01" data-testid="age" />)
    expect(
      screen.getByTestId('age').querySelector('[data-slot="age-motion-decade-fill"]'),
    ).toHaveClass('motion-reduce:transition-none')
  })

  it('keeps the widget palette out of the global data-theme attribute', () => {
    render(<AgeMotion theme="light" data-testid="age" />)
    const age = screen.getByTestId('age')
    expect(age).toHaveAttribute('data-widget-theme', 'light')
    expect(age).toHaveAttribute('data-size', 'md')
    expect(age).not.toHaveAttribute('data-theme')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<AgeMotion className="rounded-none" data-testid="age" />)
    const age = screen.getByTestId('age')
    expect(age).toHaveClass('rounded-none')
    expect(age).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<AgeMotion ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
