import { Switch } from 'aios-ui-kit/switch'

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col items-start gap-1">
      <Switch label="Developer mode" disabled />
      <Switch label="Telemetry (required)" checked disabled />
    </div>
  )
}
