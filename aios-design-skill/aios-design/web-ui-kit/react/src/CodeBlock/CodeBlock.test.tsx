import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CodeBlock } from './CodeBlock'

describe('CodeBlock', () => {
  it('renders slots and line numbers', () => {
    render(<CodeBlock code={'one\ntwo'} filename="a.ts" showLineNumbers />)
    expect(screen.getByText('a.ts').closest('[data-slot="code-block"]')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
  it('uses the copy callback', async () => {
    const onCopy = vi.fn()
    render(<CodeBlock code="const a = 1" onCopy={onCopy} />)
    await userEvent.click(screen.getByRole('button', { name: /Copy/ }))
    expect(onCopy).toHaveBeenCalledWith('const a = 1')
  })
})
