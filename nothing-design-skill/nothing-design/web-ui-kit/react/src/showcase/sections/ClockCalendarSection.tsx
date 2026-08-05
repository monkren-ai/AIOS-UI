import Time from '@/widgets/Time'
import Calendar from '@/Calendar'
import Button from '@/Button'
import DateWidget from '@/Date'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface WorldClockCity {
  name: string
  offset: number
}

interface ClockCalendarSectionProps {
  t: T
  worldClockCities: WorldClockCity[]
  setWorldClockCities: (
    updater: WorldClockCity[] | ((prev: WorldClockCity[]) => WorldClockCity[]),
  ) => void
}

export function ClockCalendarSection({
  t,
  worldClockCities,
  setWorldClockCities,
}: ClockCalendarSectionProps) {
  return (
    <CategorySection id="clock-calendar" title={t('时钟与日历', 'Clock & Calendar')}>
      <DemoCard title={t('时钟', 'Clock')}>
        <Time
          variant="digital-compact"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        />
        <Time variant="dial" />
      </DemoCard>

      <DemoCard title={t('日历', 'Calendar')}>
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

      <DemoCard title={t('世界时钟', 'World Clock')} last>
        <Time variant="world" cities={worldClockCities} />
        <div className="showcase-row">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setWorldClockCities((prev) => [...prev, { name: t('上海', 'SHANGHAI'), offset: 8 }])
            }
          >
            {t('添加上海', 'Add Shanghai')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setWorldClockCities((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
            }
          >
            {t('移除最后', 'Remove Last')}
          </Button>
        </div>
      </DemoCard>

      <DemoCard title={t('日期小组件', 'Date Widget')} variant="flex-wrap">
        <DateWidget type="rect" theme="light" />
        <DateWidget type="rect" theme="dark" />
        <DateWidget type="dual-ring" theme="light" />
        <DateWidget type="dual-ring" theme="dark" />
      </DemoCard>
    </CategorySection>
  )
}

export default ClockCalendarSection
