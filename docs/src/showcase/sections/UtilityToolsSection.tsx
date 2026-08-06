import MusicPlayer from '@/MusicPlayer'
import PhotoCarousel from '@/PhotoCarousel'
import Caffeinate from '@/Caffeinate'
import Clipboard from '@/Clipboard'
import Pomodoro from '@/Pomodoro'
import WalkieTalkie from '@/WalkieTalkie'
import Taskbar from '@/Taskbar'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface UtilityToolsSectionProps {
  t: T
}

export function UtilityToolsSection({ t }: UtilityToolsSectionProps) {
  return (
    <CategorySection id="utility-tools" title={t('实用工具', 'Utility Tools')}>
      <DemoCard title={t('音乐播放器', 'Music Player')}>
        <MusicPlayer style={{ maxWidth: '400px', margin: '0 auto' }} />
      </DemoCard>

      <DemoCard title={t('图片轮播', 'Photo Carousel')}>
        <PhotoCarousel />
      </DemoCard>

      <DemoCard title={t('防睡眠', 'Caffeinate')}>
        <Caffeinate style={{ maxWidth: '400px' }} />
      </DemoCard>

      <DemoCard title={t('剪贴板', 'Clipboard')}>
        <Clipboard style={{ maxWidth: '400px' }} />
      </DemoCard>

      <DemoCard title={t('番茄钟', 'Pomodoro')}>
        <Pomodoro style={{ maxWidth: '400px', margin: '0 auto' }} />
      </DemoCard>

      <DemoCard title={t('对讲机', 'Walkie Talkie')}>
        <WalkieTalkie style={{ maxWidth: '300px', margin: '0 auto' }} />
      </DemoCard>

      <DemoCard title={t('任务栏', 'Taskbar')} last>
        <Taskbar />
      </DemoCard>
    </CategorySection>
  )
}

export default UtilityToolsSection
