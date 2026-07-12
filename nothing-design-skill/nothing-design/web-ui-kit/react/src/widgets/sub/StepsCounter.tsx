import React from 'react';

import { cn, dataAttr } from '@/lib/utils';
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

export const StepsCount = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Steps Count" aria-label={ariaLabel || "Steps Count"}>
      <p className="widget-text widget-text--10 widget-text--grey widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Total Steps
      </p>
      <p className="widget-text widget-text--ndot widget-text--30 widget-text--grey3">5,543</p>
    </div>
    )
  }
)
StepsCount.displayName = 'StepsCount'


export const Streak = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `content-stretch flex flex-col gap-[2px] items-start widget-relative widget-shrink-0 ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Streak" aria-label={ariaLabel || "Streak"}>
      <p className="widget-text widget-text--10 widget-text--grey widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Streak
      </p>
      <p className="widget-text widget-text--ndot widget-text--30 widget-text--grey3">3 DAYS</p>
    </div>
    )
  }
)
Streak.displayName = 'Streak'


export const StepsCounter = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card widget-card--152 widget-card--rounded widget-card--light ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Steps Counter" aria-label={ariaLabel || "Steps Counter"}>
      <div className="flex flex-col justify-center size-full">
        <div className=" content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full whitespace-nowrap">
          <StepsCount />
          <Streak />
        </div>
      </div>
    </div>
    )
  }
)
StepsCounter.displayName = 'StepsCounter'

