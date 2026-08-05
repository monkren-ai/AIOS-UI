import * as React from 'react'
import { Breadcrumb } from 'nothing-ui/breadcrumb'

const trail = ['Library', 'Albums', 'Ex:Re']

export default function BreadcrumbClientRouting() {
  const [depth, setDepth] = React.useState(trail.length)

  return (
    <div className="flex flex-col items-center gap-3">
      <Breadcrumb
        items={trail.slice(0, depth).map((label, index) => ({
          label,
          href: `#/${label.toLowerCase()}`,
          onClick: () => setDepth(index + 1),
        }))}
      />
      <button
        type="button"
        className="font-mono text-caption uppercase tracking-wider text-foreground-muted hover:text-foreground"
        onClick={() => setDepth(trail.length)}
      >
        Reset
      </button>
    </div>
  )
}
