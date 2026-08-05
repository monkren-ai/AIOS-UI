import * as React from 'react'
import { Tag, Tags } from 'nothing-ui/tag'

export default function TagRemovable() {
  const [keywords, setKeywords] = React.useState(['monochrome', 'glyph', 'dot-matrix'])

  return (
    <Tags className="justify-center gap-3">
      {keywords.map((keyword) => (
        <Tag
          key={keyword}
          variant="soft"
          removable
          onRemove={() => setKeywords((current) => current.filter((item) => item !== keyword))}
        >
          {keyword}
        </Tag>
      ))}
      {keywords.length === 0 && (
        <span className="text-sm text-foreground-muted">No keywords left.</span>
      )}
    </Tags>
  )
}
