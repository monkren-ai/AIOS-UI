import { cn, dataAttr } from "../../lib/utils.mjs";
import AgentOrb from "../AgentOrb/AgentOrb.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ToolCallRow.css";
//#region src/agent/ToolCallRow/ToolCallRow.tsx
const statusToAgentState = {
	pending: "idle",
	running: "acting",
	done: "idle",
	error: "error",
	skipped: "idle"
};
const statusLabels = {
	pending: "[PENDING]",
	running: "[RUNNING]",
	done: "[DONE]",
	error: "[ERROR]",
	skipped: "[SKIPPED]"
};
const toolCallRowVariants = cva("nothing-tool-call-row", {
	variants: { status: {
		pending: "nothing-tool-call-row--pending",
		running: "nothing-tool-call-row--running",
		done: "nothing-tool-call-row--done",
		error: "nothing-tool-call-row--error",
		skipped: "nothing-tool-call-row--skipped"
	} },
	defaultVariants: { status: "pending" }
});
function formatElapsed(ms) {
	if (ms === void 0) return void 0;
	if (ms < 1e3) return `${ms}MS`;
	return `${(ms / 1e3).toFixed(1)}S`;
}
const ToolCallRow = React.forwardRef(({ tool, args, status = "pending", elapsedMs, result, error, showArgs = false, expandLabel = "Show details", collapseLabel = "Hide details", className, ...props }, ref) => {
	const [expanded, setExpanded] = React.useState(showArgs);
	const hasDetails = args && Object.keys(args).length > 0 || result || error;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(toolCallRowVariants({ status }), className),
		"data-slot": "tool-call-row",
		"data-status": dataAttr(status),
		"aria-busy": status === "running" || void 0,
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "nothing-tool-call-row__header",
			children: [
				/* @__PURE__ */ jsx(AgentOrb, {
					state: statusToAgentState[status],
					size: "sm"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "nothing-tool-call-row__tool",
					children: tool
				}),
				/* @__PURE__ */ jsx("span", {
					className: "nothing-tool-call-row__status",
					children: statusLabels[status]
				}),
				elapsedMs !== void 0 && /* @__PURE__ */ jsx("span", {
					className: "nothing-tool-call-row__elapsed",
					children: formatElapsed(elapsedMs)
				}),
				hasDetails && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "nothing-tool-call-row__toggle",
					onClick: () => setExpanded((v) => !v),
					"aria-expanded": expanded,
					"aria-label": expanded ? collapseLabel : expandLabel,
					children: expanded ? "−" : "+"
				})
			]
		}), expanded && hasDetails && /* @__PURE__ */ jsxs("div", {
			className: "nothing-tool-call-row__details",
			children: [
				args && Object.keys(args).length > 0 && /* @__PURE__ */ jsx("dl", {
					className: "nothing-tool-call-row__args",
					children: Object.entries(args).map(([key, value]) => /* @__PURE__ */ jsxs("div", {
						className: "nothing-tool-call-row__arg",
						children: [/* @__PURE__ */ jsx("dt", { children: key }), /* @__PURE__ */ jsx("dd", { children: typeof value === "string" ? value : JSON.stringify(value) })]
					}, key))
				}),
				result && /* @__PURE__ */ jsx("div", {
					className: "nothing-tool-call-row__result",
					children: result
				}),
				error && /* @__PURE__ */ jsx("div", {
					className: "nothing-tool-call-row__error",
					children: error
				})
			]
		})]
	});
});
ToolCallRow.displayName = "ToolCallRow";
//#endregion
export { ToolCallRow as default, toolCallRowVariants };

//# sourceMappingURL=ToolCallRow.mjs.map