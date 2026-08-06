import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/table.css'
import '@/styles/data-grid.css'
import '@/styles/data-rows.css'

/**
 * DataTable — 统一表格展示入口 (合并自 Table / DataGrid / DataRows)
 *
 * variant:
 *   - 'table'  原 Table (HTML <table>) — 静态列/行展示, striped/compact/hoverable
 *   - 'grid'   原 DataGrid (CSS grid)  — 可排序, 行 active/interactive, 单元格 status
 *   - 'rows'   原 DataRows (label/value) — 状态行, sub-row, trend/unit
 *
 * 三种 variant 共享:
 *   - 行点击回调 (onRowClick / onSelectRow)
 *   - 行交互态 (interactive / disabled)
 *   - data-state 属性 (用于 e2e/CSS 选择器)
 */

// ---------- shared types ----------

export type DataCellStatus = 'good' | 'warning' | 'error' | 'info'

export interface DataTableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  type?: 'text' | 'numeric'
  sortable?: boolean
}

export interface DataTableCellStatus {
  columnKey: string
  status?: DataCellStatus
}

export interface DataTableGridRow {
  cells: Record<string, React.ReactNode>
  active?: boolean
  interactive?: boolean
  cellStatuses?: DataTableCellStatus[]
  id?: string
}

export interface DataTableRowsItem {
  label: string
  value: string
  unit?: string
  trend?: string
  status?: DataCellStatus
  isSub?: boolean
  interactive?: boolean
  disabled?: boolean
}

export type SortDirection = 'asc' | 'desc' | null

// ---------- CVA ----------

export const dataTableVariants = cva('aios-data-table', {
  variants: {
    variant: {
      table: 'aios-table',
      grid: 'aios-data-grid',
      rows: 'aios-data-rows',
    },
    striped: { true: 'aios-table--striped', false: '' },
    compact: { true: 'aios-table--compact', false: '' },
    hoverable: { true: 'aios-table--hoverable', false: '' },
    proximity: { true: 'aios-data-table--proximity', false: '' },
  },
  defaultVariants: {
    variant: 'table',
    striped: false,
    compact: false,
    hoverable: false,
    proximity: false,
  },
})

// ---------- props ----------

export type DataTableVariant = 'table' | 'grid' | 'rows'

export interface DataTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: DataTableVariant
  /** variant='table' */
  columns?: DataTableColumn[]
  rows?: DataTableGridRow[]
  caption?: string
  /** variant='grid' */
  emptyMessage?: string
  /** variant='rows' */
  items?: DataTableRowsItem[]
  onRowClick?: (index: number) => void
  onSortChange?: (key: string | null, direction: SortDirection) => void
  // table-specific
  striped?: boolean
  compact?: boolean
  hoverable?: boolean
  /** 启用 proximity hover 效果 */
  proximity?: boolean
}

// ---------- helpers ----------

function getSortValue(cell: React.ReactNode, type?: 'text' | 'numeric'): string | number {
  if (cell == null) return ''
  if (typeof cell === 'number') return cell
  const text = typeof cell === 'string' ? cell : String(cell)
  if (type === 'numeric') {
    const parsed = parseFloat(text)
    return Number.isNaN(parsed) ? text : parsed
  }
  return text.toLowerCase()
}

function useSortedRows(
  rows: DataTableGridRow[],
  columns: DataTableColumn[],
  sortKey: string | null,
  sortDirection: SortDirection,
) {
  return React.useMemo(() => {
    if (!sortKey || !sortDirection) return rows
    const column = columns.find((c) => c.key === sortKey)
    const sorted = [...rows].sort((a, b) => {
      const aValue = getSortValue(a.cells[sortKey], column?.type)
      const bValue = getSortValue(b.cells[sortKey], column?.type)
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [rows, columns, sortKey, sortDirection])
}

function SortIcon({ direction }: { direction: SortDirection }) {
  return (
    <svg
      className={cn(
        'aios-sort-icon',
        direction === 'asc' && 'aios-sort-icon--asc',
        direction === 'desc' && 'aios-sort-icon--desc',
      )}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 6l4-4 4 4" className="aios-sort-icon__up" />
      <path d="M4 10l4 4 4-4" className="aios-sort-icon__down" />
    </svg>
  )
}

// ---------- sub-renderers ----------

function TableHeader({
  columns,
  sortKey,
  sortDirection,
  onSort,
}: {
  columns: DataTableColumn[]
  sortKey: string | null
  sortDirection: SortDirection
  onSort: (key: string) => void
}) {
  return (
    <thead className="aios-table__head">
      <tr className="aios-table__row">
        {columns.map((col) => {
          const active = sortKey === col.key
          return (
            <th
              key={col.key}
              className={cn(
                'aios-table__header',
                col.align === 'center' && 'aios-table__cell--center',
                col.align === 'right' && 'aios-table__cell--right',
                col.sortable && 'aios-table__header--sortable',
                active && 'aios-table__header--sorted',
              )}
              style={col.width ? { width: col.width } : undefined}
              aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              {col.sortable ? (
                <button
                  type="button"
                  className="aios-table__sort-button"
                  onClick={() => onSort(col.key)}
                  aria-label={`Sort by ${col.label}`}
                >
                  <span>{col.label}</span>
                  <SortIcon direction={active ? sortDirection : null} />
                </button>
              ) : (
                col.label
              )}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

function TableView({
  columns,
  rows,
  caption,
  striped,
  sortKey,
  sortDirection,
  onSort,
}: {
  columns: DataTableColumn[]
  rows: DataTableGridRow[]
  caption?: string
  striped?: boolean
  sortKey: string | null
  sortDirection: SortDirection
  onSort: (key: string) => void
}) {
  return (
    <table className="aios-table__table">
      {caption && <caption className="aios-table__caption">{caption}</caption>}
      <TableHeader
        columns={columns}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <tbody className="aios-table__body">
        {rows.map((row, rowIndex) => (
          <tr
            key={row.id ?? rowIndex}
            className={cn(
              'aios-table__row',
              striped && rowIndex % 2 === 1 && 'aios-table__row--even',
            )}
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={cn(
                  'aios-table__cell',
                  col.align === 'center' && 'aios-table__cell--center',
                  col.align === 'right' && 'aios-table__cell--right',
                )}
              >
                {row.cells[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function GridHeader({
  columns,
  sortKey,
  sortDirection,
  onSort,
}: {
  columns: DataTableColumn[]
  sortKey: string | null
  sortDirection: SortDirection
  onSort: (key: string) => void
}) {
  return (
    <div className="aios-data-grid__header">
      {columns.map((col) => {
        const active = sortKey === col.key
        return (
          <div
            key={col.key}
            className={cn(
              'aios-data-grid__header-cell',
              col.type === 'numeric' && 'aios-data-grid__header-cell--numeric',
              col.sortable && 'aios-data-grid__header-cell--sortable',
              active && 'aios-data-grid__header-cell--sorted',
            )}
            aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            {col.sortable ? (
              <button
                type="button"
                className="aios-data-grid__sort-button"
                onClick={() => onSort(col.key)}
                aria-label={`Sort by ${col.label}`}
              >
                <span>{col.label}</span>
                <SortIcon direction={active ? sortDirection : null} />
              </button>
            ) : (
              col.label
            )}
          </div>
        )
      })}
    </div>
  )
}

function GridView({
  columns,
  rows,
  emptyMessage,
  onRowClick,
  sortKey,
  sortDirection,
  onSort,
}: {
  columns: DataTableColumn[]
  rows: DataTableGridRow[]
  emptyMessage: string
  onRowClick?: (index: number) => void
  sortKey: string | null
  sortDirection: SortDirection
  onSort: (key: string) => void
}) {
  const [activeRowIndex, setActiveRowIndex] = React.useState<number | null>(null)

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
  const getCellStatus = (
    row: DataTableGridRow,
    columnKey: string,
  ): DataTableCellStatus['status'] => {
    return row.cellStatuses?.find((cs) => cs.columnKey === columnKey)?.status
  }

  return (
    <>
      <GridHeader
        columns={columns}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      {rows.length === 0 ? (
        <div className="aios-data-grid__empty">
          <div
            className="aios-data-grid__empty-cell"
            style={{ gridColumn: `1 / ${columns.length + 1}` }}
          >
            {emptyMessage}
          </div>
        </div>
      ) : (
        rows.map((row, rowIndex) => {
          const isActive = row.active || activeRowIndex === rowIndex
          return (
            <div
              key={rowIndex}
              className={cn(
                'aios-data-grid__row',
                isActive && 'aios-data-grid__row--active',
                row.interactive && 'aios-data-grid__row--interactive',
              )}
              role={row.interactive ? 'button' : undefined}
              tabIndex={row.interactive ? 0 : undefined}
              onClick={row.interactive ? () => handleRowClick(rowIndex) : undefined}
              onKeyDown={row.interactive ? (e) => handleRowKeyDown(e, rowIndex) : undefined}
              data-state={dataAttr(isActive ? 'active' : 'idle')}
              data-interactive={dataAttr(!!row.interactive)}
            >
              {columns.map((col) => {
                const status = getCellStatus(row, col.key)
                return (
                  <div
                    key={col.key}
                    className={cn(
                      'aios-data-grid__cell',
                      col.type === 'text' && 'aios-data-grid__cell--text',
                      col.type === 'numeric' && 'aios-data-grid__cell--numeric',
                      status === 'good' && 'aios-data-grid__cell--good',
                      status === 'warning' && 'aios-data-grid__cell--warning',
                      status === 'error' && 'aios-data-grid__cell--error',
                      status === 'info' && 'aios-data-grid__cell--info',
                    )}
                  >
                    {row.cells[col.key] ?? ''}
                  </div>
                )
              })}
            </div>
          )
        })
      )}
    </>
  )
}

function RowsView({
  items,
  onRowClick,
}: {
  items: DataTableRowsItem[]
  onRowClick?: (index: number) => void
}) {
  const handleRowClick = (index: number) => {
    onRowClick?.(index)
  }
  const handleRowKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleRowClick(index)
    }
  }

  return (
    <>
      {items.map((row, index) => {
        const isInteractive = row.interactive && !row.disabled
        return (
          <div
            key={index}
            className={cn(
              'aios-data-row',
              row.status === 'good' && 'aios-data-row--good',
              row.status === 'warning' && 'aios-data-row--warning',
              row.status === 'error' && 'aios-data-row--error',
              row.status === 'info' && 'aios-data-row--info',
              row.isSub && 'aios-data-row--sub',
              row.interactive && 'aios-data-row--interactive',
              row.disabled && 'aios-data-row--disabled',
            )}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onClick={isInteractive ? () => handleRowClick(index) : undefined}
            onKeyDown={isInteractive ? (e) => handleRowKeyDown(e, index) : undefined}
            data-state={dataAttr(
              row.disabled ? 'disabled' : isInteractive ? 'interactive' : 'static',
            )}
          >
            <div className="aios-data-row__left">
              <div className="aios-data-row__label">{row.label}</div>
            </div>
            <div className="aios-data-row__right">
              <div className="aios-data-row__value">{row.value}</div>
              {row.unit && <span className="aios-data-row__unit">{row.unit}</span>}
              {row.trend && <span className="aios-data-row__trend">{row.trend}</span>}
            </div>
          </div>
        )
      })}
    </>
  )
}

// ---------- main component ----------

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      className,
      variant = 'table',
      columns,
      rows = [],
      caption,
      items = [],
      emptyMessage = 'No data',
      onRowClick,
      onSortChange,
      striped = false,
      compact = false,
      hoverable = false,
      proximity = false,
      ...props
    },
    ref,
  ) => {
    const [sortKey, setSortKey] = React.useState<string | null>(null)
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

    const handleSort = React.useCallback(
      (key: string) => {
        setSortKey((prevKey) => {
          if (prevKey !== key) {
            setSortDirection('asc')
            onSortChange?.(key, 'asc')
            return key
          }
          setSortDirection((prevDir) => {
            const nextDir: SortDirection =
              prevDir === 'asc' ? 'desc' : prevDir === 'desc' ? null : 'asc'
            onSortChange?.(nextDir ? key : null, nextDir)
            return nextDir
          })
          return key
        })
      },
      [onSortChange],
    )

    const sortedRows = useSortedRows(rows, columns ?? [], sortKey, sortDirection)

    return (
      <div
        ref={ref}
        className={cn(
          dataTableVariants({
            variant,
            striped: variant === 'table' ? striped : false,
            compact: variant === 'table' ? compact : false,
            hoverable: variant === 'table' ? hoverable : false,
            proximity,
          }),
          className,
        )}
        data-state={dataAttr(hoverable ? 'hoverable' : 'static')}
        data-variant={dataAttr(variant)}
        {...props}
      >
        {variant === 'table' && columns && (
          <TableView
            columns={columns}
            rows={sortedRows}
            caption={caption}
            striped={striped}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}
        {variant === 'grid' && columns && (
          <GridView
            columns={columns}
            rows={sortedRows}
            emptyMessage={emptyMessage}
            onRowClick={onRowClick}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        )}
        {variant === 'rows' && <RowsView items={items} onRowClick={onRowClick} />}
      </div>
    )
  },
)
DataTable.displayName = 'DataTable'

export default DataTable
