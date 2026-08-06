import { Direction } from "../DirectionProvider/DirectionProvider.mjs";
import { Theme } from "../ThemeProvider/ThemeProvider.mjs";
import { MotionComponentType } from "../MotionProvider/index.mjs";
import { ReactNode } from "react";

//#region src/ConfigProvider/index.d.ts
/**
 * CDN 代理类型
 */
type CDNProxy = 'aliyun' | 'unpkg' | 'jsdelivr' | 'custom';
/**
 * CDN URL 生成参数
 */
interface CdnApi {
  pkg: string;
  version: string;
  path: string;
}
/**
 * CDN URL 生成函数
 */
type CdnFn = ({
  pkg,
  version,
  path
}: CdnApi) => string;
/**
 * 默认 CDN（aliyun）
 */
declare const defaultCdnFn: CdnFn;
/**
 * 配置项
 */
interface Config {
  /**
   * 自定义 <a> 元素（用于 Next.js Link 等）
   */
  aAs?: React.ElementType;
  /**
   * 自定义 CDN 函数
   */
  customCdnFn?: CdnFn;
  /**
   * 自定义 <img> 元素（用于 Next.js Image 等）
   */
  imgAs?: React.ElementType;
  /**
   * 图片是否不优化（用于 Next.js Image）
   */
  imgUnoptimized?: boolean;
  /**
   * CDN 代理
   */
  proxy?: CDNProxy;
}
/**
 * 配置上下文
 */
declare const ConfigContext: import("react").Context<Config | null>;
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
declare function useConfig(): Config | null;
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
declare function useCdnFn(): CdnFn;
interface ConfigProviderProps {
  children: ReactNode;
  /**
   * 全局配置
   */
  config?: Config;
  /**
   * 默认主题，默认为 'dark'
   */
  defaultTheme?: Theme;
  /**
   * 是否启用系统主题，默认 true
   */
  enableSystem?: boolean;
  /**
   * 主题变化回调
   */
  onThemeChange?: (theme: Theme) => void;
  /**
   * 布局方向，默认 'ltr'。会同步写到 `<html dir>` 上，让 CSS 逻辑属性正确镜像。
   */
  dir?: Direction;
  /**
   * 覆盖 `prefers-reduced-motion`。不传则跟随系统。
   */
  reducedMotion?: boolean;
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
  motion: MotionComponentType;
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
declare const ConfigProvider: import("react").NamedExoticComponent<ConfigProviderProps>;
//#endregion
export { CDNProxy, CdnApi, CdnFn, Config, ConfigContext, ConfigProvider, ConfigProviderProps, defaultCdnFn, useCdnFn, useConfig };
//# sourceMappingURL=index.d.mts.map