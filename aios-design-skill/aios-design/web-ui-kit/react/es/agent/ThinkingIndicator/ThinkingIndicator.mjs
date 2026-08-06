import { cn, dataAttr } from "../../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ThinkingIndicator.css";
//#region src/agent/ThinkingIndicator/ThinkingIndicator.tsx
const thinkingIndicatorVariants = cva("nothing-thinking-indicator", {
	variants: {
		state: {
			thinking: "nothing-thinking-indicator--thinking",
			acting: "nothing-thinking-indicator--acting",
			done: "nothing-thinking-indicator--done",
			error: "nothing-thinking-indicator--error"
		},
		size: {
			sm: "nothing-thinking-indicator--sm",
			md: "nothing-thinking-indicator--md",
			lg: "nothing-thinking-indicator--lg"
		}
	},
	defaultVariants: {
		state: "thinking",
		size: "md"
	}
});
const ariaLabels = {
	thinking: "Thinking",
	acting: "Acting",
	done: "Done",
	error: "Error"
};
const ThinkingIndicator = React$1.forwardRef(({ state = "thinking", size = "md", label, className, ...props }, ref) => {
	const ariaLabel = label ?? ariaLabels[state];
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(thinkingIndicatorVariants({
			state,
			size
		}), className),
		"data-slot": "thinking-indicator",
		"data-state": dataAttr(state),
		"data-size": dataAttr(size),
		role: "status",
		"aria-live": "polite",
		"aria-busy": state === "thinking" || state === "acting" || void 0,
		"aria-label": ariaLabel,
		...props,
		children: [/* @__PURE__ */ jsxs("svg", {
			className: "nothing-thinking-indicator__svg",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: [
				(state === "thinking" || state === "acting") && /* @__PURE__ */ jsxs("g", {
					className: "nothing-thinking-indicator__dots",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "6",
							cy: "12",
							r: "2",
							className: "nothing-thinking-indicator__dot"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "12",
							cy: "12",
							r: "2",
							className: "nothing-thinking-indicator__dot"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "18",
							cy: "12",
							r: "2",
							className: "nothing-thinking-indicator__dot"
						})
					]
				}),
				state === "done" && /* @__PURE__ */ jsx("path", {
					d: "M20 6L9 17l-5-5",
					className: "nothing-thinking-indicator__mark"
				}),
				state === "error" && /* @__PURE__ */ jsx("path", {
					d: "M18 6L6 18M6 6l12 12",
					className: "nothing-thinking-indicator__mark"
				})
			]
		}), label && /* @__PURE__ */ jsx("span", {
			className: "nothing-thinking-indicator__label",
			children: label
		})]
	});
});
ThinkingIndicator.displayName = "ThinkingIndicator";
//#endregion
export { ThinkingIndicator as default, thinkingIndicatorVariants };

//# sourceMappingURL=ThinkingIndicator.mjs.map