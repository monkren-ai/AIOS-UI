import { InputOTP } from 'nothing-ui/input-otp'

export default function InputOTPSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <InputOTP length={4} size="sm" />
      <InputOTP length={4} size="md" />
      <InputOTP length={4} size="lg" />
    </div>
  )
}
