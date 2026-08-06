import { cn, dataAttr } from "../lib/utils.mjs";
import { useProximityHover } from "../hooks/useProximityHover.mjs";
import { resolveTagShape, resolveTagVariant, tagVariants, tagsVariants } from "./tag-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Tag/Tag.tsx
function Tag({ className, variant, size = "md", shape, active = false, removable = false, disabled = false, children, onClick, onRemove, ...props }) {
	const isDisabled = !!disabled;
	const isInteractive = !!onClick;
	const resolvedVariant = resolveTagVariant(variant) ?? "secondary";
	const resolvedShape = resolveTagShape(variant, shape) ?? "pill";
	const handleClick = () => {
		if (isDisabled) return;
		onClick?.();
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};
	const handleRemove = (e) => {
		e.stopPropagation();
		if (isDisabled) return;
		onRemove?.();
	};
	const handleRemoveKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			e.stopPropagation();
			if (isDisabled) return;
			onRemove?.();
		}
	};
	return /* @__PURE__ */ jsxs("span", {
		className: cn(tagVariants({
			variant: resolvedVariant,
			size,
			shape: resolvedShape,
			active,
			disabled: isDisabled
		}), className),
		"data-slot": "tag",
		"data-variant": dataAttr(resolveTagVariant(variant) ?? "secondary"),
		"data-size": dataAttr(size),
		"data-shape": dataAttr(resolveTagShape(variant, shape) ?? "pill"),
		"data-active": dataAttr(active),
		"data-disabled": dataAttr(isDisabled),
		role: isInteractive ? "button" : void 0,
		tabIndex: isInteractive ? isDisabled ? -1 : 0 : void 0,
		"aria-pressed": isInteractive ? active : void 0,
		"aria-disabled": isInteractive && isDisabled ? true : void 0,
		onClick: isInteractive ? handleClick : void 0,
		onKeyDown: isInteractive ? handleKeyDown : void 0,
		...props,
		children: [children, removable && /* @__PURE__ */ jsx("button", {
			type: "button",
			"data-slot": "tag-remove",
			className: cn("inline-flex size-3.5 cursor-pointer items-center justify-center", "border-none bg-transparent p-0 text-micro leading-none text-current opacity-60", "transition-opacity duration-200 ease-aios motion-reduce:transition-none", "hover:opacity-100", "outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"),
			onClick: handleRemove,
			onKeyDown: handleRemoveKeyDown,
			tabIndex: isDisabled ? -1 : 0,
			"aria-label": "Remove",
			children: "×"
		})]
	});
}
Tag.displayName = "Tag";
function Tags({ className, children, proximity = false, ref, ...props }) {
	const containerRef = React$1.useRef(null);
	const axis = typeof proximity === "string" ? proximity : "xy";
	const enabled = !!proximity;
	const { activeIndex, registerItem, handlers } = useProximityHover(containerRef, { axis });
	const mergedRef = React$1.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	const items = React$1.Children.toArray(children).filter(React$1.isValidElement);
	return /* @__PURE__ */ jsx("div", {
		ref: mergedRef,
		className: cn(tagsVariants({ proximity: enabled }), className),
		"data-slot": "tags",
		"data-proximity": dataAttr(enabled),
		...enabled ? handlers : {},
		...props,
		children: enabled ? items.map((child, index) => React$1.cloneElement(child, {
			ref: (node) => registerItem(index, node),
			"data-proximity-active": activeIndex === index,
			"data-index": index
		})) : children
	});
}
Tags.displayName = "Tags";
//#endregion
export { Tags, Tag as default };

//# sourceMappingURL=Tag.mjs.map