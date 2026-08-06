import { Field } from 'aios-ui-kit/field'

export default function FieldBasic() {
  return (
    <Field label="邮箱" description="用于登录与找回密码">
      <input
        type="email"
        className="h-11 min-w-0 rounded-input border border-border-visible bg-transparent px-3 font-mono text-foreground outline-none transition-colors focus:border-foreground"
      />
    </Field>
  )
}
