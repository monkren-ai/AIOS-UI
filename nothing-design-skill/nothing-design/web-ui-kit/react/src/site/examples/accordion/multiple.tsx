import { Accordion } from 'nothing-ui/accordion'

const ITEMS = [
  { id: 'glyph', title: 'Glyph', content: 'Light patterns for calls, timers, and charging.' },
  { id: 'sound', title: 'Sound', content: 'Adaptive EQ, transparency, and ANC profiles.' },
  { id: 'power', title: 'Power', content: 'Fast charging, reverse charging, battery health.' },
]

export default function AccordionMultiple() {
  return (
    <Accordion
      className="w-full max-w-md"
      items={ITEMS}
      type="multiple"
      defaultValue={['glyph', 'sound']}
    />
  )
}
