import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import svgPaths from '@/widgets/widget-svg-paths'

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
 * Active 组件 (合并自原 Active / Active1)
 *
 * - variant: 'active' (默认) | 'aeroplane' (原 Active1)
 * - label: 自定义标签文本
 */
export type ActiveVariant = 'active' | 'aeroplane'

export interface ActiveProps extends WidgetSubProps {
  variant?: ActiveVariant
  label?: string
}

const ICON_PATHS: Record<ActiveVariant, string> = {
  active: svgPaths.p28fe7100,
  aeroplane: svgPaths.p10439b00,
}

const DEFAULT_LABELS: Record<ActiveVariant, string> = {
  active: 'Active',
  aeroplane: 'Aeroplane mode',
}

function ActiveIcon({ pathData }: { pathData: string }) {
  return (
    <div
      className="widget-card__icon widget-relative widget-shrink-0 widget-card__svg--24"
      data-name="Icon"
      aria-hidden="true"
    >
      <svg
        className="aios-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path d={pathData} fill="currentColor" id="Vector" fillOpacity="1" />
        </g>
      </svg>
    </div>
  )
}

export const Active = React.forwardRef<HTMLDivElement, ActiveProps>(
  (
    { theme, size, className, 'aria-label': ariaLabel, style, variant = 'active', label, ...props },
    ref,
  ) => {
    const displayLabel = label ?? DEFAULT_LABELS[variant]
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card widget-card--152 widget-card--pill widget-card--light content-stretch flex flex-col gap-[12px] items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        data-variant={dataAttr(variant)}
        {...props}
        data-name="Active"
        aria-label={ariaLabel || 'Active'}
      >
        <ActiveIcon pathData={ICON_PATHS[variant]} />
        {variant === 'aeroplane' ? (
          <div
            className="widget-text widget-text--12 widget-text--grey2 widget-text--center widget-text--nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="widget-leading-normal mb-0">Aeroplane</p>
            <p className="widget-leading-normal">mode</p>
          </div>
        ) : (
          <p
            className="widget-relative widget-shrink-0 widget-text widget-text--12 widget-text--grey2 widget-text--center widget-text--nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {displayLabel}
          </p>
        )}
      </div>
    )
  },
)
Active.displayName = 'Active'
