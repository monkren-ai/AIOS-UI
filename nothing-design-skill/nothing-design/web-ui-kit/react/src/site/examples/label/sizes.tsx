import { Label } from 'aios-ui-kit/label'

export default function LabelSizes() {
  return (
    <div className="flex flex-wrap items-baseline justify-center gap-6">
      <Label size="sm">Small</Label>
      <Label size="md">Medium</Label>
      <Label size="lg">Large</Label>
    </div>
  )
}
