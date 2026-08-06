import { Badge } from 'aios-ui-kit/badge'

const variants = ['primary', 'soft', 'outline', 'destructive'] as const

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  )
}
