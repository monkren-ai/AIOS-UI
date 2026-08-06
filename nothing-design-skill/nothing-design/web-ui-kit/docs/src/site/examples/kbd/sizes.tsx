import { Kbd } from 'aios-ui-kit/kbd'

export default function KbdSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Kbd size="sm">K</Kbd>
      <Kbd size="md">K</Kbd>
      <Kbd size="lg">K</Kbd>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Esc</Kbd>
      <Kbd size="lg">Esc</Kbd>
    </div>
  )
}
