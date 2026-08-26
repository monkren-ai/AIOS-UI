import { cn, dataAttr } from "../lib/utils.mjs";
import { chipGroupVariants, chipVariants } from "./chip-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@base-ui/react/button";
//#region src/Chip/Chip.tsx
function Chip({ selected = false, size = "md", icon, className, children, ...props }) {
	return /* @__PURE__ */ jsxs(Button, {
		className: cn(chipVariants({
			selected,
			size
		}), className),
		"aria-pressed": selected,
		"data-slot": "chip",
		"data-selected": dataAttr(selected),
		"data-size": dataAttr(size),
		...props,
		children: [icon && /* @__PURE__ */ jsx("span", {
			"data-slot": "chip-icon",
			"aria-hidden": "true",
			className: "inline-flex shrink-0",
			children: icon
		}), children]
	});
}
function ChipGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		className: cn(chipGroupVariants(), className),
		"data-slot": "chip-group",
		...props
	});
}
Chip.displayName = "Chip";
ChipGroup.displayName = "ChipGroup";
//#endregion
export { Chip, ChipGroup };

//# sourceMappingURL=Chip.mjs.map