import { cn, dataAttr, mergeSemanticProps } from "../../lib/utils.mjs";
import { conversationsItemVariants, conversationsVariants } from "./conversations-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./Conversations.css";
//#region src/conversation/Conversations/Conversations.tsx
function useActiveKey(defaultActiveKey, activeKey, onActiveChange) {
	const isControlled = activeKey !== void 0;
	const [internalKey, setInternalKey] = React$1.useState(defaultActiveKey);
	return {
		current: isControlled ? activeKey : internalKey,
		set: React$1.useCallback((key) => {
			if (!isControlled) setInternalKey(key);
			onActiveChange?.(key);
		}, [isControlled, onActiveChange])
	};
}
const Conversations = React$1.forwardRef(({ items, activeKey, defaultActiveKey, onActiveChange, header, footer, onCreate, createLabel = "新建会话 / New conversation", className, style, classNames: userClassNames, styles: userStyles, variant, size, ...rest }, ref) => {
	const { classNames, styles } = mergeSemanticProps({
		classNames: userClassNames,
		styles: userStyles
	});
	const { current, set } = useActiveKey(defaultActiveKey, activeKey, onActiveChange);
	const handleSelect = (item) => {
		if (item.disabled || item.key === current) return;
		set(item.key);
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(conversationsVariants({
			variant,
			size
		}), classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "conversations",
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		...rest,
		children: [
			header && /* @__PURE__ */ jsx("div", {
				className: cn("aios-conversations__header", classNames.header),
				style: styles.header,
				"data-slot": "conversations-header",
				children: header
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cn("aios-conversations__list", classNames.list),
				style: styles.list,
				"data-slot": "conversations-list",
				role: "tablist",
				children: [onCreate && /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "aios-conversations__item",
					"data-slot": "conversations-create",
					onClick: onCreate,
					children: [/* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						children: "+"
					}), /* @__PURE__ */ jsx("span", {
						className: "aios-conversations__item-label",
						children: createLabel
					})]
				}), items.map((item, index) => {
					const isActive = current === item.key;
					const actions = typeof item.actions === "function" ? item.actions(item) : item.actions;
					const showSection = item.section != null && (index === 0 || items[index - 1]?.section !== item.section);
					return /* @__PURE__ */ jsxs(React$1.Fragment, { children: [showSection && /* @__PURE__ */ jsx("div", {
						className: "px-3 pt-3 font-mono text-caption uppercase text-foreground-disabled",
						"data-slot": "conversations-section",
						children: item.section
					}), /* @__PURE__ */ jsxs("div", {
						className: cn(conversationsItemVariants({
							active: isActive,
							disabled: item.disabled
						}), classNames.item),
						style: styles.item,
						"data-slot": "conversations-item",
						"data-active": isActive || void 0,
						"data-disabled": dataAttr(item.disabled),
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							className: "flex min-w-0 flex-1 items-center gap-2 text-start",
							disabled: item.disabled,
							role: "tab",
							"aria-selected": isActive,
							onClick: () => handleSelect(item),
							children: [item.icon && /* @__PURE__ */ jsx("span", {
								className: cn("aios-conversations__item-icon", classNames.itemIcon),
								style: styles.itemIcon,
								"data-slot": "conversations-item-icon",
								children: item.icon
							}), /* @__PURE__ */ jsxs("span", {
								className: "aios-conversations__item-main",
								children: [/* @__PURE__ */ jsx("span", {
									className: cn("aios-conversations__item-label", classNames.itemLabel),
									style: styles.itemLabel,
									"data-slot": "conversations-item-label",
									children: item.label
								}), item.meta && /* @__PURE__ */ jsxs("span", {
									className: cn("aios-conversations__item-meta", classNames.itemMeta),
									style: styles.itemMeta,
									"data-slot": "conversations-item-meta",
									children: [item.unread && !isActive && /* @__PURE__ */ jsx("span", {
										className: "me-1 inline-block size-2 rounded-full bg-accent",
										"aria-label": "未读 / Unread"
									}), item.meta]
								})]
							})]
						}), actions && /* @__PURE__ */ jsx("span", {
							className: cn("aios-conversations__item-actions", classNames.itemActions),
							style: styles.itemActions,
							"data-slot": "conversations-item-actions",
							children: actions
						})]
					})] }, item.key);
				})]
			}),
			footer && /* @__PURE__ */ jsx("div", {
				className: cn("aios-conversations__footer", classNames.footer),
				style: styles.footer,
				"data-slot": "conversations-footer",
				children: footer
			})
		]
	});
});
Conversations.displayName = "Conversations";
//#endregion
export { Conversations as default };

//# sourceMappingURL=Conversations.mjs.map