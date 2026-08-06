import { cn, dataAttr, mergeSemanticProps } from "../../lib/utils.mjs";
import { promptsItemVariants, promptsVariants } from "./prompts-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./Prompts.css";
//#region src/conversation/Prompts/Prompts.tsx
const Prompts = React$1.forwardRef(({ items, title, layout = "grid", onItemClick, className, style, classNames: userClassNames, styles: userStyles, variant, size, ...rest }, ref) => {
	const { classNames, styles } = mergeSemanticProps({
		classNames: userClassNames,
		styles: userStyles
	});
	const handleItemClick = (item, index) => {
		if (item.disabled) return;
		onItemClick?.(item, index);
	};
	const handleKeyDown = (event, item, index) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleItemClick(item, index);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(promptsVariants({
			variant,
			layout,
			size
		}), classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "prompts",
		"data-layout": dataAttr(layout),
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		...rest,
		children: [title && /* @__PURE__ */ jsx("div", {
			className: cn("aios-prompts__title", classNames.title),
			style: styles.title,
			"data-slot": "prompts-title",
			children: title
		}), /* @__PURE__ */ jsx("div", {
			className: cn("aios-prompts__list", classNames.list),
			style: styles.list,
			"data-slot": "prompts-list",
			role: "list",
			children: items.map((item, index) => /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: cn(promptsItemVariants({ disabled: item.disabled }), classNames.item),
				style: styles.item,
				"data-slot": "prompts-item",
				"data-disabled": dataAttr(item.disabled),
				disabled: item.disabled,
				onClick: () => handleItemClick(item, index),
				onKeyDown: (event) => handleKeyDown(event, item, index),
				children: [item.icon && /* @__PURE__ */ jsx("span", {
					className: cn("aios-prompts__item-icon", classNames.itemIcon),
					style: styles.itemIcon,
					"data-slot": "prompts-item-icon",
					children: item.icon
				}), /* @__PURE__ */ jsxs("span", {
					className: "aios-prompts__item-text",
					children: [item.title && /* @__PURE__ */ jsx("span", {
						className: cn("aios-prompts__item-title", classNames.itemTitle),
						style: styles.itemTitle,
						"data-slot": "prompts-item-title",
						children: item.title
					}), item.description && /* @__PURE__ */ jsx("span", {
						className: cn("aios-prompts__item-description", classNames.itemDescription),
						style: styles.itemDescription,
						"data-slot": "prompts-item-description",
						children: item.description
					})]
				})]
			}, item.key))
		})]
	});
});
Prompts.displayName = "Prompts";
//#endregion
export { Prompts as default };

//# sourceMappingURL=Prompts.mjs.map