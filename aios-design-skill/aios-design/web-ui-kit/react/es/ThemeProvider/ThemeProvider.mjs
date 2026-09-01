"use client";
import { AIOS_BUILTIN_THEMES, AIOS_DEFAULT_THEME_ID, DEFAULT_THEME_ID_STORAGE_KEY, DEFAULT_THEME_SNAPSHOT_STORAGE_KEY, applyThemeTokens, resolveThemeTokens } from "./themes.mjs";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/ThemeProvider/ThemeProvider.tsx
const DEFAULT_STORAGE_KEY = "aios-theme";
const MEDIA = "(prefers-color-scheme: dark)";
const defaultDefinition = AIOS_BUILTIN_THEMES[0];
const ThemeContext = createContext({
	theme: "dark",
	resolvedTheme: "dark",
	systemTheme: "dark",
	mounted: false,
	setTheme: () => {},
	toggleTheme: () => {},
	themeId: AIOS_DEFAULT_THEME_ID,
	activeTheme: defaultDefinition,
	themes: AIOS_BUILTIN_THEMES,
	setThemeId: () => {}
});
function storedTheme(defaultTheme, storageKey) {
	if (typeof window === "undefined") return defaultTheme;
	const value = window.localStorage.getItem(storageKey);
	return value === "light" || value === "dark" || value === "system" ? value : defaultTheme;
}
function storedSnapshot(storageKey) {
	if (typeof window === "undefined") return null;
	try {
		const value = JSON.parse(window.localStorage.getItem(storageKey) || "null");
		return value?.id && value?.modes ? value : null;
	} catch {
		return null;
	}
}
function systemAppearance() {
	return typeof window !== "undefined" && window.matchMedia(MEDIA).matches ? "dark" : "light";
}
function disableAnimation() {
	const style = document.createElement("style");
	style.textContent = "*,*::before,*::after{transition:none!important}";
	document.head.appendChild(style);
	return () => {
		window.getComputedStyle(document.body);
		setTimeout(() => style.remove(), 0);
	};
}
function ThemeProvider({ children, defaultTheme = "dark", forcedTheme, enableSystem = true, disableTransitionOnChange = true, onThemeChange, storageKey = DEFAULT_STORAGE_KEY, themes: suppliedThemes = [], defaultThemeId = AIOS_DEFAULT_THEME_ID, themeIdStorageKey = DEFAULT_THEME_ID_STORAGE_KEY, themeSnapshotStorageKey = DEFAULT_THEME_SNAPSHOT_STORAGE_KEY, onThemeIdChange }) {
	const [theme, setThemeState] = useState(() => storedTheme(defaultTheme, storageKey));
	const [themeId, setThemeIdState] = useState(() => typeof window === "undefined" ? defaultThemeId : window.localStorage.getItem(themeIdStorageKey) || defaultThemeId);
	const [snapshot] = useState(() => storedSnapshot(themeSnapshotStorageKey));
	const [systemTheme, setSystemTheme] = useState(() => enableSystem ? systemAppearance() : void 0);
	const [mounted, setMounted] = useState(false);
	const themes = useMemo(() => {
		const catalog = /* @__PURE__ */ new Map();
		AIOS_BUILTIN_THEMES.forEach((item) => catalog.set(item.id, item));
		suppliedThemes.forEach((item) => catalog.set(item.id, item));
		if (snapshot && !catalog.has(snapshot.id)) catalog.set(snapshot.id, snapshot);
		return [...catalog.values()];
	}, [snapshot, suppliedThemes]);
	const activeTheme = useMemo(() => themes.find((item) => item.id === themeId) ?? themes.find((item) => item.id === defaultThemeId) ?? defaultDefinition, [
		defaultThemeId,
		themeId,
		themes
	]);
	const resolvedTheme = useMemo(() => {
		if (forcedTheme) return forcedTheme;
		if (theme === "system") return systemTheme ?? (defaultTheme === "system" ? "dark" : defaultTheme);
		return theme;
	}, [
		defaultTheme,
		forcedTheme,
		systemTheme,
		theme
	]);
	useEffect(() => setMounted(true), []);
	useEffect(() => {
		window.localStorage.setItem(storageKey, theme);
		onThemeChange?.(theme);
	}, [
		onThemeChange,
		storageKey,
		theme
	]);
	useEffect(() => {
		window.localStorage.setItem(themeIdStorageKey, activeTheme.id);
		window.localStorage.setItem(themeSnapshotStorageKey, JSON.stringify(activeTheme));
		onThemeIdChange?.(activeTheme.id);
	}, [
		activeTheme,
		onThemeIdChange,
		themeIdStorageKey,
		themeSnapshotStorageKey
	]);
	useEffect(() => {
		const restore = disableTransitionOnChange ? disableAnimation() : null;
		const root = document.documentElement;
		root.setAttribute("data-theme", resolvedTheme);
		root.setAttribute("data-theme-id", activeTheme.id);
		applyThemeTokens(root, resolveThemeTokens(activeTheme, resolvedTheme));
		restore?.();
	}, [
		activeTheme,
		disableTransitionOnChange,
		resolvedTheme
	]);
	useEffect(() => {
		if (!enableSystem) return;
		const media = window.matchMedia(MEDIA);
		const handler = (event) => setSystemTheme(event.matches ? "dark" : "light");
		handler(media);
		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, [enableSystem]);
	const setTheme = useCallback((next) => setThemeState(next), []);
	const setThemeId = useCallback((next) => {
		if (themes.some((item) => item.id === next)) setThemeIdState(next);
	}, [themes]);
	const toggleTheme = useCallback(() => setThemeState((previous) => {
		if (!enableSystem) return previous === "dark" ? "light" : "dark";
		if (previous === "dark") return "light";
		if (previous === "light") return "system";
		return "dark";
	}), [enableSystem]);
	return /* @__PURE__ */ jsx(ThemeContext, {
		value: useMemo(() => ({
			theme,
			resolvedTheme,
			systemTheme,
			mounted,
			setTheme,
			toggleTheme,
			themeId: activeTheme.id,
			activeTheme,
			themes,
			setThemeId
		}), [
			activeTheme,
			mounted,
			resolvedTheme,
			setTheme,
			setThemeId,
			systemTheme,
			theme,
			themes,
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