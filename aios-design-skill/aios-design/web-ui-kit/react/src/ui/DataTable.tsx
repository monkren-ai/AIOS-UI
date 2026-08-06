import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/table.css'
import '../styles/data-grid.css'
import '../styles/data-rows.css'

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

// ---------- CVA ----------

const dataTableVariants = cva('aios-data-table', {
  variants: {
    variant: {
      table: 'aios-table',
      grid: 'aios-data-grid',
      rows: 'aios-data-rows',
    },
    striped: { true: 'aios-table--striped', false: '' },
    compact: { true: 'aios-table--compact', false: '' },
    hoverable: { true: 'aios-table--hoverable', false: '' },
  },
  defaultVariants: { variant: 'table', striped: false, compact: false, hoverable: false },
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
  // table-specific
  striped?: boolean
  compact?: boolean
  hoverable?: boolean
}

// ---------- helpers ----------

// ---------- sub-renderers ----------

function TableView({
  columns,
  rows,
  caption,
  striped,
}: {
  columns: DataTableColumn[]
  rows: DataTableGridRow[]
  caption?: string
  striped?: boolean
}) {
  return (
    <table className="aios-table__table">
      {caption && <caption className="aios-table__caption">{caption}</caption>}
      <thead className="aios-table__head">
        <tr className="aios-table__row">
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(
                'aios-table__header',
                col.align === 'center' && 'aios-table__cell--center',
                col.align === 'right' && 'aios-table__cell--right',
              )}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
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

function GridView({
  columns,
  rows,
  emptyMessage,
  onRowClick,
}: {
  columns: DataTableColumn[]
  rows: DataTableGridRow[]
  emptyMessage: string
  onRowClick?: (index: number) => void
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
      <div className="aios-data-grid__header">
        {columns.map((col) => (
          <div
            key={col.key}
            className={cn(
              'aios-data-grid__header-cell',
              col.type === 'numeric' && 'aios-data-grid__header-cell--numeric',
            )}
          >
            {col.label}
          </div>
        ))}
      </div>
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
      striped = false,
      compact = false,
      hoverable = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          dataTableVariants({
            variant,
            striped: variant === 'table' ? striped : false,
            compact: variant === 'table' ? compact : false,
            hoverable: variant === 'table' ? hoverable : false,
          }),
          className,
        )}
        data-state={dataAttr(hoverable ? 'hoverable' : 'static')}
        data-variant={dataAttr(variant)}
        role={variant === 'table' ? 'table' : undefined}
        {...props}
      >
        {variant === 'table' && columns && (
          <TableView columns={columns} rows={rows} caption={caption} striped={striped} />
        )}
        {variant === 'grid' && columns && (
          <GridView
            columns={columns}
            rows={rows}
            emptyMessage={emptyMessage}
            onRowClick={onRowClick}
          />
        )}
        {variant === 'rows' && <RowsView items={items} onRowClick={onRowClick} />}
      </div>
    )
  },
)
DataTable.displayName = 'DataTable'

export { dataTableVariants }
export default DataTable
