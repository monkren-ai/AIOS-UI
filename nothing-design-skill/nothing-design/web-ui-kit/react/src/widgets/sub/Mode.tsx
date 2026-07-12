import React from 'react';
import { cn, dataAttr } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import svgPaths from '../widget-svg-paths';

const widgetSubVariants = cva('', {
  variants: {
    theme: { light: 'widget-theme--light', dark: 'widget-theme--dark' },
    size: { small: 'widget-size--small', medium: 'widget-size--medium', large: 'widget-size--large' },
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

export const Group30 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `absolute h-[24px] left-[1.4px] top-[4px] w-[29.192px] ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} aria-label={ariaLabel || "Group30"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 29.1922 24">
        <g id="Group 20">
          <path d={svgPaths.p205ee00} id="Ellipse 228" stroke="var(--fill-0, var(--widget-white))" strokeWidth="3" style={{ stroke: "var(--widget-white)", strokeOpacity: "1" }} />
          <circle cx="14.5961" cy="14.0644" fill="var(--fill-0, var(--widget-white))" id="Ellipse 229" r="2.99935" style={{ fill: "var(--widget-white)", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
    )
  }
)
Group30.displayName = 'Group30'


export const Icon33 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-overflow-clip widget-relative widget-shrink-0 size-[32px] ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Icon" aria-label={ariaLabel || "Icon"}>
      <Group30 />
    </div>
    )
  }
)
Icon33.displayName = 'Icon33'


export const Mode = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Mode" aria-label={ariaLabel || "Mode"}>
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center justify-center p-[16px] widget-relative size-full">
          <p className=" widget-text widget-text--16 widget-text--grey widget-text--center widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            BALANCED
          </p>
          <Icon33 />
        </div>
      </div>
    </div>
    )
  }
)
Mode.displayName = 'Mode'

