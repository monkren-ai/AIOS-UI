import { Input } from 'nothing-ui/input'
import { Label } from 'nothing-ui/label'

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
