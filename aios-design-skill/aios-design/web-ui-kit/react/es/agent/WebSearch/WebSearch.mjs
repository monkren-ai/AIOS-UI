import { cn } from "../../lib/utils.mjs";
import { ActivityLabel } from "../ActivityLabel/ActivityLabel.mjs";
import { webSearchResultVariants, webSearchVariants } from "./web-search-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Collapsible } from "@base-ui/react/collapsible";
//#region src/agent/WebSearch/WebSearch.tsx
function WebSearch({ query, results = [], status = "complete", label = "已搜索网页 / Searched the web", activeLabel = "正在搜索网页 / Searching the web", open, defaultOpen = true, onOpenChange, className, ref, ...props }) {
	const running = status === "running";
	return /* @__PURE__ */ jsxs(Collapsible.Root, {
		ref,
		open,
		defaultOpen,
		onOpenChange: (nextOpen) => onOpenChange?.(nextOpen),
		className: cn(webSearchVariants({ status }), className),
		"data-slot": "web-search",
		"data-status": status,
		"aria-busy": running || void 0,
		...props,
		children: [/* @__PURE__ */ jsxs(Collapsible.Trigger, {
			className: "group flex min-h-12 w-full items-center gap-3 px-3 text-start focus-visible:outline-2 focus-visible:outline-interactive",
			children: [
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "transition-transform duration-200 group-data-[panel-open]:rotate-90 motion-reduce:transition-none",
					children: "›"
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx(ActivityLabel, {
						active: running,
						label,
						activeLabel,
						status: status === "error" ? "error" : "default"
					}), /* @__PURE__ */ jsxs("span", {
						className: "ms-2 font-mono text-caption text-foreground-muted",
						children: [
							"“",
							query,
							"”"
						]
					})]
				}),
				/* @__PURE__ */ jsx("span", {
					className: "font-mono text-caption tabular-nums text-foreground-muted",
					children: results.length
				})
			]
		}), /* @__PURE__ */ jsx(Collapsible.Panel, {
			className: "h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0",
			children: /* @__PURE__ */ jsx("ul", {
				className: "grid gap-2 border-t border-border p-3 sm:grid-cols-2",
				"data-slot": "web-search-results",
				children: results.map((result) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
					href: result.url,
					target: "_blank",
					rel: "noreferrer noopener",
					className: webSearchResultVariants(),
					"data-slot": "web-search-result",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-sm text-foreground",
							children: result.title
						}),
						/* @__PURE__ */ jsx("span", {
							className: "font-mono text-caption text-foreground-muted",
							children: result.domain ?? result.url
						}),
						result.description && /* @__PURE__ */ jsx("span", {
							className: "line-clamp-2 text-caption text-foreground-muted",
							children: result.description
						})
					]
				}) }, result.url))
			})
		})]
	});
}
//#endregion
export { WebSearch };

//# sourceMappingURL=WebSearch.mjs.map