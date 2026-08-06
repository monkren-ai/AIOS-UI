import { cn, dataAttr } from "../lib/utils.mjs";
import Button from "../Button/Button.mjs";
import { buttonGroupVariants } from "./button-group-variants.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
//#region src/ButtonGroup/ButtonGroup.tsx
/**
* 按钮组。
*
* 不重新实现 Button，只包裹 children。`size` 会透传给 `Button` 子项
* （子项自带 size 时优先）。相邻按钮共享边框，横竖两种排列。
*/
function ButtonGroup({ orientation = "horizontal", size, children, separator, className, ref, ...props }) {
	const items = React$1.Children.toArray(children).filter(Boolean);
	const rendered = [];
	items.forEach((child, index) => {
		if (index > 0 && separator) rendered.push(/* @__PURE__ */ jsx(React$1.Fragment, { children: separator }, `button-group-separator-${index}`));
		if (React$1.isValidElement(child) && child.type === Button) {
			const typed = child;
			const childProps = typed.props;
			rendered.push(React$1.cloneElement(typed, { size: childProps.size ?? size }));
		} else rendered.push(child);
	});
	return /* @__PURE__ */ jsx("div", {
		ref,
		role: "group",
		"aria-orientation": orientation,
		className: cn(buttonGroupVariants({ orientation }), className),
		"data-slot": "button-group",
		"data-orientation": orientation,
		"data-size": dataAttr(size),
		...props,
		children: rendered
	});
}
ButtonGroup.displayName = "ButtonGroup";
//#endregion
export { ButtonGroup as default };

//# sourceMappingURL=ButtonGroup.mjs.map