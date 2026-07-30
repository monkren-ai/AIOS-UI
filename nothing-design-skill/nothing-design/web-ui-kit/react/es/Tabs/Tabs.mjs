import { cn, dataAttr } from "../lib/utils.mjs";
import { useProximityHover } from "../hooks/useProximityHover.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Tabs } from "@base-ui/react/tabs";
import "./Tabs.css";
//#region src/Tabs/Tabs.tsx
const tabsVariants = cva("nothing-tabs", {
	variants: {
		variant: {
			default: "nothing-tabs--default",
			pills: "nothing-tabs--pills",
			subtle: "nothing-tabs--subtle"
		},
		indicator: {
			line: "nothing-tabs--indicator-line",
			background: "nothing-tabs--indicator-background",
			none: "nothing-tabs--indicator-none"
		}
	},
	defaultVariants: {
		variant: "default",
		indicator: "line"
	}
});
const tabTriggerVariants = cva("nothing-tabs__trigger", {
	variants: {
		active: {
			true: "nothing-tabs__trigger--active",
			false: ""
		},
		disabled: {
			true: "nothing-tabs__trigger--disabled",
			false: ""
		}
	},
	defaultVariants: {
		active: false,
		disabled: false
	}
});
const TabPanel = () => null;
const Tabs$1 = React.forwardRef(({ className, items, value: controlledValue, defaultValue, onValueChange, variant, indicator, enableProximityHover = true, children, ...props }, ref) => {
	const baseId = React.useId();
	const listRef = React.useRef(null);
	const [indicatorStyle, setIndicatorStyle] = React.useState({});
	const [hoverStyle, setHoverStyle] = React.useState({});
	const { activeIndex: hoveredIndex, registerItem, handlers } = useProximityHover(listRef, { axis: "x" });
	const handleValueChange = React.useCallback((value) => {
		onValueChange?.(value);
	}, [onValueChange]);
	const updateIndicator = React.useCallback((activeTabPosition) => {
		if (!activeTabPosition) {
			setIndicatorStyle({ opacity: 0 });
			return;
		}
		const width = activeTabPosition.right - activeTabPosition.left;
		setIndicatorStyle({
			left: activeTabPosition.left,
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
			left: rect.left - listRect.left,
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
		ref,
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
			className: "nothing-tabs__list",
			activateOnFocus: true,
			...handlers,
			children: [
				enableProximityHover && indicator !== "background" && /* @__PURE__ */ jsx("span", {
					className: "nothing-tabs__hover-bg",
					style: hoverStyle,
					"aria-hidden": "true"
				}),
				indicator === "line" && /* @__PURE__ */ jsx(Tabs.Indicator, {
					className: "nothing-tabs__indicator",
					renderBeforeHydration: true,
					render: (_props, state) => {
						updateIndicator(state.activeTabPosition);
						return /* @__PURE__ */ jsx("span", {
							..._props,
							style: {
								..._props.style,
								...indicatorStyle
							},
							"data-slot": "tabs-indicator"
						});
					}
				}),
				items.map((item, index) => {
					const tabId = `${baseId}-tab-${item.value}`;
					const panelId = `${baseId}-panel-${item.value}`;
					return /* @__PURE__ */ jsx(Tabs.Tab, {
						value: item.value,
						disabled: item.disabled,
						id: tabId,
						className: (state) => cn(tabTriggerVariants({
							active: state.active,
							disabled: state.disabled
						})),
						"data-tab-index": index,
						ref: (el) => {
							registerItem(index, el);
						},
						"aria-controls": panelId,
						"data-slot": "tabs-trigger",
						"data-state": dataAttr(item.value === controlledValue ? "active" : "inactive"),
						"data-disabled": dataAttr(item.disabled),
						children: item.label
					}, item.value);
				})
			]
		}), panels.map((panel) => /* @__PURE__ */ jsx(Tabs.Panel, {
			value: panel.props.value,
			className: "nothing-tabs__panel",
			"data-slot": "tabs-panel",
			children: panel.props.children
		}, panel.props.value))]
	});
});
Tabs$1.displayName = "Tabs";
//#endregion
export { TabPanel, Tabs$1 as Tabs, Tabs$1 as default, tabTriggerVariants, tabsVariants };

//# sourceMappingURL=Tabs.mjs.map