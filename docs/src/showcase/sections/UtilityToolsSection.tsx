import Pomodoro from '@/Pomodoro'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface UtilityToolsSectionProps {
  t: T
}

export function UtilityToolsSection({ t }: UtilityToolsSectionProps) {
  return (
    <CategorySection id="utility-tools" title={t('实用工具', 'Utility Tools')}>
      <DemoCard title={t('番茄钟', 'Pomodoro')} last>
        <Pomodoro style={{ maxWidth: '400px', margin: '0 auto' }} />
      </DemoCard>
    </CategorySection>
  )
}

export default UtilityToolsSection
