import React from 'react';

import { cn, dataAttr } from '../../../lib/utils';
import { cva } from 'class-variance-authority';
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

/**
 * OverLimit 组件 (合并自原 OverLimit + OverLimit1)
 *
 * - theme: 'dark' (默认) | 'light'
 * - minutes: 限制分钟数 (默认 30, 原 OverLimit1 用 40)
 */
export type OverLimitTheme = 'dark' | 'light'

export interface OverLimitProps extends Omit<WidgetSubProps, 'theme'> {
  theme?: OverLimitTheme
  minutes?: number
}

const Arrow = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `-translate-x-1/2 -translate-y-1/2 absolute h-[26.5px] left-1/2 top-[calc(50%+0.25px)] w-[26px] ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Arrow" aria-label={ariaLabel || "Arrow"}>
      <div className="widget-card__icon absolute inset-[-3.77%_-3.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28.5">
          <g id="Arrow">
            <path d="M1 14L14 1L27 14" id="Vector 8" stroke="var(--widget-primary-dark)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" strokeOpacity="1" />
            <path d="M14 1V27.5" id="Vector 9" stroke="var(--widget-primary-dark)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" strokeOpacity="1" />
          </g>
        </svg>
      </div>
    </div>
    )
  }
)
Arrow.displayName = 'Arrow'


const Icon32 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-relative widget-shrink-0 size-[32px] ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Icon" aria-label={ariaLabel || "Icon"}>
      <Arrow />
    </div>
    )
  }
)
Icon32.displayName = 'Icon32'


const LimitCount = React.forwardRef<HTMLDivElement, WidgetSubProps & { minutes: number }>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, minutes, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), ` content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 widget-text widget-text--nowrap ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Limit Count" aria-label={ariaLabel || "Limit Count"}>
      <p className="widget-leading-0 widget-relative widget-shrink-0 widget-sr text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="widget-text widget-text--light widget-text--32" style={{ fontVariationSettings: "'wdth' 100" }}>
          {minutes}
        </span>
        <span className="widget-leading-normal widget-text widget-text--10">{` `}</span>
        <span className="widget-text widget-text--light widget-text--16" style={{ fontVariationSettings: "'wdth' 100" }}>
          MIN
        </span>
      </p>
      <p className="widget-leading-normal widget-relative widget-shrink-0 widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Over Limit
      </p>
    </div>
    )
  }
)
LimitCount.displayName = 'LimitCount'


export const OverLimit = React.forwardRef<HTMLDivElement, OverLimitProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, minutes = 30, ...props }, ref) => {
    if (theme === 'dark') {
      return (
        <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} data-variant={dataAttr(theme)} {...props} data-name="Over Limit" aria-label={ariaLabel || "Over Limit"}>
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full">
            <Icon32 />
            <LimitCount minutes={minutes} />
          </div>
        </div>
      </div>
      )
    }
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme: theme === 'light' ? 'light' : 'dark', size }), `content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 widget-text widget-text--center widget-opacity-70 ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} data-variant={dataAttr(theme)} {...props} data-name="Over Limit" aria-label={ariaLabel || "Over Limit"}>
      <p className="widget-text widget-text--18" style={{ fontVariationSettings: "'wdth' 100" }}>
        {minutes}m
      </p>
      <p className="widget-text widget-text--10 widget-text--grey2 widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Over Limit
      </p>
    </div>
    )
  }
)
OverLimit.displayName = 'OverLimit'


export const Overlimit = React.forwardRef<HTMLDivElement, OverLimitProps>(
  ({ size, className, 'aria-label': ariaLabel, style, minutes = 30, theme = 'dark', ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme: 'dark', size }), `widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim())} data-theme="dark" data-size={dataAttr(size)} data-variant={dataAttr(theme)} {...props} data-name="Overlimit" aria-label={ariaLabel || "Overlimit"}>
      <div className="flex flex-col justify-center size-full">
        <div className=" content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full text-white whitespace-nowrap">
          <OverLimit minutes={minutes} theme={theme} />
          <p className="widget-text widget-text--ndot widget-text--sr widget-text--uppercase widget-relative widget-shrink-0">
            <span className="widget-leading-29 widget-text widget-text--32">16</span>
            <span className="widget-leading-29 widget-text widget-text--16">{`H `}</span>
            <span className="widget-leading-29 widget-text widget-text--32">32</span>
            <span className="widget-leading-29 widget-text widget-text--16">M</span>
          </p>
        </div>
      </div>
    </div>
    )
  }
)
Overlimit.displayName = 'Overlimit'
