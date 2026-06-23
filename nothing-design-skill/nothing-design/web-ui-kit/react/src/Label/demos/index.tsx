import { Label } from '../Label'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Label>Default label</Label>
      <Label required>Required label</Label>
      <Label disabled>Disabled label</Label>
    </div>
  )
}
