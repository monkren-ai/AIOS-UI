import { Collapsible } from 'aios-ui-kit/collapsible'

const LINES = Array.from({ length: 14 }, (_, i) => `Changelog entry ${i + 1}`)

// 展开态的 max-height 上限是 500px，容器又是 overflow-hidden：
// 内容一旦超过 500px 就会被裁掉。这 14 行刚好在上限之内。
export default function CollapsibleLongContent() {
  return (
    <Collapsible className="w-full max-w-md" trigger="Full changelog">
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {LINES.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </Collapsible>
  )
}
