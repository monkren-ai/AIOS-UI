import { cn } from "../../lib/utils.mjs";
import { keywordTagVariants } from "./keyword-tag-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/conversation/KeywordTag/KeywordTag.tsx
function KeywordTag({ kind, icon, onRemove, removeLabel = "移除标签 / Remove tag", className, children, ref, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(keywordTagVariants({ kind }), className),
		"data-slot": "keyword-tag",
		"data-kind": kind ?? "context",
		...props,
		children: [
			icon && /* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				children: icon
			}),
			/* @__PURE__ */ jsx("span", { children }),
			onRemove && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "-me-1 grid size-9 place-items-center rounded-button hover:bg-muted",
				"aria-label": removeLabel,
				onClick: onRemove,
				children: "×"
			})
		]
	});
}
//#endregion
export { KeywordTag };

//# sourceMappingURL=KeywordTag.mjs.map