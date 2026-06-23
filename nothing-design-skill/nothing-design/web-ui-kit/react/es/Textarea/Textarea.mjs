import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Textarea.css";
//#region src/Textarea/Textarea.tsx
const textareaVariants = cva("nothing-textarea", {
	variants: {
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
		hasError: false,
		disabled: false,
		focused: false
	}
});
const Textarea = React$1.forwardRef(({ className, value: controlledValue, defaultValue, onChange, placeholder, label, error, disabled, autoResize = false, minRows = 3, maxRows, id, ...props }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? "");
	const [focused, setFocused] = React$1.useState(false);
	const internalRef = React$1.useRef(null);
	const generatedId = React$1.useId();
	const inputId = id || generatedId;
	const errorId = `${inputId}-error`;
	const isControlled = controlledValue !== void 0;
	const value = isControlled ? controlledValue : internalValue;
	const hasError = !!error;
	const isDisabled = !!disabled;
	const setRefs = React$1.useCallback((node) => {
		internalRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
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
	const handleChange = (e) => {
		const newValue = e.target.value;
		if (!isControlled) setInternalValue(newValue);
		onChange?.(e);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(textareaVariants({
			hasError,
			disabled: isDisabled,
			focused
		}), className),
		"data-state": dataAttr(hasError ? "error" : focused ? "focused" : "default"),
		...props,
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
				onFocus: () => setFocused(true),
				onBlur: () => setFocused(false),
				rows: minRows,
				"aria-invalid": hasError,
				"aria-describedby": hasError ? errorId : void 0
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: "nothing-textarea__error",
				id: errorId,
				children: error
			})
		]
	});
});
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as default, textareaVariants };

//# sourceMappingURL=Textarea.mjs.map