import { NavigationMenu } from 'aios-ui-kit/navigation-menu'

// 上排每一项都有 href，键盘可达；下排只给了 onClick，渲染出的 <a> 没有 href，
// 因此不在 tab 序列里 —— 用键盘完全够不着。
const REACHABLE = [
  { label: 'Reachable', href: '#a', active: true },
  { label: 'By keyboard', href: '#b' },
]

const UNREACHABLE = [
  { label: 'Not reachable', onClick: () => {} },
  { label: 'By keyboard', onClick: () => {} },
]

export default function NavigationMenuFocusableItems() {
  return (
    <div className="flex flex-col items-center gap-4">
      <NavigationMenu items={REACHABLE} />
      <NavigationMenu items={UNREACHABLE} />
      <p className="max-w-xs text-center font-mono text-label uppercase tracking-wider text-foreground-muted">
        Tab through both rows to feel the difference
      </p>
    </div>
  )
}
