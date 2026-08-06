import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import svgPaths from '@/widgets/widget-svg-paths'

function Icon34() {
  return (
    <div
      className="widget-relative widget-shrink-0 widget-card__svg--16"
      data-name="Icon"
      aria-hidden="true"
    >
      <svg
        className="nothing-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <g id="Icon">
          <path
            d={svgPaths.p37c4be00}
            fill="var(--fill-0, var(--widget-dark-4))"
            id="Vector"
            style={{ fill: 'color(display-p3 0.6824 0.6706 0.6941)', fillOpacity: '1' }}
          />
        </g>
      </svg>
    </div>
  )
}

function Frame6() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <Icon34 />
      <p
        className=" widget-relative widget-shrink-0 widget-text widget-text--12 widget-text--grey widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Stansted Airport
      </p>
    </div>
  )
}

function Icon35() {
  return (
    <div
      className="widget-relative widget-shrink-0 widget-card__svg--16"
      data-name="Icon"
      aria-hidden="true"
    >
      <svg
        className="nothing-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <g id="Icon">
          <path
            d={svgPaths.p37c4be00}
            fill="var(--fill-0, var(--widget-dark-4))"
            id="Vector"
            style={{ fill: 'color(display-p3 0.6824 0.6706 0.6941)', fillOpacity: '1' }}
          />
        </g>
      </svg>
    </div>
  )
}

function Frame9() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <Icon35 />
      <p
        className=" widget-relative widget-shrink-0 widget-text widget-text--12 widget-text--grey widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        16:45 - 20:15
      </p>
    </div>
  )
}

function Frame45() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-start widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <Frame6 />
      <Frame9 />
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

export const Widget = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-bg-dark content-stretch flex flex-col h-[152px] items-start justify-between p-[16px] widget-relative widget-card--rounded widget-shrink-0 w-[226px] ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Widget"
        aria-label={ariaLabel || 'Widget'}
      >
        <div className=" widget-text widget-text--ndot widget-text--14 widget-text--grey widget-text--uppercase widget-text--nowrap widget-relative widget-shrink-0">
          <p className="widget-leading-18 mb-0">Stansted airport</p>
          <p className="widget-leading-18 mb-0">Ryanair flight</p>
          <p className="widget-leading-18 mb-0">LDN to BER</p>
          <p className="widget-leading-18">In 19 MIN</p>
        </div>
        <Frame45 />
      </div>
    )
  },
)
Widget.displayName = 'Widget'
