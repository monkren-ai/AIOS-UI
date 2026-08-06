import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import svgPaths from '@/widgets/widget-svg-paths'

function Icon26() {
  return (
    <div
      className="widget-relative widget-shrink-0 widget-card__svg--24"
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
          <path
            d={svgPaths.p5abfa80}
            fill="var(--fill-0, var(--widget-white))"
            id="Vector"
            style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
          />
        </g>
      </svg>
    </div>
  )
}

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

export const AutoRotate1 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
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
        {...props}
        data-name="Auto Rotate"
        aria-label={ariaLabel || 'Auto Rotate'}
      >
        <Icon26 />
        <p
          className=" widget-relative widget-shrink-0 widget-text widget-text--12 widget-text--grey widget-text--center widget-text--nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Auto Rotate
        </p>
      </div>
    )
  },
)
AutoRotate1.displayName = 'AutoRotate1'
