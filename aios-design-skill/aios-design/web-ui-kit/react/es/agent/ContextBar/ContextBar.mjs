import { cn } from "../../lib/utils.mjs";
import { contextBarLabelVariants, contextBarVariants } from "./context-bar-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Collapsible } from "@base-ui/react/collapsible";
//#region src/agent/ContextBar/ContextBar.tsx
function ContextBar({ position, className, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(contextBarVariants({ position }), className),
		"data-slot": "context-bar",
		"data-position": position ?? "detached",
		...props
	});
}
function ContextBarLabel({ status = "default", muted, leading, trailing, onSteer, onRemove, className, children, ref, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(contextBarLabelVariants({
			status,
			muted
		}), className),
		"data-slot": "context-bar-label",
		"data-status": status,
		...props,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: cn("size-2 shrink-0 rounded-full border border-current", status === "loading" && "animate-agent-pulse bg-current motion-reduce:animate-none", status === "done" && "bg-current")
				}),
				leading,
				/* @__PURE__ */ jsx("span", {
					className: "truncate",
					children
				})
			]
		}), /* @__PURE__ */ jsxs("span", {
			className: "flex shrink-0 items-center gap-1",
			children: [
				trailing,
				onSteer && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "min-h-9 px-2 text-caption uppercase hover:bg-muted",
					onClick: onSteer,
					children: "引导 / Steer"
				}),
				onRemove && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "size-11 text-caption hover:bg-muted",
					onClick: onRemove,
					"aria-label": "移除 / Remove",
					children: "×"
				})
			]
		})]
	});
}
function ContextBarTasks({ summary, open, defaultOpen, onOpenChange, children, className }) {
	return /* @__PURE__ */ jsxs(Collapsible.Root, {
		open,
		defaultOpen,
		onOpenChange,
		className: cn("w-full", className),
		"data-slot": "context-bar-tasks",
		children: [/* @__PURE__ */ jsxs(Collapsible.Trigger, {
			className: "flex min-h-11 w-full items-center justify-between gap-3 font-mono text-caption uppercase focus-visible:outline-2 focus-visible:outline-interactive",
			children: [/* @__PURE__ */ jsx("span", { children: summary }), /* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				className: "group-data-[panel-open]:rotate-45",
				children: "+"
			})]
		}), /* @__PURE__ */ jsx(Collapsible.Panel, {
			className: "h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-2 pt-2",
				children
			})
		})]
	});
}
//#endregion
export { ContextBar, ContextBarLabel, ContextBarTasks };

//# sourceMappingURL=ContextBar.mjs.map