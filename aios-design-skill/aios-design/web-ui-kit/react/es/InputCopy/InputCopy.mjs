import { cn, dataAttr } from "../lib/utils.mjs";
import { inputCopyButtonTextVariants, inputCopyButtonVariants, inputCopyControlVariants, inputCopyFieldVariants, inputCopyLabelVariants, inputCopyVariants, resolveInputCopySize } from "./input-copy-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./InputCopy.css";
//#region src/InputCopy/InputCopy.tsx
function InputCopy({ value: valueProp, defaultValue = "", label, placeholder, size = "md", copyLabel = "COPY", copiedLabel = "COPIED", copiedDuration = 2e3, onCopy, readOnly = true, className, ref, ...props }) {
	const isControlled = valueProp !== void 0;
	const [internalValue, setInternalValue] = React$1.useState(defaultValue);
	const value = isControlled ? valueProp : internalValue;
	const [copied, setCopied] = React$1.useState(false);
	const inputId = React$1.useId();
	const resolvedSize = resolveInputCopySize(size) ?? "md";
	React$1.useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), copiedDuration);
		return () => clearTimeout(timer);
	}, [copied, copiedDuration]);
	const handleChange = (e) => {
		if (!isControlled) setInternalValue(e.target.value);
	};
	const handleCopy = React$1.useCallback(async () => {
		try {
			await navigator.clipboard.writeText(value);
		} catch {}
		setCopied(true);
		onCopy?.(value);
	}, [value, onCopy]);
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleCopy();
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(inputCopyVariants({
			size: resolvedSize,
			copied
		}), className),
		"data-slot": "input-copy",
		"data-size": dataAttr(resolvedSize),
		"data-copied": dataAttr(copied),
		...props,
		children: [label && /* @__PURE__ */ jsx("label", {
			className: inputCopyLabelVariants(),
			"data-slot": "input-copy-label",
			htmlFor: inputId,
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: inputCopyControlVariants({ size: resolvedSize }),
			"data-slot": "input-copy-control",
			children: [/* @__PURE__ */ jsx("input", {
				id: inputId,
				className: inputCopyFieldVariants({ size: resolvedSize }),
				"data-slot": "input-copy-field",
				type: "text",
				value,
				placeholder,
				readOnly,
				onChange: handleChange
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				className: inputCopyButtonVariants({
					size: resolvedSize,
					copied
				}),
				"data-slot": "input-copy-button",
				"data-copied": dataAttr(copied),
				onClick: handleCopy,
				onKeyDown: handleKeyDown,
				"aria-live": "polite",
				"aria-label": copied ? copiedLabel : copyLabel,
				children: /* @__PURE__ */ jsx("span", {
					className: inputCopyButtonTextVariants(),
					"data-slot": "input-copy-button-text",
					children: copied ? copiedLabel : copyLabel
				})
			})]
		})]
	});
}
InputCopy.displayName = "InputCopy";
//#endregion
export { InputCopy as default };

//# sourceMappingURL=InputCopy.mjs.map