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

/**
 * Recording 组件 (合并自原 Recording + Record2)
 *
 * - variant: 'pill' (默认, 药丸状 152×32 "00:00:05")
 *           'rec' (原 Record2, 152 圆形 BG + "REC")
 */
export type RecordingVariant = 'pill' | 'rec'

export interface RecordingProps extends WidgetSubProps {
  variant?: RecordingVariant
  time?: string
}

export const Recording = React.forwardRef<HTMLDivElement, RecordingProps>(
  (
    {
      theme,
      size,
      className,
      'aria-label': ariaLabel,
      style,
      variant = 'pill',
      time = '00:00:05',
      ...props
    },
    ref,
  ) => {
    if (variant === 'rec') {
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
          data-variant={dataAttr(variant)}
          {...props}
          data-name="Record"
          aria-label={ariaLabel || 'Record'}
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
          <p
            className=" widget-col-1 ml-[63px] mt-[68px] widget-opacity-70 widget-relative widget-row-1 widget-text widget-text--14 widget-text--white widget-text--center widget-text--nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            REC
          </p>
        </div>
      )
    }
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-card widget-card--152 widget-card--pill widget-card--light content-stretch flex gap-[6px] items-center justify-center widget-relative widget-shrink-0 ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        data-variant={dataAttr(variant)}
        {...props}
        data-name="Recording"
        aria-label={ariaLabel || 'Recording'}
      >
        <div
          className="widget-card__icon widget-relative widget-shrink-0 size-[8px]"
          data-name="Dot"
        >
          <svg
            className="aios-widget-icon-svg"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" fill="var(--widget-primary)" fillOpacity="1" id="Dot" r="4" />
          </svg>
        </div>
        <p className=" widget-text widget-text--dotmatrix widget-text--12 widget-text--grey2 widget-text--center widget-text--nowrap">
          {time}
        </p>
      </div>
    )
  },
)
Recording.displayName = 'Recording'
