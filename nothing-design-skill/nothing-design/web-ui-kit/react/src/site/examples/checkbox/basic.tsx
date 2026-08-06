import { Checkbox } from 'aios-ui-kit/checkbox'

export default function CheckboxBasic() {
  return (
    <div className="flex flex-col items-start gap-1">
      <Checkbox label="Glyph notifications" defaultChecked />
      <Checkbox label="Haptic feedback" />
      <Checkbox label="Beta channel" disabled />
    </div>
  )
}
