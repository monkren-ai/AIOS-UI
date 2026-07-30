import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./InputCopy.css";
//#region src/InputCopy/InputCopy.tsx
const inputCopyVariants = cva("nothing-input-copy", {
	variants: { size: {
		sm: "nothing-input-copy--sm",
		md: "nothing-input-copy--md",
		lg: "nothing-input-copy--lg"
	} },
	defaultVariants: { size: "md" }
});
const InputCopy = React.forwardRef(({ value: valueProp, defaultValue = "", label, placeholder, size = "md", copyLabel = "COPY", copiedLabel = "COPIED", copiedDuration = 2e3, onCopy, readOnly = true, className, ...props }, ref) => {
	const isControlled = valueProp !== void 0;
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const value = isControlled ? valueProp : internalValue;
	const [copied, setCopied] = React.useState(false);
	const inputId = React.useId();
	React.useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), copiedDuration);
		return () => clearTimeout(timer);
	}, [copied, copiedDuration]);
	const handleChange = (e) => {
		if (!isControlled) setInternalValue(e.target.value);
	};
	const handleCopy = React.useCallback(async () => {
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
		className: cn(inputCopyVariants({ size }), className),
		"data-slot": "input-copy",
		"data-size": dataAttr(size),
		"data-copied": dataAttr(copied),
		...props,
		children: [label && /* @__PURE__ */ jsx("label", {
			className: "nothing-input-copy__label",
			htmlFor: inputId,
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: "nothing-input-copy__control",
			children: [/* @__PURE__ */ jsx("input", {
				id: inputId,
				className: "nothing-input-copy__field",
				type: "text",
				value,
				placeholder,
				readOnly,
				onChange: handleChange
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				className: cn("nothing-input-copy__button", copied && "nothing-input-copy__button--copied"),
				onClick: handleCopy,
				onKeyDown: handleKeyDown,
				"aria-live": "polite",
				"aria-label": copied ? copiedLabel : copyLabel,
				children: /* @__PURE__ */ jsx("span", {
					className: "nothing-input-copy__button-text",
					children: copied ? copiedLabel : copyLabel
				})
			})]
		})]
	});
});
InputCopy.displayName = "InputCopy";
//#endregion
export { InputCopy, InputCopy as default, inputCopyVariants };

//# sourceMappingURL=InputCopy.mjs.map