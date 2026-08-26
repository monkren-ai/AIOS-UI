import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { iconVariants, type IconSize } from './icon-variants'

export type IconGlyph = React.ComponentType<React.SVGProps<SVGSVGElement>>

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  /** 任意遵循 SVG props 的图标组件，例如 @tabler/icons-react。 */
  glyph: IconGlyph
  size?: IconSize
  /** 有语义的图标提供 label；省略时图标对辅助技术隐藏。 */
  label?: string
}

export function Icon({ glyph: Glyph, size = 'md', label, className, ...props }: IconProps) {
  return (
    <Glyph
      className={cn(iconVariants({ size }), className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
      data-slot="icon"
      data-size={dataAttr(size)}
      {...props}
    />
  )
}

Icon.displayName = 'Icon'
