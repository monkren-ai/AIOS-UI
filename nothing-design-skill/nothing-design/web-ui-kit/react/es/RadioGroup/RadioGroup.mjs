import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./RadioGroup.css";
//#region src/RadioGroup/RadioGroup.tsx
const radioGroupVariants = cva("nothing-radio-group", {
	variants: {
		orientation: {
			horizontal: "nothing-radio-group--horizontal",
			vertical: "nothing-radio-group--vertical"
		},
		disabled: {
			true: "nothing-radio-group--disabled",
			false: ""
		}
	},
	defaultVariants: {
		orientation: "vertical",
		disabled: false
	}
});
const RadioGroup = React$1.forwardRef(({ className, options, value: controlledValue, defaultValue, onValueChange, disabled, orientation = "vertical", name, ...props }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? "");
	const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
	const itemRefs = React$1.useRef([]);
	const isDisabled = !!disabled;
	const handleSelect = React$1.useCallback((optionValue) => {
		if (isDisabled) return;
		if (controlledValue === void 0) setInternalValue(optionValue);
		onValueChange?.(optionValue);
	}, [
		isDisabled,
		controlledValue,
		onValueChange
	]);
	const findNextEnabled = React$1.useCallback((currentIndex, direction) => {
		let idx = currentIndex + direction;
		while (idx >= 0 && idx < options.length) {
			if (!options[idx].disabled && !isDisabled) return idx;
			idx += direction;
		}
		if (direction > 0) {
			for (let i = 0; i < currentIndex; i++) if (!options[i].disabled && !isDisabled) return i;
		} else for (let i = options.length - 1; i > currentIndex; i--) if (!options[i].disabled && !isDisabled) return i;
		return currentIndex;
	}, [options, isDisabled]);
	const handleKeyDown = React$1.useCallback((e, index) => {
		if (options.filter((o) => !o.disabled && !isDisabled).length === 0) return;
		const isHorizontal = orientation === "horizontal";
		let nextIndex = -1;
		switch (e.key) {
			case "ArrowDown":
				if (!isHorizontal) {
					e.preventDefault();
					nextIndex = findNextEnabled(index, 1);
				}
				break;
			case "ArrowUp":
				if (!isHorizontal) {
					e.preventDefault();
					nextIndex = findNextEnabled(index, -1);
				}
				break;
			case "ArrowRight":
				if (isHorizontal) {
					e.preventDefault();
					nextIndex = findNextEnabled(index, 1);
				}
				break;
			case "ArrowLeft":
				if (isHorizontal) {
					e.preventDefault();
					nextIndex = findNextEnabled(index, -1);
				}
				break;
			case "Home":
				e.preventDefault();
				nextIndex = options.findIndex((o) => !o.disabled && !isDisabled);
				break;
			case "End":
				e.preventDefault();
				for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled && !isDisabled) {
					nextIndex = i;
					break;
				}
				break;
			default: return;
		}
		if (nextIndex >= 0 && nextIndex < options.length) {
			itemRefs.current[nextIndex]?.focus();
			handleSelect(options[nextIndex].value);
		}
	}, [
		options,
		orientation,
		isDisabled,
		handleSelect,
		findNextEnabled
	]);
	const getTabIndex = (index) => {
		const isChecked = options[index].value === selectedValue;
		if (options[index].disabled || isDisabled) return -1;
		if (isChecked) return 0;
		if (!options.some((o) => o.value === selectedValue && !o.disabled)) return options.findIndex((o) => !o.disabled && !isDisabled) === index ? 0 : -1;
		return -1;
	};
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(radioGroupVariants({
			orientation,
			disabled: isDisabled
		}), className),
		role: "radiogroup",
		"aria-orientation": orientation,
		"data-disabled": dataAttr(isDisabled),
		...props,
		children: options.map((option, index) => {
			const isChecked = option.value === selectedValue;
			const isItemDisabled = option.disabled || isDisabled;
			return /* @__PURE__ */ jsxs("label", {
				ref: (el) => {
					itemRefs.current[index] = el;
				},
				className: cn("nothing-radio-group__item", isChecked && "nothing-radio-group__item--checked", isItemDisabled && "nothing-radio-group__item--disabled"),
				tabIndex: getTabIndex(index),
				onKeyDown: (e) => handleKeyDown(e, index),
				children: [
					/* @__PURE__ */ jsx("input", {
						className: "nothing-radio-group__input",
						type: "radio",
						name,
						value: option.value,
						checked: isChecked,
						disabled: isItemDisabled,
						onChange: () => handleSelect(option.value),
						tabIndex: -1
					}),
					/* @__PURE__ */ jsx("span", {
						className: "nothing-radio-group__circle",
						children: /* @__PURE__ */ jsx("span", { className: "nothing-radio-group__dot" })
					}),
					/* @__PURE__ */ jsx("span", {
						className: "nothing-radio-group__label",
						children: option.label
					})
				]
			}, option.value);
		})
	});
});
RadioGroup.displayName = "RadioGroup";
//#endregion
export { RadioGroup as default, radioGroupVariants };

//# sourceMappingURL=RadioGroup.mjs.map