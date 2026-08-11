import * as React from 'react'

import { cn, dataAttr } from '@/lib/utils'
import { cva } from 'class-variance-authority'
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

export const PairNewDevice = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card widget-card--152 widget-card--rounded widget-card--dark ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Pair New Device"
        aria-label={ariaLabel || 'Pair New Device'}
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[10px] widget-relative size-full">
            <div className=" widget-text widget-text--dotmatrix widget-text--16 widget-text--grey widget-text--center widget-text--uppercase widget-text--nowrap">
              <p className="widget-leading-normal mb-0">Pair</p>
              <p className="widget-leading-normal">New Device</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
PairNewDevice.displayName = 'PairNewDevice'
