import { ReactNode } from "react";

//#region src/ThemeProvider/ThemeProvider.d.ts
/**
 * 用户可选择的主题模式
 */
type Theme = 'light' | 'dark' | 'system';
/**
 * 实际应用的外观（system 解析后的结果）
 */
type ThemeAppearance = 'light' | 'dark';
interface ThemeContextValue {
  /**
   * 当前选中的主题，可能是 'system'
   */
  theme: Theme;
  /**
   * 实际生效的主题（system 会被解析为 light/dark）
   */
  resolvedTheme: ThemeAppearance;
  /**
   * 系统主题
   */
  systemTheme: ThemeAppearance | undefined;
  /**
   * 是否已完成挂载（用于避免 SSR/首屏闪烁）
   */
  mounted: boolean;
  /**
   * 设置主题
   */
  setTheme: (theme: Theme) => void;
  /**
   * 切换主题（dark → light → system → dark，或仅 dark/light 之间切换）
   */
  toggleTheme: () => void;
}
declare const DEFAULT_STORAGE_KEY = "nothing-theme";
interface ThemeProviderProps {
  children: ReactNode;
  /**
   * 默认主题，默认为 'dark'
   */
  defaultTheme?: Theme;
  /**
   * 强制主题，优先级最高
   */
  forcedTheme?: ThemeAppearance;
  /**
   * 是否启用系统主题，默认 true
   */
  enableSystem?: boolean;
  /**
   * 切换主题时是否禁用过渡动画，默认 true
   */
  disableTransitionOnChange?: boolean;
  /**
   * 主题变化回调
   */
  onThemeChange?: (theme: Theme) => void;
  /**
   * localStorage 的 key，默认 `'nothing-theme'`。
   *
   * 改了这里，`<ThemeScript>` 的同名属性必须一起改成同一个值，否则首屏内联脚本
   * 读的是另一个 key，会闪一下错误主题再被 provider 纠正。
   */
  storageKey?: string;
}
/**
 * ThemeProvider
 *
 * 管理 AIOS UI 的明暗主题。
 *
 * - 通过 `data-theme` 属性切换主题（与 `tokens.css` 的 `[data-theme="dark"]` 选择器协同）
 * - 持久化到 `localStorage`（key: `nothing-theme`）
 * - 支持系统主题跟随（prefers-color-scheme）
 * - 支持 forcedTheme 强制主题
 * - 切换时临时禁用 CSS 过渡，避免颜色渐变闪烁
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="dark" enableSystem>
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare function ThemeProvider({
  children,
  defaultTheme,
  forcedTheme,
  enableSystem,
  disableTransitionOnChange,
  onThemeChange,
  storageKey
}: ThemeProviderProps): import("react").JSX.Element;
declare namespace ThemeProvider {
  var displayName: string;
}
declare function useTheme(): ThemeContextValue;
//#endregion
export { DEFAULT_STORAGE_KEY, Theme, ThemeAppearance, ThemeContextValue, ThemeProvider, ThemeProviderProps, useTheme };
//# sourceMappingURL=ThemeProvider.d.mts.map