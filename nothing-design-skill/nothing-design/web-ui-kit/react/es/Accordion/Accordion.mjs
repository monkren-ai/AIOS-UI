import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Accordion.css";
//#region src/Accordion/Accordion.tsx
const accordionVariants = cva("nothing-accordion", {
	variants: { type: {
		single: "nothing-accordion--single",
		multiple: "nothing-accordion--multiple"
	} },
	defaultVariants: { type: "single" }
});
const accordionItemVariants = cva("nothing-accordion__item", {
	variants: {
		open: {
			true: "nothing-accordion__item--open",
			false: ""
		},
		disabled: {
			true: "nothing-accordion__item--disabled",
			false: ""
		}
	},
	defaultVariants: {
		open: false,
		disabled: false
	}
});
const Accordion = React.forwardRef(({ className, items, type = "single", defaultOpen = [], ...props }, ref) => {
	const [openItems, setOpenItems] = React.useState(new Set(defaultOpen));
	const triggerRefs = React.useRef([]);
	const isOpen = (id) => openItems.has(id);
	const toggleItem = React.useCallback((id) => {
		setOpenItems((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else {
				if (type === "single") next.clear();
				next.add(id);
			}
			return next;
		});
	}, [type]);
	const handleKeyDown = React.useCallback((e, index) => {
		const triggers = triggerRefs.current.filter(Boolean);
		if (triggers.length === 0) return;
		let nextIndex = index;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				nextIndex = index + 1;
				break;
			case "ArrowUp":
				e.preventDefault();
				nextIndex = index - 1;
				break;
			case "Home":
				e.preventDefault();
				nextIndex = 0;
				break;
			case "End":
				e.preventDefault();
				nextIndex = triggers.length - 1;
				break;
			default: return;
		}
		nextIndex = (nextIndex % triggers.length + triggers.length) % triggers.length;
		triggers[nextIndex]?.focus();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(accordionVariants({ type }), className),
		role: "presentation",
		"data-type": dataAttr(type),
		...props,
		children: items.map((item, index) => {
			const open = isOpen(item.id);
			const contentId = `accordion-content-${item.id}`;
			const triggerId = `accordion-trigger-${item.id}`;
			return /* @__PURE__ */ jsxs("div", {
				className: cn(accordionItemVariants({
					open,
					disabled: !!item.disabled
				})),
				"data-state": dataAttr(open ? "open" : "closed"),
				"data-disabled": dataAttr(item.disabled),
				children: [/* @__PURE__ */ jsx("h3", {
					className: "nothing-accordion__heading",
					children: /* @__PURE__ */ jsxs("button", {
						ref: (el) => {
							triggerRefs.current[index] = el;
						},
						className: "nothing-accordion__trigger",
						"aria-expanded": open,
						"aria-controls": contentId,
						id: triggerId,
						disabled: item.disabled,
						onClick: () => toggleItem(item.id),
						onKeyDown: (e) => handleKeyDown(e, index),
						"data-state": dataAttr(open ? "open" : "closed"),
						children: [/* @__PURE__ */ jsx("span", {
							className: "nothing-accordion__trigger-text",
							children: item.title
						}), /* @__PURE__ */ jsx("span", {
							className: "nothing-accordion__trigger-icon",
							"aria-hidden": "true"
						})]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "nothing-accordion__content",
					id: contentId,
					role: "region",
					"aria-labelledby": triggerId,
					"data-state": dataAttr(open ? "open" : "closed"),
					children: /* @__PURE__ */ jsx("div", {
						className: "nothing-accordion__content-inner",
						children: item.content
					})
				})]
			}, item.id);
		})
	});
});
Accordion.displayName = "Accordion";
//#endregion
export { accordionItemVariants, accordionVariants, Accordion as default };

//# sourceMappingURL=Accordion.mjs.map