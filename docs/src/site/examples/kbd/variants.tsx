import { Kbd } from 'aios-ui-kit/kbd'

export default function KbdVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Kbd variant="soft">soft</Kbd>
      <Kbd variant="outline">outline</Kbd>
      <Kbd variant="ghost">ghost</Kbd>
    </div>
  )
}
