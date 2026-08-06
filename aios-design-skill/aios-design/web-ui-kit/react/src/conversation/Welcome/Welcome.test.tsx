import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Welcome } from './Welcome'

describe('Welcome', () => {
  it('renders root with data-slot', () => {
    render(<Welcome title="Hi" />)
    expect(document.querySelector('[data-slot="welcome"]')).toBeInTheDocument()
  })

  it('renders title, description, icon, actions and extra', () => {
    render(
      <Welcome
        title="Welcome"
        description="Get started"
        icon="🤖"
        actions={<button>Action</button>}
        extra={<span>Extra</span>}
      />,
    )
    expect(document.querySelector('[data-slot="welcome-title"]')).toHaveTextContent('Welcome')
    expect(document.querySelector('[data-slot="welcome-description"]')).toHaveTextContent(
      'Get started',
    )
    expect(document.querySelector('[data-slot="welcome-icon"]')).toHaveTextContent('🤖')
    expect(document.querySelector('[data-slot="welcome-actions"]')).toHaveTextContent('Action')
    expect(document.querySelector('[data-slot="welcome-extra"]')).toHaveTextContent('Extra')
  })

  it('applies centered variant', () => {
    render(<Welcome title="Hi" variant="centered" />)
    expect(document.querySelector('[data-slot="welcome"]')).toHaveClass('aios-welcome--centered')
  })

  it('applies semantic classNames', () => {
    render(<Welcome title="Hi" classNames={{ root: 'custom-root', title: 'custom-title' }} />)
    expect(document.querySelector('[data-slot="welcome"]')).toHaveClass('custom-root')
    expect(document.querySelector('[data-slot="welcome-title"]')).toHaveClass('custom-title')
  })
})
