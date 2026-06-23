import { Breadcrumb } from '../Breadcrumb'

export default function Demo() {
  const items = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Current Page' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Breadcrumb items={items} />
      <Breadcrumb items={items} separator="›" />
    </div>
  )
}
