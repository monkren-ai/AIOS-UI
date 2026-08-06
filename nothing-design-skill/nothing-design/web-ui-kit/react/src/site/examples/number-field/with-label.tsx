import { NumberField } from 'aios-ui-kit/number-field'

export default function NumberFieldWithLabel() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
      <NumberField label="Quantity" defaultValue={1} placeholder="0" />
      <NumberField label="Volume" defaultValue={50} size="lg" />
      <NumberField label="Offset" defaultValue={-1} size="sm" error="Cannot be negative" />
    </div>
  )
}
