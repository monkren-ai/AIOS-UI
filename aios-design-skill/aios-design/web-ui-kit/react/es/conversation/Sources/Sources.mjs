import { cn } from "../../lib/utils.mjs";
import { sourceVariants, sourcesVariants } from "./sources-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Collapsible } from "@base-ui/react/collapsible";
//#region src/conversation/Sources/Sources.tsx
const SourcesContext = React$1.createContext(false);
function Sources({ label = "来源 / Sources", count, open, defaultOpen = false, onOpenChange, children, className }) {
	const resolvedCount = count ?? React$1.Children.count(children);
	return /* @__PURE__ */ jsxs(Collapsible.Root, {
		open,
		defaultOpen,
		onOpenChange,
		className: cn(sourcesVariants(), className),
		"data-slot": "sources",
		children: [/* @__PURE__ */ jsxs(Collapsible.Trigger, {
			className: "flex min-h-11 w-full items-center justify-between gap-3 px-3 font-mono text-caption uppercase focus-visible:outline-2 focus-visible:outline-interactive",
			children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsx("span", { children: resolvedCount })]
		}), /* @__PURE__ */ jsx(Collapsible.Panel, {
			className: "h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0",
			children: /* @__PURE__ */ jsx(SourcesContext.Provider, {
				value: true,
				children: /* @__PURE__ */ jsx("div", {
					className: "grid gap-2 p-3 pt-0 sm:grid-cols-2",
					"data-slot": "sources-list",
					children
				})
			})
		})]
	});
}
function Source({ domain, title, icon, className, ref, ...props }) {
	if (!React$1.useContext(SourcesContext)) throw new Error("<Source> must be used inside <Sources>");
	return /* @__PURE__ */ jsxs("a", {
		ref,
		target: "_blank",
		rel: "noreferrer noopener",
		className: cn(sourceVariants(), className),
		"data-slot": "source",
		...props,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex items-center gap-2 font-mono text-caption uppercase text-foreground-muted",
			children: [/* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				className: "grid size-5 place-items-center rounded-xs border border-border",
				children: icon ?? domain.charAt(0).toUpperCase()
			}), domain]
		}), /* @__PURE__ */ jsx("span", {
			className: "line-clamp-2 text-foreground",
			children: title
		})]
	});
}
//#endregion
export { Source, Sources };

//# sourceMappingURL=Sources.mjs.map