import { Accordion } from '../Accordion'

export default function Demo() {
  return (
    <Accordion
      type="single"
      items={[
        { id: '1', title: 'Section One', content: 'Content for section one.' },
        { id: '2', title: 'Section Two', content: 'Content for section two.' },
        { id: '3', title: 'Section Three', content: 'Content for section three.', disabled: true },
      ]}
    />
  )
}
