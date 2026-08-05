import { SunDial } from 'nothing-ui/sun-dial'

export default function SunDialDefault() {
  return (
    <div className="w-full max-w-sm">
      <SunDial latitude={35.6762} longitude={139.6503} />
    </div>
  )
}
