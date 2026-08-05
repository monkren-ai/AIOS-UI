import { Textarea } from 'nothing-ui/textarea'

export default function TextareaSizes() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Textarea size="sm" label="Small" placeholder="Compact padding, smaller type" />
      <Textarea size="md" label="Medium" placeholder="The default" />
      <Textarea size="lg" label="Large" placeholder="Roomy padding for long-form writing" />
    </div>
  )
}
