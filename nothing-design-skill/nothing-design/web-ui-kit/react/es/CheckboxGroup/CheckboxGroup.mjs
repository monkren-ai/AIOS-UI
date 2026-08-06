import { cn, dataAttr } from "../lib/utils.mjs";
import Checkbox from "../Checkbox/Checkbox.mjs";
import { useMergeSplit } from "../hooks/useMergeSplit.mjs";
import { checkboxGroupItemVariants, checkboxGroupMergeBgVariants, checkboxGroupVariants } from "./checkbox-group-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/CheckboxGroup/CheckboxGroup.tsx
function CheckboxGroup({ className, options, value: controlledValue, defaultValue, onValueChange, disabled, orientation = "vertical", size = "md", ref, ...props }) {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? []);
	const selectedValues = controlledValue !== void 0 ? controlledValue : internalValue;
	const containerRef = React$1.useRef(null);
	const setContainerRef = React$1.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const { calculateMerge, registerItem } = useMergeSplit(containerRef, { axis: orientation === "horizontal" ? "x" : "y" });
	const [mergeStyle, setMergeStyle] = React$1.useState({});
	const toggleValue = React$1.useCallback((value) => {
		const next = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
		if (controlledValue === void 0) setInternalValue(next);
		onValueChange?.(next);
	}, [
		controlledValue,
		onValueChange,
		selectedValues
	]);
	React$1.useEffect(() => {
		const merge = calculateMerge(options.map((option, index) => selectedValues.includes(option.value) ? index : -1).filter((index) => index !== -1));
		if (!merge.hasSelection) {
			setMergeStyle({ opacity: 0 });
			return;
		}
		const container = containerRef.current;
		setMergeStyle({
			opacity: 1,
			transform: `translate(${(typeof window !== "undefined" && container ? window.getComputedStyle(container).direction === "rtl" : false) ? -((container?.offsetWidth ?? 0) - merge.left - merge.width) : merge.left}px, ${merge.top}px)`,
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
		"data-size": dataAttr(size),
		"data-disabled": dataAttr(disabled),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: checkboxGroupMergeBgVariants(),
			"data-slot": "checkbox-group-merge-bg",
			style: mergeStyle,
			"aria-hidden": "true"
		}), options.map((option, index) => {
			const isSelected = selectedValues.includes(option.value);
			const isDisabled = Boolean(disabled || option.disabled);
			return /* @__PURE__ */ jsx("div", {
				ref: (el) => registerItem(index, el),
				className: checkboxGroupItemVariants({
					selected: isSelected,
					disabled: isDisabled
				}),
				"data-slot": "checkbox-group-item",
				"data-value": option.value,
				"data-state": isSelected ? "checked" : "unchecked",
				"data-disabled": dataAttr(isDisabled),
				children: /* @__PURE__ */ jsx(Checkbox, {
					label: option.label,
					size,
					checked: isSelected,
					onCheckedChange: () => toggleValue(option.value),
					disabled: isDisabled
				})
			}, option.value);
		})]
	});
}
CheckboxGroup.displayName = "CheckboxGroup";
//#endregion
export { CheckboxGroup as default };

//# sourceMappingURL=CheckboxGroup.mjs.map