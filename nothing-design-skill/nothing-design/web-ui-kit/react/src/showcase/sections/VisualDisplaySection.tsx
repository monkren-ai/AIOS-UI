import DotMatrix from '@/DotMatrix'
import Quotes from '@/Quotes'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface VisualDisplaySectionProps {
  t: T
}

export function VisualDisplaySection({ t }: VisualDisplaySectionProps) {
  return (
    <CategorySection id="visual-display" title={t('视觉展示', 'Visual Display')}>
      <DemoCard title={t('点阵', 'Dot Matrix')}>
        <DotMatrix rows={5} cols={5} dotSize="md" theme="light" />
        <DotMatrix rows={8} cols={8} dotSize="sm" theme="dark" pattern="glyph" />
        <DotMatrix rows={10} cols={10} dotSize="sm" theme="dark" activeDots={[[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [0, 9], [1, 8], [2, 7], [3, 6], [4, 5], [5, 4], [6, 3], [7, 2], [8, 1], [9, 0]]} />
      </DemoCard>

      <DemoCard title={t('引用', 'Quotes')} last>
        <Quotes />
      </DemoCard>
    </CategorySection>
  )
}

export default VisualDisplaySection
