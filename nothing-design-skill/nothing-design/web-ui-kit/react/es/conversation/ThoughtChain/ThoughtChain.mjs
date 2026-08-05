import { cn, dataAttr, mergeSemanticProps } from "../../lib/utils.mjs";
import { thoughtChainItemVariants, thoughtChainVariants } from "./thought-chain-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/conversation/ThoughtChain/ThoughtChain.tsx
function useExpandedKeys(defaultExpandedKeys, expandedKeys, onExpand) {
	const isControlled = expandedKeys !== void 0;
	const [internalKeys, setInternalKeys] = React.useState(() => new Set(defaultExpandedKeys ?? []));
	const expanded = React.useMemo(() => isControlled ? new Set(expandedKeys) : internalKeys, [
		isControlled,
		expandedKeys,
		internalKeys
	]);
	return {
		expanded,
		toggle: React.useCallback((key) => {
			const next = new Set(expanded);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			if (!isControlled) setInternalKeys(next);
			onExpand?.(Array.from(next));
		}, [
			expanded,
			isControlled,
			onExpand
		])
	};
}
const ThoughtChain = React.forwardRef(({ items, defaultExpandedKeys, expandedKeys, onExpand, line = true, className, style, classNames: userClassNames, styles: userStyles, ...rest }, ref) => {
	const { classNames, styles } = mergeSemanticProps({
		classNames: userClassNames,
		styles: userStyles
	});
	const { expanded, toggle } = useExpandedKeys(defaultExpandedKeys, expandedKeys, onExpand);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(thoughtChainVariants({ line }), classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "thought-chain",
		"data-line": dataAttr(line),
		...rest,
		children: items.map((item) => {
			const isExpanded = expanded.has(item.key);
			const isCollapsible = item.collapsible ?? Boolean(item.content);
			const status = item.status ?? "pending";
			return /* @__PURE__ */ jsxs("div", {
				className: cn(thoughtChainItemVariants({
					status,
					collapsible: isCollapsible,
					expanded: isExpanded
				}), classNames.item),
				style: styles.item,
				"data-slot": "thought-chain-item",
				"data-status": status,
				"data-expanded": dataAttr(isExpanded),
				children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: cn("nothing-thought-chain__header", classNames.itemHeader),
						style: styles.itemHeader,
						"data-slot": "thought-chain-item-header",
						disabled: !isCollapsible,
						onClick: () => toggle(item.key),
						"aria-expanded": isCollapsible ? isExpanded : void 0,
						children: [
							item.icon && /* @__PURE__ */ jsx("span", {
								className: cn("nothing-thought-chain__icon", classNames.itemIcon),
								style: styles.itemIcon,
								"data-slot": "thought-chain-item-icon",
								children: item.icon
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "nothing-thought-chain__title-wrap",
								children: [item.title && /* @__PURE__ */ jsx("span", {
									className: "nothing-thought-chain__title",
									children: item.title
								}), item.description && /* @__PURE__ */ jsx("span", {
									className: "nothing-thought-chain__description",
									children: item.description
								})]
							}),
							isCollapsible && /* @__PURE__ */ jsx("span", {
								className: "nothing-thought-chain__arrow",
								"aria-hidden": "true",
								children: isExpanded ? "−" : "+"
							})
						]
					}),
					isExpanded && /* @__PURE__ */ jsx("div", {
						className: cn("nothing-thought-chain__content", classNames.itemContent),
						style: styles.itemContent,
						"data-slot": "thought-chain-item-content",
						children: item.content
					}),
					item.footer && /* @__PURE__ */ jsx("div", {
						className: cn("nothing-thought-chain__footer", classNames.itemFooter),
						style: styles.itemFooter,
						"data-slot": "thought-chain-item-footer",
						children: item.footer
					})
				]
			}, item.key);
		})
	});
});
ThoughtChain.displayName = "ThoughtChain";
//#endregion
export { ThoughtChain as default };

//# sourceMappingURL=ThoughtChain.mjs.map