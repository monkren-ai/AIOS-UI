import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import svgPaths from '@/widgets/widget-svg-paths'

function Icon30() {
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
          <path d={svgPaths.pe5c97c0} fill="currentColor" fillOpacity="1" id="Vector" />
        </g>
      </svg>
    </div>
  )
}

function Frame44() {
  return (
    <div
      className="widget-col-1 content-stretch flex flex-col gap-[6px] items-center ml-[54px] mt-[47px] widget-relative widget-row-1 w-[45px]"
      aria-hidden="true"
    >
      <Icon30 />
      <div
        className=" widget-text widget-text--14 widget-text--white widget-text--center widget-text--nowrap widget-opacity-70"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="widget-leading-normal mb-0">Mic</p>
        <p className="widget-leading-normal">access</p>
      </div>
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

export const MicAccess = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-grid-auto ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Mic Access"
        aria-label={ariaLabel || 'Mic Access'}
      >
        <div
          className="widget-card__icon widget-col-1 ml-0 mt-0 widget-relative widget-row-1 size-[152px]"
          data-name="BG"
        >
          <svg
            className="aios-widget-icon-svg"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 152 152"
          >
            <circle cx="76" cy="76" fill="var(--widget-primary)" fillOpacity="1" id="BG" r="76" />
          </svg>
        </div>
        <Frame44 />
      </div>
    )
  },
)
MicAccess.displayName = 'MicAccess'
