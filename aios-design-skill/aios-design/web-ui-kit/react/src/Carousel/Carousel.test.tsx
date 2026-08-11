import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Carousel } from './Carousel'

describe('Carousel', () => {
  it('moves through slides and reports changes', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Carousel
        aria-label="News"
        items={[<div>One</div>, <div>Two</div>]}
        onValueChange={onValueChange}
      />,
    )
    expect(screen.getByRole('region', { name: 'News' })).toHaveAttribute('data-slot', 'carousel')
    expect(screen.getByText('One')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Next slide' }))
    expect(screen.getByText('Two')).toBeVisible()
    expect(onValueChange).toHaveBeenCalledWith(1)
  })

  it('loops from the first slide to the last', async () => {
    const user = userEvent.setup()
    render(<Carousel loop items={[<div>One</div>, <div>Two</div>]} />)
    await user.click(screen.getByRole('button', { name: 'Previous slide' }))
    expect(screen.getByText('Two')).toBeVisible()
  })
})
