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
const Sender = React$1.forwardRef(({ value: controlledValue, defaultValue = "", placeholder, loading = false, running, submitType = "enter", readOnly = false, disabled = false, autoSize = false, prefix, suffix, header, attachments, tags, modelSelect, footer, onSubmit, onCancel, onStop, onChange, onKeyDown, className, style, classNames: userClassNames, styles: userStyles, variant, size, rows, ...rest }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue);
	const isRunning = running ?? loading;
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
		if (disabled || readOnly || isRunning || !value.trim()) return;
		onSubmit?.(value);
		if (!isControlled) setInternalValue("");
	};
	const handleCancel = () => {
		if (!isRunning) return;
		onStop?.();
		onCancel?.();
	};
	const handleKeyDown = (event) => {
		if (!(event.key === "Enter" && !event.nativeEvent.isComposing)) {
			onKeyDown?.(event);
			return;
		}
		if (submitType === "enter" ? !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey : event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
			event.preventDefault();
			if (isRunning) handleCancel();
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
			disabled: disabled || !isRunning && !value.trim(),
			onClick: handleSubmit,
			...props,
			children: children ?? "发送 / Send"
		}),
		CancelButton: ({ children, ...props }) => /* @__PURE__ */ jsx(Button, {
			variant: "destructive",
			size: "sm",
			onClick: handleCancel,
			...props,
			children: children ?? "停止 / Stop"
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
		}), disabled && "aios-sender--disabled", isRunning && "aios-sender--loading", readOnly && "aios-sender--readonly", classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "sender",
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		"data-loading": dataAttr(isRunning),
		"data-running": dataAttr(isRunning),
		"data-readonly": dataAttr(readOnly),
		"data-disabled": dataAttr(disabled),
		children: [
			(header || attachments || tags || modelSelect) && /* @__PURE__ */ jsxs("div", {
				className: cn("aios-sender__header", classNames.header),
				style: styles.header,
				"data-slot": "sender-header",
				children: [
					header,
					attachments && /* @__PURE__ */ jsx("div", {
						"data-slot": "sender-attachments",
						children: attachments
					}),
					(tags || modelSelect) && /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						"data-slot": "sender-context",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap items-center gap-2",
							children: tags
						}), modelSelect]
					})
				]
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
						readOnly: readOnly || isRunning,
						onChange: handleChange,
						onKeyDown: handleKeyDown,
						rows: autoSize ? 1 : rows,
						"aria-busy": isRunning || void 0,
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