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

  it('renders all tab triggers and panels', () => {
    render(
      <Tabs items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}>
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
      <Tabs items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}>
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
        items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
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
      <Tabs items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B', disabled: true }]}>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )

    const tabB = screen.getByRole('tab', { name: 'B' })
    expect(tabB).toHaveAttribute('aria-disabled', 'true')
    await userEvent.click(tabB)
    expect(screen.getByRole('tabpanel', { name: 'A' })).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    const { container } = render(
      <Tabs items={[{ value: 'a', label: 'A' }]} variant="pills">
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(container.querySelector('[data-slot="tabs"]')).toHaveClass('nothing-tabs--pills')
  })

  it('each trigger has data-slot="tabs-trigger"', () => {
    render(
      <Tabs items={[{ value: 'a', label: 'A' }]}>
        <TabPanel value="a">Panel A</TabPanel>
      </Tabs>,
    )

    expect(screen.getByRole('tab')).toHaveAttribute('data-slot', 'tabs-trigger')
  })
})
