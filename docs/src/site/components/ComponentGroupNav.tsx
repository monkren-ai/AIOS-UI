import { useNavigate } from 'react-router-dom'
import { SegmentedControl } from '@/SegmentedControl'
import { useT } from '../i18n'
import { groupedComponentManifest } from '../registry'
import { COMPONENT_PAGES, getComponentPageHref, type ComponentPage } from '../registry/component-pages'

interface ComponentGroupNavProps {
  activePage: ComponentPage
  groups: ReturnType<typeof groupedComponentManifest>
}

export function ComponentGroupNav({ activePage, groups }: ComponentGroupNavProps) {
  const { t, tb } = useT()
  const navigate = useNavigate()
  const activeIndex = COMPONENT_PAGES.findIndex((page) => page.id === activePage.id)
  const segments = COMPONENT_PAGES.map((page) => {
    const count = groups
      .filter(({ category }) => page.categoryIds.includes(category.id))
      .reduce((sum, group) => sum + group.entries.length, 0)
    return `${tb(page.label)} ${count}`
  })

  return (
    <nav
      aria-label={t('组件分组分页', 'Component group pages')}
      className="sticky top-14 z-40 flex justify-center overflow-x-auto bg-background py-2"
    >
      <SegmentedControl
        segments={segments}
        activeIndex={activeIndex}
        onChange={(index) => navigate(getComponentPageHref(COMPONENT_PAGES[index].id))}
        variant="rounded"
        size="sm"
        className="max-w-full"
        aria-label={t('选择组件分组', 'Select component group')}
      />
    </nav>
  )
}
