import { QuickToggle } from '../QuickToggle'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <QuickToggle variant="circle" theme="light" label="Wi-Fi" active />
      <QuickToggle variant="circle" theme="dark" label="BT" />
      <QuickToggle variant="circle" theme="accent" label="Air" active />
      <QuickToggle variant="pill" theme="light" label="Focus" />
    </div>
  )
}
