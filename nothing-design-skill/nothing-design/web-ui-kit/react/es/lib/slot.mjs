import { mergeRefs } from "./refs.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/slot.tsx
const Slot = React.forwardRef(({ children, ...slotProps }, forwardedRef) => {
	if (!React.isValidElement(children)) return /* @__PURE__ */ jsx("span", {
		...slotProps,
		ref: forwardedRef,
		children
	});
	const childProps = children.props;
	const mergedProps = {
		...slotProps,
		...childProps
	};
	const slotClass = slotProps.className;
	const childClass = childProps.className;
	if (slotClass || childClass) mergedProps.className = [slotClass, childClass].filter(Boolean).join(" ");
	const slotStyle = slotProps.style;
	const childStyle = childProps.style;
	if (slotStyle || childStyle) mergedProps.style = {
		...slotStyle,
		...childStyle
	};
	const childRef = childProps.ref;
	if (forwardedRef || childRef) mergedProps.ref = forwardedRef ? mergeRefs(forwardedRef, childRef) : childRef;
	return React.cloneElement(children, mergedProps);
});
Slot.displayName = "Slot";
//#endregion
export { Slot };

//# sourceMappingURL=slot.mjs.map