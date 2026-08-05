import * as React from 'react'
import { Tag, Tags } from 'nothing-ui/tag'

const topics = ['Design', 'Hardware', 'Firmware', 'Retail']

export default function TagFilter() {
  const [active, setActive] = React.useState<string[]>(['Design'])

  const toggle = (topic: string) =>
    setActive((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic],
    )

  return (
    <Tags className="justify-center gap-3">
      {topics.map((topic) => (
        <Tag
          key={topic}
          active={active.includes(topic)}
          aria-pressed={active.includes(topic)}
          onClick={() => toggle(topic)}
        >
          {topic}
        </Tag>
      ))}
      <Tag disabled>Archived</Tag>
    </Tags>
  )
}
