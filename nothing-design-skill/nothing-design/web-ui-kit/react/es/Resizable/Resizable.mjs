import { cn, dataAttr } from "../lib/utils.mjs";
import { resizableHandleVariants, resizablePanelVariants, resizableVariants } from "./resizable-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Resizable/Resizable.tsx
function Resizable({ className, direction = "horizontal", initialSizes, minSizes, maxSizes, children, ref, ...props }) {
	const childArray = React$1.Children.toArray(children);
	const panelCount = childArray.length;
	const defaultSizes = initialSizes ?? Array(panelCount).fill(100 / panelCount);
	const mins = minSizes ?? Array(panelCount).fill(10);
	const maxs = maxSizes ?? Array(panelCount).fill(90);
	const [sizes, setSizes] = React$1.useState(defaultSizes);
	const [activeHandle, setActiveHandle] = React$1.useState(null);
	const containerRef = React$1.useRef(null);
	const startPos = React$1.useRef(0);
	const startSizes = React$1.useRef([]);
	const isHorizontal = direction === "horizontal";
	const setRefs = React$1.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	/**
	* 横向分栏在 `dir="rtl"` 下由 flex 镜像过：视觉上的「第一个面板」在右侧，
	* 所以指针 / 方向键的位移要取反，拖拽方向才跟手。
	*/
	const getFlowSign = React$1.useCallback(() => {
		if (!isHorizontal) return 1;
		const node = containerRef.current;
		if (!node || typeof window === "undefined") return 1;
		return window.getComputedStyle(node).direction === "rtl" ? -1 : 1;
	}, [isHorizontal]);
	const handleMouseDown = React$1.useCallback((index, e) => {
		e.preventDefault();
		setActiveHandle(index);
		startPos.current = isHorizontal ? e.clientX : e.clientY;
		startSizes.current = [...sizes];
	}, [isHorizontal, sizes]);
	const handleKeyDown = React$1.useCallback((index, e) => {
		const step = 2;
		let delta = 0;
		if (isHorizontal) {
			if (e.key === "ArrowLeft") delta = -2;
			else if (e.key === "ArrowRight") delta = step;
			delta *= getFlowSign();
		} else if (e.key === "ArrowUp") delta = -2;
		else if (e.key === "ArrowDown") delta = step;
		if (delta === 0) return;
		e.preventDefault();
		setSizes((prev) => {
			const next = [...prev];
			const leftIdx = index;
			const rightIdx = index + 1;
			const newLeft = Math.max(mins[leftIdx], Math.min(maxs[leftIdx], next[leftIdx] + delta));
			const diff = newLeft - next[leftIdx];
			const newRight = next[rightIdx] - diff;
			if (newRight < mins[rightIdx] || newRight > maxs[rightIdx]) return prev;
			next[leftIdx] = newLeft;
			next[rightIdx] = newRight;
			return next;
		});
	}, [
		isHorizontal,
		mins,
		maxs,
		getFlowSign
	]);
	React$1.useEffect(() => {
		if (activeHandle === null) return;
		const handleMouseMove = (e) => {
			const currentPos = isHorizontal ? e.clientX : e.clientY;
			const containerEl = containerRef.current;
			if (!containerEl) return;
			const containerSize = isHorizontal ? containerEl.offsetWidth : containerEl.offsetHeight;
			if (!containerSize) return;
			const diffPercent = (currentPos - startPos.current) * getFlowSign() / containerSize * 100;
			setSizes(() => {
				const next = [...startSizes.current];
				const leftIdx = activeHandle;
				const rightIdx = activeHandle + 1;
				const newLeft = Math.max(mins[leftIdx], Math.min(maxs[leftIdx], next[leftIdx] + diffPercent));
				const actualDiff = newLeft - next[leftIdx];
				const newRight = next[rightIdx] - actualDiff;
				if (newRight < mins[rightIdx]) return next;
				next[leftIdx] = newLeft;
				next[rightIdx] = newRight;
				return next;
			});
		};
		const handleMouseUp = () => setActiveHandle(null);
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [
		activeHandle,
		isHorizontal,
		mins,
		maxs,
		getFlowSign
	]);
	return /* @__PURE__ */ jsx("div", {
		ref: setRefs,
		className: cn(resizableVariants({ direction }), className),
		"data-slot": "resizable",
		"data-direction": dataAttr(direction),
		...props,
		children: childArray.map((child, index) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [/* @__PURE__ */ jsx("div", {
			className: resizablePanelVariants(),
			"data-slot": "resizable-panel",
			"data-index": index,
			style: { flex: `0 0 ${sizes[index]}%` },
			children: child
		}), index < panelCount - 1 && /* @__PURE__ */ jsx("div", {
			className: resizableHandleVariants({
				direction,
				active: activeHandle === index
			}),
			"data-slot": "resizable-handle",
			"data-direction": dataAttr(direction),
			"data-active": dataAttr(activeHandle === index),
			role: "separator",
			"aria-orientation": isHorizontal ? "vertical" : "horizontal",
			"aria-valuenow": Math.round(sizes[index]),
			"aria-valuemin": mins[index],
			"aria-valuemax": maxs[index],
			tabIndex: 0,
			onMouseDown: (e) => handleMouseDown(index, e),
			onKeyDown: (e) => handleKeyDown(index, e)
		})] }, index))
	});
}
Resizable.displayName = "Resizable";
//#endregion
export { Resizable as default };

//# sourceMappingURL=Resizable.mjs.map