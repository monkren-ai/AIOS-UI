import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import svgPaths from '../widget-svg-paths'
import imgRectangle13 from '@/assets/images/fb6b3399e50e8d3dd4c4dc30de4861f4891a87e9.png'

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

export const DoubleDown = React.forwardRef<HTMLDivElement, WidgetSubProps>(
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
        data-name="Double Down"
        aria-label={ariaLabel || 'Double Down'}
      >
        <div className="absolute inset-0 widget-card--rounded size-[152px]">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none widget-card--rounded size-full"
            src={imgRectangle13}
          />
        </div>
        <div
          className="absolute left-[8px] top-[8px] widget-card__svg--24 widget-card__icon"
          data-name="Spotify - Negative"
        >
          <svg
            className="nothing-widget-icon-svg"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path d={svgPaths.p10461b00} id="Vector" fill="currentColor" fillOpacity="1" />
          </svg>
        </div>
      </div>
    )
  },
)
DoubleDown.displayName = 'DoubleDown'
