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
 * Watch 组件 (合并自原 Watch1 + WatchAnalog)
 *
 * - variant: 'analog' (默认, 原 Watch1, 152 圆 + 矩形 hands)
 *           'analog-large' (原 WatchAnalog, 大表盘 + 时针分针秒针)
 */
export type WatchVariant = 'analog' | 'analog-large'

export interface WatchProps extends WidgetSubProps {
  variant?: WatchVariant
}

/* ----- variant: 'analog' (原 Watch1) ----- */

function Watch1Content() {
  return (
    <svg
      className="nothing-widget-icon-svg"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 152 152"
    >
      <g id="Watch">
        <circle
          cx="76"
          cy="76"
          fill="var(--fill-0, var(--widget-dark-bg))"
          id="BG"
          r="76"
          style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
        />
        <g id="Watch Hands">
          <rect
            fill="var(--fill-0, var(--widget-white))"
            height="52"
            id="Watch "
            rx="8"
            style={{ fill: 'var(--widget-white)', fillOpacity: '1' }}
            transform="rotate(-60 34 60.8564)"
            width="16"
            x="34"
            y="60.8564"
          />
          <rect
            fill="var(--fill-0, var(--widget-dark-3))"
            height="63.95"
            id="Watch _2"
            rx="3"
            style={{ fill: 'color(display-p3 0.4235 0.4118 0.4314)', fillOpacity: '1' }}
            transform="rotate(60 126.382 42.025)"
            width="6"
            x="126.382"
            y="42.025"
          />
          <circle
            cx="42"
            cy="133"
            fill="var(--fill-0, var(--widget-primary))"
            id="Watch _3"
            r="4"
            style={{ fill: 'color(display-p3 0.8431 0.0980 0.1294)', fillOpacity: '1' }}
          />
        </g>
      </g>
    </svg>
  )
}

/* ----- variant: 'analog-large' (原 WatchAnalog) ----- */

function Group2() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 9">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group4() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 11">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group3() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 10">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group5() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 12">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group6() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 9">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group7() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 11">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group8() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 10">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group9() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 12">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group10() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 9">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group11() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 11">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group12() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 10">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group13() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 12">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group14() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 9">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group15() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 11">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group16() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 10">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group19() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 12">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group20() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 9">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group21() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 11">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group22() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 10">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group23() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 12">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group24() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 9">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group25() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 11">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group26() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 10">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Group27() {
  return (
    <div className="h-[147px] widget-relative w-0" aria-hidden="true">
      <div className="absolute inset-[0_-0.5px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1 147"
        >
          <g id="Group 12">
            <path
              d="M0.5 0V5"
              id="Vector 5"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
            <path
              d="M0.5 142V147"
              id="Vector 6"
              stroke="var(--fill-0, var(--widget-dark-2))"
              style={{ stroke: 'color(display-p3 0.2314 0.2235 0.2431)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Marks() {
  return (
    <div
      className="widget-col-1 widget-grid-auto ml-0 mt-0 widget-relative widget-row-1"
      data-name="Marks"
      aria-hidden="true"
    >
      <div className="widget-bg-dark widget-col-1 h-[10px] ml-[71.5px] mt-0 widget-relative widget-row-1 w-[4px]" />
      <div className="widget-bg-dark widget-col-1 h-[10px] ml-[71.5px] mt-[137px] widget-relative widget-row-1 w-[4px]" />
      <div
        className="widget-col-1 flex h-[10.66px] items-center justify-center ml-[35.02px] mt-[8.85px] widget-relative widget-row-1 w-[8.464px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--30 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[10.66px] items-center justify-center ml-[103.52px] mt-[127.49px] widget-relative widget-row-1 w-[8.464px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--30 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[8.464px] items-center justify-center ml-[8.85px] mt-[35.02px] widget-relative widget-row-1 w-[10.66px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--60 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[8.464px] items-center justify-center ml-[127.49px] mt-[103.52px] widget-relative widget-row-1 w-[10.66px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--60 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[4px] items-center justify-center ml-[137px] mt-[71.5px] widget-relative widget-row-1 w-[10px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-90 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[4px] items-center justify-center ml-0 mt-[71.5px] widget-relative widget-row-1 w-[10px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-90 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[8.464px] items-center justify-center ml-[127.49px] mt-[35.02px] widget-relative widget-row-1 w-[10.66px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-60 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[8.464px] items-center justify-center ml-[8.85px] mt-[103.52px] widget-relative widget-row-1 w-[10.66px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-60 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[10.66px] items-center justify-center ml-[103.52px] mt-[8.85px] widget-relative widget-row-1 w-[8.464px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--30 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[10.66px] items-center justify-center ml-[35.02px] mt-[127.49px] widget-relative widget-row-1 w-[8.464px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '0',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--30 widget-flex-none">
          <div className="widget-bg-dark h-[10px] widget-relative w-[4px]" />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[134.291px] items-center justify-center ml-[43.6px] mt-[6.35px] widget-relative widget-row-1 w-[59.79px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-24 widget-flex-none">
          <Group2 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[139.805px] items-center justify-center ml-[50.79px] mt-[3.6px] widget-relative widget-row-1 w-[45.425px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-18 widget-flex-none">
          <Group4 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[143.788px] items-center justify-center ml-[58.22px] mt-[1.61px] widget-relative widget-row-1 w-[30.563px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-12 widget-flex-none">
          <Group3 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[146.195px] items-center justify-center ml-[65.82px] mt-[0.4px] widget-relative widget-row-1 w-[15.366px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-6 widget-flex-none">
          <Group5 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[146.195px] items-center justify-center ml-[65.82px] mt-[0.4px] widget-relative widget-row-1 w-[15.366px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--6 widget-flex-none">
          <Group6 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[143.788px] items-center justify-center ml-[58.22px] mt-[1.61px] widget-relative widget-row-1 w-[30.563px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--12 widget-flex-none">
          <Group7 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[139.805px] items-center justify-center ml-[50.79px] mt-[3.6px] widget-relative widget-row-1 w-[45.425px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--18 widget-flex-none">
          <Group8 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[134.291px] items-center justify-center ml-[43.6px] mt-[6.35px] widget-relative widget-row-1 w-[59.79px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--24 widget-flex-none">
          <Group9 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[118.925px] items-center justify-center ml-[30.3px] mt-[14.04px] widget-relative widget-row-1 w-[86.404px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--36 widget-flex-none">
          <Group10 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[109.242px] items-center justify-center ml-[24.32px] mt-[18.88px] widget-relative widget-row-1 w-[98.362px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--42 widget-flex-none">
          <Group11 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[98.362px] items-center justify-center ml-[18.88px] mt-[24.32px] widget-relative widget-row-1 w-[109.242px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--48 widget-flex-none">
          <Group12 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[86.404px] items-center justify-center ml-[14.04px] mt-[30.3px] widget-relative widget-row-1 w-[118.926px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate--54 widget-flex-none">
          <Group13 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[59.79px] items-center justify-center ml-[6.35px] mt-[43.6px] widget-relative widget-row-1 w-[134.291px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-114 widget-flex-none">
          <Group14 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[45.426px] items-center justify-center ml-[3.6px] mt-[50.79px] widget-relative widget-row-1 w-[139.805px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-108 widget-flex-none">
          <Group15 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[30.563px] items-center justify-center ml-[1.61px] mt-[58.22px] widget-relative widget-row-1 w-[143.788px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-102 widget-flex-none">
          <Group16 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[15.366px] items-center justify-center ml-[0.4px] mt-[65.82px] widget-relative widget-row-1 w-[146.195px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-96 widget-flex-none">
          <Group19 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[15.366px] items-center justify-center ml-[0.4px] mt-[65.82px] widget-relative widget-row-1 w-[146.195px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-84 widget-flex-none">
          <Group20 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[30.563px] items-center justify-center ml-[1.61px] mt-[58.22px] widget-relative widget-row-1 w-[143.788px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-78 widget-flex-none">
          <Group21 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[45.425px] items-center justify-center ml-[3.6px] mt-[50.79px] widget-relative widget-row-1 w-[139.805px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-72 widget-flex-none">
          <Group22 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[59.79px] items-center justify-center ml-[6.35px] mt-[43.6px] widget-relative widget-row-1 w-[134.291px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-66 widget-flex-none">
          <Group23 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[86.404px] items-center justify-center ml-[14.04px] mt-[30.3px] widget-relative widget-row-1 w-[118.925px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-54 widget-flex-none">
          <Group24 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[98.362px] items-center justify-center ml-[18.88px] mt-[24.32px] widget-relative widget-row-1 w-[109.242px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-48 widget-flex-none">
          <Group25 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[109.242px] items-center justify-center ml-[24.32px] mt-[18.88px] widget-relative widget-row-1 w-[98.362px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-42 widget-flex-none">
          <Group26 />
        </div>
      </div>
      <div
        className="widget-col-1 flex h-[118.925px] items-center justify-center ml-[30.3px] mt-[14.04px] widget-relative widget-row-1 w-[86.404px]"
        style={
          {
            '--transform-inner-width': '1185',
            '--transform-inner-height': '21',
          } as React.CSSProperties
        }
      >
        <div className="widget-rotate widget-rotate-36 widget-flex-none">
          <Group27 />
        </div>
      </div>
    </div>
  )
}

function Hands() {
  return (
    <div
      className="widget-col-1 h-[53.867px] ml-[40.5px] mt-[28px] widget-relative widget-row-1 w-[85.66px]"
      data-name="Hands"
      aria-hidden="true"
    >
      <div className="absolute inset-[-1.25%_0_0_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 85.6602 54.5382"
        >
          <g id="Hands">
            <rect
              fill="var(--fill-0, var(--widget-dark-bg))"
              height="70.0257"
              id="Rectangle 4"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
              transform="rotate(60 83.6602 14.6713)"
              width="4"
              x="83.6602"
              y="14.6713"
            />
            <rect
              fill="var(--fill-0, var(--widget-dark-bg))"
              height="48.1215"
              id="Rectangle 5"
              style={{ fill: 'color(display-p3 0.1020 0.1137 0.1098)', fillOpacity: '1' }}
              transform="rotate(-59.5046 0 30.118)"
              width="4"
              y="30.118"
            />
            <circle
              cx="67"
              cy="8.67128"
              fill="var(--fill-0, var(--widget-primary))"
              id="Ellipse 187"
              r="5"
              style={{ fill: 'color(display-p3 0.8431 0.0980 0.1294)', fillOpacity: '1' }}
            />
            <path
              d="M26 53.6713L74 0.671279"
              id="Vector 7"
              stroke="var(--fill-0, var(--widget-primary))"
              strokeWidth="2"
              style={{ stroke: 'color(display-p3 0.8431 0.0980 0.1294)', strokeOpacity: '1' }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

function Watchface() {
  return (
    <div
      className="widget-grid-auto ml-[2.75px] mt-[2.75px] widget-row-1"
      data-name="Watchface"
      aria-hidden="true"
    >
      <Marks />
      <Hands />
    </div>
  )
}

/* ----- main Watch component ----- */

export const Watch = React.forwardRef<HTMLDivElement, WatchProps>(
  (
    { theme, size, className, 'aria-label': ariaLabel, style, variant = 'analog', ...props },
    ref,
  ) => {
    if (variant === 'analog-large') {
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
          data-name="Watch - Analog"
          aria-label={ariaLabel || 'Watch - Analog'}
        >
          <div className="widget-col-1 ml-0 mt-0 widget-relative widget-row-1 size-[152px]">
            <svg
              className="nothing-widget-icon-svg"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 152 152"
            >
              <circle
                cx="76"
                cy="76"
                fill="var(--fill-0, var(--widget-dark-bg))"
                id="Ellipse 188"
                r="76"
                style={{ fill: 'color(display-p3 0.102 0.114 0.110)', fillOpacity: '1' }}
              />
            </svg>
          </div>
          <Watchface />
        </div>
      )
    }
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
        data-variant={dataAttr(variant)}
        {...props}
        data-name="Watch"
        aria-label={ariaLabel || 'Watch'}
      >
        <Watch1Content />
      </div>
    )
  },
)
Watch.displayName = 'Watch'
