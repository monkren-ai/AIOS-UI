import type * as React from 'react'
import type { Bilingual } from '../../registry/types'

/** 图标来源：本地 AIOS 图标 / 动态加载的 Tabler 图标。 */
export type IconSource = 'aios' | 'tabler'

/** Tabler 图标组件的最小签名，避免为了类型把整包静态引进来。 */
export type TablerIconComponent = React.ComponentType<{
  size?: number | string
  stroke?: number | string
  color?: string
  className?: string
  'aria-hidden'?: boolean
  ref?: React.Ref<SVGSVGElement>
}>

export interface IconEntry {
  /** 全局唯一，用作 React key 与选中态标识。 */
  id: string
  source: IconSource
  /** 分组 id，对应 ICON_GROUPS 里的条目。 */
  groupId: string
  /** 展示用名称（Tabler 用 kebab-case，AIOS 用注册表 key）。 */
  name: string
  /** 对应的 React 组件名，没有组件时为 undefined。 */
  componentName?: string
  /** 已经小写化的搜索串。 */
  searchText: string
  /** 原始 `<svg>…</svg>` 字符串，只有 AIOS 图标有。 */
  svg?: string
  /** Tabler 图标组件。 */
  Component?: TablerIconComponent
}

export interface IconGroup {
  id: string
  label: Bilingual
}
