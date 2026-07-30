import { cn, dataAttr } from "../../lib/utils.mjs";
import { ThinkingIndicator } from "../ThinkingIndicator/ThinkingIndicator.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ThinkingSteps.css";
//#region src/agent/ThinkingSteps/ThinkingSteps.tsx
const thinkingStepsVariants = cva("nothing-thinking-steps", {
	variants: { compact: {
		true: "nothing-thinking-steps--compact",
		false: ""
	} },
	defaultVariants: { compact: false }
});
const statusLabels = {
	pending: "[PENDING]",
	thinking: "[THINKING]",
	done: "[DONE]",
	error: "[ERROR]"
};
const ThinkingSteps = React.forwardRef(({ steps, title = "THINKING", activeIndex: activeIndexProp, defaultActiveIndex = 0, autoAdvance = false, interval = 1600, loop = false, onStepChange, compact = false, className, ...props }, ref) => {
	const isControlled = activeIndexProp !== void 0;
	const [internalIndex, setInternalIndex] = React.useState(defaultActiveIndex);
	const activeIndex = isControlled ? activeIndexProp : internalIndex;
	React.useEffect(() => {
		if (!autoAdvance) return;
		if (steps.length === 0) return;
		const timer = setInterval(() => {
			setInternalIndex((current) => {
				const next = current + 1;
				if (next >= steps.length) {
					if (loop) {
						onStepChange?.(0);
						return 0;
					}
					return current;
				}
				onStepChange?.(next);
				return next;
			});
		}, interval);
		return () => clearInterval(timer);
	}, [
		autoAdvance,
		interval,
		loop,
		steps.length,
		onStepChange
	]);
	const computeStatus = (index) => {
		if (index < activeIndex) return "done";
		if (index === activeIndex) return "thinking";
		return "pending";
	};
	const activeCount = Math.min(activeIndex + 1, steps.length);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(thinkingStepsVariants({ compact }), className),
		"data-slot": "thinking-steps",
		"data-compact": dataAttr(compact),
		"aria-live": "polite",
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "nothing-thinking-steps__header",
			children: [/* @__PURE__ */ jsx("span", {
				className: "nothing-thinking-steps__title",
				children: title
			}), /* @__PURE__ */ jsxs("span", {
				className: "nothing-thinking-steps__count",
				children: [
					String(activeCount).padStart(2, "0"),
					"/",
					String(steps.length).padStart(2, "0")
				]
			})]
		}), /* @__PURE__ */ jsx("ol", {
			className: "nothing-thinking-steps__list",
			"aria-label": `${title} steps`,
			children: steps.map((step, index) => {
				const status = computeStatus(index);
				const isLast = index === steps.length - 1;
				const indicatorState = status === "pending" ? void 0 : status;
				return /* @__PURE__ */ jsxs("li", {
					className: cn("nothing-thinking-steps__item", `nothing-thinking-steps__item--${status}`, isLast && "nothing-thinking-steps__item--last"),
					"data-status": dataAttr(status),
					style: { "--step-index": index },
					children: [/* @__PURE__ */ jsxs("div", {
						className: "nothing-thinking-steps__marker",
						"aria-hidden": "true",
						children: [indicatorState ? /* @__PURE__ */ jsx(ThinkingIndicator, {
							state: indicatorState,
							size: "sm"
						}) : /* @__PURE__ */ jsx("span", { className: "nothing-thinking-steps__dot" }), !isLast && /* @__PURE__ */ jsx("span", { className: "nothing-thinking-steps__line" })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "nothing-thinking-steps__content",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "nothing-thinking-steps__row",
							children: [/* @__PURE__ */ jsx("span", {
								className: "nothing-thinking-steps__label",
								children: step.title
							}), /* @__PURE__ */ jsx("span", {
								className: "nothing-thinking-steps__status",
								children: statusLabels[status]
							})]
						}), step.content && /* @__PURE__ */ jsx("span", {
							className: "nothing-thinking-steps__description",
							children: step.content
						})]
					})]
				}, step.id);
			})
		})]
	});
});
ThinkingSteps.displayName = "ThinkingSteps";
//#endregion
export { ThinkingSteps, ThinkingSteps as default, thinkingStepsVariants };

//# sourceMappingURL=ThinkingSteps.mjs.map