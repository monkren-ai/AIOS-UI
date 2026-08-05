import { ScrollArea } from 'nothing-ui/scroll-area'

const PARAGRAPHS = [
  'Nothing OS keeps the system font, the grid, and the dot matrix consistent across every surface.',
  'The Glyph interface turns notifications into light patterns, so the phone can stay face down.',
  'Everything ships unlocked, with two years of warranty and five years of security updates.',
  'Repairs are handled in-region, and the battery is rated for 1000 full charge cycles.',
]

export default function ScrollAreaBasic() {
  return (
    <ScrollArea className="w-full max-w-md border border-border-visible" height="160px">
      <div className="flex flex-col gap-3 p-4 font-body text-base text-foreground-muted">
        {PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </ScrollArea>
  )
}
