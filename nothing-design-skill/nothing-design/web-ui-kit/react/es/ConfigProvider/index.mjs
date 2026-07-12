"use client";
import MotionProvider from "../MotionProvider/index.mjs";
import ThemeProvider from "../ThemeProvider/index.mjs";
import { createContext, memo, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/ConfigProvider/index.tsx
/**
* 默认 CDN（aliyun）
*/
const defaultCdnFn = ({ pkg, version, path }) => `https://registry.npmmirror.com/${pkg}/${version}/files/${path}`;
/**
* 配置上下文
*/
const ConfigContext = createContext(null);
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
function useConfig() {
	return useContext(ConfigContext);
}
/**
* useCdnFn hook
*
* 获取 CDN URL 生成函数。
*
* @example
* ```tsx
* const cdnUrl = useCdnFn()
* const url = cdnUrl({ pkg: '@lobehub/icons', version: '1.0.0', path: '/svg/openai.svg' })
* ```
*/
function useCdnFn() {
	const config = useContext(ConfigContext);
	if (!config) return defaultCdnFn;
	if (config.proxy === "custom") return config.customCdnFn ?? defaultCdnFn;
	const proxy = config.proxy ?? "aliyun";
	return ({ pkg, version, path }) => {
		const host = {
			aliyun: "https://registry.npmmirror.com",
			unpkg: "https://unpkg.com",
			jsdelivr: "https://cdn.jsdelivr.net/npm",
			custom: ""
		}[proxy];
		if (proxy === "jsdelivr") return `${host}/${pkg}@${version}${path}`;
		return `${host}/${pkg}/${version}/files${path}`;
	};
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
const ConfigProvider = memo(({ children, config, defaultTheme, onThemeChange, motion }) => {
	return /* @__PURE__ */ jsx(ConfigContext, {
		value: useMemo(() => config ?? null, [config]),
		children: /* @__PURE__ */ jsx(ThemeProvider, {
			defaultTheme,
			onThemeChange,
			children: /* @__PURE__ */ jsx(MotionProvider, {
				motion,
				children
			})
		})
	});
});
ConfigProvider.displayName = "ConfigProvider";
//#endregion
export { ConfigProvider as default, useCdnFn, useConfig };

//# sourceMappingURL=index.mjs.map