import { Field } from 'aios-ui-kit/field'

export default function FieldWithError() {
  return (
    <Field label="邀请码" error="邀请码已失效" required>
      <input
        defaultValue="X-0001"
        className="h-11 min-w-0 rounded-input border border-accent bg-transparent px-3 font-mono text-foreground outline-none"
      />
    </Field>
  )
}
