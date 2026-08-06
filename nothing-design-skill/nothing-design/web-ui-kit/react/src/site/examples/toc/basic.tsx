import * as React from 'react'
import { TOC } from 'aios-ui-kit/toc'

const items = [
  { id: 'overview', label: 'Overview', level: 1 },
  { id: 'install', label: 'Install', level: 2 },
  { id: 'usage', label: 'Usage', level: 2 },
  { id: 'api', label: 'API', level: 2 },
  { id: 'a11y', label: 'Accessibility', level: 2 },
]

export default function TocBasic() {
  // 用回调 ref 把滚动容器在挂载后交给 TOC，IntersectionObserver 才能以它为 root。
  const [scrollEl, setScrollEl] = React.useState<HTMLDivElement | null>(null)
  return (
    <div className="flex gap-6 text-left">
      <TOC
        items={items}
        container={scrollEl}
        className="w-40 shrink-0"
        aria-label="On this page"
      />
      <div
        ref={setScrollEl}
        className="max-h-52 overflow-auto pe-4 text-sm text-foreground-muted"
      >
        {items.map((item) => (
          <section key={item.id} id={item.id} className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-foreground-display">
              {item.label}
            </h3>
            <p className="mt-1">
              Section content for {item.label}. Scroll this pane and the TOC on the
              left tracks the heading currently in view.
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
