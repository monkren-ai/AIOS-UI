//#region src/ThemeProvider/themes.ts
const THEME_TOKEN_CSS_VARIABLES = {
	"color.background.default": "--black",
	"color.surface.default": "--surface",
	"color.surface.raised": "--surface-raised",
	"color.border.default": "--border",
	"color.border.strong": "--border-visible",
	"color.text.default": "--text-primary",
	"color.text.strong": "--text-display",
	"color.text.muted": "--text-secondary",
	"color.text.subtle": "--text-tertiary",
	"color.text.disabled": "--text-disabled",
	"color.accent.default": "--accent",
	"color.accent.subtle": "--accent-subtle",
	"color.interactive.default": "--interactive",
	"color.status.success": "--success",
	"color.status.warning": "--warning",
	"color.status.error": "--error",
	"color.status.info": "--info",
	"font.family.display": "--font-display",
	"font.family.body": "--font-body",
	"font.family.mono": "--font-mono",
	"font.weight.light": "--weight-light",
	"font.weight.regular": "--weight-regular",
	"font.weight.medium": "--weight-medium",
	"font.weight.bold": "--weight-bold",
	"radius.small": "--radius-sm",
	"radius.medium": "--radius-md",
	"radius.large": "--radius-lg",
	"radius.card": "--radius-card",
	"radius.button": "--radius-button",
	"radius.pill": "--radius-pill",
	"border.width.default": "--border-width-sm",
	"border.width.strong": "--border-width-md",
	"border.width.accent": "--border-width-accent"
};
const REQUIRED_THEME_TOKENS = [
	"color.background.default",
	"color.surface.default",
	"color.border.default",
	"color.text.default",
	"color.text.strong",
	"color.accent.default",
	"color.interactive.default"
];
const shared = {
	"font.family.display": "'Doto', 'Space Mono', ui-monospace, monospace",
	"font.family.body": "'Space Grotesk', system-ui, sans-serif",
	"font.family.mono": "'Space Mono', ui-monospace, monospace",
	"font.weight.light": "300",
	"font.weight.regular": "400",
	"font.weight.medium": "500",
	"font.weight.bold": "700",
	"radius.small": "4px",
	"radius.medium": "6px",
	"radius.large": "12px",
	"radius.card": "16px",
	"radius.button": "999px",
	"radius.pill": "999px",
	"border.width.default": "1px",
	"border.width.strong": "2px",
	"border.width.accent": "2px"
};
const AIOS_DEFAULT_THEME_ID = "aios-default";
const DEFAULT_THEME_ID_STORAGE_KEY = "aios-theme-id";
const DEFAULT_THEME_SNAPSHOT_STORAGE_KEY = "aios-theme-snapshot";
const AIOS_BUILTIN_THEMES = [
	{
		id: AIOS_DEFAULT_THEME_ID,
		name: "AIOS Default",
		version: "3.0.0",
		description: "AIOS 的单色工业视觉基线。",
		source: "builtin",
		modes: {
			dark: {
				...shared,
				"color.background.default": "#000000",
				"color.surface.default": "#111111",
				"color.surface.raised": "#1a1a1a",
				"color.border.default": "#222222",
				"color.border.strong": "#333333",
				"color.text.default": "#e8e8e8",
				"color.text.strong": "#ffffff",
				"color.text.muted": "#999999",
				"color.text.subtle": "#666666",
				"color.text.disabled": "#7a7a7a",
				"color.accent.default": "#d71921",
				"color.accent.subtle": "rgba(215, 25, 33, 0.15)",
				"color.interactive.default": "#5b9bf6",
				"color.status.success": "#4a9e5c",
				"color.status.warning": "#d4a843",
				"color.status.error": "#d71921",
				"color.status.info": "#999999"
			},
			light: {
				...shared,
				"color.background.default": "#ffffff",
				"color.surface.default": "#ffffff",
				"color.surface.raised": "#f0f0f0",
				"color.border.default": "#e8e8e8",
				"color.border.strong": "#cccccc",
				"color.text.default": "#1a1a1a",
				"color.text.strong": "#000000",
				"color.text.muted": "#666666",
				"color.text.subtle": "#999999",
				"color.text.disabled": "#999999",
				"color.accent.default": "#d71921",
				"color.accent.subtle": "rgba(215, 25, 33, 0.12)",
				"color.interactive.default": "#0067d9",
				"color.status.success": "#307c43",
				"color.status.warning": "#8b6416",
				"color.status.error": "#b3131a",
				"color.status.info": "#666666"
			}
		}
	},
	{
		id: "aios-paper",
		name: "AIOS Paper",
		version: "3.0.0",
		description: "温和纸面中性色与更轻的表面层级。",
		source: "builtin",
		modes: {
			light: {
				...shared,
				"color.background.default": "#f5f1e8",
				"color.surface.default": "#fffdf7",
				"color.surface.raised": "#ebe5d9",
				"color.border.default": "#d7cebf",
				"color.border.strong": "#9e9485",
				"color.text.default": "#302d28",
				"color.text.strong": "#151411",
				"color.text.muted": "#6e675d",
				"color.text.subtle": "#8f877a",
				"color.text.disabled": "#a49c90",
				"color.accent.default": "#b71f28",
				"color.accent.subtle": "rgba(183, 31, 40, 0.12)",
				"color.interactive.default": "#315c83"
			},
			dark: {
				...shared,
				"color.background.default": "#191714",
				"color.surface.default": "#23201c",
				"color.surface.raised": "#2d2924",
				"color.border.default": "#3e3932",
				"color.border.strong": "#685f52",
				"color.text.default": "#e7e0d4",
				"color.text.strong": "#fffaf0",
				"color.text.muted": "#aaa094",
				"color.text.subtle": "#81796f",
				"color.text.disabled": "#756e65",
				"color.accent.default": "#e13a42",
				"color.accent.subtle": "rgba(225, 58, 66, 0.18)",
				"color.interactive.default": "#7ea9d1"
			}
		}
	},
	{
		id: "aios-high-contrast",
		name: "AIOS High Contrast",
		version: "3.0.0",
		description: "纯黑白基底、强化边框与焦点可见性。",
		source: "builtin",
		modes: {
			light: {
				...shared,
				"color.background.default": "#ffffff",
				"color.surface.default": "#ffffff",
				"color.surface.raised": "#f2f2f2",
				"color.border.default": "#000000",
				"color.border.strong": "#000000",
				"color.text.default": "#000000",
				"color.text.strong": "#000000",
				"color.text.muted": "#333333",
				"color.text.subtle": "#444444",
				"color.text.disabled": "#595959",
				"color.accent.default": "#b00008",
				"color.accent.subtle": "rgba(176, 0, 8, 0.16)",
				"color.interactive.default": "#003fb3",
				"border.width.default": "2px",
				"border.width.strong": "3px",
				"border.width.accent": "3px"
			},
			dark: {
				...shared,
				"color.background.default": "#000000",
				"color.surface.default": "#000000",
				"color.surface.raised": "#111111",
				"color.border.default": "#ffffff",
				"color.border.strong": "#ffffff",
				"color.text.default": "#ffffff",
				"color.text.strong": "#ffffff",
				"color.text.muted": "#dddddd",
				"color.text.subtle": "#bbbbbb",
				"color.text.disabled": "#a6a6a6",
				"color.accent.default": "#ff4b52",
				"color.accent.subtle": "rgba(255, 75, 82, 0.22)",
				"color.interactive.default": "#73b7ff",
				"border.width.default": "2px",
				"border.width.strong": "3px",
				"border.width.accent": "3px"
			}
		}
	}
];
function resolveThemeTokens(theme, mode) {
	const defaults = AIOS_BUILTIN_THEMES[0].modes[mode] ?? {};
	const selected = theme.modes[mode] ?? theme.modes[mode === "light" ? "dark" : "light"] ?? {};
	return {
		...defaults,
		...selected
	};
}
function applyThemeTokens(root, values) {
	Object.values(THEME_TOKEN_CSS_VARIABLES).forEach((name) => root.style.removeProperty(name));
	for (const [token, value] of Object.entries(values)) {
		const property = THEME_TOKEN_CSS_VARIABLES[token];
		if (property && value) root.style.setProperty(property, value);
	}
}
//#endregion
export { AIOS_BUILTIN_THEMES, AIOS_DEFAULT_THEME_ID, DEFAULT_THEME_ID_STORAGE_KEY, DEFAULT_THEME_SNAPSHOT_STORAGE_KEY, REQUIRED_THEME_TOKENS, THEME_TOKEN_CSS_VARIABLES, applyThemeTokens, resolveThemeTokens };

//# sourceMappingURL=themes.mjs.map