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
 * Weather 组件 (合并自原 Weather1 + Weather2)
 *
 * - variant: 'icon' (默认, 原 Weather1, 152 圆 + 太阳点阵)
 *           | 'forecast' (原 Weather2, 226×152 宽列 + 5 日预报)
 * - size: 152 (默认) | 320 (variant='icon' 时影响外框)
 */
export type WeatherVariant = 'icon' | 'forecast'
export type WeatherSize = 152 | 320

export interface WeatherProps extends Omit<WidgetSubProps, 'size'> {
  variant?: WeatherVariant
  size?: WeatherSize
}

function WeatherIconSvg() {
  return (
    <svg
      className="aios-widget-icon-svg"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 152 152"
    >
      <g id="Weather">
        <circle
          cx="76"
          cy="76"
          fill="var(--fill-0, var(--widget-dark-bg))"
          id="BG"
          r="76"
          style={{ fill: 'color(display-p3 0.102 0.114 0.110)', fillOpacity: '1' }}
        />
        <g id="Ivon">
          <g id="Group 23">
            <ellipse
              cx="53.1579"
              cy="103.158"
              fill="var(--fill-0, var(--widget-dark-bg))"
              id="Ellipse 119"
              rx="3.1579"
              ry="3.1579"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
            />
            <ellipse
              cx="59.0528"
              cy="98.1579"
              fill="var(--fill-0, var(--widget-dark-bg))"
              id="Ellipse 120"
              rx="3.1579"
              ry="3.1579"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
            />
          </g>
          <g id="Group 22">
            <ellipse
              cx="73.1579"
              cy="103.158"
              fill="var(--fill-0, var(--widget-dark-bg))"
              id="Ellipse 121"
              rx="3.1579"
              ry="3.1579"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
            />
            <ellipse
              cx="79.0528"
              cy="98.1579"
              fill="var(--fill-0, var(--widget-dark-bg))"
              id="Ellipse 122"
              rx="3.1579"
              ry="3.1579"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
            />
          </g>
          <g id="Group 21">
            <ellipse
              cx="93.1579"
              cy="103.158"
              fill="var(--fill-0, var(--widget-dark-bg))"
              id="Ellipse 123"
              rx="3.1579"
              ry="3.1579"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
            />
            <ellipse
              cx="99.0528"
              cy="98.1579"
              fill="var(--fill-0, var(--widget-dark-bg))"
              id="Ellipse 124"
              rx="3.1579"
              ry="3.1579"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
            />
          </g>
          <ellipse
            cx="61.263"
            cy="55.5263"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 68"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="61.263"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 70"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="76"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 78"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="76"
            cy="55.5263"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 108"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="76"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 90"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="76"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 96"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="76"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 102"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="90.737"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 80"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="90.737"
            cy="55.5263"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 109"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="90.737"
            cy="48.1579"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 113"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="90.737"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 91"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="90.737"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 97"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="90.737"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 103"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="105.474"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 82"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="112.842"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 116"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="105.474"
            cy="55.5263"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 110"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="105.474"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 92"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="112.842"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 117"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="105.474"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 98"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="112.842"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 118"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="105.474"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 104"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="61.263"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 72"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="46.5263"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 84"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="46.5263"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 89"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="46.5263"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 86"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="46.5263"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 88"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="61.263"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 74"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="61.263"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 76"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="53.8949"
            cy="55.5263"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 69"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="53.8949"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 71"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="68.6316"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 79"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="68.6316"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 93"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="68.6316"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 99"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="68.6316"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 105"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="83.3684"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 81"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="83.3684"
            cy="55.5263"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 111"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="83.3684"
            cy="48.1579"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 114"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="83.3684"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 94"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="83.3684"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 100"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="83.3684"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 106"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="98.1051"
            cy="62.8947"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 83"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="98.1051"
            cy="55.5263"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 112"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="98.1051"
            cy="48.1579"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 115"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="98.1051"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 95"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="98.1051"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 101"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="98.1051"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 107"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="53.8949"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 73"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="39.1579"
            cy="70.2631"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 85"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="39.1579"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 87"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="53.8949"
            cy="77.6315"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 75"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
          <ellipse
            cx="53.8949"
            cy="84.9999"
            fill="var(--fill-0, var(--widget-dark-bg))"
            id="Ellipse 77"
            rx="3.1579"
            ry="3.1579"
            style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
          />
        </g>
      </g>
    </svg>
  )
}

function ForecastGroup31() {
  return (
    <div className="absolute inset-[10%_0_7.02%_0]" aria-hidden="true">
      <svg
        className="aios-widget-icon-svg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 40 33.1915"
      >
        <g id="Group 17">
          <g id="Group 16">
            <ellipse
              cx="17.8724"
              cy="20"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 68"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="17.8724"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 70"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="23.8298"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 78"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="23.8298"
              cy="20"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 108"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="23.8298"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 90"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="23.8298"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 96"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="23.8298"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 102"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="29.7873"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 80"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="29.7873"
              cy="20"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 109"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="29.7873"
              cy="17.0213"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 113"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="29.7873"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 91"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="29.7873"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 97"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="29.7873"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 103"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="35.7447"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 82"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="38.7234"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 116"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="35.7447"
              cy="20"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 110"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="35.7447"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 92"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="38.7234"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 117"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="35.7447"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 98"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="38.7234"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 118"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="35.7447"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 104"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="17.8724"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 72"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="11.9149"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 84"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="11.9149"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 89"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="11.9149"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 86"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="11.9149"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 88"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="17.8724"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 74"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="17.8724"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 76"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="14.8936"
              cy="20"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 69"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="14.8936"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 71"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="20.8511"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 79"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="20.8511"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 93"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="20.8511"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 99"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="20.8511"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 105"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="26.8085"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 81"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="26.8085"
              cy="20"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 111"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="26.8085"
              cy="17.0213"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 114"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="26.8085"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 94"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="26.8085"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 100"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="26.8085"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 106"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="32.766"
              cy="22.9788"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 83"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="32.766"
              cy="20"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 112"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="32.766"
              cy="17.0213"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 115"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="32.766"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 95"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="32.766"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 101"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="32.766"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 107"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="14.8936"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 73"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="8.9362"
              cy="25.9575"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 85"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="8.9362"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 87"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="14.8936"
              cy="28.9362"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 75"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
            <ellipse
              cx="14.8936"
              cy="31.9149"
              fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
              id="Ellipse 77"
              rx="1.2766"
              ry="1.2766"
              style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
            />
          </g>
          <ellipse
            cx="13.617"
            cy="1.2766"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 33"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="22.5532"
            cy="4.68085"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 34"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="1.2766"
            cy="13.617"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 39"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="4.25532"
            cy="4.68085"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 40"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="10.6383"
            cy="7.65957"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 41"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="10.6383"
            cy="10.6383"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 44"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="7.65957"
            cy="10.6383"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 44"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="19.5745"
            cy="10.6383"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 59"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="7.65957"
            cy="13.617"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 57"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="19.5745"
            cy="13.617"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 60"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="10.6383"
            cy="13.617"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 47"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="13.617"
            cy="7.65957"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 42"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="13.617"
            cy="10.6383"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 45"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="13.617"
            cy="13.617"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 48"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="16.5957"
            cy="7.65957"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 43"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="16.5957"
            cy="10.6383"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 46"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
          <ellipse
            cx="16.5957"
            cy="13.617"
            fill="var(--fill-0, var(--widget-dot-active, #E7EAE9))"
            id="Ellipse 49"
            rx="1.2766"
            ry="1.2766"
            style={{ fill: 'color(display-p3 0.9059 0.9176 0.9137)', fillOpacity: '1' }}
          />
        </g>
      </svg>
    </div>
  )
}

function ForecastFrame36() {
  return (
    <div className="widget-relative widget-shrink-0 size-[40px]" aria-hidden="true">
      <ForecastGroup31 />
    </div>
  )
}

function ForecastInfo5() {
  return (
    <div
      className=" content-stretch flex flex-col gap-[4px] items-start widget-relative widget-shrink-0 widget-text widget-text--10 widget-text--center widget-text--uppercase widget-text--nowrap"
      data-name="Info"
      aria-hidden="true"
    >
      <p
        className="widget-relative widget-shrink-0 widget-text widget-text--grey"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        H 35°
      </p>
      <p
        className="widget-relative widget-shrink-0 widget-text widget-text--grey2"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        L 16°
      </p>
    </div>
  )
}

function ForecastFrame40() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <ForecastFrame36 />
      <p
        className=" widget-text widget-text--light widget-text--32 widget-text--grey widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        30°
      </p>
      <ForecastInfo5 />
    </div>
  )
}

function ForecastFrame37() {
  return (
    <div
      className=" capitalize content-stretch flex flex-col gap-[4px] items-end widget-relative widget-shrink-0 widget-text widget-text--10 widget-text--grey widget-text--right widget-text--nowrap"
      aria-hidden="true"
    >
      <p
        className="widget-relative widget-shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Toronto
      </p>
      <p
        className="widget-relative widget-shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Party cloudy
      </p>
    </div>
  )
}

function ForecastFrame39() {
  return (
    <div
      className="content-stretch flex items-center justify-between widget-relative widget-shrink-0 w-full"
      aria-hidden="true"
    >
      <ForecastFrame40 />
      <ForecastFrame37 />
    </div>
  )
}

function ForecastFrame32() {
  return (
    <div className="widget-relative widget-shrink-0 size-[20px]" aria-hidden="true">
      <ForecastGroup31 />
    </div>
  )
}

function ForecastFrame29() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        WED
      </p>
      <ForecastFrame32 />
      <p
        className=" widget-text widget-text--10 widget-text--grey widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-3</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-6</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
    </div>
  )
}

function ForecastFrame30() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        THU
      </p>
      <ForecastFrame32 />
      <p
        className=" widget-text widget-text--10 widget-text--grey widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-</span>
        <span className="widget-leading-normal">1</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-9</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
    </div>
  )
}

function ForecastFrame31() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        FRI
      </p>
      <ForecastFrame32 />
      <p
        className=" widget-text widget-text--10 widget-text--grey widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-</span>
        <span className="widget-leading-normal">9</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-10</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
    </div>
  )
}

function ForecastFrame34() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        SAT
      </p>
      <ForecastFrame32 />
      <p
        className=" widget-text widget-text--10 widget-text--grey widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-</span>
        <span className="widget-leading-normal">4</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-6</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
    </div>
  )
}

function ForecastFrame38() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        SUM
      </p>
      <ForecastFrame32 />
      <p
        className=" widget-text widget-text--10 widget-text--grey widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-</span>
        <span className="widget-leading-normal">4</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-6</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
    </div>
  )
}

function ForecastFrame41() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-center widget-relative widget-shrink-0"
      aria-hidden="true"
    >
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Mon
      </p>
      <ForecastFrame32 />
      <p
        className=" widget-text widget-text--10 widget-text--grey widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-</span>
        <span className="widget-leading-normal">4</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
      <p
        className=" widget-text widget-text--10 widget-text--grey2 widget-text--center widget-text--nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="widget-leading-normal">-6</span>
        <span className="widget-leading-normal" style={{ fontVariationSettings: "'wdth' 100" }}>
          °
        </span>
      </p>
    </div>
  )
}

function ForecastFrame35() {
  return (
    <div
      className="content-stretch flex items-start justify-between widget-relative widget-shrink-0 w-full"
      aria-hidden="true"
    >
      <ForecastFrame29 />
      <ForecastFrame30 />
      <ForecastFrame31 />
      <ForecastFrame34 />
      <ForecastFrame38 />
      <ForecastFrame41 />
    </div>
  )
}

export const Weather = React.forwardRef<HTMLDivElement, WeatherProps>(
  ({ theme, size, className, 'aria-label': ariaLabel, style, variant = 'icon', ...props }, ref) => {
    const widgetSize = (size === 320 ? 'large' : 'medium') as 'small' | 'medium' | 'large'
    if (variant === 'forecast') {
      return (
        <div
          ref={ref}
          style={style}
          className={cn(
            widgetSubVariants({ theme, size: widgetSize }),
            `widget-bg-dark content-stretch flex flex-col gap-[19px] h-[152px] items-end p-[16px] widget-relative widget-card--rounded widget-shrink-0 w-[226px] ${className || ''}`.trim(),
          )}
          data-theme={dataAttr(theme)}
          data-size={dataAttr(size)}
          data-variant={dataAttr(variant)}
          {...props}
          data-name="Weather"
          aria-label={ariaLabel || 'Weather'}
        >
          <ForecastFrame39 />
          <ForecastFrame35 />
        </div>
      )
    }
    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          widgetSubVariants({ theme, size: widgetSize }),
          `widget-relative widget-shrink-0 size-[152px] ${className || ''}`.trim(),
        )}
        data-theme={dataAttr(theme)}
        data-size={dataAttr(size)}
        data-variant={dataAttr(variant)}
        {...props}
        data-name="Weather"
        aria-label={ariaLabel || 'Weather'}
      >
        <WeatherIconSvg />
      </div>
    )
  },
)
Weather.displayName = 'Weather'
