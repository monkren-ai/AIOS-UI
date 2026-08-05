import { cn, dataAttr } from "../lib/utils.mjs";
import { alertIconVariants, alertMessageVariants, alertTitleVariants, alertVariants, resolveAlertVariant } from "./alert-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Alert/Alert.tsx
const EXIT_DURATION = 220;
function Alert({ variant, size = "md", title, icon, onClose, className, children, ...props }) {
	const [exiting, setExiting] = React.useState(false);
	const timerRef = React.useRef(null);
	React.useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);
	const resolvedVariant = resolveAlertVariant(variant) ?? "soft";
	const handleClose = () => {
		if (exiting) return;
		setExiting(true);
		timerRef.current = setTimeout(() => {
			onClose?.();
			setExiting(false);
		}, EXIT_DURATION);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(alertVariants({
			variant: resolvedVariant,
			size
		}), className),
		role: resolvedVariant === "destructive" ? "alert" : "status",
		"data-slot": "alert",
		"data-variant": dataAttr(resolvedVariant),
		"data-size": dataAttr(size),
		"data-state": exiting ? "exiting" : "visible",
		...props,
		children: [
			icon && /* @__PURE__ */ jsx("div", {
				"data-slot": "alert-icon",
				"aria-hidden": "true",
				className: alertIconVariants({ variant: resolvedVariant }),
				children: icon
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "alert-content",
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [title && /* @__PURE__ */ jsx("div", {
					"data-slot": "alert-title",
					className: alertTitleVariants({ variant: resolvedVariant }),
					children: title
				}), /* @__PURE__ */ jsx("div", {
					"data-slot": "alert-message",
					className: alertMessageVariants({ variant: resolvedVariant }),
					children
				})]
			}),
			onClose && /* @__PURE__ */ jsx("button", {
				type: "button",
				"data-slot": "alert-close",
				className: cn("inline-flex size-5 shrink-0 cursor-pointer items-center justify-center", "-mt-0.5 -me-0.5 border-none bg-transparent p-0 text-foreground-muted", "transition-[color,transform] duration-200 ease-nothing motion-reduce:transition-none", "hover:text-foreground hover:scale-110 motion-reduce:hover:scale-100", "outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"),
				onClick: handleClose,
				"aria-label": "Close alert",
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
Alert.displayName = "Alert";
//#endregion
export { Alert as default };

//# sourceMappingURL=Alert.mjs.map