'use client'

import { createContext, memo, type ReactNode, useContext, useMemo } from 'react'
import { MotionProvider, type MotionComponentType } from '@/MotionProvider'
import { ThemeProvider, type Theme, type ThemeDefinition } from '@/ThemeProvider'
import { DirectionProvider, type Direction } from '@/DirectionProvider'
import { ReducedMotionProvider } from '@/ReducedMotionProvider'

/**
 * CDN 代理类型
 */
export type CDNProxy = 'aliyun' | 'unpkg' | 'jsdelivr' | 'custom'

/**
 * CDN URL 生成参数
 */
export interface CdnApi {
  pkg: string
  version: string
  path: string
}

/**
 * CDN URL 生成函数
 */
export type CdnFn = ({ pkg, version, path }: CdnApi) => string

/**
 * 默认 CDN（aliyun）
 */
export const defaultCdnFn: CdnFn = ({ pkg, version, path }) =>
  `https://registry.npmmirror.com/${pkg}/${version}/files/${path}`

/**
 * 配置项
 */
export interface Config {
  /**
   * 自定义 <a> 元素（用于 Next.js Link 等）
   */
  aAs?: React.ElementType
  /**
   * 自定义 CDN 函数
   */
  customCdnFn?: CdnFn
  /**
   * 自定义 <img> 元素（用于 Next.js Image 等）
   */
  imgAs?: React.ElementType
  /**
   * 图片是否不优化（用于 Next.js Image）
   */
  imgUnoptimized?: boolean
  /**
   * CDN 代理
   */
  proxy?: CDNProxy
}

/**
 * 配置上下文
 */
export const ConfigContext = createContext<Config | null>(null)

/**
 * useConfig hook
 *
 * 获取全局配置。
 *
 * @example
 * ```tsx
 * const config = useConfig()
 * const aAs = config?.aAs ?? 'a'
 * ```
 */
export function useConfig(): Config | null {
  return useContext(ConfigContext)
}

/**
 * useCdnFn hook
 *
 * 获取 CDN URL 生成函数。
 *
 * @example
 * ```tsx
 * const cdnUrl = useCdnFn()
 * const url = cdnUrl({ pkg: '@aios-ui-kit/icons', version: '1.0.0', path: '/svg/logo.svg' })
 * ```
 */
export function useCdnFn(): CdnFn {
  const config = useContext(ConfigContext)
  if (!config) return defaultCdnFn
  if (config.proxy === 'custom') {
    return config.customCdnFn ?? defaultCdnFn
  }
  const proxy = config.proxy ?? 'aliyun'
  return ({ pkg, version, path }) => {
    const proxyHost: Record<CDNProxy, string> = {
      aliyun: 'https://registry.npmmirror.com',
      unpkg: 'https://unpkg.com',
      jsdelivr: 'https://cdn.jsdelivr.net/npm',
      custom: '',
    }
    const host = proxyHost[proxy]
    if (proxy === 'jsdelivr') {
      return `${host}/${pkg}@${version}${path}`
    }
    return `${host}/${pkg}/${version}/files${path}`
  }
}

export interface ConfigProviderProps {
  children: ReactNode
  /**
   * 全局配置
   */
  config?: Config
  /**
   * 默认主题，默认为 'dark'
   */
  defaultTheme?: Theme
  /**
   * 是否启用系统主题，默认 true
   */
  enableSystem?: boolean
  /**
   * 主题变化回调
   */
  onThemeChange?: (theme: Theme) => void
  /** 可用的自定义主题家族；内置主题始终保留。 */
  themes?: readonly ThemeDefinition[]
  /** 默认主题家族 ID。 */
  defaultThemeId?: string
  /** 主题家族 ID 的 localStorage key。 */
  themeIdStorageKey?: string
  /** 主题家族变化回调。 */
  onThemeIdChange?: (themeId: string) => void
  /**
   * 布局方向，默认 'ltr'。会同步写到 `<html dir>` 上，让 CSS 逻辑属性正确镜像。
   */
  dir?: Direction
  /**
   * 覆盖 `prefers-reduced-motion`。不传则跟随系统。
   */
  reducedMotion?: boolean
  /**
   * Motion 组件集合，必传。
   * 从 `motion/react` 或 `motion/react-m` 导入后传入。
   *
   * @example
   * ```tsx
   * import * as motion from 'motion/react'
   * <ConfigProvider motion={motion}><App /></ConfigProvider>
   * ```
   */
  motion: MotionComponentType
}

/**
 * ConfigProvider
 *
 * AIOS UI 的全局配置 Provider，集成了：
 * - `ThemeProvider`：明暗主题管理
 * - `MotionProvider`：动画组件注入
 * - `ConfigContext`：CDN、自定义元素等配置
 *
 * motion 为必传 prop，由用户自行选择 `motion/react`（完整版）或 `motion/react-m`（精简版）。
 *
 * @example
 * ```tsx
 * import * as motion from 'motion/react'
 * import { ConfigProvider } from 'aios-ui-kit'
 *
 * <ConfigProvider
 *   motion={motion}
 *   defaultTheme="dark"
 *   config={{ proxy: 'aliyun' }}
 * >
 *   <App />
 * </ConfigProvider>
 * ```
 */
export const ConfigProvider = memo<ConfigProviderProps>(
  ({
    children,
    config,
    defaultTheme,
    enableSystem = true,
    onThemeChange,
    themes,
    defaultThemeId,
    themeIdStorageKey,
    onThemeIdChange,
    dir = 'ltr',
    reducedMotion,
    motion,
  }) => {
    const configValue = useMemo(() => config ?? null, [config])

    return (
      <ConfigContext value={configValue}>
        <ThemeProvider
          defaultTheme={defaultTheme}
          enableSystem={enableSystem}
          onThemeChange={onThemeChange}
          themes={themes}
          defaultThemeId={defaultThemeId}
          themeIdStorageKey={themeIdStorageKey}
          onThemeIdChange={onThemeIdChange}
        >
          <DirectionProvider dir={dir}>
            <ReducedMotionProvider force={reducedMotion}>
              <MotionProvider motion={motion}>{children}</MotionProvider>
            </ReducedMotionProvider>
          </DirectionProvider>
        </ThemeProvider>
      </ConfigContext>
    )
  },
)

ConfigProvider.displayName = 'ConfigProvider'

export default ConfigProvider
