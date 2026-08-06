import { DataTable, type DataTableRowsItem } from 'aios-ui-kit/data-table'

const items: DataTableRowsItem[] = [
  { label: 'CPU', value: '42', unit: '%', trend: '+3%' },
  { label: 'Memory', value: '78', unit: '%', trend: '+11%', status: 'warning' },
  { label: 'Swap', value: '2.1', unit: 'GB', isSub: true },
  { label: 'Storage', value: '96', unit: '%', status: 'error' },
  { label: 'Backups', value: 'Paused', disabled: true },
]

export default function DataTableRows() {
  return <DataTable variant="rows" items={items} className="w-full max-w-sm" />
}
