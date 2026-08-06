import { NavigationMenu } from 'aios-ui-kit/navigation-menu'

const ITEMS = [
  { label: 'Overview', href: '#overview', active: true },
  { label: 'Devices', href: '#devices' },
  {
    label: 'Settings',
    href: '#settings',
    children: [
      { label: 'Display', href: '#display' },
      { label: 'Glyph', href: '#glyph' },
    ],
  },
]

export default function NavigationMenuVertical() {
  return (
    <div className="w-full max-w-45">
      <NavigationMenu items={ITEMS} orientation="vertical" />
    </div>
  )
}
