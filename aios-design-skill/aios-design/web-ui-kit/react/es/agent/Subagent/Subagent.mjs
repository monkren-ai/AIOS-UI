import { cn } from "../../lib/utils.mjs";
import { subagentVariants } from "./subagent-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/agent/Subagent/Subagent.tsx
function Subagent({ name, meta, status = "running", progress, error, className, ref, ...props }) {
	const value = Math.max(0, Math.min(100, progress ?? (status === "done" ? 100 : 0)));
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(subagentVariants({ status }), className),
		"data-slot": "subagent",
		"data-status": status,
		"aria-busy": status === "running" || void 0,
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-h-6 items-center gap-2",
				children: [
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						className: cn("size-2 shrink-0 rounded-full border border-current", status === "running" && "animate-agent-pulse bg-current motion-reduce:animate-none", status === "done" && "bg-current")
					}),
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 flex-1 truncate text-sm",
						children: name
					}),
					meta && /* @__PURE__ */ jsx("span", {
						className: "shrink-0 font-mono text-caption text-foreground-muted",
						children: meta
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				role: "progressbar",
				"aria-label": `${String(name)} progress`,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": value,
				className: "h-1 overflow-hidden rounded-full bg-muted",
				children: /* @__PURE__ */ jsx("span", {
					className: cn("block h-full origin-left bg-foreground transition-transform duration-300 motion-reduce:transition-none", status === "error" && "bg-accent"),
					style: { transform: `scaleX(${value / 100})` }
				})
			}),
			status === "error" && error && /* @__PURE__ */ jsx("div", {
				role: "alert",
				className: "text-caption text-accent",
				children: error
			})
		]
	});
}
function SubagentList({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("flex w-full flex-col gap-2", className),
		"data-slot": "subagent-list",
		...props
	});
}
//#endregion
export { Subagent, SubagentList };

//# sourceMappingURL=Subagent.mjs.map