import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tag, Tags } from './Tag'

/**
 * 标签只有在真的可点时才是 button，所以按 `data-slot` 取根元素，
 * 而不是按 role —— 后者会把「展示型标签不该有按钮语义」这条给绕过去。
 */
function getTag(): HTMLElement {
  const tag = document.querySelector<HTMLElement>('[data-slot="tag"]')
  if (!tag) throw new Error('no [data-slot="tag"] in the document')
  return tag
}

function getTags(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-slot="tag"]'))
}

describe('Tag', () => {
  it('renders with data-slot and the secondary/md/pill defaults', () => {
    render(<Tag>Label</Tag>)
    const tag = getTag()
    expect(tag).toHaveAttribute('data-variant', 'secondary')
    expect(tag).toHaveAttribute('data-size', 'md')
    expect(tag).toHaveAttribute('data-shape', 'pill')
  })

  it('reports every variant through data-variant', () => {
    ;(['secondary', 'soft', 'outline', 'ghost', 'destructive'] as const).forEach((variant) => {
      const { unmount } = render(<Tag variant={variant}>Variant</Tag>)
      expect(getTag()).toHaveAttribute('data-variant', variant)
      unmount()
    })
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Tag size={size}>Sized</Tag>)
      expect(getTag()).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('translates the v1 technical variant into the technical shape', () => {
    render(<Tag variant="technical">Technical</Tag>)
    expect(getTag()).toHaveAttribute('data-variant', 'secondary')
    expect(getTag()).toHaveAttribute('data-shape', 'technical')
  })

  it('translates the v1 pill variant into the pill shape', () => {
    render(<Tag variant="pill">Pill</Tag>)
    expect(getTag()).toHaveAttribute('data-variant', 'secondary')
    expect(getTag()).toHaveAttribute('data-shape', 'pill')
  })

  it('reports the active state through data-active', () => {
    render(<Tag active>Active</Tag>)
    expect(getTag()).toHaveAttribute('data-active', '')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Tag className="rounded-none">Squared</Tag>)
    expect(getTag()).toHaveClass('rounded-none')
    expect(getTag()).not.toHaveClass('rounded-tag')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Tag ref={ref}>Ref</Tag>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(ref.current?.tagName).toBe('SPAN')
  })

  // 一个纯展示的标记不该被读屏念成按钮 —— 用户会去按它，然后什么都不会发生。
  describe('without onClick', () => {
    it('exposes no button semantics at all', () => {
      render(<Tag>Read only</Tag>)
      const tag = getTag()
      expect(tag).not.toHaveAttribute('role')
      expect(tag).not.toHaveAttribute('tabindex')
      expect(tag).not.toHaveAttribute('aria-pressed')
      expect(screen.queryByRole('button')).toBeNull()
    })

    it('still renders its own remove button when removable', () => {
      render(
        <Tag removable onRemove={() => {}}>
          Read only
        </Tag>,
      )
      // 外壳不是按钮，但里面的删除键是 —— 这时页面上应当只有它一个 button。
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveAttribute('data-slot', 'tag-remove')
    })
  })

  describe('with onClick', () => {
    it('becomes a focusable button and reports its pressed state', () => {
      render(
        <Tag active onClick={() => {}}>
          Filter
        </Tag>,
      )
      const tag = screen.getByRole('button', { name: 'Filter' })
      expect(tag).toHaveAttribute('tabindex', '0')
      expect(tag).toHaveAttribute('aria-pressed', 'true')
    })

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Tag onClick={onClick}>Clickable</Tag>)
      await user.click(screen.getByRole('button', { name: 'Clickable' }))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when pressing Enter', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Tag onClick={onClick}>Keyboard</Tag>)
      screen.getByRole('button', { name: 'Keyboard' }).focus()
      await user.keyboard('{Enter}')
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Tag disabled onClick={onClick}>
          Disabled
        </Tag>,
      )
      const tag = getTag()
      expect(tag).toHaveAttribute('data-disabled', '')
      expect(tag).toHaveAttribute('tabindex', '-1')
      expect(tag).toHaveAttribute('aria-disabled', 'true')
      await user.click(tag)
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  it('renders the remove button in its own slot and calls onRemove', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(
      <Tag removable onRemove={onRemove}>
        Removable
      </Tag>,
    )
    const removeButton = screen.getByRole('button', { name: 'Remove' })
    expect(removeButton).toHaveAttribute('data-slot', 'tag-remove')
    await user.click(removeButton)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})

describe('Tags', () => {
  it('renders children under the tags slot', () => {
    render(
      <Tags data-testid="tags">
        <Tag>One</Tag>
        <Tag>Two</Tag>
      </Tags>,
    )
    expect(screen.getByTestId('tags')).toHaveAttribute('data-slot', 'tags')
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('does not mark proximity state when proximity is off', () => {
    render(
      <Tags data-testid="tags">
        <Tag>One</Tag>
      </Tags>,
    )
    expect(screen.getByTestId('tags')).not.toHaveAttribute('data-proximity')
    expect(getTag()).not.toHaveAttribute('data-proximity-active')
  })

  it('marks proximity state on the container and its items', () => {
    render(
      <Tags proximity data-testid="tags">
        <Tag>One</Tag>
        <Tag>Two</Tag>
      </Tags>,
    )
    expect(screen.getByTestId('tags')).toHaveAttribute('data-proximity', '')
    const [first] = getTags()
    expect(first).toHaveAttribute('data-proximity-active', 'false')
    expect(first).toHaveAttribute('data-index', '0')
  })

  it('accepts ref and custom className', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Tags className="custom-tags" ref={ref}>
        <Tag>Child</Tag>
      </Tags>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('custom-tags')
  })
})
