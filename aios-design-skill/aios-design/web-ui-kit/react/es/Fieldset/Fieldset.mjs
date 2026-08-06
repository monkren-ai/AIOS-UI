import { cn, dataAttr } from "../lib/utils.mjs";
import { fieldsetLegendVariants, fieldsetVariants } from "./fieldset-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Fieldset } from "@base-ui/react/fieldset";
//#region src/Fieldset/Fieldset.tsx
/**
* 字段分组。
*
* 渲染 `<fieldset>`（隐式 `role="group"`）+ `<legend>`，1px 边框、
* `rounded-card` 圆角。`disabled` 透传给 Base UI，会连带禁用内部 Field。
*/
function Fieldset$1({ legend, disabled = false, className, children, ref, ...props }) {
	return /* @__PURE__ */ jsxs(Fieldset.Root, {
		ref,
		disabled,
		className: cn(fieldsetVariants(), className),
		"data-slot": "fieldset",
		"data-disabled": dataAttr(disabled),
		...props,
		children: [legend && /* @__PURE__ */ jsx(Fieldset.Legend, {
			render: /* @__PURE__ */ jsx("legend", {}),
			className: fieldsetLegendVariants(),
			"data-slot": "fieldset-legend",
			children: legend
		}), children]
	});
}
Fieldset$1.displayName = "Fieldset";
//#endregion
export { Fieldset$1 as default };

//# sourceMappingURL=Fieldset.mjs.map