import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import svgPaths from '../widget-svg-paths'

const widgetSubVariants = cva('', {
  variants: {
    theme: { light: 'widget-theme--light', dark: 'widget-theme--dark' },
    size: {
      small: 'widget-size--small',
      medium: 'widget-size--medium',
      large: 'widget-size--large',
    },
  },
  defaultVariants: { theme: 'dark', size: 'medium' },
})

export interface WidgetSubProps {
  theme?: 'light' | 'dark'
  size?: 'small' | 'medium' | 'large'
  className?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

/**
 * Glyphs 组件 (合并自原 Glyphs1 + Glyphs2)
 *
 * - variant: 'pattern-a' (默认, 原 Glyphs1, 白字 + "Glyphs")
 *           'pattern-b' (原 Glyphs2, 浅字 + "Screen recorder")
 */
export type GlyphsVariant = 'pattern-a' | 'pattern-b'

export interface GlyphsProps extends WidgetSubProps {
  variant?: GlyphsVariant
}

function PatternAIcon() {
  return (
    <div className="widget-grid-auto" aria-hidden="true">
      <div className="widget-col-1 ml-0 mt-0 widget-relative widget-row-1 widget-card__svg--24" />
      <div
        className="widget-col-1 h-[21px] ml-[4px] mt-[2px] widget-relative widget-row-1 w-[15px] widget-card__icon"
        aria-hidden="true"
      >
        <svg
          className="nothing-widget-icon-svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 15 21"
        >
          <g id="Group 24">
            <path d={svgPaths.p29036d00} id="C" fill="currentColor" fillOpacity="1" />
            <g id="Frame 75">
              <circle
                cx="1.5"
                cy="1.5"
                id="Ellipse 248"
                r="1.5"
                fill="currentColor"
                fillOpacity="1"
              />
              <circle
                cx="13.5"
                cy="1.5"
                id="Ellipse 247"
                r="1.5"
                fill="currentColor"
                fillOpacity="1"
              />
            </g>
            <circle
              cx="7.5"
              cy="19.5"
              id="Ellipse 249"
              r="1.5"
              fill="currentColor"
              fillOpacity="1"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function PatternBIcon() {
  return (
    <div
      className="widget-relative widget-shrink-0 widget-card__svg--24 widget-card__icon"
      data-name="Icon"
      aria-hidden="true"
    >
      <svg
        className="nothing-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path d={svgPaths.pf1830f2} id="Vector" fill="currentColor" fillOpacity="1" />
        </g>
      </svg>
    </div>
  )
}

export const Glyphs = React.forwardRef<HTMLDivElement, GlyphsProps>(
  (
    { theme, size, className, 'aria-label': ariaLabel, style, variant = 'pattern-a', ...props },
    ref,
  ) => {
    if (variant === 'pattern-b') {
      return (
        <div
          ref={ref}
          style={style}
          className={cn(
            widgetSubVariants({ theme, size }),
            `widget-card widget-card--152 widget-card--pill widget-card--dark content-stretch flex flex-col gap-[12px] items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim(),
          )}
          data-theme={dataAttr(theme)}
          data-size={dataAttr(size)}
          data-variant={dataAttr(variant)}
          {...props}
          data-name="Glyphs"
          aria-label={ariaLabel || 'Glyphs'}
        >
          <PatternBIcon />
          <div
            className=" widget-text widget-text--12 widget-text--grey widget-text--center widget-text--nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="widget-leading-normal mb-0">Screen</p>
            <p className="widget-leading-normal">recorder</p>
          </div>
        </div>
      )
    }
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card widget-card--152 widget-card--pill widget-card--dark content-stretch flex flex-col gap-[12px] items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        data-variant={dataAttr(variant)}
        {...props}
        data-name="Glyphs"
        aria-label={ariaLabel || 'Glyphs'}
      >
        <PatternAIcon />
        <p
          className=" widget-relative widget-shrink-0 widget-text widget-text--12 widget-text--grey widget-text--center widget-text--nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Glyphs
        </p>
      </div>
    )
  },
)
Glyphs.displayName = 'Glyphs'
