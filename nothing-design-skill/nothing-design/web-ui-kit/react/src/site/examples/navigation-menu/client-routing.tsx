import { useState } from 'react'
import { NavigationMenu } from 'nothing-ui/navigation-menu'

export default function NavigationMenuClientRouting() {
  const [route, setRoute] = useState('/home')

  const items = [
    { label: 'Home', href: '/home', active: route === '/home', onClick: () => setRoute('/home') },
    {
      label: 'Devices',
      href: '/phone',
      active: route.startsWith('/phone') || route.startsWith('/ear'),
      children: [
        { label: 'Phone', href: '/phone', onClick: () => setRoute('/phone') },
        { label: 'Ear', href: '/ear', onClick: () => setRoute('/ear') },
      ],
    },
    {
      label: 'Support',
      href: '/support',
      active: route === '/support',
      onClick: () => setRoute('/support'),
    },
  ]

  return (
    <div className="flex flex-col items-center gap-3">
      <NavigationMenu items={items} />
      <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
        Current route: {route}
      </p>
    </div>
  )
}
