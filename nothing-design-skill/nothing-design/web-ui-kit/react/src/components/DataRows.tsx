import '../styles/data-rows.css'

interface DataRowItem {
  label: string
  value: string
  unit?: string
  trend?: string
  status?: 'good' | 'warning' | 'error' | 'info'
  isSub?: boolean
  interactive?: boolean
  disabled?: boolean
}

interface DataRowsProps {
  rows: DataRowItem[]
  onRowClick?: (index: number) => void
}

const DataRows: React.FC<DataRowsProps> = ({
  rows,
  onRowClick
}) => {
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
    <div className="nothing-data-rows">
      {rows.map((row, index) => {
        const isInteractive = row.interactive && !row.disabled
        const classNames = [
          'nothing-data-row',
          row.status ? `nothing-data-row--${row.status}` : '',
          row.isSub ? 'nothing-data-row--sub' : '',
          row.interactive ? 'nothing-data-row--interactive' : '',
          row.disabled ? 'nothing-data-row--disabled' : ''
        ].filter(Boolean).join(' ')

        return (
          <div
            key={index}
            className={classNames}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onClick={isInteractive ? () => handleRowClick(index) : undefined}
            onKeyDown={isInteractive ? (e) => handleRowKeyDown(e, index) : undefined}
          >
            <div className="nothing-data-row__left">
              <div className="nothing-data-row__label">{row.label}</div>
            </div>
            <div className="nothing-data-row__right">
              <div className="nothing-data-row__value">{row.value}</div>
              {row.unit && <span className="nothing-data-row__unit">{row.unit}</span>}
              {row.trend && <span className="nothing-data-row__trend">{row.trend}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DataRows
