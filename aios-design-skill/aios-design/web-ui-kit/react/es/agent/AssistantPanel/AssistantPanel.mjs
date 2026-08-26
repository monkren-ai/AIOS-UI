import { cn, dataAttr } from "../../lib/utils.mjs";
import { assistantPanelVariants } from "./assistant-panel-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/agent/AssistantPanel/AssistantPanel.tsx
function AssistantPanel({ open: controlledOpen, defaultOpen = false, onOpenChange, title = "AI 助手 / AI Assistant", launcherLabel = "打开 AI 助手 / Open AI assistant", closeLabel = "关闭 AI 助手 / Close AI assistant", launcher, inline = false, autoFocus = true, panelClassName, className, children, ref, ...props }) {
	const [internalOpen, setInternalOpen] = React$1.useState(defaultOpen);
	const open = controlledOpen ?? internalOpen;
	const titleId = React$1.useId();
	const launcherRef = React$1.useRef(null);
	const closeRef = React$1.useRef(null);
	const setOpen = React$1.useCallback((next) => {
		if (controlledOpen === void 0) setInternalOpen(next);
		onOpenChange?.(next);
	}, [controlledOpen, onOpenChange]);
	React$1.useEffect(() => {
		if (!open) return;
		if (autoFocus) closeRef.current?.focus();
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				setOpen(false);
				launcherRef.current?.focus();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [
		autoFocus,
		open,
		setOpen
	]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(inline ? "relative" : "", className),
		"data-slot": "assistant-panel-root",
		"data-open": dataAttr(open),
		...props,
		children: [open && /* @__PURE__ */ jsxs("section", {
			role: "dialog",
			"aria-modal": "false",
			"aria-labelledby": titleId,
			className: cn(assistantPanelVariants({ inline }), panelClassName),
			"data-slot": "assistant-panel",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "flex min-h-12 items-center justify-between gap-3 border-b border-border px-4",
				"data-slot": "assistant-panel-header",
				children: [/* @__PURE__ */ jsx("h2", {
					id: titleId,
					className: "font-mono text-label uppercase",
					children: title
				}), /* @__PURE__ */ jsx("button", {
					ref: closeRef,
					type: "button",
					className: "min-h-11 px-2 text-caption text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive",
					onClick: () => {
						setOpen(false);
						launcherRef.current?.focus();
					},
					"aria-label": closeLabel,
					children: "×"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "min-h-0 flex-1 overflow-auto",
				"data-slot": "assistant-panel-content",
				children
			})]
		}), /* @__PURE__ */ jsx("button", {
			ref: launcherRef,
			type: "button",
			className: cn("z-overlay grid size-12 place-items-center rounded-full border border-border-visible bg-foreground-display text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive", inline ? "absolute inset-inline-end-0 bottom-0" : "fixed inset-inline-end-4 bottom-4"),
			"aria-label": open ? closeLabel : launcherLabel,
			"aria-expanded": open,
			onClick: () => setOpen(!open),
			"data-slot": "assistant-panel-launcher",
			children: launcher ?? (open ? "−" : "+")
		})]
	});
}
//#endregion
export { AssistantPanel };

//# sourceMappingURL=AssistantPanel.mjs.map