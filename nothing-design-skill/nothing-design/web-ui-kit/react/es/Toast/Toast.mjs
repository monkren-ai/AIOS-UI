import { cn, dataAttr } from "../lib/utils.mjs";
import { toastLabelVariants, toastVariants } from "./toast-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Toast/Toast.tsx
function Toast({ severity = "info", label, onDismiss, duration = 0, className, children, ...props }) {
	React$1.useEffect(() => {
		if (!onDismiss || !duration || duration <= 0) return;
		const timer = setTimeout(onDismiss, duration);
		return () => clearTimeout(timer);
	}, [onDismiss, duration]);
	return /* @__PURE__ */ jsxs("div", {
		className: cn(toastVariants({ severity }), className),
		role: "status",
		"data-slot": "toast",
		"data-placement": "inline",
		"data-severity": dataAttr(severity),
		...props,
		children: [
			label && /* @__PURE__ */ jsxs("span", {
				"data-slot": "toast-label",
				className: cn(toastLabelVariants({ severity })),
				children: [
					"[ ",
					label,
					" ]"
				]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "toast-message",
				className: "min-w-0 flex-1 break-words",
				children
			}),
			onDismiss && /* @__PURE__ */ jsx("button", {
				type: "button",
				"data-slot": "toast-dismiss",
				className: cn("inline-flex size-5 shrink-0 cursor-pointer items-center justify-center", "-mt-0.5 -me-0.5 border-none bg-transparent p-0 text-foreground-muted", "transition-[color,transform] duration-200 ease-nothing motion-reduce:transition-none", "hover:scale-110 hover:text-foreground motion-reduce:hover:scale-100", "outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"),
				onClick: onDismiss,
				"aria-label": "Dismiss notification / 关闭通知",
				children: /* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 16 16",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					"aria-hidden": "true",
					className: "size-3.5",
					children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
				})
			})
		]
	});
}
Toast.displayName = "Toast";
//#endregion
export { Toast as default };

//# sourceMappingURL=Toast.mjs.map