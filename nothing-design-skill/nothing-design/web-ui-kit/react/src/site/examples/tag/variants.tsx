import { Tag } from 'nothing-ui/tag'

const variants = ['secondary', 'soft', 'outline', 'ghost', 'destructive'] as const

export default function TagVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </div>
  )
}
