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

export const Flash = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size }),
          `widget-relative widget-shrink-0 size-[152px] ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        {...props}
        data-name="Flash"
        aria-label={ariaLabel || 'Flash'}
      >
        <svg
          className="nothing-widget-icon-svg"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 152 152"
        >
          <g id="Flash">
            <circle cx="76" cy="76" id="BG" r="76" fill="currentColor" fillOpacity="1" />
            <g id="Dots">
              <ellipse
                cx="82.8572"
                cy="48.4286"
                id="Ellipse 144"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="82.8572"
                cy="55.2857"
                id="Ellipse 187"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="82.8572"
                cy="62.1428"
                id="Ellipse 188"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="82.8572"
                cy="69"
                id="Ellipse 189"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="82.8572"
                cy="75.8572"
                id="Ellipse 190"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="82.8572"
                cy="82.7143"
                id="Ellipse 191"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="82.8572"
                cy="89.5714"
                id="Ellipse 192"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="76"
                cy="55.2857"
                id="Ellipse 144_2"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="76"
                cy="62.1428"
                id="Ellipse 187_2"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="76"
                cy="69"
                id="Ellipse 188_2"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="76"
                cy="75.8572"
                id="Ellipse 189_2"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="76"
                cy="82.7143"
                id="Ellipse 190_2"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="76"
                cy="89.5714"
                id="Ellipse 191_2"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="76"
                cy="96.4286"
                id="Ellipse 192_2"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="62.2857"
                cy="69"
                id="Ellipse 190_3"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="89.7143"
                cy="82.7142"
                id="Ellipse 191_3"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
                transform="rotate(180 89.7143 82.7142)"
              />
              <ellipse
                cx="62.2857"
                cy="75.8572"
                id="Ellipse 189_3"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="89.7143"
                cy="75.8571"
                id="Ellipse 192_3"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
                transform="rotate(180 89.7143 75.8571)"
              />
              <ellipse
                cx="55.4286"
                cy="75.8572"
                id="Ellipse 188_3"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="96.5714"
                cy="75.8571"
                id="Ellipse 193"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
                transform="rotate(180 96.5714 75.8571)"
              />
              <ellipse
                cx="69.1429"
                cy="62.1428"
                id="Ellipse 144_3"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="69.1429"
                cy="69"
                id="Ellipse 187_3"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="69.1429"
                cy="75.8572"
                id="Ellipse 188_4"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="69.1429"
                cy="82.7143"
                id="Ellipse 189_4"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="69.1429"
                cy="89.5714"
                id="Ellipse 190_4"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="69.1429"
                cy="96.4286"
                id="Ellipse 191_4"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
              <ellipse
                cx="69.1429"
                cy="103.286"
                id="Ellipse 192_4"
                rx="3.42857"
                ry="3.42857"
                fill="currentColor"
                fillOpacity="1"
              />
            </g>
          </g>
        </svg>
      </div>
    )
  },
)
Flash.displayName = 'Flash'
