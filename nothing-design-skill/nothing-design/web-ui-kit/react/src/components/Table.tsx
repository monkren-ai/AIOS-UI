import '../styles/table.css'

interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface TableProps {
  columns: TableColumn[]
  rows: { cells: Record<string, React.ReactNode>; id?: string }[]
  caption?: string
  striped?: boolean
  compact?: boolean
  hoverable?: boolean
}

const Table = ({
  columns,
  rows,
  caption,
  striped = false,
  compact = false,
  hoverable = false
}: TableProps) => {
  const wrapperClassNames = [
    'nothing-table',
    striped ? 'nothing-table--striped' : '',
    compact ? 'nothing-table--compact' : '',
    hoverable ? 'nothing-table--hoverable' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClassNames}>
      <table className="nothing-table__table">
        {caption && <caption className="nothing-table__caption">{caption}</caption>}
        <thead className="nothing-table__head">
          <tr className="nothing-table__row">
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  'nothing-table__header',
                  col.align ? `nothing-table__cell--${col.align}` : ''
                ].filter(Boolean).join(' ')}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="nothing-table__body">
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className={[
                'nothing-table__row',
                striped && rowIndex % 2 === 1 ? 'nothing-table__row--even' : ''
              ].filter(Boolean).join(' ')}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={[
                    'nothing-table__cell',
                    col.align ? `nothing-table__cell--${col.align}` : ''
                  ].filter(Boolean).join(' ')}
                >
                  {row.cells[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
