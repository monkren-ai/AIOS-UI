import { useCallback, useEffect, useRef, useState } from "react";
//#region src/hooks/useProximityHover.ts
/**
* Proximity Hover Hook
*
* 根据鼠标位置在容器内的子项中计算“最近”项，用于实现 hover preview 效果。
* 参考 fluid-functionalism 的 use-proximity-hover，适配为纯 JS + CSS Variables。
*/
function useProximityHover(containerRef, options = {}) {
	const { axis = "y" } = options;
	const [activeIndex, setActiveIndex] = useState(null);
	const [isMeasured, setIsMeasured] = useState(false);
	const itemElementsRef = useRef(/* @__PURE__ */ new Map());
	const itemRectsRef = useRef([]);
	const isInsideRef = useRef(false);
	const rafRef = useRef(null);
	const measureItems = useCallback(() => {
		const elements = Array.from(itemElementsRef.current.entries()).sort(([a], [b]) => a - b).map(([, el]) => el);
		if (elements.length === 0) {
			itemRectsRef.current = [];
			setIsMeasured(false);
			return;
		}
		const containerRect = containerRef.current?.getBoundingClientRect();
		const containerX = containerRect?.left ?? 0;
		const containerY = containerRect?.top ?? 0;
		itemRectsRef.current = elements.map((el) => {
			const rect = el.getBoundingClientRect();
			return {
				top: rect.top - containerY,
				height: rect.height,
				left: rect.left - containerX,
				width: rect.width
			};
		});
		setIsMeasured(true);
	}, [containerRef]);
	const remeasure = useCallback(() => {
		setIsMeasured(false);
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(() => {
			measureItems();
			rafRef.current = null;
		});
	}, [measureItems]);
	const registerItem = useCallback((index, element) => {
		if (element) itemElementsRef.current.set(index, element);
		else itemElementsRef.current.delete(index);
		remeasure();
	}, [remeasure]);
	const findNearestIndex = useCallback((clientX, clientY) => {
		const container = containerRef.current;
		if (!container) return null;
		const containerRect = container.getBoundingClientRect();
		const x = clientX - containerRect.left;
		const y = clientY - containerRect.top;
		let nearest = null;
		let nearestDist = Infinity;
		itemRectsRef.current.forEach((rect, index) => {
			let dist = Infinity;
			if (axis === "y") {
				const centerY = rect.top + rect.height / 2;
				dist = Math.abs(y - centerY);
			} else if (axis === "x") {
				const centerX = rect.left + rect.width / 2;
				dist = Math.abs(x - centerX);
			} else {
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				dist = Math.hypot(x - centerX, y - centerY);
			}
			if (dist < nearestDist) {
				nearestDist = dist;
				nearest = index;
			}
		});
		return nearest;
	}, [axis, containerRef]);
	const handleMouseMove = useCallback((e) => {
		if (!isInsideRef.current) return;
		const nextIndex = findNearestIndex(e.clientX, e.clientY);
		setActiveIndex((prev) => prev === nextIndex ? prev : nextIndex);
	}, [findNearestIndex]);
	const handleMouseEnter = useCallback(() => {
		isInsideRef.current = true;
		measureItems();
	}, [measureItems]);
	const handleMouseLeave = useCallback(() => {
		isInsideRef.current = false;
		setActiveIndex(null);
	}, []);
	useEffect(() => {
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);
	return {
		activeIndex,
		setActiveIndex,
		itemRects: itemRectsRef.current,
		isMeasured,
		registerItem,
		remeasure,
		handlers: {
			onMouseMove: handleMouseMove,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave
		}
	};
}
//#endregion
export { useProximityHover };

//# sourceMappingURL=useProximityHover.mjs.map