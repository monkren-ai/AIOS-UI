import { Input } from 'aios-ui-kit/input'
import { Label } from 'aios-ui-kit/label'

export default function LabelBasic() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="workspace">Workspace</Label>
      <Input id="workspace" placeholder="aios-ui-kit" />
    </div>
  )
}
