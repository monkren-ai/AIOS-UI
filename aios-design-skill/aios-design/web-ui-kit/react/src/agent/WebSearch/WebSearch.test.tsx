import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WebSearch } from './WebSearch'

describe('WebSearch', () => {
  const results = [{ title: 'Result', url: 'https://example.com', description: 'Summary' }]

  it('renders safe results and status semantics', () => {
    render(<WebSearch query="agent UI" results={results} status="running" />)
    expect(document.querySelector('[data-slot="web-search"]')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('link', { name: /Result/ })).toHaveAttribute(
      'rel',
      'noreferrer noopener',
    )
  })

  it('supports controlled disclosure', () => {
    const onOpenChange = vi.fn()
    render(
      <WebSearch query="agent UI" results={results} open={false} onOpenChange={onOpenChange} />,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('accepts className overrides', () => {
    render(<WebSearch query="agent UI" className="max-w-md" />)
    expect(document.querySelector('[data-slot="web-search"]')).toHaveClass('max-w-md')
  })
})
