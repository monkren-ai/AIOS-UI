import { Textarea } from 'aios-ui-kit/textarea'

export default function TextareaVariants() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Textarea variant="outline" label="Outline" placeholder="Transparent background" />
      <Textarea variant="soft" label="Soft" placeholder="Raised surface" />
    </div>
  )
}
