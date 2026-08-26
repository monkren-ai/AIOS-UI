import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { CodeDiff } from './CodeDiff'

it('renders diff lines and summary', () => {
  render(
    <CodeDiff
      filename="a.ts"
      lines={[
        { type: 'add', newLine: 1, content: 'new' },
        { type: 'remove', oldLine: 1, content: 'old' },
      ]}
    />,
  )
  expect(screen.getByText('+1 / −1')).toBeInTheDocument()
  expect(screen.getByText('new').closest('[data-type="add"]')).toBeInTheDocument()
})
