import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
}

/**
 * 区段内演示标题（小号大写等宽标签）。
 */
export function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="showcase-demo-title">{children}</h2>
}

export default SectionTitle
