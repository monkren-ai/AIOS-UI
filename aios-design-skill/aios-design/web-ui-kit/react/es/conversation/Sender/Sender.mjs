import { cn, dataAttr, mergeSemanticProps } from "../../lib/utils.mjs";
import Button from "../../Button/Button.mjs";
import { senderVariants } from "./sender-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./Sender.css";
//#region src/conversation/Sender/Sender.tsx
function getAutoSizeRows(autoSize) {
	if (autoSize === true) return {
		minRows: 2,
		maxRows: 6
	};
	if (typeof autoSize === "object" && autoSize !== null) return {
		minRows: autoSize.minRows ?? 2,
		maxRows: autoSize.maxRows ?? 6
	};
	return {
		minRows: 2,
		maxRows: 2
	};
}
function calculateHeight(rows) {
	return rows * 24 + 24;
}
const Sender = React$1.forwardRef(({ value: controlledValue, defaultValue = "", placeholder, loading = false, submitType = "enter", readOnly = false, disabled = false, autoSize = false, prefix, suffix, header, footer, onSubmit, onCancel, onChange, onKeyDown, className, style, classNames: userClassNames, styles: userStyles, variant, size, rows, ...rest }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue);
	const isControlled = controlledValue !== void 0;
	const value = isControlled ? controlledValue : internalValue;
	const { classNames, styles } = mergeSemanticProps({
		classNames: userClassNames,
		styles: userStyles
	});
	const handleChange = (event) => {
		const newValue = event.target.value;
		if (!isControlled) setInternalValue(newValue);
		onChange?.(newValue, event);
	};
	const handleSubmit = () => {
		if (disabled || readOnly || loading || !value.trim()) return;
		onSubmit?.(value);
		if (!isControlled) setInternalValue("");
	};
	const handleCancel = () => {
		if (!loading) return;
		onCancel?.();
	};
	const handleKeyDown = (event) => {
		if (!(event.key === "Enter" && !event.nativeEvent.isComposing)) {
			onKeyDown?.(event);
			return;
		}
		if (submitType === "enter" ? !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey : event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
			event.preventDefault();
			if (loading) handleCancel();
			else handleSubmit();
			return;
		}
		onKeyDown?.(event);
	};
	const autoSizeConfig = getAutoSizeRows(autoSize);
	const computedStyle = autoSize ? {
		minHeight: calculateHeight(autoSizeConfig.minRows),
		maxHeight: calculateHeight(autoSizeConfig.maxRows),
		overflow: "auto"
	} : {};
	const components = {
		SendButton: ({ children, ...props }) => /* @__PURE__ */ jsx(Button, {
			variant: "primary",
			size: "sm",
			disabled: disabled || !loading && !value.trim(),
			onClick: handleSubmit,
			...props,
			children: children ?? "Send"
		}),
		CancelButton: ({ children, ...props }) => /* @__PURE__ */ jsx(Button, {
			variant: "destructive",
			size: "sm",
			onClick: handleCancel,
			...props,
			children: children ?? "Cancel"
		})
	};
	const renderNode = (node) => {
		if (typeof node === "function") return node({ components });
		return node;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(senderVariants({
			variant,
			size
		}), disabled && "aios-sender--disabled", loading && "aios-sender--loading", readOnly && "aios-sender--readonly", classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "sender",
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		"data-loading": dataAttr(loading),
		"data-readonly": dataAttr(readOnly),
		"data-disabled": dataAttr(disabled),
		children: [
			header && /* @__PURE__ */ jsx("div", {
				className: cn("aios-sender__header", classNames.header),
				style: styles.header,
				"data-slot": "sender-header",
				children: header
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn("aios-sender__content", classNames.content),
				style: styles.content,
				"data-slot": "sender-content",
				children: [
					prefix && /* @__PURE__ */ jsx("div", {
						className: cn("aios-sender__prefix", classNames.prefix),
						style: styles.prefix,
						"data-slot": "sender-prefix",
						children: renderNode(prefix)
					}),
					/* @__PURE__ */ jsx("textarea", {
						ref,
						className: cn("aios-sender__input", classNames.input),
						style: {
							...styles.input,
							...computedStyle
						},
						"data-slot": "sender-input",
						value,
						placeholder,
						disabled,
						readOnly: readOnly || loading,
						onChange: handleChange,
						onKeyDown: handleKeyDown,
						rows: autoSize ? 1 : rows,
						"aria-busy": loading || void 0,
						...rest
					}),
					suffix && /* @__PURE__ */ jsx("div", {
						className: cn("aios-sender__suffix", classNames.suffix),
						style: styles.suffix,
						"data-slot": "sender-suffix",
						children: renderNode(suffix)
					})
				]
			}),
			footer && /* @__PURE__ */ jsx("div", {
				className: cn("aios-sender__footer", classNames.footer),
				style: styles.footer,
				"data-slot": "sender-footer",
				children: renderNode(footer)
			})
		]
	});
});
Sender.displayName = "Sender";
//#endregion
export { Sender as default };

//# sourceMappingURL=Sender.mjs.map