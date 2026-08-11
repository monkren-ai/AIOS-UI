import { cn, dataAttr } from "../lib/utils.mjs";
import Button from "../Button/Button.mjs";
import { loadingSegmentVariants, stateActionVariants, stateBracketTextVariants, stateDescriptionVariants, stateDotMatrixVariants, stateHeadlineVariants, stateLoadingBarVariants, stateMessageVariants, statePercentageVariants, statePrefixVariants, stateSpinnerSegmentVariants, stateSpinnerVariants, stateVariants } from "./states-variants.mjs";
import "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import "./States.css";
//#region src/States/States.tsx
/** 示波器固定 7 根竖条，序号决定高度与相位。 */
const SPINNER_SEGMENT_COUNT = 7;
function LoadingState({ className, progress, totalSegments = 20, label, size = "md", ...props }) {
	const filledSegments = progress !== void 0 ? Math.round(progress / 100 * totalSegments) : 0;
	return /* @__PURE__ */ jsxs("div", {
		className: cn(stateVariants({
			variant: "loading",
			size
		}), className),
		role: "status",
		"aria-live": "polite",
		"data-slot": "loading-state",
		"data-state": dataAttr("loading"),
		"data-size": dataAttr(size),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				"data-slot": "state-spinner",
				className: stateSpinnerVariants(),
				children: Array.from({ length: SPINNER_SEGMENT_COUNT }).map((_, i) => /* @__PURE__ */ jsx("div", {
					"data-slot": "state-spinner-segment",
					className: stateSpinnerSegmentVariants({ index: i })
				}, i))
			}),
			progress !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
				"data-slot": "state-loading-bar",
				className: stateLoadingBarVariants(),
				children: Array.from({ length: totalSegments }).map((_, i) => /* @__PURE__ */ jsx("div", {
					"data-slot": "state-loading-segment",
					"data-filled": dataAttr(i < filledSegments),
					className: loadingSegmentVariants({ filled: i < filledSegments })
				}, i))
			}), /* @__PURE__ */ jsxs("div", {
				"data-slot": "state-percentage",
				className: statePercentageVariants(),
				children: [progress, "%"]
			})] }),
			label && /* @__PURE__ */ jsxs("div", {
				"data-slot": "state-bracket-text",
				className: stateBracketTextVariants(),
				children: [
					"[ ",
					label,
					" ]"
				]
			})
		]
	});
}
LoadingState.displayName = "LoadingState";
function ErrorState({ className, headline, message, prefix, onRetry, size = "md", ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn(stateVariants({
			variant: "error",
			size
		}), className),
		role: "alert",
		"data-slot": "error-state",
		"data-state": dataAttr("error"),
		"data-size": dataAttr(size),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "state-headline",
				className: stateHeadlineVariants({ variant: "error" }),
				children: [prefix && /* @__PURE__ */ jsx("span", {
					"data-slot": "state-prefix",
					className: statePrefixVariants(),
					children: prefix
				}), headline]
			}),
			message && /* @__PURE__ */ jsx("div", {
				"data-slot": "state-message",
				className: stateMessageVariants(),
				children: message
			}),
			onRetry && /* @__PURE__ */ jsx("div", {
				"data-slot": "state-action",
				className: stateActionVariants(),
				children: /* @__PURE__ */ jsx(Button, {
					variant: "secondary",
					size: "sm",
					onClick: onRetry,
					children: "Retry"
				})
			})
		]
	});
}
ErrorState.displayName = "ErrorState";
function EmptyState({ className, headline = "No content here", description, action, size = "md", ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn(stateVariants({
			variant: "empty",
			size
		}), className),
		role: "status",
		"data-slot": "empty-state",
		"data-state": dataAttr("empty"),
		"data-size": dataAttr(size),
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				"data-slot": "state-dot-matrix",
				"aria-hidden": "true",
				className: stateDotMatrixVariants()
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "state-headline",
				className: stateHeadlineVariants({ variant: "empty" }),
				children: headline
			}),
			description && /* @__PURE__ */ jsx("div", {
				"data-slot": "state-description",
				className: stateDescriptionVariants({ variant: "empty" }),
				children: description
			}),
			action && /* @__PURE__ */ jsx("div", {
				"data-slot": "state-action",
				className: stateActionVariants(),
				children: action
			})
		]
	});
}
EmptyState.displayName = "EmptyState";
function DisabledState({ className, headline = "Unavailable", description, size = "md", ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn(stateVariants({
			variant: "disabled",
			size
		}), className),
		role: "status",
		"data-slot": "disabled-state",
		"data-state": dataAttr("disabled"),
		"data-size": dataAttr(size),
		"aria-disabled": "true",
		...props,
		children: [/* @__PURE__ */ jsx("h3", {
			"data-slot": "state-headline",
			className: stateHeadlineVariants({ variant: "disabled" }),
			children: headline
		}), description && /* @__PURE__ */ jsx("div", {
			"data-slot": "state-description",
			className: stateDescriptionVariants({ variant: "disabled" }),
			children: description
		})]
	});
}
DisabledState.displayName = "DisabledState";
//#endregion
export { DisabledState, EmptyState, ErrorState, LoadingState };

//# sourceMappingURL=States.mjs.map