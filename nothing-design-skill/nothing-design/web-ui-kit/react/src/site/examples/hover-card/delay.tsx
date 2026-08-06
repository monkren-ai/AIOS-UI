import { HoverCard } from 'aios-ui-kit/hover-card'

const LINKS = [
  { delay: 0, label: 'No delay' },
  { delay: 300, label: 'Default (300 ms)' },
  { delay: 700, label: 'Deliberate (700 ms)' },
]

export default function HoverCardDelay() {
  return (
    <div className="flex flex-col items-center gap-3">
      {LINKS.map(({ delay, label }) => (
        <HoverCard
          key={delay}
          delay={delay}
          content={<p className="w-52 text-sm">Opened after {delay} ms of hovering.</p>}
        >
          <button className="font-mono text-sm underline underline-offset-4">{label}</button>
        </HoverCard>
      ))}
    </div>
  )
}
