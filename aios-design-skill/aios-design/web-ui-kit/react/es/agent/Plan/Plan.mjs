import { cn } from "../../lib/utils.mjs";
import { planStepVariants, planVariants } from "./plan-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/agent/Plan/Plan.tsx
function PlanItem({ status = "pending", className, children, ref, ...props }) {
	return /* @__PURE__ */ jsxs("li", {
		ref,
		className: cn(planStepVariants({ status }), className),
		"data-slot": "plan-step",
		"data-status": status,
		"aria-current": status === "active" ? "step" : void 0,
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": true,
			className: cn("mt-1.5 size-2 shrink-0 rounded-full border border-current", status === "done" && "bg-current", status === "active" && "animate-agent-pulse bg-current motion-reduce:animate-none")
		}), /* @__PURE__ */ jsx("span", {
			className: "min-w-0 flex-1",
			children
		})]
	});
}
function Plan({ title = "计划 / Plan", className, children, ref, ...props }) {
	const steps = React$1.Children.toArray(children);
	const completed = steps.filter((child) => React$1.isValidElement(child) && child.props.status === "done").length;
	const total = steps.length;
	const progress = total === 0 ? 0 : completed / total;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(planVariants(), className),
		"data-slot": "plan",
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-h-10 items-center justify-between gap-3 border-b border-border pb-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-mono text-caption uppercase",
					children: title
				}), /* @__PURE__ */ jsxs("span", {
					className: "font-mono text-caption tabular-nums text-foreground-muted",
					children: [
						completed,
						" / ",
						total
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				role: "progressbar",
				"aria-label": "计划进度 / Plan progress",
				"aria-valuemin": 0,
				"aria-valuemax": total,
				"aria-valuenow": completed,
				className: "mt-3 h-1 overflow-hidden rounded-full bg-muted",
				children: /* @__PURE__ */ jsx("span", {
					className: "block h-full origin-left bg-foreground transition-transform duration-300 motion-reduce:transition-none",
					style: { transform: `scaleX(${progress})` }
				})
			}),
			/* @__PURE__ */ jsx("ol", {
				className: "mt-1",
				"data-slot": "plan-steps",
				children
			})
		]
	});
}
//#endregion
export { Plan, PlanItem };

//# sourceMappingURL=Plan.mjs.map