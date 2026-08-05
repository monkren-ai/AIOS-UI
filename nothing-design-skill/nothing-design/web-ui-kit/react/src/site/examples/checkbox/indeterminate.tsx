import { useState } from 'react'
import { Checkbox } from 'nothing-ui/checkbox'

const RADIOS = ['Wi-Fi', 'Bluetooth', 'NFC']

export default function CheckboxIndeterminate() {
  const [enabled, setEnabled] = useState<string[]>(['Wi-Fi'])

  const allOn = enabled.length === RADIOS.length
  const parentChecked = allOn ? true : enabled.length > 0 ? 'indeterminate' : false

  return (
    <div className="flex flex-col items-start gap-1">
      <Checkbox
        label="All radios"
        checked={parentChecked}
        onCheckedChange={() => setEnabled(allOn ? [] : RADIOS)}
      />
      <div className="ms-6 flex flex-col items-start gap-1">
        {RADIOS.map((radio) => (
          <Checkbox
            key={radio}
            label={radio}
            size="sm"
            checked={enabled.includes(radio)}
            onCheckedChange={(checked) =>
              setEnabled((current) =>
                checked ? [...current, radio] : current.filter((item) => item !== radio),
              )
            }
          />
        ))}
      </div>
    </div>
  )
}
