import { useState } from 'react'
import '../styles/data-grid.css'

interface Column {
  key: string
  label: string
  type?: 'text' | 'numeric'
}

interface CellStatus {
  columnKey: string
  status?: 'good' | 'warning' | 'error' | 'info'
}

interface Row {
  cells: Record<string, string | number>
  active?: boolean
  interactive?: boolean
  cellStatuses?: CellStatus[]
}

interface DataGridProps {
  columns: Column[]
  rows: Row[]
  emptyMessage?: string
  onRowClick?: (index: number) => void
}

const DataGrid: React.FC<DataGridProps> = ({
  columns,
  rows,
  emptyMessage = 'No data',
  onRowClick
}) => {
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null)

  const handleRowClick = (index: number) => {
    setActiveRowIndex(index)
    onRowClick?.(index)
  }

  const handleRowKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleRowClick(index)
    }
  }

  const getCellStatus = (row: Row, columnKey: string): string | undefined => {
    return row.cellStatuses?.find(cs => cs.columnKey === columnKey)?.status
  }

  return (
    <div className="nothing-data-grid">
      <div className="nothing-data-grid__header">
        {columns.map((col) => (
          <div
            key={col.key}
            className={[
              'nothing-data-grid__header-cell',
              col.type === 'numeric' ? 'nothing-data-grid__header-cell--numeric' : ''
            ].filter(Boolean).join(' ')}
          >
            {col.label}
          </div>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="nothing-data-grid__empty">
          <div className="nothing-data-grid__empty-cell" style={{ gridColumn: `1 / ${columns.length + 1}` }}>
            {emptyMessage}
          </div>
        </div>
      ) : (
        rows.map((row, rowIndex) => {
          const isActive = row.active || activeRowIndex === rowIndex
          const rowClassNames = [
            'nothing-data-grid__row',
            isActive ? 'nothing-data-grid__row--active' : '',
            row.interactive ? 'nothing-data-grid__row--interactive' : ''
          ].filter(Boolean).join(' ')

          return (
            <div
              key={rowIndex}
              className={rowClassNames}
              role={row.interactive ? 'button' : undefined}
              tabIndex={row.interactive ? 0 : undefined}
              onClick={row.interactive ? () => handleRowClick(rowIndex) : undefined}
              onKeyDown={row.interactive ? (e) => handleRowKeyDown(e, rowIndex) : undefined}
            >
              {columns.map((col) => {
                const status = getCellStatus(row, col.key)
                const cellClassNames = [
                  'nothing-data-grid__cell',
                  col.type === 'numeric' ? 'nothing-data-grid__cell--numeric' : 'nothing-data-grid__cell--text',
                  status ? `nothing-data-grid__cell--${status}` : ''
                ].filter(Boolean).join(' ')

                return (
                  <div key={col.key} className={cellClassNames}>
                    {row.cells[col.key] ?? ''}
                  </div>
                )
              })}
            </div>
          )
        })
      )}
    </div>
  )
}

export default DataGrid
