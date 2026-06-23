import { NavigationMenu } from '../NavigationMenu'

export default function Demo() {
  const items = [
    { label: 'Home', href: '#', active: true },
    {
      label: 'Products',
      children: [
        { label: 'Phone', href: '#' },
        { label: 'Ear', href: '#' },
        { label: 'Watch', href: '#' },
      ],
    },
    {
      label: 'About',
      children: [
        { label: 'Company', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    { label: 'Contact', href: '#' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <NavigationMenu items={items} orientation="horizontal" />
      <NavigationMenu items={items} orientation="vertical" />
    </div>
  )
}
