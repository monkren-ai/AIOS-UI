import { cn, dataAttr } from "../lib/utils.mjs";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation.mjs";
import { OverlayPortal, useEscapeKey, useOverlayState } from "../ui/OverlayPortal.mjs";
import { contextMenuContentVariants, contextMenuItemLabelVariants, contextMenuItemShortcutVariants, contextMenuItemVariants, contextMenuSeparatorVariants, contextMenuTriggerVariants, contextMenuVariants } from "./context-menu-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/ContextMenu/ContextMenu.tsx
/**
* 只有 `separator` 没有 `label` 才是独立分隔线——它不渲染菜单项，因此也不能出现在
* 任何一份焦点索引里。带 `label` 的 `separator: true` 是过渡期保留的旧写法，含义是
* 「渲染这一项，再在它下面补一条线」。
*/
function isStandaloneSeparator(item) {
	return !!item.separator && item.label === void 0;
}
function ContextMenu({ className, items, children, ref, ...props }) {
	const { isOpen, close, setOpen } = useOverlayState(void 0);
	const [position, setPosition] = React.useState({
		top: 0,
		left: 0
	});
	const [activeIndex, setActiveIndex] = React.useState(-1);
	const contentRef = React.useRef(null);
	const containerRef = React.useRef(null);
	const triggerRef = React.useRef(null);
	const previousFocusRef = React.useRef(null);
	const itemRefs = React.useRef([]);
	const setContainerRefs = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	React.useEffect(() => {
		if (!isOpen) return;
		const handler = (event) => {
			const target = event.target;
			if (!target) return;
			if (containerRef.current?.contains(target)) return;
			if (contentRef.current?.contains(target)) return;
			close();
		};
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [isOpen, close]);
	useEscapeKey(isOpen, close);
	const firstFocusableIndex = items.findIndex((item) => !isStandaloneSeparator(item) && !item.disabled);
	/**
	* 打开时把焦点交给第一个可用项，关闭时还原。
	*
	* 依赖里放的是 `firstFocusableIndex` 而不是 `items`——调用方几乎都是内联字面量数组，
	* 用 `items` 会让这个 effect 每次渲染都重跑一遍，焦点被反复抢走。
	*/
	React.useEffect(() => {
		if (!isOpen) return;
		const trigger = triggerRef.current;
		previousFocusRef.current = document.activeElement;
		if (firstFocusableIndex >= 0) {
			setActiveIndex(firstFocusableIndex);
			itemRefs.current[firstFocusableIndex]?.focus();
		} else contentRef.current?.focus();
		return () => {
			const previous = previousFocusRef.current;
			previousFocusRef.current = null;
			setActiveIndex(-1);
			if (previous && previous !== document.body && previous.isConnected) previous.focus();
			else trigger?.focus();
		};
	}, [isOpen, firstFocusableIndex]);
	const openAt = React.useCallback((top, left) => {
		setPosition({
			top,
			left
		});
		setOpen(true);
		setActiveIndex(-1);
	}, [setOpen]);
	const handleContextMenu = React.useCallback((e) => {
		e.preventDefault();
		if (e.clientX === 0 && e.clientY === 0) {
			const rect = triggerRef.current?.getBoundingClientRect();
			openAt(rect?.bottom ?? 0, rect?.left ?? 0);
			return;
		}
		openAt(e.clientY, e.clientX);
	}, [openAt]);
	const handleTriggerKeyDown = React.useCallback((e) => {
		if (e.key === "ContextMenu" || e.shiftKey && e.key === "F10") {
			e.preventDefault();
			const rect = triggerRef.current?.getBoundingClientRect();
			openAt(rect?.bottom ?? 0, rect?.left ?? 0);
		}
	}, [openAt]);
	const handleItemSelect = React.useCallback((index) => {
		const item = items[index];
		if (!item || isStandaloneSeparator(item) || item.disabled) return;
		item.onClick?.();
		close();
	}, [items, close]);
	/**
	* 键盘导航只认这一份列表：分隔线与禁用项都不在里面，每一项带着自己在 `items` 里的原始
	* 下标。只收已经拿到 DOM 节点的项，这样「第几个可聚焦项」与 `focusableNodes` 的下标
	* 永远对齐，不会出现两套编号各走各的。
	*/
	const focusableEntries = items.flatMap((item, index) => {
		if (isStandaloneSeparator(item) || item.disabled) return [];
		const node = itemRefs.current[index];
		return node ? [{
			index,
			node
		}] : [];
	});
	const focusableNodes = focusableEntries.map((entry) => entry.node);
	const handleKeyDown = useKeyboardNavigation({
		items: focusableNodes,
		orientation: "vertical",
		loop: true,
		onSelect: (focusableIndex) => {
			const entry = focusableEntries[focusableIndex];
			if (entry) handleItemSelect(entry.index);
		}
	});
	const handleTabCycle = React.useCallback((e) => {
		e.preventDefault();
		if (focusableNodes.length === 0) return;
		const current = focusableNodes.indexOf(document.activeElement);
		if (current === -1) {
			(e.shiftKey ? focusableNodes[focusableNodes.length - 1] : focusableNodes[0])?.focus();
			return;
		}
		focusableNodes[(current + (e.shiftKey ? -1 : 1) + focusableNodes.length) % focusableNodes.length]?.focus();
	}, [focusableNodes]);
	const rovingIndex = focusableEntries.some((entry) => entry.index === activeIndex) ? activeIndex : firstFocusableIndex;
	return /* @__PURE__ */ jsxs("div", {
		ref: setContainerRefs,
		className: cn(contextMenuVariants(), className),
		"data-slot": "context-menu",
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			ref: triggerRef,
			className: cn(contextMenuTriggerVariants()),
			"data-slot": "context-menu-trigger",
			tabIndex: 0,
			"aria-haspopup": "menu",
			"aria-expanded": isOpen,
			onContextMenu: handleContextMenu,
			onKeyDown: handleTriggerKeyDown,
			children
		}), /* @__PURE__ */ jsx(OverlayPortal, {
			open: isOpen,
			children: /* @__PURE__ */ jsx("div", {
				ref: contentRef,
				className: cn(contextMenuContentVariants({ visible: isOpen })),
				role: "menu",
				tabIndex: -1,
				"data-slot": "context-menu-content",
				style: {
					top: position.top,
					left: position.left
				},
				onKeyDown: (e) => {
					if (e.key === "Tab") handleTabCycle(e);
					else if (activeIndex >= 0) {
						const focusableIndex = focusableEntries.findIndex((entry) => entry.index === activeIndex);
						if (focusableIndex >= 0) handleKeyDown(e, focusableIndex);
					} else if (e.key === "ArrowDown") {
						e.preventDefault();
						const first = focusableEntries[0];
						if (first) {
							setActiveIndex(first.index);
							first.node.focus();
						}
					} else if (e.key === "ArrowUp") {
						e.preventDefault();
						const last = focusableEntries[focusableEntries.length - 1];
						if (last) {
							setActiveIndex(last.index);
							last.node.focus();
						}
					}
				},
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				children: items.map((item, index) => isStandaloneSeparator(item) ? /* @__PURE__ */ jsx("div", {
					className: cn(contextMenuSeparatorVariants()),
					role: "separator",
					"data-slot": "context-menu-separator"
				}, `sep-${index}`) : /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					ref: (node) => {
						itemRefs.current[index] = node;
					},
					className: cn(contextMenuItemVariants({ disabled: !!item.disabled })),
					role: "menuitem",
					tabIndex: !item.disabled && index === rovingIndex ? 0 : -1,
					"aria-disabled": item.disabled || void 0,
					onClick: () => handleItemSelect(index),
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							e.stopPropagation();
							handleItemSelect(index);
						}
					},
					onFocus: () => setActiveIndex(index),
					"data-slot": "context-menu-item",
					"data-disabled": dataAttr(item.disabled),
					children: [/* @__PURE__ */ jsx("span", {
						className: cn(contextMenuItemLabelVariants()),
						"data-slot": "context-menu-item-label",
						children: item.label
					}), item.shortcut && /* @__PURE__ */ jsx("span", {
						className: cn(contextMenuItemShortcutVariants()),
						"data-slot": "context-menu-item-shortcut",
						children: item.shortcut
					})]
				}), item.separator && /* @__PURE__ */ jsx("div", {
					className: cn(contextMenuSeparatorVariants()),
					role: "separator",
					"data-slot": "context-menu-separator"
				})] }, `item-${index}`))
			})
		})]
	});
}
ContextMenu.displayName = "ContextMenu";
//#endregion
export { ContextMenu as default };

//# sourceMappingURL=ContextMenu.mjs.map