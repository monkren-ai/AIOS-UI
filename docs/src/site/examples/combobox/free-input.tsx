import { Combobox } from 'aios-ui-kit/combobox'

const ITEMS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'phone-2', label: 'Phone (2)' },
  { value: 'ear', label: 'Ear' },
  { value: 'ear-open', label: 'Ear (open)' },
]

export default function ComboboxFreeInput() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Combobox
        items={ITEMS}
        label="Device"
        placeholder="Type or pick"
        freeInput
        clearable
      />
    </div>
  )
}
