import { Fieldset } from 'aios-ui-kit/fieldset'

export default function FieldsetBasic() {
  return (
    <Fieldset legend="通知">
      <label className="flex items-center gap-2 font-mono text-sm text-foreground">
        <input type="checkbox" />
        接收邮件
      </label>
      <label className="flex items-center gap-2 font-mono text-sm text-foreground">
        <input type="checkbox" />
        接收推送
      </label>
    </Fieldset>
  )
}
