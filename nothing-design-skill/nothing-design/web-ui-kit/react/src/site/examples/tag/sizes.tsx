import { Tag } from 'nothing-ui/tag'

export default function TagSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Tag size="sm">sm</Tag>
        <Tag size="md">md</Tag>
        <Tag size="lg">lg</Tag>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Tag size="sm" shape="technical">
          sm
        </Tag>
        <Tag size="md" shape="technical">
          md
        </Tag>
        <Tag size="lg" shape="technical">
          lg
        </Tag>
      </div>
    </div>
  )
}
