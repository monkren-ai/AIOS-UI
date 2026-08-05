import { Collapsible } from 'nothing-ui/collapsible'

export default function CollapsibleBasic() {
  return (
    <Collapsible className="w-full max-w-md" trigger="Technical details" defaultOpen>
      Nothing OS 3.0, 12GB RAM, 256GB storage. Ships unlocked.
    </Collapsible>
  )
}
