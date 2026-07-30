import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Surfaces.css";
//#region src/Surfaces/Surfaces.tsx
const surfaceVariants = cva("nothing-surface", {
	variants: {
		elevation: {
			1: "nothing-surface--elevation-1",
			2: "nothing-surface--elevation-2",
			3: "nothing-surface--elevation-3",
			4: "nothing-surface--elevation-4",
			5: "nothing-surface--elevation-5",
			6: "nothing-surface--elevation-6",
			7: "nothing-surface--elevation-7",
			8: "nothing-surface--elevation-8"
		},
		padding: {
			none: "nothing-surface--padding-none",
			sm: "nothing-surface--padding-sm",
			md: "nothing-surface--padding-md",
			lg: "nothing-surface--padding-lg"
		},
		border: {
			none: "nothing-surface--border-none",
			default: "nothing-surface--border-default",
			visible: "nothing-surface--border-visible"
		},
		radius: {
			none: "nothing-surface--radius-none",
			sm: "nothing-surface--radius-sm",
			md: "nothing-surface--radius-md",
			lg: "nothing-surface--radius-lg"
		}
	},
	defaultVariants: {
		elevation: 1,
		padding: "md",
		border: "default",
		radius: "md"
	}
});
const Surfaces = React.forwardRef(({ elevation = 1, padding = "md", border = "default", radius = "md", className, children, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(surfaceVariants({
			elevation,
			padding,
			border,
			radius
		}), className),
		"data-slot": "surface",
		"data-elevation": dataAttr(elevation),
		...props,
		children
	});
});
Surfaces.displayName = "Surfaces";
//#endregion
export { Surfaces, Surfaces as default, surfaceVariants };

//# sourceMappingURL=Surfaces.mjs.map