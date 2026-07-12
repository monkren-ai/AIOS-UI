"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/ThemeProvider/index.tsx
const STORAGE_KEY = "nothing-theme";
/**
* 主题上下文（默认 dark，与 Nothing 设计语言一致）
*/
const ThemeContext = createContext({
	theme: "dark",
	isDarkMode: true,
	setTheme: () => {},
	toggleTheme: () => {}
});
/**
* 从 localStorage 读取初始主题
*/
function getInitialTheme() {
	if (typeof window === "undefined") return "dark";
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return "dark";
}
/**
* 将主题应用到 document.documentElement
*/
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.setAttribute("data-theme", theme);
}
/**
* useTheme hook
*
* 获取当前主题与切换方法。
*
* @example
* ```tsx
* const { theme, isDarkMode, toggleTheme } = useTheme()
* ```
*/
function useTheme() {
	return useContext(ThemeContext);
}
/**
* ThemeProvider
*
* 管理 Nothing UI 的明暗主题。
*
* - 通过 `data-theme` 属性切换主题（与 `tokens.css` 的 `[data-theme="dark"]` 选择器协同）
* - 持久化到 `localStorage`（key: `nothing-theme`）
* - 默认主题为 `dark`（与 Nothing 设计语言一致）
*
* @example
* ```tsx
* <ThemeProvider defaultTheme="dark">
*   <App />
* </ThemeProvider>
* ```
*/
function ThemeProvider({ children, defaultTheme = "dark", onThemeChange }) {
	const [theme, setThemeState] = useState(() => {
		if (typeof window === "undefined") return defaultTheme;
		return getInitialTheme();
	});
	useEffect(() => {
		applyTheme(theme);
		if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, theme);
		onThemeChange?.(theme);
	}, [theme, onThemeChange]);
	const setTheme = useCallback((next) => {
		setThemeState(next);
	}, []);
	const toggleTheme = useCallback(() => {
		setThemeState((prev) => prev === "dark" ? "light" : "dark");
	}, []);
	return /* @__PURE__ */ jsx(ThemeContext, {
		value: useMemo(() => ({
			theme,
			isDarkMode: theme === "dark",
			setTheme,
			toggleTheme
		}), [
			theme,
			setTheme,
			toggleTheme
		]),
		children
	});
}
ThemeProvider.displayName = "ThemeProvider";
//#endregion
export { ThemeProvider as default, useTheme };

//# sourceMappingURL=index.mjs.map