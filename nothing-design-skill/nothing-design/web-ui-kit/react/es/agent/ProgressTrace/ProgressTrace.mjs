import { cn, dataAttr } from "../../lib/utils.mjs";
import AgentOrb from "../AgentOrb/AgentOrb.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ProgressTrace.css";
//#region src/agent/ProgressTrace/ProgressTrace.tsx
const statusToAgentState = {
	pending: "idle",
	active: "acting",
	done: "idle",
	error: "error",
	skipped: "idle"
};
const statusLabels = {
	pending: "[PENDING]",
	active: "[ACTIVE]",
	done: "[DONE]",
	error: "[ERROR]",
	skipped: "[SKIPPED]"
};
const progressTraceVariants = cva("nothing-progress-trace", {
	variants: { collapsed: {
		true: "nothing-progress-trace--collapsed",
		false: ""
	} },
	defaultVariants: { collapsed: false }
});
const ProgressTrace = React.forwardRef(({ steps, defaultCollapsed = false, title = "TRACE", expandLabel = "Expand trace", collapseLabel = "Collapse trace", className, ...props }, ref) => {
	const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(progressTraceVariants({ collapsed }), className),
		"data-slot": "progress-trace",
		"data-collapsed": dataAttr(collapsed),
		"aria-live": "polite",
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "nothing-progress-trace__header",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "nothing-progress-trace__title",
					children: title
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "nothing-progress-trace__count",
					children: [
						steps.filter((s) => s.status === "done").length,
						"/",
						steps.length
					]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "nothing-progress-trace__toggle",
					onClick: () => setCollapsed((v) => !v),
					"aria-expanded": !collapsed,
					"aria-label": collapsed ? expandLabel : collapseLabel,
					children: collapsed ? "+" : "−"
				})
			]
		}), !collapsed && /* @__PURE__ */ jsx("ol", {
			className: "nothing-progress-trace__list",
			"aria-label": `${title} steps`,
			children: steps.map((step, index) => {
				const status = step.status ?? "pending";
				const isLast = index === steps.length - 1;
				return /* @__PURE__ */ jsxs("li", {
					className: cn("nothing-progress-trace__item", `nothing-progress-trace__item--${status}`, isLast && "nothing-progress-trace__item--last"),
					"data-status": dataAttr(status),
					children: [/* @__PURE__ */ jsxs("div", {
						className: "nothing-progress-trace__marker",
						children: [/* @__PURE__ */ jsx(AgentOrb, {
							state: statusToAgentState[status],
							size: "sm"
						}), !isLast && /* @__PURE__ */ jsx("span", {
							className: "nothing-progress-trace__line",
							"aria-hidden": "true"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "nothing-progress-trace__content",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "nothing-progress-trace__row",
								children: [/* @__PURE__ */ jsx("span", {
									className: "nothing-progress-trace__label",
									children: step.label
								}), /* @__PURE__ */ jsx("span", {
									className: "nothing-progress-trace__status",
									children: statusLabels[status]
								})]
							}),
							step.description && /* @__PURE__ */ jsx("span", {
								className: "nothing-progress-trace__description",
								children: step.description
							}),
							step.timestamp && /* @__PURE__ */ jsx("span", {
								className: "nothing-progress-trace__timestamp",
								children: step.timestamp
							})
						]
					})]
				}, step.id);
			})
		})]
	});
});
ProgressTrace.displayName = "ProgressTrace";
//#endregion
export { ProgressTrace as default, progressTraceVariants };

//# sourceMappingURL=ProgressTrace.mjs.map