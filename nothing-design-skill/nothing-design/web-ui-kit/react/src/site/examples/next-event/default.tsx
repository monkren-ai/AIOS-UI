import { NextEvent, type EventData } from 'aios-ui-kit/next-event'

const events: EventData[] = [
  { title: 'Sprint planning', date: Date.now() + 3 * 24 * 60 * 60 * 1000 },
  { title: 'Design review', date: Date.now() + 6 * 60 * 60 * 1000 },
  { title: 'Product launch', date: Date.now() + 7 * 24 * 60 * 60 * 1000 },
]

export default function NextEventDefault() {
  return <NextEvent events={events} />
}
