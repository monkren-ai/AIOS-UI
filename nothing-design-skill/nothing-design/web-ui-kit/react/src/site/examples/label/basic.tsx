import { Input } from 'nothing-ui/input'
import { Label } from 'nothing-ui/label'

export default function LabelBasic() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="workspace">Workspace</Label>
      <Input id="workspace" placeholder="nothing-ui" />
    </div>
  )
}
