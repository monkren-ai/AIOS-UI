import { cn } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./Pagination.css";
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
const Pagination = React$1.forwardRef(({ className, page, totalPages, onPageChange, siblingCount = 1, ...props }, ref) => {
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
		if (e.key === "ArrowRight") {
			e.preventDefault();
			handlePageChange(page + 1);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			handlePageChange(page - 1);
		}
	}, [page, handlePageChange]);
	if (totalPages <= 1) return null;
	return /* @__PURE__ */ jsx("nav", {
		ref,
		className: cn("nothing-pagination", className),
		"aria-label": "Pagination",
		onKeyDown: handleKeyDown,
		"data-page": page,
		"data-total": totalPages,
		...props,
		children: /* @__PURE__ */ jsxs("ul", {
			className: "nothing-pagination__list",
			children: [
				/* @__PURE__ */ jsx("li", {
					className: "nothing-pagination__item",
					children: /* @__PURE__ */ jsx("button", {
						className: cn("nothing-pagination__button", page <= 1 && "nothing-pagination__button--disabled"),
						onClick: () => handlePageChange(page - 1),
						disabled: page <= 1,
						"aria-label": "Previous page",
						type: "button",
						children: "‹"
					})
				}),
				pages.map((p, index) => {
					if (p === "ellipsis") return /* @__PURE__ */ jsx("li", {
						className: "nothing-pagination__item",
						children: /* @__PURE__ */ jsx("span", {
							className: "nothing-pagination__ellipsis",
							children: "…"
						})
					}, `ellipsis-${index}`);
					const isActive = p === page;
					return /* @__PURE__ */ jsx("li", {
						className: "nothing-pagination__item",
						children: /* @__PURE__ */ jsx("button", {
							className: cn("nothing-pagination__button", isActive && "nothing-pagination__button--active"),
							onClick: () => handlePageChange(p),
							"aria-current": isActive ? "page" : void 0,
							"aria-label": `Page ${p}`,
							type: "button",
							children: p
						})
					}, p);
				}),
				/* @__PURE__ */ jsx("li", {
					className: "nothing-pagination__item",
					children: /* @__PURE__ */ jsx("button", {
						className: cn("nothing-pagination__button", page >= totalPages && "nothing-pagination__button--disabled"),
						onClick: () => handlePageChange(page + 1),
						disabled: page >= totalPages,
						"aria-label": "Next page",
						type: "button",
						children: "›"
					})
				})
			]
		})
	});
});
Pagination.displayName = "Pagination";
//#endregion
export { Pagination as default };

//# sourceMappingURL=Pagination.mjs.map