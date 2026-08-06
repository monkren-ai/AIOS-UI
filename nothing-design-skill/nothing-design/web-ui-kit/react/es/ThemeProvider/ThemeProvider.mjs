"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/ThemeProvider/ThemeProvider.tsx
const DEFAULT_STORAGE_KEY = "nothing-theme";
const MEDIA = "(prefers-color-scheme: dark)";
const ThemeContext = createContext({
	theme: "dark",
	resolvedTheme: "dark",
	systemTheme: "dark",
	mounted: false,
	setTheme: () => {},
	toggleTheme: () => {}
});
function getInitialTheme(defaultTheme, storageKey) {
	if (typeof window === "undefined") return defaultTheme;
	const stored = window.localStorage.getItem(storageKey);
	if (stored === "light" || stored === "dark" || stored === "system") return stored;
	return defaultTheme;
}
function getSystemTheme() {
	if (typeof window === "undefined") return "dark";
	return window.matchMedia(MEDIA).matches ? "dark" : "light";
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.setAttribute("data-theme", theme);
}
function disableAnimation() {
	const css = document.createElement("style");
	css.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"));
	document.head.appendChild(css);
	return () => {
		(() => window.getComputedStyle(document.body))();
		setTimeout(() => {
			document.head.removeChild(css);
		}, 0);
	};
}
/**
* ThemeProvider
*
* 管理 Nothing UI 的明暗主题。
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
function ThemeProvider({ children, defaultTheme = "dark", forcedTheme, enableSystem = true, disableTransitionOnChange = true, onThemeChange, storageKey = DEFAULT_STORAGE_KEY }) {
	const [theme, setThemeState] = useState(() => {
		if (typeof window === "undefined") return defaultTheme;
		return getInitialTheme(defaultTheme, storageKey);
	});
	const [systemTheme, setSystemTheme] = useState(() => enableSystem ? getSystemTheme() : void 0);
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	const resolvedTheme = useMemo(() => {
		if (forcedTheme) return forcedTheme;
		if (theme === "system") return systemTheme ?? (defaultTheme === "system" ? "dark" : defaultTheme);
		return theme;
	}, [
		forcedTheme,
		theme,
		systemTheme,
		defaultTheme
	]);
	useEffect(() => {
		if (typeof window !== "undefined") window.localStorage.setItem(storageKey, theme);
		onThemeChange?.(theme);
	}, [
		theme,
		onThemeChange,
		storageKey
	]);
	useEffect(() => {
		const enable = disableTransitionOnChange ? disableAnimation() : null;
		applyTheme(resolvedTheme);
		enable?.();
	}, [resolvedTheme, disableTransitionOnChange]);
	useEffect(() => {
		if (!enableSystem) return;
		const media = window.matchMedia(MEDIA);
		const handler = (e) => {
			setSystemTheme(e.matches ? "dark" : "light");
		};
		handler(media);
		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, [enableSystem]);
	const setTheme = useCallback((next) => {
		setThemeState(next);
	}, []);
	const toggleTheme = useCallback(() => {
		setThemeState((prev) => {
			if (enableSystem) {
				if (prev === "dark") return "light";
				if (prev === "light") return "system";
				return "dark";
			}
			return prev === "dark" ? "light" : "dark";
		});
	}, [enableSystem]);
	return /* @__PURE__ */ jsx(ThemeContext, {
		value: useMemo(() => ({
			theme,
			resolvedTheme,
			systemTheme,
			mounted,
			setTheme,
			toggleTheme
		}), [
			theme,
			resolvedTheme,
			systemTheme,
			mounted,
			setTheme,
			toggleTheme
		]),
		children
	});
}
ThemeProvider.displayName = "ThemeProvider";
function useTheme() {
	return useContext(ThemeContext);
}
//#endregion
export { DEFAULT_STORAGE_KEY, ThemeProvider as default, useTheme };

//# sourceMappingURL=ThemeProvider.mjs.map