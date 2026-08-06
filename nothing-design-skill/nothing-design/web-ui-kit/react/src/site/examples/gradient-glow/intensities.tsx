import { GradientGlow } from 'aios-ui-kit/gradient-glow'

const INTENSITIES = ['subtle', 'normal', 'strong'] as const

export default function GradientGlowIntensities() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
      {INTENSITIES.map((intensity) => (
        <div
          key={intensity}
          className="relative flex h-40 items-center justify-center overflow-hidden rounded-card border border-border bg-surface"
        >
          <GradientGlow intensity={intensity} />
          <span className="relative font-mono text-label uppercase tracking-wider text-foreground-muted">
            {intensity}
          </span>
        </div>
      ))}
    </div>
  )
}
