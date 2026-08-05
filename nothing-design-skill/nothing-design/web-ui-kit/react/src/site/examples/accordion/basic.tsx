import { Accordion } from 'nothing-ui/accordion'

const ITEMS = [
  {
    id: 'shipping',
    title: 'Shipping',
    content: 'Dispatched within two working days, tracked all the way.',
  },
  {
    id: 'returns',
    title: 'Returns',
    content: 'Fourteen days from delivery, provided the seal is intact.',
  },
  {
    id: 'warranty',
    title: 'Warranty',
    content: 'Two years on the device, one year on the accessories.',
  },
]

export default function AccordionBasic() {
  return <Accordion className="w-full max-w-md" items={ITEMS} defaultValue={['shipping']} />
}
