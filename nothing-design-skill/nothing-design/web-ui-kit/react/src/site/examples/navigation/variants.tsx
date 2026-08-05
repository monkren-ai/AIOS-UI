import { useState } from 'react'
import { Navigation } from 'nothing-ui/navigation'

const ITEMS = [{ label: 'Overview' }, { label: 'Devices' }, { label: 'Support' }]

export default function NavigationVariants() {
  const [bracketActive, setBracketActive] = useState(0)
  const [pipeActive, setPipeActive] = useState(1)

  return (
    <div className="flex flex-col items-center gap-6">
      <Navigation
        items={ITEMS}
        variant="bracket"
        activeIndex={bracketActive}
        onChange={setBracketActive}
        syncWithUrl={false}
      />
      <Navigation
        items={ITEMS}
        variant="pipe"
        activeIndex={pipeActive}
        onChange={setPipeActive}
        syncWithUrl={false}
        showBack
        onBack={() => setPipeActive(0)}
      />
    </div>
  )
}
