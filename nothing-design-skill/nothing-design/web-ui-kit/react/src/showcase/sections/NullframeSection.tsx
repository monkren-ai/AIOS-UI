import { Suspense, lazy } from 'react'
import { CategorySection } from '../components/CategorySection'
import type { T } from '../hooks/useShowcaseState'

const NullframeDashboard = lazy(() => import('@/nullframe/NullframeDashboard'))

interface NullframeSectionProps {
  t: T
}

export function NullframeSection({ t }: NullframeSectionProps) {
  return (
    <CategorySection id="nullframe" title={t('Nullframe 仪表盘', 'Nullframe Dashboard')}>
      <Suspense
        fallback={<div className="showcase-suspense-fallback">{t('加载中…', 'Loading...')}</div>}
      >
        <NullframeDashboard />
      </Suspense>
    </CategorySection>
  )
}

export default NullframeSection
