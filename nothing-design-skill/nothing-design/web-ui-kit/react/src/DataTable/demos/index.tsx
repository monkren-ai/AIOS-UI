import { DataTable } from '../DataTable'

export default function Demo() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'value', label: 'Value', type: 'numeric' as const },
  ]
  const rows = [
    { id: '1', cells: { name: 'Alpha', value: 42 } },
    { id: '2', cells: { name: 'Beta', value: 17 } },
  ]
  return <DataTable variant="table" columns={columns} rows={rows} striped />
}
