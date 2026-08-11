import { cn, dataAttr } from "../lib/utils.mjs";
import { radioIndicatorVariants, radioVariants } from "./radio-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
import { Radio } from "@base-ui/react/radio";
//#region src/Radio/Radio.tsx
function Radio$1({ size = "md", className, disabled, ...props }) {
	return /* @__PURE__ */ jsx(Radio.Root, {
		className: cn(radioVariants({ size }), className),
		"data-slot": "radio",
		"data-size": dataAttr(size),
		"data-disabled": dataAttr(disabled),
		disabled,
		...props,
		children: /* @__PURE__ */ jsx(Radio.Indicator, {
			className: cn(radioIndicatorVariants({ size })),
			"data-slot": "radio-indicator",
			keepMounted: true
		})
	});
}
Radio$1.displayName = "Radio";
//#endregion
export { Radio$1 as default };

//# sourceMappingURL=Radio.mjs.map