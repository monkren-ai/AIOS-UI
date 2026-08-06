import { ScrollArea } from 'aios-ui-kit/scroll-area'

const DEVICES = [
  'Phone (1)',
  'Phone (2)',
  'Phone (2a)',
  'Phone (3a)',
  'Ear (1)',
  'Ear (2)',
  'Ear (a)',
  'Ear (open)',
  'Ear (stick)',
  'CMF Phone 1',
  'CMF Watch Pro',
  'CMF Buds Pro',
]

// height 是内联样式，className 上的 h-* 会被它盖掉；
// 想用 Tailwind 控制高度就别传 height。
export default function ScrollAreaList() {
  return (
    <ScrollArea className="h-45 w-full max-w-xs border border-border-visible">
      <ul className="m-0 flex list-none flex-col p-0">
        {DEVICES.map((device) => (
          <li
            key={device}
            className="border-b border-border px-4 py-2 font-mono text-sm text-foreground last:border-b-0"
          >
            {device}
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
