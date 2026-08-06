import { Textarea } from 'aios-ui-kit/textarea'

export default function TextareaValidation() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Textarea
        label="Release notes"
        message="Markdown is supported."
        placeholder="What changed?"
      />
      <Textarea
        label="Bug report"
        error="Tell us what you expected to happen."
        placeholder="Steps to reproduce"
      />
      <Textarea label="Archived" disabled placeholder="Read-only once the report is filed." />
    </div>
  )
}
