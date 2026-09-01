import { useState } from 'react'
import { QuickToggle } from 'aios-ui-kit/quick-toggle'

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5a10.94 10.94 0 0 1 14 0" />
      <path d="M8.5 16a6.5 6.5 0 0 1 7 0" />
      <path d="M2 8.5a15.9 15.9 0 0 1 20 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BluetoothIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 6.5 17.5 17.5 12 22V2l5.5 4.5L6.5 17.5" />
    </svg>
  )
}

export default function QuickToggleBasic() {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(false)

  return (
    <div className="flex gap-4">
      <QuickToggle
        icon={<WifiIcon />}
        label="Wi-Fi"
        active={wifi}

        onClick={() => setWifi((value) => !value)}
      />
      <QuickToggle
        icon={<BluetoothIcon />}
        label="Bluetooth"
        active={bluetooth}

        onClick={() => setBluetooth((value) => !value)}
      />
    </div>
  )
}
