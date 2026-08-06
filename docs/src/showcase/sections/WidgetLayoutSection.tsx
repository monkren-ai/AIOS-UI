import { WidgetCard } from '@/Card'
import WidgetGrid from '@/components/WidgetGrid'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface WidgetLayoutSectionProps {
  t: T
}

export function WidgetLayoutSection({ t }: WidgetLayoutSectionProps) {
  return (
    <CategorySection id="widget-layout" title={t('组件布局', 'Widget Layout')}>
      <DemoCard title={t('组件卡片', 'Widget Card')}>
        <WidgetCard />
      </DemoCard>

      <DemoCard title={t('组件网格', 'Widget Grid')} last>
        <WidgetGrid />
      </DemoCard>
    </CategorySection>
  )
}

export default WidgetLayoutSection
