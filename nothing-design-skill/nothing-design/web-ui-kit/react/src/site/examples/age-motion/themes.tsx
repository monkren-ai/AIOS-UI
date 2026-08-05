import { AgeMotion } from 'nothing-ui/age-motion'

export default function AgeMotionThemes() {
  return (
    <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      <AgeMotion birthDate="1990-06-15" theme="dark" size="sm" yearSegments={12} />
      <AgeMotion birthDate="1990-06-15" theme="light" size="sm" yearSegments={12} />
    </div>
  )
}
