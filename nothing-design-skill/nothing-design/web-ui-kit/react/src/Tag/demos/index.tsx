import { useState } from 'react'
import { Tag, Tags } from '@/Tag'

type TagItem = {
  id: number
  label: string
  variant: 'pill' | 'technical'
}

export default function Demo() {
  const [tags, setTags] = useState<TagItem[]>([
    { id: 1, label: 'Design', variant: 'pill' },
    { id: 2, label: 'Engineering', variant: 'technical' },
    { id: 3, label: 'Product', variant: 'pill' },
    { id: 4, label: 'Research', variant: 'technical' },
  ])
  const [nextId, setNextId] = useState(5)

  const handleRemove = (id: number) => {
    setTags((prev) => prev.filter((t) => t.id !== id))
  }

  const handleAdd = () => {
    setTags((prev) => [...prev, { id: nextId, label: `Tag ${nextId}`, variant: 'pill' }])
    setNextId((n) => n + 1)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Tags>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            variant={tag.variant}
            removable
            onRemove={() => handleRemove(tag.id)}
          >
            {tag.label}
          </Tag>
        ))}
      </Tags>
      <button className="nothing-btn nothing-btn--secondary" onClick={handleAdd}>
        + Add tag
      </button>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        {tags.length} tag(s) remaining
      </div>
    </div>
  )
}
