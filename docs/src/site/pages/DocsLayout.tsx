import { Outlet } from 'react-router-dom'
import { SideNav, type SideNavGroup } from '../components/SideNav'
import { useT } from '../i18n'
import { DOC_GROUPS, DOC_PAGES } from '../registry/docs'

/**
 * /docs 的两栏骨架。
 *
 * 侧栏直接由 `DOC_GROUPS` × `DOC_PAGES` 生成，所以注册表加一页就自动出现在导航里。
 */
export function DocsLayout() {
  const { tb } = useT()

  const groups: SideNavGroup[] = DOC_GROUPS.map((group) => {
    const pages = DOC_PAGES.filter((page) => page.group === group.id)
    return {
      id: group.id,
      label: tb(group.label),
      count: pages.length,
      links: pages.map((page) => ({
        to: `/docs/${page.slug}`,
        label: tb(page.title),
      })),
    }
  }).filter((group) => group.links.length > 0)

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 py-8 md:px-6 lg:flex-row lg:gap-10 lg:py-0">
      <SideNav groups={groups} className="lg:py-8" />
      <main className="min-w-0 w-full flex-1 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default DocsLayout
