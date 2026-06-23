import { useState } from 'react'
import { Navigation } from '../Navigation'

export default function Demo() {
  const [active, setActive] = useState(0)
  const items = [
    { label: 'Home' },
    { label: 'Projects' },
    { label: 'About' },
    { label: 'Contact' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Navigation items={items} activeIndex={active} onChange={setActive} />
      <Navigation
        items={items}
        activeIndex={active}
        onChange={setActive}
        variant="bracket"
      />
      <Navigation
        items={items}
        activeIndex={active}
        onChange={setActive}
        variant="pipe"
      />
    </div>
  )
}
