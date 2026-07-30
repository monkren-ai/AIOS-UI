import { cn, dataAttr } from "../lib/utils.mjs";
import { Checkbox } from "../Checkbox/Checkbox.mjs";
import { useMergeSplit } from "../hooks/useMergeSplit.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./CheckboxGroup.css";
//#region src/CheckboxGroup/CheckboxGroup.tsx
const checkboxGroupVariants = cva("nothing-checkbox-group", {
	variants: { orientation: {
		horizontal: "nothing-checkbox-group--horizontal",
		vertical: "nothing-checkbox-group--vertical"
	} },
	defaultVariants: { orientation: "vertical" }
});
const CheckboxGroup = React.forwardRef(({ className, options, value: controlledValue, defaultValue, onValueChange, disabled, orientation = "vertical", ...props }, ref) => {
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? []);
	const selectedValues = controlledValue !== void 0 ? controlledValue : internalValue;
	const containerRef = React.useRef(null);
	const setContainerRef = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const { calculateMerge, registerItem } = useMergeSplit(containerRef, { axis: orientation === "horizontal" ? "x" : "y" });
	const [mergeStyle, setMergeStyle] = React.useState({});
	const toggleValue = React.useCallback((value) => {
		const next = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
		if (controlledValue === void 0) setInternalValue(next);
		onValueChange?.(next);
	}, [
		controlledValue,
		onValueChange,
		selectedValues
	]);
	React.useEffect(() => {
		const selectedIndices = options.map((option, index) => selectedValues.includes(option.value) ? index : -1).filter((index) => index !== -1);
		const merge = calculateMerge(selectedIndices);
		if (!merge.hasSelection) {
			setMergeStyle({ opacity: 0 });
			return;
		}
		setMergeStyle({
			opacity: 1,
			transform: `translate(${merge.left}px, ${merge.top}px)`,
			width: merge.width,
			height: merge.height
		});
	}, [
		calculateMerge,
		options,
		selectedValues
	]);
	return /* @__PURE__ */ jsxs("div", {
		ref: setContainerRef,
		role: "group",
		className: cn(checkboxGroupVariants({ orientation }), className),
		"data-slot": "checkbox-group",
		"data-orientation": dataAttr(orientation),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "nothing-checkbox-group__merge-bg",
			style: mergeStyle,
			"aria-hidden": "true"
		}), options.map((option, index) => {
			const isSelected = selectedValues.includes(option.value);
			return /* @__PURE__ */ jsx("div", {
				ref: (el) => registerItem(index, el),
				className: cn("nothing-checkbox-group__item", isSelected && "nothing-checkbox-group__item--selected", option.disabled && "nothing-checkbox-group__item--disabled"),
				children: /* @__PURE__ */ jsx(Checkbox, {
					label: option.label,
					checked: isSelected,
					onCheckedChange: () => toggleValue(option.value),
					disabled: disabled || option.disabled
				})
			}, option.value);
		})]
	});
});
CheckboxGroup.displayName = "CheckboxGroup";
//#endregion
export { CheckboxGroup, CheckboxGroup as default, checkboxGroupVariants };

//# sourceMappingURL=CheckboxGroup.mjs.map