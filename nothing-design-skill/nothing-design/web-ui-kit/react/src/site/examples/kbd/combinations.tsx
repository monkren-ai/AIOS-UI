import { Kbd } from 'nothing-ui/kbd'

export default function KbdCombinations() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Kbd keys={['⌘', 'K']} />
      <Kbd keys={['Ctrl', 'Shift', 'P']} />
      <Kbd keys={['G', 'C']} separator="then" variant="outline" />
    </div>
  )
}
