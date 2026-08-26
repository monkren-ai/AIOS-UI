import { cn } from "../lib/utils.mjs";
import { codeDiffLineVariants, codeDiffVariants } from "./code-diff-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/CodeDiff/CodeDiff.tsx
function CodeDiff({ filename, lines, summaryLabel, className, ref, ...props }) {
	const additions = lines.filter((line) => line.type === "add").length;
	const removals = lines.filter((line) => line.type === "remove").length;
	const summary = summaryLabel ?? `${additions} 行新增 / additions, ${removals} 行删除 / deletions`;
	return /* @__PURE__ */ jsxs("figure", {
		ref,
		className: cn(codeDiffVariants(), className),
		"data-slot": "code-diff",
		...props,
		children: [/* @__PURE__ */ jsxs("figcaption", {
			className: "flex min-h-11 items-center justify-between gap-3 border-b border-border px-3 text-label uppercase",
			children: [/* @__PURE__ */ jsx("span", {
				className: "truncate",
				children: filename
			}), /* @__PURE__ */ jsxs("span", {
				"aria-label": summary,
				children: [
					"+",
					additions,
					" / −",
					removals
				]
			})]
		}), /* @__PURE__ */ jsx("code", {
			className: "block overflow-auto py-3 leading-6",
			"data-slot": "code-diff-body",
			children: lines.map((line, index) => {
				const type = line.type ?? "context";
				return /* @__PURE__ */ jsxs("span", {
					className: codeDiffLineVariants({ type }),
					"data-slot": "code-diff-line",
					"data-type": type,
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground-disabled",
							children: line.oldLine ?? ""
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground-disabled",
							children: line.newLine ?? ""
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": true,
							children: type === "add" ? "+" : type === "remove" ? "−" : " "
						}),
						/* @__PURE__ */ jsx("span", {
							className: "whitespace-pre",
							children: line.content || " "
						})
					]
				}, `${line.oldLine}-${line.newLine}-${index}`);
			})
		})]
	});
}
//#endregion
export { CodeDiff };

//# sourceMappingURL=CodeDiff.mjs.map