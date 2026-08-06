import { Surfaces } from 'aios-ui-kit/surfaces'

export default function SurfacesElevations() {
  return (
    <div className="flex flex-col gap-4">
      {([1, 2, 3, 4] as const).map((elevation) => (
        <Surfaces key={elevation} elevation={elevation}>
          <p className="font-mono text-xs text-foreground-muted">elevation={elevation}</p>
        </Surfaces>
      ))}
    </div>
  )
}
