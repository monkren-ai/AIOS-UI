import { Toggle, ToggleGroup } from 'aios-ui-kit/toggle'
import { BoldIcon, ItalicIcon, UnderlineIcon } from '../icons'

export default function ToggleGroupExample() {
  return (
    <ToggleGroup
      variant="outline"
      defaultValue={['bold']}
      aria-label="Text formatting"
      className="justify-center"
    >
      <Toggle value="bold" aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle value="italic" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle value="underline" aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </ToggleGroup>
  )
}
