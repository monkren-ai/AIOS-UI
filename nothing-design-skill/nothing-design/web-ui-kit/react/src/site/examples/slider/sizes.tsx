import { Slider } from 'nothing-ui/slider'

export default function SliderSizes() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Slider size="sm" label="Small" showValue defaultValue={25} />
      <Slider size="md" label="Medium" showValue defaultValue={50} />
      <Slider size="lg" label="Large" showValue defaultValue={75} />
    </div>
  )
}
