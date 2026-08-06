import { Switch } from 'aios-ui-kit/switch'

export default function SwitchBasic() {
  return (
    <div className="flex flex-col items-start gap-1">
      <Switch label="Airplane mode" />
      <Switch label="Glyph interface" />
    </div>
  )
}
