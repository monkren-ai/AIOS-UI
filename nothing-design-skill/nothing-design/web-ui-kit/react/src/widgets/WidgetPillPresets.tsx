import * as React from 'react'
import svgPaths from './widget-svg-paths'

/**
 * WidgetPill preset registry.
 *
 * 每条记录对应一个 quick-toggle pill (移动数据、电池共享、计算器、NFC 等),
 * 由 `WidgetPill preset="..."` 直接消费, 替代了原来 WidgetPills.tsx 中
 * 17 个 thin wrapper 函数。
 *
 * 字段:
 * - iconPath: widget-svg-paths.ts 中导出的路径 key
 * - label: 显示文本
 * - theme: light | dark (Pill 主题)
 * - dots: 是否使用 DotsIcon (Weather pill) 而非单个 svg path
 */

export interface WidgetPillPreset {
  iconPath?: keyof typeof svgPaths
  label: string
  theme: 'light' | 'dark'
  dots?: boolean
}

export const WIDGET_PILL_PRESETS = {
  mobileData:    { iconPath: 'p2bea2300',  label: 'Mobile Data',     theme: 'dark'  },
  batteryShare:  { iconPath: 'p105235f0',  label: 'Battery Share',   theme: 'dark'  },
  calculator:    { iconPath: 'p13cd59f0',  label: 'Calculator',      theme: 'dark'  },
  batterySaver:  { iconPath: 'p19d8a940',  label: 'Battery Saver',   theme: 'dark'  },
  homeControls:  { iconPath: 'p17852172',  label: 'Home Controls',   theme: 'dark'  },
  nfc:           { iconPath: 'p1183f380',  label: 'NFC',             theme: 'dark'  },
  bedtime:       { iconPath: 'p289138c0',  label: 'Bedtime Mode',    theme: 'dark'  },
  darkMode:      { iconPath: 'p6adc900',   label: 'Dark Mode',       theme: 'dark'  },
  weather:       {                              label: 'Sunny',          theme: 'dark',  dots: true  },
  tvRemote:      { iconPath: 'p143d3df0',  label: 'TV Remote',       theme: 'dark'  },
  storage:       { iconPath: 'p394c4300',  label: 'Storage',         theme: 'dark'  },
  hotspot:       { iconPath: 'p2cbe2200',  label: 'Hotspot',         theme: 'dark'  },
  nearbyShare:   { iconPath: 'p30a92a00',  label: 'Nearby Share',    theme: 'dark'  },
  extraDim:      { iconPath: 'p2174f00',   label: 'Extra Dim',       theme: 'dark'  },
  dataSaver:     { iconPath: 'p216ccf00',  label: 'Data Saver',      theme: 'dark'  },
  torch:         { iconPath: 'p28fe7100',  label: 'Torch',           theme: 'dark'  },
  bluetooth:     { iconPath: 'p192dc300',  label: 'Bluetooth',       theme: 'dark'  },
} as const satisfies Record<string, WidgetPillPreset>

export type WidgetPillPresetName = keyof typeof WIDGET_PILL_PRESETS

export function renderPillPresetIcon(preset: WidgetPillPreset): React.ReactNode {
  if (preset.dots) {
    return (
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6.58064" cy="9.67743" r="1.16129" />
        <circle cx="6.58064" cy="12" r="1.16129" />
        <circle cx="6.58064" cy="14.3225" r="1.16129" />
        <circle cx="9.29033" cy="7.35483" r="1.16129" />
        <circle cx="9.29033" cy="9.67743" r="1.16129" />
        <circle cx="9.29033" cy="12" r="1.16129" />
        <circle cx="9.29033" cy="14.3225" r="1.16129" />
        <circle cx="9.29033" cy="16.6451" r="1.16129" />
        <circle cx="12" cy="7.35483" r="1.16129" />
        <circle cx="12" cy="9.67743" r="1.16129" />
        <circle cx="12" cy="12" r="1.16129" />
        <circle cx="12" cy="14.3225" r="1.16129" />
        <circle cx="12" cy="16.6451" r="1.16129" />
        <circle cx="14.7097" cy="7.35483" r="1.16129" />
        <circle cx="14.7097" cy="9.67743" r="1.16129" />
        <circle cx="14.7097" cy="12" r="1.16129" />
        <circle cx="14.7097" cy="14.3225" r="1.16129" />
        <circle cx="14.7097" cy="16.6451" r="1.16129" />
        <circle cx="17.4194" cy="9.67743" r="1.16129" />
        <circle cx="17.4194" cy="12" r="1.16129" />
        <circle cx="17.4194" cy="14.3225" r="1.16129" />
        <circle cx="12" cy="1.16129" r="1.16129" />
        <circle cx="12" cy="22.8387" r="1.16129" />
        <circle cx="4.33588" cy="4.33589" r="1.16129" transform="rotate(-45 4.33588 4.33589)" />
        <circle cx="19.6641" cy="19.6642" r="1.16129" transform="rotate(-45 19.6641 19.6642)" />
        <circle cx="22.8387" cy="12" r="1.16129" transform="rotate(90 22.8387 12)" />
        <circle cx="1.16129" cy="12" r="1.16129" transform="rotate(90 1.16129 12)" />
        <circle cx="19.6641" cy="4.33589" r="1.16129" transform="rotate(45 19.6641 4.33589)" />
        <circle cx="4.33589" cy="19.6641" r="1.16129" transform="rotate(45 4.33589 19.6641)" />
      </svg>
    )
  }
  if (!preset.iconPath) return null
  const pathData = svgPaths[preset.iconPath] as string
  return (
    <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" aria-hidden="true">
      <path d={pathData} />
    </svg>
  )
}
