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

export const Group1 = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card__icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[47.511px] w-[48px] ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} aria-label={ariaLabel || "Group1"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 47.5107">
        <g id="Group 1">
          <circle cx="20.9857" cy="2.61418" id="Ellipse 84" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="8.71393" cy="38.8563" id="Ellipse 168" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="39.2861" cy="38.8563" id="Ellipse 172" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="33.1858" cy="2.61418" id="Ellipse 152" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="45.3858" cy="2.61418" id="Ellipse 158" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="20.9857" cy="14.6947" id="Ellipse 140" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="33.1858" cy="14.6947" id="Ellipse 153" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="45.3858" cy="14.6947" id="Ellipse 159" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="20.9857" cy="8.65446" id="Ellipse 86" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="8.71393" cy="44.8966" id="Ellipse 169" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="39.2861" cy="44.8966" id="Ellipse 173" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="33.1858" cy="8.65446" id="Ellipse 154" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="45.3858" cy="8.65446" id="Ellipse 160" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="14.8859" cy="2.61418" id="Ellipse 85" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="2.61418" cy="38.8563" id="Ellipse 170" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="33.1863" cy="38.8563" id="Ellipse 174" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="27.0861" cy="2.61418" id="Ellipse 155" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="39.2861" cy="2.61418" id="Ellipse 161" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="14.8859" cy="20.7352" id="Ellipse 148" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="45.3858" cy="20.7352" id="Ellipse 164" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="14.8859" cy="14.6947" id="Ellipse 147" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="27.0861" cy="14.6947" id="Ellipse 156" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="39.2861" cy="14.6947" id="Ellipse 162" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="14.8859" cy="32.8158" id="Ellipse 149" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="45.3858" cy="32.8158" id="Ellipse 165" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="14.8859" cy="38.8563" id="Ellipse 151" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="45.3858" cy="38.8563" id="Ellipse 166" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="14.8859" cy="8.65446" id="Ellipse 87" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="2.61418" cy="44.8966" id="Ellipse 171" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="33.1863" cy="44.8966" id="Ellipse 175" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="27.0861" cy="8.65446" id="Ellipse 157" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="39.2861" cy="8.65446" id="Ellipse 163" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="14.8859" cy="26.7755" id="Ellipse 150" r="2.61418" fill="currentColor" fillOpacity="1" />
          <circle cx="45.3858" cy="26.7755" id="Ellipse 167" r="2.61418" fill="currentColor" fillOpacity="1" />
        </g>
      </svg>
    </div>
    )
  }
)
Group1.displayName = 'Group1'


export const Music = React.forwardRef<HTMLDivElement, WidgetSubProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} className={cn(widgetSubVariants({ theme, size }), `widget-card-wrapper ${className || ''}`.trim())} data-theme={dataAttr(theme)} data-size={dataAttr(size)} {...props} data-name="Music" aria-label={ariaLabel || "Music"}>
      <div className="widget-bg-dark absolute inset-0 widget-card--rounded size-[152px]" data-name="BG" />
      <Group1 />
    </div>
    )
  }
)
Music.displayName = 'Music'

