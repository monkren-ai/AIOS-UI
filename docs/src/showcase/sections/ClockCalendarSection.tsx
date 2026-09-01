import Calendar from '@/Calendar'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface ClockCalendarSectionProps {
  t: T
}

export function ClockCalendarSection({ t }: ClockCalendarSectionProps) {
  return (
    <CategorySection id="clock-calendar" title={t('时钟与日历', 'Clock & Calendar')}>
      <DemoCard title={t('日历', 'Calendar')} last>
        <Calendar
          type="compact"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        />
        <Calendar type="full" />
      </DemoCard>

    </CategorySection>
  )
}

export default ClockCalendarSection
