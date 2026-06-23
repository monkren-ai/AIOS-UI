import { Switch } from '../Switch'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Switch label="Wi-Fi" on />
      <Switch label="Bluetooth" />
      <Switch label="Disabled" disabled />
    </div>
  )
}
