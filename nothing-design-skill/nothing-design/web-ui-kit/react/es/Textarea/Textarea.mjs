import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Textarea.css";
//#region src/Textarea/Textarea.tsx
const textareaVariants = cva("nothing-textarea", {
	variants: {
		variant: {
			underline: "nothing-textarea--underline",
			bordered: "nothing-textarea--bordered"
		},
		hasError: {
			true: "nothing-textarea--error",
			false: ""
		},
		disabled: {
			true: "nothing-textarea--disabled",
			false: ""
		},
		focused: {
			true: "nothing-textarea--focused",
			false: ""
		}
	},
	defaultVariants: {
		variant: "underline",
		hasError: false,
		disabled: false,
		focused: false
	}
});
const Textarea = React.forwardRef(({ className, style, value: controlledValue, defaultValue, onChange, placeholder, label, error, message, disabled, autoResize = false, minRows = 3, maxRows, variant, id, onFocus, onBlur, ...textareaProps }, ref) => {
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
	const [focused, setFocused] = React.useState(false);
	const internalRef = React.useRef(null);
	const generatedId = React.useId();
	const inputId = id || generatedId;
	const errorId = `${inputId}-error`;
	const messageId = `${inputId}-message`;
	const isControlled = controlledValue !== void 0;
	const value = isControlled ? controlledValue : internalValue;
	const hasError = !!error;
	const isDisabled = !!disabled;
	const setRefs = React.useCallback((node) => {
		internalRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	const resizeTextarea = React.useCallback(() => {
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
	React.useEffect(() => {
		resizeTextarea();
	}, [value, resizeTextarea]);
	const handleChange = (e) => {
		const newValue = e.target.value;
		if (!isControlled) setInternalValue(newValue);
		onChange?.(e);
	};
	const handleFocus = (e) => {
		setFocused(true);
		onFocus?.(e);
	};
	const handleBlur = (e) => {
		setFocused(false);
		onBlur?.(e);
	};
	const describedBy = hasError ? errorId : message ? messageId : void 0;
	return /* @__PURE__ */ jsxs("div", {
		className: cn(textareaVariants({
			variant,
			hasError,
			disabled: isDisabled,
			focused
		}), autoResize && "nothing-textarea--auto-resize", className),
		style,
		"data-slot": "textarea",
		"data-variant": dataAttr(variant),
		"data-state": dataAttr(hasError ? "error" : focused ? "focused" : "default"),
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "nothing-textarea__label",
				htmlFor: inputId,
				children: label
			}),
			/* @__PURE__ */ jsx("textarea", {
				ref: setRefs,
				className: "nothing-textarea__input",
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
				className: "nothing-textarea__error",
				id: errorId,
				role: "alert",
				children: error
			}),
			!hasError && message && /* @__PURE__ */ jsx("div", {
				className: "nothing-textarea__message",
				id: messageId,
				children: message
			})
		]
	});
});
Textarea.displayName = "Textarea";
//#endregion
export { Textarea, Textarea as default, textareaVariants };

//# sourceMappingURL=Textarea.mjs.map