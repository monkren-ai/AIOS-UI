import { AspectRatio } from 'aios-ui-kit/aspect-ratio'

const ratios = [
  { ratio: 16 / 9, label: '16 / 9' },
  { ratio: 4 / 3, label: '4 / 3' },
  { ratio: 1, label: '1 / 1' },
  { ratio: 21 / 9, label: '21 / 9' },
]

export default function AspectRatioRatios() {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {ratios.map(({ ratio, label }) => (
        <AspectRatio
          key={label}
          ratio={ratio}
          className="border border-border-visible bg-surface-raised"
        >
          <div className="flex h-full w-full items-center justify-center font-mono text-label uppercase tracking-wider text-foreground-muted">
            {label}
          </div>
        </AspectRatio>
      ))}
    </div>
  )
}
