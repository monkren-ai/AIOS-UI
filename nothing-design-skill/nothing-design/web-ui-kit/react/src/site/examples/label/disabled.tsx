import { Input } from 'nothing-ui/input'
import { Label } from 'nothing-ui/label'

export default function LabelDisabled() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="legacy-key" disabled>
        Legacy API key
      </Label>
      <Input id="legacy-key" disabled placeholder="Rotated automatically" />
    </div>
  )
}
