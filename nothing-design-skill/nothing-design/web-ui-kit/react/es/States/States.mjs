import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./States.css";
//#region src/States/States.tsx
const stateVariants = cva("nothing-state", {
	variants: {
		variant: {
			loading: "nothing-state--loading",
			error: "nothing-state--error",
			empty: "nothing-state--empty",
			disabled: "nothing-state--disabled"
		},
		size: {
			sm: "nothing-state--sm",
			md: "nothing-state--md",
			lg: "nothing-state--lg"
		}
	},
	defaultVariants: {
		variant: "loading",
		size: "md"
	}
});
const loadingSegmentVariants = cva("nothing-state__loading-segment", {
	variants: { filled: {
		true: "nothing-state__loading-segment--filled",
		false: ""
	} },
	defaultVariants: { filled: false }
});
const LoadingState = React.forwardRef(({ className, progress, totalSegments = 20, label, size = "md", style, ...props }, ref) => {
	const filledSegments = progress !== void 0 ? Math.round(progress / 100 * totalSegments) : 0;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(stateVariants({
			variant: "loading",
			size
		}), className),
		style,
		role: "status",
		"aria-live": "polite",
		"data-state": dataAttr("loading"),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "nothing-state__spinner",
				children: Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "nothing-state__spinner-segment" }, i))
			}),
			progress !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
				className: "nothing-state__loading-bar",
				children: Array.from({ length: totalSegments }).map((_, i) => /* @__PURE__ */ jsx("div", { className: cn(loadingSegmentVariants({ filled: i < filledSegments })) }, i))
			}), /* @__PURE__ */ jsxs("div", {
				className: "nothing-state__percentage",
				children: [progress, "%"]
			})] }),
			label && /* @__PURE__ */ jsxs("div", {
				className: "nothing-state__bracket-text",
				children: [
					"[ ",
					label,
					" ]"
				]
			})
		]
	});
});
LoadingState.displayName = "LoadingState";
const ErrorState = React.forwardRef(({ className, headline, message, prefix, onRetry, size = "md", style, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(stateVariants({
			variant: "error",
			size
		}), className),
		style,
		role: "alert",
		"data-state": dataAttr("error"),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-state__headline",
				children: [prefix && /* @__PURE__ */ jsx("span", {
					className: "nothing-state__prefix",
					children: prefix
				}), headline]
			}),
			message && /* @__PURE__ */ jsx("div", {
				className: "nothing-state__message",
				children: message
			}),
			onRetry && /* @__PURE__ */ jsx("div", {
				className: "nothing-state__action",
				children: /* @__PURE__ */ jsx("button", {
					className: "nothing-btn nothing-btn--secondary",
					onClick: onRetry,
					children: "Retry"
				})
			})
		]
	});
});
ErrorState.displayName = "ErrorState";
const EmptyState = React.forwardRef(({ className, headline = "Nothing here", description, action, size = "md", style, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(stateVariants({
			variant: "empty",
			size
		}), className),
		style,
		role: "status",
		"data-state": dataAttr("empty"),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", { className: "nothing-state__dot-matrix" }),
			/* @__PURE__ */ jsx("div", {
				className: "nothing-state__headline",
				children: headline
			}),
			description && /* @__PURE__ */ jsx("div", {
				className: "nothing-state__description",
				children: description
			}),
			action && /* @__PURE__ */ jsx("div", {
				className: "nothing-state__action",
				children: action
			})
		]
	});
});
EmptyState.displayName = "EmptyState";
const DisabledState = React.forwardRef(({ className, headline = "Unavailable", description, size = "md", style, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(stateVariants({
			variant: "disabled",
			size
		}), className),
		style,
		role: "status",
		"data-state": dataAttr("disabled"),
		"aria-disabled": "true",
		...props,
		children: [/* @__PURE__ */ jsx("h3", {
			className: "nothing-state__headline",
			children: headline
		}), description && /* @__PURE__ */ jsx("div", {
			className: "nothing-state__description",
			children: description
		})]
	});
});
DisabledState.displayName = "DisabledState";
//#endregion
export { DisabledState, EmptyState, ErrorState, LoadingState, loadingSegmentVariants, stateVariants };

//# sourceMappingURL=States.mjs.map