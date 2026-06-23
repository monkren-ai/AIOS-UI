import { useState } from 'react'
import { Taskbar } from '@/Taskbar'

export default function Demo() {
  const [activeApp, setActiveApp] = useState<string | null>(null)

  const apps = [
    { name: 'Files', onClick: () => setActiveApp('Files') },
    { name: 'Browser', onClick: () => setActiveApp('Browser') },
    { name: 'Music', onClick: () => setActiveApp('Music') },
    { name: 'Terminal', onClick: () => setActiveApp('Terminal') },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Active app: {activeApp ?? '—'}
      </div>
      <Taskbar theme="dark" apps={apps} />
      <Taskbar
        theme="dark"
        apps={apps.slice(0, 2)}
        showSearch={false}
        showBattery={false}
      />
    </div>
  )
}
