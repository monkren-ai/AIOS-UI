import { WidgetShowcase } from '@/components/showcase/WidgetShowcase'
import { CategorySection } from '../components/CategorySection'
import type { T } from '../hooks/useShowcaseState'

interface FeatureWidgetsSectionProps {
  t: T
}

export function FeatureWidgetsSection({ t }: FeatureWidgetsSectionProps) {
  return (
    <CategorySection id="feature-widgets" title={t('特色组件', 'Feature Widgets')}>
      <WidgetShowcase />
    </CategorySection>
  )
}

export default FeatureWidgetsSection
