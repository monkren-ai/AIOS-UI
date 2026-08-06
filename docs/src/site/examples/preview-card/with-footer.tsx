import { PreviewCard } from 'aios-ui-kit/preview-card'
import { Button } from 'aios-ui-kit/button'

/** 一张一定能加载成功的本地封面，省去示例对外部网络的依赖。 */
const cover =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
      <rect width="160" height="90" fill="#1f1f1f"/>
      <circle cx="80" cy="36" r="18" fill="#8f8f8f"/>
      <path d="M20 90c4-22 16-30 40-30s36 8 40 30z" fill="#8f8f8f"/>
    </svg>`,
  )

export default function PreviewCardWithFooter() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      <PreviewCard
        image={cover}
        imageAlt="Engine OS cover"
        meta="Release 2.0"
        title="Engine OS"
        description="A lightweight runtime for ambient devices."
        className="w-72"
        footer={
          <>
            <Button size="sm">Install</Button>
            <Button variant="ghost" size="sm">
              Details
            </Button>
          </>
        }
      />
      <PreviewCard
        variant="compact"
        image={cover}
        imageAlt="Glyph cover"
        meta="Stable"
        title="Glyph"
        description="Iconography drawn on a 16px grid."
        className="w-72"
        footer={
          <Button variant="outline" size="sm" className="w-full">
            View pack
          </Button>
        }
      />
    </div>
  )
}
