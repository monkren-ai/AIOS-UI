import { cn, dataAttr } from "../lib/utils.mjs";
import { inputClearVariants, inputControlVariants, inputFieldVariants, inputHelperVariants, inputIconVariants, inputLabelVariants, inputVariants, resolveInputVariant } from "./input-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Input/Input.tsx
function InputMessage({ children, variant = "default", className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(inputHelperVariants({ variant }), className),
		"data-slot": "input-message",
		"data-variant": variant,
		...props,
		children
	});
}
InputMessage.displayName = "Input.Message";
function Input({ variant, size, label, placeholder, value: controlledValue, defaultValue, error, message, disabled = false, id, onChange, onValueChange, className, style, type = "text", name, leadingIcon, trailingIcon, clearable, ref, ...rest }) {
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
	const generatedId = React.useId();
	const inputId = id || generatedId;
	const errorId = `${inputId}-error`;
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const hasError = Boolean(error);
	const inputRef = React.useRef(null);
	const resolvedVariant = resolveInputVariant(variant) ?? "outline";
	const resolvedSize = size ?? "md";
	const setRefs = React.useCallback((node) => {
		inputRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const handleChange = (event) => {
		const nextValue = event.target.value;
		if (controlledValue === void 0) setInternalValue(nextValue);
		onChange?.(event);
		onValueChange?.(nextValue);
	};
	/**
	* 清空按钮不走 `setInternalValue('')`，而是绕过 React 的 value 追踪、直接写 DOM
	* 再派发一次 `input`：这样 React 会当成一次真实输入，`onChange` 拿到的是货真价实
	* 的事件对象而不是我们捏的假货，后续状态也全部由 `handleChange` 一条路径处理。
	*/
	const handleClear = React.useCallback(() => {
		const input = inputRef.current;
		if (!input) return;
		(Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set)?.call(input, "");
		input.dispatchEvent(new Event("input", { bubbles: true }));
		input.focus();
	}, []);
	const showClear = Boolean(clearable && value && !disabled);
	return /* @__PURE__ */ jsxs("div", {
		className: cn(inputVariants({
			variant: resolvedVariant,
			size: resolvedSize,
			hasError,
			disabled
		}), className),
		style,
		"data-slot": "input",
		"data-variant": dataAttr(resolvedVariant),
		"data-size": dataAttr(resolvedSize),
		"data-disabled": dataAttr(disabled),
		"data-invalid": dataAttr(hasError),
		"data-state": hasError ? "error" : disabled ? "disabled" : "default",
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: inputLabelVariants({
					size: resolvedSize,
					hasError,
					disabled
				}),
				"data-slot": "input-label",
				htmlFor: inputId,
				children: label
			}),
			/* @__PURE__ */ jsxs("div", {
				className: inputControlVariants({
					variant: resolvedVariant,
					size: resolvedSize,
					hasError,
					disabled
				}),
				"data-slot": "input-control",
				children: [
					leadingIcon && /* @__PURE__ */ jsx("span", {
						className: inputIconVariants(),
						"data-slot": "input-icon",
						"data-icon": "start",
						"aria-hidden": "true",
						children: leadingIcon
					}),
					/* @__PURE__ */ jsx("input", {
						ref: setRefs,
						className: inputFieldVariants({ size: resolvedSize }),
						"data-slot": "input-field",
						type,
						id: inputId,
						name,
						placeholder,
						value,
						disabled,
						onChange: handleChange,
						"aria-invalid": hasError || void 0,
						"aria-describedby": hasError ? errorId : void 0,
						...rest
					}),
					showClear && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: inputClearVariants(),
						"data-slot": "input-clear",
						onClick: handleClear,
						"aria-label": "Clear input",
						tabIndex: -1,
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
						})
					}),
					!showClear && trailingIcon && /* @__PURE__ */ jsx("span", {
						className: inputIconVariants(),
						"data-slot": "input-icon",
						"data-icon": "end",
						"aria-hidden": "true",
						children: trailingIcon
					})
				]
			}),
			hasError && /* @__PURE__ */ jsx("div", {
				id: errorId,
				className: inputHelperVariants({ variant: "error" }),
				"data-slot": "input-error",
				role: "alert",
				children: error
			}),
			!hasError && message && /* @__PURE__ */ jsx(InputMessage, { children: message })
		]
	});
}
Input.displayName = "Input";
Input.Message = InputMessage;
//#endregion
export { Input as default };

//# sourceMappingURL=Input.mjs.map