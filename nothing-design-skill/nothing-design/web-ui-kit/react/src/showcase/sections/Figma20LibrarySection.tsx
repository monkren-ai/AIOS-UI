import { Figma20Showcase } from '@/components/showcase/Figma20Showcase'
import { CategorySection } from '../components/CategorySection'
import type { T } from '../hooks/useShowcaseState'

interface Figma20LibrarySectionProps {
  t: T
}

export function Figma20LibrarySection({ t }: Figma20LibrarySectionProps) {
  return (
    <CategorySection id="figma-20-library" title={t('Figma 2.0 库', 'Figma 2.0 Library')}>
      <Figma20Showcase />
    </CategorySection>
  )
}

export default Figma20LibrarySection
