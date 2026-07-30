import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./SegmentedControl.css";
//#region src/SegmentedControl/SegmentedControl.tsx
const segmentedVariants = cva("nothing-segmented", {
	variants: {
		variant: {
			pill: "",
			rounded: "nothing-segmented--rounded"
		},
		disabled: {
			true: "nothing-segmented--disabled",
			false: ""
		},
		proximity: {
			true: "nothing-segmented--proximity",
			false: ""
		}
	},
	defaultVariants: {
		variant: "pill",
		disabled: false,
		proximity: false
	}
});
const segmentVariants = cva("nothing-segmented__segment", {
	variants: {
		active: {
			true: "nothing-segmented__segment--active",
			false: ""
		},
		hovered: {
			true: "nothing-segmented__segment--hovered",
			false: ""
		}
	},
	defaultVariants: {
		active: false,
		hovered: false
	}
});
const SegmentedControl = React.forwardRef(({ className, segments, activeIndex: controlledIndex, variant = "pill", disabled = false, proximity = false, onChange, ...props }, ref) => {
	const [internalIndex, setInternalIndex] = React.useState(0);
	const [sliderStyle, setSliderStyle] = React.useState({});
	const [hoverIndex, setHoverIndex] = React.useState(null);
	const [hoverStyle, setHoverStyle] = React.useState({ opacity: 0 });
	const segmentRefs = React.useRef([]);
	const activeIdx = controlledIndex !== void 0 ? controlledIndex : internalIndex;
	const updateSlider = React.useCallback(() => {
		const activeSegment = segmentRefs.current[activeIdx];
		if (activeSegment) setSliderStyle({
			width: activeSegment.offsetWidth,
			left: activeSegment.offsetLeft
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
			left: seg.offsetLeft,
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
		ref,
		className: cn(segmentedVariants({
			variant,
			disabled,
			proximity
		}), className),
		"data-variant": dataAttr(variant),
		"data-disabled": dataAttr(disabled),
		"data-proximity": dataAttr(proximity),
		role: "tablist",
		onMouseMove: handleMouseMove,
		onMouseLeave: handleMouseLeave,
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "nothing-segmented__slider",
				style: sliderStyle
			}),
			proximity && /* @__PURE__ */ jsx("div", {
				className: "nothing-segmented__hover-slider",
				style: hoverStyle
			}),
			segments.map((segment, index) => /* @__PURE__ */ jsx("button", {
				ref: (el) => {
					segmentRefs.current[index] = el;
				},
				className: cn(segmentVariants({
					active: index === activeIdx,
					hovered: index === hoverIndex
				})),
				onClick: () => handleSelect(index),
				disabled: !!disabled,
				role: "tab",
				"aria-selected": index === activeIdx,
				"data-state": dataAttr(index === activeIdx ? "active" : "inactive"),
				children: segment
			}, index))
		]
	});
});
SegmentedControl.displayName = "SegmentedControl";
//#endregion
export { SegmentedControl, SegmentedControl as default, segmentVariants, segmentedVariants };

//# sourceMappingURL=SegmentedControl.mjs.map