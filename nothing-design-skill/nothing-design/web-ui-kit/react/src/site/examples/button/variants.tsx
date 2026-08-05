import { Button } from 'nothing-ui/button'

const variants = [
  'primary',
  'primary-outline',
  'secondary',
  'soft',
  'outline',
  'ghost',
  'destructive',
] as const

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  )
}
