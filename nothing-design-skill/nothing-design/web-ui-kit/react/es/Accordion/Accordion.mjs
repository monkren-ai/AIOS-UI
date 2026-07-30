import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Accordion } from "@base-ui/react/accordion";
import "./Accordion.css";
//#region src/Accordion/Accordion.tsx
const accordionVariants = cva("nothing-accordion", {
	variants: {
		type: {
			single: "nothing-accordion--single",
			multiple: "nothing-accordion--multiple"
		},
		variant: {
			default: "nothing-accordion--default",
			flush: "nothing-accordion--flush"
		}
	},
	defaultVariants: {
		type: "single",
		variant: "default"
	}
});
const Accordion$1 = React.forwardRef(({ className, items, type = "single", variant = "default", defaultOpen, defaultValue, value: controlledValue, onValueChange, ...props }, ref) => {
	const handleValueChange = React.useCallback((value) => {
		onValueChange?.(value);
	}, [onValueChange]);
	return /* @__PURE__ */ jsx(Accordion.Root, {
		ref,
		className: cn(accordionVariants({
			type,
			variant
		}), className),
		"data-slot": "accordion",
		"data-variant": dataAttr(variant),
		"data-type": dataAttr(type),
		multiple: type === "multiple",
		defaultValue: defaultValue ?? defaultOpen,
		value: controlledValue,
		onValueChange: handleValueChange,
		...props,
		children: items.map((item) => /* @__PURE__ */ jsxs(Accordion.Item, {
			value: item.id,
			disabled: item.disabled,
			className: "nothing-accordion__item",
			"data-disabled": dataAttr(item.disabled),
			children: [/* @__PURE__ */ jsx(Accordion.Header, {
				className: "nothing-accordion__heading",
				children: /* @__PURE__ */ jsxs(Accordion.Trigger, {
					className: "nothing-accordion__trigger",
					children: [
						item.leadingIcon && /* @__PURE__ */ jsx("span", {
							className: "nothing-accordion__trigger-icon-leading",
							"aria-hidden": "true",
							children: item.leadingIcon
						}),
						/* @__PURE__ */ jsx("span", {
							className: "nothing-accordion__trigger-text",
							children: item.title
						}),
						/* @__PURE__ */ jsx("span", {
							className: "nothing-accordion__trigger-icon",
							"aria-hidden": "true"
						})
					]
				})
			}), /* @__PURE__ */ jsx(Accordion.Panel, {
				className: "nothing-accordion__panel",
				children: /* @__PURE__ */ jsx("div", {
					className: "nothing-accordion__content-inner",
					children: item.content
				})
			})]
		}, item.id))
	});
});
Accordion$1.displayName = "Accordion";
//#endregion
export { Accordion$1 as Accordion, Accordion$1 as default, accordionVariants };

//# sourceMappingURL=Accordion.mjs.map