import { Breadcrumb } from 'aios-ui-kit/breadcrumb'

const items = [
  { label: 'Settings', href: '#' },
  { label: 'Devices', href: '#' },
  { label: 'Phone (2a)' },
]

export default function BreadcrumbSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Breadcrumb size="sm" items={items} />
      <Breadcrumb size="md" items={items} />
      <Breadcrumb size="lg" items={items} />
    </div>
  )
}
