import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import imgRectangle14 from '@/assets/images/a0a6cb8be18624a2222418a1e4e27381fc343af8.png'

function Frame24() {
  return (
    <div
      className="widget-card__icon h-[48px] widget-relative widget-shrink-0 w-[6px]"
      aria-hidden="true"
    >
      <svg
        className="aios-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 6 48"
      >
        <g id="Frame 40">
          <circle cx="3" cy="3" fill="currentColor" fillOpacity="1" id="Ellipse 133" r="3" />
          <circle cx="3" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 187" r="3" />
          <circle cx="3" cy="17" fill="currentColor" fillOpacity="1" id="Ellipse 188" r="3" />
          <circle cx="3" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 189" r="3" />
          <circle cx="3" cy="31" fill="currentColor" fillOpacity="1" id="Ellipse 190" r="3" />
          <circle cx="3" cy="38" fill="currentColor" fillOpacity="1" id="Ellipse 191" r="3" />
          <circle cx="3" cy="45" fill="currentColor" fillOpacity="1" id="Ellipse 192" r="3" />
        </g>
      </svg>
    </div>
  )
}

function Frame25() {
  return (
    <div
      className="widget-card__icon h-[34px] widget-relative widget-shrink-0 w-[6px]"
      aria-hidden="true"
    >
      <svg
        className="aios-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 6 34"
      >
        <g id="Frame 41">
          <circle cx="3" cy="3" fill="currentColor" fillOpacity="1" id="Ellipse 133" r="3" />
          <circle cx="3" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 187" r="3" />
          <circle cx="3" cy="17" fill="currentColor" fillOpacity="1" id="Ellipse 188" r="3" />
          <circle cx="3" cy="24" fill="currentColor" fillOpacity="1" id="Ellipse 189" r="3" />
          <circle cx="3" cy="31" fill="currentColor" fillOpacity="1" id="Ellipse 190" r="3" />
        </g>
      </svg>
    </div>
  )
}

function Frame26() {
  return (
    <div
      className="widget-card__icon h-[20px] widget-relative widget-shrink-0 w-[6px]"
      aria-hidden="true"
    >
      <svg
        className="aios-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 6 20"
      >
        <g id="Frame 42">
          <circle cx="3" cy="3" fill="currentColor" fillOpacity="1" id="Ellipse 188" r="3" />
          <circle cx="3" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 189" r="3" />
          <circle cx="3" cy="17" fill="currentColor" fillOpacity="1" id="Ellipse 190" r="3" />
        </g>
      </svg>
    </div>
  )
}

function Frame27() {
  return (
    <div className="widget-relative widget-shrink-0 size-[6px]" aria-hidden="true">
      <svg
        className="aios-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 6 6"
      >
        <g id="Frame 43">
          <circle
            cx="3"
            cy="3"
            fill="var(--fill-0, var(--widget-white))"
            id="Ellipse 190"
            r="3"
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

export const Dots5 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `absolute bottom-[8px] left-1/2 -translate-x-1/2 content-stretch flex gap-px items-center w-[27px] ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Dots"
        aria-label={ariaLabel || 'Dots'}
      >
        <Frame24 />
        <Frame25 />
        <Frame26 />
        <Frame27 />
      </div>
    )
  },
)
Dots5.displayName = 'Dots5'

export const Play = React.forwardRef<HTMLDivElement, WidgetSubProps>(
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
        data-name="Play"
        aria-label={ariaLabel || 'Play'}
      >
        <div className="absolute inset-0 widget-card--rounded widget-size-152">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none widget-card--rounded size-full"
            src={imgRectangle14}
          />
        </div>
        <Dots5 />
      </div>
    )
  },
)
Play.displayName = 'Play'
