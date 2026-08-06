import { cn, dataAttr } from "../lib/utils.mjs";
import { resolveTextareaVariant, textareaFieldVariants, textareaLabelVariants, textareaMessageVariants, textareaVariants } from "./textarea-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Textarea/Textarea.tsx
function Textarea({ className, style, value: controlledValue, defaultValue, onChange, onValueChange, placeholder, label, error, message, disabled, autoResize = false, minRows = 3, maxRows, variant, size, id, onFocus, onBlur, ref, ...textareaProps }) {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? "");
	const [focused, setFocused] = React$1.useState(false);
	const internalRef = React$1.useRef(null);
	const generatedId = React$1.useId();
	const inputId = id || generatedId;
	const errorId = `${inputId}-error`;
	const messageId = `${inputId}-message`;
	const isControlled = controlledValue !== void 0;
	const value = isControlled ? controlledValue : internalValue;
	const hasError = !!error;
	const isDisabled = !!disabled;
	const resolvedVariant = resolveTextareaVariant(variant) ?? "outline";
	const resolvedSize = size ?? "md";
	const setRefs = React$1.useCallback((node) => {
		internalRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const resizeTextarea = React$1.useCallback(() => {
		const textarea = internalRef.current;
		if (!textarea || !autoResize) return;
		textarea.style.height = "auto";
		const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20;
		const padding = parseFloat(getComputedStyle(textarea).paddingTop) + parseFloat(getComputedStyle(textarea).paddingBottom) || 0;
		const minHeight = lineHeight * minRows + padding;
		const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity;
		const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
		textarea.style.height = `${newHeight}px`;
		textarea.style.overflow = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
	}, [
		autoResize,
		minRows,
		maxRows
	]);
	React$1.useEffect(() => {
		resizeTextarea();
	}, [value, resizeTextarea]);
	const handleChange = (event) => {
		if (!isControlled) setInternalValue(event.target.value);
		onChange?.(event);
		onValueChange?.(event.target.value);
	};
	const handleFocus = (event) => {
		setFocused(true);
		onFocus?.(event);
	};
	const handleBlur = (event) => {
		setFocused(false);
		onBlur?.(event);
	};
	const describedBy = hasError ? errorId : message ? messageId : void 0;
	return /* @__PURE__ */ jsxs("div", {
		className: cn(textareaVariants({
			variant: resolvedVariant,
			size: resolvedSize,
			hasError,
			disabled: isDisabled,
			focused
		}), className),
		style,
		"data-slot": "textarea",
		"data-variant": dataAttr(resolvedVariant),
		"data-size": dataAttr(resolvedSize),
		"data-disabled": dataAttr(isDisabled),
		"data-invalid": dataAttr(hasError),
		"data-auto-resize": dataAttr(autoResize),
		"data-state": hasError ? "error" : focused ? "focused" : "default",
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: textareaLabelVariants({
					size: resolvedSize,
					focused,
					hasError,
					disabled: isDisabled
				}),
				"data-slot": "textarea-label",
				htmlFor: inputId,
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				ref: setRefs,
				className: textareaFieldVariants({
					variant: resolvedVariant,
					size: resolvedSize,
					hasError,
					disabled: isDisabled,
					autoResize
				}),
				"data-slot": "textarea-field",
				id: inputId,
				placeholder,
				value,
				disabled: isDisabled,
				onChange: handleChange,
				onFocus: handleFocus,
				onBlur: handleBlur,
				rows: minRows,
				"aria-invalid": hasError,
				"aria-describedby": describedBy,
				...textareaProps
			}),
			hasError && /* @__PURE__ */ jsx("div", {
				className: textareaMessageVariants({ variant: "error" }),
				"data-slot": "textarea-error",
				id: errorId,
				role: "alert",
				children: error
			}),
			!hasError && message && /* @__PURE__ */ jsx("div", {
				className: textareaMessageVariants({ variant: "default" }),
				"data-slot": "textarea-message",
				id: messageId,
				children: message
			})
		]
	});
}
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as default };

//# sourceMappingURL=Textarea.mjs.map