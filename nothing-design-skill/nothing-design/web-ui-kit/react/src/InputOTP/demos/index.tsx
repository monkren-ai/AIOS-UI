import { InputOTP } from '../InputOTP'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <InputOTP length={4} />
      <InputOTP length={6} error />
      <InputOTP length={4} disabled />
    </div>
  )
}
