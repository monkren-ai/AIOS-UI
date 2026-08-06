import { Field } from 'aios-ui-kit/field'
import { Input } from 'aios-ui-kit/input'

export default function FieldWithInput() {
  return (
    <Field label="项目名称" description="3–32 个字符" required>
      <Input placeholder="my-project" />
    </Field>
  )
}
