import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Tabs, TabPanel } from './Tabs'

describe('Tabs', () => {
  it('renders with data-slot', () => {
    const { container } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]}>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )
    expect(container.querySelector('[data-slot="tabs"]')).toBeInTheDocument()
  })

  it('points aria-controls at a panel that actually exists', () => {
    render(
      <Tabs
        defaultValue="a"
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      >
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )

    const controls = screen.getByRole('tab', { name: 'A' }).getAttribute('aria-controls')
    expect(controls).toBeTruthy()
    expect(document.getElementById(controls!)).toHaveTextContent('Panel A')
  })

  it('reflects the active tab in data-state when uncontrolled', async () => {
    const user = userEvent.setup()
    render(
      <Tabs
        defaultValue="a"
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      >
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )

    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('data-state', 'inactive')

    await user.click(screen.getByRole('tab', { name: 'B' }))
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('data-state', 'inactive')
  })

  it('renders all tab triggers and panels', () => {
    render(
      <Tabs
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      >
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )

    expect(screen.getByRole('tab', { name: 'A' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'B' })).toBeInTheDocument()
    expect(screen.getByRole('tabpanel', { name: 'A' })).toHaveTextContent('Panel A')
  })

  it('switches active tab on click', async () => {
    render(
      <Tabs
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      >
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )

    const tabB = screen.getByRole('tab', { name: 'B' })
    await userEvent.click(tabB)

    expect(tabB).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel', { name: 'B' })).toHaveTextContent('Panel B')
  })

  it('calls onValueChange when tab changes', async () => {
    const onValueChange = vi.fn()
    render(
      <Tabs
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
        onValueChange={onValueChange}
      >
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )

    await userEvent.click(screen.getByRole('tab', { name: 'B' }))
    expect(onValueChange).toHaveBeenCalledWith('b')
  })

  it('respects disabled tabs', async () => {
    render(
      <Tabs
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: true },
        ]}
      >
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )

    const tabB = screen.getByRole('tab', { name: 'B' })
    expect(tabB).toHaveAttribute('aria-disabled', 'true')
    await userEvent.click(tabB)
    expect(screen.getByRole('tabpanel', { name: 'A' })).toBeInTheDocument()
  })

  it('exposes the variant through data-variant', () => {
    const { container } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]} variant="pills">
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(container.querySelector('[data-slot="tabs"]')).toHaveAttribute('data-variant', 'pills')
  })

  it('defaults to the line indicator and renders it', () => {
    const { container } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]}>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(container.querySelector('[data-slot="tabs"]')).toHaveAttribute('data-indicator', 'line')
    expect(container.querySelector('[data-slot="tabs-indicator"]')).toBeInTheDocument()
  })

  it('omits the indicator when indicator="none"', () => {
    const { container } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]} indicator="none">
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(container.querySelector('[data-slot="tabs-indicator"]')).not.toBeInTheDocument()
  })

  it('renders the proximity hover layer only when enabled', () => {
    const { container, rerender } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]}>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )
    expect(container.querySelector('[data-slot="tabs-hover-background"]')).toBeInTheDocument()

    rerender(
      <Tabs items={[{ value: 'a', label: 'A' }]} enableProximityHover={false}>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )
    expect(container.querySelector('[data-slot="tabs-hover-background"]')).not.toBeInTheDocument()
  })

  it('marks disabled triggers with data-disabled', () => {
    render(
      <Tabs
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: true },
        ]}
      >
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('data-disabled')
  })

  it('each part carries its data-slot', () => {
    const { container } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]}>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(screen.getByRole('tab')).toHaveAttribute('data-slot', 'tabs-trigger')
    expect(container.querySelector('[data-slot="tabs-list"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="tabs-panel"]')).toBeInTheDocument()
  })

  it('lets the caller override variant defaults through className', () => {
    const { container } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]} className="flex-row">
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    const root = container.querySelector('[data-slot="tabs"]')
    expect(root).toHaveClass('flex-row')
    expect(root).not.toHaveClass('flex-col')
  })

  it('accepts a ref on the root', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Tabs ref={ref} items={[{ value: 'a', label: 'A' }]}>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-slot', 'tabs')
  })
})
