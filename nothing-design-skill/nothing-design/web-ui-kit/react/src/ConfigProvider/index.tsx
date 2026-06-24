'use client'

import { createContext, memo, type ReactNode, useContext, useMemo } from 'react'
import { MotionProvider, type MotionComponentType } from '@/MotionProvider'
import { ThemeProvider, type ThemeAppearance } from '@/ThemeProvider'

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
 * const url = cdnUrl({ pkg: '@nothing-ui/icons', version: '1.0.0', path: '/svg/logo.svg' })
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
  defaultTheme?: ThemeAppearance
  /**
   * 主题变化回调
   */
  onThemeChange?: (theme: ThemeAppearance) => void
  /**
   * Motion 组件集合，默认为 motion/react
   */
  motion?: MotionComponentType
}

/**
 * ConfigProvider
 *
 * Nothing UI 的全局配置 Provider，集成了：
 * - `ThemeProvider`：明暗主题管理
 * - `MotionProvider`：动画组件注入
 * - `ConfigContext`：CDN、自定义元素等配置
 *
 * @example
 * ```tsx
 * import { ConfigProvider } from 'nothing-ui'
 * import { motion } from 'motion/react'
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
  ({ children, config, defaultTheme, onThemeChange, motion }) => {
    const configValue = useMemo(() => config ?? null, [config])

    return (
      <ConfigContext value={configValue}>
        <ThemeProvider
          defaultTheme={defaultTheme}
          onThemeChange={onThemeChange}
        >
          <MotionProvider motion={motion}>{children}</MotionProvider>
        </ThemeProvider>
      </ConfigContext>
    )
  },
)

ConfigProvider.displayName = 'ConfigProvider'

export default ConfigProvider
