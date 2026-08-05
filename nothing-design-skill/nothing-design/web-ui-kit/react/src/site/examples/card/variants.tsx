import { Card } from 'nothing-ui/card'

const variants = ['soft', 'secondary', 'outline', 'ghost'] as const

export default function CardVariants() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {variants.map((variant) => (
        <Card key={variant} variant={variant} title={variant}>
          Every variant keeps the same 1px border box; only the surface fill changes.
        </Card>
      ))}
    </div>
  )
}
