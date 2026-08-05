import type { ReactNode } from 'react'
import { Prose } from '../../components/Prose'

/**
 * /docs 页面共用的排版件。
 *
 * 11 个文档页的结构是一样的：h2 段落 + 说明段 + 代码块 + 偶尔一张表。
 * 这些壳放在这里，页面文件里就只剩内容本身。
 */

export function DocSection({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="flex flex-col gap-4">
      <h2 className="text-heading text-foreground-display">{title}</h2>
      {children}
    </section>
  )
}

export function DocSubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-subheading text-foreground-display">{title}</h3>
      {children}
    </section>
  )
}

/** 无序列表。每项走 `Prose`，所以可以写 `code`、**bold** 和链接。 */
export function DocList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 ps-5 text-foreground-muted">
      {items.map((item, index) => (
        <li key={index}>
          <Prose inline>{item}</Prose>
        </li>
      ))}
    </ul>
  )
}

/** 有序列表，用于「照着做」的步骤。 */
export function DocSteps({ items }: { items: string[] }) {
  return (
    <ol className="flex list-decimal flex-col gap-2 ps-5 text-foreground-muted">
      {items.map((item, index) => (
        <li key={index}>
          <Prose inline>{item}</Prose>
        </li>
      ))}
    </ol>
  )
}

/**
 * 提示块。层级只靠 background + border 表达 —— 没有阴影，
 * 起始侧一条 2px 的边把它和正文分开。
 */
export function DocNote({ label, children }: { label: string; children: string }) {
  return (
    <aside className="flex flex-col gap-1 rounded-card-compact border border-border border-s-2 border-s-accent bg-surface px-4 py-3">
      <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
        {label}
      </span>
      <Prose className="text-sm leading-relaxed text-foreground-muted">{children}</Prose>
    </aside>
  )
}

/** 技术表格。窄屏换成卡片堆叠，理由同 `PropsTable`。 */
export function DocTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-card-compact border border-border">
      <table className="hidden w-full border-collapse text-start text-sm md:table">
        <thead>
          <tr className="border-b border-border bg-surface">
            {head.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-start font-mono text-label font-medium uppercase tracking-widest text-foreground-subtle"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={
                    cellIndex === 0
                      ? 'px-4 py-3 align-top font-mono text-xs text-foreground-display'
                      : 'px-4 py-3 align-top text-foreground-muted'
                  }
                >
                  <Prose inline>{cell}</Prose>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-y divide-border md:hidden">
        {rows.map((row, rowIndex) => (
          <li key={rowIndex} className="flex flex-col gap-1 p-4">
            {row.map((cell, cellIndex) => (
              <span
                key={cellIndex}
                className={
                  cellIndex === 0
                    ? 'font-mono text-xs text-foreground-display'
                    : 'text-sm text-foreground-muted'
                }
              >
                {cellIndex > 0 && (
                  <span className="me-2 font-mono text-micro uppercase tracking-widest text-foreground-subtle">
                    {head[cellIndex]}
                  </span>
                )}
                <Prose inline>{cell}</Prose>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
