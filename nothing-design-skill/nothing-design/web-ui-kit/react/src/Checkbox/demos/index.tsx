import { Checkbox } from '../Checkbox'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Checkbox label="Notifications" defaultChecked />
      <Checkbox label="Auto-update" />
      <Checkbox label="Select all" checked="indeterminate" />
      <Checkbox label="Disabled option" disabled />
    </div>
  )
}
