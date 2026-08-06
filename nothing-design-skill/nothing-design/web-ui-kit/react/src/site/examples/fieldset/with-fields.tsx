import { Field } from 'aios-ui-kit/field'
import { Fieldset } from 'aios-ui-kit/fieldset'
import { Input } from 'aios-ui-kit/input'

export default function FieldsetWithFields() {
  return (
    <Fieldset legend="账户">
      <Field label="用户名" description="公开显示">
        <Input placeholder="ruisheng" />
      </Field>
      <Field label="邮箱">
        <Input type="email" placeholder="you@example.com" />
      </Field>
    </Fieldset>
  )
}
