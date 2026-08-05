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

/**
 * LocationAccess 组件 (合并自原 LocationAccess + LocationAccess1)
 *
 * - theme: 'dark' (默认, 深 BG + 白字) | 'light' (白 BG + 黑字, 原 LocationAccess1)
 */
export type LocationAccessTheme = 'dark' | 'light'

export interface LocationAccessProps extends Omit<WidgetSubProps, 'theme'> {
  theme?: LocationAccessTheme
}

const ICON_PATHS = {
  dark: svgPaths.p13550f80,
  light: svgPaths.p1179fd00,
} as const

const BG_FILLS = {
  dark: 'var(--widget-dark-bg)',
  light: 'currentColor',
} as const

const TEXT_COLORS = {
  dark: 'var(--widget-white)',
  light: 'var(--widget-dark-bg)',
} as const

export const LocationAccess = React.forwardRef<HTMLDivElement, LocationAccessProps>(
  ({ size, className, 'aria-label': ariaLabel, style, theme = 'dark', ...props }, ref) => {
    const bgFill = BG_FILLS[theme]
    const textFill = TEXT_COLORS[theme]
    const iconPath = ICON_PATHS[theme]
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme: 'dark', size }),
          `widget-grid-auto ${className || ''}`.trim(),
        )}
        data-theme="dark"
        data-size={dataAttr(size)}
        data-variant={dataAttr(theme)}
        {...props}
        data-name="Location Access"
        aria-label={ariaLabel || 'Location Access'}
      >
        <div
          className="widget-card__icon widget-col-1 ml-0 mt-0 widget-relative widget-row-1 size-[152px]"
          data-name="BG"
        >
          <svg
            className="nothing-widget-icon-svg"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 152 152"
          >
            <circle cx="76" cy="76" fill={bgFill} fillOpacity="1" id="BG" r="76" />
          </svg>
        </div>
        <div
          className="widget-col-1 content-stretch flex flex-col gap-[6px] items-center ml-[49px] mt-[47px] widget-relative widget-row-1"
          aria-hidden="true"
        >
          <div
            className="widget-card__icon widget-relative widget-shrink-0 widget-card__svg--24"
            data-name="Icon"
            aria-hidden="true"
          >
            <svg
              className="nothing-widget-icon-svg"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <g id="Icon">
                <path d={iconPath} fill="currentColor" fillOpacity="1" id="Vector" />
              </g>
            </svg>
          </div>
          <div
            className=" widget-text widget-text--14 widget-text--center widget-text--nowrap widget-opacity-70"
            style={{ fontVariationSettings: "'wdth' 100", color: textFill }}
          >
            <p className="widget-leading-normal mb-0">Location</p>
            <p className="widget-leading-normal">access</p>
          </div>
        </div>
      </div>
    )
  },
)
LocationAccess.displayName = 'LocationAccess'
