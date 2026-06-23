import { Textarea } from '../Textarea'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <Textarea label="Message" placeholder="Write a message" />
      <Textarea label="Auto resize" autoResize minRows={2} maxRows={5} placeholder="Type to grow" />
      <Textarea label="Error" error="Message is required" placeholder="Try typing" />
    </div>
  )
}
