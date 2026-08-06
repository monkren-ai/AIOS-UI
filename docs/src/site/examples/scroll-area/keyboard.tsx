import { ScrollArea } from 'aios-ui-kit/scroll-area'

const SHORTCUTS = [
  ['Glyph torch', 'Hold volume up'],
  ['Screenshot', 'Power + volume down'],
  ['Split screen', 'Swipe up, hold'],
  ['Quick settings', 'Two-finger swipe down'],
  ['Voice assistant', 'Hold power'],
  ['Emergency', 'Power five times'],
  ['Do not disturb', 'Long-press the bell'],
  ['Camera', 'Double-press power'],
]

// 视口自带 tabIndex，键盘可以直接滚；这里内部本来就都是按钮，Tab 一路走下去
// 也会把内容带进视野。给了名字才会成为 region，所以顺手加上。
export default function ScrollAreaKeyboard() {
  return (
    <ScrollArea
      className="h-40 w-full max-w-sm border border-border-visible"
      viewportProps={{ 'aria-label': 'Keyboard shortcuts' }}
    >
      <ul className="m-0 flex list-none flex-col p-0">
        {SHORTCUTS.map(([action, gesture]) => (
          <li key={action}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between gap-4 border-b border-border bg-transparent px-4 py-3 text-start font-mono text-sm text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2"
            >
              <span>{action}</span>
              <span className="text-foreground-muted">{gesture}</span>
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
