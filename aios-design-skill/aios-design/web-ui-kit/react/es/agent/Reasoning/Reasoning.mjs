import { cn } from "../../lib/utils.mjs";
import { ActivityLabel } from "../ActivityLabel/ActivityLabel.mjs";
import { reasoningGroupVariants, reasoningVariants } from "./reasoning-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Collapsible } from "@base-ui/react/collapsible";
import "./Reasoning.css";
//#region src/agent/Reasoning/Reasoning.tsx
function Reasoning({ status = "finished", icon, label = "推理过程 / Reasoning", activeLabel, subject, additions, deletions, elapsed, actions, container = false, collapseOnComplete = false, defaultOpen = false, open: controlledOpen, onOpenChange, className, children, ref, ...props }) {
	const [internalOpen, setInternalOpen] = React$1.useState(defaultOpen);
	const open = controlledOpen ?? internalOpen;
	const running = status === "running";
	const hasBody = children !== void 0 && children !== null;
	const wasRunning = React$1.useRef(running);
	const setOpen = React$1.useCallback((next) => {
		if (controlledOpen === void 0) setInternalOpen(next);
		onOpenChange?.(next);
	}, [controlledOpen, onOpenChange]);
	React$1.useEffect(() => {
		if (wasRunning.current && !running && collapseOnComplete) setOpen(false);
		wasRunning.current = running;
	}, [
		collapseOnComplete,
		running,
		setOpen
	]);
	return /* @__PURE__ */ jsxs(Collapsible.Root, {
		ref,
		open,
		onOpenChange: setOpen,
		className: cn(reasoningVariants({
			container,
			status
		}), className),
		"data-slot": "reasoning",
		"data-status": status,
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: cn("flex min-h-12 min-w-0 items-center gap-2", container ? "px-3" : ""),
			"data-slot": "reasoning-header",
			children: [/* @__PURE__ */ jsxs(Collapsible.Trigger, {
				disabled: !hasBody,
				className: "flex min-h-11 min-w-0 flex-1 items-center gap-3 text-start focus-visible:outline-2 focus-visible:outline-interactive disabled:cursor-default",
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "grid size-6 shrink-0 place-items-center font-mono text-caption",
					children: icon ?? (hasBody ? open ? "−" : "+" : "•")
				}), /* @__PURE__ */ jsxs("span", {
					className: "flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1",
					children: [
						/* @__PURE__ */ jsx(ActivityLabel, {
							active: running,
							activeLabel: activeLabel ?? label,
							label,
							status: status === "error" ? "error" : "default"
						}),
						subject && /* @__PURE__ */ jsx("span", {
							className: "min-w-0 truncate font-mono text-caption text-foreground-muted",
							children: subject
						}),
						additions !== void 0 && /* @__PURE__ */ jsxs("span", {
							className: "font-mono text-caption text-foreground-muted",
							children: ["+", additions]
						}),
						deletions !== void 0 && /* @__PURE__ */ jsxs("span", {
							className: "font-mono text-caption text-accent",
							children: ["−", deletions]
						})
					]
				})]
			}), (running || elapsed || actions) && /* @__PURE__ */ jsxs("span", {
				className: "flex shrink-0 items-center gap-2",
				"data-slot": "reasoning-trailing",
				children: [running ? /* @__PURE__ */ jsx("span", {
					role: "status",
					"aria-label": "运行中 / Running",
					className: "size-2 animate-agent-pulse rounded-full bg-foreground motion-reduce:animate-none"
				}) : elapsed && /* @__PURE__ */ jsx("span", {
					className: "font-mono text-caption tabular-nums text-foreground-muted",
					children: elapsed
				}), actions]
			})]
		}), hasBody && /* @__PURE__ */ jsx(Collapsible.Panel, {
			className: "h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0",
			children: /* @__PURE__ */ jsx("div", {
				className: cn("ms-3 border-s border-border py-2 ps-6 text-sm text-foreground-muted", container && "me-3 mb-3"),
				"data-slot": "reasoning-content",
				children
			})
		})]
	});
}
function ReasoningGroup({ stream = false, revealed, stepInterval = 850, startDelay = 320, onComplete, className, children, ref, ...props }) {
	const rows = React$1.Children.toArray(children);
	const controlled = revealed !== void 0;
	const [internalCount, setInternalCount] = React$1.useState(stream ? 0 : rows.length);
	const count = controlled ? Math.max(0, Math.min(revealed, rows.length)) : stream ? internalCount : rows.length;
	const completed = React$1.useRef(false);
	React$1.useEffect(() => {
		if (controlled || !stream || count >= rows.length) return;
		const timer = window.setTimeout(() => setInternalCount((value) => Math.min(rows.length, value + 1)), count === 0 ? startDelay : stepInterval);
		return () => window.clearTimeout(timer);
	}, [
		controlled,
		count,
		rows.length,
		startDelay,
		stepInterval,
		stream
	]);
	React$1.useEffect(() => {
		if (rows.length === 0 || count < rows.length) {
			completed.current = false;
			return;
		}
		if (!completed.current) {
			completed.current = true;
			onComplete?.();
		}
	}, [
		count,
		onComplete,
		rows.length
	]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(reasoningGroupVariants(), className),
		"data-slot": "reasoning-group",
		"aria-live": stream ? "polite" : void 0,
		...props,
		children: rows.slice(0, count).map((row, index) => /* @__PURE__ */ jsx("div", {
			className: stream ? "aios-reasoning-row-in" : void 0,
			"data-slot": "reasoning-group-item",
			children: row
		}, React$1.isValidElement(row) ? row.key : index))
	});
}
function ReasoningSubject({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		ref,
		className: cn("font-mono text-[0.9em] underline underline-offset-4", className),
		"data-slot": "reasoning-subject",
		...props
	});
}
//#endregion
export { Reasoning, ReasoningGroup, ReasoningSubject };

//# sourceMappingURL=Reasoning.mjs.map