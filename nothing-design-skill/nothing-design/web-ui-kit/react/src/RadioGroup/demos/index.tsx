import { useState } from 'react'
import { RadioGroup } from '@/RadioGroup'

export default function Demo() {
  const [theme, setTheme] = useState('light')
  const [network, setNetwork] = useState('wifi')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Vertical · onValueChange
        </div>
        <RadioGroup
          orientation="vertical"
          value={theme}
          onValueChange={setTheme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' },
          ]}
        />
      </div>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Horizontal · with disabled option
        </div>
        <RadioGroup
          orientation="horizontal"
          value={network}
          onValueChange={setNetwork}
          options={[
            { value: 'wifi', label: 'Wi-Fi' },
            { value: 'cellular', label: 'Cellular' },
            { value: 'offline', label: 'Offline', disabled: true },
          ]}
        />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Theme: {theme} · Network: {network}
      </div>
    </div>
  )
}
