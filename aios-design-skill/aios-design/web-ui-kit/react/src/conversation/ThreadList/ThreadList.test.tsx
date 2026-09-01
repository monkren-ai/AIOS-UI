import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  ThreadList,
  ThreadListItem,
  ThreadListItemAction,
  ThreadListNew,
  ThreadListSection,
} from './ThreadList'

describe('ThreadList', () => {
  it('renders compound slots and selection', () => {
    const onSelect = vi.fn()
    render(
      <ThreadList aria-label="Threads">
        <ThreadListNew />
        <ThreadListSection>Today</ThreadListSection>
        <ThreadListItem title="Coverage" active unread onSelect={onSelect} />
      </ThreadList>,
    )
    expect(screen.getByRole('navigation', { name: 'Threads' })).toHaveAttribute(
      'data-slot',
      'thread-list',
    )
    fireEvent.click(screen.getByRole('button', { name: 'Coverage' }))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  it('keeps actions independent from selection', () => {
    const onSelect = vi.fn()
    const onAction = vi.fn()
    render(
      <ThreadList>
        <ThreadListItem
          title="Coverage"
          onSelect={onSelect}
          actions={
            <ThreadListItemAction aria-label="Archive" onClick={onAction}>
              ×
            </ThreadListItemAction>
          }
        />
      </ThreadList>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }))
    expect(onAction).toHaveBeenCalledOnce()
    expect(onSelect).not.toHaveBeenCalled()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
