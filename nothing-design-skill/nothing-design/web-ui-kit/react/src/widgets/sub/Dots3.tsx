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

export const Dots4 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card__icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 widget-card__svg--64 ${className || ''}`.trim(),
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
          viewBox="0 0 64 64"
        >
          <g id="Dots">
            <circle
              cx="17.5484"
              cy="25.8064"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 188"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="17.5484"
              cy="32"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 189"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="17.5484"
              cy="38.1936"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 190"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="24.7742"
              cy="19.6129"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 133"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="24.7742"
              cy="25.8064"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 187"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="24.7742"
              cy="32"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 188_2"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="24.7742"
              cy="38.1936"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 189_2"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="24.7742"
              cy="44.3871"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 190_2"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="32"
              cy="19.6129"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 133_2"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="32"
              cy="25.8064"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 187_2"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="32"
              cy="32"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 188_3"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="32"
              cy="38.1936"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 189_3"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="32"
              cy="44.3871"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 190_3"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="39.2258"
              cy="19.6129"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 133_3"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="39.2258"
              cy="25.8064"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 187_3"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="39.2258"
              cy="32"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 188_4"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="39.2258"
              cy="38.1936"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 189_4"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="39.2258"
              cy="44.3871"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 190_4"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="46.4516"
              cy="25.8064"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 188_5"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="46.4516"
              cy="32"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 189_5"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="46.4516"
              cy="38.1936"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 190_5"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="32"
              cy="3.09677"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 133_4"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="32"
              cy="60.9032"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 187_4"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            />
            <circle
              cx="11.5623"
              cy="11.5623"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 133_5"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
              transform="rotate(-45 11.5623 11.5623)"
            />
            <circle
              cx="52.4377"
              cy="52.4377"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 187_5"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
              transform="rotate(-45 52.4377 52.4377)"
            />
            <circle
              cx="60.9032"
              cy="32"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 133_6"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
              transform="rotate(90 60.9032 32)"
            />
            <circle
              cx="3.09677"
              cy="32"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 187_6"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
              transform="rotate(90 3.09677 32)"
            />
            <circle
              cx="52.4377"
              cy="11.5623"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 133_7"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
              transform="rotate(45 52.4377 11.5623)"
            />
            <circle
              cx="11.5624"
              cy="52.4377"
              fill="var(--fill-0, var(--widget-white))"
              id="Ellipse 187_7"
              r="3.09677"
              style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
              transform="rotate(45 11.5624 52.4377)"
            />
          </g>
        </svg>
      </div>
    )
  },
)
Dots4.displayName = 'Dots4'

export const Dots3 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card-wrapper ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Dots"
        aria-label={ariaLabel || 'Dots'}
      >
        <div
          className="widget-bg-dark absolute inset-0 widget-card--rounded widget-size-152"
          data-name="BG"
        />
        <Dots4 />
      </div>
    )
  },
)
Dots3.displayName = 'Dots3'
