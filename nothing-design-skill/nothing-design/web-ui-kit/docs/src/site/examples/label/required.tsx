import { Input } from 'aios-ui-kit/input'
import { Label } from 'aios-ui-kit/label'

export default function LabelRequired() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="serial" required>
        Serial number
      </Label>
      <Input id="serial" required aria-required placeholder="A063-0000-0000" />
    </div>
  )
}
