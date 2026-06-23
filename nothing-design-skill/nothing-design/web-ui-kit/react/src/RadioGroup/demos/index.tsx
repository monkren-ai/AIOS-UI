import { RadioGroup } from '../RadioGroup'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <RadioGroup
        orientation="vertical"
        defaultValue="light"
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'auto', label: 'Auto' },
        ]}
      />
      <RadioGroup
        orientation="horizontal"
        defaultValue="wifi"
        options={[
          { value: 'wifi', label: 'Wi-Fi' },
          { value: 'cellular', label: 'Cellular' },
          { value: 'offline', label: 'Offline', disabled: true },
        ]}
      />
    </div>
  )
}
