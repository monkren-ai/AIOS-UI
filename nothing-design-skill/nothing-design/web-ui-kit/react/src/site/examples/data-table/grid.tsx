import { DataTable, type DataTableGridRow } from 'aios-ui-kit/data-table'

const columns = [
  { key: 'service', label: 'Service' },
  { key: 'latency', label: 'Latency', type: 'numeric' as const, sortable: true },
  { key: 'uptime', label: 'Uptime', type: 'numeric' as const, sortable: true },
]

const rows: DataTableGridRow[] = [
  {
    cells: { service: 'API', latency: '42ms', uptime: '99.98%' },
    interactive: true,
    cellStatuses: [{ columnKey: 'uptime', status: 'good' }],
  },
  {
    cells: { service: 'Sync', latency: '310ms', uptime: '97.20%' },
    interactive: true,
    cellStatuses: [
      { columnKey: 'latency', status: 'warning' },
      { columnKey: 'uptime', status: 'warning' },
    ],
  },
  {
    cells: { service: 'Push', latency: '—', uptime: '82.10%' },
    interactive: true,
    cellStatuses: [{ columnKey: 'uptime', status: 'error' }],
  },
]

export default function DataTableGrid() {
  return (
    <DataTable
      variant="grid"
      columns={columns}
      rows={rows}
      className="w-full max-w-lg"
      onRowClick={(index) => console.log('opened', rows[index].cells.service)}
    />
  )
}
