import { ThemeDefinition } from "./themes.mjs";
import { ReactNode } from "react";

//#region src/ThemeProvider/ThemeProvider.d.ts
type Theme = 'light' | 'dark' | 'system';
type ThemeAppearance = 'light' | 'dark';
interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ThemeAppearance;
  systemTheme: ThemeAppearance | undefined;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  themeId: string;
  activeTheme: ThemeDefinition;
  themes: readonly ThemeDefinition[];
  setThemeId: (themeId: string) => void;
}
declare const DEFAULT_STORAGE_KEY = "aios-theme";
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  forcedTheme?: ThemeAppearance;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  onThemeChange?: (theme: Theme) => void;
  storageKey?: string;
  themes?: readonly ThemeDefinition[];
  defaultThemeId?: string;
  themeIdStorageKey?: string;
  themeSnapshotStorageKey?: string;
  onThemeIdChange?: (themeId: string) => void;
}
declare function ThemeProvider({
  children,
  defaultTheme,
  forcedTheme,
  enableSystem,
  disableTransitionOnChange,
  onThemeChange,
  storageKey,
  themes: suppliedThemes,
  defaultThemeId,
  themeIdStorageKey,
  themeSnapshotStorageKey,
  onThemeIdChange
}: ThemeProviderProps): import("react").JSX.Element;
declare namespace ThemeProvider {
  var displayName: string;
}
declare function useTheme(): ThemeContextValue;
//#endregion
export { DEFAULT_STORAGE_KEY, Theme, ThemeAppearance, ThemeContextValue, ThemeProvider, ThemeProviderProps, useTheme };
//# sourceMappingURL=ThemeProvider.d.mts.map