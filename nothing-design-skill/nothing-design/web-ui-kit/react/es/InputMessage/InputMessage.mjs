import { cn, dataAttr } from "../lib/utils.mjs";
import { inputMessageControlVariants, inputMessageCountVariants, inputMessageFieldVariants, inputMessageHintVariants, inputMessageMetaVariants, inputMessageSendIconVariants, inputMessageSendLabelVariants, inputMessageSendVariants, inputMessageVariants, resolveInputMessageSize } from "./input-message-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/InputMessage/InputMessage.tsx
function InputMessage({ value: valueProp, defaultValue = "", onChange, onSend, placeholder, disabled = false, minRows = 1, maxRows = 6, maxLength, submitOnEnter = true, sendLabel = "SEND", countLabel, hideCount = false, size = "md", className, onKeyDown, ref, ...textareaProps }) {
	const isControlled = valueProp !== void 0;
	const [internalValue, setInternalValue] = React$1.useState(defaultValue);
	const value = isControlled ? valueProp : internalValue;
	const textareaRef = React$1.useRef(null);
	const generatedId = React$1.useId();
	const inputId = textareaProps.id || generatedId;
	const resolvedSize = resolveInputMessageSize(size) ?? "md";
	const setRefs = React$1.useCallback((node) => {
		textareaRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const resize = React$1.useCallback(() => {
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
	React$1.useLayoutEffect(() => {
		resize();
	}, [value, resize]);
	const handleChange = (e) => {
		const newValue = e.target.value;
		if (!isControlled) setInternalValue(newValue);
		onChange?.(newValue);
	};
	const handleSend = React$1.useCallback(() => {
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
		className: cn(inputMessageVariants({
			size: resolvedSize,
			disabled
		}), className),
		"data-slot": "input-message",
		"data-size": dataAttr(resolvedSize),
		"data-disabled": dataAttr(disabled),
		children: [/* @__PURE__ */ jsxs("div", {
			className: inputMessageControlVariants({ size: resolvedSize }),
			"data-slot": "input-message-control",
			children: [/* @__PURE__ */ jsx("textarea", {
				ref: setRefs,
				id: inputId,
				className: inputMessageFieldVariants({ size: resolvedSize }),
				"data-slot": "input-message-field",
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
				className: inputMessageSendVariants({ size: resolvedSize }),
				"data-slot": "input-message-send",
				"data-disabled": dataAttr(!canSend),
				onClick: handleSend,
				disabled: !canSend,
				"aria-label": sendLabel,
				children: [/* @__PURE__ */ jsx("span", {
					className: inputMessageSendLabelVariants(),
					"data-slot": "input-message-send-label",
					children: sendLabel
				}), /* @__PURE__ */ jsx("svg", {
					className: inputMessageSendIconVariants({ size: resolvedSize }),
					"data-slot": "input-message-send-icon",
					"data-icon": "end",
					viewBox: "0 0 16 16",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", { d: "M2 8h12M9 4l5 4-5 4" })
				})]
			})]
		}), !hideCount && /* @__PURE__ */ jsxs("div", {
			className: inputMessageMetaVariants(),
			"data-slot": "input-message-meta",
			children: [/* @__PURE__ */ jsx("span", {
				className: inputMessageHintVariants(),
				"data-slot": "input-message-hint",
				children: submitOnEnter ? "Enter to send, Shift+Enter for new line" : ""
			}), /* @__PURE__ */ jsx("span", {
				className: inputMessageCountVariants(),
				"data-slot": "input-message-count",
				children: countText
			})]
		})]
	});
}
InputMessage.displayName = "InputMessage";
//#endregion
export { InputMessage as default };

//# sourceMappingURL=InputMessage.mjs.map