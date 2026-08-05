"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/ReducedMotionProvider/ReducedMotionProvider.tsx
const MEDIA = "(prefers-reduced-motion: reduce)";
/**
* 默认值是 `null` 而不是 `{ reducedMotion: false }`：两者在类型上一样，但只有
* 前者能让 hook 分辨「没有 provider」和「provider 说不用降级」。少了这个区分，
* 忘记挂 provider 的树会安静地照常播动画——正是无障碍上最不该静默失败的地方。
*/
const ReducedMotionContext = createContext(null);
function getSystemPreference() {
	if (typeof window === "undefined" || !window.matchMedia) return false;
	return window.matchMedia(MEDIA).matches;
}
/**
* 把 `prefers-reduced-motion` 暴露给组件树，并写到 `<html data-reduced-motion>` 上。
*
* CSS 层面其实已经有一条全局的 `@media (prefers-reduced-motion: reduce)` 兜底，
* 但 JS 驱动的动画（motion 的 spring、canvas 里的点阵动效）读不到媒体查询，
* 得靠 `useReducedMotion()` 自己判断。应用内提供开关时，`force` 也能覆盖系统值。
*/
function ReducedMotionProvider({ children, force }) {
	const [systemReducedMotion, setSystemReducedMotion] = useState(getSystemPreference);
	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const media = window.matchMedia(MEDIA);
		const handler = (event) => setSystemReducedMotion(event.matches);
		setSystemReducedMotion(media.matches);
		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, []);
	const reducedMotion = force ?? systemReducedMotion;
	useEffect(() => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		if (reducedMotion) root.setAttribute("data-reduced-motion", "");
		else root.removeAttribute("data-reduced-motion");
	}, [reducedMotion]);
	return /* @__PURE__ */ jsx(ReducedMotionContext, {
		value: useMemo(() => ({
			reducedMotion,
			systemReducedMotion
		}), [reducedMotion, systemReducedMotion]),
		children
	});
}
ReducedMotionProvider.displayName = "ReducedMotionProvider";
function subscribeToMedia(onChange) {
	if (typeof window === "undefined" || !window.matchMedia) return () => {};
	const media = window.matchMedia(MEDIA);
	media.addEventListener("change", onChange);
	return () => media.removeEventListener("change", onChange);
}
/**
* 返回当前是否应该抑制动效。
*
* 有 provider 就用 provider 的值（这样 `force` 能生效）；没有的话直接订阅系统
* 媒体查询，所以单独拿来用也是对的。服务端一律按「不降级」渲染，客户端接管后
* 再纠正——媒体查询在服务端本来就无从得知。
*/
function useReducedMotion() {
	const context = useContext(ReducedMotionContext);
	const standalone = useSyncExternalStore(subscribeToMedia, getSystemPreference, useCallback(() => false, []));
	return context ? context.reducedMotion : standalone;
}
//#endregion
export { ReducedMotionProvider as default, useReducedMotion };

//# sourceMappingURL=ReducedMotionProvider.mjs.map