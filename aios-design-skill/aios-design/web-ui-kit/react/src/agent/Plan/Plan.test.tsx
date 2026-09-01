import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Plan, PlanItem } from './Plan'

describe('Plan', () => {
  it('derives progress and marks the active step', () => {
    render(
      <Plan>
        <PlanItem status="done">Read files</PlanItem>
        <PlanItem status="active">Implement</PlanItem>
        <PlanItem>Verify</PlanItem>
      </Plan>,
    )
    expect(document.querySelector('[data-slot="plan"]')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1')
    expect(screen.getByText('Implement').closest('li')).toHaveAttribute('aria-current', 'step')
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('supports className overrides', () => {
    render(
      <Plan className="max-w-sm">
        <PlanItem>One</PlanItem>
      </Plan>,
    )
    expect(document.querySelector('[data-slot="plan"]')).toHaveClass('max-w-sm')
  })
})
