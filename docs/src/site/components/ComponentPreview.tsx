import * as React from 'react'
import { cn } from '@/lib/utils'
import { CodeBlock } from './CodeBlock'
import { useT } from '../i18n'

type Tab = 'preview' | 'code'

export interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  /** 让预览区在 RTL 下渲染，用于 RTL 段落。 */
  dir?: 'ltr' | 'rtl'
  /** 预览区最小高度，避免小组件的画布塌成一条。 */
  minHeight?: number
  className?: string
}

/**
 * 组件示例的外壳：Preview / Code 两个页签。
 *
 * 代码来自示例文件本身（`?raw`），所以左边渲染的和右边贴的永远是同一份东西。
 */
export function ComponentPreview({
  children,
  code,
  dir,
  minHeight = 160,
  className,
}: ComponentPreviewProps) {
  const { t } = useT()
  const [tab, setTab] = React.useState<Tab>('preview')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'preview', label: t('预览', 'Preview') },
    { id: 'code', label: t('代码', 'Code') },
  ]

  return (
    <div data-slot="component-preview" className={cn('flex flex-col gap-3', className)}>
      <div role="tablist" className="flex items-center gap-1 border-b border-border">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            data-active={tab === id ? '' : undefined}
            onClick={() => setTab(id)}
            className={cn(
              'relative -mb-px cursor-pointer border-b-2 border-transparent bg-transparent px-3 py-2',
              'font-mono text-label uppercase tracking-widest',
              'text-foreground-subtle transition-colors duration-200 ease-aios motion-reduce:transition-none',
              'hover:text-foreground',
              'data-active:border-accent data-active:text-foreground-display',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'preview' ? (
        <div
          dir={dir}
          style={{ minHeight }}
          className="dot-grid-subtle flex items-center justify-center rounded-card-compact border border-border bg-surface p-8"
        >
          {children}
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  )
}

export default ComponentPreview
