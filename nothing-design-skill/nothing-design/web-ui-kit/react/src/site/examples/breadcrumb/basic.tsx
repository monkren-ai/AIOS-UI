import { Breadcrumb } from 'nothing-ui/breadcrumb'

export default function BreadcrumbBasic() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Breadcrumb' },
      ]}
    />
  )
}
