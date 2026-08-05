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

export const Dots6 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card__icon h-[97px] widget-relative widget-shrink-0 w-[120px] ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Dots"
        aria-label={ariaLabel || 'Dots'}
      >
        <svg
          className="nothing-widget-icon-svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 120 97"
        >
          <g id="Dots">
            <circle cx="6" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 205" r="6" />
            <circle cx="114" cy="6" fill="currentColor" fillOpacity="1" id="Ellipse 219" r="6" />
            <circle cx="60" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 206" r="5" />
            <circle cx="42" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 207" r="4" />
            <circle cx="78" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 208" r="3" />
            <circle cx="24" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 209" r="1" />
            <circle cx="96" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 210" r="1" />
            <circle cx="114" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 211" r="1" />
            <circle cx="6" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 212" r="1" />
            <circle cx="24" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 213" r="1" />
            <circle cx="42" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 214" r="1" />
            <circle cx="60" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 215" r="1" />
            <circle cx="78" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 216" r="1" />
            <circle cx="96" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 217" r="1" />
            <circle cx="114" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 218" r="1" />
            <circle cx="6" cy="60" fill="currentColor" fillOpacity="1" id="Ellipse 212_2" r="1" />
            <circle cx="24" cy="60" fill="currentColor" fillOpacity="1" id="Ellipse 213_2" r="1" />
            <circle cx="42" cy="60" fill="currentColor" fillOpacity="1" id="Ellipse 214_2" r="1" />
            <circle cx="60" cy="60" fill="currentColor" fillOpacity="1" id="Ellipse 215_2" r="1" />
            <circle cx="78" cy="60" fill="currentColor" fillOpacity="1" id="Ellipse 216_2" r="1" />
            <circle cx="96" cy="60" fill="currentColor" fillOpacity="1" id="Ellipse 217_2" r="1" />
            <circle cx="114" cy="60" fill="currentColor" fillOpacity="1" id="Ellipse 218_2" r="1" />
            <circle cx="6" cy="78" fill="currentColor" fillOpacity="1" id="Ellipse 212_3" r="1" />
            <circle cx="24" cy="78" fill="currentColor" fillOpacity="1" id="Ellipse 213_3" r="1" />
            <circle cx="42" cy="78" fill="currentColor" fillOpacity="1" id="Ellipse 214_3" r="1" />
            <circle cx="60" cy="78" fill="currentColor" fillOpacity="1" id="Ellipse 215_3" r="1" />
            <circle cx="78" cy="78" fill="currentColor" fillOpacity="1" id="Ellipse 216_3" r="1" />
            <circle cx="96" cy="78" fill="currentColor" fillOpacity="1" id="Ellipse 217_3" r="1" />
            <circle cx="114" cy="78" fill="currentColor" fillOpacity="1" id="Ellipse 218_3" r="1" />
            <circle cx="6" cy="96" fill="currentColor" fillOpacity="1" id="Ellipse 212_4" r="1" />
          </g>
        </svg>
      </div>
    )
  },
)
Dots6.displayName = 'Dots6'

export const Counter = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Counter"
        aria-label={ariaLabel || 'Counter'}
      >
        <div className="widget-overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-[16px] widget-relative size-full">
            <p className=" widget-text widget-text--ndot widget-text--20 widget-text--white widget-text--center widget-text--nowrap mb-[-4px]">
              43,465
            </p>
            <Dots6 />
          </div>
        </div>
      </div>
    )
  },
)
Counter.displayName = 'Counter'
