import { Form } from '../Form'
import { Input } from '../../Input'
import { Button } from '../../Button'

export default function Demo() {
  return (
    <Form onSubmit={() => {}} style={{ maxWidth: 320 }}>
      <Input variant="underline" label="Username" placeholder="Enter username" />
      <Input variant="bordered" label="Email" placeholder="Enter email" />
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}
