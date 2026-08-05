import { NextEvent } from 'nothing-ui/next-event'

export default function NextEventUrgent() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <NextEvent event={{ title: 'Stand-up', date: Date.now() + 20 * 60 * 1000 }} theme="dark" />
      <NextEvent event={{ title: 'Stand-up', date: Date.now() + 20 * 60 * 1000 }} theme="light" />
    </div>
  )
}
