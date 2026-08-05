import { NavigationMenu } from 'nothing-ui/navigation-menu'

const ITEMS = [
  { label: 'Home', href: '#home', active: true },
  {
    label: 'Products',
    href: '#products',
    children: [
      { label: 'Phone (3a)', href: '#phone' },
      { label: 'Ear (open)', href: '#ear' },
      { label: 'CMF', href: '#cmf' },
    ],
  },
  { label: 'Support', href: '#support' },
]

export default function NavigationMenuBasic() {
  return <NavigationMenu items={ITEMS} />
}
