import { matchPath, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { ComponentGroupNav } from '../components/ComponentGroupNav'
import { SideNav, type SideNavGroup } from '../components/SideNav'
import { useT } from '../i18n'
import {
  COMPONENT_MANIFEST_BY_SLUG,
  getComponentName,
  groupedComponentManifest,
} from '../registry'
import { getComponentPage, getComponentPageByCategory } from '../registry/component-pages'

export function ComponentsLayout() {
  const { t, tb, lang } = useT()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const allGroups = groupedComponentManifest()
  const detailMatch = matchPath('/components/:slug', location.pathname)
  const detailEntry = detailMatch?.params.slug
    ? COMPONENT_MANIFEST_BY_SLUG.get(detailMatch.params.slug)
    : undefined
  const activePage = detailEntry
    ? getComponentPageByCategory(detailEntry.category)
    : getComponentPage(searchParams.get('group'))

  const groups: SideNavGroup[] = allGroups
    .filter(({ category }) => activePage.categoryIds.includes(category.id))
    .map(({ category, entries }) => ({
      id: category.id,
      label: tb(category.label),
      count: entries.length,
      links: entries.map((doc) => ({
        to: `/components/${doc.slug}`,
        label: getComponentName(doc, lang),
        badge:
          doc.status === 'new' || doc.status === 'beta' ? doc.status.toUpperCase() : undefined,
      })),
    }))

  return (
    <div className="mx-auto w-full px-4 py-8 md:px-6">
      <ComponentGroupNav activePage={activePage} groups={allGroups} />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-10">
        <SideNav groups={groups} ariaLabel={t('组件导航', 'Component navigation')} />
        <main className="min-w-0 w-full flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ComponentsLayout
