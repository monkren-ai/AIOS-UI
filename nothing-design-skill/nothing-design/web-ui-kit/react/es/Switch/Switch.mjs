import { cn, dataAttr } from "../lib/utils.mjs";
import { switchLabelVariants, switchThumbVariants, switchTrackVariants, switchVariants } from "./switch-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Switch } from "@base-ui/react/switch";
//#region src/Switch/Switch.tsx
function Switch$1({ className, label, disabled, onChange, checked, defaultChecked = false, size = "md", ref, ...props }) {
	const [internalOn, setInternalOn] = React.useState(defaultChecked);
	const isOn = checked ?? internalOn;
	const isDisabled = !!disabled;
	const handleCheckedChange = (nextValue) => {
		if (checked === void 0) setInternalOn(nextValue);
		onChange?.(nextValue);
	};
	return /* @__PURE__ */ jsxs("label", {
		ref,
		className: cn(switchVariants({
			size,
			checked: isOn,
			disabled: isDisabled
		}), className),
		"data-slot": "switch",
		"data-state": dataAttr(isOn ? "on" : "off"),
		"data-disabled": dataAttr(isDisabled),
		"data-size": dataAttr(size),
		...props,
		children: [/* @__PURE__ */ jsx(Switch.Root, {
			className: switchTrackVariants({ size }),
			"data-slot": "switch-track",
			checked: isOn,
			onCheckedChange: handleCheckedChange,
			disabled: isDisabled,
			children: /* @__PURE__ */ jsx(Switch.Thumb, {
				className: switchThumbVariants({ size }),
				"data-slot": "switch-thumb"
			})
		}), label && /* @__PURE__ */ jsx("span", {
			className: switchLabelVariants({ size }),
			"data-slot": "switch-label",
			children: label
		})]
	});
}
Switch$1.displayName = "Switch";
//#endregion
export { Switch$1 as default };

//# sourceMappingURL=Switch.mjs.map