import { Breadcrumb } from 'aios-ui-kit/breadcrumb'

const items = [{ label: 'AIOS', href: '#' }, { label: 'Phone', href: '#' }, { label: '2a Plus' }]

export default function BreadcrumbSeparator() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Breadcrumb items={items} />
      <Breadcrumb items={items} separator="›" />
      <Breadcrumb items={items} separator="·" />
    </div>
  )
}
