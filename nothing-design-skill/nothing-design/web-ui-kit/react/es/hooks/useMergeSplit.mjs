import { useCallback, useRef } from "react";
//#region src/hooks/useMergeSplit.ts
function useMergeSplit(containerRef, options = {}) {
	options.axis;
	const itemElementsRef = useRef(/* @__PURE__ */ new Map());
	const registerItem = useCallback((index, element) => {
		if (element) itemElementsRef.current.set(index, element);
		else itemElementsRef.current.delete(index);
	}, []);
	return {
		calculateMerge: useCallback((selectedIndices) => {
			const container = containerRef.current;
			if (!container || selectedIndices.length === 0) return {
				hasSelection: false,
				left: 0,
				top: 0,
				width: 0,
				height: 0
			};
			const containerRect = container.getBoundingClientRect();
			const rects = selectedIndices.map((idx) => itemElementsRef.current.get(idx)).filter(Boolean).map((el) => el.getBoundingClientRect());
			if (rects.length === 0) return {
				hasSelection: false,
				left: 0,
				top: 0,
				width: 0,
				height: 0
			};
			const minLeft = Math.min(...rects.map((r) => r.left));
			const maxRight = Math.max(...rects.map((r) => r.right));
			const minTop = Math.min(...rects.map((r) => r.top));
			const maxBottom = Math.max(...rects.map((r) => r.bottom));
			return {
				hasSelection: true,
				left: minLeft - containerRect.left,
				top: minTop - containerRect.top,
				width: maxRight - minLeft,
				height: maxBottom - minTop
			};
		}, [containerRef]),
		registerItem
	};
}
//#endregion
export { useMergeSplit };

//# sourceMappingURL=useMergeSplit.mjs.map