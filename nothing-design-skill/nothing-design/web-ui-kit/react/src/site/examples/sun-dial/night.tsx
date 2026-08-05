import { SunDial } from 'nothing-ui/sun-dial'

export default function SunDialNight() {
  return (
    <div className="w-full max-w-sm">
      <SunDial latitude={51.5074} longitude={-0.1278} time="night" theme="dark" />
    </div>
  )
}
