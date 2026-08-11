import * as React from 'react'
import DotMatrixIcon from '@/components/DotMatrixIcon'
import { cn } from '@/lib/utils'
import { toCurrentColorSvg } from './aios-icons'
import type { IconEntry } from './types'

/**
 * 点阵网格参数。
 *
 * 沿用 SvgIcon 的 3:1 点/缝比例：`cols = size / 2`、`dotSize = 1.5`、`gap = 0.5`，
 * 于是总宽 = cols * 1.5 + (cols - 1) * 0.5 ≈ size。分辨率随尺寸线性变化，
 * 跟真实点阵屏的行为一致——16px 只有 8×8，32px 能到 16×16。
 */
export function dotGridConfig(size: number) {
  const cols = Math.max(6, Math.round(size / 2))
  return { rows: cols, cols, dotSize: 1.5, gap: 0.5 }
}

/** Tabler 图标只有 React 组件，序列化后的 markup 按 id 缓存，滚动时不必重复算。 */
const tablerMarkupCache = new Map<string, string>()

function serializeTablerSvg(node: SVGSVGElement): string {
  const clone = node.cloneNode(true) as SVGSVGElement
  clone.removeAttribute('class')
  clone.removeAttribute('style')
  // 栅格化只看 alpha，但 currentColor 在 data URI 里没有继承源，显式钉成黑色更稳。
  return clone.outerHTML.replace(/currentColor/g, 'black')
}

/**
 * Tabler 图标的点阵渲染。
 *
 * 包里没有导出 iconNode，也没有 SVG 字符串，所以先把组件正常渲染一次、
 * 从 DOM 里 `outerHTML` 取回 markup，再喂给 DotMatrixIcon。第一次会闪一帧
 * 常规 SVG，之后命中缓存直接出点阵。
 */
function TablerDotIcon({ entry, size }: { entry: IconEntry; size: number }) {
  const [markup, setMarkup] = React.useState<string | null>(
    () => tablerMarkupCache.get(entry.id) ?? null,
  )

  React.useEffect(() => {
    setMarkup(tablerMarkupCache.get(entry.id) ?? null)
  }, [entry.id])

  const capture = React.useCallback(
    (node: SVGSVGElement | null) => {
      if (!node || tablerMarkupCache.has(entry.id)) return
      const html = serializeTablerSvg(node)
      tablerMarkupCache.set(entry.id, html)
      setMarkup(html)
    },
    [entry.id],
  )

  const config = dotGridConfig(size)

  if (markup) {
    return (
      <DotMatrixIcon
        svg={markup}
        rows={config.rows}
        cols={config.cols}
        dotSize={config.dotSize}
        gap={config.gap}
        baseColor="currentColor"
        aria-hidden
      />
    )
  }

  const Component = entry.Component
  if (!Component) return null
  return <Component size={size} aria-hidden className="size-full" ref={capture} />
}

export interface IconVisualProps {
  entry: IconEntry
  /** 渲染尺寸（px）。 */
  size: number
  /** 切到 AIOS 点阵栅格化渲染。 */
  dotMatrix: boolean
  className?: string
}

/** 统一的图标渲染出口：两种来源 × 常规 / 点阵两种模式。 */
export function IconVisual({ entry, size, dotMatrix, className }: IconVisualProps) {
  const inlineSvg = React.useMemo(
    () => (entry.svg ? toCurrentColorSvg(entry.svg) : null),
    [entry.svg],
  )

  const config = dotGridConfig(size)

  let content: React.ReactNode = null

  if (dotMatrix && entry.svg) {
    content = (
      <DotMatrixIcon
        svg={entry.svg}
        rows={config.rows}
        cols={config.cols}
        dotSize={config.dotSize}
        gap={config.gap}
        baseColor="currentColor"
        aria-hidden
      />
    )
  } else if (dotMatrix && entry.Component) {
    content = <TablerDotIcon entry={entry} size={size} />
  } else if (inlineSvg) {
    content = (
      <span
        className="block h-full w-full [&_svg]:h-full [&_svg]:w-full"
        // 注册表里的 SVG 是仓库内的常量字符串，不含外部输入。
        dangerouslySetInnerHTML={{ __html: inlineSvg }}
      />
    )
  } else if (entry.Component) {
    const Component = entry.Component
    // size 属性负责 Tabler 的 width/height；再钉一层 size-full，避免全局 svg
    // 规则把属性尺寸冲掉。AIOS / Tabler 共用这个出口。
    content = <Component size={size} aria-hidden className="size-full" />
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center text-foreground-display [&_svg]:size-full',
        className,
      )}
      style={{ inlineSize: size, blockSize: size }}
    >
      {content}
    </span>
  )
}

export default IconVisual
