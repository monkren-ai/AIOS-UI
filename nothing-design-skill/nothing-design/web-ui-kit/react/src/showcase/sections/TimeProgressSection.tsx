import Button from '@/Button'
import SunDial from '@/SunDial'
import AgeMotion from '@/AgeMotion'
import Chrono from '@/Chrono'
import Spinner from '@/Spinner'
import NextEvent from '@/NextEvent'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface TimeProgressSectionProps {
  t: T
  spinnerItems: string[]
  setSpinnerItems: (
    updater: string[] | ((prev: string[]) => string[]),
  ) => void
}

export function TimeProgressSection({ t, spinnerItems, setSpinnerItems }: TimeProgressSectionProps) {
  return (
    <CategorySection id="time-progress" title={t('时间与进度', 'Time & Progress')}>
      <DemoCard title={t('日晷', 'Sun Dial')}>
        <SunDial style={{ maxWidth: '400px', margin: '0 auto' }} />
      </DemoCard>

      <DemoCard title={t('年龄动态', 'Age Motion')}>
        <AgeMotion style={{ maxWidth: '400px', margin: '0 auto' }} />
      </DemoCard>

      <DemoCard title={t('计时', 'Chrono')}>
        <Chrono style={{ maxWidth: '400px', margin: '0 auto' }} />
      </DemoCard>

      <DemoCard title={t('旋转器', 'Spinner')}>
        <Spinner items={spinnerItems} style={{ maxWidth: '400px', margin: '0 auto' }} />
        <div className="showcase-row">
          <Button variant="secondary" size="sm" onClick={() => setSpinnerItems((prev) => [...prev.slice(1), prev[0]])}>{t('旋转条目', 'Rotate Items')}</Button>
          <Button variant="ghost" size="sm" onClick={() => setSpinnerItems([t('是', 'YES'), t('否', 'NO'), t('可能', 'MAYBE'), t('稍后', 'LATER'), t('跳过', 'SKIP'), t('尝试', 'TRY')])}>{t('重置', 'Reset')}</Button>
        </div>
      </DemoCard>

      <DemoCard title={t('下一个事件', 'Next Event')} last>
        <NextEvent />
      </DemoCard>
    </CategorySection>
  )
}

export default TimeProgressSection
