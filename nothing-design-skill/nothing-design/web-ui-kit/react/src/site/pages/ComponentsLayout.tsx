import { Outlet } from 'react-router-dom'
import { SideNav, type SideNavGroup } from '../components/SideNav'
import { useT } from '../i18n'
import { groupedComponentManifest } from '../registry'

export function ComponentsLayout() {
  const { tb } = useT()

  const groups: SideNavGroup[] = groupedComponentManifest().map(({ category, entries }) => ({
    id: category.id,
    label: tb(category.label),
    count: entries.length,
    links: entries.map((doc) => ({
      to: `/components/${doc.slug}`,
      label: doc.name,
      badge: doc.status === 'new' || doc.status === 'beta' ? doc.status.toUpperCase() : undefined,
    })),
  }))

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 py-8 md:px-6 lg:flex-row lg:gap-10 lg:py-0">
      <SideNav groups={groups} />
      <main className="min-w-0 w-full flex-1 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default ComponentsLayout
