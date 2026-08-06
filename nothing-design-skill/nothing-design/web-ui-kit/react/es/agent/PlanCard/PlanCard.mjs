import { cn, dataAttr } from "../../lib/utils.mjs";
import Button from "../../Button/Button.mjs";
import AgentOrb from "../AgentOrb/AgentOrb.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./PlanCard.css";
//#region src/agent/PlanCard/PlanCard.tsx
const statusLabels = {
	pending: "[PENDING]",
	approved: "[APPROVED]",
	rejected: "[REJECTED]",
	done: "[DONE]"
};
const planCardVariants = cva("nothing-plan-card", {
	variants: {
		editable: {
			true: "nothing-plan-card--editable",
			false: ""
		},
		compact: {
			true: "nothing-plan-card--compact",
			false: ""
		}
	},
	defaultVariants: {
		editable: false,
		compact: false
	}
});
const PlanCard = React$1.forwardRef(({ title = "AGENT PLAN", steps, editable = false, compact = false, onApprove, onEdit, onStepToggle, onApproveAll, onReset, approveLabel = "ALLOW AGENT", editLabel = "MODIFY", approveAllLabel = "APPROVE ALL", resetLabel = "RESET", approveDisabledHint = "Approve all steps first", className, ...props }, ref) => {
	const approvedCount = steps.filter((s) => s.status === "approved" || s.status === "done").length;
	const allApproved = steps.length > 0 && approvedCount === steps.length;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(planCardVariants({
			editable,
			compact
		}), className),
		"data-slot": "plan-card",
		"data-editable": dataAttr(editable),
		"data-compact": dataAttr(compact),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-plan-card__header",
				children: [
					/* @__PURE__ */ jsx(AgentOrb, {
						state: allApproved ? "acting" : "thinking",
						size: "sm"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "nothing-plan-card__title",
						children: title
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "nothing-plan-card__count",
						children: [
							approvedCount,
							"/",
							steps.length
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("ol", {
				className: "nothing-plan-card__list",
				"aria-label": "Agent plan steps",
				children: steps.map((step, index) => {
					const status = step.status ?? "pending";
					const stepNumber = String(index + 1).padStart(2, "0");
					return /* @__PURE__ */ jsxs("li", {
						className: cn("nothing-plan-card__item", `nothing-plan-card__item--${status}`),
						"data-status": dataAttr(status),
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "nothing-plan-card__number",
								children: stepNumber
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "nothing-plan-card__content",
								children: [/* @__PURE__ */ jsx("span", {
									className: "nothing-plan-card__description",
									children: step.description
								}), step.tool && /* @__PURE__ */ jsx("span", {
									className: "nothing-plan-card__tool",
									children: step.tool
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "nothing-plan-card__status",
								children: statusLabels[status]
							}),
							editable && /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "nothing-plan-card__toggle",
								onClick: () => onStepToggle?.(step.id, status !== "approved"),
								"aria-pressed": status === "approved",
								"aria-label": status === "approved" ? `Reject step ${stepNumber}` : `Approve step ${stepNumber}`,
								children: status === "approved" ? "−" : "+"
							})
						]
					}, step.id);
				})
			}),
			(onApprove || onEdit || onApproveAll || onReset) && /* @__PURE__ */ jsxs("div", {
				className: "nothing-plan-card__actions",
				children: [(onApproveAll || onReset) && /* @__PURE__ */ jsxs("div", {
					className: "nothing-plan-card__actions-bulk",
					children: [onApproveAll && /* @__PURE__ */ jsx(Button, {
						variant: "secondary",
						size: "sm",
						onClick: onApproveAll,
						children: approveAllLabel
					}), onReset && /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						onClick: onReset,
						children: resetLabel
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "nothing-plan-card__actions-main",
					children: [onEdit && /* @__PURE__ */ jsx(Button, {
						variant: "secondary",
						size: "sm",
						onClick: onEdit,
						children: editLabel
					}), onApprove && /* @__PURE__ */ jsx(Button, {
						variant: "primary",
						size: "sm",
						onClick: onApprove,
						disabled: !allApproved,
						title: allApproved ? void 0 : approveDisabledHint,
						children: approveLabel
					})]
				})]
			})
		]
	});
});
PlanCard.displayName = "PlanCard";
//#endregion
export { PlanCard as default, planCardVariants };

//# sourceMappingURL=PlanCard.mjs.map