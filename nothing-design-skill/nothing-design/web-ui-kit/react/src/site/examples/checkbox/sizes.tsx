import { Checkbox } from 'nothing-ui/checkbox'

export default function CheckboxSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </div>
  )
}
