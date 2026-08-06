import { CheckboxGroup } from 'aios-ui-kit/checkbox-group'

export default function CheckboxGroupBasic() {
  return (
    <CheckboxGroup
      options={[
        { value: 'wifi', label: 'Wi-Fi' },
        { value: 'bluetooth', label: 'Bluetooth' },
        { value: 'nfc', label: 'NFC' },
        { value: 'location', label: 'Location', disabled: true },
      ]}
      defaultValue={['wifi']}
    />
  )
}
