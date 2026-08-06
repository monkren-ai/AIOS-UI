import { ColorPicker } from 'aios-ui-kit/color-picker'

export default function ColorPickerCustomPresets() {
  return (
    <ColorPicker
      title="STATUS"
      presets={['#4A9E5C', '#D4A843', '#D71921', '#5B9BF6']}
      defaultValue="#4A9E5C"
      showInput={false}
      size="sm"
    />
  )
}
