import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
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
		}
	},
	defaultVariants: {
		variant: "pill",
		disabled: false
	}
});
const segmentVariants = cva("nothing-segmented__segment", {
	variants: { active: {
		true: "nothing-segmented__segment--active",
		false: ""
	} },
	defaultVariants: { active: false }
});
const SegmentedControl = React$1.forwardRef(({ className, segments, activeIndex: controlledIndex, variant = "pill", disabled = false, onChange, ...props }, ref) => {
	const [internalIndex, setInternalIndex] = React$1.useState(0);
	const [sliderStyle, setSliderStyle] = React$1.useState({});
	const segmentRefs = React$1.useRef([]);
	const activeIdx = controlledIndex !== void 0 ? controlledIndex : internalIndex;
	React$1.useEffect(() => {
		const activeSegment = segmentRefs.current[activeIdx];
		if (activeSegment) setSliderStyle({
			width: activeSegment.offsetWidth,
			left: activeSegment.offsetLeft
		});
	}, [activeIdx, segments]);
	const handleSelect = (index) => {
		if (disabled) return;
		if (controlledIndex === void 0) setInternalIndex(index);
		onChange?.(index);
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(segmentedVariants({
			variant,
			disabled
		}), className),
		"data-variant": dataAttr(variant),
		"data-disabled": dataAttr(disabled),
		role: "tablist",
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			className: "nothing-segmented__slider",
			style: sliderStyle
		}), segments.map((segment, index) => /* @__PURE__ */ jsx("button", {
			ref: (el) => {
				segmentRefs.current[index] = el;
			},
			className: cn(segmentVariants({ active: index === activeIdx })),
			onClick: () => handleSelect(index),
			disabled: !!disabled,
			role: "tab",
			"aria-selected": index === activeIdx,
			"data-state": dataAttr(index === activeIdx ? "active" : "inactive"),
			children: segment
		}, index))]
	});
});
SegmentedControl.displayName = "SegmentedControl";
//#endregion
export { SegmentedControl as default, segmentVariants, segmentedVariants };

//# sourceMappingURL=SegmentedControl.mjs.map