import { useState } from 'react'
import { BubbleList, Sender } from 'nothing-ui/conversation'

const initial = [
  { key: '1', role: 'ai' as const, content: 'How can I help you today?' },
  { key: '2', role: 'user' as const, content: 'Summarize the refactor plan.' },
]

export default function ConversationChat() {
  const [messages, setMessages] = useState(initial)
  const [value, setValue] = useState('')

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <BubbleList
        items={messages}
        role={{
          ai: { placement: 'start', variant: 'outlined' },
          user: { placement: 'end', variant: 'filled' },
        }}
      />
      <Sender
        value={value}
        onChange={setValue}
        onSubmit={(text) => {
          if (!text.trim()) return
          setMessages((prev) => [
            ...prev,
            { key: String(prev.length + 1), role: 'user' as const, content: text },
          ])
          setValue('')
        }}
        placeholder="Type a message…"
      />
    </div>
  )
}
