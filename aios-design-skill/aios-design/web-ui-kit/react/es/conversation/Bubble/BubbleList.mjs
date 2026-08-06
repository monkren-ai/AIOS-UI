import { cn, mergeSemanticProps } from "../../lib/utils.mjs";
import Bubble from "./Bubble.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
//#region src/conversation/Bubble/BubbleList.tsx
function resolveRoleConfig(roleConfig, item) {
	if (typeof roleConfig === "function") return roleConfig(item);
	return roleConfig || {};
}
const BubbleList = React$1.forwardRef(({ items, role, autoScroll = true, className, style, classNames: userClassNames, styles: userStyles, ...rest }, ref) => {
	const rootRef = React$1.useRef(null);
	const mergedRef = React$1.useMemo(() => {
		return (node) => {
			rootRef.current = node;
			if (typeof ref === "function") ref(node);
			else if (ref) ref.current = node;
		};
	}, [ref]);
	const { classNames, styles } = mergeSemanticProps({
		classNames: userClassNames,
		styles: userStyles
	});
	React$1.useEffect(() => {
		if (!autoScroll || !rootRef.current) return;
		const el = rootRef.current;
		if (typeof el.scrollTo === "function") el.scrollTo({
			top: el.scrollHeight,
			behavior: "smooth"
		});
	}, [items, autoScroll]);
	return /* @__PURE__ */ jsx("div", {
		ref: mergedRef,
		className: cn("aios-bubble-list", classNames.root, className),
		style: {
			...styles.root,
			...style
		},
		"data-slot": "bubble-list",
		...rest,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("aios-bubble-list__scroll", classNames.scroll),
			style: styles.scroll,
			"data-slot": "bubble-list-scroll",
			children: items.map((item) => {
				const { key, role: itemRole, content, classNames: itemClassNames, styles: itemStyles, ...itemProps } = item;
				const resolvedRole = itemRole || "ai";
				const roleConfig = resolveRoleConfig(role?.[resolvedRole], item);
				const mergedClassNames = mergeSemanticProps({
					classNames: roleConfig.classNames,
					styles: roleConfig.styles
				}, {
					classNames: itemClassNames,
					styles: itemStyles
				});
				return /* @__PURE__ */ jsx("div", {
					className: cn("aios-bubble-list__item", classNames.bubble),
					style: styles.bubble,
					"data-slot": "bubble-list-item",
					"data-role": resolvedRole,
					children: /* @__PURE__ */ jsx(Bubble, {
						content,
						placement: roleConfig.placement,
						variant: roleConfig.variant,
						shape: roleConfig.shape,
						avatar: roleConfig.avatar,
						loading: roleConfig.loading,
						typing: roleConfig.typing,
						classNames: mergedClassNames.classNames,
						styles: mergedClassNames.styles,
						...itemProps
					})
				}, key);
			})
		})
	});
});
BubbleList.displayName = "BubbleList";
//#endregion
export { BubbleList as default };

//# sourceMappingURL=BubbleList.mjs.map