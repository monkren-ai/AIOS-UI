import { cn, dataAttr } from "../lib/utils.mjs";
import { paginationArrowVariants, paginationButtonVariants, paginationEllipsisVariants, paginationItemVariants, paginationListVariants, paginationVariants } from "./pagination-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Pagination/Pagination.tsx
const range = (start, end) => {
	const length = end - start + 1;
	return Array.from({ length }, (_, i) => start + i);
};
const usePagination = (page, totalPages, siblingCount) => {
	if (totalPages <= siblingCount * 2 + 5) return range(1, totalPages);
	const leftSiblingIndex = Math.max(page - siblingCount, 1);
	const rightSiblingIndex = Math.min(page + siblingCount, totalPages);
	const showLeftEllipsis = leftSiblingIndex > 2;
	const showRightEllipsis = rightSiblingIndex < totalPages - 1;
	if (!showLeftEllipsis && showRightEllipsis) return [
		...range(1, 3 + 2 * siblingCount),
		"ellipsis",
		totalPages
	];
	if (showLeftEllipsis && !showRightEllipsis) return [
		1,
		"ellipsis",
		...range(totalPages - (3 + 2 * siblingCount) + 1, totalPages)
	];
	return [
		1,
		"ellipsis",
		...range(leftSiblingIndex, rightSiblingIndex),
		"ellipsis",
		totalPages
	];
};
function Pagination({ className, page, totalPages, onPageChange, siblingCount = 1, ...props }) {
	const pages = usePagination(page, totalPages, siblingCount);
	const handlePageChange = React$1.useCallback((p) => {
		if (p < 1 || p > totalPages || p === page) return;
		onPageChange(p);
	}, [
		page,
		totalPages,
		onPageChange
	]);
	const handleKeyDown = React$1.useCallback((e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		e.preventDefault();
		const forwardKey = getComputedStyle(e.currentTarget).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
		handlePageChange(e.key === forwardKey ? page + 1 : page - 1);
	}, [page, handlePageChange]);
	if (totalPages <= 1) return null;
	const isFirst = page <= 1;
	const isLast = page >= totalPages;
	return /* @__PURE__ */ jsx("nav", {
		className: cn(paginationVariants(), className),
		"data-slot": "pagination",
		"aria-label": "Pagination",
		onKeyDown: handleKeyDown,
		"data-page": page,
		"data-total": totalPages,
		...props,
		children: /* @__PURE__ */ jsxs("ul", {
			className: paginationListVariants(),
			"data-slot": "pagination-list",
			children: [
				/* @__PURE__ */ jsx("li", {
					className: paginationItemVariants(),
					"data-slot": "pagination-item",
					children: /* @__PURE__ */ jsx("button", {
						className: paginationButtonVariants({ disabled: isFirst }),
						"data-slot": "pagination-button",
						"data-direction": "previous",
						"data-disabled": dataAttr(isFirst),
						onClick: () => handlePageChange(page - 1),
						disabled: isFirst,
						"aria-label": "Previous page",
						type: "button",
						children: /* @__PURE__ */ jsx("span", {
							className: paginationArrowVariants(),
							"aria-hidden": "true",
							children: "‹"
						})
					})
				}),
				pages.map((p, index) => {
					if (p === "ellipsis") return /* @__PURE__ */ jsx("li", {
						className: paginationItemVariants(),
						"data-slot": "pagination-item",
						children: /* @__PURE__ */ jsx("span", {
							className: paginationEllipsisVariants(),
							"data-slot": "pagination-ellipsis",
							children: "…"
						})
					}, `ellipsis-${index}`);
					const isActive = p === page;
					return /* @__PURE__ */ jsx("li", {
						className: paginationItemVariants(),
						"data-slot": "pagination-item",
						children: /* @__PURE__ */ jsx("button", {
							className: paginationButtonVariants({ active: isActive }),
							"data-slot": "pagination-button",
							"data-active": dataAttr(isActive),
							onClick: () => handlePageChange(p),
							"aria-current": isActive ? "page" : void 0,
							"aria-label": `Page ${p}`,
							type: "button",
							children: p
						})
					}, p);
				}),
				/* @__PURE__ */ jsx("li", {
					className: paginationItemVariants(),
					"data-slot": "pagination-item",
					children: /* @__PURE__ */ jsx("button", {
						className: paginationButtonVariants({ disabled: isLast }),
						"data-slot": "pagination-button",
						"data-direction": "next",
						"data-disabled": dataAttr(isLast),
						onClick: () => handlePageChange(page + 1),
						disabled: isLast,
						"aria-label": "Next page",
						type: "button",
						children: /* @__PURE__ */ jsx("span", {
							className: paginationArrowVariants(),
							"aria-hidden": "true",
							children: "›"
						})
					})
				})
			]
		})
	});
}
Pagination.displayName = "Pagination";
//#endregion
export { Pagination as default };

//# sourceMappingURL=Pagination.mjs.map