import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ProgressBar.css";
//#region src/ProgressBar/ProgressBar.tsx
const progressBarVariants = cva("nothing-progress", {
	variants: {
		size: {
			hero: "nothing-progress--hero",
			standard: "nothing-progress--standard",
			compact: "nothing-progress--compact"
		},
		variant: {
			default: "",
			slim: "nothing-progress--slim"
		},
		status: {
			default: "",
			good: "nothing-progress__value--good",
			warning: "nothing-progress__value--warning",
			overlimit: "nothing-progress__value--overlimit",
			error: "nothing-progress__value--error"
		},
		indeterminate: {
			true: "nothing-progress--indeterminate",
			false: ""
		},
		disabled: {
			true: "nothing-progress--disabled",
			false: ""
		}
	},
	defaultVariants: {
		size: "standard",
		variant: "default",
		status: "default",
		indeterminate: false,
		disabled: false
	}
});
const progressBarValueVariants = cva("nothing-progress__value", {
	variants: { status: {
		default: "",
		good: "nothing-progress__value--good",
		warning: "nothing-progress__value--warning",
		overlimit: "nothing-progress__value--overlimit",
		error: "nothing-progress__value--error"
	} },
	defaultVariants: { status: "default" }
});
const ProgressBar = React.forwardRef(({ className, value, total = 100, segments = 20, size = "standard", variant = "default", indeterminate = false, label, unit, status = "default", showReadout = true, disabled = false, style, ...props }, ref) => {
	const [animatedSegments, setAnimatedSegments] = React.useState(0);
	React.useEffect(() => {
		const filled = Math.round(value / total * segments);
		const timer = setTimeout(() => setAnimatedSegments(filled), 50);
		return () => clearTimeout(timer);
	}, [
		value,
		total,
		segments
	]);
	const getSegmentStatus = (index) => {
		if (index >= animatedSegments) return "empty";
		return status === "default" ? "filled" : status;
	};
	const track = /* @__PURE__ */ jsx("div", {
		className: "nothing-progress__track",
		children: indeterminate ? /* @__PURE__ */ jsx("div", { className: "nothing-progress__indeterminate_bar" }) : Array.from({ length: segments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: `nothing-progress__segment nothing-progress__segment--${getSegmentStatus(index)}` }, index))
	});
	if (variant === "slim") return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(progressBarVariants({
			variant: "slim",
			indeterminate,
			disabled
		}), className),
		style,
		role: "progressbar",
		"aria-valuenow": indeterminate ? void 0 : value,
		"aria-valuemin": 0,
		"aria-valuemax": total,
		"data-state": dataAttr(indeterminate ? "indeterminate" : disabled ? "disabled" : "normal"),
		...props,
		children: track
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(progressBarVariants({
			size,
			variant,
			indeterminate,
			disabled
		}), className),
		style,
		role: "progressbar",
		"aria-valuenow": indeterminate ? void 0 : value,
		"aria-valuemin": 0,
		"aria-valuemax": total,
		"data-state": dataAttr(indeterminate ? "indeterminate" : disabled ? "disabled" : "normal"),
		...props,
		children: [track, showReadout && !indeterminate && /* @__PURE__ */ jsxs("div", {
			className: "nothing-progress__readout",
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn(progressBarValueVariants({ status })),
				children: [value, unit && /* @__PURE__ */ jsx("span", {
					className: "nothing-progress__unit",
					children: unit
				})]
			}), label && /* @__PURE__ */ jsx("div", {
				className: "nothing-progress__label",
				children: label
			})]
		})]
	});
});
ProgressBar.displayName = "ProgressBar";
//#endregion
export { ProgressBar as default, progressBarValueVariants, progressBarVariants };

//# sourceMappingURL=ProgressBar.mjs.map