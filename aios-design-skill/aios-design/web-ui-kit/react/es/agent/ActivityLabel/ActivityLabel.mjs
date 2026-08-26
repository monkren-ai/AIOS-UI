import { cn, dataAttr } from "../../lib/utils.mjs";
import { activityLabelVariants } from "./activity-label-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/agent/ActivityLabel/ActivityLabel.tsx
function ActivityLabel({ active = false, activeLabel = "处理中 / Working", label = "已完成 / Done", status, className, ref, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		ref,
		role: "status",
		"aria-live": "polite",
		"aria-busy": active || void 0,
		className: cn(activityLabelVariants({
			active,
			status
		}), className),
		"data-slot": "activity-label",
		"data-active": dataAttr(active),
		"data-status": status ?? "default",
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": true,
			className: cn("size-2 rounded-full border border-current", active && "animate-agent-pulse bg-current motion-reduce:animate-none")
		}), /* @__PURE__ */ jsx("span", { children: active ? activeLabel : label })]
	});
}
//#endregion
export { ActivityLabel };

//# sourceMappingURL=ActivityLabel.mjs.map