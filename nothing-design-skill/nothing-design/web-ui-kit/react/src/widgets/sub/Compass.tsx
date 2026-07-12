import React from 'react';
import { cn, dataAttr } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import svgPaths from '../widget-svg-paths';

function Icon24() {
  return (
    <div className="widget-card__icon absolute inset-[8.33%]" data-name="Icon" aria-hidden="true">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 11 11">
          <g id="Icon">
            <circle cx="5.5" cy="5.5" id="Ellipse 185" r="5" stroke="currentColor" strokeOpacity="1" />
            <path d="M5.5 0.5V10.5" id="Vector 2" stroke="currentColor" strokeOpacity="1" />
            <path d="M2.5 1.5L2.5 9.5" id="Vector 3" stroke="currentColor" strokeOpacity="1" />
            <path d="M8.5 1.5L8.5 9.5" id="Vector 4" stroke="currentColor" strokeOpacity="1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[6px] items-start widget-relative widget-shrink-0" aria-hidden="true">
      <div className="widget-relative widget-shrink-0 size-[12px]" data-name="Icon/longitude">
        <Icon24 />
      </div>
      <p className=" widget-text widget-text--10 widget-text--grey3 widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        51°30�?9.2”N
      </p>
    </div>
  );
}

function Icon25() {
  return (
    <div className="widget-card__icon absolute inset-[8.33%]" data-name="Icon" aria-hidden="true">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 11 11">
          <g id="Icon">
            <circle cx="5.5" cy="5.5" id="Ellipse 185" r="5" stroke="currentColor" strokeOpacity="1" />
            <path d="M10.5 5.5L0.5 5.5" id="Vector 2" stroke="currentColor" strokeOpacity="1" />
            <path d="M9.5 2.5L1.5 2.5" id="Vector 3" stroke="currentColor" strokeOpacity="1" />
            <path d="M9.5 8.5L1.5 8.5" id="Vector 4" stroke="currentColor" strokeOpacity="1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[6px] items-start widget-relative widget-shrink-0" aria-hidden="true">
      <div className="widget-relative widget-shrink-0 size-[12px]" data-name="Icon/latitude">
        <Icon25 />
      </div>
      <p className=" widget-text widget-text--10 widget-text--grey3 widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        0°05�?0.4”W
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center widget-relative widget-shrink-0" aria-hidden="true">
      <div className="widget-card__icon h-[9px] widget-relative widget-shrink-0 w-[11px]" data-name="Vector">
        <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 11 9">
          <path d={svgPaths.p2ab44200} fill="currentColor" fillOpacity="1" id="Vector" />
        </svg>
      </div>
      <p className=" widget-text widget-text--10 widget-text--grey3 widget-text--nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        108 ft
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[68px] items-start justify-center widget-relative widget-shrink-0 w-[77px]" aria-hidden="true">
      <Frame3 />
      <Frame2 />
      <Frame4 />
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

export const Compass = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card widget-card--152 widget-card--pill widget-card--light content-stretch flex flex-col items-center justify-center p-[10px] widget-relative widget-shrink-0 ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Compass" aria-label={ariaLabel || "Compass"}>
      <Frame5 />
    </div>
    )
  }
)
Compass.displayName = 'Compass'

