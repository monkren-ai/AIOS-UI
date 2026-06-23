import React from 'react';
import { cn, dataAttr } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import svgPaths from '../widget-svg-paths';

function Frame() {
  return (
    <div className="content-stretch flex gap-[7px] items-center widget-relative widget-shrink-0" aria-hidden="true">
      <div className="widget-overflow-clip widget-relative widget-shrink-0 widget-card__svg--16" data-name="Icon/Arrow-Upward">
        <div className="absolute inset-[31.25%_12.5%]">
          <div className="absolute inset-[-12.5%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13.5 7.5">
              <path d={svgPaths.p30fc9ea0} id="Vector 1" stroke="var(--fill-0, var(--widget-dark-2))" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" style={{ stroke: "color(display-p3 0.2314 0.2235 0.2431)", strokeOpacity: "1" }} />
            </svg>
          </div>
        </div>
      </div>
      <p className=" widget-text widget-text--light widget-text--28 widget-text--grey3 widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        15°
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[7px] items-center widget-relative widget-shrink-0" aria-hidden="true">
      <div className="widget-overflow-clip widget-relative widget-shrink-0 widget-card__svg--16" data-name="Icon/Arrow-Downward">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[6px] left-1/2 top-1/2 w-[12px]">
          <div className="absolute inset-[-12.5%_-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13.5 7.5">
              <path d={svgPaths.p2e08bc80} id="Vector 1" stroke="var(--fill-0, var(--widget-dark-2))" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" style={{ stroke: "color(display-p3 0.2314 0.2235 0.2431)", strokeOpacity: "1" }} />
            </svg>
          </div>
        </div>
      </div>
      <p className=" widget-text widget-text--light widget-text--28 widget-text--grey3 widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        7°
      </p>
    </div>
  );
}

function Info2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center widget-relative widget-shrink-0" data-name="Info" aria-hidden="true">
      <Frame />
      <Frame1 />
    </div>
  );
}

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

export const TempControl = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card widget-card--152 widget-card--pill widget-card--light content-stretch flex flex-col items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Temp Control" aria-label={ariaLabel || "Temp Control"}>
      <Info2 />
    </div>
    )
  }
)
TempControl.displayName = 'TempControl'

