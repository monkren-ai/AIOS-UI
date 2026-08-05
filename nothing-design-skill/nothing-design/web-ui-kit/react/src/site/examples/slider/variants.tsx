import { Slider } from 'nothing-ui/slider'

export default function SliderVariants() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <Slider variant="primary" label="Primary" showValue defaultValue={60} />
      <Slider variant="soft" label="Soft" showValue defaultValue={60} />
      <Slider label="Disabled" showValue defaultValue={60} disabled />
    </div>
  )
}
