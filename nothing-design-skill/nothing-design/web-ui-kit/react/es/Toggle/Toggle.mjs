import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Toggle.css";
//#region src/Toggle/Toggle.tsx
const toggleVariants = cva("nothing-toggle", {
	variants: {
		variant: {
			default: "nothing-toggle--default",
			outline: "nothing-toggle--outline"
		},
		size: {
			sm: "nothing-toggle--sm",
			md: "nothing-toggle--md",
			lg: "nothing-toggle--lg"
		},
		pressed: {
			true: "nothing-toggle--pressed",
			false: ""
		},
		disabled: {
			true: "nothing-toggle--disabled",
			false: ""
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md",
		pressed: false,
		disabled: false
	}
});
const toggleGroupVariants = cva("nothing-toggle-group", {
	variants: { variant: {
		default: "nothing-toggle-group--default",
		outline: "nothing-toggle-group--outline"
	} },
	defaultVariants: { variant: "default" }
});
const ToggleGroupContext = React$1.createContext(null);
const Toggle = React$1.forwardRef(({ className, pressed: controlledPressed, defaultPressed, onPressedChange, disabled = false, variant = "default", size = "md", value, children, onClick, ...props }, ref) => {
	const [internalPressed, setInternalPressed] = React$1.useState(defaultPressed ?? false);
	const group = React$1.useContext(ToggleGroupContext);
	const isPressed = group ? group.value.includes(value ?? "") : controlledPressed !== void 0 ? controlledPressed : internalPressed;
	const activeVariant = group?.variant ?? variant;
	const activeSize = group?.size ?? size;
	const handleClick = (e) => {
		if (disabled) return;
		if (group && value !== void 0) group.onToggle(value);
		else {
			const newValue = !isPressed;
			if (controlledPressed === void 0) setInternalPressed(newValue);
			onPressedChange?.(newValue);
		}
		onClick?.(e);
	};
	const handleKeyDown = (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			handleClick(e);
		}
	};
	return /* @__PURE__ */ jsx("button", {
		ref,
		className: cn(toggleVariants({
			variant: activeVariant,
			size: activeSize,
			pressed: isPressed,
			disabled
		}), className),
		onClick: handleClick,
		onKeyDown: handleKeyDown,
		disabled,
		role: "button",
		"aria-pressed": isPressed,
		type: "button",
		"data-state": dataAttr(isPressed ? "pressed" : "unpressed"),
		"data-disabled": dataAttr(disabled),
		...props,
		children
	});
});
Toggle.displayName = "Toggle";
const ToggleGroup = React$1.forwardRef(({ className, value: controlledValue, defaultValue, onValueChange, variant = "default", size = "md", children, ...props }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? []);
	const activeValue = controlledValue !== void 0 ? controlledValue : internalValue;
	const handleToggle = React$1.useCallback((itemValue) => {
		const newValue = activeValue.includes(itemValue) ? activeValue.filter((v) => v !== itemValue) : [...activeValue, itemValue];
		if (controlledValue === void 0) setInternalValue(newValue);
		onValueChange?.(newValue);
	}, [
		activeValue,
		controlledValue,
		onValueChange
	]);
	return /* @__PURE__ */ jsx(ToggleGroupContext.Provider, {
		value: {
			value: activeValue,
			onToggle: handleToggle,
			variant: variant ?? "default",
			size: size ?? "md"
		},
		children: /* @__PURE__ */ jsx("div", {
			ref,
			className: cn(toggleGroupVariants({ variant }), className),
			role: "group",
			"data-variant": dataAttr(variant),
			...props,
			children
		})
	});
});
ToggleGroup.displayName = "ToggleGroup";
//#endregion
export { ToggleGroup, Toggle as default, toggleGroupVariants, toggleVariants };

//# sourceMappingURL=Toggle.mjs.map