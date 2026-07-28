import { cn, dataAttr } from "../../lib/utils.mjs";
import { Button } from "../../Button/Button.mjs";
import { AgentOrb } from "../AgentOrb/AgentOrb.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ApprovalGate.css";
//#region src/agent/ApprovalGate/ApprovalGate.tsx
const riskLabels = {
	low: "[LOW RISK]",
	medium: "[MEDIUM RISK]",
	high: "[HIGH RISK]"
};
const approvalGateVariants = cva("nothing-approval-gate", {
	variants: { risk: {
		low: "nothing-approval-gate--low",
		medium: "nothing-approval-gate--medium",
		high: "nothing-approval-gate--high"
	} },
	defaultVariants: { risk: "medium" }
});
const ApprovalGate = React.forwardRef(({ action, impact, reversible = true, risk = "medium", allowLabel = "ALLOW", denyLabel = "DENY", onAllow, onDeny, className, ...props }, ref) => {
	const actionId = `${React.useId()}-action`;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(approvalGateVariants({ risk }), className),
		"data-slot": "approval-gate",
		"data-risk": dataAttr(risk),
		role: "alertdialog",
		"aria-modal": "true",
		"aria-labelledby": actionId,
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-approval-gate__header",
				children: [/* @__PURE__ */ jsx(AgentOrb, {
					state: risk === "high" ? "error" : "paused",
					size: "md"
				}), /* @__PURE__ */ jsxs("div", {
					className: "nothing-approval-gate__meta",
					children: [/* @__PURE__ */ jsx("span", {
						className: "nothing-approval-gate__risk",
						children: riskLabels[risk]
					}), /* @__PURE__ */ jsx("span", {
						className: "nothing-approval-gate__reversible",
						children: reversible ? "[REVERSIBLE]" : "[IRREVERSIBLE]"
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-approval-gate__body",
				children: [/* @__PURE__ */ jsx("p", {
					id: actionId,
					className: "nothing-approval-gate__action",
					children: action
				}), impact && /* @__PURE__ */ jsx("p", {
					className: "nothing-approval-gate__impact",
					children: impact
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-approval-gate__actions",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "secondary",
					size: "sm",
					onClick: onDeny,
					children: denyLabel
				}), /* @__PURE__ */ jsx(Button, {
					variant: risk === "high" ? "destructive" : "primary",
					size: "sm",
					onClick: onAllow,
					children: allowLabel
				})]
			})
		]
	});
});
ApprovalGate.displayName = "ApprovalGate";
//#endregion
export { ApprovalGate, ApprovalGate as default, approvalGateVariants };

//# sourceMappingURL=ApprovalGate.mjs.map