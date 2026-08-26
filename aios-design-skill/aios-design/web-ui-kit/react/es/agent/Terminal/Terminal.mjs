import { cn } from "../../lib/utils.mjs";
import { terminalVariants } from "./terminal-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/agent/Terminal/Terminal.tsx
function Terminal({ command, running = false, exitCode = 0, runningLabel = "运行中 / Running", className, children, ref, ...props }) {
	const failed = !running && exitCode !== 0;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(terminalVariants({ failed }), className),
		"data-slot": "terminal",
		"data-running": running || void 0,
		"data-exit-code": running ? void 0 : exitCode,
		"aria-busy": running || void 0,
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex min-h-11 items-center justify-between gap-3 border-b border-border px-3",
			children: [/* @__PURE__ */ jsxs("code", {
				className: "min-w-0 truncate",
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "me-2 text-foreground-disabled",
					children: "$"
				}), command]
			}), /* @__PURE__ */ jsx("span", {
				role: "status",
				"aria-live": "polite",
				className: cn("shrink-0 text-caption text-foreground-muted", failed && "text-accent"),
				children: running ? runningLabel : `exit ${exitCode}`
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex min-h-12 flex-col gap-1 overflow-auto p-3 whitespace-pre text-foreground-muted",
			"data-slot": "terminal-output",
			children: [children, running && /* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				className: "h-4 w-2 animate-pulse bg-foreground motion-reduce:animate-none"
			})]
		})]
	});
}
function TerminalLine({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("min-h-5 motion-safe:animate-[aios-fade-in_var(--duration-micro)_ease-out]", className),
		"data-slot": "terminal-line",
		...props
	});
}
//#endregion
export { Terminal, TerminalLine };

//# sourceMappingURL=Terminal.mjs.map