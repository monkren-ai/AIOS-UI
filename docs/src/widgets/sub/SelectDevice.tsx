import * as React from 'react'

import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
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

export const Device1 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `h-[25.456px] widget-relative widget-shrink-0 w-[25.841px] ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Device"
        aria-label={ariaLabel || 'Device'}
      >
        <svg
          className="nothing-widget-icon-svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 25.8406 25.4559"
        >
          <g id="Device">
            <rect
              fill="var(--fill-0, var(--widget-dark-5, #939196))"
              height="26"
              id="Rectangle 10"
              rx="5"
              style={{ fill: 'color(display-p3 0.5765 0.5686 0.5882)', fillOpacity: '1' }}
              transform="rotate(45 18.3848 0)"
              width="10"
              x="18.3848"
              y="0"
            />
            <rect
              fill="var(--fill-0, var(--widget-dark-5, #939196))"
              height="26"
              id="Rectangle 11"
              rx="5"
              style={{ fill: 'color(display-p3 0.5765 0.5686 0.5882)', fillOpacity: '1' }}
              transform="rotate(-45 0.384776 7.07107)"
              width="10"
              x="0.384776"
              y="7.07107"
            />
            <circle
              cx="18.6895"
              cy="18.344"
              fill="var(--fill-0, var(--widget-dark-bg))"
              id="Ellipse 227"
              r="4"
              style={{ fill: 'color(display-p3 0.102 0.114 0.110)', fillOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    )
  },
)
Device1.displayName = 'Device1'

export const SelectDevice = React.forwardRef<HTMLDivElement, WidgetSubProps>(
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
        data-name="Select Device"
        aria-label={ariaLabel || 'Select Device'}
      >
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[16px] widget-relative size-full">
            <Device1 />
            <div className=" widget-text widget-text--ndot widget-text--16 widget-text--grey2 widget-text--center widget-text--nowrap">
              <p className="widget-leading-20 mb-0 whitespace-pre">{`SELECT THE `}</p>
              <p className="widget-leading-20 whitespace-pre">DEVICE</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
SelectDevice.displayName = 'SelectDevice'
