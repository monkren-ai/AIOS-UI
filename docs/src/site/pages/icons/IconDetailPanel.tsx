import * as React from 'react'
import { Button } from 'aios-ui-kit/button'
import { CodeBlock } from '../../components/CodeBlock'
import { useT } from '../../i18n'
import { IconVisual } from './IconVisual'
import { aiosImportStatement, aiosJsxSnippet } from './aios-icons'
import { tablerImportStatement, tablerJsxSnippet } from './tabler-icons'
import type { IconEntry } from './types'

/** 复制按钮：点一下换文案，1.6s 后复位，与 CodeBlock 的反馈节奏一致。 */
function CopyButton({
  value,
  label,
  disabled,
}: {
  value: string | null
  label: string
  disabled?: boolean
}) {
  const { t } = useT()
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }, [value])

  return (
    <Button
      variant="secondary"
      size="sm"
      fullWidth
      disabled={disabled || !value}
      onClick={copy}
      className="justify-start rounded-card-technical"
    >
      {copied ? t('已复制', 'Copied') : label}
    </Button>
  )
}

export interface IconDetailPanelProps {
  entry: IconEntry | null
  size: number
  dotMatrix: boolean
  onClose: () => void
}

export function IconDetailPanel({ entry, size, dotMatrix, onClose }: IconDetailPanelProps) {
  const { t } = useT()
  const [tablerMarkup, setTablerMarkup] = React.useState<string | null>(null)

  React.useEffect(() => {
    setTablerMarkup(null)
  }, [entry?.id])

  // Tabler 包里没有 SVG 字符串，只能把组件渲染一次再从 DOM 序列化回来。
  const captureTablerSvg = React.useCallback((node: SVGSVGElement | null) => {
    if (!node) return
    const clone = node.cloneNode(true) as SVGSVGElement
    clone.removeAttribute('class')
    setTablerMarkup(clone.outerHTML)
  }, [])

  if (!entry) {
    return (
      <aside
        data-slot="icon-detail-empty"
        className="flex flex-col gap-3 rounded-card-compact border border-border border-dashed bg-surface p-6"
      >
        <p className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
          {t('详情', 'Details')}
        </p>
        <p className="text-sm text-foreground-muted">
          {t('选一个图标，这里会给出复制代码。', 'Pick an icon to get copy-ready code here.')}
        </p>
      </aside>
    )
  }

  const isAIOS = entry.source === 'aios'
  const jsx = isAIOS ? aiosJsxSnippet(entry, dotMatrix) : tablerJsxSnippet(entry, size)
  const importStatement = isAIOS ? aiosImportStatement(entry) : tablerImportStatement(entry)
  const rawSvg = entry.svg ?? tablerMarkup

  const TablerComponent = entry.Component

  return (
    <aside
      data-slot="icon-detail"
      className="flex flex-col gap-5 rounded-card-compact border border-border bg-surface p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
            {isAIOS ? t('AIOS 图标', 'AIOS icon') : 'Tabler'}
          </span>
          <span className="truncate text-subheading text-foreground-display">{entry.name}</span>
          {entry.componentName && (
            <span className="truncate font-mono text-micro text-foreground-subtle">
              {entry.componentName}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          aria-label={t('关闭详情', 'Close details')}
          className="rounded-card-technical"
        >
          ✕
        </Button>
      </div>

      <div className="flex items-center justify-center rounded-card-technical border border-border bg-background py-8">
        <IconVisual entry={entry} size={48} dotMatrix={dotMatrix} />
      </div>

      <div className="flex flex-col gap-2">
        <CopyButton value={jsx} label={t('复制 JSX', 'Copy JSX')} />
        <CopyButton value={importStatement} label={t('复制 import', 'Copy import')} />
        <CopyButton
          value={rawSvg}
          label={rawSvg ? t('复制 SVG', 'Copy SVG') : t('SVG 不可用', 'SVG unavailable')}
        />
      </div>

      <CodeBlock code={`${importStatement}\n\n${jsx}`} collapseAfter={40} />

      {/* Tabler 的 SVG 源要靠这次隐藏渲染取回，视觉上不占位。 */}
      {!isAIOS && TablerComponent && !tablerMarkup && (
        <span className="sr-only" aria-hidden>
          <TablerComponent size={24} ref={captureTablerSvg} />
        </span>
      )}
    </aside>
  )
}

export default IconDetailPanel
