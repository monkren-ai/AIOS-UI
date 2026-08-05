import { InputMessage } from 'nothing-ui/input-message'

export default function InputMessageNoSubmitOnEnter() {
  return (
    <div className="w-full max-w-sm">
      <InputMessage
        placeholder="Enter always inserts a new line"
        submitOnEnter={false}
        sendLabel="POST"
        hideCount
      />
    </div>
  )
}
