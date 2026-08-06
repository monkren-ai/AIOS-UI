import { useState } from 'react'
import { Sidebar } from 'aios-ui-kit/sidebar'

function SquareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" stroke="currentColor" />
    </svg>
  )
}

export default function SidebarBasic() {
  const [active, setActive] = useState('devices')

  const items = [
    {
      label: 'Overview',
      icon: <SquareIcon />,
      active: active === 'overview',
      onClick: () => setActive('overview'),
    },
    {
      label: 'Devices',
      icon: <SquareIcon />,
      badge: 3,
      active: active === 'devices',
      onClick: () => setActive('devices'),
    },
    {
      label: 'Settings',
      icon: <SquareIcon />,
      active: active === 'settings',
      onClick: () => setActive('settings'),
    },
  ]

  return (
    <div className="h-80 w-full max-w-xs border border-border-visible">
      <Sidebar
        items={items}
        header={<span className="font-mono text-caption uppercase tracking-wider">Nothing OS</span>}
        footer={<span className="font-mono text-caption text-foreground-muted">v2.0</span>}
      />
    </div>
  )
}
