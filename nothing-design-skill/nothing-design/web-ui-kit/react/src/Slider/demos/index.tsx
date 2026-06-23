import { Slider } from '../Slider'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 320 }}>
      <Slider label="Volume" showValue defaultValue={40} />
      <Slider label="Brightness" min={0} max={10} step={1} defaultValue={7} showValue />
      <Slider label="Disabled" disabled showValue value={20} />
    </div>
  )
}
