import { useState } from 'react'
import { Switch } from '@/Switch'

export default function Demo() {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Switch label="Wi-Fi" on={wifi} onChange={setWifi} />
      <Switch label="Bluetooth" on={bluetooth} onChange={setBluetooth} />
      <Switch label="Disabled" disabled />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Wi-Fi: {wifi ? 'on' : 'off'} · Bluetooth: {bluetooth ? 'on' : 'off'}
      </div>
    </div>
  )
}
