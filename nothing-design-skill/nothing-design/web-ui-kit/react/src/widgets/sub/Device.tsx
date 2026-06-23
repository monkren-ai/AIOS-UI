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

export const Dots7 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card__icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[75px] w-[46px] ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Dots" aria-label={ariaLabel || "Dots"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 46 75">
        <g id="Dots">
          <circle cx="19" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 234" r="2" />
          <circle cx="23" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 235" r="2" />
          <circle cx="27" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 236" r="2" />
          <circle cx="15" cy="52" fill="currentColor" fillOpacity="1" id="Ellipse 234_2" r="2" />
          <circle cx="12" cy="48" fill="currentColor" fillOpacity="1" id="Ellipse 240" r="2" />
          <circle cx="19" cy="52" fill="currentColor" fillOpacity="1" id="Ellipse 235_2" r="2" />
          <circle cx="23" cy="52" fill="currentColor" fillOpacity="1" id="Ellipse 236_2" r="2" />
          <circle cx="27" cy="52" fill="currentColor" fillOpacity="1" id="Ellipse 237" r="2" />
          <circle cx="31" cy="52" fill="currentColor" fillOpacity="1" id="Ellipse 238" r="2" />
          <circle cx="34" cy="48" fill="currentColor" fillOpacity="1" id="Ellipse 239" r="2" />
          <circle cx="25" cy="30" fill="currentColor" fillOpacity="1" id="Ellipse 234_3" r="2" transform="rotate(90 25 30)" />
          <circle cx="25" cy="34" fill="currentColor" fillOpacity="1" id="Ellipse 235_3" r="2" transform="rotate(90 25 34)" />
          <circle cx="25" cy="38" fill="currentColor" fillOpacity="1" id="Ellipse 236_3" r="2" transform="rotate(90 25 38)" />
          <circle cx="25" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 237_2" r="2" transform="rotate(90 25 42)" />
          <circle cx="21" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 238_2" r="2" transform="rotate(90 21 42)" />
          <circle cx="12" cy="30" fill="currentColor" fillOpacity="1" id="Ellipse 234_4" r="2" transform="rotate(90 12 30)" />
          <circle cx="34" cy="30" fill="currentColor" fillOpacity="1" id="Ellipse 235_4" r="2" transform="rotate(90 34 30)" />
          <circle cx="5" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 230" r="2" />
          <circle cx="9" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 231" r="2" />
          <circle cx="13" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 232" r="2" />
          <circle cx="17" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 233" r="2" />
          <circle cx="21" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 234_5" r="2" />
          <circle cx="25" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 235_5" r="2" />
          <circle cx="29" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 236_4" r="2" />
          <circle cx="33" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 237_3" r="2" />
          <circle cx="37" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 238_3" r="2" />
          <circle cx="41" cy="2" fill="currentColor" fillOpacity="1" id="Ellipse 239_2" r="2" />
          <circle cx="5" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 230_2" r="2" />
          <circle cx="9" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 231_2" r="2" />
          <circle cx="13" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 232_2" r="2" />
          <circle cx="17" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 233_2" r="2" />
          <circle cx="21" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 234_6" r="2" />
          <circle cx="25" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 235_6" r="2" />
          <circle cx="29" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 236_5" r="2" />
          <circle cx="33" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 237_4" r="2" />
          <circle cx="37" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 238_4" r="2" />
          <circle cx="41" cy="73" fill="currentColor" fillOpacity="1" id="Ellipse 239_3" r="2" />
          <circle cx="2" cy="6" fill="currentColor" fillOpacity="1" id="Ellipse 230_3" r="2" transform="rotate(90 2 6)" />
          <circle cx="2" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 231_3" r="2" transform="rotate(90 2 10)" />
          <circle cx="2" cy="14" fill="currentColor" fillOpacity="1" id="Ellipse 232_3" r="2" transform="rotate(90 2 14)" />
          <circle cx="2" cy="18" fill="currentColor" fillOpacity="1" id="Ellipse 233_3" r="2" transform="rotate(90 2 18)" />
          <circle cx="2" cy="22" fill="currentColor" fillOpacity="1" id="Ellipse 234_7" r="2" transform="rotate(90 2 22)" />
          <circle cx="2" cy="26" fill="currentColor" fillOpacity="1" id="Ellipse 235_7" r="2" transform="rotate(90 2 26)" />
          <circle cx="2" cy="30" fill="currentColor" fillOpacity="1" id="Ellipse 236_6" r="2" transform="rotate(90 2 30)" />
          <circle cx="2" cy="34" fill="currentColor" fillOpacity="1" id="Ellipse 237_5" r="2" transform="rotate(90 2 34)" />
          <circle cx="2" cy="38" fill="currentColor" fillOpacity="1" id="Ellipse 238_5" r="2" transform="rotate(90 2 38)" />
          <circle cx="2" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 239_4" r="2" transform="rotate(90 2 42)" />
          <circle cx="2" cy="46" fill="currentColor" fillOpacity="1" id="Ellipse 240_2" r="2" transform="rotate(90 2 46)" />
          <circle cx="2" cy="50" fill="currentColor" fillOpacity="1" id="Ellipse 241" r="2" transform="rotate(90 2 50)" />
          <circle cx="2" cy="54" fill="currentColor" fillOpacity="1" id="Ellipse 242" r="2" transform="rotate(90 2 54)" />
          <circle cx="2" cy="58" fill="currentColor" fillOpacity="1" id="Ellipse 243" r="2" transform="rotate(90 2 58)" />
          <circle cx="2" cy="62" fill="currentColor" fillOpacity="1" id="Ellipse 244" r="2" transform="rotate(90 2 62)" />
          <circle cx="2" cy="66" fill="currentColor" fillOpacity="1" id="Ellipse 245" r="2" transform="rotate(90 2 66)" />
          <circle cx="2" cy="70" fill="currentColor" fillOpacity="1" id="Ellipse 246" r="2" transform="rotate(90 2 70)" />
          <circle cx="44" cy="6" fill="currentColor" fillOpacity="1" id="Ellipse 230_4" r="2" transform="rotate(90 44 6)" />
          <circle cx="44" cy="10" fill="currentColor" fillOpacity="1" id="Ellipse 231_4" r="2" transform="rotate(90 44 10)" />
          <circle cx="44" cy="14" fill="currentColor" fillOpacity="1" id="Ellipse 232_4" r="2" transform="rotate(90 44 14)" />
          <circle cx="44" cy="18" fill="currentColor" fillOpacity="1" id="Ellipse 233_4" r="2" transform="rotate(90 44 18)" />
          <circle cx="44" cy="22" fill="currentColor" fillOpacity="1" id="Ellipse 234_8" r="2" transform="rotate(90 44 22)" />
          <circle cx="44" cy="26" fill="currentColor" fillOpacity="1" id="Ellipse 235_8" r="2" transform="rotate(90 44 26)" />
          <circle cx="44" cy="30" fill="currentColor" fillOpacity="1" id="Ellipse 236_7" r="2" transform="rotate(90 44 30)" />
          <circle cx="44" cy="34" fill="currentColor" fillOpacity="1" id="Ellipse 237_6" r="2" transform="rotate(90 44 34)" />
          <circle cx="44" cy="38" fill="currentColor" fillOpacity="1" id="Ellipse 238_6" r="2" transform="rotate(90 44 38)" />
          <circle cx="44" cy="42" fill="currentColor" fillOpacity="1" id="Ellipse 239_5" r="2" transform="rotate(90 44 42)" />
          <circle cx="44" cy="46" fill="currentColor" fillOpacity="1" id="Ellipse 240_3" r="2" transform="rotate(90 44 46)" />
          <circle cx="44" cy="50" fill="currentColor" fillOpacity="1" id="Ellipse 241_2" r="2" transform="rotate(90 44 50)" />
          <circle cx="44" cy="54" fill="currentColor" fillOpacity="1" id="Ellipse 242_2" r="2" transform="rotate(90 44 54)" />
          <circle cx="44" cy="58" fill="currentColor" fillOpacity="1" id="Ellipse 243_2" r="2" transform="rotate(90 44 58)" />
          <circle cx="44" cy="62" fill="currentColor" fillOpacity="1" id="Ellipse 244_2" r="2" transform="rotate(90 44 62)" />
          <circle cx="44" cy="66" fill="currentColor" fillOpacity="1" id="Ellipse 245_2" r="2" transform="rotate(90 44 66)" />
          <circle cx="44" cy="70" fill="currentColor" fillOpacity="1" id="Ellipse 246_2" r="2" transform="rotate(90 44 70)" />
        </g>
      </svg>
    </div>
    )
  }
)
Dots7.displayName = 'Dots7'


export const Device = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card-wrapper ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Device" aria-label={ariaLabel || "Device"}>
      <div className="widget-bg-light absolute inset-0 widget-card--rounded size-[152px]" data-name="BG" />
      <Dots7 />
    </div>
    )
  }
)
Device.displayName = 'Device'

