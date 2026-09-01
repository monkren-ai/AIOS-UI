//#region src/ThemeProvider/themes.d.ts
type ThemeMode = 'light' | 'dark';
declare const THEME_TOKEN_CSS_VARIABLES: {
  readonly 'color.background.default': "--black";
  readonly 'color.surface.default': "--surface";
  readonly 'color.surface.raised': "--surface-raised";
  readonly 'color.border.default': "--border";
  readonly 'color.border.strong': "--border-visible";
  readonly 'color.text.default': "--text-primary";
  readonly 'color.text.strong': "--text-display";
  readonly 'color.text.muted': "--text-secondary";
  readonly 'color.text.subtle': "--text-tertiary";
  readonly 'color.text.disabled': "--text-disabled";
  readonly 'color.accent.default': "--accent";
  readonly 'color.accent.subtle': "--accent-subtle";
  readonly 'color.interactive.default': "--interactive";
  readonly 'color.status.success': "--success";
  readonly 'color.status.warning': "--warning";
  readonly 'color.status.error': "--error";
  readonly 'color.status.info': "--info";
  readonly 'font.family.display': "--font-display";
  readonly 'font.family.body': "--font-body";
  readonly 'font.family.mono': "--font-mono";
  readonly 'font.weight.light': "--weight-light";
  readonly 'font.weight.regular': "--weight-regular";
  readonly 'font.weight.medium': "--weight-medium";
  readonly 'font.weight.bold': "--weight-bold";
  readonly 'radius.small': "--radius-sm";
  readonly 'radius.medium': "--radius-md";
  readonly 'radius.large': "--radius-lg";
  readonly 'radius.card': "--radius-card";
  readonly 'radius.button': "--radius-button";
  readonly 'radius.pill': "--radius-pill";
  readonly 'border.width.default': "--border-width-sm";
  readonly 'border.width.strong': "--border-width-md";
  readonly 'border.width.accent': "--border-width-accent";
};
type ThemeTokenName = keyof typeof THEME_TOKEN_CSS_VARIABLES;
type ThemeTokenValues = Partial<Record<ThemeTokenName, string>>;
interface ThemeDefinition {
  id: string;
  name: string;
  version: string;
  description?: string;
  source: 'builtin' | 'custom';
  modes: Partial<Record<ThemeMode, ThemeTokenValues>>;
}
interface ThemeImportResult {
  theme: ThemeDefinition | null;
  coverage: number;
  errors: string[];
  missing: string[];
  unknown: string[];
  contrastWarnings: string[];
}
declare const REQUIRED_THEME_TOKENS: readonly ThemeTokenName[];
declare const AIOS_DEFAULT_THEME_ID = "aios-default";
declare const DEFAULT_THEME_ID_STORAGE_KEY = "aios-theme-id";
declare const DEFAULT_THEME_SNAPSHOT_STORAGE_KEY = "aios-theme-snapshot";
declare const AIOS_BUILTIN_THEMES: readonly ThemeDefinition[];
declare function resolveThemeTokens(theme: ThemeDefinition, mode: ThemeMode): ThemeTokenValues;
declare function applyThemeTokens(root: HTMLElement, values: ThemeTokenValues): void;
//#endregion
export { AIOS_BUILTIN_THEMES, AIOS_DEFAULT_THEME_ID, DEFAULT_THEME_ID_STORAGE_KEY, DEFAULT_THEME_SNAPSHOT_STORAGE_KEY, REQUIRED_THEME_TOKENS, THEME_TOKEN_CSS_VARIABLES, ThemeDefinition, ThemeImportResult, ThemeMode, ThemeTokenName, ThemeTokenValues, applyThemeTokens, resolveThemeTokens };
//# sourceMappingURL=themes.d.mts.map