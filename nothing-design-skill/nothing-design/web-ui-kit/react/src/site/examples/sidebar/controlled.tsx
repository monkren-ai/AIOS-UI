import { useState } from 'react'
import { Sidebar } from 'nothing-ui/sidebar'

const ITEMS = [{ label: 'Overview' }, { label: 'Devices' }, { label: 'Settings' }]

export default function SidebarControlled() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        className="rounded-md border border-border-visible bg-transparent px-4 py-2 font-mono text-sm text-foreground"
        onClick={() => setCollapsed((value) => !value)}
      >
        Toggle from outside
      </button>
      <div className="h-72 w-full max-w-xs border border-border-visible">
        <Sidebar items={ITEMS} collapsed={collapsed} onCollapsedChange={setCollapsed} />
      </div>
    </div>
  )
}
