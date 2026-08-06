import Button from "../Button/Button.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/CopyButton/CopyButton.tsx
/** 不传 children 时的默认剪贴板图标。 */
function CopyIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("rect", {
			x: "5",
			y: "5",
			width: "8",
			height: "8",
			rx: "1"
		}), /* @__PURE__ */ jsx("path", { d: "M3 11V3h8" })]
	});
}
/**
* 独立复制按钮。
*
* 点击后用 `navigator.clipboard.writeText` 复制 `value`，成功后短暂展示
* `[COPIED]` 回执（默认 1.5 秒）再回退原 children；失败展示 `[ERROR]`。
* 不弹 toast——回执就长在按钮自己身上。
*/
function CopyButton({ value, copiedText = "[COPIED]", errorText = "[ERROR]", onCopy, variant = "secondary", size = "sm", children, onClick, disabled, "aria-label": ariaLabelProp, ref, ...props }) {
	const [state, setState] = React$1.useState("idle");
	const timeoutRef = React$1.useRef(null);
	React$1.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	const scheduleReset = React$1.useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setState("idle"), 1500);
	}, []);
	const handleClick = React$1.useCallback(async (event) => {
		onClick?.(event);
		if (event.defaultPrevented) return;
		if (disabled) return;
		try {
			await navigator.clipboard.writeText(value);
			setState("copied");
			onCopy?.(true);
		} catch {
			setState("error");
			onCopy?.(false);
		}
		scheduleReset();
	}, [
		value,
		onCopy,
		onClick,
		disabled,
		scheduleReset
	]);
	const content = state === "copied" ? copiedText : state === "error" ? errorText : children ?? /* @__PURE__ */ jsx(CopyIcon, {});
	return /* @__PURE__ */ jsx(Button, {
		ref,
		variant,
		size,
		onClick: handleClick,
		disabled,
		"data-slot": "copy-button",
		"data-state": state,
		"aria-label": ariaLabelProp ?? (state === "copied" ? "已复制 Copied" : state === "error" ? "复制失败 Copy failed" : "复制 Copy"),
		...props,
		children: content
	});
}
CopyButton.displayName = "CopyButton";
//#endregion
export { CopyButton as default };

//# sourceMappingURL=CopyButton.mjs.map