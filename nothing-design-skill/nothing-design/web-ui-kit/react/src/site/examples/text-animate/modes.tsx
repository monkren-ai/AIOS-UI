import { TextAnimate } from 'aios-ui-kit/text-animate'

export default function TextAnimateModes() {
  return (
    <div className="flex max-w-md flex-col gap-6 font-body text-base text-foreground">
      <div>
        <div className="mb-1 font-mono text-label uppercase tracking-wider text-foreground-muted">
          char
        </div>
        <TextAnimate mode="char">dot by dot</TextAnimate>
      </div>
      <div>
        <div className="mb-1 font-mono text-label uppercase tracking-wider text-foreground-muted">
          word
        </div>
        <TextAnimate mode="word">dot by dot</TextAnimate>
      </div>
      <div>
        <div className="mb-1 font-mono text-label uppercase tracking-wider text-foreground-muted">
          line
        </div>
        <TextAnimate mode="line">{'first line\nsecond line\nthird line'}</TextAnimate>
      </div>
    </div>
  )
}
