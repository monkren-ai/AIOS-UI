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

export const Date = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card__icon widget-card-wrapper ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Date"
        aria-label={ariaLabel || 'Date'}
      >
        <svg
          className="nothing-widget-icon-svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 152 152"
        >
          <g id="Date">
            <rect fill="currentColor" fillOpacity="1" height="152" id="BG" rx="20" width="152" />
            <g id="29">
              <path d={svgPaths.p20cd9480} fill="currentColor" fillOpacity="1" />
              <path d={svgPaths.p2af22e80} fill="currentColor" fillOpacity="1" />
            </g>
          </g>
        </svg>
      </div>
    )
  },
)
Date.displayName = 'Date'

export const Date1 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card widget-card--152 widget-card--rounded widget-card--light ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Date"
        aria-label={ariaLabel || 'Date'}
      >
        <div className="flex flex-col justify-center size-full">
          <div className=" content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full widget-text widget-text--ndot widget-text--nowrap widget-leading-27">
            <p className="widget-relative widget-shrink-0 widget-text widget-text--16 widget-text--grey2">
              TUESDAY
            </p>
            <p className="widget-relative widget-shrink-0 widget-text widget-text--32 widget-text--dark">
              GMT+1
            </p>
          </div>
        </div>
      </div>
    )
  },
)
Date1.displayName = 'Date1'
