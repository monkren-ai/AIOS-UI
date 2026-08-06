import { useState } from 'react'
import { Battery, type BatteryDevice } from 'aios-ui-kit/battery'

const DEVICES: BatteryDevice[] = [
  { name: 'Magic Mouse', type: 'mouse', percent: 84 },
  { name: 'Keyboard', type: 'keyboard', percent: 46 },
  { name: 'Ear (2)', type: 'earbuds', percent: 91, isCharging: true },
  { name: 'Phone (1)', type: 'phone', percent: 12 },
]

export default function BatteryDevices() {
  const [lastClicked, setLastClicked] = useState<string | null>(null)

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Battery
        percent={73}
        widgetMode="card"
        devices={DEVICES}
        onDeviceClick={(device) => setLastClicked(device.name)}
        className="w-full max-w-sm"
      />
      <p className="font-mono text-caption text-foreground-muted">
        {lastClicked ? `Clicked: ${lastClicked}` : 'Click a device to select it'}
      </p>
    </div>
  )
}
