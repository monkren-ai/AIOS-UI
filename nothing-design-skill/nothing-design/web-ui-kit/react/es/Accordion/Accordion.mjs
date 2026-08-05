import { cn, dataAttr } from "../lib/utils.mjs";
import { accordionContentVariants, accordionHeaderVariants, accordionItemVariants, accordionLeadingIconVariants, accordionPanelVariants, accordionTriggerIconVariants, accordionTriggerTextVariants, accordionTriggerVariants, accordionVariants } from "./accordion-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Accordion } from "@base-ui/react/accordion";
//#region src/Accordion/Accordion.tsx
function Accordion$1({ className, items, type = "single", variant = "default", defaultOpen, defaultValue, value: controlledValue, onValueChange, ...props }) {
	const handleValueChange = React.useCallback((value) => {
		onValueChange?.(value);
	}, [onValueChange]);
	return /* @__PURE__ */ jsx(Accordion.Root, {
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
			className: accordionItemVariants({ variant }),
			"data-slot": "accordion-item",
			"data-disabled": dataAttr(item.disabled),
			children: [/* @__PURE__ */ jsx(Accordion.Header, {
				className: accordionHeaderVariants(),
				"data-slot": "accordion-header",
				children: /* @__PURE__ */ jsxs(Accordion.Trigger, {
					className: accordionTriggerVariants(),
					"data-slot": "accordion-trigger",
					children: [
						item.leadingIcon && /* @__PURE__ */ jsx("span", {
							className: accordionLeadingIconVariants(),
							"data-slot": "accordion-leading-icon",
							"aria-hidden": "true",
							children: item.leadingIcon
						}),
						/* @__PURE__ */ jsx("span", {
							className: accordionTriggerTextVariants(),
							"data-slot": "accordion-trigger-text",
							children: item.title
						}),
						/* @__PURE__ */ jsx("span", {
							className: accordionTriggerIconVariants(),
							"data-slot": "accordion-trigger-icon",
							"aria-hidden": "true"
						})
					]
				})
			}), /* @__PURE__ */ jsx(Accordion.Panel, {
				className: accordionPanelVariants(),
				"data-slot": "accordion-panel",
				children: /* @__PURE__ */ jsx("div", {
					className: accordionContentVariants(),
					"data-slot": "accordion-content",
					children: item.content
				})
			})]
		}, item.id))
	});
}
Accordion$1.displayName = "Accordion";
//#endregion
export { Accordion$1 as default };

//# sourceMappingURL=Accordion.mjs.map