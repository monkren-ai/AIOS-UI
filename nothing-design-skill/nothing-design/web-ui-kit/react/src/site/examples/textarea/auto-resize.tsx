import { Textarea } from 'nothing-ui/textarea'

export default function TextareaAutoResize() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Textarea
        autoResize
        minRows={2}
        maxRows={6}
        label="Auto-resizing"
        placeholder="Keep typing — this grows from 2 rows up to 6, then scrolls."
      />
      <Textarea
        minRows={2}
        label="Fixed"
        placeholder="Stays at 2 rows; the user drags the corner to make it bigger."
      />
    </div>
  )
}
