import { cn, dataAttr } from "../lib/utils.mjs";
import { useProximityHover } from "../hooks/useProximityHover.mjs";
import { tabTriggerVariants, tabsHoverBackgroundVariants, tabsIndicatorVariants, tabsListVariants, tabsPanelVariants, tabsVariants } from "./tabs-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Tabs } from "@base-ui/react/tabs";
//#region src/Tabs/Tabs.tsx
/**
* 把「相对容器左边缘的物理偏移」换算成 inline-start 偏移。
* 浏览器测量 API 只给物理坐标，RTL 下必须翻面才能配合 `inset-inline-start`。
*/
function toInlineStart(container, physicalLeft, width) {
	if (!container) return physicalLeft;
	if (getComputedStyle(container).direction !== "rtl") return physicalLeft;
	return container.clientWidth - physicalLeft - width;
}
const TabPanel = () => null;
function Tabs$1({ className, items, value: controlledValue, defaultValue, onValueChange, variant = "default", indicator = "line", enableProximityHover = true, children, ...props }) {
	const listRef = React.useRef(null);
	const [indicatorStyle, setIndicatorStyle] = React.useState({});
	const [hoverStyle, setHoverStyle] = React.useState({});
	const { activeIndex: hoveredIndex, registerItem, handlers } = useProximityHover(listRef, { axis: "x" });
	const handleValueChange = React.useCallback((value) => {
		onValueChange?.(value);
	}, [onValueChange]);
	const updateIndicator = React.useCallback((activeTabPosition) => {
		if (!activeTabPosition) {
			setIndicatorStyle((prev) => prev.opacity === 0 ? prev : { opacity: 0 });
			return;
		}
		const width = activeTabPosition.right - activeTabPosition.left;
		const insetInlineStart = toInlineStart(listRef.current, activeTabPosition.left, width);
		setIndicatorStyle((prev) => prev.insetInlineStart === insetInlineStart && prev.width === width && prev.opacity === 1 ? prev : {
			insetInlineStart,
			width,
			opacity: 1
		});
	}, []);
	React.useEffect(() => {
		if (!enableProximityHover) return;
		if (hoveredIndex == null || !items[hoveredIndex]) {
			setHoverStyle({ opacity: 0 });
			return;
		}
		const element = listRef.current?.querySelector(`[data-tab-index="${hoveredIndex}"]`);
		if (!element) return;
		const rect = element.getBoundingClientRect();
		const listRect = listRef.current?.getBoundingClientRect();
		if (!listRect) return;
		setHoverStyle({
			insetInlineStart: toInlineStart(listRef.current, rect.left - listRect.left, rect.width),
			width: rect.width,
			opacity: .5
		});
	}, [
		hoveredIndex,
		enableProximityHover,
		items
	]);
	const panels = React.useMemo(() => {
		return (children ? Array.isArray(children) ? children : [children] : []).filter((panel) => React.isValidElement(panel) && panel.props.value !== void 0);
	}, [children]);
	return /* @__PURE__ */ jsxs(Tabs.Root, {
		className: cn(tabsVariants({
			variant,
			indicator
		}), className),
		"data-slot": "tabs",
		"data-variant": dataAttr(variant),
		"data-indicator": dataAttr(indicator),
		value: controlledValue,
		defaultValue,
		onValueChange: handleValueChange,
		...props,
		children: [/* @__PURE__ */ jsxs(Tabs.List, {
			ref: listRef,
			className: tabsListVariants({ variant }),
			"data-slot": "tabs-list",
			activateOnFocus: true,
			...handlers,
			children: [
				enableProximityHover && indicator !== "background" && /* @__PURE__ */ jsx("span", {
					className: tabsHoverBackgroundVariants(),
					"data-slot": "tabs-hover-background",
					style: hoverStyle,
					"aria-hidden": "true"
				}),
				indicator === "line" && /* @__PURE__ */ jsx(Tabs.Indicator, {
					className: tabsIndicatorVariants({ variant }),
					renderBeforeHydration: true,
					render: (indicatorProps, state) => {
						updateIndicator(state.activeTabPosition);
						return /* @__PURE__ */ jsx("span", {
							...indicatorProps,
							style: {
								...indicatorProps.style,
								...indicatorStyle
							},
							"data-slot": "tabs-indicator"
						});
					}
				}),
				items.map((item, index) => /* @__PURE__ */ jsx(Tabs.Tab, {
					value: item.value,
					disabled: item.disabled,
					className: (state) => cn(tabTriggerVariants({
						variant,
						active: state.active,
						disabled: state.disabled
					})),
					"data-tab-index": index,
					ref: (el) => {
						registerItem(index, el);
					},
					render: (tabProps, state) => /* @__PURE__ */ jsx("button", {
						...tabProps,
						"data-slot": "tabs-trigger",
						"data-state": dataAttr(state.active ? "active" : "inactive"),
						"data-disabled": dataAttr(item.disabled),
						children: item.label
					})
				}, item.value))
			]
		}), panels.map((panel) => /* @__PURE__ */ jsx(Tabs.Panel, {
			value: panel.props.value,
			className: tabsPanelVariants(),
			"data-slot": "tabs-panel",
			children: panel.props.children
		}, panel.props.value))]
	});
}
Tabs$1.displayName = "Tabs";
//#endregion
export { TabPanel, Tabs$1 as default };

//# sourceMappingURL=Tabs.mjs.map