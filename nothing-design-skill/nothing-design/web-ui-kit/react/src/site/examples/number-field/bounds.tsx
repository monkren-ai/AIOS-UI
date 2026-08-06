import { NumberField } from 'aios-ui-kit/number-field'

export default function NumberFieldBounds() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <NumberField
        label="Brightness"
        defaultValue={50}
        min={0}
        max={100}
        step={5}
        placeholder="0–100"
      />
    </div>
  )
}
