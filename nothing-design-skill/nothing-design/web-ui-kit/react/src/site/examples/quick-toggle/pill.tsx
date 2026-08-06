import { useState } from 'react'
import { QuickToggle } from 'aios-ui-kit/quick-toggle'

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

export default function QuickToggleVariantPill() {
  const [dnd, setDnd] = useState(false)

  return (
    <QuickToggle
      variant="pill"
      icon={<MoonIcon />}
      label="Do Not Disturb"
      active={dnd}
      theme={dnd ? 'dark' : 'light'}
      onClick={() => setDnd((value) => !value)}
    />
  )
}
