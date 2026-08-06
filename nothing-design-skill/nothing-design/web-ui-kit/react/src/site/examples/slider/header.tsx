import { Slider } from 'aios-ui-kit/slider'

export default function SliderHeader() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <Slider label="Brightness" showValue defaultValue={72} />
      <Slider label="Glyph intensity" defaultValue={3} min={1} max={5} step={1} showValue />
    </div>
  )
}
