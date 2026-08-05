import { cn, dataAttr } from "../lib/utils.mjs";
import { segmentVariants, segmentedHoverSliderVariants, segmentedSliderVariants, segmentedVariants } from "./segmented-control-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/SegmentedControl/SegmentedControl.tsx
/**
* 把 `offsetLeft` 这类物理偏移换算成 inline-start 偏移。
* slider 用 `inset-inline-start` 定位，RTL 下必须翻面。
*/
function toInlineStart(container, offsetLeft, width) {
	if (!container) return offsetLeft;
	if (getComputedStyle(container).direction !== "rtl") return offsetLeft;
	return container.clientWidth - offsetLeft - width;
}
function SegmentedControl({ className, segments, activeIndex: controlledIndex, variant = "pill", disabled = false, proximity = false, onChange, ref, ...props }) {
	const [internalIndex, setInternalIndex] = React.useState(0);
	const [sliderStyle, setSliderStyle] = React.useState({});
	const [hoverIndex, setHoverIndex] = React.useState(null);
	const [hoverStyle, setHoverStyle] = React.useState({ opacity: 0 });
	const rootRef = React.useRef(null);
	const segmentRefs = React.useRef([]);
	const activeIdx = controlledIndex !== void 0 ? controlledIndex : internalIndex;
	const rovingIdx = activeIdx >= 0 && activeIdx < segments.length ? activeIdx : 0;
	const setRootRef = React.useCallback((node) => {
		rootRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const updateSlider = React.useCallback(() => {
		const activeSegment = segmentRefs.current[activeIdx];
		if (activeSegment) setSliderStyle({
			width: activeSegment.offsetWidth,
			insetInlineStart: toInlineStart(rootRef.current, activeSegment.offsetLeft, activeSegment.offsetWidth)
		});
	}, [activeIdx]);
	React.useLayoutEffect(() => {
		updateSlider();
	}, [updateSlider]);
	const updateHoverSlider = React.useCallback((index) => {
		if (index == null) {
			setHoverStyle((prev) => ({
				...prev,
				opacity: 0
			}));
			return;
		}
		const seg = segmentRefs.current[index];
		if (!seg) return;
		setHoverStyle({
			width: seg.offsetWidth,
			insetInlineStart: toInlineStart(rootRef.current, seg.offsetLeft, seg.offsetWidth),
			opacity: 1
		});
	}, []);
	React.useLayoutEffect(() => {
		updateHoverSlider(hoverIndex);
	}, [hoverIndex, updateHoverSlider]);
	const handleSelect = (index) => {
		if (disabled) return;
		if (controlledIndex === void 0) setInternalIndex(index);
		onChange?.(index);
	};
	/**
	* radiogroup 的方向键要同时移动焦点与选中态。
	* 左右键在 RTL 下含义相反，上下键则始终按 DOM 顺序走。
	*/
	const handleKeyDown = (event, index) => {
		if (disabled) return;
		const count = segments.length;
		if (count === 0) return;
		const rtl = rootRef.current ? getComputedStyle(rootRef.current).direction === "rtl" : false;
		let next;
		switch (event.key) {
			case "ArrowRight":
				next = index + (rtl ? -1 : 1);
				break;
			case "ArrowLeft":
				next = index + (rtl ? 1 : -1);
				break;
			case "ArrowDown":
				next = index + 1;
				break;
			case "ArrowUp":
				next = index - 1;
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = count - 1;
				break;
			default: return;
		}
		event.preventDefault();
		const target = (next % count + count) % count;
		segmentRefs.current[target]?.focus();
		handleSelect(target);
	};
	const handleMouseMove = (e) => {
		if (!proximity || disabled) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		let nearest = 0;
		let nearestDist = Infinity;
		segmentRefs.current.forEach((seg, i) => {
			if (!seg) return;
			const center = seg.offsetLeft + seg.offsetWidth / 2;
			const dist = Math.abs(x - center);
			if (dist < nearestDist) {
				nearestDist = dist;
				nearest = i;
			}
		});
		setHoverIndex(nearest);
	};
	const handleMouseLeave = () => {
		setHoverIndex(null);
	};
	return /* @__PURE__ */ jsxs("div", {
		ref: setRootRef,
		className: cn(segmentedVariants({
			variant,
			disabled,
			proximity
		}), className),
		"data-slot": "segmented-control",
		"data-variant": dataAttr(variant),
		"data-disabled": dataAttr(disabled),
		"data-proximity": dataAttr(proximity),
		role: "radiogroup",
		onMouseMove: handleMouseMove,
		onMouseLeave: handleMouseLeave,
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: segmentedSliderVariants({ variant }),
				"data-slot": "segmented-control-slider",
				style: sliderStyle,
				"aria-hidden": "true"
			}),
			proximity && /* @__PURE__ */ jsx("div", {
				className: segmentedHoverSliderVariants({ variant }),
				"data-slot": "segmented-control-hover-slider",
				style: hoverStyle,
				"aria-hidden": "true"
			}),
			segments.map((segment, index) => /* @__PURE__ */ jsx("button", {
				ref: (el) => {
					segmentRefs.current[index] = el;
				},
				className: cn(segmentVariants({
					active: index === activeIdx,
					hovered: index === hoverIndex
				})),
				"data-slot": "segmented-control-segment",
				onClick: () => handleSelect(index),
				onKeyDown: (event) => handleKeyDown(event, index),
				disabled: !!disabled,
				type: "button",
				role: "radio",
				"aria-checked": index === activeIdx,
				tabIndex: index === rovingIdx ? 0 : -1,
				"data-state": dataAttr(index === activeIdx ? "active" : "inactive"),
				children: segment
			}, index))
		]
	});
}
SegmentedControl.displayName = "SegmentedControl";
//#endregion
export { SegmentedControl as default };

//# sourceMappingURL=SegmentedControl.mjs.map