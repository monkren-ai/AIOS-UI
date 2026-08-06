import { DataTable } from 'aios-ui-kit/data-table'

const columns = [
  { key: 'device', label: 'Device' },
  { key: 'status', label: 'Status' },
  { key: 'battery', label: 'Battery', type: 'numeric' as const, align: 'right' as const },
]

const rows = [
  { cells: { device: 'Phone (2a)', status: 'Connected', battery: '87%' } },
  { cells: { device: 'Ear (stick)', status: 'Connected', battery: '54%' } },
  { cells: { device: 'Ear (open)', status: 'Idle', battery: '12%' } },
]

export default function DataTableTable() {
  return (
    <DataTable
      variant="table"
      columns={columns}
      rows={rows}
      caption="Paired devices"
      striped
      hoverable
      className="w-full max-w-lg"
    />
  )
}
