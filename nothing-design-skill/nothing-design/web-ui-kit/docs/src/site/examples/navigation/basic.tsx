import { useState } from 'react'
import { Navigation } from 'aios-ui-kit/navigation'

const ITEMS = [{ label: 'Overview' }, { label: 'Devices' }, { label: 'Support' }]

export default function NavigationBasic() {
  const [active, setActive] = useState(0)

  return <Navigation items={ITEMS} activeIndex={active} onChange={setActive} syncWithUrl={false} />
}
