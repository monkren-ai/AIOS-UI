import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Alert.css";
//#region src/Alert/Alert.tsx
const alertVariants = cva("nothing-alert", {
	variants: { variant: {
		default: "",
		destructive: "nothing-alert--destructive"
	} },
	defaultVariants: { variant: "default" }
});
const EXIT_DURATION = 220;
const Alert = React.forwardRef(({ variant, title, icon, onClose, className, children, ...props }, ref) => {
	const [exiting, setExiting] = React.useState(false);
	const timerRef = React.useRef(null);
	React.useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);
	const handleClose = () => {
		if (exiting) return;
		setExiting(true);
		timerRef.current = setTimeout(() => {
			onClose?.();
			setExiting(false);
		}, EXIT_DURATION);
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(alertVariants({ variant }), exiting && "nothing-alert--exiting", className),
		role: variant === "destructive" ? "alert" : "status",
		"data-variant": dataAttr(variant),
		"data-state": exiting ? "exiting" : "visible",
		...props,
		children: [
			icon && /* @__PURE__ */ jsx("div", {
				className: "nothing-alert__icon",
				"aria-hidden": "true",
				children: icon
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-alert__content",
				children: [title && /* @__PURE__ */ jsx("div", {
					className: "nothing-alert__title",
					children: title
				}), /* @__PURE__ */ jsx("div", {
					className: "nothing-alert__message",
					children
				})]
			}),
			onClose && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "nothing-alert__close",
				onClick: handleClose,
				"aria-label": "Close alert",
				children: /* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 16 16",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
				})
			})
		]
	});
});
Alert.displayName = "Alert";
//#endregion
export { Alert, Alert as default, alertVariants };

//# sourceMappingURL=Alert.mjs.map