import { cn, dataAttr } from "../lib/utils.mjs";
import { resolveToggleVariant, toggleGroupVariants, toggleVariants } from "./toggle-variants.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/Toggle/Toggle.tsx
const ToggleGroupContext = React.createContext(null);
function Toggle({ className, pressed: controlledPressed, defaultPressed, onPressedChange, disabled = false, variant, size, value, children, onClick, ref, ...props }) {
	const [internalPressed, setInternalPressed] = React.useState(defaultPressed ?? false);
	const group = React.useContext(ToggleGroupContext);
	const isPressed = group ? group.value.includes(value ?? "") : controlledPressed !== void 0 ? controlledPressed : internalPressed;
	const activeVariant = group?.variant ?? resolveToggleVariant(variant) ?? "soft";
	const activeSize = group?.size ?? size ?? "md";
	const handleClick = (event) => {
		if (disabled) return;
		if (group && value !== void 0) group.onToggle(value);
		else {
			const nextPressed = !isPressed;
			if (controlledPressed === void 0) setInternalPressed(nextPressed);
			onPressedChange?.(nextPressed);
		}
		onClick?.(event);
	};
	return /* @__PURE__ */ jsx("button", {
		ref,
		type: "button",
		className: cn(toggleVariants({
			variant: activeVariant,
			size: activeSize
		}), className),
		onClick: handleClick,
		disabled,
		"aria-pressed": isPressed,
		"data-slot": "toggle",
		"data-variant": dataAttr(activeVariant),
		"data-size": dataAttr(activeSize),
		"data-pressed": dataAttr(isPressed),
		"data-state": dataAttr(isPressed ? "pressed" : "unpressed"),
		"data-disabled": dataAttr(disabled),
		...props,
		children
	});
}
Toggle.displayName = "Toggle";
function ToggleGroup({ className, value: controlledValue, defaultValue, onValueChange, variant, size = "md", children, ref, ...props }) {
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? []);
	const activeValue = controlledValue !== void 0 ? controlledValue : internalValue;
	const resolvedVariant = resolveToggleVariant(variant) ?? "soft";
	const handleToggle = React.useCallback((itemValue) => {
		const nextValue = activeValue.includes(itemValue) ? activeValue.filter((entry) => entry !== itemValue) : [...activeValue, itemValue];
		if (controlledValue === void 0) setInternalValue(nextValue);
		onValueChange?.(nextValue);
	}, [
		activeValue,
		controlledValue,
		onValueChange
	]);
	const context = React.useMemo(() => ({
		value: activeValue,
		onToggle: handleToggle,
		variant: resolvedVariant,
		size
	}), [
		activeValue,
		handleToggle,
		resolvedVariant,
		size
	]);
	return /* @__PURE__ */ jsx(ToggleGroupContext.Provider, {
		value: context,
		children: /* @__PURE__ */ jsx("div", {
			ref,
			className: cn(toggleGroupVariants({ variant: resolvedVariant }), className),
			role: "group",
			"data-slot": "toggle-group",
			"data-variant": dataAttr(resolvedVariant),
			"data-size": dataAttr(size),
			...props,
			children
		})
	});
}
ToggleGroup.displayName = "ToggleGroup";
//#endregion
export { ToggleGroup, Toggle as default };

//# sourceMappingURL=Toggle.mjs.map