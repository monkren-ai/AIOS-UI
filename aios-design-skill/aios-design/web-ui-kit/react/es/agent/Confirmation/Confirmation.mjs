import { cn } from "../../lib/utils.mjs";
import ApprovalGate from "../ApprovalGate/ApprovalGate.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/agent/Confirmation/Confirmation.tsx
function Confirmation({ title, description, details, state = "pending", danger = false, reversible = true, approveLabel = "批准 / Approve", denyLabel = "拒绝 / Deny", approvedLabel, deniedLabel, onApprove, onDeny, className, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("w-full", className),
		"data-slot": "confirmation",
		...props,
		children: /* @__PURE__ */ jsxs(ApprovalGate, {
			action: typeof title === "string" ? title : "操作确认 / Action confirmation",
			impact: typeof description === "string" ? description : void 0,
			risk: danger ? "high" : "medium",
			state,
			reversible,
			allowLabel: approveLabel,
			denyLabel,
			approvedLabel,
			deniedLabel,
			onAllow: onApprove,
			onDeny,
			children: [
				typeof title !== "string" && /* @__PURE__ */ jsx("div", {
					"data-slot": "confirmation-title",
					children: title
				}),
				typeof description !== "string" && description,
				details
			]
		})
	});
}
//#endregion
export { Confirmation };

//# sourceMappingURL=Confirmation.mjs.map