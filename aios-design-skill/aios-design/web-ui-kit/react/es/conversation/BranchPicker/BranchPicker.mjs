import { cn } from "../../lib/utils.mjs";
import { branchPickerVariants } from "./branch-picker-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/conversation/BranchPicker/BranchPicker.tsx
function BranchPicker({ current, total, onPrevious, onNext, previousLabel = "上一个分支 / Previous branch", nextLabel = "下一个分支 / Next branch", className, ref, ...props }) {
	const safeTotal = Math.max(1, total);
	const safeCurrent = Math.max(1, Math.min(current, safeTotal));
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(branchPickerVariants(), className),
		"data-slot": "branch-picker",
		...props,
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "size-11 rounded-button hover:bg-muted disabled:opacity-40",
				disabled: safeCurrent <= 1,
				onClick: onPrevious,
				"aria-label": previousLabel,
				children: "‹"
			}),
			/* @__PURE__ */ jsxs("span", {
				"aria-live": "polite",
				className: "min-w-12 text-center tabular-nums",
				children: [
					safeCurrent,
					" / ",
					safeTotal
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "size-11 rounded-button hover:bg-muted disabled:opacity-40",
				disabled: safeCurrent >= safeTotal,
				onClick: onNext,
				"aria-label": nextLabel,
				children: "›"
			})
		]
	});
}
//#endregion
export { BranchPicker };

//# sourceMappingURL=BranchPicker.mjs.map