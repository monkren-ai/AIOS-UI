import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from './DataTable'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'score', label: 'Score', type: 'numeric' as const, sortable: true },
]

const rows = [
  { cells: { name: 'Alice', score: '85' } },
  { cells: { name: 'Bob', score: '72' } },
  { cells: { name: 'Carol', score: '93' } },
]

describe('DataTable', () => {
  it('renders table variant', () => {
    render(<DataTable variant="table" columns={columns} rows={rows} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('renders grid variant', () => {
    render(<DataTable variant="grid" columns={columns} rows={rows} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Score')).toBeInTheDocument()
  })

  it('renders rows variant', () => {
    render(
      <DataTable
        variant="rows"
        items={[
          { label: 'CPU', value: '42', unit: '%' },
          { label: 'Memory', value: '78', unit: '%', status: 'warning' },
        ]}
      />,
    )
    expect(screen.getByText('CPU')).toBeInTheDocument()
    expect(screen.getByText('78')).toBeInTheDocument()
  })

  it('sorts grid rows ascending and descending', () => {
    render(<DataTable variant="grid" columns={columns} rows={rows} />)
    const scoreHeader = screen.getByRole('button', { name: 'Sort by Score' })
    fireEvent.click(scoreHeader)
    const cells = screen.getAllByText(/\d+/)
    expect(cells[0]).toHaveTextContent('72')
    fireEvent.click(scoreHeader)
    expect(cells[0]).toHaveTextContent('93')
  })

  it('calls onSortChange when sorting', () => {
    const handleSort = vi.fn()
    render(<DataTable variant="grid" columns={columns} rows={rows} onSortChange={handleSort} />)
    const scoreHeader = screen.getByRole('button', { name: 'Sort by Score' })
    fireEvent.click(scoreHeader)
    expect(handleSort).toHaveBeenCalledWith('score', 'asc')
    fireEvent.click(scoreHeader)
    expect(handleSort).toHaveBeenLastCalledWith('score', 'desc')
  })

  it('calls onRowClick in grid variant', () => {
    const handleClick = vi.fn()
    render(
      <DataTable
        variant="grid"
        columns={columns}
        rows={[{ cells: { name: 'Alice', score: '85' }, interactive: true }]}
        onRowClick={handleClick}
      />,
    )
    fireEvent.click(screen.getByText('Alice'))
    expect(handleClick).toHaveBeenCalledWith(0)
  })

  it('applies proximity class', () => {
    const { container } = render(
      <DataTable variant="grid" columns={columns} rows={rows} proximity />,
    )
    expect(container.firstChild).toHaveClass('nothing-data-table--proximity')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DataTable ref={ref} variant="table" columns={columns} rows={rows} />)
    expect(ref.current).toHaveClass('nothing-data-table')
  })
})
