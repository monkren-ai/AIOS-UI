import { useState } from 'react'
import { Sidebar } from '../Sidebar'

export default function Demo() {
  const [collapsed, setCollapsed] = useState(false)
  const items = [
    { label: 'Dashboard', active: true, icon: '▣' },
    { label: 'Inbox', badge: 3, icon: '✉' },
    { label: 'Settings', icon: '⚙' },
  ]
  return (
    <div style={{ height: 320, display: 'flex' }}>
      <Sidebar
        items={items}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        header={<span>Nothing</span>}
        footer={<span>v1.0</span>}
      />
    </div>
  )
}
