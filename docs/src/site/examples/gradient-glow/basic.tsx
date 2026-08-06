import { GradientGlow } from 'aios-ui-kit/gradient-glow'

export default function GradientGlowBasic() {
  return (
    <div className="relative flex h-48 w-full max-w-md items-center justify-center overflow-hidden rounded-card border border-border bg-surface">
      <GradientGlow />
      <span className="relative font-mono text-label uppercase tracking-wider text-foreground-muted">
        ambient
      </span>
    </div>
  )
}
