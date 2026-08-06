import { Tag, Tags } from 'aios-ui-kit/tag'

const stack = ['React', 'TypeScript', 'Vite', 'Tailwind', 'Base UI', 'Vitest']

export default function TagProximity() {
  return (
    <Tags proximity="x" className="max-w-md justify-center gap-3">
      {stack.map((item) => (
        <Tag key={item} variant="outline">
          {item}
        </Tag>
      ))}
    </Tags>
  )
}
