"use client";
import { createContext, useContext, useEffect, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { DirectionProvider } from "@base-ui/react/direction-provider";
//#region src/DirectionProvider/DirectionProvider.tsx
const DirectionContext = createContext({
	dir: "ltr",
	sign: 1
});
/**
* 声明布局方向。
*
* 有两件事需要同时做到位：DOM 上的 `dir` 属性让 CSS 逻辑属性正确解析，
* context 让方向相关的行为（roving focus、浮层落位、滑块拖拽方向）跟着一起翻。
* 本组件把两者一并处理，并顺带喂给 Base UI 的 DirectionProvider。
*
* @example
* ```tsx
* <DirectionProvider dir="rtl">
*   <App />
* </DirectionProvider>
* ```
*/
function DirectionProvider$1({ children, dir = "ltr", syncDocument = true }) {
	useEffect(() => {
		if (!syncDocument || typeof document === "undefined") return;
		const root = document.documentElement;
		const previous = root.getAttribute("dir");
		root.setAttribute("dir", dir);
		return () => {
			if (previous) root.setAttribute("dir", previous);
			else root.removeAttribute("dir");
		};
	}, [dir, syncDocument]);
	return /* @__PURE__ */ jsx(DirectionContext, {
		value: useMemo(() => ({
			dir,
			sign: dir === "rtl" ? -1 : 1
		}), [dir]),
		children: /* @__PURE__ */ jsx(DirectionProvider, {
			direction: dir,
			children
		})
	});
}
DirectionProvider$1.displayName = "DirectionProvider";
/**
* 读取当前布局方向。
*
* 没有 provider 时返回 `'ltr'`，所以在组件里可以无条件调用。
*/
function useDirection() {
	return useContext(DirectionContext);
}
//#endregion
export { DirectionProvider$1 as default, useDirection };

//# sourceMappingURL=DirectionProvider.mjs.map