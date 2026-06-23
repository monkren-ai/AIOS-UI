import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Tabs.css";
//#region src/Tabs/Tabs.tsx
const tabsVariants = cva("nothing-tabs", {
	variants: {},
	defaultVariants: {}
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
const TabPanel = () => {
	return null;
};
const Tabs = React$1.forwardRef(({ className, items, value: controlledValue, defaultValue, onValueChange, children, ...props }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? items[0]?.value ?? "");
	const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
	const [indicatorStyle, setIndicatorStyle] = React$1.useState({});
	const triggerRefs = React$1.useRef([]);
	const baseId = React$1.useId();
	React$1.useEffect(() => {
		const activeIndex = items.findIndex((item) => item.value === selectedValue);
		const activeTrigger = triggerRefs.current[activeIndex];
		if (activeTrigger) setIndicatorStyle({
			width: activeTrigger.offsetWidth,
			left: activeTrigger.offsetLeft
		});
	}, [selectedValue, items]);
	const handleSelect = React$1.useCallback((itemValue) => {
		if (controlledValue === void 0) setInternalValue(itemValue);
		onValueChange?.(itemValue);
	}, [controlledValue, onValueChange]);
	const findNextEnabled = React$1.useCallback((currentIndex, direction) => {
		let idx = currentIndex + direction;
		while (idx >= 0 && idx < items.length) {
			if (!items[idx].disabled) return idx;
			idx += direction;
		}
		if (direction > 0) {
			for (let i = 0; i < currentIndex; i++) if (!items[i].disabled) return i;
		} else for (let i = items.length - 1; i > currentIndex; i--) if (!items[i].disabled) return i;
		return currentIndex;
	}, [items]);
	const handleKeyDown = React$1.useCallback((e, index) => {
		if (items.filter((item) => !item.disabled).length === 0) return;
		let nextIndex = -1;
		switch (e.key) {
			case "ArrowRight":
				e.preventDefault();
				nextIndex = findNextEnabled(index, 1);
				break;
			case "ArrowLeft":
				e.preventDefault();
				nextIndex = findNextEnabled(index, -1);
				break;
			case "Home":
				e.preventDefault();
				nextIndex = items.findIndex((item) => !item.disabled);
				break;
			case "End":
				e.preventDefault();
				for (let i = items.length - 1; i >= 0; i--) if (!items[i].disabled) {
					nextIndex = i;
					break;
				}
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				handleSelect(items[index].value);
				return;
			default: return;
		}
		if (nextIndex >= 0 && nextIndex < items.length) {
			triggerRefs.current[nextIndex]?.focus();
			handleSelect(items[nextIndex].value);
		}
	}, [
		items,
		findNextEnabled,
		handleSelect
	]);
	const activePanel = children.find((panel) => panel.props.value === selectedValue);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(tabsVariants({}), className),
		"data-state": dataAttr(selectedValue),
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "nothing-tabs__list",
			role: "tablist",
			children: [items.map((item, index) => {
				const isActive = item.value === selectedValue;
				const tabId = `${baseId}-tab-${item.value}`;
				const panelId = `${baseId}-panel-${item.value}`;
				return /* @__PURE__ */ jsx("button", {
					ref: (el) => {
						triggerRefs.current[index] = el;
					},
					id: tabId,
					className: cn(tabTriggerVariants({
						active: isActive,
						disabled: !!item.disabled
					})),
					role: "tab",
					"aria-selected": isActive,
					"aria-controls": panelId,
					tabIndex: isActive ? 0 : -1,
					disabled: item.disabled,
					onClick: () => !item.disabled && handleSelect(item.value),
					onKeyDown: (e) => handleKeyDown(e, index),
					"data-state": dataAttr(isActive ? "active" : "inactive"),
					"data-disabled": dataAttr(item.disabled),
					children: item.label
				}, item.value);
			}), /* @__PURE__ */ jsx("div", {
				className: "nothing-tabs__indicator",
				style: indicatorStyle
			})]
		}), activePanel && /* @__PURE__ */ jsx("div", {
			id: `${baseId}-panel-${selectedValue}`,
			className: "nothing-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": `${baseId}-tab-${selectedValue}`,
			"data-state": dataAttr("active"),
			children: activePanel.props.children
		})]
	});
});
Tabs.displayName = "Tabs";
//#endregion
export { TabPanel, Tabs as default, tabTriggerVariants, tabsVariants };

//# sourceMappingURL=Tabs.mjs.map