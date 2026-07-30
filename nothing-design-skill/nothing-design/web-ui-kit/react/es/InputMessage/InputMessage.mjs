import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./InputMessage.css";
//#region src/InputMessage/InputMessage.tsx
const inputMessageVariants = cva("nothing-input-message", {
	variants: { size: {
		sm: "nothing-input-message--sm",
		md: "nothing-input-message--md",
		lg: "nothing-input-message--lg"
	} },
	defaultVariants: { size: "md" }
});
const InputMessage = React.forwardRef(({ value: valueProp, defaultValue = "", onChange, onSend, placeholder, disabled = false, minRows = 1, maxRows = 6, maxLength, submitOnEnter = true, sendLabel = "SEND", countLabel, hideCount = false, size = "md", className, onKeyDown, ...textareaProps }, ref) => {
	const isControlled = valueProp !== void 0;
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const value = isControlled ? valueProp : internalValue;
	const textareaRef = React.useRef(null);
	const generatedId = React.useId();
	const inputId = textareaProps.id || generatedId;
	React.useImperativeHandle(ref, () => textareaRef.current, []);
	const resize = React.useCallback(() => {
		const textarea = textareaRef.current;
		if (!textarea) return;
		textarea.style.height = "auto";
		const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20;
		const padding = parseFloat(getComputedStyle(textarea).paddingTop) + parseFloat(getComputedStyle(textarea).paddingBottom);
		const minHeight = lineHeight * minRows + padding;
		const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity;
		const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
		textarea.style.height = `${newHeight}px`;
		textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
	}, [minRows, maxRows]);
	React.useLayoutEffect(() => {
		resize();
	}, [value, resize]);
	const handleChange = (e) => {
		const newValue = e.target.value;
		if (!isControlled) setInternalValue(newValue);
		onChange?.(newValue);
	};
	const handleSend = React.useCallback(() => {
		if (disabled || !value.trim()) return;
		onSend?.(value);
		if (!isControlled) setInternalValue("");
		onChange?.("");
	}, [
		disabled,
		value,
		onSend,
		isControlled,
		onChange
	]);
	const handleKeyDown = (e) => {
		if (submitOnEnter && e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
		onKeyDown?.(e);
	};
	const canSend = !disabled && value.trim().length > 0;
	const countText = countLabel ? `${value.length}${maxLength ? `/${maxLength}` : ""} ${countLabel}` : `${value.length}${maxLength ? `/${maxLength}` : ""}`;
	return /* @__PURE__ */ jsxs("div", {
		className: cn(inputMessageVariants({ size }), className),
		"data-slot": "input-message",
		"data-size": dataAttr(size),
		"data-disabled": dataAttr(disabled),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "nothing-input-message__control",
			children: [/* @__PURE__ */ jsx("textarea", {
				ref: textareaRef,
				id: inputId,
				className: "nothing-input-message__field",
				value,
				placeholder,
				disabled,
				rows: minRows,
				maxLength,
				onChange: handleChange,
				onKeyDown: handleKeyDown,
				"aria-multiline": "true",
				...textareaProps
			}), /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "nothing-input-message__send",
				onClick: handleSend,
				disabled: !canSend,
				"aria-label": sendLabel,
				children: [/* @__PURE__ */ jsx("span", {
					className: "nothing-input-message__send-label",
					children: sendLabel
				}), /* @__PURE__ */ jsx("svg", {
					className: "nothing-input-message__send-icon",
					viewBox: "0 0 16 16",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", { d: "M2 8h12M9 4l5 4-5 4" })
				})]
			})]
		}), !hideCount && /* @__PURE__ */ jsxs("div", {
			className: "nothing-input-message__meta",
			children: [/* @__PURE__ */ jsx("span", {
				className: "nothing-input-message__hint",
				children: submitOnEnter ? "Enter to send, Shift+Enter for new line" : ""
			}), /* @__PURE__ */ jsx("span", {
				className: "nothing-input-message__count",
				children: countText
			})]
		})]
	});
});
InputMessage.displayName = "InputMessage";
//#endregion
export { InputMessage, InputMessage as default, inputMessageVariants };

//# sourceMappingURL=InputMessage.mjs.map