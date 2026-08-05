import { InputMessage } from 'nothing-ui/input-message'

export default function InputMessageCharacterLimit() {
  return (
    <div className="w-full max-w-sm">
      <InputMessage
        placeholder="Keep it short"
        maxLength={80}
        countLabel="CHARS"
        maxRows={3}
      />
    </div>
  )
}
