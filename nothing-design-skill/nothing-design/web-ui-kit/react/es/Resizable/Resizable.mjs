import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Resizable.css";
//#region src/Resizable/Resizable.tsx
const resizableVariants = cva("nothing-resizable", {
	variants: { direction: {
		horizontal: "nothing-resizable--horizontal",
		vertical: "nothing-resizable--vertical"
	} },
	defaultVariants: { direction: "horizontal" }
});
const Resizable = React.forwardRef(({ className, direction = "horizontal", initialSizes, minSizes, maxSizes, children, ...props }, ref) => {
	const childArray = React.Children.toArray(children);
	const panelCount = childArray.length;
	const defaultSizes = initialSizes ?? Array(panelCount).fill(100 / panelCount);
	const mins = minSizes ?? Array(panelCount).fill(10);
	const maxs = maxSizes ?? Array(panelCount).fill(90);
	const [sizes, setSizes] = React.useState(defaultSizes);
	const [activeHandle, setActiveHandle] = React.useState(null);
	const containerRef = React.useRef(null);
	const startPos = React.useRef(0);
	const startSizes = React.useRef([]);
	const isHorizontal = direction === "horizontal";
	const handleMouseDown = React.useCallback((index, e) => {
		e.preventDefault();
		setActiveHandle(index);
		startPos.current = isHorizontal ? e.clientX : e.clientY;
		startSizes.current = [...sizes];
	}, [isHorizontal, sizes]);
	const handleKeyDown = React.useCallback((index, e) => {
		const step = 2;
		let delta = 0;
		if (isHorizontal) {
			if (e.key === "ArrowLeft") delta = -2;
			else if (e.key === "ArrowRight") delta = step;
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
		maxs
	]);
	React.useEffect(() => {
		if (activeHandle === null) return;
		const handleMouseMove = (e) => {
			const currentPos = isHorizontal ? e.clientX : e.clientY;
			const containerEl = containerRef.current;
			if (!containerEl) return;
			const containerSize = isHorizontal ? containerEl.offsetWidth : containerEl.offsetHeight;
			const diffPercent = (currentPos - startPos.current) / containerSize * 100;
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
		maxs
	]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(resizableVariants({ direction }), className),
		"data-direction": dataAttr(direction),
		...props,
		children: childArray.map((child, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsx("div", {
			className: "nothing-resizable__panel",
			style: { flex: `0 0 ${sizes[index]}%` },
			children: child
		}), index < panelCount - 1 && /* @__PURE__ */ jsx("div", {
			className: cn("nothing-resizable__handle", `nothing-resizable__handle--${direction}`, activeHandle === index && "nothing-resizable__handle--active"),
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
});
Resizable.displayName = "Resizable";
//#endregion
export { Resizable as default, resizableVariants };

//# sourceMappingURL=Resizable.mjs.map