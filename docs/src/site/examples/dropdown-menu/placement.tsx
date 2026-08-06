import { DropdownMenu } from 'aios-ui-kit/dropdown-menu'

const ITEMS = [
  { label: 'Preview', onClick: () => console.log('preview') },
  { label: 'Share link', onClick: () => console.log('share') },
]

export default function DropdownMenuPlacement() {
  return (
    <div className="flex w-full items-center justify-between gap-4 py-8">
      <DropdownMenu trigger="align=start" align="start" items={ITEMS} />
      <DropdownMenu trigger="align=end" align="end" items={ITEMS} />
      <DropdownMenu trigger="side=top" side="top" items={ITEMS} />
    </div>
  )
}
